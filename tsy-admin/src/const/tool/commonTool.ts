// 稀有度映射
export const WORTH_LEVEL_TYPES = [
  { value: 1, label: '稀有1（C）' },
  { value: 2, label: '稀有2（B）' },
  { value: 3, label: '稀有3（A）' },
  { value: 4, label: '稀有4（S）' },
  { value: 5, label: '稀有5（SS）' },
  { value: 0, label: '稀有0' },
];

// 使用期限设置
export const USE_DAYS_TYPES = [
  { value: -1, label: '不限制' },
  { value: 1, label: '1天' },
  { value: 7, label: '7天' },
  { value: 15, label: '15天' },
  { value: 30, label: '30天' },
];

// 输入的show值自动关联稀有度
export const SHOW_RELATIVE_WORTH_LEVEL = [
  { min: 701, worthLevel: 5 },
  { min: 501, worthLevel: 4 },
  { min: 301, worthLevel: 3 },
  { min: 101, worthLevel: 2 },
  { min: 0, worthLevel: 1 },
];

// 碎片所属类型
export const CHIP_BELONG_TO_TYPES = [
  { label: '皮肤碎片', value: 4, compose: { label: '皮肤', value: 3 } },
  { label: '击杀效果碎片', value: 6, compose: { label: '击杀效果', value: 5 } },
];

// 货币类型
export const CURRENCY_TYPES = [
  { value: 1, label: '金币' },
  { value: 2, label: '苹果' },
  { value: 3, label: '欢乐币' },
  { value: 4, label: '奖券' },
  { value: 5, label: '人民币' },
  { value: 6, label: '金豆' },
  { value: 7, label: '猜猜币' },
  { value: 8, label: '水晶' },
  { value: 9, label: '荣耀水晶' },
  { value: 10, label: '银币' },
  { value: 15, label: '通行证奖章' },
  { value: 17, label: '复活卡' },
];

export const UPLOAD_SOURCE_TYPE = [
  { label: '固定轨迹[静态]', value: 1 },
  { label: 'lottie', value: 2 },
  { label: 'Zip(lottie)', value: 3 },
  { label: 'SVGA', value: 4 },
  { label: '视频mp4', value: 5 },
  { label: 'vap', value: 6 },
];

export const SCALE_MODE = [
  { label: '按高度比缩放', value: 1 },
  { label: '按宽度比缩放', value: 2 },
  { label: '不超出屏幕完全显示', value: 3 },
  { label: '铺满屏幕', value: 4 },
];

export const BUFF_TYPES = [
  { label: '通用替换的动画', value: '151001' },
  { label: '粑粑', value: '151002' },
  { label: '水枪', value: '151003' },
  { label: '拖鞋', value: '151004' },
  { label: '臭鸡蛋', value: '151005' },
  { label: '猪头', value: '151006' },
  { label: '辣条', value: '151007' },
  { label: '护盾', value: '151008' },
  { label: '反弹', value: '151009' },
  { label: '顺手牵羊', value: '151010' },
  { label: '趁火打劫', value: '151011' },
  { label: '幸运魔法球', value: '151012' },
  { label: '抱抱', value: '151013' },
  { label: '锦鲤附体', value: '151014' },
  { label: '啥都没有', value: '151015' },
  { label: '掉钱', value: '151016' },
  { label: '开除', value: '151017' },
  { label: '废话', value: '151018' },
  { label: '猪猪', value: '151019' },
  { label: '讨厌', value: '151020' },
  { label: '太傻', value: '151021' },
  { label: '吵架', value: '151022' },
  { label: 'CP', value: '151023' },
];

// 获取方式总类型
export const GET_METHOD_TYPES = [
  { value: -1, label: '隐藏' },
  { value: 0, label: '购买' },
  { value: 1, label: '签到' },
  { value: 2, label: '碎片' },
  { value: 3, label: '活动' },
  { value: 5, label: '段位' },
  { value: 6, label: '宝箱' },
];
