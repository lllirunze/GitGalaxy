# V1.0.0 发布验收清单

V1.0.0 发布验收已完成，可创建 GitHub Release。

> 发布门槛：已完成约 5,000 条 Repository 的数据扩容、性能记录和线上验证，满足正式 `v1.0.0` 发布条件。

> 维护策略：`v1.0.0` 发布后只创建如 `v1.0.1`、`v1.0.2` 的补丁版本，用于细节优化和修复；不以 `v1.1.0`、`v1.2.0` 引入新的产品特性。

## GitHub 仓库配置

- [x] 默认分支是 `master`。
- [x] `Settings → Actions → General` 已启用 GitHub Actions。
- [x] Workflow permissions 允许工作流写入仓库内容，以便定时数据更新提交 `universe.json`。
- [x] `Settings → Pages → Build and deployment → Source` 已选择 **GitHub Actions**。
- [x] 如需独立 API 配额，已设置 `GH_COLLECTOR_TOKEN` Repository Secret；未将真实 Token 提交到 Git。

## 自动化验证

- [x] 推送到 `master` 后，`CI` 工作流成功。
- [x] `Deploy GitHub Pages` 工作流成功，且产物来自 `apps/web/dist`。
- [x] Pages 公开地址可访问，资源路径在项目页部署路径下正常加载。
- [x] 手动运行一次 `Update Universe Data`，确认可采集、校验、提交数据并重新部署。

## 产品验收

- [x] 三维场景可加载；不支持 WebGL 时展示可理解的降级状态。
- [x] 搜索、键盘快捷键、相机聚焦、详情面板和 GitHub 链接均可用。
- [x] Chrome、Firefox、Safari（或 WebKit）完成基本检查；移动视口无关键遮挡。
- [x] 低、中、高画质模式可切换，低画质仍能完成核心探索。
- [x] 从 100 条数据开始，按 500、1,000、5,000 的阶段逐步扩容并记录性能结果。
- [x] 约 5,000 条数据通过 Schema 校验、无重复 Repository ID，且已有 Repository 的坐标保持稳定。
- [x] 使用约 5,000 条数据在目标桌面设备与普通笔记本上完成性能检查，无持续性卡顿。

## 开源发布材料

- [x] README 的 Live Demo 链接替换为实际 Pages 地址。
- [x] 已准备项目截图或 15–30 秒演示 GIF／视频中的至少一种发布素材。
- [x] `LICENSE`、`CONTRIBUTING.md` 和本清单已随仓库发布。
- [x] 上述数据规模与性能项均通过后，创建标签 `v1.0.0`，在 GitHub Release 中使用 `docs/v1.0.0/release-notes.md` 的内容。
