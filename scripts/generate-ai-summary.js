
import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const API_URL = 'http://localhost:1234/api/v1/chat';
const MODEL = 'qwen/qwen3-vl-8b';
const SYSTEM_PROMPT = "你是一个专业的摘要生成器，请将输入文本压缩为明显短于原文的一段摘要（控制在原文长度的10%–20%以内），仅保留核心观点、关键事实和结论，严禁新增信息、扩写内容、举例说明或加入背景解释，不得改写为完整文章，不得使用任何引导语或总结性套话（如“摘要：”“本文介绍了”等），也不得包含自我说明、评价或任何元数据，只输出一段纯正文文本。";

async function generateSummary(text) {
    try {
        const response = await fetch(API_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                model: MODEL,
                system_prompt: SYSTEM_PROMPT,
                input: text
            })
        });

        if (!response.ok) {
            throw new Error(`API Error: ${response.statusText}`);
        }

        const data = await response.json();
        // Assuming the response structure matches the user's provided example
        if (data.output && data.output.length > 0 && data.output[0].content) {
            return data.output[0].content;
        }
        throw new Error('Invalid response format');
    } catch (error) {
        console.error('Error generating summary:', error);
        return null;
    }
}

async function processFile(filePath) {
    console.log(`Processing file: ${filePath}`);
    try {
        let content = await fs.readFile(filePath, 'utf-8');

        // Remove existing AI summary if present
        const aiBlockRegex = /> \[!ai\].*(\r?\n> .*)*\r?\n*/g;
        if (aiBlockRegex.test(content)) {
            console.log('Removing existing AI summary...');
            content = content.replace(aiBlockRegex, '');
        }

        // Split frontmatter and content
        // Regex to match YAML frontmatter: ^---\n[\s\S]*?\n---\n
        const frontmatterRegex = /^---\r?\n([\s\S]*?)\r?\n---\r?\n/;
        const match = content.match(frontmatterRegex);

        let bodyText = content;
        let insertPosition = 0;

        if (match) {
            // Frontmatter found
            insertPosition = match[0].length;
            bodyText = content.slice(insertPosition);
        }

        // Generate summary from body text
        // Limit text length to avoid token limits if necessary (e.g., first 5000 chars)
        const textForAI = bodyText.slice(0, 5000).trim();
        
        if (!textForAI) {
            console.log('Content is empty, skipping summary generation.');
            return;
        }

        console.log('Generating summary...');
        const summary = await generateSummary(textForAI);

        if (summary) {
            const summaryBlock = `> [!ai] ${MODEL}\n> ${summary.replace(/\n/g, '\n> ')}\n\n`;
            
            const newContent = content.slice(0, insertPosition) + summaryBlock + content.slice(insertPosition);
            
            await fs.writeFile(filePath, newContent, 'utf-8');
            console.log('Summary added successfully.');
        } else {
            console.log('Failed to generate summary.');
        }

    } catch (error) {
        console.error(`Error processing file ${filePath}:`, error);
    }
}

async function main() {
    const args = process.argv.slice(2);
    const fileArgIndex = args.indexOf('--file');
    const allArgIndex = args.indexOf('--all');
    const targetDir = path.resolve(__dirname, '../src/content/posts');

    if (fileArgIndex !== -1 && args[fileArgIndex + 1]) {
        const filePath = path.resolve(args[fileArgIndex + 1]);
        await processFile(filePath);
    } else if (allArgIndex !== -1) {
        try {
            const files = await fs.readdir(targetDir);
            for (const file of files) {
                if (file.endsWith('.md')) {
                    await processFile(path.join(targetDir, file));
                }
            }
        } catch (error) {
            console.error('Error reading posts directory:', error);
        }
    } else {
        console.log('Usage: node scripts/generate-ai-summary.js --file <path> | --all');
    }
}

main();
