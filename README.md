# Tech-Notes

> 主页采用 Zyyo 开源的主页框架，在此感谢 Zyyo 开源贡献。如果您也想采用这个主页，可以在 [homepage](https://github.com/ZYYO666/homepage) 获取源码。

至于这个博客，本人使用 [MkDocs](https://www.mkdocs.org/) 构建的静态网站，部署在 GitHub Pages 上（将时间花在更重要的事情上 —— 就是懒）。作为自己的在线笔记本，记录自己的学习和工作经验。

**为什么使用 MkDocs**:

- 使用 Markdown 作为标记语言，虽没有 Sphinx 的 RestructuredText 强大，但容易上手，且对中文较为友好。
- 丰富的 Markdown 扩展，足以满足日常文档需求。
- 配置文件使用 YAML，相比 Sphinx 使用 Python 源码进行配置相对简单。
- 强大的离线搜索功能，以及基本的中文关键词搜索支持。
- 标题 permalink anchor 支持 Unicode 字符（Sphinx 仅支持 ASCII）。

## Features

- 由 MkDocs 提供支持的简洁、响应式设计
- 易于编辑的 Markdown 内容
- 已部署到 GitHub Pages 上，可免费托管
- 本项目使用 [Material for MkDocs](https://squidfunk.github.io/mkdocs-material/) 主题
- 添加插件以增强功能，使用的插件如下：
    - [mkdocs-material](https://squidfunk.github.io/mkdocs-material/)
    - [mkdocs-glightbox](https://github.com/blueswen/mkdocs-glightbox)
    - [mkdocs-git-revision-date-localized-plugin](https://github.com/zhaoterryy/mkdocs-git-revision-date-plugin)
    - [mkdocs-statistics-plugin](https://github.com/TonyCrane/mkdocs-statistics-plugin/tree/600d5b582bbff1aa209f59cab986b3a6563d470a)
    - [mkdocs-changelog-plugin](https://github.com/TonyCrane/mkdocs-changelog-plugin/tree/b90ffb47c85e451dd82ce2b0d8779a0f35bea8a0)
    - [mkdocs-open-in-new-tab](https://github.com/JakubAndrysek/mkdocs-open-in-new-tab)
    - [jieba](https://github.com/fxsjy/jieba)

## Quick start

MkDocs 拥有极其丰富且强大的插件生态，但由于这些插件强依赖于特定的 Python 版本和第三方包，直接在本地系统中全局安装很容易造成依赖冲突（Dependency Hell），污染原生环境。

为了保持本地电脑的纯净，并实现“拉下代码就能跑”的极致体验，本项目专门配置了 Docker 容器化开发环境。你无需在本地安装任何 Python 或 MkDocs 环境，真正做到开箱即用

在开始之前，请确保你的电脑上已经安装并启动了 [Docker Desktop](https://www.docker.com/)（或 Docker Engine）。

在项目的根目录（即 docker-compose.yaml 所在目录）下打开终端，执行以下命令：

```bash
docker compose up
```

> 注：初次启动时，Docker 会自动拉取底层的 Python 镜像并安装 requirements.txt 中的依赖插件，可能需要 1~2 分钟，请耐心等待，以后启动将是秒开。

当终端中看到 `Serving on http://0.0.0.0:8000` 提示时，说明服务已成功启动。即可打开浏览器访问：http://localhost:8000。

由于容器自动挂载并监听本地的 `docs/` 目录，我们只需要使用任何编辑器编辑 MarkDown 文章，在保存的瞬间，浏览器的网页就会自动刷新并热更新，所见即所得。

写作完毕后，在终端按下 `Ctrl + C` 即可优雅关闭 Docker 服务，不留任何垃圾文件。

## License

此仓库内容均采用 [CC BY-NC-SA 4.0](https://creativecommons.org/licenses/by-nc-sa/4.0/) 许可证（详情请参阅 LICENSE 文件），搬运部分遵循原作者规定的许可。