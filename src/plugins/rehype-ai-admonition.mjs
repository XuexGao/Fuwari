import { visit } from "unist-util-visit";
import { AdmonitionComponent } from "./rehype-component-admonition.mjs";

export function rehypeAIAdmonition() {
	return (tree) => {
		visit(tree, "element", (node, index, parent) => {
			if (!parent || typeof index !== "number") return;
			if (node.tagName !== "ai") return;
			parent.children[index] = AdmonitionComponent(
				node.properties ?? {},
				node.children ?? [],
				"ai",
			);
		});
	};
}
