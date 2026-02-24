import { getCollection } from "astro:content";
import type { APIRoute } from "astro";

export async function getStaticPaths() {
	return [
		{ params: { lang: 'zh-cn' } },
		{ params: { lang: 'en' } },
	];
}

interface SitemapPage {
	url: string;
	priority: number;
	changefreq: string;
	lastmod?: Date;
}
export const GET: APIRoute = async (context) => {
	const { lang } = context.params;
	const posts = await getCollection("posts", ({ data }) => {
		return !data.draft;
	});

	const staticPages: SitemapPage[] = [
		{ url: `/${lang}/`, priority: 1.0, changefreq: "daily" },
		{ url: `/${lang}/archive/`, priority: 0.8, changefreq: "weekly" },
		{ url: `/${lang}/friends/`, priority: 0.6, changefreq: "monthly" },
		{ url: `/${lang}/gallery/`, priority: 0.6, changefreq: "monthly" },
		{ url: `/${lang}/sponsors/`, priority: 0.5, changefreq: "monthly" },
		{ url: `/${lang}/changes/`, priority: 0.5, changefreq: "daily" },
	];

	const postPages: SitemapPage[] = posts.map((post) => ({
		url: `/${lang}/posts/${post.slug}/`,
		priority: 0.7,
		changefreq: "weekly",
		lastmod: post.data.updated || post.data.published,
	}));

	const allPages: SitemapPage[] = [...staticPages, ...postPages];

	const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${allPages
	.map((page) => {
		const loc = `	<loc>${new URL(page.url, import.meta.env.SITE).href}</loc>`;
		const priority = `	<priority>${page.priority}</priority>`;
		const changefreq = `	<changefreq>${page.changefreq}</changefreq>`;
		const lastmod = page.lastmod
			? `	<lastmod>${new Date(page.lastmod).toISOString().split("T")[0]}</lastmod>`
			: "";
		return `	<url>
${loc}
${priority}
${changefreq}${lastmod ? `\n${lastmod}` : ""}
	</url>`;
	})
	.join("\n")}
</urlset>`.trim();

	return new Response(sitemap, {
		headers: {
			"Content-Type": "application/xml; charset=utf-8",
		},
	});
};
