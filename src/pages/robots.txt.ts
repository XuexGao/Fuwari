import type { APIRoute } from "astro";

const robotsTxt = `
User-agent: *
Disallow: /_astro/
Disallow: /*/
Allow: /posts/
Allow: /archive/
Allow: /friends/
Allow: /gallery/
Allow: /sponsors/
Allow: /cover/
Allow: /changes/

Sitemap: ${new URL("sitemap.xml", import.meta.env.SITE).href}
`.trim();

export const GET: APIRoute = () => {
	return new Response(robotsTxt, {
		headers: {
			"Content-Type": "text/plain; charset=utf-8",
		},
	});
};
