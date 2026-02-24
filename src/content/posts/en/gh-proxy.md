---
title: "GitHub Reverse Proxy Setup Guide"
description: "Here’s a professional translation of the provided text:  **Comprehensive Guide to Setting Up a GitHub Full-Stack Proxy**  This guide details the complete process of establishing a GitHub full-stack proxy, including a thorough explanation of its underlying principles and various deployment strategies (Cloudflare Worker, EdgeOne Pages, Vercel, and VPS+Go)."
category: "Tutorial"
draft: false
image: ../../assets/images/8bb2d8ae-1703-44e8-9f3b-10b46ab69913.webp
lang: en
published: 2025-04-15
tags: [Github, 反向代理, Cloudflare Worker, EdgeOne, Vercel]
---
:::ai-summary[AI Summary]{model="google/gemma-3-1b"}

:::

# Introduction

Due to network issues, accessing GitHub in China frequently encounters various problems. This article will guide you through the principles and practical aspects of setting up a self-hosted reverse proxy for GitHub, allowing you to manage your repository from anywhere.

# Here’s a professional translation of “Why can’t we only use transparent proxies?”:  “The limitation of relying solely on transparent proxies is a significant concern due to potential security vulnerabilities and the difficulty in maintaining consistent performance.”

We cannot simply rely on a single, straightforward reverse proxy pointing to `github.com` to resolve this issue.

## External dependency issues

The GitHub website includes numerous external dependencies, such as `raw.githubusercontent.com` and `avatars.githubusercontent.com`. When only using the primary domain name, these requests will directly access the original site, resulting in loading failures.

## Risk of fishing presents several potential hazards and complications. These can range from environmental concerns to personal safety, impacting both the ecosystem and individual well-being. Careful planning, adherence to regulations, and responsible practices are crucial for mitigating these risks effectively.

Please be aware that directly mirroring popular websites can result in Cloudflare flagging your site as **Scam Site**, due to the fact that you are cloning a website without any explicit safeguards against unauthorized access.

# Solution: Transparent Proxy + HTML Overwrite

## Core concept

We need to implement two key functionalities:

1. Here’s the translation:  **Translation:**  “Transparent Proxy” will forward requests to the GitHub server.”
2. **HTML Remediation** : Rewrite the HTML returned by GitHub to incorporate our own domain.

## Request workflow comparison.

**原始流程：**
```
用户 -> github.com -> raw.githubusercontent.com（被github.com请求）
```

**代理流程：**
```
用户 -> gh.072103.xyz -> raw-githubusercontent-com.072103.xyz（被gh.072103.xyz请求）
```

The request for `gh.072103.xyz` was forwarded to `github.com`, and the corresponding requests were forwarded to `raw.githubusercontent.com`.

## Domain Mapping Configuration

You need to configure a similar domain mapping:

```js
const domain_mappings = {
  'github.com': 'gh.',
  'avatars.githubusercontent.com': 'avatars-githubusercontent-com.',
  'github.githubassets.com': 'github-githubassets-com.',
  'collector.github.com': 'collector-github-com.',
  'api.github.com': 'api-github-com.',
  'raw.githubusercontent.com': 'raw-githubusercontent-com.',
  'gist.githubusercontent.com': 'gist-githubusercontent-com.',
  'github.io': 'github-io.',
  'assets-cdn.github.com': 'assets-cdn-github-com.',
  'cdn.jsdelivr.net': 'cdn.jsdelivr-net.',
  'securitylab.github.com': 'securitylab-github-com.',
  'www.githubstatus.com': 'www-githubstatus-com.',
  'npmjs.com': 'npmjs-com.',
  'git-lfs.github.com': 'git-lfs-github-com.',
  'githubusercontent.com': 'githubusercontent-com.',
  'github.global.ssl.fastly.net': 'github-global-ssl-fastly-net.',
  'api.npms.io': 'api-npms-io.',
  'github.community': 'github-community.'
};
```

If your domain name is `abc.com`, you need to associate the following subdomains with your proxy service.

- `gh.abc.com`
- `avatars-githubusercontent-com.abc.com`
- `raw-githubusercontent-com.abc.com`
- ...等等

## Fishing countermeasures.

We need to identify and block all login pages on the original site for GitHub.com, specifically targeting those pages.

`/login` `/signup` `copilot`

You can direct traffic to the 404 error page or redirect it to another website. **Once your user cannot log in on your reverse domain, that is sufficient.**

