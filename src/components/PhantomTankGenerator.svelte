<script lang="ts">
import { onDestroy } from "svelte";

type ToolMode = "prism" | "shadow";
type UploadKind = "source" | "hidden";
type LoadedImage = {
	file: File;
	name: string;
	width: number;
	height: number;
	url: string;
	image: HTMLImageElement;
};

type ModeResult = {
	url: string;
	width: number;
	height: number;
	statusMessage: string;
	errorMessage: string;
};

type ModeMeta = {
	name: string;
	description: string;
	sourceLabel: string;
	hiddenLabel: string;
	sourceCta: string;
	hiddenCta: string;
	sourceHint: string;
	hiddenHint: string;
	emptyResultHint: string;
	resultDescription: string;
	usageSteps: string[];
};

type ShadowDefaults = {
	isColored: boolean;
	scaleInner: number;
	scaleCover: number;
	desatInner: number;
	desatCover: number;
	weightInner: number;
	maxSize: number;
};

const DEFAULT_SOURCE_BRIGHTNESS = 100;
const DEFAULT_SOURCE_CONTRAST = 20;
const DEFAULT_HIDDEN_BRIGHTNESS = 90;
const DEFAULT_HIDDEN_CONTRAST = 100;
const DEFAULT_SHADOWS: ShadowDefaults = {
	isColored: true,
	scaleInner: 0.3,
	scaleCover: 0.2,
	desatInner: 0,
	desatCover: 0,
	weightInner: 0.7,
	maxSize: 1200,
};

const initialResults: Record<ToolMode, ModeResult> = {
	prism: {
		url: "",
		width: 0,
		height: 0,
		statusMessage: "请先上传原图与隐藏图，再生成输出 PNG。",
		errorMessage: "",
	},
	shadow: {
		url: "",
		width: 0,
		height: 0,
		statusMessage: "请先上传白底图与黑底图，再生成输出 PNG。",
		errorMessage: "",
	},
};

const modeMetaMap: Record<ToolMode, ModeMeta> = {
	prism: {
		name: "光棱坦克",
		description:
			"保留现有棋盘格幻影图算法，适合制作需要全局拉高亮度后才更容易识别隐藏图的 PNG。",
		sourceLabel: "原图",
		hiddenLabel: "隐藏图",
		sourceCta: "点击上传原图",
		hiddenCta: "点击上传隐藏图",
		sourceHint: "支持常见图片格式，生成时将以这张图片的宽高作为最终输出尺寸。",
		hiddenHint: "隐藏图会在生成时按原图尺寸统一缩放，并参与棋盘格交错合成。",
		emptyResultHint:
			"尚未生成结果。上传两张图片并调整参数后，点击“生成图像”即可在此处预览并下载 PNG。",
		resultDescription:
			"输出为 PNG 棋盘图。该模式严格使用你提供的原始算法，不提供黑白底双预览。",
		usageSteps: [
			"1. 上传原图与隐藏图；原图决定最终输出尺寸。",
			"2. 参数语义与原始算法保持一致：原图亮度提高、隐藏图亮度降低、以及双方对比度。",
			"3. 点击“生成图像”后，会按 `(x + y) % 2` 的奇偶像素规则交替写入原图像素与隐藏图像素。",
			"4. 不再显示黑白底双预览；想看到隐藏图，请在系统、相册或图片查看器中全局拉高亮度。",
			"5. 结果会以 PNG 无损格式生成，点击下载按钮即可保存。",
		],
	},
	shadow: {
		name: "幻影坦克",
		description:
			"已切换为你提供的 Mirage_Colored 核心逻辑：支持全彩输出、黑白双背景预览，以及亮度/去色/权重控制。",
		sourceLabel: "白底图",
		hiddenLabel: "黑底图",
		sourceCta: "点击上传白底图",
		hiddenCta: "点击上传黑底图",
		sourceHint: "对应源码里的表图，会在生成时按黑底图的画幅进行居中裁切适配。",
		hiddenHint: "对应源码里的里图，输出尺寸和最大尺寸缩放以这张图为基准。",
		emptyResultHint:
			"尚未生成结果。上传白底图与黑底图后，点击“生成图像”即可查看同一 PNG 在白底 / 黑底下的差异。",
		resultDescription:
			"输出为单张透明 PNG，暗影模式下使用 Mirage_Colored 的核心像素处理逻辑，并保留白底 / 黑底双预览。",
		usageSteps: [
			"1. 上传白底图与黑底图；黑底图会作为暗影算法的尺寸基准。",
			"2. 可调节黑底图缩放、白底图缩放、双方去色、黑底图混合权重与最大输出尺寸。",
			"3. 若启用全彩输出，将按源码中的彩色公式处理；关闭后则使用黑白输出逻辑。",
			"4. 结果区会同时展示同一张 PNG 在白底与黑底下的预览效果。",
			"5. 下载得到的仍然是 PNG，可在外部查看器或任意页面背景中继续使用。",
		],
	},
};

