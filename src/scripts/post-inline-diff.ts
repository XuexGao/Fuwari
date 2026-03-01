import * as Diff from "diff";

const NOTIFICATION_STATE_KEY = "fuwari-notification-state";
const DEBUG_PARAM_KEY = "__diff_debug";
const DEBUG_STATE_KEY = "fuwari-diff-debug-state";
const CONTEXT_LINES = 2;
const BASE_URL = import.meta.env.BASE_URL || "/";

type DiffPart = { added?: boolean; removed?: boolean; value?: string };
type DiffRow = { type: "add" | "del" | "ctx"; text: string };
type DiffHunk = DiffRow[];

function isLogEnabled() {
	try {
		const sp = new URLSearchParams(window.location.search);
		if (sp.get("__diff_log") === "1") return true;
		if (sp.get("__diff_debug") === "1") return true;
	} catch {}
	return (window as any).__fuwariDiffLog === true;
}

function decodeHtmlEntities(value: string) {
	const t = document.createElement("textarea");
	t.innerHTML = String(value ?? "");
	return t.value;
}

function normalizeUrlForCompare(raw: string) {
	const v = decodeHtmlEntities(String(raw ?? "").trim());
	if (!v) return "";
	try {
		const url = new URL(v, window.location.origin);
		const entries = Array.from(url.searchParams.entries()).sort((a, b) => {
			const k = a[0].localeCompare(b[0]);
			if (k !== 0) return k;
			return a[1].localeCompare(b[1]);
		});
		const qs = entries
			.map(([k, val]) => `${encodeURIComponent(k)}=${encodeURIComponent(val)}`)
			.join("&");
		return `${url.pathname}${qs ? `?${qs}` : ""}`;
	} catch {
		return v;
	}
}

function normalizeGuid(guid: string, link: string) {
	const value = (guid || link || "").trim();
	if (!value) return "";
	try {
		const url = new URL(value, window.location.origin);
		return `${url.pathname}${url.search}${url.hash}`;
	} catch {
		return value;
	}
}

function getRelativePath(absoluteUrl: string) {
	try {
		const url = new URL(absoluteUrl, window.location.origin);
		return `${url.pathname}${url.search}${url.hash}`;
	} catch {
		return absoluteUrl;
	}
}

function normalizePathname(pathname: string) {
	const p = String(pathname || "");
	if (!p) return "/";
	const noQueryHash = p.split("#")[0].split("?")[0];
	if (noQueryHash.length > 1) return noQueryHash.replace(/\/+$/, "");
	return "/";
}

function stripBasePath(pathname: string) {
	const base = normalizePathname(BASE_URL);
	const p = normalizePathname(pathname);
	if (!base || base === "/") return p;
	if (p === base) return "/";
	if (p.startsWith(`${base}/`)) return p.slice(base.length) || "/";
	return p;
}

function clearInlineDiff(container: HTMLElement) {
	container.querySelectorAll("[data-post-inline-diff-inline]").forEach((el) => {
		if (!(el instanceof HTMLElement)) return;
		const kind = el.getAttribute("data-post-inline-diff-inline") || "";
		if (kind === "anchor") {
			el.remove();
			return;
		}
		if (kind === "add") {
			el.remove();
			return;
		}
		const text = document.createTextNode(el.textContent || "");
		el.replaceWith(text);
	});

	container
		.querySelectorAll("[data-post-inline-diff]")
		.forEach((el) => el.remove());
	container
		.querySelectorAll("[data-post-inline-diff-add-target]")
		.forEach((el) => el.removeAttribute("data-post-inline-diff-add-target"));
	container
		.querySelectorAll(".post-inline-diff-add-target")
		.forEach((el) => el.classList.remove("post-inline-diff-add-target"));
	container
		.querySelectorAll("[data-post-inline-diff-add-target-img]")
		.forEach((el) =>
			el.removeAttribute("data-post-inline-diff-add-target-img"),
		);
	container
		.querySelectorAll(".post-inline-diff-add-target-img")
		.forEach((el) => el.classList.remove("post-inline-diff-add-target-img"));
	container
		.querySelectorAll("[data-post-inline-diff-del-target]")
		.forEach((el) => el.removeAttribute("data-post-inline-diff-del-target"));
	container
		.querySelectorAll(".post-inline-diff-del-target")
		.forEach((el) => el.classList.remove("post-inline-diff-del-target"));
	container
		.querySelectorAll("[data-post-inline-diff-del-target-img]")
		.forEach((el) =>
			el.removeAttribute("data-post-inline-diff-del-target-img"),
		);
	container
		.querySelectorAll(".post-inline-diff-del-target-img")
		.forEach((el) => el.classList.remove("post-inline-diff-del-target-img"));
}

