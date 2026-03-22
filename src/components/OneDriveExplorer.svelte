<script lang="ts">
import Icon from "@iconify/svelte";

export let apiBase = "https://e3.2x.nz/api/";

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
	{ name: "OneDrive 根目录", path: "/", items: [] },
];
let loading = false;
let error = "";
let initialized = false;

async function fetchItems(currentPath = "/") {
	loading = true;
	items = []; // 立即清空当前列表，防止显示旧数据
	error = "";
	try {
		const url = `${apiBase}?path=${encodeURIComponent(currentPath)}`;
		const response = await fetch(url);

		if (!response.ok) {
			throw new Error(`API 请求失败: ${response.status}`);
		}

		const data = await response.json();
		const folderValue = data.folder?.value || data.value || [];

		items = folderValue
			.map((item: any) => {
				const isFolder = !!item.folder;
				// 拼接完整路径用于下载或下级导航
				const fullPath =
					currentPath === "/" ? `/${item.name}` : `${currentPath}/${item.name}`;

				return {
					id: item.id,
					name: item.name,
					path: fullPath,
					type: isFolder ? "directory" : "file",
					size: item.size,
					// 下载链接拼接规则
					downloadUrl: isFolder
						? undefined
						: `${apiBase}raw/?path=${encodeURIComponent(fullPath)}`,
				};
			})
			.sort((a: FileItem, b: FileItem) => {
				if (a.type === b.type) return a.name.localeCompare(b.name);
				return a.type === "directory" ? -1 : 1;
			});

		pathStack[pathStack.length - 1].items = items;
	} catch (err: any) {
		error = `加载失败: ${err.message}`;
		console.error(err);
	} finally {
		loading = false;
	}
}

async function navigateInto(item: FileItem) {
	if (item.type === "directory") {
		pathStack = [...pathStack, { name: item.name, path: item.path, items: [] }];
		await fetchItems(item.path);
	}
}

async function navigateToLevel(index: number) {
	pathStack = pathStack.slice(0, index + 1);
	await fetchItems(pathStack[index].path);
}

async function goBack() {
	if (pathStack.length > 1) {
		pathStack = pathStack.slice(0, -1);
		await fetchItems(pathStack[pathStack.length - 1].path);
	}
}

function formatSize(bytes?: number) {
	if (bytes === undefined || bytes === 0) return "";
	const k = 1024;
	const sizes = ["B", "KB", "MB", "GB", "TB"];
	const i = Math.floor(Math.log(bytes) / Math.log(k));
	return (
		Number.parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i]
	);
}

function getFileIcon(filename: string) {
	const ext = filename.split(".").pop()?.toLowerCase();
	switch (ext) {
		case "jpg":
		case "jpeg":
		case "png":
		case "gif":
		case "svg":
		case "webp":
		case "avif":
			return "material-symbols:image-outline";
		case "mp4":
		case "webm":
		case "mkv":
		case "mov":
		case "avi":
			return "material-symbols:movie-outline";
		case "mp3":
		case "wav":
		case "flac":
		case "ogg":
			return "material-symbols:audio-file-outline";
		case "zip":
		case "rar":
		case "7z":
		case "tar":
		case "gz":
		case "zpaq":
			return "material-symbols:inventory-2-outline";
		case "pdf":
			return "material-symbols:picture-as-pdf-outline";
		case "doc":
		case "docx":
			return "material-symbols:description";
		case "xls":
		case "xlsx":
			return "material-symbols:table-chart";
		case "ppt":
		case "pptx":
			return "material-symbols:slideshow";
		case "js":
		case "ts":
		case "html":
		case "css":
		case "py":
		case "go":
		case "json":
		case "md":
			return "material-symbols:code-blocks-outline";
		case "exe":
		case "msi":
		case "iso":
			return "material-symbols:settings-applications";
		case "txt":
			return "material-symbols:text-snippet";
		default:
			return "material-symbols:description";
	}
}

$: if (!initialized && typeof window !== "undefined") {
	initialized = true;
	fetchItems("/");
}

$: currentView = pathStack[pathStack.length - 1] || { path: "/", items: [] };
</script>

