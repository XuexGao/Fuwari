export default {
	async fetch(request, env, ctx) {
		const url = new URL(request.url);

		// Proxy /api/tianyi/* → https://tianyi.xiegao.top/api/*
		if (url.pathname.startsWith("/api/tianyi/")) {
			const apiPath = url.pathname.replace("/api/tianyi/", "/api/");
			const target = `https://tianyi.xiegao.top${apiPath}${url.search}`;
			return fetch(target, {
				method: request.method,
				headers: request.headers,
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
