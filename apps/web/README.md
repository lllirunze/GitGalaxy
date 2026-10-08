# GitGalaxy Web

GitGalaxy Web 是项目的 React 和 Three.js 前端。当前阶段使用确定性模拟数据验证三维场景、相机控制、恒星选择和响应式界面，真实 GitHub 数据将在第二阶段接入。

## Requirements

- Node.js 22.12 或更高版本
- pnpm

## Development

在仓库根目录运行：

```bash
pnpm install
pnpm dev
```

默认开发地址为 `http://localhost:5173`。

## Quality checks

```bash
pnpm build
pnpm lint
pnpm test
pnpm test:e2e
```

## Current scene controls

- 鼠标或触控拖动：旋转视角
- 滚轮或双指：缩放视角
- 点击恒星：查看模拟 Repository 信息
- Reset View：恢复初始视角并清除选择

## Data status

`src/galaxy/data/demoStars.ts` 目前生成固定的模拟数据。该文件不会请求 GitHub，也不包含任何 Token。第二阶段将用 Collector 生成的 `public/data/universe.json` 替换模拟数据。
