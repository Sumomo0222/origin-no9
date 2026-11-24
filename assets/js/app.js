/* ORIGIN No.9 — 应用入口与路由 */
import { renderHome, renderProduct, renderGiftbox, renderCheckout, renderSuccess, renderCartDrawer, openCart, closeCart, observeReveals } from "./views.js";
import { subscribe, cartCount } from "./store.js";

const $ = (sel, el = document) => el.querySelector(sel);
const $$ = (sel, el = document) => [...el.querySelectorAll(sel)];
const view = $("#view");
let current = null; // 'home' | 'product' | 'giftbox' | 'checkout' | 'success'

/* 路由：#/xxx 为页面；#origins / #shop / #story 为首页锚点 */
function route() {
  const hash = location.hash || "#/";
  closeCart();
  $("#mobileNav")?.classList.remove("open");
  $("#burger")?.classList.remove("open");

  const anchorTargets = ["origins", "shop", "story", "giftbox-teaser"];
  if (!hash.startsWith("#/")) {
    const anchor = hash.replace("#", "");
    if (current !== "home") renderView("home");
    const el = document.getElementById(anchor);
    if (el && anchorTargets.includes(anchor)) {
      requestAnimationFrame(() => el.scrollIntoView({ behavior: "smooth", block: "start" }));
    }
    setActiveNav(anchor);
    return;
  }

  const parts = hash.slice(2).split("/").filter(Boolean);
  if (parts[0] === "product" && parts[1]) { renderView("product", parts[1]); setActiveNav("shop"); return; }
  if (parts[0] === "giftbox") { renderView("giftbox"); setActiveNav("giftbox"); return; }
  if (parts[0] === "checkout") { renderView("checkout"); setActiveNav(null); return; }
  if (parts[0] === "success") { renderView("success", decodeURIComponent(parts[1] || "")); setActiveNav(null); return; }
  renderView("home");
  setActiveNav(null);
}

function renderView(name, arg) {
  if (current === name && name === "home") return; // 锚点滚动时不重渲染
  window.scrollTo(0, 0);
  if (name === "home") renderHome(view);
  else if (name === "product") renderProduct(view, arg);
  else if (name === "giftbox") renderGiftbox(view);
  else if (name === "checkout") renderCheckout(view);
  else if (name === "success") renderSuccess(view, arg);
  current = name;
  requestAnimationFrame(() => window.scrollTo(0, 0));
}

function setActiveNav(key) {
  $$("#mainNav a").forEach((a) => {
    a.classList.toggle("active", !!key && (a.dataset.nav === key || (key === "giftbox" && a.dataset.nav === "giftbox")));
  });
}

/* 购物车抽屉 */
$("#cartOpen").addEventListener("click", openCart);
$("#cartClose").addEventListener("click", closeCart);
$("#overlay").addEventListener("click", closeCart);
document.addEventListener("keydown", (e) => { if (e.key === "Escape") closeCart(); });
subscribe(renderCartDrawer);
renderCartDrawer();

/* 移动端菜单 */
$("#burger").addEventListener("click", () => $("#mobileNav").classList.toggle("open"));
$$("#mobileNav a").forEach((a) => a.addEventListener("click", () => $("#mobileNav").classList.remove("open")));

/* hash 变化 */
window.addEventListener("hashchange", route);

/* 首屏 */
route();
observeReveals();
