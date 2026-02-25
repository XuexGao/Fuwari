# 贡献指南

感谢你对本项目的兴趣！我们欢迎任何形式的贡献，包括但不限于报告问题、提交功能请求、完善文档和提交代码。

## 问题反馈 (Issue)

提交问题时，请选择合适的模板：

- [🐛 问题报告](https://github.com/afoim/fuwari/issues/new?template=1-bug_report.yml) - 报告网站或代码中的问题
- [🚀 功能请求](https://github.com/afoim/fuwari/issues/new?template=2-feature_request.yml) - 提出改进网站的想法

---

## 提交拉取请求 (Pull Request)

如果你想修复 Bug、添加功能或改进代码，欢迎提交 PR！

需要填写：
- 1. 遇到了什么问题？
- 2. 预期工作的形式？
- 3. 解决该问题的方案
- 4. 是否与当前上游冲突？

---

## 开发环境设置

```bash
# 克隆仓库
git clone https://github.com/afoim/fuwari.git
cd fuwari

# 安装依赖
pnpm install

# 启动开发服务器
pnpm dev
```

## 代码规范

- 使用 Biome 进行代码格式化：`pnpm format`
- 使用 Biome 进行代码检查：`pnpm lint`

## 提交信息规范

请使用清晰描述性的提交信息：
- `feat: 添加新功能`
- `fix: 修复问题`
- `docs: 更新文档`
- `style: 代码格式调整`
- `refactor: 代码重构`

---

再次感谢你的贡献！
