// 道具类型
export const FUNC_PROP_TYPES = [
  { value: 1, label: '普通道具' },
  { value: 2, label: '红包' },
  { value: 4, label: 'show经验卡' },
  { value: 5, label: '充值返利券' },
  { value: 6, label: '苹果抵扣券' },
  { value: 7, label: '直接生效中' },
  { value: 8, label: '双旦种子' },
  { value: 9, label: '需弹窗道具' },
];

// 苹果抵扣券使用范围
export const COUPON_USE_RANGES = [
  { value: 2, label: '苹果' },
  { value: 3, label: '皮肤' },
  { value: 4, label: '皮肤碎片' },
  { value: 5, label: '击杀效果' },
  { value: 6, label: '击杀效果碎片' },
  { value: 7, label: '道具' },
  { value: 9, label: '礼物' },
  { value: 10, label: '欢乐币' },
  { value: 11, label: '活动道具' },
  { value: 12, label: '头像框' },
  { value: 15, label: '礼包' },
  { value: 17, label: '戒指' },
  { value: 18, label: '拼图' },
  { value: 19, label: '实物奖励' },
  { alue: 21, label: '金豆' },
  { value: 23, label: '银币' },
  { value: 27, label: '气泡' },
  { value: 28, label: '游戏buff' },
  { value: 29, label: '通行币' },
  { value: 30, label: '称号' },
  { value: 31, label: '礼物buff' },
  { value: 33, label: '好运金券' },
  { value: 34, label: '3D奖励' },
  { value: 35, label: '表情' },
];

// 使用限制设置
export const USE_LIMITATION = [
  { value: 0, label: '不限制' },
  { value: 1, label: '永久限用' },
  { value: 2, label: '每日限用' },
  { value: 3, label: '每周限用' },
];

// 购买限制设置
export const BUY_LIMITATION = [
  { value: 0, label: '不限购' },
  { value: 1, label: '永久限购' },
  { value: 2, label: '每日限购' },
  { value: 3, label: '每周限制' },
];

// 需要显示道具效果 propType道具类型
const ABLE_CONFIG_EFFECT = [
  { value: 4, label: 'show经验卡' },
  { value: 5, label: '充值返利券' },
  { value: 6, label: '苹果抵扣券' },
];

// 在ABLE_CONFIG_EFFECT的才显示道具效果配置项
export function OWN_ABLE_CFG_EFFECT(propType) {
  return ABLE_CONFIG_EFFECT.findIndex((item) => item.value === propType) !== -1;
}
