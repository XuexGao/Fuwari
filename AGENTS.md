# Project Guidelines

## Code Style

- 技术栈：Astro + TypeScript + Svelte，脚本层为 Node.js（`src/**`、`scripts/*.js`）。
- 格式与 lint 以 `biome.json` 为准：tab 缩进、JS 双引号、启用 import 整理。
- `pnpm format`、`pnpm lint` 当前仅作用于 `src`（见 `package.json`），修改 `scripts` 时保持现有风格。
- TypeScript 严格基线来自 `tsconfig.json`（`extends: astro/tsconfigs/strict`）。

## Architecture

- 站点核心配置集中在 `src/config.ts`，导航/站点信息/统计配置优先在此维护。
- 内容 schema 在 `src/content/config.ts`，主要集合为 `posts` 与 `spec`。
- 页面入口：列表分页 `src/pages/[...page].astro`；文章详情 `src/pages/posts/[...slug].astro`。
- 内容排序与草稿过滤在 `src/utils/content-utils.ts`（生产环境过滤 `draft`）。
- Markdown 管线在 `astro.config.mjs`（remark/rehype + `src/plugins/*`）。

## Build and Test

- 安装依赖：`pnpm install`
- 本地开发：`pnpm dev`
- 构建与预览：`pnpm build`、`pnpm preview`
- 类型检查：`pnpm type-check`
- 规范检查：`pnpm format`、`pnpm lint`
- 仓库当前未定义 `test` 脚本；未发现标准 `*.test.*` / `*.spec.*` 测试体系。

## Project Conventions

- 提交信息必须使用简体中文。
- 发布新文章时，提交信息必须严格为：`posts:发布新文章《XXX》。XXXXX。`
- 每次代码更改完成后，必须立即创建一次本地 Git 提交，禁止把多次无关改动合并。
- 非必要不要运行 `pnpm lint`；优先使用定向检查，避免批量自动修复污染工作区。可以使用 `pnpm type-check` 检查类型错误。
- 文章元数据遵循 `src/content/config.ts` 的 schema；不要绕过 schema 添加字段。
- 涉及文章历史展示时，优先复用 `scripts/update-diff.js` + `src/json/git-history.json` 现有链路。

## 近期排障感想

- 当前工程以 Svelte 传统语法为主（`export let` + `$:`）；在未统一升级编译链前，不要混入 rune 语法（如 `$state`、`$derived`、`$props`、`<svelte:options runes>`）。
- Svelte 模板表达式中避免写 TypeScript 断言（`as ...`）；事件值提取应放在 `<script lang="ts">` 的函数里处理。
- `@iconify/svelte` 建议统一按包名导入，并通过 `astro.config.mjs` 的 Vite `resolve.alias` 精确映射到 `dist/Icon.svelte`，避免 `exports` 条件解析报错。
- 看到 Astro `UnhandledRejection` 时，先定位其下方第一条构建错误；该提示通常是上游解析失败后的包装错误。

## Integration Points

- 站点统计配置在 `src/config.ts`（Umami）。
- 文章页集成 Giscus（`src/pages/posts/[...slug].astro`）。
- 全局布局引入外部脚本（如 GTM/广告/同意管理），入口在 `src/layouts/Layout.astro`。
- 内容维护脚本会直接读写 `src/content/posts` 与 `src/content/assets`（见 `scripts/*.js`）。

## Security

- 高风险脚本：`scripts/cdnify-images.js`、`scripts/clean-unused-images.js`、`scripts/check-links.js`（包含批量改写或删除）。
- 执行写回/删除类脚本前，先确认扫描结果并确保可回滚。
- `scripts/generate-ai-summary.js` 依赖 `GEMINI_API_KEY`，使用环境变量，不要硬编码密钥。
- 推送远端前必须启用系统代理（`127.0.0.1:10808`）。

## 长线任务执行规范（工程版）

- 适用场景：长线重构 / 审计 / 回归类任务，目标是可回滚、可验证、可持续迭代。
- 推荐循环：审计 -> 小步重构 -> 验证 -> 本地提交锚定 -> 下一轮迭代。
- 核心审计范围：`src` 结构复用、CSS/Tailwind 冲突、`scripts` 复用、`.github/workflows` 安全与权限。
- 每轮只做一类改动，避免混改；默认不改变对外行为，如有行为变化需在报告中明确。
- 高风险改动前先创建本地锚点提交；失败后优先 `git revert` 或回到最近稳定提交重做。
- 每轮至少执行与改动匹配的验证（`pnpm build` / `pnpm type-check` / 页面回归）。
- 质量门槛：`pnpm build` 通过、关键页面可访问、每轮可独立回滚、最终报告包含问题清单与残留风险。

## 工作流与发布基线

- Workflow 权限遵循最小权限原则：默认 `read`，按需提升。
- 高权限事件避免暴露长期凭据，优先使用内置 `GITHUB_TOKEN`。
- 外部网络请求需设置超时与失败兜底，避免无界等待。
- 自动化流程建议配置并发与超时策略，防止资源占用失控。

## 参考命令

```powershell
git commit -m "feat: 使用简体中文提交信息"
```

```powershell
$env:HTTP_PROXY="http://127.0.0.1:10808"
$env:HTTPS_PROXY="http://127.0.0.1:10808"
$env:ALL_PROXY="socks5://127.0.0.1:10808"
git push origin main
```
