/// <reference types="mdast" />
import { h } from "hastscript";

/**
 * Creates an admonition component.
 *
 * @param {Object} properties - The properties of the component.
 * @param {string} [properties.title] - An optional title.
 * @param {('tip'|'note'|'important'|'caution'|'warning')} type - The admonition type.
 * @param {import('mdast').RootContent[]} children - The children elements of the component.
 * @returns {import('mdast').Parent} The created admonition component.
 */
export function AdmonitionComponent(properties, children, type) {
	if (!Array.isArray(children) || children.length === 0)
		return h(
			"div",
			{ class: "hidden" },
			'Invalid admonition directive. (Admonition directives must be of block type ":::note{name="name"} <content> :::")',
		);

	const titleMap = {
		ai: "AI 摘要",
		note: "提示",
		tip: "小贴士",
		important: "重要",
		warning: "警告",
		caution: "注意",
	};

	const isAI = type.toLowerCase() === "ai";

	let label = null;
	if (properties?.["has-directive-label"]) {
		label = children[0]; // The first child is the label
		// biome-ignore lint/style/noParameterAssign: <explanation>
		children = children.slice(1);
		label.tagName = "div"; // Change the tag <p> to <div>
	} else if (isAI && properties?.title) {
		// If it's an AI admonition and has a title property, use it as a footer
		children.push(h("div", { class: "bdm-footer" }, properties.title));
	}

	const displayTitle =
		!isAI && label
			? label
			: (titleMap[type.toLowerCase()] ?? type.toUpperCase());

	return h("blockquote", { class: `admonition bdm-${type}` }, [
		h("span", { class: "bdm-title" }, displayTitle),
		...children,
	]);
}
