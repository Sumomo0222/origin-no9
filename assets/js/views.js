/* ORIGIN No.9 — 视图渲染 */
import {
  SITE, ORIGINS, PRODUCTS, GIFTBOX, CARD_STYLES, PACKAGING,
  fmt, getOrigin, getProduct, productsOfOrigin, priceOf, giftboxTotal, packsOf, SHIPPING_NOTE,
} from "./data.js";
import { MAP } from "./map-data.js";
import { radarSVG, routePath, ORIGIN_PHOTOS, flavorTone, flavorInitial, countUp, esc, toast } from "./ui.js";
import { getCart, addProduct, addGiftbox, setQty, removeItem, setGiftCard, cartSubtotal, cartCount, shippingFor, clearCart } from "./store.js";

const $ = (sel, el = document) => el.querySelector(sel);
const $$ = (sel, el = document) => [...el.querySelectorAll(sel)];

/* ============================================================
   首页
   ============================================================ */
export function renderHome(root) {
  root.innerHTML = `
  <!-- HERO -->
  <section class="hero">
    <div class="wrap hero-grid">
      <div class="hero-copy">
        <span class="eyebrow reveal in">SINGLE ESTATE CHOCOLATE · ${SITE.season}</span>
        <h1 class="hero-title">
          <span class="latin reveal in d1">ORIGIN No.9 — 九号原产</span>
          一块巧克力，<br />只讲一块土地的事。
        </h1>
        <p class="hero-lede reveal in d2">
          我们沿着可可带走了一年，把六块土地装进 50 克的排块里：厄瓜多尔的茉莉云雾林、马达加斯加的覆盆子酸芯、湄公河的椰糖篝火……点击地图，听每一块土地自己开口。
        </p>
        <div class="hero-cta reveal in d3">
          <a class="btn on-dark" href="#origins">探索产地地图</a>
          <a class="btn ghost" style="color:var(--paper);border-color:rgba(244,236,220,.4)" href="#/giftbox">组装第九号礼盒</a>
        </div>
        <div class="hero-meta reveal in d4">
          <div><b>6</b>单一产地庄园（虚构）</div>
          <div><b>18h</b>石磨精炼时长</div>
          <div><b>${SITE.freeShipThreshold}</b>满额顺丰冷链包邮</div>
        </div>
      </div>
      <div class="hero-visual">
        <div class="stamp-edge hero-photo"><img src="assets/img/hero-pod.jpg" alt="挂在树干上的青色可可荚" /></div>
        <svg class="hero-postmark" viewBox="0 0 120 120" style="color:var(--gold-bright)"><use href="#sym-postmark"/></svg>
        <svg class="hero-stamp" viewBox="0 0 150 180" style="color:var(--gold-bright)"><use href="#sym-stamp"/></svg>
        <span class="hero-caption">LOS RÍOS · ECUADOR · 雨季第九日采收</span>
      </div>
    </div>
  </section>

  <!-- 产地地图 -->
  <section class="section" id="origins">
    <div class="wrap">
      <div class="section-head">
        <div class="section-no">01</div>
        <div>
          <span class="eyebrow">THE ATLAS · 产地地图</span>
          <h2 class="section-title">九号巡游路线 · 点击一块土地</h2>
          <p class="section-sub">六个虚构庄园，六种截然不同的风味签名。点击地图上的金色坐标，展开该产地的风味档案、可可比例与代表产品。</p>
        </div>
        <div class="section-head-right">ATLAS BATCH · ${SITE.season}</div>
      </div>

      <div class="map-panel reveal">
        <div class="map-frame">
          <span class="map-coords tl">160°W</span><span class="map-coords tr">160°E</span>
          <span class="map-coords bl">LAT 40°S</span><span class="map-coords br">LAT 40°N</span>
          ${worldMapSVG()}
        </div>
        <p class="map-hint">· 虚线为第九号巡游路线 · 点击金色坐标展开产地档案 ·</p>
      </div>
      <div id="originDetail" class="reveal"></div>
    </div>
  </section>

  <!-- 全部风味 -->
  <section class="section tint" id="shop">
    <div class="wrap">
      <div class="section-head">
        <div class="section-no">02</div>
        <div>
          <span class="eyebrow">THE CABINET · 风味标本室</span>
          <h2 class="section-title">八件风味标本</h2>
          <p class="section-sub">悬停任意标本卡，查看它的酸度、苦度、果香与坚果香四维档案；点击卡片进入实验室，调配你自己的可可比例。</p>
        </div>
        <div class="section-head-right">18H CONCHE · 小批量</div>
      </div>
      <div class="product-grid stagger">${PRODUCTS.map(productCard).join("")}</div>
    </div>
  </section>

  <!-- 自组礼盒 CTA -->
  <section class="gift-cta" id="giftbox-teaser">
    <div class="wrap gift-cta-inner">
      <div>
        <span class="eyebrow" style="color:var(--gold-bright)">THE ATELIER · 礼盒工坊</span>
        <h2>把六个产地，<br />装进同一只盒子。</h2>
        <p>选择盒型，把口味一块一块拖进去——数量与总价实时更新，写一张贺卡，我们替你把它寄成一份「可以吃的明信片」。</p>
        <div class="steps">
          <div class="step"><span class="n">I.</span>挑选盒型：4 / 6 / 9 / 12 格</div>
          <div class="step"><span class="n">II.</span>拖入口味块，实时计价</div>
          <div class="step"><span class="n">III.</span>写贺卡，模拟下单</div>
        </div>
        <div style="margin-top:30px"><a class="btn on-dark" href="#/giftbox">进入礼盒工坊 →</a></div>
      </div>
      <div class="gift-cta-photo">
        <div class="stamp-edge"><img src="assets/img/truffles-cups.jpg" alt="纸托里的庄园松露" /></div>
        <span class="stamp-label">ATELIER · HANDMADE</span>
      </div>
    </div>
  </section>

  <!-- 品牌故事 -->
  <section class="section" id="story">
    <div class="wrap story-grid">
      <div class="story-photos reveal">
        <div class="stamp-edge"><img src="assets/img/hands-beans.jpg" alt="农人手中摊开的可可豆" /></div>
        <div class="stamp-edge"><img src="assets/img/chunks-board.jpg" alt="工作室案板上的巧克力块与刨花" /></div>
      </div>
      <div class="story-copy">
        <span class="eyebrow">OUR STORY · 品牌故事（虚构）</span>
        <h2>走了八块土地，<br />才敢签下第九份契约。</h2>
        <p>ORIGIN No.9 的起点是一张失败清单：创始人「林九」在三年里走访了八块可可土地——太酸的、太闷的、烘焙师和农人吵翻的……每一次都觉得「差一点」。</p>
        <p>第九站，厄瓜多尔云雾林边缘的小庄园。豆子发酵第六天开箱时，发酵册上写着一行小字：「花香进来了」。于是品牌有了名字：只与编号第九的庄园签约，一年一批，卖完即止。</p>
        <p>我们仍然每年重走一遍巡游路线，用同一支温度计、同一本发酵册，替你记下每块土地当年的天气。</p>
        <div class="sign">— ORIGIN No.9 工作室 · ${SITE.atelier}</div>
      </div>
    </div>
  </section>`;

  initMap();
  initCardInteractions(root);
  observeReveals(root);
}

