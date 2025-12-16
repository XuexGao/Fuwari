import sitemap from "@astrojs/sitemap";
import svelte from "@astrojs/svelte";
import tailwind from "@astrojs/tailwind";
import swup from "@swup/astro";
import icon from "astro-icon";
import { defineConfig } from "astro/config";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import rehypeComponents from "rehype-components";/* Render the custom directive content */
import rehypeKatex from "rehype-katex";
import rehypeSlug from "rehype-slug";
import remarkDirective from "remark-directive";/* Handle directives */
import remarkGithubAdmonitionsToDirectives from "remark-github-admonitions-to-directives";
import remarkMath from "remark-math";
import remarkSectionize from "remark-sectionize";
import { imageFallbackConfig, siteConfig } from "./src/config.ts";
import { AdmonitionComponent } from "./src/plugins/rehype-component-admonition.mjs";
import { GithubCardComponent } from "./src/plugins/rehype-component-github-card.mjs";
import rehypeImageFallback from "./src/plugins/rehype-image-fallback.mjs";
import { parseDirectiveNode } from "./src/plugins/remark-directive-rehype.js";
import { remarkExcerpt } from "./src/plugins/remark-excerpt.js";
import { remarkReadingTime } from "./src/plugins/remark-reading-time.mjs";
import rehypeExternalLinks from 'rehype-external-links';
import expressiveCode from "astro-expressive-code";
import { pluginCollapsibleSections } from "@expressive-code/plugin-collapsible-sections";
import { pluginLineNumbers } from "@expressive-code/plugin-line-numbers";
import { expressiveCodeConfig } from "./src/config.ts";
// import { pluginLanguageBadge } from "./src/plugins/expressive-code/language-badge.ts";
import { pluginCustomCopyButton } from "./src/plugins/expressive-code/custom-copy-button.js";
import { defineConfig, passthroughImageService } from 'astro/config';

// https://astro.build/config
export default defineConfig({
      image: {
    service: passthroughImageService()
  },
    site: "https://blog.acofork.com",
    base: "/",
    trailingSlash: "always",
    output: "static",
    redirects: {
      "/donate": "/sponsors",
      "/ak": "https://akile.io/register?aff_code=503fe5ea-e7c5-4d68-ae05-6de99513680e",
      "/kook": "https://kook.vip/K29zpT",
      "/long": "https://iiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiii.iiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiii.in/",
      "/mly": "https://muleyun.com/aff/GOTRJLPN",
      "/tg": "https://t.me/+_07DERp7k1ljYTc1",
      "/tit": "/posts/pin/",
      "/tly": "https://tianlicloud.cn/aff/HNNCFKGP",
      "/wly": "https://wl.awcmam.com/#/register?code=FNQwOQBM",
      "/yyb": "https://www.rainyun.com/acofork_?s=bilibili",
      "/iku": "https://ikuuu.de/auth/register?code=Bjou",
      "/esa": "https://tianchi.aliyun.com/specials/promotion/freetier/esa?taskCode=25254&recordId=c856e61228828a0423417a767828d166"
    },
    integrations: [tailwind({
        nesting: true,
		}), swup({
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
		}), icon({
        include: {
            "preprocess: vitePreprocess(),": ["*"],
            "fa6-brands": ["*"],
            "fa6-regular": ["*"],
            "fa6-solid": ["*"],
            "simple-icons": ["*"],
            "material-symbols-light": ["*"],
            "material-symbols": ["*"],
        },
		}), svelte(), sitemap(),
	    expressiveCode({
			themes: [expressiveCodeConfig.theme, expressiveCodeConfig.theme],
			plugins: [
				pluginCollapsibleSections(),
				pluginLineNumbers(),
				// pluginLanguageBadge(),
				pluginCustomCopyButton()
			],
			defaultProps: {
				wrap: true,
				overridesByLang: {
					'shellsession': {
						showLineNumbers: false,
					},
				},
			},
			styleOverrides: {
				codeBackground: "var(--codeblock-bg)",
				borderRadius: "0.25rem",
				borderColor: "none",
				codeFontSize: "0.875rem",
				codeFontFamily: "'JetBrains Mono Variable', ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace",
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
					terminalTitlebarBorderBottomColor: "none"
				},
				textMarkers: {
					delHue: 0,
					insHue: 180,
					markHue: 250
				}
			},
			frames: {
				showCopyToClipboardButton: false,
			}
		}),
	],
    markdown: {
        remarkPlugins: [
            remarkMath,
            remarkReadingTime,
            remarkExcerpt,
            remarkGithubAdmonitionsToDirectives,
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
                        note: (x, y) => AdmonitionComponent(x, y, "note"),
                        tip: (x, y) => AdmonitionComponent(x, y, "tip"),
                        important: (x, y) => AdmonitionComponent(x, y, "important"),
                        caution: (x, y) => AdmonitionComponent(x, y, "caution"),
                        warning: (x, y) => AdmonitionComponent(x, y, "warning"),
                    },
                },
            ],
			[
				rehypeExternalLinks,
				{
				target: '_blank',
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
        build: {
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