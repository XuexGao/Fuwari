import { getSortedPosts } from "@/utils/content-utils";
import type { APIContext } from "astro";

function toPlainText(markdown: string): string {
	return markdown
		.replace(/!\[[^\]]*]\([^)]*\)/g, " ")
		.replace(/\[([^\]]+)]\([^)]*\)/g, "$1")
		.replace(/```[\s\S]*?```/g, " ")
		.replace(/`[^`]*`/g, " ")
		.replace(/<[^>]*>/g, " ")
		.replace(/[#>*_\-~]/g, " ")
		.replace(/\s+/g, " ")
		.trim();
}

export async function GET(_context: APIContext) {
	const posts = await getSortedPosts();
	const payload = posts.map((post) => ({
		title: post.data.title || "",
		description: post.data.description || "",
		content: toPlainText(post.body || ""),
		link: post.slug,
	}));

	return new Response(JSON.stringify(payload), {
		headers: {
			"Content-Type": "application/json; charset=utf-8",
			"Cache-Control": "public, max-age=600",
		},
	});
}