function worldMapSVG() {
  const order = ["ecuador", "peru", "trinidad", "ghana", "madagascar", "vietnam"];
  const route = routePath(MAP.markers, order);
  const markers = ORIGINS.map((o) => {
    const m = MAP.markers[o.id];
    if (!m) return "";
    return `<g class="map-marker" data-origin="${o.id}" tabindex="0" role="button" aria-label="产地：${esc(o.name)}">
      <circle class="ring" cx="${m.x}" cy="${m.y}" r="7" />
      <circle class="pulse" cx="${m.x}" cy="${m.y}" r="7" stroke="rgba(210,169,92,.8)" stroke-width="1.2" />
      <circle class="dot" cx="${m.x}" cy="${m.y}" r="3.4" />
      <text x="${m.x + 12}" y="${m.y + 4 + (o.labelDy || 0)}">${esc(o.name)}</text>
    </g>`;
  }).join("");
  return `<svg class="worldmap" viewBox="0 0 ${MAP.width} ${MAP.height}" aria-label="可可产地世界地图">
    <path class="graticule" d="${MAP.graticule}" />
    <path class="land" d="${MAP.land}" />
    <path class="borders" d="${MAP.borders}" />
    <path class="route" d="${route}" />
    ${markers}
  </svg>`;
}

/* 产地档案展开 */
function initMap() {
  const detailEl = $("#originDetail");
  const show = (id) => {
    const o = getOrigin(id);
    if (!o) return;
    $$(".map-marker").forEach((g) => g.classList.toggle("active", g.dataset.origin === id));
    const prods = productsOfOrigin(o.id);
    const photo = ORIGIN_PHOTOS[o.id] || Object.values(ORIGIN_PHOTOS)[0];
    detailEl.innerHTML = `
      <div class="origin-detail">
        <div class="origin-detail-card">
          <div class="origin-detail-photo"><img src="${photo.file}" alt="${esc(photo.alt)}" /></div>
          <div class="origin-detail-body">
            <div class="origin-name"><h3>${esc(o.name)}</h3><span class="latin">${esc(o.en)}</span></div>
            <div class="origin-estate">${esc(o.estate)} · ${esc(o.varietal)}</div>
            <p class="origin-story">${esc(o.story)}</p>
            <div class="origin-facts">
              <div>代表可可比例<b>${o.cacaoPct}%</b></div>
              <div>采收期<b>${esc(o.harvest)}</b></div>
              <div>发酵工艺<b>${esc(o.ferment)}</b></div>
              <div>海拔<b>${esc(o.altitude)}</b></div>
            </div>
            <div class="origin-notes">${o.notes.map((n) => `<span class="origin-note-chip">${esc(n)}</span>`).join("")}</div>
            <div class="origin-products">
              <div class="origin-products-label">REPRESENTATIVE · 代表产品</div>
              <div class="origin-product-row">
                ${prods.map((p) => `
                  <a class="origin-product-chip" href="#/product/${p.id}">
                    <img src="${p.image}" alt="${esc(p.imageAlt)}" />
                    <span><span class="n">${esc(p.name)}</span><br /><span class="p">${fmt(priceOf(p))}</span></span>
                    <span class="go">→</span>
                  </a>`).join("")}
              </div>
            </div>
          </div>
        </div>
      </div>`;
    detailEl.classList.remove("in");
    requestAnimationFrame(() => detailEl.classList.add("in"));
  };

  $$(".map-marker").forEach((g) => {
    g.addEventListener("click", () => show(g.dataset.origin));
    g.addEventListener("keydown", (e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); show(g.dataset.origin); } });
  });
  show("ecuador");
}

/* 商品卡（首页网格用） */
function productCard(p) {
  const o = getOrigin(p.originId);
  const notes = p.notes.slice(0, 4).map(esc).join("<br />");
  return `
  <article class="product-card" data-id="${p.id}">
    <div class="pc-media" data-flip>
      <img src="${p.image}" alt="${esc(p.imageAlt)}" loading="lazy" />
      <span class="pc-badge">${esc(p.badge)}</span>
      <span class="pc-origin-tag" style="border-color:${o.tone}">${esc(o.name)} ${p.basePct ? p.basePct + "%" : ""}</span>
      <div class="pc-flavor">
        ${radarSVG(p.flavor, { size: 132 })}
        <div class="pc-notes"><div class="t">FLAVOR FILE</div>${notes}</div>
      </div>
    </div>
    <div class="pc-body">
      <div class="pc-kind">${esc(o.en)}</div>
      <h3 class="pc-name">${esc(p.name)} <span class="latin">${esc(p.en)}</span></h3>
      <p class="pc-sub">${esc(p.subtitle)}</p>
      <div class="pc-foot">
        <span class="pc-price">${fmt(priceOf(p))}</span>
        <button class="pc-add" data-add="${p.id}">加入购物车</button>
      </div>
      <div class="flavor-hint-mobile">点击图片查看风味档案 ↑</div>
    </div>
  </article>`;
}

