
import { visit } from 'unist-util-visit';

export function rehypeInjectAds() {
	return (tree, file) => {
		// Only apply to posts in content/posts
		if (!file.path || (!file.path.includes('content/posts') && !file.path.includes('content\\posts'))) {
			return;
		}

		let paragraphCount = 0;
		let inserted = false;

		const adNode = {
			type: 'element',
			tagName: 'div',
			properties: {
				className: ['ad-container', 'my-8'],
				style: 'text-align: center;'
			},
			children: [
				{
					type: 'element',
					tagName: 'ins',
					properties: {
						className: ['adsbygoogle'],
						style: 'display:block; text-align:center;',
						'data-ad-layout': 'in-article',
						'data-ad-format': 'fluid',
						'data-ad-client': 'ca-pub-1683686345039700',
						'data-ad-slot': '2837130174'
					},
					children: []
				},
				{
					type: 'element',
					tagName: 'script',
					properties: {},
					children: [
						{
							type: 'text',
							value: '(adsbygoogle = window.adsbygoogle || []).push({});'
						}
					]
				}
			]
		};

		visit(tree, 'element', (node, index, parent) => {
			if (inserted) return;

			if (node.tagName === 'p') {
				// Check parent to decide if we should count this paragraph
				// We want to count paragraphs in the main flow (root, section, div)
				// We want to avoid paragraphs in blockquotes, lists, tables, etc.
				
				const validParents = ['root', 'section', 'div', 'article', 'main'];
				let isValidParent = false;
				
				if (parent.type === 'root') isValidParent = true;
				if (parent.type === 'element' && validParents.includes(parent.tagName)) isValidParent = true;

				if (isValidParent) {
					paragraphCount++;
					if (paragraphCount === 3) {
						parent.children.splice(index + 1, 0, adNode);
						inserted = true;
					}
				}
			}
		});
	};
}
