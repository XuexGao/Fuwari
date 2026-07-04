<script lang="ts">
import Icon from "@iconify/svelte";
import { onMount } from "svelte";
import "../icons/client-icons.ts";
import { onedriveApiConfig } from "@/config";

export let apiBase = onedriveApiConfig.baseUrl;
export let rootName = "OneDrive 根目录";

interface FileItem {
	id: string;
	name: string;
	path: string;
	type: "file" | "directory";
	size?: number;
	downloadUrl?: string;
}

let items: FileItem[] = [];
let pathStack: { name: string; path: string; items: FileItem[] }[] = [
	{ name: rootName, path: "/", items: [] },
];
let loading = false;
let error = "";
let initialized = false;

async function fetchItems(currentPath = "/") {
	loading = true;
	items = [];
	error = "";
	try {
		const sep = currentPath.endsWith("/") ? "" : "/";
		const url = apiBase + "?path=" + encodeURIComponent(currentPath + sep);
		const res = await fetch(url);
		if (!res.ok) throw new Error(`HTTP ${res.status}`);
		const data = await res.json();
		const value = data.folder?.value ?? [];
		items = value.map((c: any) => ({
			id: c.id ?? c.name,
			name: c.name,
			path: currentPath.replace(/\/$/, "") + "/" + c.name,
			type: c.folder ? "directory" : "file",
			size: c.size,
			downloadUrl: c["@microsoft.graph.downloadUrl"],
		}));
		// 同步当前层级的缓存
		pathStack[pathStack.length - 1] = { ...pathStack[pathStack.length - 1], items };
		pathStack = pathStack;
	} catch (e: any) {
		error = e.message || "加载失败";
	} finally {
		loading = false;
	}
}

function enterDirectory(item: FileItem) {
	if (item.type !== "directory") return;
	pathStack = [...pathStack, { name: item.name, path: item.path, items: [] }];
	items = [];
	fetchItems(item.path);
}

function goToIndex(idx: number) {
	if (idx < 0 || idx >= pathStack.length) return;
	pathStack = pathStack.slice(0, idx + 1);
	items = pathStack[pathStack.length - 1].items;
	fetchItems(pathStack[pathStack.length - 1].path);
}

function goBack() {
	if (pathStack.length > 1) {
		pathStack = pathStack.slice(0, -1);
		items = pathStack[pathStack.length - 1].items;
		fetchItems(pathStack[pathStack.length - 1].path);
	}
}

function getFileIcon(name: string) {
	const ext = name.split(".").pop()?.toLowerCase() ?? "";
	if (["jpg", "jpeg", "png", "gif", "webp", "bmp"].includes(ext)) return "material-symbols:image-outline";
	if (["mp4", "mkv", "avi", "mov", "flv", "webm"].includes(ext)) return "material-symbols:movie-outline";
	if (["mp3", "wav", "flac", "ogg", "m4a"].includes(ext)) return "material-symbols:audio-file-outline";
	if (["pdf"].includes(ext)) return "material-symbols:picture-as-pdf-outline";
	if (["zip", "rar", "7z", "tar", "gz"].includes(ext)) return "material-symbols:inventory-2-outline";
	if (["doc", "docx"].includes(ext)) return "material-symbols:description";
	if (["xls", "xlsx"].includes(ext)) return "material-symbols:table-chart";
	if (["ppt", "pptx"].includes(ext)) return "material-symbols:slideshow";
	if (["txt", "md"].includes(ext)) return "material-symbols:text-snippet";
	return "material-symbols:description";
}

function formatSize(size?: number) {
	if (size == null) return "";
	const units = ["B", "KB", "MB", "GB", "TB"];
	let i = 0;
	while (size >= 1024 && i < units.length - 1) {
		size /= 1024;
		i++;
	}
	return size.toFixed(i === 0 ? 0 : 1) + " " + units[i];
}

// 下载文件：fetch /api/tianyi/raw/ 拿到 cloudcube 签名 URL，再用 window.open 直连下载
// 不能用 <a href>，因为浏览器导航请求会触发 Cloudflare Assets 静态资源匹配，
// 未命中直接返回 404-page，不会调用 worker.js 代理
let downloadingId: string | null = null;
async function downloadFile(item: FileItem, event: MouseEvent) {
	event.preventDefault();
	if (downloadingId) return;
	// 如果有直链（如 OneDrive 的 @microsoft.graph.downloadUrl），直接打开
	if (item.downloadUrl) {
		window.open(item.downloadUrl, "_blank");
		return;
	}
	downloadingId = item.id;
	try {
		const url = apiBase + "raw/?path=" + encodeURIComponent(item.path);
		const res = await fetch(url);
		if (!res.ok) throw new Error(`HTTP ${res.status}`);
		const data = await res.json();
		if (data.downloadUrl) {
			window.open(data.downloadUrl, "_blank");
		} else {
			throw new Error("未获取到下载链接");
		}
	} catch (e: any) {
		error = `下载失败：${e.message || e}`;
	} finally {
		downloadingId = null;
	}
}

onMount(async () => {
	await fetchItems("/");
	initialized = true;
});
</script>