/* 商品卡交互（雷达图悬停 / 移动端翻转 / 快速加购） */
function initCardInteractions(root) {
  const coarse = window.matchMedia("(pointer: coarse)").matches;
  $$(".product-card", root).forEach((card) => {
    const media = $("[data-flip]", card);
    if (coarse) media.addEventListener("click", (e) => {
      if (e.target.closest("[data-add]")) return;
      $$(".product-card.flipped", root).forEach((c) => c !== card && c.classList.remove("flipped"));
      card.classList.toggle("flipped");
    });
    else media.addEventListener("click", () => { location.hash = `#/product/${card.dataset.id}`; });

    const add = $("[data-add]", card);
    add?.addEventListener("click", (e) => {
      e.stopPropagation();
      const p = getProduct(add.dataset.add);
      addProduct({ product: p, pctIdx: 0, packId: packsOf(p)[0].id, qty: 1, giftWrap: false });
      toast(`已加入：${p.name} · ${fmt(priceOf(p))}`);
    });
  });
}

/* ============================================================
   商品详情
   ============================================================ */
export function renderProduct(root, id) {
  const p = getProduct(id);
  if (!p) { root.innerHTML = `<div class="wrap" style="padding:80px 0;text-align:center">未找到该商品。<br /><br /><a class="btn ghost" href="#/">返回首页</a></div>`; return; }
  const o = getOrigin(p.originId);
  const photo = ORIGIN_PHOTOS[o.id];
  const packs = packsOf(p);
  const gallery = [
    { src: p.image, alt: p.imageAlt },
    { src: photo.file, alt: photo.alt },
    { src: "assets/img/chunks-board.jpg", alt: "工作室的巧克力案板" },
  ];

  root.innerHTML = `
  <div class="wrap">
    <nav class="crumbs"><a href="#/">首页</a> / <a href="#shop">全部风味</a> / <span>${esc(p.name)}</span></nav>
    <div class="pd-grid">
      <div class="pd-gallery">
        <div class="pd-photo">
          <svg class="pd-sidebadge" viewBox="0 0 120 120" style="color:var(--gold)"><use href="#sym-postmark"/></svg>
          <div class="stamp-edge"><img id="pdMainImg" src="${gallery[0].src}" alt="${esc(gallery[0].alt)}" /></div>
        </div>
        <div class="pd-thumbs">
          ${gallery.map((g, i) => `<div class="stamp-edge${i === 0 ? " active" : ""}" data-thumb="${i}"><img src="${g.src}" alt="${esc(g.alt)}" /></div>`).join("")}
        </div>
      </div>

      <div class="pd-info">
        <a class="origin-link" href="#origins" title="查看产地档案">◎ 产地 · ${esc(o.name)} — ${esc(o.estate)}</a>
        <h1 class="pd-title">${esc(p.name)}</h1>
        <div class="pd-en">${esc(p.en)} · SINGLE ESTATE</div>
        <p class="pd-sub">${esc(p.subtitle)} · ${esc(p.ingredients.split("、")[0])}</p>

        <div class="pd-price-row">
          <span class="pd-price" id="pdPrice">${fmt(priceOf(p))}</span>
          <span class="pd-price-note">/ 50g · 冷链发货 · ${esc(SHIPPING_NOTE)}</span>
        </div>

        ${p.basePct ? `
        <div class="opt-block">
          <div class="opt-label"><span>可可含量 COCOA %</span><span class="chosen" id="pctChosen"></span></div>
          <div class="pct-chips" id="pctChips">
            ${p.pctOptions.map((opt, i) => `
              <button class="pct-chip${i === 0 ? " selected" : ""}" data-pct="${i}">
                <div class="pc">${opt.pct ?? "—"}</div>
                <div class="lb">${esc(opt.label || (opt.delta === 0 ? "经典比例" : opt.delta > 0 ? "更浓郁" : "更柔顺"))}</div>
              </button>`).join("")}
          </div>
        </div>` : ""}

        <div class="opt-block">
          <div class="opt-label"><span>包装规格 PACKING</span><span class="chosen" id="packChosen"></span></div>
          <div class="opt-rows" id="packRows">
            ${packs.map((pk, i) => `
              <button class="opt${i === 0 ? " selected" : ""}" data-pack="${pk.id}">
                <span><span class="o-name">${esc(pk.label)}</span><span class="o-desc">${esc(pk.desc)}</span></span>
                <span class="o-price" data-packprice="${pk.id}">${fmt(priceOf(p, 0, pk.id))}</span>
              </button>`).join("")}
          </div>
        </div>

        <div class="opt-block">
          <div class="opt-label"><span>礼盒组合 GIFTING</span></div>
          <div class="opt-rows" id="giftRows">
            <button class="opt selected" data-gift="none">
              <span><span class="o-name">散装寄出</span><span class="o-desc">产地明信片一枚随附</span></span><span class="o-price">+¥0</span>
            </button>
            <button class="opt" data-gift="wrap">
              <span><span class="o-name">单产地礼盒</span><span class="o-desc">深绿礼盒 · 金缎带 · 手写贺卡</span></span><span class="o-price">+¥15</span>
            </button>
            <button class="opt" data-gift="atelier">
              <span><span class="o-name">去礼盒工坊自组</span><span class="o-desc">混合六产地口味 · 实时计价</span></span><span class="o-price">→</span>
            </button>
          </div>
        </div>

        <div class="pd-radar-box">
          ${radarSVG(p.flavor, { size: 126, onLight: true })}
          <div class="pd-radar-meta">
            <div class="t">FLAVOR PROFILE · 风味档案</div>
            酸度 <b>${p.flavor.acid}</b> · 苦度 <b>${p.flavor.bitter}</b> · 果香 <b>${p.flavor.fruit}</b> · 坚果香 <b>${p.flavor.nut}</b><br />
            风味签：<b>${esc(p.notes.join(" / "))}</b>
          </div>
        </div>

        <div class="pd-actions">
          <div class="qty-ctl">
            <button id="pdMinus" aria-label="减少数量">−</button>
            <output id="pdQty">1</output>
            <button id="pdPlus" aria-label="增加数量">＋</button>
          </div>
          <button class="btn" id="pdAdd">加入购物车 · <span id="pdAddPrice">${fmt(priceOf(p))}</span></button>
          <a class="btn ghost" href="#/giftbox">自组礼盒</a>
        </div>

        <div class="pd-story">${esc(o.story)}</div>
        <p class="pd-pairing">品鉴建议 — ${esc(p.pairing)}</p>
        <p class="pd-ingredients">配料：${esc(p.ingredients)} · 净含量见包装规格 · 请存放于 16–18℃ 阴凉处</p>

        <a class="pd-origin-strip" href="#origins">
          <div class="txt"><b>打开地图，查看「${esc(o.name)}」的完整档案</b>${esc(o.estate)} · ${esc(o.notes.join(" · "))}</div>
          <span style="font-size:20px;color:var(--gold-bright)">→</span>
        </a>
      </div>
    </div>
  </div>`;

  /* 详情页状态 */
  const st = { pctIdx: 0, packId: packs[0].id, giftWrap: false, qty: 1 };
  const priceEl = $("#pdPrice"), addPriceEl = $("#pdAddPrice");

  const update = () => {
    const unit = priceOf(p, st.pctIdx, st.packId) + (st.giftWrap ? 15 : 0);
    priceEl.textContent = fmt(unit);
    addPriceEl.textContent = fmt(unit * st.qty);
    const pctOpt = p.pctOptions[st.pctIdx];
    $("#pctChosen").textContent = pctOpt && pctOpt.pct ? `已选 ${pctOpt.pct}%` : "";
    $("#packChosen").textContent = "已选 " + (packs.find((x) => x.id === st.packId)?.label || "");
  };

  $$("#pctChips .pct-chip").forEach((chip) => chip.addEventListener("click", () => {
    st.pctIdx = +chip.dataset.pct;
    $$("#pctChips .pct-chip").forEach((c) => c.classList.toggle("selected", c === chip));
    update();
  }));
  $$("#packRows .opt").forEach((row) => row.addEventListener("click", () => {
    st.packId = row.dataset.pack;
    $$("#packRows .opt").forEach((r) => r.classList.toggle("selected", r === row));
    update();
  }));
  $$("#giftRows .opt").forEach((row) => row.addEventListener("click", () => {
    if (row.dataset.gift === "atelier") { location.hash = "#/giftbox"; return; }
    st.giftWrap = row.dataset.gift === "wrap";
    $$("#giftRows .opt").forEach((r) => r.classList.toggle("selected", r === row));
    update();
  }));
  $("#pdMinus").addEventListener("click", () => { st.qty = Math.max(1, st.qty - 1); $("#pdQty").textContent = st.qty; update(); });
  $("#pdPlus").addEventListener("click", () => { st.qty = Math.min(99, st.qty + 1); $("#pdQty").textContent = st.qty; update(); });
  $("#pdAdd").addEventListener("click", () => {
    addProduct({ product: p, pctIdx: st.pctIdx, packId: st.packId, qty: st.qty, giftWrap: st.giftWrap });
    toast(`已加入：${p.name} × ${st.qty}`);
  });
  $$(".pd-thumbs .stamp-edge").forEach((t) => t.addEventListener("click", () => {
    const i = +t.dataset.thumb;
    $("#pdMainImg").src = gallery[i].src;
    $("#pdMainImg").alt = gallery[i].alt;
    $$(".pd-thumbs .stamp-edge").forEach((x) => x.classList.toggle("active", x === t));
  }));
  update();
}

