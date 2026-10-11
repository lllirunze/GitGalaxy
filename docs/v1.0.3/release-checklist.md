# V1.0.3 发布验收清单

## 页面语言

- [ ] 支持英语与简体中文，默认语言与回退规则符合规划。
- [ ] 手动语言切换可见、可键盘操作，并在刷新后保留。
- [ ] 所有产品自有 UI、提示和无障碍标签均无硬编码遗漏。
- [ ] Repository 原始名称、描述、topics 与语言字段未被翻译或改写。
- [ ] 数字、日期和相对时间按所选语言正确显示。
- [ ] 桌面与移动端在两种语言下均无截断、溢出或核心操作遮挡。

## 文档语言

- [ ] `README.md` 与 `README.zh-CN.md` 章节、版本信息和链接一致且可互相跳转。
- [ ] `docs/README.md` 与 `docs/README.en.md` 可互相跳转。
- [ ] V1.0.0 至 V1.0.3 的计划、清单和发布说明均有中英文副本。
- [ ] `CONTRIBUTING.md` 与 Issue/PR 模板已提供双语入口或双语正文。
- [ ] 所有 Markdown 内部链接有效，图片与 GitHub Pages 链接正确。

## 验证与发布

- [ ] 翻译键完整性、语言状态和格式化单元测试通过。
- [ ] Chromium、Firefox、WebKit 的语言切换端到端测试通过。
- [ ] `pnpm test`、`pnpm collect:test`、`pnpm lint`、`pnpm build` 和 `pnpm test:e2e` 通过。
- [ ] CI 与 GitHub Pages 部署通过。
- [ ] README 更新记录与 `release-notes.md` 已更新。
- [ ] 创建并发布 `v1.0.3` GitHub Release。
