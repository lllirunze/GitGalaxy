# V1.0.2 发布验收清单

## 首屏渲染

- [ ] 首次访问直接渲染真实数据对应的星体颜色。
- [ ] 缓存清空、普通刷新、硬刷新及慢速网络场景均无颜色闪烁或缺色。
- [ ] Chrome、Firefox、Safari/WebKit 与 GitHub Pages 路径均通过检查。

## Collector 调度

- [ ] 查询任务由受限 worker pool 调度，限流器全局共享。
- [ ] 响应头驱动限流、403/429 暂停和退避行为已测试。
- [ ] 并行响应统一进入按 Repository ID 聚合的候选池。
- [ ] 乱序、重叠和重试场景下输出无重复 ID，且结果可复现。
- [ ] 单次失败不覆盖上一份有效 Universe 数据。
- [ ] 5,000 条采集输出耗时、请求数、去重数和限流等待统计，并优于 V1.0.1 基线。

## 发布

- [ ] `pnpm test`、`pnpm collect:test`、`pnpm lint`、`pnpm build` 和 `pnpm test:e2e` 通过。
- [ ] CI、定时数据更新与 GitHub Pages 部署通过。
- [ ] README 与 `docs/v1.0.2/release-notes.md` 已更新。
- [ ] 创建并发布 `v1.0.2` GitHub Release。
