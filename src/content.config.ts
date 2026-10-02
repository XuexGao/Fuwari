import { defineCollection, z } from "astro:content";
import { glob } from "astro/loaders";
import { parsePostDateToDate } from "./utils/date-utils";

const postsCollection = defineCollection({
	loader: glob({ pattern: "**/*.{md,mdx}", base: "./src/content/posts" }),
	schema: z.object({
		title: z.string(),
		published: z.preprocess(parsePostDateToDate, z.date()),
		updated: z.preprocess(parsePostDateToDate, z.date()).optional(),
		draft: z.boolean().optional().default(false),
		description: z.string().optional().default(""),
		image: z.string().optional().default(""),
		tags: z.array(z.string()).optional().default([]),
		lang: z.string().optional().default(""),
		pinned: z.boolean().optional().default(false),
		ai_level: z.number().int().min(1).max(3).optional(),

		/* For internal use */
		prevTitle: z.string().default(""),
		prevSlug: z.string().default(""),
		nextTitle: z.string().default(""),
		nextSlug: z.string().default(""),
	}),
});

const specCollection = defineCollection({
	loader: glob({ pattern: "**/*.{md,mdx}", base: "./src/content/spec" }),
	schema: z.object({
		enable: z.boolean().optional().default(true),
		level: z.string().optional().default("info"),
	}),
});

export const collections = {
	posts: postsCollection,
	spec: specCollection,
};
