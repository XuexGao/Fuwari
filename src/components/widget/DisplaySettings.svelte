<script lang="ts">
import { AUTO_MODE, DARK_MODE, LIGHT_MODE } from "@constants/constants";
import Icon from "@iconify/svelte";
import {
	getBgBlur,
	getDefaultHue,
	getDevMode,
	getDevServer,
	getHideBg,
	getHue,
	getRainbowMode,
	getRainbowSpeed,
	getStoredTheme,
	setBgBlur,
	setBgHueRotate,
	setDevMode,
	setDevServer,
	setHideBg,
	setHue,
	setRainbowMode,
	setRainbowSpeed,
	setTheme,
} from "@utils/setting-utils";
import { onMount } from "svelte";

let hue = getHue();
let theme = getStoredTheme();
let isRainbowMode = getRainbowMode();
let rainbowSpeed = getRainbowSpeed();
let bgBlur = getBgBlur();
let hideBg = getHideBg();
let isDevMode = getDevMode();
	let devServer = getDevServer();
	let animationId: number;

	const defaultHue = getDefaultHue();

	function resetHue() {
		hue = getDefaultHue();
	}

	$: if ((hue || hue === 0) && !isRainbowMode) {
		setHue(hue);
	}

	$: {
		setBgBlur(bgBlur);
	}

	function switchTheme(newTheme: string) {
		theme = newTheme;
		setTheme(newTheme);
	}

	function toggleRainbow() {
		isRainbowMode = !isRainbowMode;
		setRainbowMode(isRainbowMode);

		if (isRainbowMode) {
			document.documentElement.classList.add("is-rainbow-mode");
            document.documentElement.style.setProperty("--rainbow-duration", `${120 / rainbowSpeed}s`);
		} else {
            document.documentElement.classList.remove("is-rainbow-mode");
            document.documentElement.style.removeProperty("--rainbow-duration");
			setHue(hue); // Restore the static hue
		}
	}

	function toggleHideBg() {
		hideBg = !hideBg;
		setHideBg(hideBg);
	}

	function toggleDevMode() {
		isDevMode = !isDevMode;
		setDevMode(isDevMode);
	}

	function onDevServerChange() {
		setDevServer(devServer);
	}

	function onSpeedChange() {
		setRainbowSpeed(rainbowSpeed);
        if (isRainbowMode) {
             document.documentElement.style.setProperty("--rainbow-duration", `${120 / rainbowSpeed}s`);
        }
	}

	onMount(() => {
		if (isRainbowMode) {
            document.documentElement.classList.add("is-rainbow-mode");
            document.documentElement.style.setProperty("--rainbow-duration", `${120 / rainbowSpeed}s`);
		}
	});
</script>

