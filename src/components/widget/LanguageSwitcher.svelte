<script lang="ts">
	import Icon from "@iconify/svelte";
	import { onMount } from "svelte";

	function toggleLang() {
		const currentPath = window.location.pathname;
		const segments = currentPath.split('/').filter(Boolean);
		
		let newLang = 'en';
		if (segments[0] === 'zh-cn') {
			newLang = 'en';
		} else if (segments[0] === 'en') {
			newLang = 'zh-cn';
		}

		if (segments[0] === 'zh-cn' || segments[0] === 'en') {
			segments[0] = newLang;
		} else {
			segments.unshift(newLang);
		}
		
		const newPath = '/' + segments.join('/') + (currentPath.endsWith('/') ? '/' : '');
		window.location.href = newPath;
	}
</script>

<button
	aria-label="Toggle Language"
	class="btn-plain scale-animation rounded-lg h-11 w-11 active:scale-90"
	on:click={toggleLang}
>
	<Icon icon="material-symbols:language" class="text-[1.25rem]"></Icon>
</button>
