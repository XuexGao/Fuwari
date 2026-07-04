export default {
	async fetch(request, env, ctx) {
		const url = new URL(request.url);

		// Proxy /api/tianyi/* → https://tianyi.xiegao.top/api/*
		if (url.pathname.startsWith("/api/tianyi/")) {
			const apiPath = url.pathname.replace("/api/tianyi/", "/api/");
			const target = `https://tianyi.xiegao.top${apiPath}${url.search}`;
			// /api/raw/ 用于下载文件，上游返回 307 重定向到 cloudcube 签名 URL
			// 用 manual 不跟随重定向，把 307 透传给浏览器，让其直连 cloudcube 下载大文件
			const isRawDownload = apiPath.startsWith("/api/raw/");
			return fetch(target, {
				method: request.method,
				headers: request.headers,
				redirect: isRawDownload ? "manual" : "follow",
			});
		}

		// Proxy /api/onedrive/* → https://tianyi.xiegao.top/api/od/*
		if (url.pathname.startsWith("/api/onedrive/")) {
			const apiPath = url.pathname.replace("/api/onedrive/", "/api/od/");
			const target = `https://tianyi.xiegao.top${apiPath}${url.search}`;
			return fetch(target, {
				method: request.method,
				headers: request.headers,
			});
		}

		// Fall through to static assets
		return env.ASSETS.fetch(request);
	},
};