<div id="display-setting" class="float-panel float-panel-closed absolute transition-all w-80 right-4 px-4 py-4">
    <div class="flex flex-row gap-2 mb-3 items-center justify-between">
        <div class="flex gap-2 font-bold text-lg text-neutral-900 dark:text-neutral-100 transition relative ml-3
            before:w-1 before:h-4 before:rounded-md before:bg-[var(--primary)]
            before:absolute before:-left-3 before:top-[0.33rem]"
        >
            主题模式
        </div>
        <div class="flex gap-1">
            <button aria-label="Light Mode"
                class="w-10 h-7 rounded-md transition flex items-center justify-center active:scale-90
                {theme === LIGHT_MODE ? 'bg-[var(--primary)] text-white' : 'bg-[var(--btn-regular-bg)] text-[var(--btn-content)] hover:bg-[var(--btn-regular-bg-hover)]'}"
                on:click={() => switchTheme(LIGHT_MODE)}
            >
                <Icon icon="material-symbols:wb-sunny-rounded" class="text-[1.1rem]"></Icon>
            </button>
            <button aria-label="Dark Mode"
                class="w-10 h-7 rounded-md transition flex items-center justify-center active:scale-90
                {theme === DARK_MODE ? 'bg-[var(--primary)] text-white' : 'bg-[var(--btn-regular-bg)] text-[var(--btn-content)] hover:bg-[var(--btn-regular-bg-hover)]'}"
                on:click={() => switchTheme(DARK_MODE)}
            >
                <Icon icon="material-symbols:dark-mode-rounded" class="text-[1.1rem]"></Icon>
            </button>
            <button aria-label="Auto Mode"
                class="w-10 h-7 rounded-md transition flex items-center justify-center active:scale-90
                {theme === AUTO_MODE ? 'bg-[var(--primary)] text-white' : 'bg-[var(--btn-regular-bg)] text-[var(--btn-content)] hover:bg-[var(--btn-regular-bg-hover)]'}"
                on:click={() => switchTheme(AUTO_MODE)}
            >
                <Icon icon="material-symbols:hdr-auto-rounded" class="text-[1.1rem]"></Icon>
            </button>
        </div>
    </div>

    <div class="flex flex-row gap-2 mb-3 items-center justify-between">
        <div class="flex gap-2 font-bold text-lg text-neutral-900 dark:text-neutral-100 transition relative ml-3
            before:w-1 before:h-4 before:rounded-md before:bg-[var(--primary)]
            before:absolute before:-left-3 before:top-[0.33rem]"
        >
            主题色彩
            <button aria-label="Reset to Default" class="btn-regular w-7 h-7 rounded-md  active:scale-90"
                    class:opacity-0={hue === defaultHue} class:pointer-events-none={hue === defaultHue} on:click={resetHue}>
                <div class="text-[var(--btn-content)]">
                    <Icon icon="fa6-solid:arrow-rotate-left" class="text-[0.875rem]"></Icon>
                </div>
            </button>
        </div>
        <div class="flex gap-1">
            <input aria-label="Hue Value" id="hueValue" type="number" min="0" max="360" value={Math.round(hue)} on:input={(e) => hue = e.currentTarget.valueAsNumber} disabled={isRainbowMode}
                   class="transition bg-[var(--btn-regular-bg)] w-12 h-7 rounded-md text-center font-bold text-sm text-[var(--btn-content)] outline-none"
            />
        </div>
    </div>
    <div class="w-full h-6 px-1 bg-[oklch(0.80_0.10_0)] dark:bg-[oklch(0.70_0.10_0)] rounded select-none mb-3">
        <input aria-label="主题色彩" type="range" min="0" max="360" bind:value={hue} disabled={isRainbowMode}
               class="slider" id="colorSlider" step="1" style="width: 100%">
    </div>

    <div class="flex flex-row gap-2 mb-3 items-center justify-between">
        <div class="flex gap-2 font-bold text-lg text-neutral-900 dark:text-neutral-100 transition relative ml-3
            before:w-1 before:h-4 before:rounded-md before:bg-[var(--primary)]
            before:absolute before:-left-3 before:top-[0.33rem]"
        >
            禁用背景
        </div>
        <input type="checkbox" class="toggle-switch" checked={hideBg} on:change={toggleHideBg} />
    </div>

    <div class="flex flex-row gap-2 mb-3 items-center justify-between">
        <div class="flex gap-2 font-bold text-lg text-neutral-900 dark:text-neutral-100 transition relative ml-3
            before:w-1 before:h-4 before:rounded-md before:bg-[var(--primary)]
            before:absolute before:-left-3 before:top-[0.33rem]"
        >
            彩虹模式
        </div>
        <input type="checkbox" class="toggle-switch" checked={isRainbowMode} on:change={toggleRainbow} />
    </div>

    {#if isRainbowMode}
    <div class="flex flex-row gap-2 mb-3 items-center justify-between transition-all" >
        <div class="flex gap-2 font-bold text-lg text-neutral-900 dark:text-neutral-100 transition relative ml-3
            before:w-1 before:h-4 before:rounded-md before:bg-[var(--primary)]
            before:absolute before:-left-3 before:top-[0.33rem]"
        >
            变换速率
        </div>
        <div class="flex gap-1">
             <div class="transition bg-[var(--btn-regular-bg)] w-10 h-7 rounded-md flex justify-center
            font-bold text-sm items-center text-[var(--btn-content)]">
                {rainbowSpeed}
            </div>
        </div>
    </div>
    <div class="w-full h-6 bg-[var(--btn-regular-bg)] rounded select-none overflow-hidden">
        <input aria-label="变换速率" type="range" min="1" max="100" bind:value={rainbowSpeed} on:change={onSpeedChange}
               class="slider" step="1" style="width: 100%; --value-percent: {(rainbowSpeed - 1) / 99 * 100}%">
    </div>
    {/if}

    <div class="flex flex-row gap-2 mb-3 mt-3 items-center justify-between">
        <div class="flex gap-2 font-bold text-lg text-neutral-900 dark:text-neutral-100 transition relative ml-3
            before:w-1 before:h-4 before:rounded-md before:bg-[var(--primary)]
            before:absolute before:-left-3 before:top-[0.33rem]"
        >
            背景模糊
        </div>
        <div class="flex gap-1">
            <div class="transition bg-[var(--btn-regular-bg)] w-10 h-7 rounded-md flex justify-center
            font-bold text-sm items-center text-[var(--btn-content)]">
                {bgBlur}px
            </div>
        </div>
    </div>
    <div class="w-full h-6 bg-[var(--btn-regular-bg)] rounded select-none overflow-hidden">
        <input aria-label="背景模糊" type="range" min="0" max="20" bind:value={bgBlur}
               class="slider" step="1" style="width: 100%; --value-percent: {bgBlur / 20 * 100}%">
    </div>

    <div class="flex flex-row gap-2 mb-3 mt-3 items-center justify-between">
        <div class="flex gap-2 font-bold text-lg text-neutral-900 dark:text-neutral-100 transition relative ml-3
            before:w-1 before:h-4 before:rounded-md before:bg-[var(--primary)]
            before:absolute before:-left-3 before:top-[0.33rem]"
        >
            开发模式
        </div>
        <input type="checkbox" class="toggle-switch" checked={isDevMode} on:change={toggleDevMode} />
    </div>

    {#if isDevMode}
    <div class="flex flex-row gap-2 mb-3 items-center justify-between transition-all" >
        <div class="flex gap-2 font-bold text-lg text-neutral-900 dark:text-neutral-100 transition relative ml-3
            before:w-1 before:h-4 before:rounded-md before:bg-[var(--primary)]
            before:absolute before:-left-3 before:top-[0.33rem]"
        >
            Server
        </div>
        <div class="flex gap-1">
             <input aria-label="Server Value" type="text" bind:value={devServer} on:input={onDevServerChange}
                   class="transition bg-[var(--btn-regular-bg)] w-32 h-7 rounded-md text-center font-bold text-sm text-[var(--btn-content)] outline-none"
            />
        </div>
    </div>
    {/if}
</div>


<style lang="stylus">
    #display-setting
      input[type="number"]
        -moz-appearance textfield
        &::-webkit-inner-spin-button
        &::-webkit-outer-spin-button
          -webkit-appearance none
          margin 0

      input[type="range"]
        -webkit-appearance none
        height 1.5rem
        background-color transparent
        transition background-image 0.15s ease-in-out

        &:not(#colorSlider)
            background-image linear-gradient(to right, var(--primary) 0%, var(--primary) var(--value-percent), transparent var(--value-percent), transparent 100%)

      #colorSlider
        background-image var(--color-selection-bar)

      input[type="range"]
        /* Input Thumb */
        &::-webkit-slider-thumb
          -webkit-appearance none
          height 0
          width 0
          background transparent
          box-shadow none
          border none

        &::-moz-range-thumb
          -webkit-appearance none
          height 0
          width 0
          background transparent
          box-shadow none
          border none

        &::-ms-thumb
          -webkit-appearance none
          height 0
          width 0
          background transparent
          box-shadow none
          border none

      #colorSlider
        background-image var(--color-selection-bar)
        &::-webkit-slider-thumb
          -webkit-appearance none
          height 1rem
          width 0.5rem
          border-radius 0.125rem
          background rgba(255, 255, 255, 0.7)
          box-shadow none
          margin-top 0
          transform none
          transition background 0.15s
          &:hover
            background rgba(255, 255, 255, 0.8)
          &:active
            background rgba(255, 255, 255, 0.6)

        &::-moz-range-thumb
          -webkit-appearance none
          height 1rem
          width 0.5rem
          border-radius 0.125rem
          border-width 0
          background rgba(255, 255, 255, 0.7)
          box-shadow none
          transform none
          transition background 0.15s
          &:hover
            background rgba(255, 255, 255, 0.8)
          &:active
            background rgba(255, 255, 255, 0.6)

        &::-ms-thumb
          -webkit-appearance none
          height 1rem
          width 0.5rem
          border-radius 0.125rem
          background rgba(255, 255, 255, 0.7)
          box-shadow none
          transform none
          transition background 0.15s
          &:hover
            background rgba(255, 255, 255, 0.8)
          &:active
            background rgba(255, 255, 255, 0.6)

      .toggle-switch
        appearance none
        width 3rem
        height 1.5rem
        background var(--btn-regular-bg)
        border-radius 999px
        position relative
        cursor pointer
        transition background 0.3s
        &::after
            content ''
            position absolute
            top 0.25rem
            left 0.25rem
            width 1rem
            height 1rem
            background var(--btn-content)
            border-radius 50%
            transition transform 0.3s
        &:checked
            background var(--primary)
            &::after
                transform translateX(1.5rem)
                background white
</style>