/* ============================================================
   自组礼盒工坊
   ============================================================ */
const gbState = { boxId: "g6", pieces: [], cardOn: false, cardStyle: "botanic", cardMsg: "" };

export function renderGiftbox(root) {
  root.innerHTML = `
  <section class="gift-hero">
    <div class="wrap" style="padding-top:clamp(40px,6vw,70px);padding-bottom:clamp(46px,6vw,70px)">
      <div class="gift-head">
        <div>
          <span class="eyebrow" style="color:var(--gold-bright)">THE ATELIER · 礼盒工坊</span>
          <h2 style="margin-top:14px">组装第九号礼盒</h2>
          <p>把口味块拖进格子（或直接点击口味块），数量与总价实时更新；满盒自动 95 折。</p>
        </div>
        <svg viewBox="0 0 120 120" style="width:92px;color:var(--gold-bright)"><use href="#sym-seal"/></svg>
      </div>

      <div class="gift-layout">
        <!-- 左：盒型 + 口味货架 -->
        <div>
          <div class="flavor-shelf-label" style="margin-top:0">STEP I · 挑选盒型</div>
          <div class="gift-config">
            <div class="gift-box-picker">
              ${GIFTBOX.boxes.map((b) => `
                <button class="gift-box-opt${b.id === gbState.boxId ? " selected" : ""}" data-box="${b.id}">
                  <span class="gb-name">${esc(b.name)}</span>
                  <span class="gb-desc">${esc(b.desc)}</span>
                  <span class="gb-fee">盒费 ${fmt(b.boxFee)}</span>
                </button>`).join("")}
            </div>
          </div>

          <div class="flavor-shelf-label">STEP II · 拖入口味（点击也可加入）</div>
          <div class="flavor-shelf" id="flavorShelf">
            ${GIFTBOX.flavors.map((f) => `
              <div class="flavor-tile" data-flavor="${f.id}" title="${esc(f.name)} — 拖入礼盒或点击加入">
                <span class="flavor-swatch" style="background:${flavorTone(f, ORIGINS)}">${flavorInitial(f)}</span>
                <span><span class="ft-name">${esc(f.name)}</span><br /><span class="ft-note">${esc(f.note)}</span></span>
                <span class="ft-price">${fmt(f.piecePrice)}</span>
              </div>`).join("")}
          </div>
          <p class="gift-tip">· 按住口味块拖到右侧礼盒 · 手机可直接点击 ·</p>
        </div>

        <!-- 右：礼盒舞台 -->
        <div class="giftbox-stage">
          <div class="box-visual">
            <span class="box-ribbon">ORIGIN No.9 · HAND-PICKED</span>
            <div class="box-slots" id="boxSlots"></div>
            <div class="box-count" id="boxCount"></div>
          </div>
          <div class="gift-config" style="margin-top:16px">
            <div id="giftSummary"></div>
            <button class="btn gold gift-add-btn" id="giftAddBtn">加入购物车</button>
          </div>
        </div>
      </div>
    </div>
  </section>`;

  const slotsEl = $("#boxSlots");
  const countEl = $("#boxCount");
  const sumEl = $("#giftSummary");

  function calc() { return giftboxTotal(gbState.boxId, gbState.pieces); }

  function renderSlots() {
    const box = calc().box;
    slotsEl.className = `box-slots c${box.slots}`;
    let html = "";
    for (let i = 0; i < box.slots; i++) {
      const fid = gbState.pieces[i];
      if (fid) {
        const f = GIFTBOX.flavors.find((x) => x.id === fid);
        html += `<div class="slot filled" data-slot="${i}" title="点击移除 ${esc(f.name)}">
          <span class="no">${i + 1}</span>
          <span class="piece"><span class="sw" style="background:${flavorTone(f, ORIGINS)}">${flavorInitial(f)}</span></span>
          <button class="rm" aria-label="移除">✕</button>
        </div>`;
      } else {
        html += `<div class="slot" data-slot="${i}"><span class="no">${i + 1}</span></div>`;
      }
    }
    slotsEl.innerHTML = html;
    const t = calc();
    countEl.className = "box-count" + (t.full ? " full" : "");
    countEl.innerHTML = t.full
      ? `<span>满盒达成 · 95 折生效</span><b>${gbState.pieces.length} / ${box.slots}</b>`
      : `<span>已放入</span><b>${gbState.pieces.length} / ${box.slots}</b>`;

    sumEl.innerHTML = `
      <div class="gs-row"><span>${esc(box.name)}（含盒 · 缎带 · 内衬）</span><span>${fmt(box.boxFee)}</span></div>
      <div class="gs-row"><span>口味块 × ${gbState.pieces.length}</span><span>${fmt(t.piecesSum)}</span></div>
      ${t.discount ? `<div class="gs-row gs-discount"><span>满盒 95 折</span><span>−${fmt(t.discount)}</span></div>` : ""}
      <div class="gs-row total"><span>礼盒合计</span><b id="gbTotal">${fmt(t.total)}</b></div>`;
    $("#giftAddBtn").disabled = gbState.pieces.length === 0;
    $("#giftAddBtn").textContent = gbState.pieces.length === 0 ? "先放入至少一块口味" : `加入购物车 · ${fmt(t.total)}`;
  }

  function addPiece(fid) {
    const box = calc().box;
    if (gbState.pieces.length >= box.slots) { toast("盒子已经满了——换更大的盒型，或先移出一块。"); return; }
    gbState.pieces.push(fid);
    renderSlots();
    const totalEl = $("#gbTotal");
    if (totalEl) countUp(totalEl, calc().total);
  }
  function removeAt(i) { gbState.pieces.splice(i, 1); renderSlots(); }

  /* 盒型切换 */
  $$(".gift-box-opt").forEach((b) => b.addEventListener("click", () => {
    gbState.boxId = b.dataset.box;
    const box = calc().box;
    gbState.pieces = gbState.pieces.slice(0, box.slots);
    $$(".gift-box-opt").forEach((x) => x.classList.toggle("selected", x === b));
    renderSlots();
  }));

  /* 点击加块 / 槽位置移除 */
  $$("#flavorShelf .flavor-tile").forEach((tile) => {
    tile.addEventListener("click", () => addPiece(tile.dataset.flavor));
  });
  slotsEl.addEventListener("click", (e) => {
    const rm = e.target.closest(".rm");
    const slot = e.target.closest(".slot");
    if (!slot) return;
    removeAt(+slot.dataset.slot);
  });

  /* 拖拽（pointer events，兼容触屏） */
  let drag = null;
  const shelf = $("#flavorShelf");
  shelf.addEventListener("pointerdown", (e) => {
    const tile = e.target.closest(".flavor-tile");
    if (!tile) return;
    e.preventDefault();
    const f = GIFTBOX.flavors.find((x) => x.id === tile.dataset.flavor);
    const ghost = document.createElement("div");
    ghost.className = "drag-ghost";
    ghost.innerHTML = `<span class="flavor-swatch" style="background:${flavorTone(f, ORIGINS)}">${flavorInitial(f)}</span>`;
    document.body.appendChild(ghost);
    drag = { fid: f.id, ghost, hot: null };
    moveGhost(e.clientX, e.clientY);
  });
  function moveGhost(x, y) {
    drag.ghost.style.left = x + "px";
    drag.ghost.style.top = y + "px";
    const el = document.elementFromPoint(x, y);
    const slot = el && el.closest(".slot");
    if (drag.hot && drag.hot !== slot) drag.hot.classList.remove("hot");
    if (slot && !slot.classList.contains("filled")) { slot.classList.add("hot"); drag.hot = slot; }
    else drag.hot = null;
  }
  window.addEventListener("pointermove", (e) => { if (drag) moveGhost(e.clientX, e.clientY); });
  window.addEventListener("pointerup", (e) => {
    if (!drag) return;
    const slot = drag.hot;
    drag.ghost.remove();
    if (slot) {
      const idx = +slot.dataset.slot;
      const box = calc().box;
      if (idx < box.slots) {
        if (gbState.pieces[idx]) { toast("这一格已经放了口味。"); }
        else {
          gbState.pieces[idx] = drag.fid;
          renderSlots();
        }
      }
    }
    drag = null;
  });

  $("#giftAddBtn").addEventListener("click", () => {
    if (!gbState.pieces.length) return;
    const t = calc();
    addGiftbox({ boxId: gbState.boxId, pieces: [...gbState.pieces], card: null });
    toast(`礼盒已加入：${t.box.name} · ${fmt(t.total)}${t.discount ? "（已含满盒 95 折）" : ""}`);
    gbState.pieces = [];
    renderSlots();
  });

  renderSlots();
}

