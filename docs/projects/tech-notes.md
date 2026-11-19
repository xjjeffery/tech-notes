# Tech Notes

一个使用 Zensical 构建的个人技术知识库，用于整理学习笔记、记录工程实践和项目探索。

[查看源码](https://github.com/xjjeffery/tech-notes){ .md-button .md-button--primary }

## 设计思路

- **内容与主题分离**：文档放在 `docs/`，模板和静态资源放在 `theme/`。
- **内容入口集中**：首页通过文章卡片和项目卡片组织主要内容。
- **阅读体验统一**：沿用内置主题、搜索、明暗配色与即时导航。
- **发布自动化**：推送到 `master` 后，通过 GitHub Actions 发布到 GitHub Pages。

## 当前功能

首页包含响应式卡片和 GitHub 贡献热力图。热力图支持加载失败提示，数据在当前页面会话内复用；文章页提供字数与预计阅读时间统计。

## 相关笔记

- [站点搭建](../articles/getting-started.md)
- [主题定制](../articles/customization.md)
- [自动部署](../articles/deployment.md)