function buildRows(diffParts: DiffPart[]): DiffRow[] {
	const rows: DiffRow[] = [];
	for (const part of diffParts) {
		const type: DiffRow["type"] = part?.added
			? "add"
			: part?.removed
				? "del"
				: "ctx";
		const value = String(part?.value ?? "");
		const lines = value.split("\n");
		if (lines.length > 0 && lines[lines.length - 1] === "") lines.pop();
		for (const line of lines) rows.push({ type, text: line });
	}
	return rows;
}

function sliceWithContext(rows: DiffRow[]) {
	const changeIndexes = [];
	for (let i = 0; i < rows.length; i += 1) {
		if (rows[i].type !== "ctx") changeIndexes.push(i);
	}
	if (changeIndexes.length === 0) return [];

	const keep = new Array(rows.length).fill(false);
	for (const idx of changeIndexes) {
		const start = Math.max(0, idx - CONTEXT_LINES);
		const end = Math.min(rows.length - 1, idx + CONTEXT_LINES);
		for (let i = start; i <= end; i += 1) keep[i] = true;
	}

	const out: Array<DiffRow | { type: "gap"; text: string }> = [];
	let inGap = false;
	for (let i = 0; i < rows.length; i += 1) {
		if (keep[i]) {
			out.push(rows[i]);
			inGap = false;
			continue;
		}
		if (!inGap) {
			out.push({ type: "gap", text: "…" });
			inGap = true;
		}
	}

	return out;
}

function toHunks(
	rowsWithGaps: Array<DiffRow | { type: "gap"; text: string }>,
): DiffHunk[] {
	const hunks: DiffHunk[] = [];
	let current: DiffHunk = [];
	for (const row of rowsWithGaps) {
		if (row.type === "gap") {
			if (current.length) hunks.push(current);
			current = [];
			continue;
		}
		current.push(row);
	}
	if (current.length) hunks.push(current);
	return hunks;
}

function normalizeLineText(text: string) {
	return String(text ?? "")
		.replace(/\r\n/g, "\n")
		.replace(/\r/g, "\n")
		.replace(/\u00A0/g, " ")
		.replace(/[ \t]*\n[ \t]*/g, " ")
		.replace(/[ \t]{2,}/g, " ")
		.replace(/[ \t]+$/g, "")
		.trim();
}

function extractImgSrc(line: string) {
	const s = String(line ?? "");
	const m = s.match(/<img[^>]*\s(?:src|data-src)=["']([^"']+)["']/i);
	return m?.[1] ? String(m[1]).trim() : null;
}

function stripHtmlLine(line: string) {
	const tmp = document.createElement("div");
	tmp.innerHTML = String(line ?? "");
	return tmp.textContent || tmp.innerText || "";
}

function normalizeForMatch(line: string) {
	const text = normalizeLineText(stripHtmlLine(line));
	if (text) return { kind: "text" as const, value: text };
	const imgSrc = extractImgSrc(line);
	if (imgSrc) return { kind: "img" as const, value: imgSrc };
	const raw = normalizeLineText(line);
	if (raw) return { kind: "text" as const, value: raw };
	return { kind: "none" as const, value: "" };
}

function findImgBySrc(container: HTMLElement, src: string) {
	const normPath = normalizeUrlForCompare(src);
	if (!normPath) return null;
	const imgs = container.querySelectorAll("img");
	for (const img of imgs) {
		if (!(img instanceof HTMLImageElement)) continue;
		const cand = img.getAttribute("src") || img.getAttribute("data-src") || "";
		const candPath = normalizeUrlForCompare(cand);
		if (candPath === normPath) return img;
		if (
			candPath &&
			normPath &&
			(candPath.includes(normPath) || normPath.includes(candPath))
		)
			return img;
	}
	return null;
}