let mode: ToolMode = "prism";
let sourceImage: LoadedImage | null = null;
let hiddenImage: LoadedImage | null = null;
let outputCanvas: HTMLCanvasElement;
let sourceBrightness = DEFAULT_SOURCE_BRIGHTNESS;
let sourceContrast = DEFAULT_SOURCE_CONTRAST;
let hiddenBrightness = DEFAULT_HIDDEN_BRIGHTNESS;
let hiddenContrast = DEFAULT_HIDDEN_CONTRAST;
let isGenerating = false;

let shadowIsColored = DEFAULT_SHADOWS.isColored;
let shadowInnerScale = DEFAULT_SHADOWS.scaleInner;
let shadowCoverScale = DEFAULT_SHADOWS.scaleCover;
let shadowInnerDesat = DEFAULT_SHADOWS.desatInner;
let shadowCoverDesat = DEFAULT_SHADOWS.desatCover;
let shadowInnerWeight = DEFAULT_SHADOWS.weightInner;
let shadowMaxSize = DEFAULT_SHADOWS.maxSize;

const fileUrls = new Set<string>();
let results: Record<ToolMode, ModeResult> = structuredClone(initialResults);

$: currentMeta = modeMetaMap[mode];
$: currentResult = results[mode];
$: sizeMismatch =
	sourceImage && hiddenImage
		? sourceImage.width !== hiddenImage.width ||
			sourceImage.height !== hiddenImage.height
		: false;

const clamp = (value: number, min: number, max: number) =>
	Math.min(max, Math.max(min, value));

function setMode(nextMode: ToolMode) {
	mode = nextMode;
}

function updateModeResult(modeKey: ToolMode, patch: Partial<ModeResult>) {
	results = {
		...results,
		[modeKey]: {
			...results[modeKey],
			...patch,
		},
	};
}

function resetModeResult(modeKey: ToolMode) {
	updateModeResult(modeKey, {
		...initialResults[modeKey],
	});
}

function setModeError(
	modeKey: ToolMode,
	message: string,
	statusMessage: string,
) {
	updateModeResult(modeKey, {
		errorMessage: message,
		statusMessage,
	});
}

function clearModeError(modeKey: ToolMode) {
	updateModeResult(modeKey, { errorMessage: "" });
}

function getInputAlt(kind: UploadKind) {
	return `${kind === "source" ? currentMeta.sourceLabel : currentMeta.hiddenLabel}预览`;
}

function getInputActionText(kind: UploadKind) {
	const image = kind === "source" ? sourceImage : hiddenImage;
	const label =
		kind === "source" ? currentMeta.sourceLabel : currentMeta.hiddenLabel;
	return image
		? `更换${label}`
		: kind === "source"
			? currentMeta.sourceCta
			: currentMeta.hiddenCta;
}

function getInputHint(kind: UploadKind) {
	return kind === "source" ? currentMeta.sourceHint : currentMeta.hiddenHint;
}

function getDownloadFileName() {
	return mode === "prism" ? "prism-tank.png" : "shadow-tank.png";
}

function adjustPixelBrightnessContrast(
	r: number,
	g: number,
	b: number,
	brightnessFactor: number,
	contrastFactor: number,
) {
	const brightR = r * brightnessFactor;
	const brightG = g * brightnessFactor;
	const brightB = b * brightnessFactor;

	const adjustContrast = (value: number) =>
		clamp((value - 128) * contrastFactor + 128, 0, 255);

	return [
		adjustContrast(brightR),
		adjustContrast(brightG),
		adjustContrast(brightB),
	] as const;
}

function revokeFileUrl(url: string | undefined) {
	if (!url) return;
	URL.revokeObjectURL(url);
	fileUrls.delete(url);
}

async function loadImage(file: File): Promise<LoadedImage> {
	const url = URL.createObjectURL(file);
	fileUrls.add(url);

	return await new Promise((resolve, reject) => {
		const image = new Image();
		image.onload = () => {
			resolve({
				file,
				name: file.name,
				width: image.naturalWidth,
				height: image.naturalHeight,
				url,
				image,
			});
		};
		image.onerror = () => {
			revokeFileUrl(url);
			reject(new Error("图片读取失败，请更换文件后重试。"));
		};
		image.src = url;
	});
}

