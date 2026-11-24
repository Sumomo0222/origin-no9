/* ORIGIN No.9 — 购物车状态（localStorage 持久化 + 发布订阅） */
import { SITE, priceOf, giftboxTotal } from "./data.js";

const LS_KEY = "origin9.cart.v1";

let state = {
  items: [],       // {kind:'product'|'giftbox', ...}
  giftCard: { styleId: "botanic", message: "" },
};

const listeners = new Set();
export function subscribe(fn) { listeners.add(fn); return () => listeners.delete(fn); }
function emit() { save(); listeners.forEach((fn) => fn(state)); }

function load() {
  try {
    const raw = localStorage.getItem(LS_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      if (parsed && Array.isArray(parsed.items)) {
        state = { ...state, ...parsed, giftCard: { ...state.giftCard, ...(parsed.giftCard || {}) } };
      }
    }
  } catch { /* 忽略损坏数据 */ }
}
function save() {
  try { localStorage.setItem(LS_KEY, JSON.stringify(state)); } catch { /* 隐私模式 */ }
}
load();

export const getCart = () => state;

/* 加入商品详情项 */
export function addProduct({ product, pctIdx, packId, qty, giftWrap }) {
  const price = priceOf(product, pctIdx, packId);
  const pct = product.pctOptions[pctIdx]?.pct ?? product.basePct;
  const key = ["p", product.id, pct, packId || "-", giftWrap ? "gw" : "-"].join("|");
  const found = state.items.find((it) => it.key === key);
  if (found) found.qty += qty;
  else {
    state.items.push({
      key, kind: "product", productId: product.id,
      pct, packId: packId || null, giftWrap: !!giftWrap, unit: price + (giftWrap ? 15 : 0), qty,
    });
  }
  emit();
}

/* 加入自组礼盒 */
export function addGiftbox({ boxId, pieces, card }) {
  const calc = giftboxTotal(boxId, pieces);
  const key = ["g", boxId, pieces.slice().sort().join(".")].join("|");
  const found = state.items.find((it) => it.key === key);
  if (found) found.qty += 1;
  else {
    state.items.push({
      key, kind: "giftbox", boxId, pieces: [...pieces],
      unit: calc.total, saved: calc.discount, card: card ? { ...card } : null, qty: 1,
    });
  }
  emit();
}

export function setQty(key, qty) {
  const it = state.items.find((x) => x.key === key);
  if (!it) return;
  it.qty = Math.max(0, qty);
  if (it.qty === 0) state.items = state.items.filter((x) => x !== it);
  emit();
}

export function removeItem(key) {
  state.items = state.items.filter((x) => x.key !== key);
  emit();
}

export function clearCart() { state.items = []; emit(); }

export function setGiftCard(patch) {
  state.giftCard = { ...state.giftCard, ...patch };
  save();
}

export function cartCount() {
  return state.items.reduce((a, it) => a + it.qty, 0);
}

export function cartSubtotal() {
  return state.items.reduce((a, it) => a + it.unit * it.qty, 0);
}

export function shippingFor(subtotal, shipMode) {
  if (shipMode === "pickup") return 0;
  if (subtotal >= SITE.freeShipThreshold) return 0;
  return shipMode === "cold" ? SITE.shippingFee + 8 : SITE.shippingFee;
}
