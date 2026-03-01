import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const TIMEOUT = 10000;

/**
 * 从 astro.config.mjs 获取站点 URL
 */
export function getSiteUrl() {
    const CONFIG_PATH = path.join(__dirname, '../astro.config.mjs');
    try {
        const configContent = fs.readFileSync(CONFIG_PATH, 'utf8');
        const match = configContent.match(/site:\s*["']([^"']+)["']/);
        if (match && match[1]) {
            return match[1].replace(/\/$/, '');
        }
    } catch (err) {
        console.error('Failed to read astro.config.mjs:', err.message);
    }
    return null;
}

/**
 * 检查 URL 可达性并返回内容
 */
export async function checkUrl(url, timeoutMs = TIMEOUT) {
    if (!url) return { ok: false, status: 'Missing URL' };
    if (!url.startsWith('http')) return { ok: false, status: 'Invalid URL' };

    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), timeoutMs);

    try {
        const res = await fetch(url, {
            method: 'GET',
            redirect: 'follow',
            headers: {
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
                'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
            },
            signal: controller.signal,
        });

        const body = res.ok ? await res.text() : '';
        return {
            ok: res.ok,
            status: res.status,
            url: res.url,
            body
        };
    } catch (err) {
        return { ok: false, status: err.name === 'AbortError' ? 'Timeout' : err.message };
    } finally {
        clearTimeout(timer);
    }
}

/**
 * 验证双向链接是否存在
 */
export function verifyBacklinkPresence(html, expectedSiteUrl) {
    if (!html || !expectedSiteUrl) return false;
    
    const target = expectedSiteUrl.replace(/\/$/, '');
    const re = /href\s*=\s*["']([^"']+)["']/gi;
    let m;
    
    while ((m = re.exec(html)) !== null) {
        const href = (m[1] || '').trim();
        if (!href.startsWith('http')) continue;
        const normalized = href.replace(/\/$/, '');
        if (normalized === target) {
            return true;
        }
    }
    return false;
}
