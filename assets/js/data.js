/* =====================================================================
   ORIGIN No.9 · 站点数据总表
   ---------------------------------------------------------------------
   本文件集中管理品牌、产地、商品、礼盒、运费等全部业务数据。
   接入真实商品时，只需替换本文件，无需改动任何页面代码。
   所有产地故事、庄园与人物均为虚构演示内容，不代表真实认证或奖项。
   ===================================================================== */

export const SITE = {
  brand: "ORIGIN No.9",
  brandZh: "九号原产",
  tagline: "一块巧克力，只讲一块土地的事",
  intro:
    "ORIGIN No.9 是一间虚构的单一产地巧克力工作室。我们在全球六个可可带挑选第九号庄园的豆子，小批量烘焙、石磨精炼，把每一块土地的雨水、风向与果实，压进 50 克的巧克力里。",
  foundedYear: 2019,
  atelier: "上海 · 永嘉路九号（虚构地址）",
  currency: "¥",
  freeShipThreshold: 199,
  shippingFee: 12,
  discountRate: 0.95, // 自组礼盒满盒 95 折
  season: "2026 冬季批次",
};

/* 风味雷达图四个维度（0–5） */
export const FLAVOR_AXES = [
  { key: "acid", label: "酸度" },
  { key: "bitter", label: "苦度" },
  { key: "fruit", label: "果香" },
  { key: "nut", label: "坚果香" },
];

/* ------------------------------------------------------------------
   产地（虚构庄园与故事）
   ------------------------------------------------------------------ */
