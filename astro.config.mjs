import svelte from "@astrojs/svelte";
import tailwind from "@astrojs/tailwind";
import { pluginCollapsibleSections } from "@expressive-code/plugin-collapsible-sections";
import { pluginLineNumbers } from "@expressive-code/plugin-line-numbers";
import swup from "@swup/astro";
import expressiveCode from "astro-expressive-code";
import icon from "astro-icon";
import { defineConfig, passthroughImageService } from "astro/config";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import rehypeComponents from "rehype-components"; /* Render the custom directive content */
import rehypeExternalLinks from "rehype-external-links";
import rehypeKatex from "rehype-katex";
import rehypeSlug from "rehype-slug";
import remarkDirective from "remark-directive"; /* Handle directives */
import remarkMath from "remark-math";
import remarkSectionize from "remark-sectionize";
import { SKIP, visit } from "unist-util-visit";
import { imageFallbackConfig, siteConfig } from "./src/config.ts";
import { expressiveCodeConfig } from "./src/config.ts";
// import { pluginLanguageBadge } from "./src/plugins/expressive-code/language-badge.ts";
import { pluginCustomCopyButton } from "./src/plugins/expressive-code/custom-copy-button.js";
import { AdmonitionComponent } from "./src/plugins/rehype-component-admonition.mjs";
import { AISummaryComponent } from "./src/plugins/rehype-component-ai-summary.mjs";
import { GithubCardComponent } from "./src/plugins/rehype-component-github-card.mjs";
import { UrlCardComponent } from "./src/plugins/rehype-component-url-card.mjs";
import rehypeImageFallback from "./src/plugins/rehype-image-fallback.mjs";
import { rehypeAIAdmonition } from "./src/plugins/rehype-ai-admonition.mjs";
import { parseDirectiveNode } from "./src/plugins/remark-directive-rehype.js";
import { remarkExcerpt } from "./src/plugins/remark-excerpt.js";
import { remarkGithubAdmonitions } from "./src/plugins/remark-github-admonitions.js";
import { remarkReadingTime } from "./src/plugins/remark-reading-time.mjs";

function remarkSpoiler() {
	return (tree) => {
		visit(tree, "paragraph", (node) => {
			const newChildren = [];
			let inSpoiler = false;

			// Check if any child contains '||'
			const hasSpoiler = node.children.some(
				(child) =>
					child.type === "text" && child.value && child.value.includes("||"),
			);

			if (!hasSpoiler) return;

			for (const child of node.children) {
				if (child.type === "text") {
					const parts = child.value.split("||");

					if (parts.length === 1) {
						newChildren.push(child);
						continue;
					}

					parts.forEach((part, index) => {
						if (part) {
							newChildren.push({ type: "text", value: part });
						}

						if (index < parts.length - 1) {
							if (!inSpoiler) {
								newChildren.push({
									type: "html",
									value: '<span class="spoiler" title="点击显示">',
								});
								inSpoiler = true;
							} else {
								newChildren.push({
									type: "html",
									value: "</span>",
								});
								inSpoiler = false;
							}
						}
					});
				} else {
					newChildren.push(child);
				}
			}

			if (inSpoiler) {
				newChildren.push({
					type: "html",
					value: "</span>",
				});
			}

			node.children = newChildren;
			return SKIP;
		});
	};
}