async function handleFileChange(event: Event, kind: UploadKind) {
	const input = event.currentTarget as HTMLInputElement;
	const file = input.files?.[0];
	if (!file) return;

	resetModeResult(mode);

	if (!file.type.startsWith("image/")) {
		setModeError(mode, "仅支持上传图片文件。", "未满足生成条件。");
		input.value = "";
		return;
	}

	try {
		const loaded = await loadImage(file);
		if (kind === "source") {
			revokeFileUrl(sourceImage?.url);
			sourceImage = loaded;
		} else {
			revokeFileUrl(hiddenImage?.url);
			hiddenImage = loaded;
		}

		const readyStatus =
			mode === "prism"
				? "图片已更新，可点击生成光棱坦克 PNG。"
				: "图片已更新，可点击生成幻影坦克 PNG。";
		const waitingStatus =
			mode === "prism"
				? "图片已加载，请继续上传另一张图片。"
				: "图片已加载，请继续上传另一张目标图。";

		updateModeResult(mode, {
			errorMessage: "",
			statusMessage: sourceImage && hiddenImage ? readyStatus : waitingStatus,
		});
	} catch (error) {
		setModeError(
			mode,
			error instanceof Error ? error.message : "图片读取失败。",
			"图片加载失败。",
		);
	}
}

function resetPrismControls() {
	sourceBrightness = DEFAULT_SOURCE_BRIGHTNESS;
	sourceContrast = DEFAULT_SOURCE_CONTRAST;
	hiddenBrightness = DEFAULT_HIDDEN_BRIGHTNESS;
	hiddenContrast = DEFAULT_HIDDEN_CONTRAST;
	resetModeResult("prism");
	updateModeResult("prism", {
		statusMessage: "光棱坦克参数已重置为默认值，可重新生成图像。",
	});
}

function resetShadowControls() {
	shadowIsColored = DEFAULT_SHADOWS.isColored;
	shadowInnerScale = DEFAULT_SHADOWS.scaleInner;
	shadowCoverScale = DEFAULT_SHADOWS.scaleCover;
	shadowInnerDesat = DEFAULT_SHADOWS.desatInner;
	shadowCoverDesat = DEFAULT_SHADOWS.desatCover;
	shadowInnerWeight = DEFAULT_SHADOWS.weightInner;
	shadowMaxSize = DEFAULT_SHADOWS.maxSize;
	resetModeResult("shadow");
	updateModeResult("shadow", {
		statusMessage: "幻影坦克参数已重置为源码默认值，可重新生成图像。",
	});
}

function downloadResult() {
	if (!currentResult.url) return;
	const link = document.createElement("a");
	link.href = currentResult.url;
	link.download = getDownloadFileName();
	link.click();
}

function createPrismContext(width: number, height: number) {
	outputCanvas.width = width;
	outputCanvas.height = height;

	const outputContext = outputCanvas.getContext("2d");
	if (!outputContext) {
		throw new Error("浏览器不支持当前 Canvas 能力。");
	}

	const baseCanvas = document.createElement("canvas");
	baseCanvas.width = width;
	baseCanvas.height = height;
	const baseContext = baseCanvas.getContext("2d");

	const overlayCanvas = document.createElement("canvas");
	overlayCanvas.width = width;
	overlayCanvas.height = height;
	const overlayContext = overlayCanvas.getContext("2d");

	if (!baseContext || !overlayContext) {
		throw new Error("浏览器不支持离屏 Canvas 处理。");
	}

	baseContext.drawImage(sourceImage!.image, 0, 0, width, height);
	overlayContext.drawImage(hiddenImage!.image, 0, 0, width, height);

	return {
		outputContext,
		baseData: baseContext.getImageData(0, 0, width, height),
		overlayData: overlayContext.getImageData(0, 0, width, height),
	};
}