/* ============================================================
   购物车抽屉
   ============================================================ */
export function renderCartDrawer() {
  const itemsEl = $("#cartItems");
  const footEl = $("#cartFoot");
  const cart = getCart();
  const n = cartCount();

  $("#cartTitle").textContent = n ? `购物车（${n} 件）` : "购物车";
  const badge = $("#cartBadge");
  const had = badge.classList.contains("show");
  badge.textContent = n;
  badge.classList.toggle("show", n > 0);
  if (!had && n > 0) { badge.classList.remove("pop"); void badge.offsetWidth; badge.classList.add("pop"); }

  if (!cart.items.length) {
    itemsEl.innerHTML = `<div class="cd-empty">
      <svg viewBox="0 0 120 120" style="width:84px;margin:0 auto 18px;display:block;color:var(--gold)"><use href="#sym-giftbox"/></svg>
      <span class="latin">YOUR BOX IS EMPTY</span>
      盒子还空着。去产地地图挑一块土地，<br />或直接去礼盒工坊拖几块口味。
      <div style="margin-top:22px"><a class="btn ghost" href="#shop" data-close-cart>去挑一块巧克力</a></div>
    </div>`;
    footEl.innerHTML = "";
    return;
  }

  itemsEl.innerHTML = cart.items.map((it) => {
    if (it.kind === "product") {
      const p = getProduct(it.productId);
      const pack = packsOf(p).find((x) => x.id === it.packId);
      return `<div class="cd-item">
        <img src="${p.image}" alt="${esc(p.imageAlt)}" />
        <div>
          <div class="ci-name">${esc(p.name)}</div>
          <div class="ci-meta">${it.pct ? it.pct + "%" : "—"} · ${esc(pack?.label || "")}${it.giftWrap ? " · 礼盒缎带" : ""}</div>
          <div class="ci-controls">
            <div class="qty-ctl">
              <button data-dec="${it.key}">−</button><output>${it.qty}</output><button data-inc="${it.key}">＋</button>
            </div>
            <button class="del" data-del="${it.key}">移除</button>
          </div>
        </div>
        <div class="ci-price">${fmt(it.unit * it.qty)}</div>
      </div>`;
    }
    const box = GIFTBOX.boxes.find((b) => b.id === it.boxId);
    return `<div class="cd-item">
      <span class="ci-giftthumb"><svg viewBox="0 0 48 48" style="color:var(--gold-bright)"><use href="#sym-giftbox"/></svg></span>
      <div>
        <div class="ci-name">自组礼盒 · ${esc(box.name)}</div>
        <div class="ci-meta">${it.pieces.map((pid) => GIFTBOX.flavors.find((f) => f.id === pid)?.name).filter(Boolean).join(" · ")}</div>
        <div class="ci-controls">
          <div class="qty-ctl"><button data-dec="${it.key}">−</button><output>${it.qty}</output><button data-inc="${it.key}">＋</button></div>
          <button class="del" data-del="${it.key}">移除</button>
        </div>
      </div>
      <div class="ci-price">${fmt(it.unit * it.qty)}${it.saved ? `<small>已省 ${fmt(it.saved * it.qty)}</small>` : ""}</div>
    </div>`;
  }).join("") + `
    <div class="gift-card-section${getCart().giftCard.message || getCart().giftCard._open ? " open" : ""}" id="gcSection">
      <div class="gc-head" id="gcToggle">
        <span class="t">✎ 附件：手写贺卡<span style="color:var(--gold)">（可选）</span></span>
        <span class="arrow">▾</span>
      </div>
      <div class="gc-body">
        <div class="gc-style-row">
          ${CARD_STYLES.map((c) => `<button class="gc-style${getCart().giftCard.styleId === c.id ? " selected" : ""}" data-style="${c.id}"><b>${esc(c.name)}</b>${esc(c.desc)}</button>`).join("")}
        </div>
        <textarea id="gcMsg" maxlength="120" placeholder="写给收礼的人……（将于确认页随订单模拟寄出）">${esc(getCart().giftCard.message)}</textarea>
        <div class="gc-count"><span id="gcCount">${getCart().giftCard.message.length}</span> / 120</div>
      </div>
    </div>`;

  const sub = cartSubtotal();
  const remain = SITE.freeShipThreshold - sub;
  footEl.innerHTML = `
    <div class="cd-subrow"><span>小计</span><span>${fmt(sub)}</span></div>
    <div class="cd-subrow total"><span>合计（运费结算页确认）</span><b>${fmt(sub)}</b></div>
    <p class="cd-shipnote">${sub >= SITE.freeShipThreshold ? "✓ 已达顺丰冷链包邮门槛" : `还差 ${fmt(remain)} 即享顺丰冷链包邮`} · ${esc(SHIPPING_NOTE)}</p>
    <button class="btn cd-checkout" id="goCheckout">去结算 · 模拟下单 →</button>`;

  /* 事件 */
  $$("#cartItems [data-inc]").forEach((b) => b.addEventListener("click", () => {
    const it = getCart().items.find((x) => x.key === b.dataset.inc);
    setQty(b.dataset.inc, it.qty + 1);
  }));
  $$("#cartItems [data-dec]").forEach((b) => b.addEventListener("click", () => {
    const it = getCart().items.find((x) => x.key === b.dataset.dec);
    setQty(b.dataset.dec, it.qty - 1);
  }));
  $$("#cartItems [data-del]").forEach((b) => b.addEventListener("click", () => removeItem(b.dataset.del)));

  const gc = $("#gcSection");
  $("#gcToggle").addEventListener("click", () => {
    gc.classList.toggle("open");
    getCart().giftCard._open = gc.classList.contains("open");
  });
  $$(".gc-style", gc).forEach((s) => s.addEventListener("click", () => {
    $$(".gc-style", gc).forEach((x) => x.classList.toggle("selected", x === s));
    setGiftCard({ styleId: s.dataset.style });
  }));
  const msg = $("#gcMsg");
  msg.addEventListener("input", () => {
    $("#gcCount").textContent = msg.value.length;
    setGiftCard({ message: msg.value });
  });
  $("#goCheckout")?.addEventListener("click", () => { closeCart(); location.hash = "#/checkout"; });
  $$("[data-close-cart]").forEach((a) => a.addEventListener("click", closeCart));
}

