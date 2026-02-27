#!/usr/bin/env node

import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { glob } from "glob";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const CONTENT_DIR = path.join(process.cwd(), "src/content");
const OLD_PATH = "../assets/images/";
const NEW_PATH = "https://cnb.cool/2x.nz/fuwari/-/git/raw/main/src/content/assets/images/";

/**
 * 获取所有 markdown 文件
 */
async function getAllMarkdownFiles() {
	try {
		const pattern = path.join(CONTENT_DIR, "**/*.md").replace(/\\/g, "/");
		return await glob(pattern);
	} catch (error) {
		console.error("获取 markdown 文件失败:", error.message);
		return [];
	}
}

/**
 * 主函数
 */
async function cdnifyImages() {
	console.log("🔍 开始替换图片路径为 CDN URL...");

	const markdownFiles = await getAllMarkdownFiles();
	console.log(`📄 找到 ${markdownFiles.length} 个 markdown 文件`);

	let updatedCount = 0;
	let totalReplaced = 0;

	for (const file of markdownFiles) {
		try {
			const content = fs.readFileSync(file, "utf-8");
			if (content.includes(OLD_PATH)) {
				// 统计替换次数
				const occurrences = (content.match(new RegExp(OLD_PATH.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'g')) || []).length;
				
				const newContent = content.replaceAll(OLD_PATH, NEW_PATH);
				fs.writeFileSync(file, newContent);
				
				console.log(`✅ 已更新: ${path.relative(process.cwd(), file)} (${occurrences} 处替换)`);
				updatedCount++;
				totalReplaced += occurrences;
			}
		} catch (error) {
			console.warn(`⚠️  读取或写入文件失败: ${file} - ${error.message}`);
		}
	}

	console.log(`\n✨ 完成！更新了 ${updatedCount} 个文件，共替换 ${totalReplaced} 处路径。`);
}

// 运行脚本
cdnifyImages().catch((error) => {
	console.error("❌ 脚本执行失败:", error.message);
	process.exit(1);
});
