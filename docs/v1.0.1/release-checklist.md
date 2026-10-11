# V1.0.1 发布验收清单

## 品牌图标

- [ ] GitGalaxy favicon 替换 Vite 默认图标。
- [ ] 本地和 GitHub Pages 构建均正确加载 favicon。
- [ ] Chrome、Firefox、Safari/WebKit 标签页显示正常。

## 星图密度

- [ ] 100、1,000、5,000 条数据均使用与数量匹配的三维空间缩放。
- [ ] 序列化坐标稳定；缩放仅发生在渲染层。
- [ ] 相机重置、选中、聚焦、悬停和搜索定位正确。
- [ ] 5,000 条数据不发生可见裁剪或交互回归。

## 语言图例

- [ ] 图例从实际 Universe 数据动态生成。
- [ ] 所有主要语言均能在展开图例中找到，颜色与星体一致。
- [ ] 无主要语言项目显示为 Other。
- [ ] 移动端图例默认收起且不遮挡核心操作。

## 发布

- [ ] `pnpm test`、`pnpm collect:test`、`pnpm lint`、`pnpm build` 和 `pnpm test:e2e` 通过。
- [ ] CI 与 GitHub Pages 部署通过。
- [ ] README 更新记录与 `release-notes.md` 已更新。
- [ ] 创建并发布 `v1.0.1` GitHub Release。
