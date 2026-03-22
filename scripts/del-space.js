#!/usr/bin/env node

import fs from "fs";
import path from "path";
import {
	POSTS_DIR,
	buildMarkdownGlob,
	listFiles,
} from "./utils/content-files.js";

/**
 * 获取所有 markdown 文件
 */
async function getAllMarkdownFiles() {
	try {
			return await listFiles(buildMarkdownGlob(POSTS_DIR, ["md"]));
	} catch (error) {
		console.error("获取 markdown 文件失败:", error.message);
		return [];
	}
}

/**
 * 处理单个 Markdown 文件
 */
async function processMarkdownFile(filePath) {
	let content = fs.readFileSync(filePath, "utf-8");
	let originalContent = content;
	let hasChanges = false;
    let changedCount = 0;

	const replacements = [];

	// 1. 处理 YAML frontmatter 中的 image 字段
	const yamlImageRegex = /^---[\s\S]*?image:\s*(?:['"]([^'"]+)['"]|([^\s\n]+))[\s\S]*?^---/m;
	let match = yamlImageRegex.exec(content);
	if (match) {
		const fullMatch = match[0];
        // 捕获组1是带引号的，捕获组2是不带引号的
		const imagePath = match[1] || match[2];
        
        if (imagePath && (imagePath.includes(" ") || imagePath.includes("%20") || imagePath.includes(",") || hasExtraDots(imagePath))) {
            // 当路径包含空格、%20、逗号或额外点时处理
             const result = await handleImageRename(filePath, imagePath);
             if (result) {
                 // 替换 YAML 中的路径
                 // 注意：这里需要小心替换，只替换 image: 后的部分
                 // 简单起见，我们对整个 content 做字符串替换，但要注意唯一性
                 // 更稳妥的方式是替换 match[0] 中的 imagePath
                 
                 // 这里我们先收集替换信息，最后统一替换，或者直接替换 content
                 // 为了防止多次替换导致错乱，我们记录下来
                 replacements.push({
                     original: imagePath,
                     new: result
                 });
             }
        }
	}

	// 2. 处理 Markdown 图片语法 ![alt](url)
	// 修复：支持 URL 中包含一层括号，例如 image(1).png
	const markdownImageRegex = /!\[.*?\]\(((?:[^()]+|\([^()]*\))+)\)/g;
	while ((match = markdownImageRegex.exec(content)) !== null) {
		const fullUrl = match[1];
        // 去除可能的 title 部分
        let url = fullUrl;
        const titleMatch = url.match(/^(\S+)\s+["'].*["']$/);
		if (titleMatch) {
			url = titleMatch[1];
		}
        
        // 去除 <> 包裹
        if (url.startsWith('<') && url.endsWith('>')) {
            url = url.slice(1, -1);
        }

		if (url.includes(" ") || url.includes("%20") || url.includes(",") || hasExtraDots(url)) {
             const result = await handleImageRename(filePath, url);
             if (result) {
                 replacements.push({
                     original: url, // 这里需要替换的是原始引用的 url 部分 (不含 title)
                     new: result,
                     fullMatch: fullUrl // 也可以用于定位
                 });
             }
		}
	}
    
    // 3. 处理 HTML img 标签 <img src="...">
    const htmlImageRegex = /<img[^>]+src=["']([^"']+)["'][^>]*>/gi;
    while ((match = htmlImageRegex.exec(content)) !== null) {
        const url = match[1];
        if (url.includes(" ") || url.includes("%20") || url.includes(",") || hasExtraDots(url)) {
             const result = await handleImageRename(filePath, url);
             if (result) {
                 replacements.push({
                     original: url,
                     new: result
                 });
             }
        }
    }

    // 执行替换
    if (replacements.length > 0) {
        // 按照 original 长度倒序排序，避免部分替换
        replacements.sort((a, b) => b.original.length - a.original.length);
        
        // 去重
        const uniqueReplacements = new Map();
        replacements.forEach(item => {
            if (!uniqueReplacements.has(item.original)) {
                uniqueReplacements.set(item.original, item.new);
            }
        });

        for (const [original, newPath] of uniqueReplacements) {
            // 全局替换
            // 需要转义正则特殊字符
            const escapedOriginal = original.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
            const regex = new RegExp(escapedOriginal, 'g');
            
            if (content.match(regex)) {
                content = content.replace(regex, newPath);
                hasChanges = true;
                changedCount++;
                console.log(`  🔄 更新引用: "${original}" -> "${newPath}"`);
            }
        }
    }

	if (hasChanges) {
		fs.writeFileSync(filePath, content, "utf-8");
		console.log(`💾 已保存文件: ${path.relative(process.cwd(), filePath)} (更新了 ${changedCount} 处引用)`);
	}
}

/**
 * 处理图片重命名
 * @returns {string|null} 新的相对路径，如果没有变化或失败则返回 null
 */
async function handleImageRename(markdownPath, imagePath) {
    // 1. 解析绝对路径
    let absolutePath = null;
    const markdownDir = path.dirname(markdownPath);

    // 解码 URL (处理 %20)
    let decodedPath = imagePath;
    try {
        decodedPath = decodeURIComponent(imagePath);
    } catch (e) {
        // ignore
    }

    if (decodedPath.startsWith("http://") || decodedPath.startsWith("https://")) {
        return null;
    }
    
    if (decodedPath.startsWith("/")) {
        // 绝对路径，通常相对于 public 或 src (这里假设是 src/content/assets 或者 public)
        // Fuwari 项目结构似乎图片在 src/content/assets
        // 如果以 / 引用，可能很难确定根目录，暂且跳过，除非它是相对于 content 的
        // 观察现有代码，normalizePath 忽略了 / 开头的。
        // 但用户提到 "寻找MarkDown中的相对路径的图片"，所以我们可以只关注相对路径
        return null;
    } else {
        // 相对路径
        const candidates = [decodedPath];
        if (decodedPath !== imagePath) {
            candidates.push(imagePath);
        }

        for (const candidate of candidates) {
            const candidateAbs = path.resolve(markdownDir, candidate);
            if (fs.existsSync(candidateAbs)) {
                absolutePath = candidateAbs;
                break;
            }
        }
    }

    if (!fs.existsSync(absolutePath)) {
        console.warn(`  ⚠️  图片不存在 (跳过): ${decodedPath}`);
        return null;
    }

    // 2. 生成新文件名 (删除空格、逗号、以及除了扩展名点之外的其他点)
    const dir = path.dirname(absolutePath);
    const filename = path.basename(absolutePath);
    const ext = path.extname(filename);
    const nameWithoutExt = path.basename(filename, ext);
    
    // 移除空格、%20、逗号、以及点
    const newName = nameWithoutExt
        .replace(/\s+/g, "")
        .replace(/%20/g, "")
        .replace(/,/g, "")
        .replace(/\./g, ""); // 移除文件名主体中的所有点

    const newFilename = newName + ext;

    if (filename === newFilename) {
        return null; // 没有变化
    }

    const newAbsolutePath = path.join(dir, newFilename);

    // 3. 重命名文件
    try {
        if (fs.existsSync(newAbsolutePath)) {
            // 如果目标文件已存在
            // 比较内容是否一致？或者直接覆盖？或者跳过？
            // 简单起见，如果目标存在且不是同一个文件（虽然文件名不同，但在某些不区分大小写系统可能冲突，不过这里是去除空格，应该不同）
            // 假设用户希望合并
            console.warn(`  ⚠️  目标文件已存在: ${path.basename(newAbsolutePath)} (将使用已存在的文件)`);
            // 如果源文件存在，删除源文件 (因为它被合并到了目标文件)
            // 但为了安全，也许我们不应该删除，只是更新引用？
            // 还是说：如果A.png和A .png都存在，我们将A .png重命名为A.png，这会覆盖A.png吗？
            // fs.renameSync 会覆盖。
            // 既然是"del-space"，如果去空格后的文件已存在，说明可能已经有一份了。
            // 我们可以认为它们是同一张图（或者用户不介意），直接使用新文件名，并保留（或覆盖）
            
            // 安全起见，如果目标存在，我们不覆盖，只是更新引用指向它。
            // 但是源文件怎么办？如果不删除，就是"clean"脚本的事了。
            // 用户说 "同步修改原图的文件名"，implies rename.
            // 如果我 rename A to B, and B exists. rename fails or overwrites.
            // 让我们尝试 rename，如果报错再处理.
        } else {
             fs.renameSync(absolutePath, newAbsolutePath);
             console.log(`  ✨ 重命名图片: "${filename}" -> "${newFilename}"`);
        }
    } catch (error) {
        console.error(`  ❌ 重命名失败: ${error.message}`);
        return null;
    }

    // 4. 返回新的相对路径
    // 保持原来的相对路径结构，只改变文件名
    // imagePath 可能是 ../assets/foo bar.png
    // 我们需要返回 ../assets/foobar.png
    
    // 重新构建引用路径
    // 使用 path.dirname(imagePath) 可能会受到 OS 分隔符影响
    // 我们简单地替换文件名
    
    // 注意：imagePath 可能是 encoded 的 (%20)，也可能是 raw space
    // 我们返回的新路径应该是不包含空格的，通常不需要 encode
    
    // 获取 imagePath 的目录部分
    // 简单的字符串操作：找到最后一个 / 或 \
    const lastSeparatorIndex = Math.max(imagePath.lastIndexOf('/'), imagePath.lastIndexOf('\\'));
    let newReferencePath;
    if (lastSeparatorIndex === -1) {
        newReferencePath = newFilename;
    } else {
        newReferencePath = imagePath.substring(0, lastSeparatorIndex + 1) + newFilename;
    }

    return newReferencePath.replace(/%20/g, "");
}

/**
 * 检查路径中是否包含除了扩展名点之外的其他点（仅检查文件名部分）
 */
function hasExtraDots(imagePath) {
    try {
        // 解码
        let decodedPath = imagePath;
        try {
            decodedPath = decodeURIComponent(imagePath);
        } catch (e) {
            // ignore
        }
        
        // 获取文件名
        const filename = path.basename(decodedPath);
        
        // 如果是以点开头的文件（如 .gitignore），忽略
        if (filename.startsWith('.')) {
            // 如果只有开头的点，没有其他点，则是 false
            // 如果有其他点，如 .foo.bar，则是 true
            const parts = filename.split('.');
            return parts.length > 2;
        }
        
        // 正常文件名
        const ext = path.extname(filename);
        const nameWithoutExt = path.basename(filename, ext);
        
        // 检查 nameWithoutExt 是否包含点
        return nameWithoutExt.includes('.');
    } catch (error) {
        return false;
    }
}

async function main() {
	console.log("🔍 开始扫描 Markdown 文件中的空格图片路径...");
    
    if (!fs.existsSync(POSTS_DIR)) {
		console.error(`❌ Posts 目录不存在: ${POSTS_DIR}`);
		return;
	}

    const files = await getAllMarkdownFiles();
    console.log(`📄 找到 ${files.length} 个 Markdown 文件`);

    for (const file of files) {
        // console.log(`检查: ${path.relative(process.cwd(), file)}`);
        await processMarkdownFile(file);
    }
    
    console.log("✅ 完成！");
}

main().catch(err => {
    console.error("❌ 发生错误:", err);
    process.exit(1);
});
