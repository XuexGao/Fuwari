[根目录](../../CLAUDE.md) > [src](../CLAUDE.md) > **content**

# src/content 模块说明

## 模块职责
`src/content` 是内容域中心，负责文章与公告等内容资产的组织、前置元数据校验、素材资源管理与内容驱动页面的数据来源。

## 入口与启动
- 集合定义入口：`src/content/config.ts`
- 文章目录：`src/content/posts/*.md`
- 公告目录：`src/content/spec/**/*.md`
- 素材目录：`src/content/assets/images/*`

## 对外接口
- 通过 Astro Content Collections 对外提供：
  - `posts` 集合（文章元数据 + 正文）
  - `spec` 集合（站点公告类内容）
- 被页面层消费路径：
  - 首页分页与文章页（经 `getCollection("posts")`）
  - 公告/辅助展示（spec）

## 关键依赖与配置
- schema 由 Zod 定义，关键字段包括：
  - `title`, `published`, `updated`, `draft`, `description`, `image`, `tags`, `pinned`, `ai_level`
- 日期字段通过 `parsePostDateToDate` 做预处理。

## 数据模型
- `posts`：内容主体模型，带发布状态与 SEO/展示字段。
- `spec`：轻量配置型内容模型（`enable`, `level`）。
- 附属数据：大量图片素材与 Markdown 内相对路径引用。

## 测试与质量
- 未发现专用内容测试。
- 现有质量方式：
  - schema 解析阶段拦截不符合规则的 frontmatter；
  - 脚本层做图片引用清理与路径替换。

## 常见问题 (FAQ)
- Q: 为什么图片有相对路径与 CDN 路径两种形态？
  A: 仓库同时提供本地素材与可选 CDN 替换脚本，便于不同部署策略。

- Q: 内容量大时如何安全处理资源清理？
  A: 先用扫描结果验证引用关系，再执行删除类脚本，并保留可回滚版本。

## 相关文件清单
- `src/content/config.ts`
- `src/content/posts/*.md`
- `src/content/spec/announcement.md`
- `src/content/assets/images/*`
- `scripts/clean-unused-images.js`（跨模块依赖）
- `scripts/cdnify-images.js`（跨模块依赖）

## 变更记录 (Changelog)
- 2026-03-06 11:22:44：初始化模块文档，记录集合模型、数据结构与资源治理关系。
