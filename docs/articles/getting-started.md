# 站点搭建

Tech Notes 使用 Zensical 构建。文章保存在 `docs/`，自定义模板、样式和脚本集中在 `theme/`。

## 本地预览

在 Python 环境中安装 Zensical，然后在仓库根目录启动预览：

```bash
pip install zensical
zensical serve
```

访问终端输出的本地地址，即可查看站点。修改 Markdown 或主题资源后，预览服务会更新页面。

## 添加文章

在 `docs/` 下创建 Markdown 文件，例如 `docs/articles/my-note.md`，然后在 `zensical.toml` 的 `nav` 中添加入口。

首页卡片使用相对文档路径链接到文章，例如 `[阅读笔记](articles/my-note.md)`。构建时会转换为对应的页面地址。

## 构建检查

```bash
zensical build --clean
```

构建产物位于 `site/`。当前站点启用了 `strict = true`，发布前应确认构建没有警告或错误。

继续阅读：[主题定制](customization.md) · [自动部署](deployment.md)
