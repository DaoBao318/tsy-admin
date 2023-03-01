export * from './tool/commonTool';
import { ActivityStatus, Outdated } from '../enums/activityCenter';
import { Dict, jumpLinkType } from './types';
import { getEnv } from '/@/utils/env';

export const OutdatedTypes = [
  {
    label: '全部',
    value: Outdated.ALL,
  },
  {
    label: '已过期',
    value: Outdated.EXPIRED,
  },
  {
    label: '未过期',
    value: Outdated.UNEXPIRED,
  },
];

export const convertTypes: Dict[] = [
  {
    label: '金币',
    value: 1,
  },
  {
    label: '苹果',
    value: 2,
  },
  {
    label: '水晶',
    value: 8,
  },
  {
    label: '欢乐币',
    value: 10,
  },
  {
    label: '荣耀水晶',
    value: 16,
  },
  {
    label: '金豆',
    value: 21,
  },
  {
    label: '猜猜币',
    value: 22,
  },
  {
    label: '银币',
    value: 23,
  },
  {
    label: '通行币',
    value: 29,
  },
];

// 奖励类型-即资源类型type
export enum REWADFTYENUM {
  RewardTypeCoin = 1, // 金币
  RewardTypeDiamond = 2, // 苹果
  RewardTypeSkin = 3, // 皮肤
  RewardTypeSkinChip = 4, // 皮肤碎片
  RewardTypeKillStyle = 5, // 击杀效果
  RewardTypeKsChip = 6, // 击杀效果碎片
  RewardTypeProp = 7, // 功能道具
  RewardTypeCrystal = 8, // 水晶
  RewardTypeGift = 9, // 礼物
  RewardTypeHappycoin = 10, // 欢乐币
  RewardTypeMiddleItem = 11, // 中间物品(活动道具)
  RewardTypeBox = 12, // 头像框
  RewardTypeTeamSkin = 13, // 团战皮肤
  RewardTypeTeamSkinChip = 14, // 团战皮肤碎片
  RewardTypePack = 15, // 礼包
  RewardTypeHonorCrystal = 16, // 荣耀水晶
  RewardTypeRing = 17, // 戒指
  RewardTypePiece = 18, // 拼图
  RewardTypeRealItem = 19, // 实物
  RewardTypeLuckyBag = 20, // 福袋
  RewardTypeGoldcoin = 21, // 金豆
  RewardTypeBetCoin = 22, // 猜猜币
  RewardTypeSnakeCoin = 23, // 平台货币
  RewardTypeDrawCard = 24, // 抽卡
  RewardTypeCoupon = 25, // 奖券，ios占用
  RewardTypeMemberCard = 26, // 会员卡
  RewardTypeBubble = 27, // 气泡
  RewardTypeGameBuff = 28, // 游戏buff
  RewardTypeBattlePassCoin = 29, // 勋章币
  RewardTypeTitle = 30, // 称号
  RewardTypeGiftBuff = 31, // 礼物buff
  RewardTypePassCheckChest = 32, // 通行证宝箱
  RewardTypeLuckyTicket = 33, // 六加一抽奖券(好运金券)
  RewardType3d = 34, // 3D模块内奖励
  RewardTypeFace = 35, // 表情
  RewardTypeRoomStyle = 36, // 房间样式
  RewardTypeMaterialCard = 37, // 资料卡片
  RewardTypeEnterEffects = 38, // 进入特效
  RewardTypeMaxId = 39, // 奖励类型最大ID
}