<div class="onedrive-explorer-container">
    <!-- 面包屑导航 -->
    <div class="breadcrumb-bar flex items-center gap-1 mb-4 p-2 bg-white/5 rounded-lg text-sm overflow-x-auto whitespace-nowrap">
        {#each pathStack as folder, i}
            {#if i > 0}
                <Icon icon="material-symbols:chevron-right" class="text-white/50 flex-shrink-0" />
            {/if}
            <button 
                class="px-2 py-1 rounded hover:bg-white/10 transition-colors {i === pathStack.length - 1 ? 'text-[var(--primary)] font-bold' : 'text-white/70'}"
                on:click={() => navigateToLevel(i)}
            >
                {folder.name}
            </button>
        {/each}
        
        {#if loading}
            <div class="ml-auto flex items-center gap-2 text-white/30 text-xs">
                <Icon icon="svg-spinners:ring-resize" class="text-lg" />
                正在加载...
            </div>
        {/if}
    </div>

    {#if error}
        <div class="mb-4 p-3 bg-red-500/10 border border-red-500/20 rounded-lg text-red-400 text-sm flex items-center gap-2">
            <Icon icon="material-symbols:error-outline" class="text-lg" />
            {error}
            <button on:click={() => fetchItems(currentView.path)} class="ml-auto underline">重试</button>
        </div>
    {/if}

    <div class="file-list-header flex items-center px-3 py-2 text-xs font-bold text-white/30 uppercase tracking-wider border-b border-white/5 mb-1">
        <span class="flex-1">名称</span>
        <span class="w-24 text-right">大小</span>
        <span class="w-12"></span>
    </div>

    <div class="file-list min-h-[200px] relative">
        {#if loading && items.length === 0}
            <div class="absolute inset-0 flex items-center justify-center text-white/20">
                <Icon icon="svg-spinners:ring-resize" class="text-4xl" />
            </div>
        {/if}

        <!-- 返回上一级 -->
        {#if pathStack.length > 1}
            <div 
                class="item-row flex items-center gap-2 py-2 px-3 rounded-lg hover:bg-white/5 cursor-pointer transition-colors group"
                on:click={goBack}
            >
                <div class="flex items-center justify-center w-6 h-6 text-white/50 group-hover:text-[var(--primary)] transition-colors">
                    <Icon icon="material-symbols:arrow-upward-alt-rounded" class="text-xl" />
                </div>
                <span class="text-white/70 font-medium group-hover:text-white transition-colors">... (返回上一级)</span>
            </div>
        {/if}

        {#each items as item}
            <div class="item-row">
                {#if item.type === 'directory'}
                    <div 
                        class="folder-item flex items-center gap-2 py-2 px-3 rounded-lg hover:bg-white/5 cursor-pointer transition-colors group"
                        on:click={() => navigateInto(item)}
                    >
                        <div class="flex items-center justify-center w-6 h-6 text-[var(--primary)] group-hover:scale-110 transition-transform">
                            <Icon icon="material-symbols:folder" class="text-xl" />
                        </div>
                        <span class="text-white/90 font-medium flex-1">{item.name}</span>
                        <div class="text-white/50 group-hover:text-white transition-colors">
                            <Icon icon="material-symbols:chevron-right" class="text-xl" />
                        </div>
                    </div>
                {:else}
                    <a 
                        href={item.downloadUrl} 
                        download={item.name}
                        target="_blank"
                        rel="noopener noreferrer"
                        class="file-item flex items-center justify-between py-2 px-3 rounded-lg hover:bg-white/5 transition-colors group no-underline"
                    >
                        <div class="flex items-center gap-2 flex-1">
                            <div class="flex items-center justify-center w-6 h-6 text-white/30 group-hover:text-[var(--primary)] transition-colors">
                                <Icon icon={getFileIcon(item.name)} class="text-xl" />
                            </div>
                            <span class="text-white/70 group-hover:text-white transition-colors">{item.name}</span>
                        </div>
                        <div class="flex items-center gap-4 text-xs text-white/30">
                            <span class="w-24 text-right">{formatSize(item.size)}</span>
                            <div class="opacity-0 group-hover:opacity-100 p-1 hover:bg-white/10 rounded transition-all text-white/50 hover:text-white w-12 flex justify-center" title="下载">
                                <Icon icon="material-symbols:download" class="text-lg" />
                            </div>
                        </div>
                    </a>
                {/if}
            </div>
        {/each}

        {#if !loading && items.length === 0}
            <div class="py-12 text-center text-white/20">
                <Icon icon="material-symbols:folder-off-outline" class="text-4xl mx-auto mb-2" />
                <p>文件夹为空</p>
            </div>
        {/if}
    </div>
</div>

<style>
    .onedrive-explorer-container {
        display: flex;
        flex-direction: column;
    }
    
    .item-row {
        width: 100%;
    }

    .breadcrumb-bar::-webkit-scrollbar {
        height: 2px;
    }
    .breadcrumb-bar::-webkit-scrollbar-thumb {
        background: rgba(255, 255, 255, 0.1);
        border-radius: 10px;
    }
</style>
