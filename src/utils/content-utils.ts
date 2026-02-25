import { getCollection } from "astro:content";

export async function getSortedPosts(lang?: string) {
	const allBlogPosts = await getCollection("posts", ({ data }) => {
		const isDraft = import.meta.env.PROD ? data.draft !== true : true;
		if (!isDraft) return false;
		if (lang) {
			const postLang = data.lang || "zh-cn";
			return postLang === lang;
		}
		return true;
	});
	const sorted = allBlogPosts.sort((a, b) => {
		// 如果一个是置顶一个不是置顶，置顶的排在前面
		if (a.data.pinned !== b.data.pinned) {
			return a.data.pinned ? -1 : 1;
		}
		// 都是置顶或都不是置顶，按发布日期时间排序（包含小时分钟秒）
		const dateA = new Date(a.data.published).getTime();
		const dateB = new Date(b.data.published).getTime();
		return dateB - dateA;
	});

	for (let i = 1; i < sorted.length; i++) {
		sorted[i].data.nextSlug = sorted[i - 1].slug;
		sorted[i].data.nextTitle = sorted[i - 1].data.title;
	}
	for (let i = 0; i < sorted.length - 1; i++) {
		sorted[i].data.prevSlug = sorted[i + 1].slug;
		sorted[i].data.prevTitle = sorted[i + 1].data.title;
	}

	return sorted;
}