export const SOURCE_TYPE_OPTIONS = [
  { label: '金币', value: REWADFTYENUM.RewardTypeCoin },
  { label: '苹果', value: REWADFTYENUM.RewardTypeDiamond },
  { label: '皮肤', value: REWADFTYENUM.RewardTypeSkin },
  { label: '皮肤碎片', value: REWADFTYENUM.RewardTypeSkinChip },
  { label: '击杀效果', value: REWADFTYENUM.RewardTypeKillStyle },
  { label: '击杀效果碎片', value: REWADFTYENUM.RewardTypeKsChip },
  { label: '功能道具', value: REWADFTYENUM.RewardTypeProp },
  { label: '水晶', value: REWADFTYENUM.RewardTypeCrystal },
  { label: '礼物', value: REWADFTYENUM.RewardTypeGift },
  { label: '欢乐币', value: REWADFTYENUM.RewardTypeHappycoin },
  { label: '活动道具', value: REWADFTYENUM.RewardTypeMiddleItem },
  { label: '头像框', value: REWADFTYENUM.RewardTypeBox },
  { label: '团战皮肤', value: REWADFTYENUM.RewardTypeTeamSkin },
  { label: '团战皮肤碎', value: REWADFTYENUM.RewardTypeTeamSkinChip },
  { label: '礼包', value: REWADFTYENUM.RewardTypePack },
  { label: '荣耀水晶', value: REWADFTYENUM.RewardTypeHonorCrystal },
  { label: '戒指', value: REWADFTYENUM.RewardTypeRing },
  { label: '拼图', value: REWADFTYENUM.RewardTypePiece },
  { label: '实物奖励', value: REWADFTYENUM.RewardTypeRealItem },
  { label: '福袋', value: REWADFTYENUM.RewardTypeLuckyBag },
  { label: '金豆', value: REWADFTYENUM.RewardTypeGoldcoin },
  { label: '猜猜币', value: REWADFTYENUM.RewardTypeBetCoin },
  { label: '银币', value: REWADFTYENUM.RewardTypeSnakeCoin },
  { label: '气泡', value: REWADFTYENUM.RewardTypeBubble },
  { label: 'buff道具', value: REWADFTYENUM.RewardTypeGameBuff },
  { label: '通行币', value: REWADFTYENUM.RewardTypeBattlePassCoin },
  { label: '称号', value: REWADFTYENUM.RewardTypeTitle },
  { label: '礼物buff', value: REWADFTYENUM.RewardTypeGiftBuff },
  { label: '好运金券', value: REWADFTYENUM.RewardTypeLuckyTicket },
  { label: '3D奖励', value: REWADFTYENUM.RewardType3d },
  { label: '表情', value: REWADFTYENUM.RewardTypeFace },
  { label: '房间样式｜休闲区', value: REWADFTYENUM.RewardTypeRoomStyle },
  { label: '资料卡片｜休闲区', value: REWADFTYENUM.RewardTypeMaterialCard },
  { label: '进入特效｜休闲区', value: REWADFTYENUM.RewardTypeEnterEffects },
];

