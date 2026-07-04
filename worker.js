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
			const upstream = await fetch(target, {
				method: request.method,
				headers: request.headers,
				redirect: isRawDownload ? "manual" : "follow",
			});
			// 复制响应并加上 no-store 头，防止 Cloudflare 缓存 API 响应
			const resp = new Response(upstream.body, {
				status: upstream.status,
				statusText: upstream.statusText,
				headers: upstream.headers,
			});
			resp.headers.set("Cache-Control", "no-store, no-cache, must-revalidate, max-age=0");
			return resp;
		}

		// Proxy /api/onedrive/* → https://tianyi.xiegao.top/api/od/*
		if (url.pathname.startsWith("/api/onedrive/")) {
			const apiPath = url.pathname.replace("/api/onedrive/", "/api/od/");
			const target = `https://tianyi.xiegao.top${apiPath}${url.search}`;
			const upstream = await fetch(target, {
				method: request.method,
				headers: request.headers,
			});
			const resp = new Response(upstream.body, {
				status: upstream.status,
				statusText: upstream.statusText,
				headers: upstream.headers,
			});
			resp.headers.set("Cache-Control", "no-store, no-cache, must-revalidate, max-age=0");
			return resp;
		}

		// Fall through to static assets
		return env.ASSETS.fetch(request);
	},
};
