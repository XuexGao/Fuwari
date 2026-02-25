#!/usr/bin/env node

import fs from "fs";
import path from "path";
import { glob } from "glob";

const CONTENT_DIR = path.join(process.cwd(), "src", "content");

function isFenceStart(line) {
	const m = String(line ?? "").match(/^\s*(```+|~~~+)\s*/);
	return m ? m[1] : null;
}

function isFenceEnd(line, fence) {
	if (!fence) return false;
	return new RegExp(`^\\s*${fence.replace(/[-/\\\\^$*+?.()|[\\]{}]/g, "\\$&")}\\s*$`).test(
		String(line ?? ""),
	);
}

function isImageOnlyLine(line) {
	const s = String(line ?? "").trim();
	if (!s) return false;
	return /^!\[[^\]]*]\(\s*[^)]+?\s*\)\s*$/.test(s);
}

function fixAdjacentImages(content) {
	const eol = content.includes("\r\n") ? "\r\n" : "\n";
	const hasFinalNewline = content.endsWith("\n");
	const lines = content.split(/\r?\n/);

	const out = [];
	let changed = false;
	let inFence = false;
	let fence = null;

	for (const line of lines) {
		const maybeFence = isFenceStart(line);
		if (!inFence && maybeFence) {
			inFence = true;
			fence = maybeFence;
			out.push(line);
			continue;
		}
		if (inFence && isFenceEnd(line, fence)) {
			inFence = false;
			fence = null;
			out.push(line);
			continue;
		}

		if (!inFence && isImageOnlyLine(line) && isImageOnlyLine(out[out.length - 1])) {
			out.push("");
			changed = true;
		}

		out.push(line);
	}

	let next = out.join(eol);
	if (hasFinalNewline && !next.endsWith(eol)) next += eol;
	return { next, changed };
}

async function main() {
	const args = new Set(process.argv.slice(2));
	if (args.has("--help") || args.has("-h")) {
		console.log("Usage: pnpm imgf [--check]");
		console.log("  --check    Print files that would change, but do not write");
		return;
	}
	const dryRun = args.has("--check") || args.has("--dry-run");

	const pattern = path.join(CONTENT_DIR, "**/*.md").replace(/\\/g, "/");
	const files = await glob(pattern, { nodir: true });
	if (!files.length) {
		console.log("No markdown files found.");
		return;
	}

	let changedFiles = 0;
	for (const filePath of files) {
		const original = fs.readFileSync(filePath, "utf-8");
		const { next, changed } = fixAdjacentImages(original);
		if (!changed || next === original) continue;
		if (!dryRun) fs.writeFileSync(filePath, next, "utf-8");
		changedFiles += 1;
		console.log(`${dryRun ? "Would update" : "Updated"}: ${path.relative(process.cwd(), filePath)}`);
	}

	console.log(`Done. ${dryRun ? "Would update" : "Updated"} ${changedFiles} file(s).`);
}

main().catch((err) => {
	console.error(err);
	process.exitCode = 1;
});
