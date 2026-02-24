---
title: "Guide to Setting Up a Reverse Proxy for GitHub"
description: "A Complete Guide to Setting Up a Full-Site Proxy for GitHub, Covering Principles and Multiple Deployment Options (Cloudflare Worker, EdgeOne Pages, Vercel, VPS + Go)"
category: "Tutorial"
draft: false
image: ../../assets/images/8bb2d8ae-1703-44e8-9f3b-10b46ab69913.webp
lang: en
published: 2025-04-15
tags: [Github, 反向代理, Cloudflare Worker, EdgeOne, Vercel]
---
:::ai-summary[AI Summary]{model="qwen/qwen3-vl-8b"}
This article explains how to build a personal GitHub proxy using transparent proxying and HTML rewriting to bypass access restrictions. It highlights the need to handle external domain dependencies and avoid phishing risks by rewriting login pages. Four deployment methods are presented, ranging from Vercel Functions (simplest) to Cloudflare Workers (recommended), EdgeOne Pages (optimized for China), and VPS + Go (most flexible).
:::

# Introduction

Due to network issues, accessing GitHub domestically often encounters various problems. This article will guide you from principles to practice, helping you set up your own full-site reverse proxy for GitHub.

# Why can't we just use transparent proxies?

For websites like GitHub, we cannot simply use a transparent reverse proxy pointing to `github.com` to solve the issue, for two reasons:

## 1. External Dependency Issues

The GitHub official website has many external domain dependencies, such as `raw.githubusercontent.com`, `avatars.githubusercontent.com`, etc. If only the main domain is proxied, these resource requests will directly access the original site, causing loading failures.

## 2. Fishing Risks

Note! After directly proxying mainstream websites, your site will soon be flagged by Cloudflare as **phishing site**, because you have cloned their site exactly as-is and **did not explicitly block the login page**.

# Solution: Transparent proxy + HTML rewriting

## Core idea

We need to implement two key functions:

1. **Transparent Proxy**: Forward the request to the GitHub server
2. **HTML Overwrite**: Rewrite the HTML returned by GitHub, changing any external domains to our own domain

## Request Process Comparison

**Original Process:**
```
用户 -> github.com -> raw.githubusercontent.com（被github.com请求）
```

**Agent Process:**
```
用户 -> gh.072103.xyz -> raw-githubusercontent-com.072103.xyz（被gh.072103.xyz请求）
```

Requests for `gh.072103.xyz` are forwarded by the proxy service to `github.com`, while requests for `raw-githubusercontent-com.072103.xyz` are forwarded to `raw.githubusercontent.com`.

## Domain Mapping Configuration

You need to configure domain mappings similar to this:

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

If your domain is `abc.com`, you need to bind the following subdomains to your proxy service:

- `gh.abc.com`
- `avatars-githubusercontent-com.abc.com`
- `raw-githubusercontent-com.abc.com`
- ...etc.

## Anti-phishing measures

We need to find all login pages of the original site and block them one by one. For github.com, we need to block:

`/` `/login` `/signup` `copilot`

You can redirect it directly to a 404 page, or redirect it to another site, **as long as it doesn't allow your users to log in on your reverse proxy site**.

---

# Deployment Plan

The following introduces four deployment options, sorted from simplest to most complex:

## Option 1: Vercel Function (Simplest)

> Disappointed with CF Worker's speed? Try Vercel Function!

### Advantages
- The simplest deployment, completed with one click.
- Fast speed
- Integrates well with GitHub

### Deployment Steps

