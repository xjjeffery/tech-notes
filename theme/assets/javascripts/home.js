(() => {
  const CELL = 11;
  const GAP = 3;
  const OPACITY = [0.05, 0.25, 0.5, 0.75, 1];
  const NS = "http://www.w3.org/2000/svg";
  let activeController;
  const cache = new Map();

  function svgElement(tag, attributes, text) {
    const element = document.createElementNS(NS, tag);
    for (const [name, value] of Object.entries(attributes)) {
      element.setAttribute(name, value);
    }
    if (text !== undefined) element.textContent = text;
    return element;
  }

  function render(root, days) {
    const svg = root.querySelector("svg");
    const tooltip = root.querySelector(".github-heatmap-tooltip");
    // UTC keeps date-only API values aligned with the same weekday in every timezone.
    const startDay = new Date(`${days[0].date}T00:00:00Z`).getUTCDay();
    const weeks = Math.ceil((startDay + days.length) / 7);
    svg.replaceChildren();
    svg.setAttribute("viewBox", `0 0 ${28 + weeks * (CELL + GAP)} 114`);
    let previousMonth = -1;

    ["", "一", "", "三", "", "五", ""].forEach((label, row) => {
      if (label) svg.appendChild(svgElement("text", {
        x: 0, y: 16 + row * (CELL + GAP) + CELL - 1, class: "heatmap-label",
      }, label));
    });

    days.forEach((day, index) => {
      const position = startDay + index;
      const col = Math.floor(position / 7);
      const row = position % 7;
      const x = 28 + col * (CELL + GAP);
      const month = Number(day.date.slice(5, 7));
      // Label full weeks to avoid overlapping labels at the start of the range.
      if (row === 0 && month !== previousMonth) {
        svg.appendChild(svgElement("text", { x, y: 11, class: "heatmap-label" }, `${month}月`));
        previousMonth = month;
      }
      const rect = svgElement("rect", {
        x, y: 16 + row * (CELL + GAP), width: CELL, height: CELL,
        rx: 2, class: "heatmap-cell",
        fill: `rgba(35, 154, 59, ${OPACITY[day.level]})`,
        "data-date": day.date, "data-count": day.count,
      });
      const label = `${day.date}：${day.count} 次贡献`;
      rect.appendChild(svgElement("title", {}, label));
      rect.addEventListener("mouseenter", () => {
        tooltip.querySelector(".github-heatmap-tooltip__content").textContent = label;
        tooltip.classList.add("visible");
        const cellRect = rect.getBoundingClientRect();
        const bounds = tooltip.getBoundingClientRect();
        const left = Math.max(8, Math.min(
          cellRect.left + cellRect.width / 2 - bounds.width / 2,
          window.innerWidth - bounds.width - 8,
        ));
        const above = cellRect.top >= bounds.height + 16;
        tooltip.classList.toggle("arrow-bottom", above);
        tooltip.classList.toggle("arrow-top", !above);
        tooltip.style.left = `${left}px`;
        tooltip.style.top = `${above ? cellRect.top - bounds.height - 8 : cellRect.bottom + 8}px`;
        tooltip.querySelector(".github-heatmap-tooltip__arrow").style.left =
          `${cellRect.left + cellRect.width / 2 - left}px`;
      });
      rect.addEventListener("mouseleave", () => tooltip.classList.remove("visible"));
      svg.appendChild(rect);
    });
    root.querySelector(".github-heatmap-content").onscroll = () => tooltip.classList.remove("visible");
    svg.removeAttribute("hidden");
    root.querySelector(".github-heatmap-legend").hidden = false;
    root.querySelector("#stats-count").textContent = days.reduce((sum, day) => sum + day.count, 0)
      .toLocaleString("zh-CN");
    root.querySelector("#contribution-stats").hidden = false;
    root.querySelector(".github-heatmap-status").textContent = "";
  }

  async function initialize() {
    activeController?.abort();
    const root = document.querySelector("[data-github-heatmap]");
    if (!root) return;
    const controller = new AbortController();
    activeController = controller;
    const status = root.querySelector(".github-heatmap-status");
    const username = root.dataset.githubHeatmap;
    root.setAttribute("aria-busy", "true");
    const timer = setTimeout(() => controller.abort(), 12000);
    try {
      let days = cache.get(username);
      if (!days) {
        const response = await fetch(
          `https://github-contributions-api.jogruber.de/v4/${encodeURIComponent(username)}?y=last`,
          { signal: controller.signal },
        );
        if (!response.ok) throw new Error(`HTTP ${response.status}`);
        const data = await response.json();
        const validDate = value => typeof value === "string" && /^\d{4}-\d{2}-\d{2}$/.test(value)
          && Number.isFinite(Date.parse(`${value}T00:00:00Z`));
        if (!Array.isArray(data.contributions) || !data.contributions.length ||
            !data.contributions.every(day => validDate(day.date) &&
              Number.isInteger(day.count) && day.count >= 0 &&
              Number.isInteger(day.level) && day.level >= 0 && day.level <= 4)) {
          throw new Error("Invalid contribution data");
        }
        days = [...data.contributions].sort((a, b) => a.date.localeCompare(b.date));
        // The grid assumes one entry per calendar day; reject gaps or duplicates.
        if (days.some((day, i) => i > 0 && Date.parse(day.date) - Date.parse(days[i - 1].date) !== 86400000)) {
          throw new Error("Nonconsecutive contribution dates");
        }
        cache.set(username, days);
      }
      if (root.isConnected && activeController === controller) render(root, days);
    } catch (error) {
      if (root.isConnected && activeController === controller) {
        status.textContent = "暂时无法加载贡献记录，请通过下方链接前往 GitHub 查看。";
      }
    } finally {
      clearTimeout(timer);
      if (root.isConnected && activeController === controller) root.setAttribute("aria-busy", "false");
    }
  }

  if (typeof document$ !== "undefined") {
    document$.subscribe(initialize);
  } else if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initialize, { once: true });
  } else {
    initialize();
  }
})();
