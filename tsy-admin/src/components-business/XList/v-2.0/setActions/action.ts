import { ActionItem2, X2_VIEW_DETAIL } from './types';
import { ID_PROD_ENV } from '/@/const';

function isDisabled(options) {
  return options.disabled !== undefined ? options.disabled : ID_PROD_ENV;
}
export function createFastUpdate(handler, options): ActionItem2 {
  return {
    icon: 'carbon:update-now',
    label: '快速更新',
    disabled: isDisabled(options),
    onClick: handler,
    color: 'error',
    ...options,
  };
}
export function createViewDetail(handler, options): ActionItem2 {
  return {
    label: X2_VIEW_DETAIL,
    onClick: handler,
    ifShow: false,
    ...options,
  };
}

export function createEdit(handler, options): ActionItem2 {
  return {
    icon: 'clarity:note-edit-line',
    label: '编辑',
    disabled: isDisabled(options),
    onClick: handler,
    ...options,
    flag: 'X2_VIEW_DETAIL',
  };
}

export function createEditDomain(handler, options): ActionItem2 {
  return {
    icon: 'clarity:note-edit-line',
    label: '域名配置',
    disabled: isDisabled(options),
    onClick: handler,
    ...options,
  };
}

export function createDelete(handler, options): ActionItem2 {
  return {
    icon: 'mdi-light:delete',
    label: '删除',
    disabled: isDisabled(options),
    color: 'error',
    popConfirm: {
      title: '是否确定删除？',
      confirm: handler,
    },
    ...options,
  };
}
export function createCopyNewBuild(handler, options): ActionItem2 {
  return {
    icon: 'octicon:copy-16',
    label: '复制新建',
    color: 'warning',
    disabled: isDisabled(options),
    popConfirm: {
      title: '是否确定复制新建',
      confirm: handler,
    },
    ...options,
  };
}

export function createLock(handler, options): ActionItem2 {
  return {
    icon: 'ic:twotone-lock-open',
    label: '加锁',
    disabled: isDisabled(options),
    color: 'success',
    popConfirm: {
      title: '是否确定锁住',
      confirm: handler,
    },
    ...options,
  };
}

export function createUnLock(handler, options): ActionItem2 {
  return {
    icon: 'ic:twotone-lock',
    label: '解锁',
    disabled: isDisabled(options),
    color: 'success',
    popConfirm: {
      title: '是否解锁当前资源？',
      confirm: handler,
    },
    ...options,
  };
}

export function createAsyncOnline(handler, options): ActionItem2 {
  return {
    icon: 'mdi:briefcase-upload-outline',
    label: '同步至线上',
    divider: true,
    color: 'warning',
    disabled: isDisabled(options),
    popConfirm: {
      title: '确认要将这个道具同步至线上吗？',
      confirm: handler,
    },
    ...options,
  };
}

export function generateGiftBagCodes(handler, options): ActionItem2 {
  return {
    icon: 'material-symbols:downloading',
    label: '生成礼包码',
    divider: true,
    color: 'warning',
    disabled: isDisabled(options),
    onClick: handler,
    ...options,
  };
}
