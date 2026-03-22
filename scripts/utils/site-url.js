import fs from "node:fs";
import path from "node:path";

export function getSiteUrlFromConfig({
	configPath = path.join(process.cwd(), "astro.config.mjs"),
	fallback = null,
} = {}) {
	try {
		const configContent = fs.readFileSync(configPath, "utf8");
		const match = configContent.match(/\bsite:\s*["']([^"']+)["']/);
		if (match && match[1]) {
			return match[1].replace(/\/$/, "");
		}
	} catch {
		// noop: caller decides fallback behavior
	}
	return fallback;
}
