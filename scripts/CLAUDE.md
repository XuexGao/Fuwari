[根目录](../CLAUDE.md) > **scripts**

# scripts 模块说明

## 模块职责
`scripts` 提供站点维护自动化能力，覆盖内容生成、资源清理、链接检查、摘要生成、路径替换等离线任务。

## 入口与启动
常用脚本（由 `package.json scripts` 触发）：
- `scripts/new-post.js`：新建文章模板
- `scripts/clean-unused-images.js`：扫描并删除未引用图片
- `scripts/cdnify-images.js`：批量将本地图片路径替换为 CDN 并在满足条件后删除本地 assets
- `scripts/generate-ai-summary.js`：为文章生成 AI 摘要块
- `scripts/check-links.js`：友链/头像/回链可达性检查（含删除逻辑）

## 对外接口
- 命令行接口（CLI）
  - 通过 `pnpm <script-name>` 或 `node scripts/*.js` 执行
- 与内容模块的接口
  - 读取/改写 `src/content/posts`
  - 读取 `src/data/friends`

## 关键依赖与配置
- 共享工具：
  - `scripts/utils/content-files.js`（内容路径与 glob 聚合）
  - `scripts/utils/site-url.js`（站点 URL 解析）
  - `scripts/link-utils.js`（链接检查辅助）
- 外部依赖：`glob`、`dotenv`、`@google/genai` 等。

## 数据模型
- 以文件系统为核心数据面：Markdown、JSON、图片资源。
- 典型任务模型：扫描 -> 识别 -> 变更（写入/删除）-> 输出统计。

## 测试与质量
- 未发现测试目录；当前主要依赖脚本内保护逻辑（例如“扫描为空则中止删除”）。
- 建议为高风险脚本增加：
  - `--dry-run` 模式
  - fixture 回归样本
  - CI 下最小化改动检测

## 常见问题 (FAQ)
- Q: 哪些脚本风险最高？
  A: `clean-unused-images.js`、`cdnify-images.js`、`check-links.js`（均包含删除或批量改写）。

- Q: 如何降低误删风险？
  A: 先跑只读扫描、确认输出统计，再执行写入/删除操作，并使用 Git 快速回滚。

## 相关文件清单
- `scripts/new-post.js`
- `scripts/clean-unused-images.js`
- `scripts/cdnify-images.js`
- `scripts/check-links.js`
- `scripts/generate-ai-summary.js`
- `scripts/utils/content-files.js`
- `scripts/utils/site-url.js`

## 变更记录 (Changelog)
- 2026-03-06 11:22:44：初始化模块文档，梳理脚本入口、风险点与质量建议。
