// Material Design Icons: https://github.com/Templarian/MaterialDesign
// Font Awesome Free 6.7.2 by @fontawesome: https://fontawesome.com
// Code icon: CC BY 4.0, https://fontawesome.com/license/free (Copyright 2024 Fonticons, Inc.)
const articleStatsIcons = {
  "clock-outline": "M12,20A8,8 0 0,0 20,12A8,8 0 0,0 12,4A8,8 0 0,0 4,12A8,8 0 0,0 12,20M12,2A10,10 0 0,1 22,12A10,10 0 0,1 12,22C6.47,22 2,17.5 2,12A10,10 0 0,1 12,2M12.5,7V12.25L17,14.92L16.25,16.15L11,13V7H12.5Z",
  "circle-edit-outline": "M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12H20A8,8 0 0,1 12,20A8,8 0 0,1 4,12A8,8 0 0,1 12,4V2M18.78,3C18.61,3 18.43,3.07 18.3,3.2L17.08,4.41L19.58,6.91L20.8,5.7C21.06,5.44 21.06,5 20.8,4.75L19.25,3.2C19.12,3.07 18.95,3 18.78,3M16.37,5.12L9,12.5V15H11.5L18.87,7.62L16.37,5.12Z",
  "image-multiple-outline": "M21,17H7V3H21M21,1H7A2,2 0 0,0 5,3V17A2,2 0 0,0 7,19H21A2,2 0 0,0 23,17V3A2,2 0 0,0 21,1M3,5H1V21A2,2 0 0,0 3,23H19V21H3M15.96,10.29L13.21,13.83L11.25,11.47L8.5,15H19.5L15.96,10.29Z",
  "fontawesome-solid-code": "M392.8 1.2c-17-4.9-34.7 5-39.6 22l-128 448c-4.9 17 5 34.7 22 39.6s34.7-5 39.6-22l128-448c4.9-17-5-34.7-22-39.6zm80.6 120.1c-12.5 12.5-12.5 32.8 0 45.3L562.7 256l-89.4 89.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0l112-112c12.5-12.5 12.5-32.8 0-45.3l-112-112c-12.5-12.5-32.8-12.5-45.3 0zm-306.7 0c-12.5-12.5-32.8-12.5-45.3 0l-112 112c-12.5 12.5-12.5 32.8 0 45.3l112 112c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L77.3 256l89.4-89.4c12.5-12.5 12.5-32.8 0-45.3z",
};

function updateArticleStats() {
  const article = document.querySelector(".md-content__inner");
  if (!article) {
    return;
  }

  // 每篇文章可添加隐藏标记，单独关闭统计栏。
  article.querySelector(".article-stats")?.remove();
  if (article.querySelector('[data-article-stats="false"]')) {
    return;
  }

  const title = article.querySelector("h1");
  if (!title) {
    return;
  }

  // 复制正文，排除代码块和无关元素
  const content = article.cloneNode(true);
  const imageCount = content.querySelectorAll("img").length;
  const codeLines = Array.from(content.querySelectorAll("pre"))
    .filter(pre => !pre.closest(".linenos, .linenodiv"))
    .reduce((total, pre) => {
      // 优先读取 code，避免把行号等辅助内容计入代码。
      const code = (pre.querySelector("code") || pre).cloneNode(true);
      code.querySelectorAll(".linenos, .linenodiv").forEach(el => el.remove());
      const source = (code.textContent || "").replace(/\r\n?/g, "\n");
      // 渲染器添加的末尾换行不额外计为一行，保留代码内部空行。
      const lines = source === "" ? 0 : source.replace(/\n$/, "").split("\n").length;
      return total + lines;
    }, 0);

  content.querySelectorAll(
    "pre, script, style, .article-stats, .highlight, .headerlink"
  ).forEach(el => el.remove());

  const text = content.textContent || "";

  // 统计中文字符数量
  const chinese = text.match(/\p{Script=Han}/gu) || [];

  // 统计英文单词数量
  const english = text.match(/[A-Za-z]+(?:'[A-Za-z]+)*/g) || [];

  const wordCount = chinese.length + english.length;

  // 中文 350 字/分钟，英文 200 词/分钟
  const minutes = Math.max(
    1,
    Math.ceil(chinese.length / 350 + english.length / 200)
  );

  const info = document.createElement("div");
  info.className = "article-stats";
  const statistics = [
    { icon: "circle-edit-outline", text: `约 ${wordCount.toLocaleString("zh-CN")} 个字` },
    { icon: "fontawesome-solid-code", text: `${codeLines.toLocaleString("zh-CN")} 行代码`, visible: codeLines > 0 },
    { icon: "image-multiple-outline", text: `${imageCount.toLocaleString("zh-CN")} 张图片`, visible: imageCount > 0 },
    { icon: "clock-outline", text: `预计阅读 ${minutes} 分钟` },
  ];
  statistics.forEach(({ icon, text, visible = true }) => {
    if (!visible) {
      return;
    }

    const item = document.createElement("span");
    const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    svg.setAttribute("class", "article-stats__icon");
    // Font Awesome 与 Material 图标使用不同的坐标范围。
    svg.setAttribute("viewBox", icon === "fontawesome-solid-code" ? "0 0 640 512" : "0 0 24 24");
    svg.setAttribute("aria-hidden", "true");
    svg.setAttribute("focusable", "false");
    const path = document.createElementNS("http://www.w3.org/2000/svg", "path");
    path.setAttribute("d", articleStatsIcons[icon]);
    svg.appendChild(path);
    item.append(svg, document.createTextNode(text));
    info.appendChild(item);
  });

  title.insertAdjacentElement("afterend", info);
}

// 支持 Zensical 的即时页面导航
if (typeof document$ !== "undefined") {
  document$.subscribe(updateArticleStats);
} else {
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", updateArticleStats);
  } else {
    updateArticleStats();
  }
}
