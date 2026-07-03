<script lang="ts">
import Icon from "@iconify/svelte";
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
	} catch (e: any) {
		error = e.message || "加载失败";
	} finally {
		loading = false;
	}
}

function enterDirectory(item: FileItem) {
	if (item.type !== "directory") return;
	pathStack.push({ name: item.name, path: item.path, items: [] });
	items = [];
	fetchItems(item.path);
}

function goToIndex(idx: number) {
	if (idx < 0 || idx >= pathStack.length) return;
	pathStack = pathStack.slice(0, idx + 1);
	items = pathStack[pathStack.length - 1].items;
	fetchItems(pathStack[pathStack.length - 1].path);
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

async function onMount() {
	await fetchItems("/");
	initialized = true;
}
</script>

<div class="min-h-[300px]">
	<!-- 面包屑 -->
	<div class="flex flex-wrap items-center gap-1 mb-4 text-sm">
		{#each pathStack as crumb, i}
			{#if i > 0}
				<span class="opacity-40">/</span>
			{/if}
			{#if i === pathStack.length - 1}
				<span class="font-semibold text-[var(--primary)]">{crumb.name}</span>
			{:else}
				<button class="opacity-70 hover:opacity-100 hover:text-[var(--primary)] transition-colors" on:click={() => goToIndex(i)}>
					{crumb.name}
				</button>
			{/if}
		{/each}
	</div>

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

	<!-- 文件列表 -->
	{#if !loading && !error && items.length > 0}
		<div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
			{#each items as item (item.id)}
				{#if item.type === "directory"}
					<button
						class="flex items-center gap-3 p-3 rounded-lg border border-[var(--line-color)] hover:bg-[var(--btn-regular-bg)] transition-colors text-left"
						on:click={() => enterDirectory(item)}
					>
						<Icon icon="material-symbols:folder" class="text-xl text-gray-800 dark:text-white/90 shrink-0" />
						<span class="flex-1 truncate text-sm">{item.name}</span>
					</button>
				{:else}
					<a
						href={item.downloadUrl || apiBase + "raw/?path=" + encodeURIComponent(item.path)}
						target="_blank"
						rel="noopener noreferrer"
						class="flex items-center gap-3 p-3 rounded-lg border border-[var(--line-color)] hover:bg-[var(--btn-regular-bg)] transition-colors"
					>
						<Icon icon={getFileIcon(item.name)} class="text-xl text-gray-800 dark:text-white/90 shrink-0" />
						<div class="flex-1 min-w-0">
							<div class="truncate text-sm">{item.name}</div>
							{#if item.size}
								<div class="text-xs opacity-50">{formatSize(item.size)}</div>
							{/if}
						</div>
					</a>
				{/if}
			{/each}
		</div>
	{/if}

	<!-- 空目录 -->
	{#if !loading && !error && initialized && items.length === 0}
		<div class="text-center py-12 text-sm opacity-50">此目录为空</div>
	{/if}
</div>

<svelte:window on:load={onMount} />
