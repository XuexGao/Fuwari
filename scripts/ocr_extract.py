import os
import json
import easyocr
import cv2
import argparse
from pathlib import Path

# 默认配置
DEFAULT_IMAGE_DIR = Path(r"c:\Users\af\Documents\GitHub\fuwari\src\content\assets\images")
DEFAULT_OUTPUT_JSON = Path(r"c:\Users\af\Documents\GitHub\fuwari\scripts\ocr_results.json")
# 支持的语言：'ch_sim' (简体中文), 'en' (英文)
LANGS = ['ch_sim', 'en']

def process_images(image_dir, output_json):
    # 初始化 EasyOCR Reader
    print(f"Initializing EasyOCR with languages: {LANGS}...")
    # gpu=True 如果有 NVIDIA 显卡会自动使用
    reader = easyocr.Reader(LANGS)
    
    results = {}
    
    # 查找所有图片文件
    image_extensions = {'.png', '.jpg', '.jpeg', '.webp'}
    image_files = [f for f in image_dir.iterdir() if f.suffix.lower() in image_extensions]
    
    if not image_files:
        print(f"No images found in {image_dir}")
        return

    print(f"Found {len(image_files)} images. Starting OCR...")

    for img_path in image_files:
        print(f"Processing: {img_path.name}...")
        
        # 使用 OpenCV 获取图片尺寸
        img = cv2.imread(str(img_path))
        if img is None:
            print(f"Failed to read {img_path.name}")
            continue
            
        height, width, _ = img.shape
        
        # 执行 OCR
        # detail=1 返回详细信息（坐标、文字、置信度）
        ocr_result = reader.readtext(str(img_path), detail=1)
        
        items = []
        for (bbox, text, prob) in ocr_result:
            # bbox 格式: [[x1, y1], [x2, y2], [x3, y3], [x4, y4]]
            # 转换为普通列表方便 JSON 序列化
            items.append({
                "original_text": text,
                "translated_text": "", # 留空给后续翻译
                "box": [[float(x), float(y)] for x, y in bbox],
                "confidence": float(prob)
            })
            
        results[img_path.name] = {
            "file_path": str(img_path),
            "width": width,
            "height": height,
            "items": items
        }

    # 保存为 JSON
    print(f"Saving results to {output_json}...")
    with open(output_json, 'w', encoding='utf-8') as f:
        json.dump(results, f, ensure_ascii=False, indent=2)
        
    print(f"Done! Results saved to {output_json}")

if __name__ == "__main__":
    parser = argparse.ArgumentParser(description="Extract text and positions from images using EasyOCR")
    parser.add_argument("--dir", type=str, default=str(DEFAULT_IMAGE_DIR), help="Directory containing images")
    parser.add_argument("--output", type=str, default=str(DEFAULT_OUTPUT_JSON), help="Output JSON file path")
    
    args = parser.parse_args()
    process_images(Path(args.dir), Path(args.output))