export const NEED_LIMIT_TIME_SOURCE = [3, 5, 9, 30, 35];
export function setLimitFontSourceType(type, limitTime) {
  return NEED_LIMIT_TIME_SOURCE.includes(Number(type)) && limitTime > 0 ? '(限时)' : '';
}
export const ENTRY_JUMP_URLS: jumpLinkType[] = [
  { value: 0, url: '', label: '选择类型(如需展示商城具体资源，增加`?item_id=xx`)' },
  { value: '1', url: 'snake://qualifying', label: '跳到团战模式匹配页' },
  { value: '2', url: 'snake://RMBCharge', label: '跳到RMB礼包' },
  { value: '3', url: 'snake://firstCharge', label: '跳到首充礼包' },
  { value: '4', url: 'snake://happyMode', label: '跳到赏金模式首页' },
  { value: '5', url: 'snake://socialTab', label: '跳到社交首页' },
  { value: '6', url: 'snake://mailTab', label: '跳到邮件页面' },
  { value: '7', url: 'snake://clanTab', label: '跳到战队首页' },
  { value: '8', url: 'snake://checkInTab', label: '跳到签到首页' },
  { value: '9', url: 'snake://chargeTab', label: '跳到购买苹果界面' },
  { value: '10', url: 'snake://eventTab?eventId=', label: '跳到指定活动页面' },
  { value: '11', url: 'snake://skinTab', label: '跳到首页商店皮肤界面' },
  { value: '12', url: 'snake://ksTab', label: '跳到首页商店击杀效果界面' },
  { value: '13', url: 'snake://propTab', label: '跳到首页商店道具界面' },
  { value: '14', url: 'snake://happySkinTab', label: '跳到欢乐币商店皮肤界面' },
  { value: '15', url: 'snake://happyKsTab', label: '跳到欢乐币商店皮击杀效果界面' },
  { value: '16', url: 'snake://happyPropTab', label: '跳到欢乐币商店道具界面' },
  { value: '17', url: 'snake://bagSkinTab', label: '跳到背包皮肤列表界面' },
  { value: '18', url: 'snake://bagKsTab', label: '跳到背包击杀效果列表界面' },
  { value: '19', url: 'snake://bagPropTab', label: '跳到背包道具列表界面' },
  { value: '21', url: 'snake://InfiniteTab', label: '跳到无尽模式游戏界面' },
  { value: '22', url: 'snake://LimitTab', label: '跳到限时模式游戏界面' },
  { value: '23', url: 'snake://recommendTab', label: '跳到首页商店推荐界面' },
  { value: '24', url: 'snake://teamSkinTab', label: '跳到首页商店团战皮肤界面' },
  { value: '25', url: 'snake://packTab', label: '跳到首页商店特惠礼包界面' },
  { value: '26', url: 'snake://bagTeamSkinTab', label: '跳到背包团战皮肤列表界面' },
  { value: '27', url: 'snake://chestTab', label: '跳到宝箱界面' },
  { value: '28', url: 'snake://chipTab', label: '跳到个人碎片界面' },
  { value: '29', url: 'snake://ringTab', label: '跳到商店戒指界面' },
  { value: '30', url: 'snake://churchTab', label: '跳到社交教堂界面' },
  { value: '31', url: 'snake://pieceActivity', label: '拼图(V>=4.0)' },
  { value: '32', url: 'snake://lotteryActivity', label: '轮盘(V>=4.0)' },
  { value: '33', url: 'snake://recallActivity', label: '召回活动(V>=4.0)' },
  { value: '34', url: 'snake://bindPhone', label: '绑定手机(V>=4.0)' },
  { value: '36', url: 'snake://challengeTab', label: '跳到挑战模式主界面(V>=4.0)' },
  { value: '37', url: 'snake://springShareActivity', label: '跳到春节分享活动(V>=4.0.3)' },
  { value: '38', url: 'snake://shareImage?imgurl=', label: '分享图片' },
  { value: '39', url: 'snake://race?tab=', label: '赛事模块{race,data,squad}' },
  { value: '40', url: 'snake://raceSquad?id=', label: '赛事队伍数据，参数队伍id' },
  { value: '41', url: 'snake://racePlayer?id=', label: '赛事个人数据，参数队伍id' },
  // { value: '39', url: 'snake://raceActivity?tab=home', label: '跳转挑战赛首页(v>=4.1)' },
  // { value: '40', url: 'snake://raceActivity?tab=cheer', label: '跳转挑战赛 助威 页' },
  // { value: '41', url: 'snake://raceActivity?tab=data', label: '跳转挑战赛 数据 页' },
  // { value: '42', url: 'snake://raceActivity?tab=bet', label: '跳转挑战赛 猜猜 页' },
  // { value: '43', url: 'snake://raceActivity?tab=video', label: '跳转挑战赛 视频 页' },
  { value: '44', url: 'snake://drawCard?item_id=12007', label: '跳转抽卡' },
  { value: '45', url: 'snake://eatClub', label: '跳转贪吃训练营' },
  { value: '46', url: 'snake://login', label: '打开登录弹框' },
  { value: '47', url: 'snake://littleGame?game_id=1', label: '打开小游戏' },
  { value: '48', url: 'snake://webBanner?url=', label: '异形banner' },
  { value: '49', url: 'snake://zhiToken?code=xxx&toast=xxx', label: '复制zhi口令' },
  { value: '50', url: 'snake://memberCard', label: '会员卡(>=4.2.6)' },
  {
    value: '51',
    url: 'snake://webActivity?url=',
    label: '网页活动>=4.2.8 (拼图需加参数act_type=piece)',
  },
  { value: '52', url: 'snake://unityGame?url=', label: '打开unity模块并跳至首页' },
  { value: '53', url: 'snake://passCheck', label: '打开通行证' },
  { value: '54', url: 'snake://teamKill', label: '跳转到击杀模式匹配页' },
  {
    value: '55',
    url: 'snake://profile?tab=',
    label: '跳到个人资料页(tab={photo,game,skin,mentor} uid=)',
  },
  { value: '56', url: 'snake://uploadAvatarTab', label: '跳到上传头像' },
  { value: '57', url: 'snake://faceTab', label: '跳到商店表情界面' },
  { value: '58', url: 'snake://bagFaceTab', label: '跳到背包表情界面' },
  { value: '59', url: 'snake://cartonBanner?banner_id=', label: '跳转合辑banner' },
  // { value: '60', url: 'snake://primRMBChargeTab', label: '跳到原生人民币礼包界面' },
  // { value: '61', url: 'snake://primFirstChargeTab', label: '跳到原生首充弹窗界面' },
  // { value: '62', url: 'snake://primCheckinTab', label: '跳到原生签到弹窗界面' },
  { value: '63', url: 'snake://activityCenter?act_id=', label: '跳到活动中心' },
  { value: '64', url: 'snake://voiceRoomLink?link=', label: '进休闲区首页再打开link链接' },
  { value: '100', url: 'https://', label: '跳转网页' },
  // { value: '101', url: 'snake://mentorshipTab?uid=', label: '跳到个人师徒界面' },
];

