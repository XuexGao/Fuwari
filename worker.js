export default {
	async fetch(request, env, ctx) {
		const url = new URL(request.url);

		// 给响应加上 no-store 头，防止 Cloudflare 缓存 API 代理响应
		// 避免旧的 404 响应被缓存后，worker.js 修复了仍然返回旧 404
		const withNoStore = (resp) => {
			const r = new Response(resp.body, resp);
			r.headers.set("Cache-Control", "no-store, no-cache, must-revalidate, max-age=0");
			r.headers.set("Pragma", "no-cache");
			return r;
		};

		// Proxy /api/tianyi/* → https://tianyi.xiegao.top/api/*
		if (url.pathname.startsWith("/api/tianyi/")) {
			const apiPath = url.pathname.replace("/api/tianyi/", "/api/");
			const target = `https://tianyi.xiegao.top${apiPath}${url.search}`;
			// /api/raw/ 用于下载文件，上游会返回 307 重定向到 cloudcube 签名 URL
			// 用 manual 不跟随重定向，把 307 透传给浏览器，让其直连 cloudcube 下载
			// 避免 worker 代理大文件时流量/时长受限，导致大文件下载失败 fallback 到静态资源返回 404
			const isRawDownload = apiPath.startsWith("/api/raw/");
			const upstream = await fetch(target, {
				method: request.method,
				headers: request.headers,
				redirect: isRawDownload ? "manual" : "follow",
			});
			return withNoStore(upstream);
		}

		// Proxy /api/onedrive/* → https://tianyi.xiegao.top/api/od/*
		if (url.pathname.startsWith("/api/onedrive/")) {
			const apiPath = url.pathname.replace("/api/onedrive/", "/api/od/");
			const target = `https://tianyi.xiegao.top${apiPath}${url.search}`;
			const upstream = await fetch(target, {
				method: request.method,
				headers: request.headers,
			});
			return withNoStore(upstream);
		}

		// Fall through to static assets
		return env.ASSETS.fetch(request);
	},
};