function findBlockByText(container: HTMLElement, line: string) {
	const key = normalizeForMatch(line);
	if (key.kind !== "text") return null;
	const needle = key.value.slice(0, 48);
	const blocks = container.querySelectorAll(
		"p, li, blockquote, pre, h1, h2, h3, h4, h5, h6",
	);
	for (const el of blocks) {
		if (!(el instanceof HTMLElement)) continue;
		if (el.closest(".post-inline-diff-add-line")) continue;
		if (el.closest(".post-inline-diff-del-line")) continue;
		if (el.classList.contains("post-inline-diff-del-target")) continue;
		const content = el.textContent || "";
		if (!normalizeLineText(content).includes(needle)) continue;
		return el;
	}
	return null;
}

function findContextBefore(
	container: HTMLElement,
	hunk: DiffHunk,
	rowIndex: number,
) {
	for (let i = rowIndex - 1; i >= 0; i -= 1) {
		const row = hunk[i];
		if (row?.type !== "ctx") continue;
		const el = findBlockByText(container, row.text);
		if (el) return el;
	}
	return null;
}

function findContextAfter(
	container: HTMLElement,
	hunk: DiffHunk,
	rowIndex: number,
) {
	for (let i = rowIndex + 1; i < hunk.length; i += 1) {
		const row = hunk[i];
		if (row?.type !== "ctx") continue;
		const el = findBlockByText(container, row.text);
		if (el) return el;
	}
	return null;
}

function lineExistsInArticle(container: HTMLElement, line: string) {
	const key = normalizeForMatch(line);
	if (key.kind === "img") return !!findImgBySrc(container, key.value);
	if (key.kind !== "text") return false;
	return !!findBlockByText(container, line);
}

function findAnchorElement(container: HTMLElement, hunk: DiffHunk) {
	const pick = (row: DiffRow) => String(row?.text ?? "").trim();
	const ctx = hunk.find((r) => r.type === "ctx" && pick(r).length >= 6);
	const anchorLine = ctx?.text ?? "";
	if (!anchorLine) return null;

	const key = normalizeForMatch(anchorLine);
	if (key.kind === "img") return findImgBySrc(container, key.value);
	return findBlockByText(container, anchorLine);
}

function sanitizeHtmlFragment(html: string) {
	const parser = new DOMParser();
	const doc = parser.parseFromString(
		`<div>${String(html || "")}</div>`,
		"text/html",
	);
	const root = doc.body.firstElementChild;
	if (!root) return String(html || "");

	root
		.querySelectorAll("script, iframe, object, embed, style")
		.forEach((el) => el.remove());
	root.querySelectorAll("*").forEach((el) => {
		const attrs = Array.from(el.attributes);
		for (const attr of attrs) {
			if (attr.name.startsWith("on")) el.removeAttribute(attr.name);
		}
	});

	return root.innerHTML;
}

function shouldRenderLineAsHtml(line: string) {
	const t = String(line || "").trim();
	return /<[a-z][\s\S]*>/i.test(t) || /<\/[a-z][\s\S]*>/i.test(t);
}

function createDeletionNode(
	text: string,
	includeAnchor: boolean,
	useListItem: boolean,
) {
	const el = document.createElement(useListItem ? "li" : "div");
	el.setAttribute("data-post-inline-diff", "1");
	el.className = "post-inline-diff-del-line";

	if (includeAnchor) {
		const anchor = document.createElement("span");
		anchor.id = "post-diff";
		anchor.setAttribute("data-post-inline-diff", "1");
		el.appendChild(anchor);
	}

	const del = document.createElement("del");
	const raw = normalizeLineText(text);
	if (shouldRenderLineAsHtml(raw))
		del.innerHTML = " " + sanitizeHtmlFragment(raw);
	else del.textContent = ` ${raw}`;

	el.appendChild(del);
	return el;
}

