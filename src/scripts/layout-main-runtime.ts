import { getHue, setHue, setTheme, getBgBlur, setBgBlur, getHideBg, setHideBg } from "../utils/setting-utils";
import { pathsEqual, url } from "../utils/url-utils";
import { bindPostInlineDiff } from "../scripts/post-inline-diff";
import {
	BANNER_HEIGHT,
	BANNER_HEIGHT_HOME,
	BANNER_HEIGHT_EXTEND,
	MAIN_PANEL_OVERLAPS_BANNER_HEIGHT,
} from "../constants/constants";
import { siteConfig } from "../config";

const bannerEnabled = !!document.getElementById("banner-wrapper");

function setClickOutsideToClose(panel: string, ignores: string[]) {
	document.addEventListener("click", event => {
		let panelDom = document.getElementById(panel);
		let tDom = event.target;
		if (!(tDom instanceof Node)) return;
		for (let ig of ignores) {
			let ie = document.getElementById(ig);
			if (ie == tDom || ie?.contains(tDom)) {
				return;
			}
		}
		panelDom!.classList.add("float-panel-closed");
	});
}
setClickOutsideToClose("display-setting", ["display-setting", "display-settings-switch"]);
setClickOutsideToClose("nav-menu-panel", ["nav-menu-panel", "nav-menu-switch"]);
setClickOutsideToClose("search-panel", ["search-panel", "search-bar", "search-switch"]);

function loadTheme() {
	setTheme();
}

function loadHue() {
	setHue(getHue());
}

function loadBgBlur() {
	setBgBlur(getBgBlur());
	setHideBg(getHideBg());
}

function showBanner() {
	if (!siteConfig.banner.enable) return;

	const banner = document.getElementById("banner");
	if (!banner) {
		console.error("Banner element not found");
		return;
	}

	banner.classList.remove("opacity-0", "scale-105");
}

function loadGiscus() {
	const container = document.getElementById("giscus-container");
	if (!container) return;

	if (container.querySelector("iframe.giscus-frame") || container.querySelector('script[src*="giscus"]')) return;

	const script = document.createElement("script");
	script.src = "https://giscus.app/client.js";
	const attributes = [
		"data-repo",
		"data-repo-id",
		"data-category",
		"data-category-id",
		"data-mapping",
		"data-strict",
		"data-reactions-enabled",
		"data-emit-metadata",
		"data-input-position",
		"data-lang",
		"data-loading",
	];
	attributes.forEach(attr => {
		const val = container.getAttribute(attr);
		if (val) script.setAttribute(attr, val);
	});
	script.setAttribute("data-theme", "dark");
	script.crossOrigin = "anonymous";
	script.async = true;

	container.appendChild(script);
}

function init() {
	loadTheme();
	loadHue();
	loadBgBlur();
	showBanner();
	loadGiscus();

	new MutationObserver(() => {
		const frame = document.querySelector("iframe.giscus-frame");
		if (!frame) return;
		frame.contentWindow.postMessage({ giscus: { setConfig: { theme: "dark" } } }, "https://giscus.app");
	}).observe(document.documentElement, { attributes: true, attributeFilter: ["class"] });
}

init();
bindPostInlineDiff();