const isProductionEnv = getEnv() === 'production';
export const statusList = [
  {
    value: ActivityStatus.NotSubmit,
    label: isProductionEnv ? '已下架' : '未提审',
  },
  {
    value: ActivityStatus.WaitAudit,
    label: '待审核',
  },
  {
    value: ActivityStatus.AuditPass,
    label: '审核通过',
  },
  {
    value: ActivityStatus.AuditReject,
    label: '审核不通过',
  },
  {
    value: ActivityStatus.PrePublish,
    label: '已发布（预发布环境）',
  },
  {
    value: ActivityStatus.Publish,
    label: '已上架（线上环境）',
  },
  {
    value: ActivityStatus.PublishHasUpdate,
    label: '已上架（待提审）',
  },
  {
    value: ActivityStatus.PublishWaitAudit,
    label: '已上架（待审核）',
  },
  {
    value: ActivityStatus.PublishAuditPass,
    label: '已上架（审核通过）',
  },
  {
    value: ActivityStatus.PublishAuditReject,
    label: '已上架（审核不通过）',
  },
  {
    value: ActivityStatus.PublishPrePublish,
    label: '已上架（已预发布）',
  },
].filter((it) =>
  isProductionEnv && ![ActivityStatus.NotSubmit, ActivityStatus.Publish].includes(it.value)
    ? false
    : true
);

export const statusMaps: {
  [x: number | string]: string;
} = statusList.reduce((res, current) => {
  res[current.value] = current.label;
  return res;
}, {});

