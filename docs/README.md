# 文档版本规范

产品计划、验收标准和发布说明是版本快照。每个版本使用独立子目录，目录与文件使用以下命名：

```text
docs/
└── v<major>.<minor>.<patch>/
    └── <document-type>.md
```

例如：

```text
v1.0.0/development-plan.md
v1.0.0/release-checklist.md
v1.0.0/release-notes.md
```

## 使用规则

- 每个已发布或准备发布的版本都保留自己的文档，不覆盖旧版本文件。
- 规划后续优化时复制当前版本目录或按需创建其中的文档，使用目标版本目录，例如 `docs/v1.0.1/development-plan.md`。
- 仅当发布门槛或验收项变化时，新增对应版本的 release checklist。
- 发布 GitHub Release 时，使用该版本的 release notes；已发布版本的说明不再改写，必要修正以更高版本或勘误记录说明。
- `README.md`、`CONTRIBUTING.md`、`LICENSE` 等仓库级文档不携带版本号，应链接到当前稳定版本文档。

## V1.0 维护策略

V1.0.0 发布后，项目进入稳定维护线，后续版本仅使用补丁版本号：`v1.0.1`、`v1.0.2` 等。补丁版本可以包含缺陷修复、性能和兼容性改进、无障碍优化、文案调整及不改变产品范围的小型视觉或交互打磨。

不计划通过 `v1.1.0`、`v1.2.0` 等版本引入新的产品特性。若未来确实需要扩展产品范围，应由新的独立决策和版本计划重新定义，而不是默认纳入当前路线。

## 当前版本

- [V1.0.0 开发计划](v1.0.0/development-plan.md)
- [V1.0.0 发布验收清单](v1.0.0/release-checklist.md)
- [V1.0.0 发布说明](v1.0.0/release-notes.md)