const setup = () => {
	window.swup.hooks.on("link:click", () => {
		document.documentElement.style.setProperty("--content-delay", "0ms");

		if (!bannerEnabled) {
			return;
		}
		let threshold = window.innerHeight * (BANNER_HEIGHT / 100) - 72 - 16;
		let navbar = document.getElementById("navbar-wrapper");
		if (!navbar || !document.body.classList.contains("lg:is-home")) {
			return;
		}
		if (document.body.scrollTop >= threshold || document.documentElement.scrollTop >= threshold) {
			navbar.classList.add("navbar-hidden");
		}
	});
	window.swup.hooks.on("visit:start", (visit: { to: { url: string } }) => {
		const bodyElement = document.querySelector("body");
		if (pathsEqual(visit.to.url, url("/"))) {
			bodyElement!.classList.add("lg:is-home");
		} else {
			bodyElement!.classList.remove("lg:is-home");
		}

		const heightExtend = document.getElementById("page-height-extend");
		if (heightExtend) {
			heightExtend.classList.remove("hidden");
		}

		let toc = document.getElementById("toc-wrapper");
		if (toc) {
			toc.classList.add("toc-not-ready");
		}
	});
	window.swup.hooks.on("page:view", () => {
		const heightExtend = document.getElementById("page-height-extend");
		if (heightExtend) {
			heightExtend.classList.remove("hidden");
		}
		scrollFunction();
		loadGiscus();
	});
	window.swup.hooks.on("visit:end", (_visit: { to: { url: string } }) => {
		setTimeout(() => {
			const heightExtend = document.getElementById("page-height-extend");
			if (heightExtend) {
				heightExtend.classList.add("hidden");
			}

			const toc = document.getElementById("toc-wrapper");
			if (toc) {
				toc.classList.remove("toc-not-ready");
			}
		}, 200);
	});
};
if (window?.swup?.hooks) {
	setup();
} else {
	document.addEventListener("swup:enable", setup);
}

let backToTopBtn = document.getElementById("back-to-top-btn");
let goToCommentsBtn = document.getElementById("go-to-comments-btn");
let toc = document.getElementById("toc-wrapper");
let navbar = document.getElementById("navbar-wrapper");
function refreshControlRefs() {
	backToTopBtn = document.getElementById("back-to-top-btn");
	goToCommentsBtn = document.getElementById("go-to-comments-btn");
	toc = document.getElementById("toc-wrapper");
	navbar = document.getElementById("navbar-wrapper");
}
function scrollFunction() {
	refreshControlRefs();
	let bannerHeight = window.innerHeight * (BANNER_HEIGHT / 100);

	if (backToTopBtn) {
		if (document.body.scrollTop > bannerHeight || document.documentElement.scrollTop > bannerHeight) {
			backToTopBtn.classList.remove("hide");
		} else {
			backToTopBtn.classList.add("hide");
		}
	}

	if (goToCommentsBtn) {
		const commentsExist = !!document.getElementById("giscus-container");
		if (commentsExist) {
			goToCommentsBtn.classList.remove("hide");
		} else {
			goToCommentsBtn.classList.add("hide");
		}
	}

	if (bannerEnabled && toc) {
		if (document.body.scrollTop > bannerHeight || document.documentElement.scrollTop > bannerHeight) {
			toc.classList.remove("toc-hide");
		} else {
			toc.classList.add("toc-hide");
		}
	}

	if (!bannerEnabled) return;
	if (navbar) {
		const NAVBAR_HEIGHT = 72;
		const MAIN_PANEL_EXCESS_HEIGHT = MAIN_PANEL_OVERLAPS_BANNER_HEIGHT * 16;

		let bannerHeight = BANNER_HEIGHT;
		if (document.body.classList.contains("lg:is-home") && window.innerWidth >= 1024) {
			bannerHeight = BANNER_HEIGHT_HOME;
		}
		let threshold = window.innerHeight * (bannerHeight / 100) - NAVBAR_HEIGHT - MAIN_PANEL_EXCESS_HEIGHT - 16;
		if (document.body.scrollTop >= threshold || document.documentElement.scrollTop >= threshold) {
			navbar.classList.add("navbar-hidden");
		} else {
			navbar.classList.remove("navbar-hidden");
		}
	}
}
let scrollTicking = false;
window.onscroll = () => {
	if (!scrollTicking) {
		requestAnimationFrame(() => {
			scrollFunction();
			scrollTicking = false;
		});
		scrollTicking = true;
	}
};
if (document.readyState === "loading") {
	document.addEventListener("DOMContentLoaded", scrollFunction);
} else {
	scrollFunction();
}

window.onresize = () => {
	let offset = Math.floor(window.innerHeight * (BANNER_HEIGHT_EXTEND / 100));
	offset = offset - offset % 4;
	document.documentElement.style.setProperty("--banner-height-extend", `${offset}px`);
};