---

# Deployment Plan

Here are four deployment strategies, ranked by difficulty from simplest to most complex:  1.  **Blue/Green Deployment:** A phased approach where a new version of the application is deployed to a staging environment, tested thoroughly, and then updated to the production environment. 2.  **Canary Deployment:** Releasing a new version to a small subset of users or servers to monitor its performance and stability before wider rollout. 3.  **Rolling Deployment:** Gradually deploying updates to all instances of the application simultaneously, minimizing downtime. 4.  **Big Bang Deployment:** Deploying the entire application at once to all environments.

## Option one: Vercel Function (the simplest)

Are you experiencing slow performance from your CF Workers? Consider implementing a Vercel Function instead!

### Here’s the translation of “” into professional English:  **Strengths**
- Deployment is straightforward and can be completed with a single click.
- Speed is fast.
- Seamless integration with GitHub is a key strength.

### Deployment Steps

1. Clone [afoim/VercelFunctionGithubProxy](https://github.com/afoim/VercelFunctionGithubProxy)

2. Deploy to Vercel

![](../../assets/images/2025-08-30-22-14-07-aa3b925d5e2e522cc0a0abccd87b5887.webp)

3. Link your own domain.

![](../../assets/images/2025-08-30-22-14-10-b79c2d588117ab15fc4a08efe359db4f.webp)

4. Based on your domain, modify the domain mapping and configure all subdomains to use it.

---

## Option Two: Cloudflare Worker (Recommended)

Tutorial Video: [https://www.bilibili.com/video/BV1jGd6YpE8z]

### Here’s the translation of “” into professional English:  **Strengths**
- Free.
- No server required.
- Global CDN acceleration.
- Deployment is straightforward.

### Deployment Steps

1. 进入 [dash.cloudflare.com](https://dash.cloudflare.com)

2. Create a new Worker, select the Hello World template.

3. Please visit [GitHub - afoim/GithubSiteProxyForCloudflareWorker] and copy the code from `worker.js` into your Worker.

4. Based on your domain, please modify the domain mapping and configuration.

5. Please associate all required subdomains with your Worker.

6. Please access `gh.yourdomain`.

### Please provide the complete code you would like me to translate. I need the text of the code to perform the translation.

See the GitHub repository: https://github.com/afoim/GithubSiteProxyForCloudflareWorker

---

## Option Three: EdgeOne Pages

Suitable for domestic users, with faster access speeds.

### Here’s the translation of “” into professional English:  **Strengths**
- Excellent internet connectivity is available.
- Unlimited credit allowance is available.
- Deployment is straightforward.

### Deployment Steps

#### Download source code.

Code: [afoim/EdgeOnePagesFunctionGithubProxy](https://github.com/afoim/EdgeOnePagesFunctionGithubProxy)

Download the following file: https://r2.072103.xyz/github-eopf.zip and extract it.

**Structure of the Directory**

![](../../assets/images/2025-08-30-20-43-29-image.webp)

#### Domain configuration modifications.

Open any JavaScript file and modify the domain mapping configuration. Please note that each JavaScript file will require modification!

#### Upload to EdgeOne Pages.

![](../../assets/images/2025-08-30-20-45-20-image.webp)

#### Here’s the translation:  **Binding Domain**

Based on the prefix, bind all required subdomains.

![](../../assets/images/2025-08-30-20-46-18-image.webp)

### What is the unique structure of the directory?

- The file is empty, as it does not exist in the HTML document. This results in a 404 error.
- The responsibility for managing the `/` routing service lies with `index.js`.
- The responsibility of routing this service lies with the team responsible for managing the `/*` routes.

---

## Option Four: VPS + Go (Most Flexible)

Suitable users who have VPS infrastructure and desire complete control over their deployment are recommended.

### Here’s the translation of “” into professional English:  **Strengths**
- Fully autonomous and self-governing.
- Reliance on third-party platforms is not required.
- Customization options are available.

### Deployment Steps

#### Install the Go runtime.

```bash
apt install golang
```

#### Create project directories.

Create a folder named `main.go`.

```go
package main

import (
	"fmt"
	"io"
	"log"
	"net/http"
	"net/url"
	"regexp"
	"strings"
	"time"
)

// 域名映射配置
var domainMappings = map[string]string{
	"github.com":                    "gh.",
	"avatars.githubusercontent.com": "avatars-githubusercontent-com.",
	"github.githubassets.com":       "github-githubassets-com.",
	"collector.github.com":          "collector-github-com.",
	"api.github.com":                "api-github-com.",
	"raw.githubusercontent.com":     "raw-githubusercontent-com.",
	"gist.githubusercontent.com":    "gist-githubusercontent-com.",
	"github.io":                     "github-io.",
	"assets-cdn.github.com":         "assets-cdn-github-com.",
	"cdn.jsdelivr.net":              "cdn.jsdelivr-net.",
	"securitylab.github.com":        "securitylab-github-com.",
	"www.githubstatus.com":          "www-githubstatus-com.",
	"npmjs.com":                     "npmjs-com.",
	"git-lfs.github.com":            "git-lfs-github-com.",
	"githubusercontent.com":         "githubusercontent-com.",
	"github.global.ssl.fastly.net":  "github-global-ssl-fastly-net.",
	"api.npms.io":                   "api-npms-io.",
	"github.community":              "github-community.",
}

// 需要重定向的路径
var redirectPaths = []string{"/", "/login", "/signup", "/copilot"}

// 检查路径是否需要重定向
func shouldRedirect(path string) bool {
	for _, p := range redirectPaths {
		if path == p {
			return true
		}
	}
	return false
}

// 获取代理前缀
func getProxyPrefix(host string) string {
	if strings.HasPrefix(host, "gh.") {
		return "gh."
	}

	for _, prefix := range domainMappings {
		if strings.HasPrefix(host, prefix) {
			return prefix
		}
	}

	return ""
}

// 根据前缀获取目标域名
func getTargetHost(prefix string) string {
	for original, p := range domainMappings {
		if p == prefix {
			return original
		}
	}
	return ""
}

// 处理响应内容，替换域名引用
func modifyResponse(body []byte, contentType, hostPrefix, currentHostname string) []byte {
	if !strings.Contains(contentType, "text/") &&
		!strings.Contains(contentType, "application/json") &&
		!strings.Contains(contentType, "application/javascript") &&
		!strings.Contains(contentType, "application/xml") {
		return body
	}

	text := string(body)
	domainSuffix := currentHostname[len(hostPrefix):]

	for originalDomain, proxyPrefix := range domainMappings {
		fullProxyDomain := proxyPrefix + domainSuffix
		text = strings.ReplaceAll(text, "https://"+originalDomain, "https://"+fullProxyDomain)
		text = strings.ReplaceAll(text, "http://"+originalDomain, "https://"+fullProxyDomain)
		text = strings.ReplaceAll(text, "//"+originalDomain, "//"+fullProxyDomain)
		text = strings.ReplaceAll(text, `"`+originalDomain+`"`, `"`+fullProxyDomain+`"`)
		text = strings.ReplaceAll(text, `'`+originalDomain+`'`, `'`+fullProxyDomain+`'`)
	}

	if hostPrefix == "gh." {
		text = strings.ReplaceAll(text, `"/`, `"https://`+currentHostname+`/`)
		text = strings.ReplaceAll(text, `'/`, `'https://`+currentHostname+`/`)
	}

	return []byte(text)
}

// 处理请求
func handleRequest(w http.ResponseWriter, r *http.Request) {
	currentHost := r.Host

	if shouldRedirect(r.URL.Path) {
		http.Redirect(w, r, "https://www.gov.cn", http.StatusFound)
		return
	}

	hostPrefix := getProxyPrefix(currentHost)
	if hostPrefix == "" {
		http.Error(w, "Domain not configured for proxy", http.StatusNotFound)
		return
	}

	targetHost := getTargetHost(hostPrefix)
	if targetHost == "" {
		http.Error(w, "Domain not configured for proxy", http.StatusNotFound)
		return
	}

	pathname := r.URL.Path

	re1 := regexp.MustCompile(`(/[^/]+/[^/]+/(?:latest-commit|tree-commit-info)/[^/]+)/https%3A//[^/]+.*`)
	pathname = re1.ReplaceAllString(pathname, "$1")

	re2 := regexp.MustCompile(`(/[^/]+/[^/]+/(?:latest-commit|tree-commit-info)/[^/]+)/https://[^/]+.*`)
	pathname = re2.ReplaceAllString(pathname, "$1")

	re3 := regexp.MustCompile(`(/[^/]+/[^/]+/(?:latest-commit|tree-commit-info)/[^/]+)/https:/[^/]+.*`)
	pathname = re3.ReplaceAllString(pathname, "$1")

	targetURL := &url.URL{
		Scheme:   "https",
		Host:     targetHost,
		Path:     pathname,
		RawQuery: r.URL.RawQuery,
	}

	req, err := http.NewRequest(r.Method, targetURL.String(), r.Body)
	if err != nil {
		http.Error(w, fmt.Sprintf("Failed to create request: %v", err), http.StatusInternalServerError)
		return
	}

	for key, values := range r.Header {
		for _, value := range values {
			req.Header.Add(key, value)
		}
	}

	req.Header.Set("Host", targetHost)
	req.Header.Set("Referer", targetURL.String())
	req.Header.Set("Accept-Encoding", "identity")

	client := &http.Client{
		Timeout: 30 * time.Second,
	}

	resp, err := client.Do(req)
	if err != nil {
		http.Error(w, fmt.Sprintf("Proxy Error: %v", err), http.StatusBadGateway)
		return
	}
	defer resp.Body.Close()

	body, err := io.ReadAll(resp.Body)
	if err != nil {
		http.Error(w, fmt.Sprintf("Failed to read response: %v", err), http.StatusInternalServerError)
		return
	}

	contentType := resp.Header.Get("Content-Type")
	modifiedBody := modifyResponse(body, contentType, hostPrefix, currentHost)

	for key, values := range resp.Header {
		if key == "Content-Encoding" || key == "Content-Length" {
			continue
		}
		for _, value := range values {
			w.Header().Add(key, value)
		}
	}

	w.Header().Set("Access-Control-Allow-Origin", "*")
	w.Header().Set("Access-Control-Allow-Credentials", "true")
	w.Header().Set("Cache-Control", "public, max-age=14400")
	w.Header().Del("Content-Security-Policy")
	w.Header().Del("Content-Security-Policy-Report-Only")
	w.Header().Del("Clear-Site-Data")
	w.Header().Set("Content-Length", fmt.Sprintf("%d", len(modifiedBody)))
	w.WriteHeader(resp.StatusCode)
	w.Write(modifiedBody)
}

func main() {
	http.HandleFunc("/", handleRequest)
	port := ":8080"
	log.Printf("GitHub代理服务器启动在端口 %s", port)
	log.Printf("请确保你的域名已正确配置并指向此服务器")

	if err := http.ListenAndServe(port, nil); err != nil {
		log.Fatal("服务器启动失败:", err)
	}
}
```

#### Create a go.mod file.

```go
module github-proxy

go 1.19
```

#### 4. 运行服务

```bash
go run .
```

Please provide the log you would like me to translate. I need the text of the log to perform the translation.

```bash
root@localhost:~/go_proxy# go run .
2025/06/20 23:13:17 GitHub代理服务器启动在端口 :8080
2025/06/20 23:13:17 请确保你的域名已正确配置并指向此服务器
```

#### Here’s the translation:  Configure Nginx as a reverse proxy to handle client requests and forward them to backend servers.

Using Nginx or OpenResty as reverse proxies with the domain format of `gh.yourdomain`, configure the proxy to listen on port 8080.

![](../../assets/images/123a521d-2340-4433-b9fe-4965d46d4321.webp)

#### Issued an SSL certificate.

Issue a wildcard domain certificate and deploy.

![](../../assets/images/b58b55fe-adbd-4d3e-8977-c3f7efaf0185.webp)

#### 7. 完成

Now you can access GitHub through your own domain and VPS, with direct connectivity within China, without requiring a ladder.

![](../../assets/images/fccbc8af-d2b1-479f-b32d-d0f023fd4c06.webp)

---

# Here’s the translation:  **Comparative Analysis**

| Plan | Cost | Domestic speed | Deployment difficulty | Customizability |
|------|------|----------|----------|----------|
| Vercel function | Free | General | Easiest | Medium |
| Cloudflare Worker | Free | General | Simple | Medium |
| EdgeOne Pages | Free | Excellent | Simple | Medium |
| VPS + Go | VPS fee | Dependent on VPS location | Complex | High |

# High-end configuration.

To modify a three-level domain (TLD), such as changing `gh.abc.com` to `github.abc.com`, simply update the value associated with the corresponding mapping configuration key.

You can add and remove redirect paths, defaulting to a mysterious website based on comments for modification.

This project is a universal reverse template, allowing for the reversal of content on other websites (requires significant code modifications).