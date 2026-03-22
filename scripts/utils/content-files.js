import path from "node:path";
import { glob } from "glob";

export const CONTENT_DIR = path.join(process.cwd(), "src", "content");
export const POSTS_DIR = path.join(CONTENT_DIR, "posts");
export const SPEC_DIR = path.join(CONTENT_DIR, "spec");

function toGlobPath(targetPath) {
	return targetPath.replace(/\\/g, "/");
}

export function buildMarkdownGlob(
	targetDir,
	extensions = ["md"],
) {
	const normalizedExt = Array.from(
		new Set(
			(extensions || [])
				.map((ext) => String(ext).trim().replace(/^\./, ""))
				.filter(Boolean),
		),
	);

	const finalExt = normalizedExt.length > 0 ? normalizedExt : ["md"];
	const pattern =
		finalExt.length === 1
			? path.join(targetDir, `**/*.${finalExt[0]}`)
			: path.join(targetDir, `**/*.{${finalExt.join(",")}}`);

	return toGlobPath(pattern);
}

export async function listFiles(patterns) {
	const normalized = Array.isArray(patterns) ? patterns : [patterns];
	const result = await Promise.all(
		normalized.map((pattern) => glob(pattern, { nodir: true })),
	);
	return Array.from(new Set(result.flat())).sort();
}
