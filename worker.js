export default {
	async fetch(request, env, ctx) {
		const url = new URL(request.url);

		// Proxy /api/tianyi/* → https://pan.xiegao.top/api/*
		if (url.pathname.startsWith("/api/tianyi/")) {
			const apiPath = url.pathname.replace("/api/tianyi/", "/api/");
			const target = `https://pan.xiegao.top${apiPath}${url.search}`;
			// /api/raw/ 用于下载文件：上游返回 307 重定向到 cloudcube 签名 URL
			// 浏览器 <a href> 导航请求会触发 Cloudflare Assets 静态资源匹配，
			// 未命中时直接返回 404-page，不会调用 worker。因此这里改成：
			// fetch 上游拿 307 的 Location，返回 JSON 给前端，前端再用 window.open
			// 直连 cloudcube 下载（绕过 xiegao.top 的 Assets 路由）
			if (apiPath.startsWith("/api/raw/")) {
				const upstream = await fetch(target, {
					method: "GET",
					redirect: "manual",
				});
				const location = upstream.headers.get("location");
				if (location) {
					return new Response(JSON.stringify({ downloadUrl: location }), {
						status: 200,
						headers: {
							"content-type": "application/json; charset=utf-8",
							"cache-control": "no-store",
						},
					});
				}
				return upstream;
			}
			return fetch(target, {
				method: request.method,
				headers: request.headers,
			});
		}

		// Proxy /api/onedrive/* → https://pan.xiegao.top/api/od/*
		if (url.pathname.startsWith("/api/onedrive/")) {
			const apiPath = url.pathname.replace("/api/onedrive/", "/api/od/");
			const target = `https://pan.xiegao.top${apiPath}${url.search}`;
			return fetch(target, {
				method: request.method,
				headers: request.headers,
			});
		}

		// Fall through to static assets
		return env.ASSETS.fetch(request);
	},
};