export const ORIGINS = [
  {
    id: "ecuador",
    name: "厄瓜多尔",
    en: "ECUADOR",
    estate: "云雾林第九庄园 · Los Ríos",
    varietal: "Nacional（ arriba nacional 老系）",
    cacaoPct: 72,
    harvest: "每年 4–7 月主收",
    ferment: "香蕉木发酵箱 6 天 · 三次翻堆",
    altitude: "海拔 320 m",
    notes: ["茉莉花香", "红色浆果", "奶油质感"],
    story:
      "虚构故事：庄园主孙女 Alba 接手祖传的 Nacional 老树时，坚持让可可荚在树藤上多晒七天才采收。低地的暖风掠过云雾林边缘，豆子里于是多了一层茉莉花似的尾香。我们每年只从她手上买走 1.2 吨——不到庄园产量的一半。",
    tone: "#C96F3B",
    labelDy: -14,
  },
  {
    id: "madagascar",
    name: "马达加斯加",
    en: "MADAGASCAR",
    estate: "桑巴瓦河谷合作社 · Sambirano",
    varietal: "Criollo 血统红宝石豆",
    cacaoPct: 75,
    harvest: "每年 6–9 月主收",
    ferment: "橡木箱 5 天 · 日晒干燥 10 天",
    altitude: "海拔 85 m",
    notes: ["覆盆子", "柑橘酸芯", "红酒单宁"],
    story:
      "虚构故事：桑巴瓦河在雨季会把河谷淹成一面镜子，咖啡树与可可树共用同一片荫蔽。合作社的 47 户农人坚持手摘仅熟荚，发酵册上记着每一批的温度曲线——像给豆子写日记。这里是六站里果香最放肆的一块土地。",
    tone: "#A93B4A",
  },
  {
    id: "ghana",
    name: "加纳",
    en: "GHANA",
    estate: "阿散蒂高地联合庄园 · Ashanti",
    varietal: "Amelonado Forastero",
    cacaoPct: 70,
    harvest: "每年 10–1 月主收",
    ferment: "编织篮 7 天 · 黑色帆布催熟",
    altitude: "海拔 240 m",
    notes: ["烘焙可可", "烤榛子", "黑糖"],
    story:
      "虚构故事：阿散蒂高地的可可园藏在可乐果树荫下，收获季的清晨，庄员们把豆荚堆成金色的小山。庄园坚持最古典的 Amelonado 豆种，风味端正、浑厚，是一切巧克力的母语——ORIGIN No.9 的第一块排块就来自这里。",
    tone: "#7A4A26",
  },
  {
    id: "peru",
    name: "秘鲁",
    en: "PERU",
    estate: "上瓦亚班巴雨林小农 · San Martín",
    varietal: "Criollo × Trinitario",
    cacaoPct: 85,
    harvest: "每年 3–6 月主收",
    ferment: "梯木架 6 天 · 高地慢干",
    altitude: "海拔 680 m",
    notes: ["乌龙茶感", "无花果", " Minerals 矿石尾韵"],
    story:
      "虚构故事：豆子要从圣马丁的雨林背下山，走两小时骡路才到收购站。十四户小农组了一个没有名字的合作社，只在麻袋上画一颗九角星，那是他们和我们之间的暗号。高地慢干让豆子带着乌龙茶一样的收敛感。",
    tone: "#3F6150",
    labelDy: 20,
  },
  {
    id: "trinidad",
    name: "千里达及托巴哥",
    en: "TRINIDAD & TOBAGO",
    estate: "南海岸老树园 · South Oropouche",
    varietal: "Trinitario 原生老树",
    cacaoPct: 65,
    harvest: "每年 1–5 月主收",
    ferment: "加仑桶 6 天 · 海风干燥",
    altitude: "海拔 30 m",
    notes: ["焦糖", "肉豆蔻", "海风咸鲜"],
    story:
      "虚构故事：这片 Trinitario 老树快一百岁了，树干上挂满附生兰。园主 Noel 会带着访客先听一段钢鼓，再进园采豆——他说豆子和鼓点一样，讲究的是节拍。海风穿过干燥房，给豆子留下一丝不易察觉的咸。",
    tone: "#B08A3E",
  },
  {
    id: "vietnam",
    name: "越南",
    en: "VIETNAM",
    estate: "湄公河果园轮作区 · Tiền Giang",
    varietal: "Trinitario（椰林轮作）",
    cacaoPct: 80,
    harvest: "每年 11–2 月主收",
    ferment: "椰木箱 5 天 · 榴莲园荫干",
    altitude: "海拔 5 m",
    notes: ["椰糖", "烟熏", "热带果干"],
    story:
      "虚构故事：三角洲的农人把可可种在椰林与榴莲园之间，豆子沾着邻近果园的甜。发酵箱用旧椰木钉成，烘豆时屋子里像烧着一场小小的篝火——烟熏与椰糖，是湄公河给这块巧克力的注脚。",
    tone: "#4E6E45",
  },
];

/* ------------------------------------------------------------------
   包装规格与可可含量（价格模型）
   ------------------------------------------------------------------ */
export const PACKAGING = [
  { id: "single", label: "单条 50g", desc: "一张产地明信片 + 单条", factor: 1 },
  { id: "duo", label: "品鉴二重奏 100g", desc: "同产地双条对照装", factor: 1.85 },
  { id: "quartet", label: "庄园四联 200g", desc: "四条装 · 附批次卡片", factor: 3.4 },
];

/* ------------------------------------------------------------------
   商品（虚构定价）
   ------------------------------------------------------------------ */