1. Clone [afoim/VercelFunctionGithubProxy](https://github.com/afoim/VercelFunctionGithubProxy)

2. Deploy to Vercel

![](../../assets/images/2025-08-30-22-14-07-aa3b925d5e2e522cc0a0abccd87b5887.webp)

3. Bind your own domain

![](../../assets/images/2025-08-30-22-14-10-b79c2d588117ab15fc4a08efe359db4f.webp)

4. Modify the domain mapping configuration based on your domain, and bind all subdomains to use them.

---

## Option Two: Cloudflare Worker (Recommended)

> Tutorial video: https://www.bilibili.com/video/BV1jGd6YpE8z

### Advantages
- Free
- No server required
- Global CDN Acceleration
- Easy to deploy

### Deployment Steps

1. Enter [dash.cloudflare.com](https://dash.cloudflare.com)

2. Create a new Worker and select the Hello World template

3. Go to [GitHub - afoim/GithubSiteProxyForCloudflareWorker](https://github.com/afoim/GithubSiteProxyForCloudflareWorker) and copy the `worker.js` code, then paste it into your Worker

4. Modify the domain mapping configuration based on your domain name.

5. Bind all required subdomains to your Worker

6. Visit `gh.yourdomain` to use it

### Complete code

See the GitHub repository: https://github.com/afoim/GithubSiteProxyForCloudflareWorker

---

## Option Three: EdgeOne Pages

> Suitable for domestic users, with faster access speed

### Advantages
- Excellent domestic access speed
- Sufficient free quota
- Deployment is relatively simple.

### Deployment Steps

#### 1. Download the source code

> Source code: [afoim/EdgeOnePagesFunctionGithubProxy](https://github.com/afoim/EdgeOnePagesFunctionGithubProxy)

Download https://r2.072103.xyz/github-eopf.zip and extract it

Directory structure:

![](../../assets/images/2025-08-30-20-43-29-image.webp)

#### 2. Modify domain configuration

Open any JS file and modify the domain mapping configuration. Note: The content of each JS file needs to be modified!

#### 3. Upload to EdgeOne Pages

![](../../assets/images/2025-08-30-20-45-20-image.webp)

#### 4. Bind Domain Name

Bind all required subdomains using prefix matching:

![](../../assets/images/2025-08-30-20-46-18-image.webp)

### Why is the directory structure so special?

- **[[C:index.html**：Empty HTML file, as it would return a 404 error if left blank
- **`index.js**：Responsible for routing [[C:/`
- **`[[default.js**：Responsible for [[C:/*` routing

---

## Option 4: VPS + Go (Most Flexible)

> Suitable for users with a VPS who wish to have full control; deployment is relatively complex.

### Advantages
- Fully independent and controllable
- Not dependent on third-party platforms
- More features can be customized.

### Deployment Steps

#### 1. Install the Golang runtime

```bash
apt install golang
```

#### 2. Create the project directory

Create a folder to place `main.go`:

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

#### 3. Create go.mod

```go
module github-proxy

go 1.19
```

#### 4. Run the service

```bash
go run .
```

Output the following log indicates success:

```bash
root@localhost:~/go_proxy# go run .
2025/06/20 23:13:17 GitHub代理服务器启动在端口 :8080
2025/06/20 23:13:17 请确保你的域名已正确配置并指向此服务器
```

#### 5. Configure Nginx Reverse Proxy

Use Nginx or OpenResty as a reverse proxy for `localhost:8080`, configure the domain format as `gh.yourdomain`:

![](../../assets/images/123a521d-2340-4433-b9fe-4965d46d4321.webp)

#### 6. Issue SSL Certificate

Issue a wildcard certificate and deploy:

![](../../assets/images/b58b55fe-adbd-4d3e-8977-c3f7efaf0185.webp)

#### 7. Completed

Now you can access GitHub via your own domain + VPS proxy, with direct connection from within China, no proxy needed:

![](../../assets/images/fccbc8af-d2b1-479f-b32d-d0f023fd4c06.webp)

---

# Scheme Comparison

| Solution | Cost | Domestic speed | Deployment Difficulty | Customizability |
|------|------|----------|----------|----------|
| Vercel Function | Free | General | The simplest | Medium |
| Cloudflare Worker | Free | General | Simple | Medium |
| EdgeOne Pages | Free | Excellent | Simple | Medium |
| VPS + Go | VPS Cost | Depends on VPS location | Complex | High |

# Advanced Configuration

If you want to modify the third-level domain, such as changing `gh.abc.com` to `github.abc.com`, simply update the value of the corresponding key in the domain mapping configuration.

You can add and remove paths to be redirected; by default, it redirects to a mysterious website, modify it as needed according to the comments.

This project is also a general full-site reverse proxy template that can proxy other websites (note: significant code modifications are required).