function createAdditionNode(
	text: string,
	includeAnchor: boolean,
	useListItem: boolean,
) {
	const el = document.createElement(useListItem ? "li" : "div");
	el.setAttribute("data-post-inline-diff", "1");
	el.className = "post-inline-diff-add-line";

	if (includeAnchor) {
		const anchor = document.createElement("span");
		anchor.id = "post-diff";
		anchor.setAttribute("data-post-inline-diff", "1");
		el.appendChild(anchor);
	}

	const content = document.createElement("div");
	content.className = "post-inline-diff-add-content";

	const raw = String(text ?? "").trim();
	if (shouldRenderLineAsHtml(raw))
		content.innerHTML = sanitizeHtmlFragment(raw);
	else content.textContent = raw;

	el.appendChild(content);
	return el;
}

function insertAfter(node: Node, ref: Node | null) {
	const parent = ref?.parentNode;
	if (!parent) return false;
	parent.insertBefore(node, ref.nextSibling);
	return true;
}

function parseHtmlSingleElement(html: string) {
	const parser = new DOMParser();
	const doc = parser.parseFromString(
		`<div>${String(html || "")}</div>`,
		"text/html",
	);
	return doc.body.firstElementChild?.firstElementChild;
}

function applyInlineTextDiff(
	targetTextNodes: Text | Text[],
	oldText: string,
	newText: string,
	anchorState: { inserted: boolean },
) {
	return false;
}

function tryApplyInlineReplace(
	targetEl: HTMLElement,
	oldHtml: string,
	newHtml: string,
	anchorState: { inserted: boolean },
) {
	return false;
}