export const PRODUCTS = [
  {
    id: "ec-72",
    originId: "ecuador",
    name: "云雾林 72",
    en: "NIEBLA No.9",
    subtitle: "厄瓜多尔 Nacional 单源黑巧克力",
    badge: "经典",
    basePrice: 68,
    basePct: 72,
    pctOptions: [
      { pct: 72, delta: 0 },
      { pct: 85, delta: 8, label: "更黑 · 更低糖" },
    ],
    flavor: { acid: 3.5, bitter: 2.5, fruit: 3.5, nut: 2 },
    notes: ["茉莉花", "红浆果", "奶油", "杏仁尾韵"],
    pairing: "配一杯淡烘焙耶加雪菲，或清晨的茉莉花茶。",
    ingredients: "可可豆（厄瓜多尔）、有机蔗糖、可可脂。乳化剂：无。",
    image: "assets/img/bar-parchment.jpg",
    imageAlt: "厄瓜多尔 72% 排块与可可豆",
  },
  {
    id: "mg-75",
    originId: "madagascar",
    name: "桑巴瓦 75",
    en: "SAMBIRANO No.9",
    subtitle: "马达加斯加红果调单源黑巧克力",
    badge: "果香之最",
    basePrice: 78,
    basePct: 75,
    pctOptions: [
      { pct: 75, delta: 0 },
      { pct: 68, delta: -6, label: "更柔 · 更果" },
    ],
    flavor: { acid: 4.5, bitter: 3, fruit: 5, nut: 1 },
    notes: ["覆盆子", "血橙", "红酒单宁", "香草荚"],
    pairing: "像一块能吃的果酱蛋糕——试配基安蒂红酒。",
    ingredients: "可可豆（马达加斯加）、有机蔗糖、可可脂。",
    image: "assets/img/bar-mint.jpg",
    imageAlt: "桑巴瓦 75% 排块堆叠",
  },
  {
    id: "gh-70",
    originId: "ghana",
    name: "阿散蒂 70",
    en: "ASHANTI No.9",
    subtitle: "加纳古典 Forastero 单源黑巧克力",
    badge: "品牌第一块",
    basePrice: 62,
    basePct: 70,
    pctOptions: [
      { pct: 70, delta: 0 },
      { pct: 55, delta: -10, label: "入门 · 顺滑" },
      { pct: 85, delta: 8, label: "深烘 · 浓郁" },
    ],
    flavor: { acid: 2, bitter: 3.5, fruit: 2, nut: 4 },
    notes: ["烤榛子", "黑糖", "焙烤可可", "一点点海盐"],
    pairing: "下班后的一口安慰，配威士忌或纯牛奶。",
    ingredients: "可可豆（加纳）、有机蔗糖、可可脂。",
    image: "assets/img/bar-hazelnut.jpg",
    imageAlt: "阿散蒂 70% 排块与榛子",
  },
  {
    id: "pe-85",
    originId: "peru",
    name: "雨林 85",
    en: "HUAYABAMBA No.9",
    subtitle: "秘鲁高地慢干单源黑巧克力",
    badge: "深黑系列",
    basePrice: 72,
    basePct: 85,
    pctOptions: [
      { pct: 85, delta: 0 },
      { pct: 100, delta: 12, label: "零糖 · 纯豆" },
    ],
    flavor: { acid: 3, bitter: 5, fruit: 2.5, nut: 2.5 },
    notes: ["乌龙茶感", "无花果干", "矿石尾韵", "烟叶"],
    pairing: "给习惯黑咖啡的人。午后，什么都不配。",
    ingredients: "可可豆（秘鲁）、微量有机蔗糖（100% 版无糖）、可可脂。",
    image: "assets/img/chunks-board.jpg",
    imageAlt: "雨林 85% 巧克力切块",
  },
  {
    id: "tt-65",
    originId: "trinidad",
    name: "南海岸 65",
    en: "OROPOUCHE No.9",
    subtitle: "千里达老树 Trinitario 单源巧克力",
    badge: "甜润之选",
    basePrice: 58,
    basePct: 65,
    pctOptions: [
      { pct: 65, delta: 0 },
      { pct: 45, delta: -8, label: "牛乳感 · 轻盈" },
    ],
    flavor: { acid: 2.5, bitter: 2, fruit: 3, nut: 3.5 },
    notes: ["焦糖", "肉豆蔻", "太妃糖", "海风咸鲜"],
    pairing: "给刚入门的朋友。配一杯锡兰红茶最稳。",
    ingredients: "可可豆（千里达）、有机蔗糖、可可脂、全脂乳粉。",
    image: "assets/img/bar-milknut.jpg",
    imageAlt: "南海岸 65% 排块与坚果",
  },
  {
    id: "vn-80",
    originId: "vietnam",
    name: "椰林 80",
    en: "MEKONG No.9",
    subtitle: "越南三角洲椰木烟熏单源黑巧克力",
    badge: "冬季限定",
    basePrice: 66,
    basePct: 80,
    pctOptions: [
      { pct: 80, delta: 0 },
      { pct: 60, delta: -8, label: "更甜润" },
    ],
    flavor: { acid: 3.5, bitter: 4, fruit: 3.5, nut: 2 },
    notes: ["椰糖", "篝火烟熏", "菠萝蜜干", "胡椒微辛"],
    pairing: "冬夜的一块篝火。配椰奶咖啡。",
    ingredients: "可可豆（越南）、椰花糖、可可脂。",
    image: "assets/img/choc-hazelnut.jpg",
    imageAlt: "椰林 80% 排块",
  },
  {
    id: "drink-100",
    originId: "ecuador",
    name: "第九号饮用块",
    en: "DRINKING No.9",
    subtitle: "单源纯可可饮用块 · 罐装 150g",
    badge: "热饮",
    basePrice: 46,
    basePct: 100,
    pctOptions: [{ pct: 100, delta: 0 }],
    packagingId: "drink",
    flavor: { acid: 3, bitter: 4.5, fruit: 2, nut: 3 },
    notes: ["厚可可", "微酸", "烤豆香"],
    pairing: "两块 + 200ml 热牛奶，搅出南美式热可可。",
    ingredients: "可可豆（厄瓜多尔）、可可脂。无糖版可选拆分装。",
    image: "assets/img/drinking-choc.jpg",
    imageAlt: "热可可饮品",
  },
  {
    id: "bonbon-9",
    originId: "madagascar",
    name: "九粒庄园松露",
    en: "NEUF BONBONS",
    subtitle: "六产地夹心松露 · 九粒木盒装",
    badge: "礼盒",
    basePrice: 128,
    basePct: null,
    pctOptions: [{ pct: null, delta: 0 }],
    packagingId: "bonbon",
    flavor: { acid: 3, bitter: 2.5, fruit: 4, nut: 3.5 },
    notes: ["六产地甘纳许", "可可粉外壳", "手工分装"],
    pairing: "一只木盒吃遍六个产地，招待客人零失误。",
    ingredients: "六产地巧克力、稀奶油、可可粉。含乳制品。",
    image: "assets/img/truffles-cups.jpg",
    imageAlt: "九粒庄园松露盒",
  },
];