function createShadowContext() {
	const innerImage = hiddenImage!;
	const coverImage = sourceImage!;

	let width = innerImage.width;
	let height = innerImage.height;
	const maxSize = Math.max(0, Math.floor(shadowMaxSize || 0));

	if (maxSize !== 0) {
		if (innerImage.width > innerImage.height) {
			width = maxSize;
			height = Math.ceil((innerImage.height * maxSize) / innerImage.width);
		} else {
			height = maxSize;
			width = Math.ceil((innerImage.width * maxSize) / innerImage.height);
		}
	}

	const innerCanvas = document.createElement("canvas");
	innerCanvas.width = width;
	innerCanvas.height = height;
	const innerContext = innerCanvas.getContext("2d");

	const coverCanvas = document.createElement("canvas");
	coverCanvas.width = width;
	coverCanvas.height = height;
	const coverContext = coverCanvas.getContext("2d");

	const outputContext = outputCanvas.getContext("2d");
	if (!innerContext || !coverContext || !outputContext) {
		throw new Error("浏览器不支持幻影坦克所需的 Canvas 能力。");
	}

	outputCanvas.width = width;
	outputCanvas.height = height;

	innerContext.drawImage(innerImage.image, 0, 0, width, height);

	const coverRatio = coverImage.width / coverImage.height;
	const targetRatio = width / height;
	let drawX = 0;
	let drawY = 0;
	let drawWidth = width;
	let drawHeight = height;

	if (coverRatio < targetRatio) {
		drawHeight = Math.ceil(width / coverRatio);
		drawY = Math.ceil((height - drawHeight) / 2);
	} else {
		drawWidth = Math.ceil(height * coverRatio);
		drawX = Math.ceil((width - drawWidth) / 2);
	}

	coverContext.drawImage(coverImage.image, drawX, drawY, drawWidth, drawHeight);

	return {
		width,
		height,
		outputContext,
		innerData: innerContext.getImageData(0, 0, width, height),
		coverData: coverContext.getImageData(0, 0, width, height),
	};
}

function convertGray(imageData: ImageData) {
	const data = imageData.data;
	const result = new Uint8ClampedArray(data.length >> 2);
	for (let index = 0; index < data.length; index += 4) {
		result[index >> 2] =
			0.299 * data[index] + 0.587 * data[index + 1] + 0.114 * data[index + 2];
	}
	return result;
}

function generatePrismImage() {
	const width = sourceImage!.width;
	const height = sourceImage!.height;
	const { outputContext, baseData, overlayData } = createPrismContext(
		width,
		height,
	);
	const result = outputContext.createImageData(width, height);

	const originalBrightnessFactor = 1 + sourceBrightness / 100;
	const hiddenBrightnessFactor = 1 - hiddenBrightness / 100;
	const originalContrastFactor = sourceContrast / 100;
	const hiddenContrastFactor = hiddenContrast / 100;

	for (let index = 0; index < baseData.data.length; index += 4) {
		const pixelIndex = index / 4;
		const x = pixelIndex % width;
		const y = Math.floor(pixelIndex / width);

		const originalR = baseData.data[index];
		const originalG = baseData.data[index + 1];
		const originalB = baseData.data[index + 2];
		const hiddenR = overlayData.data[index];
		const hiddenG = overlayData.data[index + 1];
		const hiddenB = overlayData.data[index + 2];

		let r: number;
		let g: number;
		let b: number;

		if ((x + y) % 2 === 0) {
			const originalPixel = adjustPixelBrightnessContrast(
				originalR,
				originalG,
				originalB,
				originalBrightnessFactor,
				originalContrastFactor,
			);
			r = originalPixel[0];
			g = originalPixel[1];
			b = originalPixel[2];
		} else {
			const hiddenPixel = adjustPixelBrightnessContrast(
				hiddenR,
				hiddenG,
				hiddenB,
				hiddenBrightnessFactor,
				hiddenContrastFactor,
			);
			r = hiddenPixel[0];
			g = hiddenPixel[1];
			b = hiddenPixel[2];
		}

		result.data[index] = r;
		result.data[index + 1] = g;
		result.data[index + 2] = b;
		result.data[index + 3] = 255;
	}

	outputContext.putImageData(result, 0, 0);
	const url = outputCanvas.toDataURL("image/png");
	updateModeResult("prism", {
		url,
		width,
		height,
		errorMessage: "",
		statusMessage: sizeMismatch
			? `生成完成：隐藏图已按原图尺寸 ${width} × ${height} 自动缩放，并按原始棋盘图算法输出 PNG。`
			: "生成完成：当前已按原始棋盘图算法输出 PNG。",
	});
}