function applyInlineDiff(container: HTMLElement, diffParts: DiffPart[]) {
	const log = isLogEnabled();
	clearInlineDiff(container);
	const rows = buildRows(diffParts);
	const focused = sliceWithContext(rows);
	const hunks = toHunks(focused);

	const anchorState = { inserted: false };
	for (const hunk of hunks) {
		const insertionPoint = findAnchorElement(container, hunk);
		let idx = 0;
		while (idx < hunk.length) {
			const row = hunk[idx];
			if (idx + 1 < hunk.length) {
				const next = hunk[idx + 1];
				const isReplace =
					(row.type === "del" && next.type === "add") ||
					(row.type === "add" && next.type === "del");
				if (isReplace) {
					const oldHtml = row.type === "del" ? row.text : next.text;
					const newHtml = row.type === "add" ? row.text : next.text;
					const oldKey = normalizeForMatch(oldHtml);
					const newKey = normalizeForMatch(newHtml);
					let target: HTMLElement | null = null;
					let isImgReplace = false;

					if (newKey.kind === "img") {
						target = findImgBySrc(container, newKey.value);
						isImgReplace = true;
					} else {
						target = findBlockByText(container, newHtml);
					}

					if (target instanceof HTMLElement) {
						if (isImgReplace) {
							target.classList.add("post-inline-diff-add-target-img");
							target.setAttribute("data-post-inline-diff-add-target-img", "1");
						} else {
							target.classList.add("post-inline-diff-add-target");
							target.setAttribute("data-post-inline-diff-add-target", "1");
						}
						const t =
							oldKey.kind === "img" ? `[图片] ${oldKey.value}` : oldKey.value;
						const node = createDeletionNode(t, !anchorState.inserted, false);
						if (!anchorState.inserted) anchorState.inserted = true;
						target.parentNode?.insertBefore(node, target);
						idx += 2;
						continue;
					}
				}
			}

			if (row.type === "add") {
				let endIdx = idx;
				while (endIdx + 1 < hunk.length && hunk[endIdx + 1].type === "add") {
					endIdx++;
				}
				for (let i = idx; i <= endIdx; i++) {
					const addRow = hunk[i];
					const key = normalizeForMatch(addRow.text);
					if (key.kind === "img") {
						const img = findImgBySrc(container, key.value);
						if (img instanceof HTMLElement) {
							img.classList.add("post-inline-diff-add-target-img");
							img.setAttribute("data-post-inline-diff-add-target-img", "1");
							if (!anchorState.inserted) {
								const anchor = document.createElement("span");
								anchor.id = "post-diff";
								anchor.setAttribute("data-post-inline-diff", "1");
								img.parentNode?.insertBefore(anchor, img);
								anchorState.inserted = true;
							}
						}
					} else {
						const target = findBlockByText(container, addRow.text);
						if (target instanceof HTMLElement) {
							target.classList.add("post-inline-diff-add-target");
							target.setAttribute("data-post-inline-diff-add-target", "1");
							if (!anchorState.inserted) {
								const anchor = document.createElement("span");
								anchor.id = "post-diff";
								anchor.setAttribute("data-post-inline-diff", "1");
								target.parentNode?.insertBefore(anchor, target);
								anchorState.inserted = true;
							}
						}
					}
				}
				idx = endIdx + 1;
				continue;
			}

			if (row.type !== "del") {
				idx += 1;
				continue;
			}

			const key = normalizeForMatch(row.text);
			if (key.kind === "none") {
				idx += 1;
				continue;
			}

			if (lineExistsInArticle(container, row.text)) {
				if (key.kind === "img") {
					const img = findImgBySrc(container, key.value);
					if (img instanceof HTMLElement) {
						img.classList.add("post-inline-diff-del-target-img");
						img.setAttribute("data-post-inline-diff-del-target-img", "1");
					}
					idx += 1;
					continue;
				}
				const target = findBlockByText(container, row.text);
				if (target instanceof HTMLElement) {
					target.classList.add("post-inline-diff-del-target");
					target.setAttribute("data-post-inline-diff-del-target", "1");
				}
				idx += 1;
				continue;
			}

			const t = key.kind === "img" ? `[图片] ${key.value}` : key.value;
			let inserted = false;

			for (let i = idx - 1; i >= 0; i -= 1) {
				const prev = hunk[i];
				if (prev?.type !== "ctx") continue;
				const ctxEl = findBlockByText(container, prev.text);
				if (!(ctxEl instanceof HTMLElement)) continue;
				const useListItem = ctxEl.tagName === "LI";
				const node = createDeletionNode(t, !anchorState.inserted, useListItem);
				if (!anchorState.inserted) anchorState.inserted = true;
				inserted = insertAfter(node, ctxEl);
				break;
			}

			if (!inserted) {
				for (let i = idx + 1; i < hunk.length; i += 1) {
					const next = hunk[i];
					if (next?.type !== "ctx") continue;
					const ctxEl = findBlockByText(container, next.text);
					if (!(ctxEl instanceof HTMLElement)) continue;
					const useListItem = ctxEl.tagName === "LI";
					const node = createDeletionNode(
						t,
						!anchorState.inserted,
						useListItem,
					);
					if (!anchorState.inserted) anchorState.inserted = true;
					ctxEl.parentNode?.insertBefore(node, ctxEl);
					inserted = true;
					break;
				}
			}

			if (!inserted) {
				const useListItem = insertionPoint?.tagName === "LI";
				const node = createDeletionNode(t, !anchorState.inserted, useListItem);
				if (!anchorState.inserted) anchorState.inserted = true;
				if (insertionPoint?.parentNode)
					insertionPoint.parentNode.insertBefore(node, insertionPoint);
				else container.prepend(node);
			}

			idx += 1;
		}
	}
}

function applySimpleDiff(container: HTMLElement, diffParts: DiffPart[]) {
	container.innerHTML = "";
	const rows = buildRows(diffParts);

	for (const row of rows) {
		if (row.type === "ctx") {
			const span = document.createElement("span");
			span.textContent = row.text;
			container.appendChild(span);
		} else if (row.type === "add") {
			const span = document.createElement("span");
			span.className = "post-inline-diff-add-target";
			span.textContent = row.text;
			if (!container.querySelector("#post-diff")) {
				const anchor = document.createElement("span");
				anchor.id = "post-diff";
				container.appendChild(anchor);
			}
			container.appendChild(span);
		} else if (row.type === "del") {
			const span = document.createElement("span");
			span.className = "post-inline-diff-del-target";
			span.textContent = row.text;
			container.appendChild(span);
		}
	}
}

