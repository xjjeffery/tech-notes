# 自动部署

站点通过 GitHub Actions 构建，并发布到 GitHub Pages。工作流位于 `.github/workflows/deploy.yml`。

## 发布流程

向 `master` 分支推送提交后，工作流依次完成：

1. 检出仓库并准备 Python 环境。
2. 安装 Zensical。
3. 执行 `zensical build --clean`。
4. 上传 `site/` 构建产物。
5. 部署到 GitHub Pages。

## 仓库配置

在仓库的 **Settings → Pages → Build and deployment** 中，将发布来源设为 **GitHub Actions**。

工作流已声明 Pages 部署所需的 `pages: write` 和 `id-token: write` 权限，并使用 `github-pages` 环境。

## 配置正式站点地址

`zensical.toml` 中的 `site_url` 当前为本地预览地址。正式发布时，应将其改成实际访问地址，并保留项目站点所需的路径前缀。

## 发布前检查

```bash
zensical build --clean
```

确认构建成功、首页卡片可跳转，再提交文档和配置变更。构建失败时，可在仓库 **Actions** 页查看对应步骤的日志。