/* ============================================================
   结算（模拟）
   ============================================================ */
const coState = { step: 1, ship: "cold", pay: "wechat", done: false };
const SHIP_OPTIONS = [
  { id: "cold", name: "顺丰冷链 · 隔日达", desc: "冰袋 + 保温袋，适合巧克力长途", fee: SITE.shippingFee + 8 },
  { id: "std", name: "标准快递 · 3–5 天", desc: "气温低于 20℃ 时可选", fee: SITE.shippingFee },
  { id: "pickup", name: "工作室自取", desc: "永嘉路九号 · 周三至周日", fee: 0 },
];
const PAY_OPTIONS = [
  { id: "wechat", name: "微信支付", desc: "模拟 · 不会真实扣款", mark: "WX" },
  { id: "alipay", name: "支付宝", desc: "模拟 · 不会真实扣款", mark: "ALI" },
  { id: "card", name: "银行卡（演示）", desc: "模拟 · 不会真实扣款", mark: "CARD" },
];

export function renderCheckout(root) {
  const cart = getCart();
  if (!cart.items.length) {
    root.innerHTML = `<div class="wrap co-success">
      <svg class="seal-big" viewBox="0 0 120 120" style="color:var(--gold)"><use href="#sym-seal"/></svg>
      <h2>购物车是空的</h2>
      <p>先去挑一块土地的味道，再回来结算。</p>
      <div class="success-actions"><a class="btn" href="#shop">去挑巧克力</a></div>
    </div>`;
    return;
  }
  coState.done = false;

  root.innerHTML = `
  <div class="wrap" style="padding-top:30px;padding-bottom:70px">
    <nav class="crumbs"><a href="#/">首页</a> / <span>模拟结算</span></nav>
    <div class="checkout-grid">
      <div class="co-panel">
        <div class="co-steps" id="coSteps">
          ${["收礼信息", "配送方式", "模拟支付"].map((s, i) => `
            <div class="co-step${i === 0 ? " active" : ""}" data-step="${i + 1}"><span class="no">${["I", "II", "III"][i]}</span>${s}</div>`).join("")}
        </div>
        <div id="coBody"></div>
        <div class="co-nav">
          <button class="btn ghost" id="coPrev">← 上一步</button>
          <button class="btn gold" id="coNext">下一步 →</button>
        </div>
      </div>
      <div class="co-summary">
        <div class="co-panel" id="coSummaryPanel"></div>
      </div>
    </div>
  </div>`;

  const body = $("#coBody");
  const form = {
    name: "", phone: "", to: "",
    addr: "", city: "上海", zip: "",
  };

  function stepBody() {
    if (coState.step === 1) return `
      <h3 style="letter-spacing:.2em;margin-bottom:18px">收礼信息</h3>
      <div class="form-grid">
        <div class="form-field"><label>你的称呼 *</label><input id="fName" placeholder="例：林女士" value="${esc(form.name)}" /></div>
        <div class="form-field"><label>手机号 *</label><input id="fPhone" placeholder="13x xxxx xxxx（演示不发送）" value="${esc(form.phone)}" /></div>
        <div class="form-field full"><label>贺卡落款 / 收礼人称呼</label><input id="fTo" placeholder="例：给阿九 —— 来自第一块巧克力的债主" value="${esc(form.to)}" /></div>
      </div>
      ${cart.giftCard.message ? `<div class="co-cardline"><span class="t">贺卡内容预览</span>「${esc(cart.giftCard.message)}」</div>
        <p style="font-size:12px;color:var(--ink-faint);margin-top:8px">要修改贺卡请回到购物车抽屉。</p>`
        : `<p style="font-size:12.5px;color:var(--ink-faint);margin-top:14px">尚未填写贺卡。可在购物车抽屉中补写，或在礼盒工坊随盒附赠。</p>`}
    `;
    if (coState.step === 2) return `
      <h3 style="letter-spacing:.2em;margin-bottom:18px">配送方式</h3>
      <div class="ship-options">
        ${SHIP_OPTIONS.map((s) => `
          <label class="ship-opt${coState.ship === s.id ? " selected" : ""}" data-ship="${s.id}">
            <span><span class="so-name">${esc(s.name)}</span><span class="so-desc">${esc(s.desc)}</span></span>
            <span class="so-price">${s.fee ? fmt(s.fee) : "免费"}</span>
          </label>`).join("")}
      </div>
      <h3 style="letter-spacing:.2em;margin:26px 0 14px">收货地址${coState.ship === "pickup" ? "（自取可留空）" : ""}</h3>
      <div class="form-grid">
        <div class="form-field full"><label>地址 ${coState.ship === "pickup" ? "" : "*"}</label><input id="fAddr" placeholder="例：徐汇区永嘉路 9 弄 9 号" value="${esc(form.addr)}" ${coState.ship === "pickup" ? "" : ""} /></div>
        <div class="form-field"><label>城市</label><input id="fCity" value="${esc(form.city)}" /></div>
        <div class="form-field"><label>邮编（可选）</label><input id="fZip" value="${esc(form.zip)}" /></div>
      </div>
    `;
    return `
      <h3 style="letter-spacing:.2em;margin-bottom:6px">模拟支付</h3>
      <p style="font-size:12.5px;color:var(--ink-faint);margin-bottom:16px">这是一个演示站点——任何「支付」都不会真实发生。</p>
      <div class="pay-options">
        ${PAY_OPTIONS.map((p2) => `
          <label class="pay-opt${coState.pay === p2.id ? " selected" : ""}" data-pay="${p2.id}">
            <span class="mark">${p2.mark}</span>
            <span><span class="po-name">${esc(p2.name)}</span><br /><span class="po-desc">${esc(p2.desc)}</span></span>
          </label>`).join("")}
      </div>
      <div class="co-cardline" style="margin-top:18px">
        <span class="t">订单将包含</span>
        ${cart.items.length} 件商品${cart.giftCard.message ? " · 手写贺卡一张" : ""} · ${esc(SHIP_OPTIONS.find((s) => s.id === coState.ship).name)}
      </div>
    `;
  }

  function renderSummary() {
    const sub = cartSubtotal();
    const ship = shippingFor(sub, coState.ship);
    const total = sub + ship;
    $("#coSummaryPanel").innerHTML = `
      <div class="cos-title">ORDER · 订单摘要</div>
      ${cart.items.map((it) => {
        if (it.kind === "product") {
          const p = getProduct(it.productId);
          return `<div class="cos-item"><img src="${p.image}" alt="" /><span><span class="nm">${esc(p.name)} × ${it.qty}</span><span class="mt">${it.pct ? it.pct + "% · " : ""}${esc(packsOf(p).find((x) => x.id === it.packId)?.label || "")}</span></span><span class="pr">${fmt(it.unit * it.qty)}</span></div>`;
        }
        const box = GIFTBOX.boxes.find((b) => b.id === it.boxId);
        return `<div class="cos-item"><span class="ci-giftthumb" style="width:46px;height:46px"><svg viewBox="0 0 48 48" style="color:var(--gold-bright)"><use href="#sym-giftbox"/></svg></span><span><span class="nm">自组礼盒 × ${it.qty}</span><span class="mt">${it.pieces.length} 块 · ${esc(box.name)}</span></span><span class="pr">${fmt(it.unit * it.qty)}</span></div>`;
      }).join("")}
      <div class="cos-rows">
        <div class="gs-row"><span>小计</span><span>${fmt(sub)}</span></div>
        <div class="gs-row"><span>运费（${esc(SHIP_OPTIONS.find((s) => s.id === coState.ship).name)}）</span><span>${ship ? fmt(ship) : "免费"}</span></div>
        <div class="gs-row total"><span>应付</span><b>${fmt(total)}</b></div>
      </div>
      ${cart.giftCard.message ? `<div class="co-cardline"><span class="t">贺卡 · ${esc(CARD_STYLES.find((c) => c.id === cart.giftCard.styleId)?.name || "")}</span>「${esc(cart.giftCard.message)}」</div>` : ""}
    `;
  }

  function goto(step) { coState.step = step; draw(); }

  function draw() {
    $$("#coSteps .co-step").forEach((s) => {
      const n = +s.dataset.step;
      s.classList.toggle("active", n === coState.step);
      s.classList.toggle("done", n < coState.step);
    });
    body.innerHTML = stepBody();
    $("#coPrev").disabled = coState.step === 1;
    $("#coNext").textContent = coState.step === 3 ? "确认支付（模拟）" : "下一步 →";
    renderSummary();

    if (coState.step === 2) {
      $$("[data-ship]").forEach((s) => s.addEventListener("click", () => {
        coState.ship = s.dataset.ship;
        $$("[data-ship]").forEach((x) => x.classList.toggle("selected", x === s));
        renderSummary();
      }));
      bindInputs();
    }
    if (coState.step === 3) {
      $$("[data-pay]").forEach((s) => s.addEventListener("click", () => {
        coState.pay = s.dataset.pay;
        $$("[data-pay]").forEach((x) => x.classList.toggle("selected", x === s));
      }));
    }
  }

  function bindInputs() {
    const map = { fName: "name", fPhone: "phone", fTo: "to", fAddr: "addr", fCity: "city", fZip: "zip" };
    Object.entries(map).forEach(([id, k]) => {
      const el = document.getElementById(id);
      if (el) el.addEventListener("input", () => { form[k] = el.value; });
    });
  }

  function validate() {
    if (coState.step === 1) {
      const name = $("#fName")?.value.trim(), phone = $("#fPhone")?.value.trim();
      if (!name || !phone) { toast("请先填写称呼与手机号（演示信息不会发送）。"); return false; }
      form.name = name; form.phone = phone; form.to = $("#fTo")?.value.trim() || "";
    }
    if (coState.step === 2 && coState.ship !== "pickup") {
      const addr = $("#fAddr")?.value.trim();
      if (!addr) { toast("请填写收货地址，或改为工作室自取。"); return false; }
      form.addr = addr; form.city = $("#fCity")?.value.trim() || "上海"; form.zip = $("#fZip")?.value.trim();
    }
    return true;
  }

  $("#coPrev").addEventListener("click", () => coState.step > 1 && goto(coState.step - 1));
  $("#coNext").addEventListener("click", () => {
    if (!validate()) return;
    if (coState.step < 3) { goto(coState.step + 1); return; }
    /* 模拟支付成功 */
    const no = "O9-" + Date.now().toString(36).toUpperCase().slice(-6) + "-" + String(Math.floor(Math.random() * 900) + 100);
    const order = {
      no,
      total: cartSubtotal() + shippingFor(cartSubtotal(), coState.ship),
      items: cart.items.length,
      card: cart.giftCard.message || null,
      ship: SHIP_OPTIONS.find((s) => s.id === coState.ship).name,
    };
    sessionStorage.setItem("origin9.lastOrder", JSON.stringify(order));
    clearCart();
    location.hash = "#/success/" + no;
  });

  draw();
}

