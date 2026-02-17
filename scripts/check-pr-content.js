import fs from 'fs';
import path from 'path';
import https from 'https';
import http from 'http';
import { fileURLToPath } from 'url';

// --- Configuration ---
const TIMEOUT = 10000; // 10 seconds

// Colors for console output
const colors = {
    reset: '\x1b[0m',
    red: '\x1b[31m',
    green: '\x1b[32m',
    yellow: '\x1b[33m',
    blue: '\x1b[34m',
    magenta: '\x1b[35m',
    cyan: '\x1b[36m',
};

/**
 * Validates a JSON file content
 * @param {string} filePath 
 * @returns {object} { isValid: boolean, data: object|null, error: string|null }
 */
function validateJson(filePath) {
    try {
        const content = fs.readFileSync(filePath, 'utf8');
        const data = JSON.parse(content);
        
        // Basic schema check
        if (!data.name || !data.url) {
            return { isValid: false, data: null, error: "Missing required fields: 'name' or 'url'" };
        }
        
        return { isValid: true, data, error: null };
    } catch (err) {
        return { isValid: false, data: null, error: `Invalid JSON syntax: ${err.message}` };
    }
}

/**
 * Checks a URL for reachability (2xx/3xx status)
 * @param {string} url 
 * @returns {Promise<object>} { ok: boolean, status: number|string }
 */
function checkUrl(url) {
    return new Promise((resolve) => {
        if (!url) {
            resolve({ ok: false, status: 'Missing URL' });
            return;
        }

        if (!url.startsWith('http')) {
            // Assume local paths or other protocols are "ok" for now, or skip check
            // For this specific requirement, we mostly care about http/https links
            resolve({ ok: true, status: 'Skipped (Non-HTTP)' });
            return;
        }

        const client = url.startsWith('https') ? https : http;
        const options = {
            method: 'GET',
            headers: {
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
                'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8',
            },
            timeout: TIMEOUT
        };

        const req = client.request(url, options, (res) => {
            res.resume(); // Consume body
            
            if (res.statusCode >= 200 && res.statusCode < 400) {
                resolve({ ok: true, status: res.statusCode });
            } else {
                resolve({ ok: false, status: res.statusCode });
            }
        });

        req.on('error', (err) => {
            resolve({ ok: false, status: err.message });
        });

        req.on('timeout', () => {
            req.destroy();
            resolve({ ok: false, status: 'Timeout' });
        });

        req.end();
    });
}

/**
 * Main logic for processing a single file from PR
 */
async function checkPrFile(filePath) {
    console.log(`\n${colors.blue}Processing: ${filePath}${colors.reset}`);

    // 1. Validate JSON
    const jsonResult = validateJson(filePath);
    if (!jsonResult.isValid) {
        console.error(`${colors.red}❌ JSON 验证失败: ${jsonResult.error}${colors.reset}`);
        if (process.env.GITHUB_OUTPUT) {
             fs.appendFileSync(process.env.GITHUB_OUTPUT, `error_type=json_invalid\n`);
        }
        process.exit(1);
    }

    const data = jsonResult.data;
    console.log(`${colors.green}✅ JSON 语法正确${colors.reset}`);
    console.log(`名称: ${data.name}`);
    console.log(`URL: ${data.url}`);
    if (data.avatar) console.log(`头像: ${data.avatar}`);

    // 2. Check URL Connectivity
    console.log(`正在测试 URL 连通性...`);
    const urlCheck = await checkUrl(data.url);
    if (!urlCheck.ok) {
        console.error(`${colors.red}❌ 主链接不可达: ${urlCheck.status}${colors.reset}`);
        if (process.env.GITHUB_OUTPUT) {
             fs.appendFileSync(process.env.GITHUB_OUTPUT, `error_type=url_unreachable\n`);
        }
        process.exit(1);
    }
    console.log(`${colors.green}✅ 主链接可访问 (${urlCheck.status})${colors.reset}`);

    // 3. Check Avatar Connectivity (if remote)
    if (data.avatar && data.avatar.startsWith('http')) {
        console.log(`正在测试头像连通性...`);
        const avatarCheck = await checkUrl(data.avatar);
        if (!avatarCheck.ok) {
            console.error(`${colors.red}❌ 头像链接不可达: ${avatarCheck.status}${colors.reset}`);
            if (process.env.GITHUB_OUTPUT) {
                 fs.appendFileSync(process.env.GITHUB_OUTPUT, `error_type=avatar_unreachable\n`);
            }
            process.exit(1);
        }
        console.log(`${colors.green}✅ 头像链接可访问 (${avatarCheck.status})${colors.reset}`);
    }

    // Output metadata for GitHub Actions to capture
    // We use special markers or just rely on the step output in YAML
    // But printing "::set-output" is deprecated. We should append to GITHUB_OUTPUT env var.
    if (process.env.GITHUB_OUTPUT) {
        fs.appendFileSync(process.env.GITHUB_OUTPUT, `name=${data.name}\n`);
        fs.appendFileSync(process.env.GITHUB_OUTPUT, `error_type=none\n`);
    }
}


// CLI Entry Point
const filePath = process.argv[2];
if (!filePath) {
    console.error("Usage: node check-pr-content.js <file-path>");
    process.exit(1);
}

checkPrFile(filePath).catch(err => {
    console.error(`${colors.red}Unexpected Error: ${err.message}${colors.reset}`);
    process.exit(1);
});