function generateShadowImage() {
	const { width, height, outputContext, innerData, coverData } =
		createShadowContext();
	const innerGray = convertGray(innerData);
	const coverGray = convertGray(coverData);
	const innerPixels = innerData.data;
	const coverPixels = coverData.data;
	const outputData = new Uint8ClampedArray(innerPixels.length);
	const innerScale = shadowInnerScale;
	const coverScale = 1 - shadowCoverScale;

	if (shadowIsColored) {
		const innerCache = new Uint8ClampedArray(innerPixels.length);
		const coverCache = new Uint8ClampedArray(coverPixels.length);
		const alphaCache = new Float32Array(innerGray.length);

		for (let index = 0; index < innerPixels.length; index += 4) {
			const gray = innerGray[index >> 2] * innerScale;
			const r = innerPixels[index] * innerScale;
			const g = innerPixels[index + 1] * innerScale;
			const b = innerPixels[index + 2] * innerScale;
			innerCache[index] = r + (gray - r) * shadowInnerDesat;
			innerCache[index + 1] = g + (gray - g) * shadowInnerDesat;
			innerCache[index + 2] = b + (gray - b) * shadowInnerDesat;
		}

		for (let index = 0; index < coverPixels.length; index += 4) {
			const gray = 255 - (255 - coverGray[index >> 2]) * coverScale;
			const r = 255 - (255 - coverPixels[index]) * coverScale;
			const g = 255 - (255 - coverPixels[index + 1]) * coverScale;
			const b = 255 - (255 - coverPixels[index + 2]) * coverScale;
			coverCache[index] = r + (gray - r) * shadowCoverDesat;
			coverCache[index + 1] = g + (gray - g) * shadowCoverDesat;
			coverCache[index + 2] = b + (gray - b) * shadowCoverDesat;
		}

		for (let index = 0; index < innerGray.length; index += 1) {
			alphaCache[index] = Math.min(
				Math.max(
					(255 +
						innerGray[index] * innerScale -
						(255 - (255 - coverGray[index]) * coverScale)) /
						255,
					0,
				),
				1,
			);
		}

		for (let index = 0; index < innerPixels.length; index += 4) {
			const alpha = alphaCache[index >> 2];
			const alphaColor = 255 * alpha;
			const safeAlpha = Math.max(alpha, 0.0001);
			outputData[index] = clamp(
				((innerCache[index] - alphaColor + 255 - coverCache[index]) *
					shadowInnerWeight +
					alphaColor -
					255 +
					coverCache[index]) /
					safeAlpha,
				0,
				255,
			);
			outputData[index + 1] = clamp(
				((innerCache[index + 1] - alphaColor + 255 - coverCache[index + 1]) *
					shadowInnerWeight +
					alphaColor -
					255 +
					coverCache[index + 1]) /
					safeAlpha,
				0,
				255,
			);
			outputData[index + 2] = clamp(
				((innerCache[index + 2] - alphaColor + 255 - coverCache[index + 2]) *
					shadowInnerWeight +
					alphaColor -
					255 +
					coverCache[index + 2]) /
					safeAlpha,
				0,
				255,
			);
			outputData[index + 3] = clamp(255 * alpha, 0, 255);
		}
	} else {
		for (let index = 0; index < innerGray.length; index += 1) {
			const inner = innerGray[index] * innerScale;
			const alpha = 255 + inner - (255 - (255 - coverGray[index]) * coverScale);
			const safeAlpha = Math.max(alpha, 0.0001);
			const color = clamp((255 * inner) / safeAlpha, 0, 255);
			outputData[index << 2] = color;
			outputData[(index << 2) + 1] = color;
			outputData[(index << 2) + 2] = color;
			outputData[(index << 2) + 3] = clamp(alpha, 0, 255);
		}
	}

	outputContext.putImageData(new ImageData(outputData, width, height), 0, 0);
	const url = outputCanvas.toDataURL("image/png");
	updateModeResult("shadow", {
		url,
		width,
		height,
		errorMessage: "",
		statusMessage: sizeMismatch
			? `生成完成：已按黑底图基准尺寸 ${width} × ${height} 输出 Mirage_Colored PNG，白底图已完成居中裁切适配。`
			: "生成完成：当前已按 Mirage_Colored 核心算法输出透明 PNG。",
	});
}

function generateImage() {
	if (!sourceImage || !hiddenImage) {
		setModeError(
			mode,
			mode === "prism" ? "请先上传原图和隐藏图。" : "请先上传白底图和黑底图。",
			"未满足生成条件。",
		);
		return;
	}

	isGenerating = true;
	clearModeError(mode);
	resetModeResult(mode);

	try {
		if (mode === "prism") {
			generatePrismImage();
		} else {
			generateShadowImage();
		}
	} catch (error) {
		setModeError(
			mode,
			error instanceof Error ? error.message : "生成失败，请稍后重试。",
			"生成失败。",
		);
	} finally {
		isGenerating = false;
	}
}

onDestroy(() => {
	revokeFileUrl(sourceImage?.url);
	revokeFileUrl(hiddenImage?.url);
});
</script>