/* 排块类可用的包装规格 */
export const PACKAGING_BY_TYPE = {
  bar: PACKAGING,
  drink: [
    { id: "tin", label: "单罐 150g", desc: "约 16 块", factor: 1 },
    { id: "tin2", label: "双罐 300g", desc: "送原产地滤网", factor: 1.9 },
  ],
  bonbon: [
    { id: "box9", label: "九粒木盒", desc: "约 130g", factor: 1 },
    { id: "box12", label: "十二粒木盒", desc: "约 175g", factor: 1.32 },
  ],
};

/* ------------------------------------------------------------------
   自组礼盒
   ------------------------------------------------------------------ */
export const GIFTBOX = {
  boxes: [
    { id: "g4", slots: 4, name: "信笺盒 · 4 格", boxFee: 20, desc: "写给一个人的第九封信" },
    { id: "g6", slots: 6, name: "明信片盒 · 6 格", boxFee: 28, desc: "六格刚好吃遍六个产地" },
    { id: "g9", slots: 9, name: "庄园盒 · 9 格", boxFee: 38, desc: "最畅销 · 分享刚好" },
    { id: "g12", slots: 12, name: "巡游盒 · 12 格", boxFee: 48, desc: "一支小型产地巡游" },
  ],
  // 口味块（可拖入礼盒）
  flavors: [
    { id: "f-ec", originId: "ecuador", name: "云雾林 72", piecePrice: 9, note: "茉莉 · 红浆果" },
    { id: "f-mg", originId: "madagascar", name: "桑巴瓦 75", piecePrice: 11, note: "覆盆子酸芯" },
    { id: "f-gh", originId: "ghana", name: "阿散蒂 70", piecePrice: 8, note: "烤榛子 · 黑糖" },
    { id: "f-pe", originId: "peru", name: "雨林 85", piecePrice: 10, note: "乌龙茶感" },
    { id: "f-tt", originId: "trinidad", name: "南海岸 65", piecePrice: 8, note: "焦糖 · 海风" },
    { id: "f-vn", originId: "vietnam", name: "椰林 80", piecePrice: 9, note: "椰糖 · 烟熏" },
    { id: "f-salt", originId: null, name: "海盐大麦", piecePrice: 10, note: "特调 · 焦脆大麦" },
    { id: "f-yuzu", originId: null, name: "焙茶柑橘", piecePrice: 11, note: "特调 · 柚皮焙茶" },
    { id: "f-coffee", originId: null, name: "冷萃咖啡", piecePrice: 10, note: "特调 · 九号拼配豆" },
  ],
};

