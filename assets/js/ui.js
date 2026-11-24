/* ORIGIN No.9 — 共享 UI 工具 */
import { FLAVOR_AXES, fmt } from "./data.js";

/* 特调口味块的颜色（产地口味取 origin.tone） */
export const EXTRA_TONES = {
  "f-salt": "#8C6E4E",
  "f-yuzu": "#5C7A52",
  "f-coffee": "#3E2A20",
};

export function flavorTone(flavor, origins) {
  if (flavor.originId) {
    const o = origins.find((x) => x.id === flavor.originId);
    return o ? o.tone : "#4A2E1B";
  }
  return EXTRA_TONES[flavor.id] || "#4A2E1B";
}

export function flavorInitial(flavor) {
  return flavor.name.trim().charAt(0);
}

/* 风味雷达图（四轴）SVG */
export function radarSVG(flavor, { size = 120, onLight = false } = {}) {
  const cx = size / 2, cy = size / 2 + 4;
  const R = size * 0.34;
  const axes = FLAVOR_AXES;
  const n = axes.length;
  const angle = (i) => (Math.PI * 2 * i) / n - Math.PI / 2;

  let rings = "";
  for (const k of [0.25, 0.5, 0.75, 1]) {
    const pts = axes.map((_, i) => {
      const a = angle(i);
      return `${(cx + Math.cos(a) * R * k).toFixed(1)},${(cy + Math.sin(a) * R * k).toFixed(1)}`;
    }).join(" ");
    rings += `<polygon class="grid" points="${pts}" />`;
  }
  let spokes = "", labels = "";
  axes.forEach((ax, i) => {
    const a = angle(i);
    const lx = cx + Math.cos(a) * (R + 15);
    const ly = cy + Math.sin(a) * (R + 15) + 4;
    spokes += `<line class="axis" x1="${cx}" y1="${cy}" x2="${(cx + Math.cos(a) * R).toFixed(1)}" y2="${(cy + Math.sin(a) * R).toFixed(1)}" />`;
    const anchor = Math.abs(Math.cos(a)) < 0.3 ? "middle" : Math.cos(a) > 0 ? "start" : "end";
    labels += `<text x="${lx.toFixed(1)}" y="${ly.toFixed(1)}" text-anchor="${anchor}">${ax.label}</text>`;
  });
  const pts = axes.map((ax, i) => {
    const a = angle(i);
    const v = Math.max(0.15, (flavor[ax.key] || 0) / 5);
    return `${(cx + Math.cos(a) * R * v).toFixed(1)},${(cy + Math.sin(a) * R * v).toFixed(1)}`;
  });
  const vertices = axes.map((ax, i) => {
    const a = angle(i);
    const v = Math.max(0.15, (flavor[ax.key] || 0) / 5);
    return `<circle class="vertex" cx="${(cx + Math.cos(a) * R * v).toFixed(1)}" cy="${(cy + Math.sin(a) * R * v).toFixed(1)}" r="2.6" />`;
  }).join("");

  return `<svg class="radar${onLight ? " on-light" : ""}" viewBox="-24 -2 ${size + 48} ${size + 10}" role="img" aria-label="风味雷达图">
    ${rings}${spokes}
    <polygon class="shape" points="${pts}" />
    ${vertices}${labels}
  </svg>`;
}

/* 顶部提示 */
let toastTimer = null;
export function toast(msg) {
  const el = document.getElementById("toast");
  el.textContent = msg;
  el.classList.add("show");
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => el.classList.remove("show"), 2600);
}

/* 商品主图（按商品映射到已下载素材） */
export const ORIGIN_PHOTOS = {
  ecuador: { file: "assets/img/hero-pod.jpg", alt: "云雾林里的可可荚" },
  madagascar: { file: "assets/img/pods-trunk.jpg", alt: "桑巴瓦河谷的果荚" },
  ghana: { file: "assets/img/hands-beans.jpg", alt: "阿散蒂农人的手与豆" },
  peru: { file: "assets/img/bar-parchment.jpg", alt: "圣马丁雨林可可豆" },
  trinidad: { file: "assets/img/pods-trunk.jpg", alt: "千里达老树园" },
  vietnam: { file: "assets/img/hero-pod.jpg", alt: "湄公河椰林可可" },
};

/* 巡游路线（产地之间）。返回 SVG path 字符串 */
export function routePath(markers, order) {
  const pts = order.map((id) => markers[id]).filter(Boolean);
  if (pts.length < 2) return "";
  let d = `M${pts[0].x},${pts[0].y}`;
  for (let i = 1; i < pts.length; i++) {
    const a = pts[i - 1], b = pts[i];
    const mx = (a.x + b.x) / 2;
    const my = (a.y + b.y) / 2 - Math.abs(b.x - a.x) * 0.18 - 14;
    d += ` Q${mx.toFixed(1)},${my.toFixed(1)} ${b.x},${b.y}`;
  }
  return d;
}

/* 数字滚动到目标 */
export function countUp(el, target, decimals = 0) {
  const start = parseFloat(el.dataset.v || "0");
  const t0 = performance.now();
  const dur = 500;
  function frame(t) {
    const p = Math.min(1, (t - t0) / dur);
    const eased = 1 - Math.pow(1 - p, 3);
    const v = start + (target - start) * eased;
    el.textContent = fmt(v);
    if (p < 1) requestAnimationFrame(frame);
    else el.dataset.v = String(target);
  }
  requestAnimationFrame(frame);
}

export const esc = (s) =>
  String(s ?? "").replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
