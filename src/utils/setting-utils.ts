import { expressiveCodeConfig } from "@/config";
import type { LIGHT_DARK_MODE } from "@/types/config";
import {
	AUTO_MODE,
	DARK_MODE,
	DEFAULT_THEME,
	LIGHT_MODE,
} from "@constants/constants.ts";

export function getDefaultHue(): number {
	const fallback = "250";
	const configCarrier = document.getElementById("config-carrier");
	return Number.parseInt(configCarrier?.dataset.hue || fallback);
}

export function getHue(): number {
	const stored = localStorage.getItem("hue");
	return stored ? Number.parseInt(stored) : getDefaultHue();
}

export function setHue(hue: number, save: boolean = true): void {
	if (save) {
		localStorage.setItem("hue", String(hue));
	}
	document.documentElement.style.setProperty("--hue", String(hue));
}

export function getRainbowMode(): boolean {
	const stored = localStorage.getItem("rainbow-mode");
	return stored === "true";
}

export function setRainbowMode(enabled: boolean): void {
	localStorage.setItem("rainbow-mode", String(enabled));
}

export function getRainbowSpeed(): number {
	const stored = localStorage.getItem("rainbow-speed");
	return stored ? Number.parseFloat(stored) : 5; // Default speed
}

export function setRainbowSpeed(speed: number): void {
	localStorage.setItem("rainbow-speed", String(speed));
}

export function getBgBlur(): number {
	const stored = localStorage.getItem("bg-blur");
	return stored ? Number.parseInt(stored) : 0; // Default blur is 0
}

export function setBgBlur(blur: number): void {
	localStorage.setItem("bg-blur", String(blur));
	const bgBox = document.getElementById("bg-box");
	if (bgBox) {
        // Retrieve existing hue-rotate value if any, or 0
        const currentFilter = bgBox.style.filter || "";
        const hueRotateMatch = currentFilter.match(/hue-rotate\((.*?)deg\)/);
        const hueRotate = hueRotateMatch ? hueRotateMatch[1] : "0";
		bgBox.style.setProperty("filter", `blur(${blur}px) hue-rotate(${hueRotate}deg)`);
	}
}

export function setBgHueRotate(hue: number): void {
    const bgBox = document.getElementById("bg-box");
    if (bgBox) {
        // Retrieve existing blur value
        const currentFilter = bgBox.style.filter || "";
        const blurMatch = currentFilter.match(/blur\((.*?)px\)/);
        const blur = blurMatch ? blurMatch[1] : getBgBlur();
        bgBox.style.setProperty("filter", `blur(${blur}px) hue-rotate(${hue}deg)`);
    }
}

export function applyThemeToDocument(theme: LIGHT_DARK_MODE) {
	switch (theme) {
		case LIGHT_MODE:
			document.documentElement.classList.remove("dark");
			break;
		case DARK_MODE:
			document.documentElement.classList.add("dark");
			break;
		case AUTO_MODE:
			if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
				document.documentElement.classList.add("dark");
			} else {
				document.documentElement.classList.remove("dark");
			}
			break;
	}
	document.documentElement.setAttribute(
		"data-theme",
		expressiveCodeConfig.theme,
	);
}

export function setTheme(theme: LIGHT_DARK_MODE): void {
	localStorage.setItem("theme", theme);
	applyThemeToDocument(theme);
}

export function getStoredTheme(): LIGHT_DARK_MODE {
	return (localStorage.getItem("theme") as LIGHT_DARK_MODE) || DEFAULT_THEME;
}
