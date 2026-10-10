# 文档版本规范

产品计划、验收标准和发布说明是版本快照，统一使用以下命名：

```text
v<major>.<minor>.<patch>-<document-type>.md
```

例如：

```text
v1.0.0-development-plan.md
v1.0.0-release-checklist.md
v1.0.0-release-notes.md
```

## 使用规则

- 每个已发布或准备发布的版本都保留自己的文档，不覆盖旧版本文件。
- 规划下一个版本时复制当前计划文档，改名为目标版本号，例如 `v1.1.0-development-plan.md`，再进行修改。
- 仅当发布门槛或验收项变化时，新增对应版本的 release checklist。
- 发布 GitHub Release 时，使用该版本的 release notes；已发布版本的说明不再改写，必要修正以更高版本或勘误记录说明。
- `README.md`、`CONTRIBUTING.md`、`LICENSE` 等仓库级文档不携带版本号，应链接到当前稳定版本文档。

## 当前版本

- [V1.0.0 开发计划](v1.0.0-development-plan.md)
- [V1.0.0 发布验收清单](v1.0.0-release-checklist.md)
- [V1.0.0 发布说明](v1.0.0-release-notes.md)