/* 贺卡款式 */
export const CARD_STYLES = [
  { id: "gold", name: "烫金九角星", desc: "深绿卡纸 · 金箔印制" },
  { id: "botanic", name: "可可植物志", desc: "手绘插画 · 米白卡纸" },
  { id: "plain", name: "素笺", desc: "纯米白 · 极简压痕" },
];

/* 运输提示 */
export const SHIPPING_NOTE = "巧克力怕热，冷链发货，江浙沪隔日达（虚构演示）。";

/* 工具函数 --------------------------------------------------------- */
export const fmt = (n) => "¥" + (Math.round(n * 100) / 100).toString().replace(/\.0+$/, "");

export function getOrigin(id) {
  return ORIGINS.find((o) => o.id === id);
}
export function getProduct(id) {
  return PRODUCTS.find((p) => p.id === id);
}
export function productsOfOrigin(originId) {
  return PRODUCTS.filter((p) => p.originId === originId);
}

/** 计算商品价格：可可含量差价 × 包装倍数 */
export function priceOf(product, pctIdx = 0, packId = null) {
  const pct = product.pctOptions[Math.min(pctIdx, product.pctOptions.length - 1)];
  const packs = product.packagingId
    ? PACKAGING_BY_TYPE[product.packagingId]
    : PACKAGING_BY_TYPE.bar;
  const pack = packs.find((p) => p.id === packId) || packs[0];
  return Math.round((product.basePrice + pct.delta) * pack.factor * 100) / 100;
}

/** 礼盒实时总价 */
export function giftboxTotal(boxId, pieces) {
  const box = GIFTBOX.boxes.find((b) => b.id === boxId) || GIFTBOX.boxes[0];
  const sum = pieces.reduce((acc, pid) => {
    const f = GIFTBOX.flavors.find((x) => x.id === pid);
    return acc + (f ? f.piecePrice : 0);
  }, 0);
  const full = pieces.length === box.slots;
  const subtotal = box.boxFee + sum;
  return {
    box,
    piecesSum: sum,
    subtotal,
    discount: full ? Math.round(subtotal * (1 - SITE.discountRate) * 100) / 100 : 0,
    total: full ? Math.round(subtotal * SITE.discountRate * 100) / 100 : subtotal,
    full,
  };
}

/** 商品详情可用的规格列表 */
export function packsOf(product) {
  return product.packagingId ? PACKAGING_BY_TYPE[product.packagingId] : PACKAGING_BY_TYPE.bar;
}
