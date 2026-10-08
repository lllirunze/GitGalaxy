# GitGalaxy Collector

Collector 使用 GitHub REST API 搜索公开 Repository，经过去重、过滤、评分和语言分布调整后，生成前端使用的 `apps/web/public/data/universe.json`。

## Security

真实 Token 只写入仓库根目录的 `.env`。`.env` 已被 Git 忽略，日志不会输出 Token 或 Authorization Header。`.env.example` 只包含空变量和安全默认值。

## Initial 100 repository run

复制配置并在本地填入 Token：

```bash
cp .env.example .env
```

运行采集：

```bash
pnpm collect
```

默认仅采集 100 个项目。确认数据和前端渲染正确后，再在 `.env` 中逐步设置：

```text
COLLECTOR_TARGET=500
```

建议按 100、500、1,000、5,000 的顺序扩展。Collector 串行请求，默认间隔 2.1 秒，以适配 Search API 每分钟 30 次的独立限额，并处理 GitHub 的主限额、次级限额和重试响应。

## Tests

```bash
pnpm collect:test
```

测试不访问网络，也不需要 Token。
