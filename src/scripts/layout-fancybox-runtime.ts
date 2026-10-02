import { Fancybox, PanzoomAction, type FancyboxOptions } from "@fancyapps/ui";
import "@fancyapps/ui/dist/fancybox/fancybox.css";

// FancyBox v6 选项：v5 的 wheel / clickContent / dblclickContent / Panels / Images
// 在 v6 已改名到 Carousel.Zoomable(Panzoom) 与 Carousel.Toolbar，旧键会被运行时静默忽略。
// 这里按原配置的意图迁移：
// - wheel: "zoom"                → Panzoom.wheelAction（v6 默认即 zoom，显式写出）
// - dblclick: "zoom"             → Panzoom.dblClickAction（v6 默认关闭，按原意开启）
// - Panels.display: [counter, zoom] → Toolbar.display，缩放按钮放 middle 列
//   （FancyBox 自带的 display 默认值会覆盖 Toolbar 插件默认的 middle 缩放按钮，必须显式列出）
// - click: "close"               → v6 无对应动作（单击默认为 ToggleFull 铺满），保持默认
// - Images.protect               → v6 无对应项，去掉
const fancyboxOptions: Partial<FancyboxOptions> = {
	Carousel: {
		Zoomable: {
			Panzoom: {
				wheelAction: PanzoomAction.Zoom,
				dblClickAction: PanzoomAction.Zoom,
			},
		},
		Toolbar: {
			display: {
				left: ["counter"],
				middle: ["zoomIn", "zoomOut"],
				right: ["toggleFull", "fullscreen", "thumbs", "close"],
			},
		},
	},
};

Fancybox.bind(".custom-md img, #post-cover img", fancyboxOptions);

const setup = () => {
	const cleanupFancybox = () => {
		try {
			Fancybox.close();
		} catch {}
		document
			.querySelectorAll(".fancybox__container")
			.forEach((el) => el.remove());
		document.documentElement.style.removeProperty("overflow");
		document.body.style.removeProperty("overflow");
	};
	const restoreNativeScrollIfSafe = () => {
		const hasFancybox = !!document.querySelector(".fancybox__container");
		const hasCookieModal = !!document.querySelector(
			".cc_overlay, .cc_modal, .cc_preferences, .cc_dialog, .cc_cp, .cc_nb, .cc_banner",
		);
		if (hasFancybox || hasCookieModal) return;
		document.documentElement.style.removeProperty("overflow");
		document.body.style.removeProperty("overflow");
	};

	window.swup.hooks.on("page:view", () => {
		Fancybox.bind(".custom-md img, #post-cover img", fancyboxOptions);
	});

	window.swup.hooks.on(
		"content:replace",
		() => {
			cleanupFancybox();
			Fancybox.unbind(".custom-md img, #post-cover img");
		},
		{ before: true },
	);

	window.swup.hooks.on(
		"visit:start",
		() => {
			cleanupFancybox();
		},
		{ before: true },
	);

	window.addEventListener("keydown", (e) => {
		if (e.key !== "Escape") return;
		setTimeout(restoreNativeScrollIfSafe, 0);
	});
	document.addEventListener(
		"click",
		() => {
			setTimeout(restoreNativeScrollIfSafe, 0);
		},
		true,
	);
};

const initSwup = () => {
	if (window.swup && !window.swup.initialized) {
		window.swup.init();
	}
};

if (document.readyState !== "loading") {
	initSwup();
} else {
	document.addEventListener("DOMContentLoaded", initSwup);
}

if (window.swup) {
	setup();
} else {
	document.addEventListener("swup:enable", setup);
}
