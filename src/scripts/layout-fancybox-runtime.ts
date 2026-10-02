import { Fancybox, type FancyboxOptions } from "@fancyapps/ui";
import "@fancyapps/ui/dist/fancybox/fancybox.css";

// 注意：下面仍是 FancyBox v5 的选项名（wheel / clickContent / Panels / Images）。
// v6 已改为 Carousel.Zoomable（Panzoom.wheel 等）与 Carousel.Toolbar（display 分 left/middle/right 列），
// v6 运行时不认识这些旧键、会直接忽略，因此当前实际生效的是 v6 默认行为。
// 这里先按兼容形态保留（不改运行时行为），迁移到 v6 选项应另行确认交互效果。
const fancyboxOptions = {
	wheel: "zoom",
	clickContent: "close",
	dblclickContent: "zoom",
	click: "close",
	dblclick: "zoom",
	Panels: {
		display: ["counter", "zoom"],
	},
	Images: {
		panning: true,
		zoom: true,
		protect: false,
	},
} as unknown as Partial<FancyboxOptions>;

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