export function initPostInlineDiff() {
	const log = isLogEnabled();
	const sp = new URLSearchParams(window.location.search);
	const isDebug = sp.get(DEBUG_PARAM_KEY) === "1";

	const stateStr = isDebug
		? sessionStorage.getItem(DEBUG_STATE_KEY)
		: localStorage.getItem(NOTIFICATION_STATE_KEY);
	if (!stateStr) return;

	let state: any;
	try {
		state = JSON.parse(stateStr);
	} catch {
		const content = document.querySelector(".markdown-content");
		if (content instanceof HTMLElement) clearInlineDiff(content);
		return;
	}

	const items = Array.isArray(state?.items) ? state.items : [];
	const currentPath = normalizePathname(window.location.pathname);
	const currentStripped = stripBasePath(currentPath);
	const currentCandidates = new Set([currentPath, currentStripped]);

	const matched = items.find((post: any) => {
		if (!post?.isUpdated || !post?.diff) return false;
		const guidPath = normalizePathname(normalizeGuid(post.guid, post.link));
		const linkPath = normalizePathname(getRelativePath(post.link));
		const postCandidates = [
			guidPath,
			linkPath,
			stripBasePath(guidPath),
			stripBasePath(linkPath),
		];
		return postCandidates.some((p) => currentCandidates.has(p));
	});

	const shouldApply =
		isDebug || sp.get("diff") === "1" || window.location.hash === "#post-diff";
	if (log) {
		console.groupCollapsed("[post-inline-diff] init");
		console.log({
			isDebug,
			shouldApply,
			currentPath,
			currentStripped,
			hasMatched: !!matched,
			source: isDebug
				? "sessionStorage:fuwari-diff-debug-state"
				: "localStorage:fuwari-notification-state",
		});
		if (matched) {
			console.log({
				title: matched.title,
				link: matched.link,
				guid: matched.guid,
				diffType: matched.diffType,
				diffKeys: matched.diff ? Object.keys(matched.diff) : [],
			});
			if (matched?.diff?.content)
				console.log({ contentDiffParts: matched.diff.content });
			if (matched?.diff?.title)
				console.log({ titleDiffParts: matched.diff.title });
			if (matched?.diff?.description)
				console.log({ descDiffParts: matched.diff.description });
		}
		console.groupEnd();
	}

	if (!shouldApply || !matched?.diff) {
		const content = document.querySelector(".markdown-content");
		if (content instanceof HTMLElement) clearInlineDiff(content);
		return;
	}

	let diffData: any = matched.diff;
	const diffType = matched.diffType || "composite";

	if (Array.isArray(diffData)) {
		if (diffType === "title") diffData = { title: diffData };
		else if (diffType === "description") diffData = { description: diffData };
		else diffData = { content: diffData };
	} else if (
		diffData.diff &&
		(diffData.diffType === "composite" || diffData.diffType === undefined)
	) {
		diffData = diffData.diff;
	}

	if (diffData.title) {
		const container = document.getElementById("post-title");
		if (container) applySimpleDiff(container, diffData.title);
	}

	if (diffData.description) {
		const container = document.getElementById("post-description");
		if (container) applySimpleDiff(container, diffData.description);
	}

	if (diffData.content) {
		const container = document.querySelector(".markdown-content");
		if (container instanceof HTMLElement)
			applyInlineDiff(container, diffData.content);
	}

	const anchor = document.getElementById("post-diff");
	if (anchor instanceof HTMLElement)
		anchor.scrollIntoView({ behavior: "smooth", block: "start" });
}

export function bindPostInlineDiff() {
	const w = window as any;
	if (w.__fuwariPostInlineDiffBound) return;
	w.__fuwariPostInlineDiffBound = true;
	document.addEventListener("DOMContentLoaded", initPostInlineDiff);
	document.addEventListener("swup:contentReplaced", initPostInlineDiff);
	window.addEventListener("fuwari:diff-debug-updated", initPostInlineDiff);
	const bindSwupHook = () => {
		const swup = (window as any)?.swup;
		if (swup?.hooks?.on) swup.hooks.on("page:view", initPostInlineDiff);
	};
	if ((w as any)?.swup?.hooks?.on) bindSwupHook();
	else document.addEventListener("swup:enable", bindSwupHook, { once: true });
	if (document.readyState !== "loading") initPostInlineDiff();
}
