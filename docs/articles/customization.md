# 主题定制

站点使用 Zensical 的 `modern` 主题，内容与主题资源分别维护。

## 目录结构

```text
docs/                         # Markdown 文档
theme/
├── partials/                 # 局部模板覆盖
│   └── comments.html
└── assets/
    ├── javascripts/          # 自定义脚本
    └── stylesheets/          # 自定义样式
zensical.toml                 # 站点配置
```

`[project.theme]` 中的 `custom_dir = "theme"` 指定模板目录。自定义静态资源通过 `extra_css` 和 `extra_javascript` 配置引用，路径以 `assets/` 开头。

## 首页卡片

首页使用 `grid cards` 展示文章与项目。每张卡片包含标题、简短说明和一个主链接；首页样式将链接的点击范围扩展到整张卡片，并保留键盘焦点提示。

在 `docs/index.md` 中编辑卡片内容，在 `theme/assets/stylesheets/home.css` 中调整首页布局。桌面端最多三列，较小屏幕显示两列，手机显示单列。

## 页面切换与脚本

站点启用了即时导航。需要在每次进入页面时运行的脚本，应订阅 `document$`，并处理目标元素不存在的情况。

首页热力图的脚本位于 `theme/assets/javascripts/home.js`，只有找到热力图容器后才会加载数据。

## 模板覆盖

评论组件放在 `theme/partials/comments.html`。自定义错误页可放在 `theme/404.html`，单独的首页模板可放在 `theme/home.html`。

当前首页直接使用 Markdown 与内置网格卡片，无需额外首页模板。
