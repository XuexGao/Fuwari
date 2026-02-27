
import 'dotenv/config';
import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { GoogleGenAI } from '@google/genai';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const API_URL = 'http://localhost:1234/api/v1/chat';
const MODEL = 'qwen/qwen3-vl-8b';
const CLOUD_MODEL = 'gemini-3-flash-preview';
const SYSTEM_PROMPT = "你是一个专业的摘要生成器，请将输入文本压缩为明显短于原文的一段摘要（控制在原文长度的10%–20%以内），仅保留核心观点、关键事实和结论，严禁新增信息、扩写内容、举例说明或加入背景解释，不得改写为完整文章，不得使用任何引导语或总结性套话（如“摘要：”“本文介绍了”等），也不得包含自我说明、评价或任何元数据，只输出一段纯正文文本。";

const MAX_RETRIES = 3;
const RETRY_DELAY = 2000; // 2 seconds

const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

async function generateSummary(text, useCloud = false, infiniteRetry = false) {
    let lastError = null;
    let attempt = 1;
    while (true) {
        try {
            if (useCloud) {
                const apiKey = process.env['GEMINI_API_KEY'];
                if (!apiKey) {
                    throw new Error('GEMINI_API_KEY not found in environment variables');
                }

                const ai = new GoogleGenAI({
                    apiKey: apiKey,
                });
                const config = {
                    thinkingConfig: {
                        thinkingLevel: 'high',
                    },
                };
                const contents = [
                    {
                        role: 'user',
                        parts: [
                            {
                                text: `${SYSTEM_PROMPT}\n\n${text}`,
                            },
                        ],
                    },
                ];

                const response = await ai.models.generateContentStream({
                    model: CLOUD_MODEL,
                    config,
                    contents,
                });

                let fullText = "";
                for await (const chunk of response) {
                    if (chunk.text) {
                        fullText += chunk.text;
                    }
                }
                return fullText.trim();
            } else {
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
                if (data.output && data.output.length > 0 && data.output[0].content) {
                    return data.output[0].content;
                }
                throw new Error('Invalid response format');
            }
        } catch (error) {
            lastError = error;
            console.error(`Attempt ${attempt} failed: ${error.message}`);
            
            if (!infiniteRetry && attempt >= MAX_RETRIES) {
                console.error(`All ${MAX_RETRIES} attempts failed.`);
                return null;
            }

            // Exponential backoff for infinite retry to avoid hammering API
            const delay = infiniteRetry 
                ? Math.min(RETRY_DELAY * Math.pow(1.5, attempt - 1), 30000) 
                : RETRY_DELAY;
            
            console.log(`Retrying in ${Math.round(delay)}ms...`);
            await sleep(delay);
            attempt++;
        }
    }
}

async function processFile(filePath, useCloud = false, skipSameModel = false, infiniteRetry = false) {
    console.log(`Processing file: ${filePath} (Cloud: ${useCloud}, InfiniteRetry: ${infiniteRetry})`);
    try {
        let content = await fs.readFile(filePath, 'utf-8');

        // Detect existing AI summary
        const aiBlockRegex = /> \[!ai\] (.*)(\r?\n> .*)*\r?\n*/;
        const aiMatch = content.match(aiBlockRegex);
        
        const currentModel = useCloud ? CLOUD_MODEL : MODEL;

        if (aiMatch) {
            const existingModel = aiMatch[1].trim();
            if (skipSameModel && existingModel === currentModel) {
                console.log(`Skipping: Existing AI summary uses the same model (${currentModel})`);
                return;
            }
            console.log(`Removing existing AI summary (Model: ${existingModel})...`);
            content = content.replace(aiBlockRegex, '');
        }

        // Split frontmatter and content
        const frontmatterRegex = /^---\r?\n([\s\S]*?)\r?\n---\r?\n/;
        const match = content.match(frontmatterRegex);

        let bodyText = content;
        let insertPosition = 0;

        if (match) {
            insertPosition = match[0].length;
            bodyText = content.slice(insertPosition);
        }

        const textForAI = bodyText.slice(0, 5000).trim();
        
        if (!textForAI) {
            console.log('Content is empty, skipping summary generation.');
            return;
        }

        console.log('Generating summary...');
        const summary = await generateSummary(textForAI, useCloud, infiniteRetry);

        if (summary) {
            const summaryBlock = `> [!ai] ${currentModel}\n> ${summary.replace(/\n/g, '\n> ')}\n\n`;
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
    const useCloud = args.includes('--cloud');
    const skipSameModel = args.includes('--skip-same-model');
    const startAfterIndex = args.indexOf('--start-after');
    const startAfterFile = startAfterIndex !== -1 ? args[startAfterIndex + 1] : null;
    
    // Batch tasks use infinite retry
    const infiniteRetry = allArgIndex !== -1;

    const targetDir = path.resolve(__dirname, '../src/content/posts');

    if (fileArgIndex !== -1 && args[fileArgIndex + 1]) {
        const filePath = path.resolve(args[fileArgIndex + 1]);
        await processFile(filePath, useCloud, skipSameModel, infiniteRetry);
    } else if (allArgIndex !== -1) {
        try {
            let files = await fs.readdir(targetDir);
            files = files.filter(f => f.endsWith('.md')).sort();

            let skip = !!startAfterFile;
            for (const file of files) {
                if (skip) {
                    if (file === startAfterFile) {
                        skip = false;
                    }
                    continue;
                }
                await processFile(path.join(targetDir, file), useCloud, skipSameModel, infiniteRetry);
            }
        } catch (error) {
            console.error('Error reading posts directory:', error);
        }
    } else {
        console.log('Usage: node scripts/generate-ai-summary.js [--file <path> | --all] [--cloud] [--skip-same-model] [--start-after <filename>]');
    }
}

main();
