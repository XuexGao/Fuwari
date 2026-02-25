import fs from 'fs';
import path from 'path';
import { glob } from 'glob';
import sharp from 'sharp';

const CACHE_FILE = 'scripts/.watermark-cache.json';
const TARGET_DIR = 'src/content/assets/images';
const CONFIG_FILE = 'astro.config.mjs';

async function getSiteUrl() {
    try {
        const configContent = fs.readFileSync(CONFIG_FILE, 'utf-8');
        // Match site: "https://..." or site: 'https://...'
        const match = configContent.match(/site:\s*["']([^"']+)["']/);
        if (match && match[1]) {
            return match[1];
        }
    } catch (e) {
        console.error('Error reading astro.config.mjs:', e);
    }
    return 'https://xiegao.top'; // Fallback
}

function loadCache() {
    if (fs.existsSync(CACHE_FILE)) {
        try {
            return JSON.parse(fs.readFileSync(CACHE_FILE, 'utf-8'));
        } catch (e) {
            return {};
        }
    }
    return {};
}

function saveCache(cache) {
    fs.writeFileSync(CACHE_FILE, JSON.stringify(cache, null, 2));
}

async function generateWatermarkSvg(width, height, text) {
    // 1. Determine font size based on image width
    // Reduced font size for less intrusion
    const fontSize = Math.max(14, Math.floor(width / 35)); 
    // Reduced opacity for "barely visible" effect
    const opacity = 0.15; 
    const rotate = -30;
    const rotateRad = Math.abs(rotate * Math.PI / 180);

    // 2. Calculate the bounding box of the rotated text
    const textWidth = text.length * fontSize * 0.6; 
    const textHeight = fontSize;

    const bboxWidth = textWidth * Math.cos(rotateRad) + textHeight * Math.sin(rotateRad);
    const bboxHeight = textWidth * Math.sin(rotateRad) + textHeight * Math.cos(rotateRad);

    // 3. Define grid spacing
    // Tighter spacing to ensure more watermarks are visible
    const stepX = bboxWidth * 1.1; // 10% horizontal gap
    const stepY = bboxHeight * 1.2; // 20% vertical gap
    
    let svgContent = '';
    
    // 4. Generate Grid
    const diagonal = Math.sqrt(width * width + height * height);
    
    // SVG Filter for "Invert/Contrast" effect (simulated with white text + black stroke shadow)
    // A simple white text with black shadow often works best on all backgrounds.
    // For true "difference" blending mode, we would need to use mix-blend-mode in CSS, 
    // but sharp compositing supports blend modes.
    // However, simple "white text with black outline" is the most robust way to be visible on any background.
    
    // Optimization: If the image is very small compared to the watermark, just center one.
    // Adjusted threshold to allow tiling on smaller images
    if (width < bboxWidth * 0.6 || height < bboxHeight * 0.6) {
         svgContent = `<text x="0" y="0" 
                fill="white" fill-opacity="${opacity}" 
                stroke="black" stroke-width="1" stroke-opacity="${opacity}"
                transform="rotate(${rotate})"
                font-family="Arial, sans-serif" 
                font-size="${fontSize}" 
                font-weight="bold"
                text-anchor="middle"
                dominant-baseline="middle"
            >${text}</text>`;
    } else {
        for (let y = -diagonal; y < diagonal; y += stepY) {
            const rowOffset = (Math.floor(y / stepY) % 2) * (stepX / 2);
            
            for (let x = -diagonal; x < diagonal; x += stepX) {
                const drawX = x + rowOffset;
                const drawY = y;

                // Using stroke to simulate contrast/outline
                svgContent += `<text x="${drawX}" y="${drawY}" 
                    fill="white" fill-opacity="${opacity}" 
                    stroke="black" stroke-width="1" stroke-opacity="${opacity}"
                    transform="rotate(${rotate}, ${drawX}, ${drawY})"
                    font-family="Arial, sans-serif" 
                    font-size="${fontSize}" 
                    font-weight="bold"
                    text-anchor="middle"
                    dominant-baseline="middle"
                >${text}</text>`;
            }
        }
    }

    return `
    <svg width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" xmlns="http://www.w3.org/2000/svg">
        <g transform="translate(${width/2}, ${height/2})">
            ${svgContent}
        </g>
    </svg>
    `;
}

async function processImages() {
    const siteUrl = await getSiteUrl();
    console.log(`Using watermark text: ${siteUrl}`);

    const cache = loadCache();
    const files = await glob(`${TARGET_DIR}/**/*.{jpg,jpeg,png,webp,gif}`);
    
    console.log(`Found ${files.length} images.`);

    for (const file of files) {
        // Normalize path
        const relativePath = path.relative(process.cwd(), file);
        const stats = fs.statSync(file);
        const mtime = stats.mtimeMs;

        // Check cache
        if (cache[relativePath] && cache[relativePath] === mtime) {
            // console.log(`Skipping ${relativePath} (already processed)`);
            continue;
        }

        console.log(`Processing ${relativePath}...`);

        try {
            // Read file to buffer to avoid file lock issues on Windows
            const inputBuffer = fs.readFileSync(file);
            const image = sharp(inputBuffer);
            const metadata = await image.metadata();
            
            if (!metadata.width || !metadata.height) {
                console.warn(`Skipping ${relativePath}: Could not get dimensions`);
                continue;
            }

            const watermarkSvg = await generateWatermarkSvg(metadata.width, metadata.height, siteUrl);
            
            // Create a buffer from the SVG
            const svgBuffer = Buffer.from(watermarkSvg);

            // Composite
            const outputBuffer = await image
                .composite([{ input: svgBuffer, blend: 'over' }])
                .toBuffer();

            // Write back to file
            fs.writeFileSync(file, outputBuffer);

            // Update cache with NEW mtime (since we just modified it)
            const newStats = fs.statSync(file);
            cache[relativePath] = newStats.mtimeMs;
            
        } catch (error) {
            console.error(`Error processing ${relativePath}:`, error);
        }
    }

    saveCache(cache);
    console.log('Done.');
}

processImages();