/* ============================================================
   支付成功
   ============================================================ */
export function renderSuccess(root, no) {
  let order = null;
  try { order = JSON.parse(sessionStorage.getItem("origin9.lastOrder") || "null"); } catch { /* noop */ }
  root.innerHTML = `
  <div class="wrap co-success">
    <svg class="seal-big" viewBox="0 0 120 120" style="color:var(--gold)"><use href="#sym-seal"/></svg>
    <span class="eyebrow" style="margin-bottom:14px">ORDER CONFIRMED · 模拟完成</span>
    <h2>第九封信已经寄出。</h2>
    <div class="success-no">NO. ${esc(no || order?.no || "O9-DEMO-000")}</div>
    <p>
      这是一次<b>模拟结算</b>：没有真实扣款，也没有真实的巧克力在路上了（很遗憾）。
      ${order ? `订单含 ${order.items} 件商品 · ${esc(order.ship)} · 合计 ${fmt(order.total)}。` : ""}
      ${order?.card ? `贺卡「${esc(order.card)}」将由工作室的林九先生手写誊抄（虚构）。` : "下次记得写一张贺卡——手写体由工作室代笔。"}
    </p>
    <p style="font-size:12.5px;color:var(--ink-faint);margin-top:14px">虚构站点 · 所有数据可在 data.js 中替换为真实商品信息</p>
    <div class="success-actions">
      <a class="btn" href="#shop">继续挑选风味</a>
      <a class="btn ghost" href="#/giftbox">再组一只礼盒</a>
    </div>
  </div>`;
}

/* ============================================================
   滚动进场
   ============================================================ */
export function observeReveals(root = document) {
  const io = new IntersectionObserver((es) => {
    es.forEach((e) => { if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); } });
  }, { threshold: 0.12 });
  $$(".reveal:not(.in)", root).forEach((el) => io.observe(el));
}

/* 购物车抽屉开合 */
export function openCart() { $("#cartDrawer").classList.add("open"); $("#overlay").classList.add("show"); renderCartDrawer(); }
export function closeCart() { $("#cartDrawer").classList.remove("open"); $("#overlay").classList.remove("show"); }