// https://astro.build/config
export default defineConfig({
	redirects: {
		"/donate": {
			status: 302,
			destination: "/sponsors",
		},
	},
image: {
                service: passthroughImageService()
        },
        site: "https://xiegao.top",
	base: "/",
	trailingSlash: "ignore",
	output: "static",
	integrations: [
		tailwind({
			nesting: true,
		}),
		swup({
			theme: false,
			animationClass: "transition-swup-", // see https://swup.js.org/options/#animationselector
			// the default value `transition-` cause transition delay
			// when the Tailwind class `transition-all` is used
			containers: ["main", "#toc"],
			smoothScrolling: true,
			cache: true,
			preload: true,
			accessibility: true,
			updateHead: true,
			updateBodyClass: false,
			globalInstance: true,
		}),
		icon({
			iconDir: "public/icons",
			include: {
				"fa6-regular": [],
				"material-symbols-light": [],
				"material-symbols": ['archive-outline-rounded', 'arrow-downward-rounded', 'arrow-upward-alt-rounded', 'article-outline', 'audio-file-outline', 'auto-fix', 'brightness-auto-outline-rounded', 'build-circle-rounded', 'build-outline-rounded', 'check-box', 'check-box-outline-blank', 'chevron-left-rounded', 'chevron-right', 'chevron-right-rounded', 'close', 'close-rounded', 'cloud-outline', 'code-blocks-outline', 'comment', 'computer', 'contact-mail-outline', 'copyright-outline-rounded', 'dark-mode-outline-rounded', 'delete-rounded', 'description', 'diversity-3', 'download', 'edit-calendar-outline-rounded', 'edit-outline', 'error-outline', 'favorite', 'favorite-outline', 'folder', 'folder-off-outline', 'folder-open', 'folder-open-rounded', 'font-download', 'format-list-numbered', 'group', 'group-outline-rounded', 'help-outline', 'help-outline-rounded', 'history-rounded', 'home-outline-rounded', 'home-rounded', 'home-storage-rounded', 'image-outline', 'image-rounded', 'info-outline-rounded', 'inventory-2-outline', 'keyboard-arrow-up-rounded', 'menu-rounded', 'more-horiz', 'movie-outline', 'notes-rounded', 'open-in-new', 'palette-outline', 'person', 'picture-as-pdf-outline', 'progress-activity', 'schedule-outline-rounded', 'search', 'settings-applications', 'share', 'slideshow', 'sort-by-alpha-rounded', 'star', 'table-chart', 'text-snippet', 'upload-file', 'visibility-outline', 'visibility-outline-rounded', 'volunteer-activism-outline-rounded', 'wb-sunny-outline-rounded'],
				"fa6-solid": ['arrow-rotate-left', 'arrow-up-right-from-square', 'box-archive', 'chevron-right', 'clock-rotate-left', 'face-sad-tear', 'house', 'microchip', 'people-group', 'wand-magic-sparkles'],
				"fa6-brands": ["github"],
				"simple-icons": ["alipay", "microsoftonedrive", "wechat"],
				"mingcute": ["comment-fill"],
			},
		}),
		svelte(),
		expressiveCode({
			themes: [expressiveCodeConfig.theme].flat(),
			useDarkModeMediaQuery: false,
			plugins: [
				pluginCollapsibleSections(),
				pluginLineNumbers(),
				// pluginLanguageBadge(),
				pluginCustomCopyButton(),
			],
			defaultProps: {
				wrap: true,
				overridesByLang: {
					shellsession: {
						showLineNumbers: false,
					},
				},
			},
			styleOverrides: {
				codeBackground: "var(--codeblock-bg)",
				borderRadius: "0.25rem",
				borderColor: "none",
				codeFontSize: "0.875rem",
				codeFontFamily:
					"'JetBrains Mono Variable', ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace",
				codeLineHeight: "1.5rem",
				frames: {
					editorBackground: "var(--codeblock-bg)",
					terminalBackground: "var(--codeblock-bg)",
					terminalTitlebarBackground: "var(--codeblock-topbar-bg)",
					editorTabBarBackground: "var(--codeblock-topbar-bg)",
					editorActiveTabBackground: "none",
					editorActiveTabIndicatorBottomColor: "var(--primary)",
					editorActiveTabIndicatorTopColor: "none",
					editorTabBarBorderBottomColor: "var(--codeblock-topbar-bg)",
					terminalTitlebarBorderBottomColor: "none",
				},
				textMarkers: {
					delHue: 0,
					insHue: 180,
					markHue: 250,
				},
			},
			frames: {
				showCopyToClipboardButton: false,
			},
		}),
	],
	markdown: {
		remarkPlugins: [
			remarkSpoiler,
			remarkMath,
			remarkReadingTime,
			remarkExcerpt,
			remarkGithubAdmonitions,
			remarkDirective,
			remarkSectionize,
			parseDirectiveNode,
		],
		rehypePlugins: [
			rehypeKatex,
			rehypeSlug,
			[rehypeImageFallback, imageFallbackConfig],
			[
				rehypeComponents,
				{
					components: {
						github: GithubCardComponent,
						url: UrlCardComponent,
						"ai-summary": AISummaryComponent,
						note: (x, y) => AdmonitionComponent(x, y, "note"),
						tip: (x, y) => AdmonitionComponent(x, y, "tip"),
						important: (x, y) => AdmonitionComponent(x, y, "important"),
						caution: (x, y) => AdmonitionComponent(x, y, "caution"),
						warning: (x, y) => AdmonitionComponent(x, y, "warning"),
						ai: (x, y) => AdmonitionComponent(x, y, "ai"),
					},
				},
			],
			rehypeAIAdmonition,
			[
				rehypeExternalLinks,
				{
					target: "_blank",
				},
			],
			[
				rehypeAutolinkHeadings,
				{
					behavior: "append",
					properties: {
						className: ["anchor"],
					},
					content: {
						type: "element",
						tagName: "span",
						properties: {
							className: ["anchor-icon"],
							"data-pagefind-ignore": true,
						},
						children: [
							{
								type: "text",
								value: "#",
							},
						],
					},
				},
			],
		],
	},
	vite: {
		server: {
		allowedHosts: ['xiegao.top']
	},
		build: {
			target: "esnext",
			cssMinify: "esbuild",
			modulePreload: {
				polyfill: false,
			},
			rollupOptions: {
				onwarn(warning, warn) {
					// temporarily suppress this warning
					if (
						warning.message.includes("is dynamically imported by") &&
						warning.message.includes("but also statically imported by")
					) {
						return;
					}
					warn(warning);
				},
			},
		},
	},
});
