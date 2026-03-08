<script lang="ts">
import Icon from "@iconify/svelte";

interface FileItem {
	name: string;
	path: string;
	type: "file" | "directory";
	size?: number;
	mtime?: string | Date;
	children?: FileItem[];
}

export let items: FileItem[] = [];

// 导航栈，初始为根目录
let pathStack: { name: string; items: FileItem[] }[] = [
	{ name: "根目录", items },
];

// 当前显示的条目
$: currentView = pathStack[pathStack.length - 1];

function navigateInto(item: FileItem) {
	if (item.type === "directory" && item.children) {
		pathStack = [...pathStack, { name: item.name, items: item.children }];
	}
}

function navigateToLevel(index: number) {
	pathStack = pathStack.slice(0, index + 1);
}

function goBack() {
	if (pathStack.length > 1) {
		pathStack = pathStack.slice(0, -1);
	}
}

function formatSize(bytes?: number) {
	if (bytes === undefined) return "";
	if (bytes === 0) return "0 B";
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
</script>

<div class="file-explorer-container">
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
    </div>

    <div class="file-list-header flex items-center px-3 py-2 text-xs font-bold text-white/30 uppercase tracking-wider border-b border-white/5 mb-1">
        <span class="flex-1">名称</span>
        <span class="w-24 text-right">大小</span>
        <span class="w-12"></span>
    </div>

    <div class="file-list">
        <!-- 返回上一级 -->
        {#if pathStack.length > 1}
            <!-- svelte-ignore a11y-click-events-have-key-events -->
            <!-- svelte-ignore a11y-no-static-element-interactions -->
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

        {#each currentView.items as item}
            <div class="item-row">
                {#if item.type === 'directory'}
                    <!-- svelte-ignore a11y-click-events-have-key-events -->
                    <!-- svelte-ignore a11y-no-static-element-interactions -->
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
                        href={`/${item.path}`} 
                        download={item.name}
                        target="_blank" 
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

        {#if currentView.items.length === 0}
            <div class="py-12 text-center text-white/20">
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
        background: rgba(255, 255, 255, 0.1);
        border-radius: 10px;
    }
</style>