// 渠道映射
export const CHANNEL_OPTIONS = [
  { label: 'apple', value: 'apple' },
  { label: 'aliyouxi', value: 'aliyouxi' },
  { label: 'anzhi', value: 'anzhi' },
  { label: 'baidu', value: 'baidu' },
  { label: 'baiduad1', value: 'baiduad1' },
  { label: 'baiduad2', value: 'baiduad2' },
  { label: 'baiduad3', value: 'baiduad3' },
  { label: 'baidubrand', value: 'baidubrand' },
  { label: 'baidujisu', value: 'baidujisu' },
  { label: 'coolpad', value: 'coolpad' },
  { label: 'dev', value: 'dev' },
  { label: 'downjoy', value: 'downjoy' },
  { label: 'newxiaomi', value: 'newxiaomi' },
  { label: 'flyme', value: 'flyme' },
  { label: 'g2345', value: 'g2345' },
  { label: 'G4399', value: 'G4399' },
  { label: 'huluxia', value: 'huluxia' },
  { label: 'hykuaibao', value: 'hykuaibao' },
  { label: 'huawei', value: 'huawei' },
  { label: 'jinli', value: 'jinli' },
  { label: 'jingdong', value: 'jingdong' },
  { label: 'jinlimarket', value: 'jinlimarket' },
  { label: 'koobee', value: 'koobee' },
  { label: 'kkmanhua', value: 'kkmanhua' },
  { label: 'letv', value: 'letv' },
  { label: 'lenovo', value: 'lenovo' },
  { label: 'Mcbg', value: 'Mcbg' },
  { label: 'm360', value: 'm360' },
  { label: 'momofish_new', value: 'momofish_new' },
  { label: 'meituxiuxiu', value: 'meituxiuxiu' },
  { label: 'newTencent', value: 'newTencent' },
  { label: 'newanzhi', value: 'newanzhi' },
  { label: 'newbaidu', value: 'newbaidu' },
  { label: 'newtoutiao', value: 'newtoutiao' },
  { label: 'newletv', value: 'newletv' },
  { label: 'oppo', value: 'oppo' },
  { label: 'official', value: 'official' },
  { label: 'pc6', value: 'pc6' },
  { label: 'ptbus', value: 'ptbus' },
  { label: 'ppzhushou', value: 'ppzhushou' },
  { label: 'samsung', value: 'samsung' },
  { label: 'smartisan', value: 'smartisan' },
  { label: 'toutiao', value: 'toutiao' },
  { label: 'toutiaolive', value: 'toutiaolive' },
  { label: 'tencent', value: 'tencent' },
  { label: 'taptap', value: 'taptap' },
  { label: 'vivo', value: 'vivo' },
  { label: 'wandoujia', value: 'wandoujia' },
  { label: 'walle', value: 'walle' },
  { label: 'xiaomi', value: 'xiaomi' },
  { label: 'yidongmm', value: 'yidongmm' },
  { label: 'yezi', value: 'yezi' },
  { label: 'zte', value: 'zte' },
  { label: '233xyx', value: '233xyx' },
  { label: '233xyx_new', value: '233xyx_new' },
];
// 货币类型
export const CURRENCY_TYPES = [
  { value: 1, label: '金币' },
  { value: 2, label: '苹果' },
  { value: 3, label: '欢乐币' },
  { value: 4, label: '奖券' },
  { value: 5, label: '人民币' },
  { value: 6, label: '金豆', hideInSelect: true },
  { value: 7, label: '猜猜币' },
  { value: 8, label: '水晶' },
  { value: 9, label: '荣耀水晶' },
  { value: 10, label: '银币' },
  { value: 15, label: '通行证奖章' },
  { value: 17, label: '复活卡' },
];

// 礼包类型
export const PACK_OPTIONS = [
  { value: 1, label: '商店礼包' },
  { value: 2, label: '福袋' },
  { value: 3, label: '复活礼包' },
  { value: 4, label: '挑战模式礼包' },
  { value: 5, label: '新复活礼包' },
  { value: 6, label: '通行证礼包' },
  { value: 8, label: '货币不足礼包' },
  { value: 9, label: '首页RMB礼包' },
  { value: 10, label: '灯笼兑换礼包' },
  { value: 11, label: '去除广告礼包' },
];

export const PACK_ID_MAP = {
  PACK_TYPE_OFFER: 1, // "商店礼包",
  PACK_TYPE_LUCKY_BAG: 2, // 福袋
  PACK_TYPE_ALIVE: 3, // "复活礼包",
  PACK_TYPE_EXCITE: 4, // "挑战模式礼包",
  PACK_TYPE_NEW_REVIVE: 5, // '新复活礼包',
  PACK_TYPE_BATTLE_PASS: 6, // '通行证礼包',
  PACK_TYPE_NOT_FULL: 8, // 货币不足礼包
  PACK_TYPE_RMB: 9, // '首页RMB礼包',
  PACK_TYPE_DUIHUAN: 10, // '灯笼兑换礼包',
  PACK_TYPE_DEL_AD: 11, // '去除广告礼包',
};

// 限购类型项
export const LIMIT_BUY_OPTIONS = [
  { value: 0, label: '不限购' },
  { value: 1, label: '永久限购' },
  { value: 2, label: '每日限购' },
  { value: 3, label: '本周限购' },
];
