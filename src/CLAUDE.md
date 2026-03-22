[根目录](../CLAUDE.md) > **src**

# src 模块说明

## 模块职责
`src` 负责站点主应用逻辑：页面路由、布局与组件编排、内容渲染插件、URL/日期等工具函数，以及站点级配置读取。

## 入口与启动
- 页面入口：`src/pages/[...page].astro`（分页、排序与首页列表主入口）
- 文章入口：`src/pages/posts/[...slug].astro`
- 站点路由辅助：`src/pages/rss.xml.ts`、`src/pages/sitemap.xml.ts`、`src/pages/robots.txt.ts`
- 布局骨架：`src/layouts/MainGridLayout.astro`

## 对外接口
- Web 页面路由：
  - `/`（分页首页）
  - `/archive/`, `/friends/`, `/gallery/`, `/sponsors/`, `/cover/`, `/files/`
  - `/posts/*`
- 机器可读输出：
  - `/rss.xml`
  - `/sitemap.xml`
  - `/robots.txt`

## 关键依赖与配置
- 关键配置：
  - `src/config.ts`（站点信息、导航、profile、统计、许可证）
  - `astro.config.mjs`（集成、Markdown 管道、重定向、Vite 配置）
- 主要技术：Astro + Svelte + Tailwind + rehype/remark 插件链。

## 数据模型
- 页面主要依赖 `astro:content` 的 `posts` 集合数据。
- `src/utils/content-utils.ts` 提供文章排序与前后篇关联写入逻辑。

## 测试与质量
- 未发现专门测试目录或测试文件。
- 质量保障主要依赖：
  - TypeScript 严格模式；
  - Biome 格式与 lint；
  - 构建时内容校验。

## 常见问题 (FAQ)
- Q: 为什么首页是 `[...page].astro` 而不是单一 `index`？
  A: 通过 `paginate` 与排序参数统一处理分页与排序路由。

- Q: RSS 中图片如何处理？
  A: `rss.xml.ts` 会解析 markdown 内容并尝试将相对图片地址转换为可访问绝对地址。

## 相关文件清单
- `src/pages/[...page].astro`
- `src/pages/posts/[...slug].astro`
- `src/pages/rss.xml.ts`
- `src/pages/sitemap.xml.ts`
- `src/pages/robots.txt.ts`
- `src/layouts/MainGridLayout.astro`
- `src/components/PostPage.astro`
- `src/utils/content-utils.ts`
- `src/config.ts`

## 变更记录 (Changelog)
- 2026-03-06 11:22:44：初始化模块文档，补充入口、接口、配置与质量现状。