<div class="file-explorer-container">
	<!-- 面包屑 -->
	<div class="breadcrumb-bar flex items-center gap-1 mb-4 p-2 bg-gray-100 dark:bg-white/5 rounded-lg text-sm overflow-x-auto whitespace-nowrap">
		{#each pathStack as crumb, i}
			{#if i > 0}
				<Icon icon="material-symbols:chevron-right" class="text-gray-400 dark:text-white/50 flex-shrink-0" />
			{/if}
			{#if i === pathStack.length - 1}
				<span class="px-2 py-1 text-[var(--primary)] font-bold">{crumb.name}</span>
			{:else}
				<button
					class="px-2 py-1 rounded hover:bg-gray-200 dark:hover:bg-white/10 transition-colors text-gray-600 dark:text-white/70"
					on:click={() => goToIndex(i)}
				>
					{crumb.name}
				</button>
			{/if}
		{/each}
	</div>

	<!-- 列表头 -->
	{#if !loading && !error && items.length > 0}
		<div class="file-list-header flex items-center px-3 py-2 text-xs font-bold text-gray-500 dark:text-white/30 uppercase tracking-wider border-b border-gray-200 dark:border-white/5 mb-1">
			<span class="flex-1">名称</span>
			<span class="w-24 text-right">大小</span>
			<span class="w-12"></span>
		</div>
	{/if}

	<div class="file-list">
		<!-- 加载中 -->
		{#if loading}
			<div class="flex items-center justify-center py-12 text-sm opacity-60">
				<Icon icon="material-symbols:progress-activity" class="animate-spin mr-2" />
				加载中...
			</div>
		{/if}

		<!-- 错误 -->
		{#if error}
			<div class="text-center py-12 text-red-500 text-sm">{error}</div>
		{/if}

		<!-- 返回上一级 -->
		{#if !loading && !error && pathStack.length > 1}
			<div
				class="item-row flex items-center gap-2 py-2 px-3 rounded-lg hover:bg-gray-100 dark:hover:bg-white/5 cursor-pointer transition-colors group"
				on:click={goBack}
				role="button"
				tabindex="0"
			>
				<div class="flex items-center justify-center w-6 h-6 text-gray-500 dark:text-white/50 group-hover:text-[var(--primary)] transition-colors">
					<Icon icon="material-symbols:arrow-upward-alt-rounded" class="text-xl" />
				</div>
				<span class="text-gray-700 dark:text-white/70 font-medium group-hover:text-gray-900 dark:group-hover:text-white transition-colors">... (返回上一级)</span>
			</div>
		{/if}

		<!-- 文件列表 -->
		{#if !loading && !error && items.length > 0}
			{#each items as item (item.id)}
				<div class="item-row">
					{#if item.type === "directory"}
						<div
							class="folder-item flex items-center gap-2 py-2 px-3 rounded-lg hover:bg-gray-100 dark:hover:bg-white/5 cursor-pointer transition-colors group"
							on:click={() => enterDirectory(item)}
							role="button"
							tabindex="0"
						>
							<div class="w-8 h-8 flex items-center justify-center bg-gray-200/80 dark:bg-black/50 backdrop-blur-sm rounded-full transition-all group-hover:scale-110">
								<Icon icon="material-symbols:folder" class="text-xl text-gray-800 dark:text-white/90" />
							</div>
							<span class="text-gray-800 dark:text-white/90 font-medium flex-1">{item.name}</span>
							<div class="text-gray-400 dark:text-white/50 group-hover:text-gray-600 dark:group-hover:text-white transition-colors">
								<Icon icon="material-symbols:chevron-right" class="text-xl" />
							</div>
						</div>
					{:else}
				<a
					href="#"
					on:click={(e) => downloadFile(item, e)}
					class="file-item flex items-center justify-between py-2 px-3 rounded-lg hover:bg-gray-100 dark:hover:bg-white/5 transition-colors group no-underline cursor-pointer"
				>
						<div class="flex items-center gap-2 flex-1">
							<div class="w-8 h-8 flex items-center justify-center bg-gray-200/80 dark:bg-black/50 backdrop-blur-sm rounded-full transition-all group-hover:scale-110">
								<Icon icon={getFileIcon(item.name)} class="text-xl text-gray-800 dark:text-white/90" />
							</div>
							<span class="text-gray-700 dark:text-white/70 group-hover:text-gray-900 dark:group-hover:text-white transition-colors truncate">{item.name}</span>
						</div>
						<div class="flex items-center gap-4 text-xs text-gray-500 dark:text-white/30">
							<span class="w-24 text-right">{formatSize(item.size)}</span>
							<div class="opacity-0 group-hover:opacity-100 p-1 hover:bg-gray-200 dark:hover:bg-white/10 rounded transition-all text-gray-600 dark:text-white/50 hover:text-gray-900 dark:hover:text-white w-12 flex justify-center" title="下载">
								{#if downloadingId === item.id}
									<Icon icon="material-symbols:progress-activity" class="text-lg animate-spin" />
								{:else}
									<Icon icon="material-symbols:download" class="text-lg" />
								{/if}
							</div>
						</div>
					</a>
					{/if}
				</div>
			{/each}
		{/if}

		<!-- 空目录 -->
		{#if !loading && !error && initialized && items.length === 0}
			<div class="py-12 text-center text-gray-400 dark:text-white/20">
				<Icon icon="material-symbols:folder-off-outline" class="text-4xl mx-auto mb-2" />
				<p>文件夹为空</p>
			</div>
		{/if}
	</div>
</div>

<style>
	.file-explorer-container {
		display: flex;
		flex-direction: column;
	}
	.item-row {
		width: 100%;
	}
	:global(.file-explorer-container a) {
		text-decoration: none !important;
	}
	.breadcrumb-bar::-webkit-scrollbar {
		height: 2px;
	}
	.breadcrumb-bar::-webkit-scrollbar-thumb {
		background: rgba(0, 0, 0, 0.2);
	}
	.dark .breadcrumb-bar::-webkit-scrollbar-thumb {
		background: rgba(255, 255, 255, 0.1);
	}
</style>