<div class="space-y-6">
	<div class="rounded-2xl border border-white/10 bg-white/5 p-3">
		<div class="flex flex-wrap gap-2">
			{#each (["prism", "shadow"] as ToolMode[]) as item}
				<button
					type="button"
					class:is-active={mode === item}
					class="mode-switch-btn"
					on:click={() => setMode(item)}
					aria-pressed={mode === item}
				>
					{modeMetaMap[item].name}
				</button>
			{/each}
		</div>
		<p class="mt-3 text-sm leading-relaxed text-50">{currentMeta.description}</p>
	</div>

	<div class="grid grid-cols-1 gap-6 xl:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)]">
		<section class="space-y-6">
			<div class="rounded-2xl border border-white/10 bg-white/5 p-5">
				<h2 class="mb-2 text-lg font-bold text-90">上传图片</h2>
				<p class="mb-5 text-sm leading-relaxed text-50">
					{mode === "prism"
						? "原图会作为输出尺寸基准；如果隐藏图尺寸不同，生成时会自动缩放到原图尺寸，全程仅在浏览器本地处理。"
						: "白底图对应表图，黑底图对应里图；暗影模式会沿用你提供源码的处理方式，以黑底图为尺寸基准并对白底图做居中裁切适配。"}
				</p>

				<div class="grid grid-cols-1 gap-4 md:grid-cols-2">
					<div class="space-y-3">
						<label class="block text-sm font-medium text-90" for="phantom-source-upload">{currentMeta.sourceLabel}</label>
						<input id="phantom-source-upload" type="file" accept="image/*" class="hidden" on:change={(event) => handleFileChange(event, "source")} />
						<label for="phantom-source-upload" class="flex min-h-40 cursor-pointer flex-col items-center justify-center rounded-2xl border border-dashed border-white/15 bg-black/20 px-4 py-5 text-center transition-all hover:border-[var(--primary)] hover:bg-[var(--primary)]/5">
							<span class="mb-2 text-sm font-medium text-90">{getInputActionText("source")}</span>
							<span class="text-xs leading-relaxed text-white/45">{getInputHint("source")}</span>
						</label>
						{#if sourceImage}
							<div class="rounded-xl border border-white/10 bg-black/20 p-3">
								<img src={sourceImage.url} alt={getInputAlt("source")} class="mb-3 max-h-44 w-full rounded-lg object-contain" />
								<div class="space-y-1 text-xs text-50">
									<p class="break-all text-90">{sourceImage.name}</p>
									<p>{sourceImage.width} × {sourceImage.height}</p>
								</div>
							</div>
						{/if}
					</div>

					<div class="space-y-3">
						<label class="block text-sm font-medium text-90" for="phantom-hidden-upload">{currentMeta.hiddenLabel}</label>
						<input id="phantom-hidden-upload" type="file" accept="image/*" class="hidden" on:change={(event) => handleFileChange(event, "hidden")} />
						<label for="phantom-hidden-upload" class="flex min-h-40 cursor-pointer flex-col items-center justify-center rounded-2xl border border-dashed border-white/15 bg-black/20 px-4 py-5 text-center transition-all hover:border-[var(--primary)] hover:bg-[var(--primary)]/5">
							<span class="mb-2 text-sm font-medium text-90">{getInputActionText("hidden")}</span>
							<span class="text-xs leading-relaxed text-white/45">{getInputHint("hidden")}</span>
						</label>
						{#if hiddenImage}
							<div class="rounded-xl border border-white/10 bg-black/20 p-3">
								<img src={hiddenImage.url} alt={getInputAlt("hidden")} class="mb-3 max-h-44 w-full rounded-lg object-contain" />
								<div class="space-y-1 text-xs text-50">
									<p class="break-all text-90">{hiddenImage.name}</p>
									<p>{hiddenImage.width} × {hiddenImage.height}</p>
								</div>
							</div>
						{/if}
					</div>
				</div>
			</div>

			<div class="rounded-2xl border border-white/10 bg-white/5 p-5">
				<div class="mb-5 flex items-center justify-between gap-3">
					<div>
						<h2 class="text-lg font-bold text-90">参数与操作</h2>
						<p class="mt-1 text-sm text-50">
							{mode === "prism"
								? "保留纯前端亮度 / 对比度预处理，并在像素级进行棋盘格交错合成。"
								: "暗影模式已接入 Mirage_Colored 默认参数与像素计算逻辑。"}
						</p>
					</div>
					<button type="button" class="rounded-xl border border-white/10 px-4 py-2 text-sm text-50 transition-all hover:border-[var(--primary)] hover:text-90" on:click={mode === "prism" ? resetPrismControls : resetShadowControls}>
						{mode === "prism" ? "重置参数" : "恢复默认"}
					</button>
				</div>

				{#if mode === "prism"}
					<div class="grid grid-cols-1 gap-5 md:grid-cols-2">
						<div class="space-y-4 rounded-2xl border border-white/10 bg-black/20 p-4">
							<h3 class="text-sm font-semibold text-90">原图参数</h3>
							<div>
								<div class="mb-2 flex items-center justify-between text-sm text-50">
									<span>原图亮度提高 (%)</span>
									<span class="font-mono text-90">{sourceBrightness}</span>
								</div>
								<input bind:value={sourceBrightness} type="range" min="0" max="200" step="1" class="h-2 w-full cursor-pointer accent-[var(--primary)]" />
							</div>
							<div>
								<div class="mb-2 flex items-center justify-between text-sm text-50">
									<span>原图对比度 (%)</span>
									<span class="font-mono text-90">{sourceContrast}</span>
								</div>
								<input bind:value={sourceContrast} type="range" min="10" max="300" step="1" class="h-2 w-full cursor-pointer accent-[var(--primary)]" />
							</div>
						</div>

						<div class="space-y-4 rounded-2xl border border-white/10 bg-black/20 p-4">
							<h3 class="text-sm font-semibold text-90">隐藏图参数</h3>
							<div>
								<div class="mb-2 flex items-center justify-between text-sm text-50">
									<span>隐藏图亮度降低 (%)</span>
									<span class="font-mono text-90">{hiddenBrightness}</span>
								</div>
								<input bind:value={hiddenBrightness} type="range" min="0" max="100" step="1" class="h-2 w-full cursor-pointer accent-[var(--primary)]" />
							</div>
							<div>
								<div class="mb-2 flex items-center justify-between text-sm text-50">
									<span>隐藏图对比度 (%)</span>
									<span class="font-mono text-90">{hiddenContrast}</span>
								</div>
								<input bind:value={hiddenContrast} type="range" min="10" max="300" step="1" class="h-2 w-full cursor-pointer accent-[var(--primary)]" />
							</div>
						</div>
					</div>
				{:else}
					<div class="space-y-5">
						<div class="grid grid-cols-1 gap-5 md:grid-cols-2">
							<div class="space-y-4 rounded-2xl border border-white/10 bg-black/20 p-4">
								<div class="flex items-center justify-between gap-3">
									<span class="text-sm font-semibold text-90">全彩输出</span>
									<label class="inline-flex cursor-pointer items-center gap-2 text-sm text-50">
										<input bind:checked={shadowIsColored} type="checkbox" class="h-4 w-4 accent-[var(--primary)]" />
										<span>{shadowIsColored ? "开启" : "关闭"}</span>
									</label>
								</div>
								<div>
									<div class="mb-2 flex items-center justify-between text-sm text-50"><span>黑底图缩放</span><span class="font-mono text-90">{shadowInnerScale.toFixed(2)}</span></div>
									<input bind:value={shadowInnerScale} type="range" min="0" max="1" step="0.02" class="h-2 w-full cursor-pointer accent-[var(--primary)]" />
								</div>
								<div>
									<div class="mb-2 flex items-center justify-between text-sm text-50"><span>黑底图去色</span><span class="font-mono text-90">{shadowInnerDesat.toFixed(2)}</span></div>
									<input bind:value={shadowInnerDesat} type="range" min="0" max="1" step="0.02" class="h-2 w-full cursor-pointer accent-[var(--primary)]" />
								</div>
								<div>
									<div class="mb-2 flex items-center justify-between text-sm text-50"><span>黑底图混合权重</span><span class="font-mono text-90">{shadowInnerWeight.toFixed(2)}</span></div>
									<input bind:value={shadowInnerWeight} type="range" min="0" max="1" step="0.02" class="h-2 w-full cursor-pointer accent-[var(--primary)]" />
								</div>
							</div>

							<div class="space-y-4 rounded-2xl border border-white/10 bg-black/20 p-4">
								<div>
									<div class="mb-2 flex items-center justify-between text-sm text-50"><span>白底图缩放</span><span class="font-mono text-90">{shadowCoverScale.toFixed(2)}</span></div>
									<input bind:value={shadowCoverScale} type="range" min="0" max="1" step="0.02" class="h-2 w-full cursor-pointer accent-[var(--primary)]" />
								</div>
								<div>
									<div class="mb-2 flex items-center justify-between text-sm text-50"><span>白底图去色</span><span class="font-mono text-90">{shadowCoverDesat.toFixed(2)}</span></div>
									<input bind:value={shadowCoverDesat} type="range" min="0" max="1" step="0.02" class="h-2 w-full cursor-pointer accent-[var(--primary)]" />
								</div>
								<div>
									<div class="mb-2 flex items-center justify-between text-sm text-50"><span>最大输出尺寸</span><span class="font-mono text-90">{shadowMaxSize}</span></div>
									<input bind:value={shadowMaxSize} type="range" min="0" max="4096" step="1" class="h-2 w-full cursor-pointer accent-[var(--primary)]" />
									<p class="mt-2 text-xs leading-relaxed text-white/45">0 表示不限制；非 0 时会按黑底图长边缩放输出。</p>
								</div>
							</div>
						</div>
					</div>
				{/if}

				<div class="mt-5 flex flex-col gap-3 sm:flex-row sm:items-center">
					<button type="button" class="inline-flex items-center justify-center rounded-xl bg-[var(--primary)] px-5 py-3 text-sm font-bold text-white shadow-lg shadow-[var(--primary)]/20 transition-all hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:brightness-100" on:click={generateImage} disabled={!sourceImage || !hiddenImage || isGenerating}>
						{isGenerating ? "正在生成..." : "生成图像"}
					</button>
					{#if currentResult.url}
						<button type="button" class="inline-flex items-center justify-center rounded-xl border border-white/10 px-5 py-3 text-sm font-medium text-90 transition-all hover:border-[var(--primary)] hover:text-white" on:click={downloadResult}>
							下载 PNG
						</button>
					{/if}
				</div>
			</div>
		</section>

		<section class="space-y-6">
			<div class="rounded-2xl border border-white/10 bg-white/5 p-5">
				<h2 class="mb-2 text-lg font-bold text-90">生成结果</h2>
				<p class="mb-5 text-sm leading-relaxed text-50">{currentMeta.resultDescription}</p>

				{#if currentResult.errorMessage}
					<div class="mb-4 rounded-xl border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-200">{currentResult.errorMessage}</div>
				{/if}

				<div class="mb-4 rounded-xl border border-white/10 bg-black/20 px-4 py-3 text-sm leading-relaxed text-50">{currentResult.statusMessage}</div>

				{#if sizeMismatch}
					<div class="mb-4 rounded-xl border border-amber-500/25 bg-amber-500/10 px-4 py-3 text-sm leading-relaxed text-amber-100">
						{mode === "prism"
							? `检测到两张图片尺寸不一致：当前会按原图尺寸 ${sourceImage?.width} × ${sourceImage?.height} 统一缩放隐藏图后再生成。`
							: `检测到两张图片尺寸不一致：当前暗影模式会按黑底图尺寸基准生成，并对白底图执行居中裁切适配。`}
					</div>
				{/if}

				<canvas bind:this={outputCanvas} class="hidden" />

				<div class="space-y-4">
					{#if currentResult.url}
						{#if mode === "prism"}
							<div class="rounded-2xl border border-white/10 bg-black/20 p-3">
								<p class="mb-3 text-sm font-medium text-90">输出预览</p>
								<img src={currentResult.url} alt="光棱坦克输出预览" class="w-full rounded-lg border border-white/10 bg-[var(--card-bg)] object-contain" />
							</div>
						{:else}
							<div class="grid grid-cols-1 gap-4 lg:grid-cols-2">
								<div class="rounded-2xl border border-white/10 bg-white p-3">
									<p class="mb-3 text-sm font-medium text-black/75">白底预览</p>
									<img src={currentResult.url} alt="幻影坦克白底预览" class="w-full rounded-lg border border-black/10 bg-white object-contain" />
								</div>
								<div class="rounded-2xl border border-white/10 bg-black p-3">
									<p class="mb-3 text-sm font-medium text-white/80">黑底预览</p>
									<img src={currentResult.url} alt="幻影坦克黑底预览" class="w-full rounded-lg border border-white/10 bg-black object-contain" />
								</div>
							</div>
						{/if}
						<p class="text-xs leading-relaxed text-white/45">
							输出尺寸：{currentResult.width} × {currentResult.height}
							{mode === "prism"
								? "。若想改变视觉效果，可继续调整四个参数后重新生成。"
								: "。当前暗影模式已使用你提供源码的默认公式；若还需微调，可继续调节缩放、去色与权重。"}
						</p>
					{:else}
						<div class="flex min-h-[22rem] items-center justify-center rounded-2xl border border-dashed border-white/15 bg-black/20 px-6 text-center text-sm leading-relaxed text-white/45">{currentMeta.emptyResultHint}</div>
					{/if}
				</div>
			</div>

			<div class="rounded-2xl border border-white/10 bg-white/5 p-5">
				<h2 class="mb-3 text-lg font-bold text-90">使用说明</h2>
				<ul class="space-y-2 text-sm leading-relaxed text-50">
					{#each currentMeta.usageSteps as step}
						<li>{step}</li>
					{/each}
				</ul>
			</div>
		</section>
	</div>
</div>

<style>
	.mode-switch-btn {
		@apply rounded-lg px-4 py-2 text-sm font-medium text-white transition-all active:scale-95;
	}

	.mode-switch-btn.is-active {
		@apply bg-[var(--primary)] text-white shadow-sm;
	}
</style>
