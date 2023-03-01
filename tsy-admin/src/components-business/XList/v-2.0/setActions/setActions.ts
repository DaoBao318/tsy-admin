import {
  createEdit,
  createDelete,
  createCopyNewBuild,
  createLock,
  createUnLock,
  createAsyncOnline,
  createFastUpdate,
  generateGiftBagCodes,
  createEditDomain,
} from './action';
import { ActionItem2 } from './types';

const typeHandlerMaps = new Map();
typeHandlerMaps.set('edit', createEdit);
typeHandlerMaps.set('delete', createDelete);
typeHandlerMaps.set('copyToNew', createCopyNewBuild);
typeHandlerMaps.set('lock', createLock);
typeHandlerMaps.set('unlock', createUnLock);
typeHandlerMaps.set('asyncOnline', createAsyncOnline);
typeHandlerMaps.set('fastUpdate', createFastUpdate);
typeHandlerMaps.set('generateGiftBagCodes', generateGiftBagCodes);
typeHandlerMaps.set('domainConfig', createEditDomain);

// TODO 值类型['edit', 'delete', ……] 如何转换成类型  'edit' | 'delete'
// const types = [...typeHandlerMaps.keys()] as const;为何不生效

const types = [
  'edit',
  'delete',
  'copyToNew',
  'lock',
  'unlock',
  'asyncOnline',
  'fastUpdate',
  'generateGiftBagCodes',
  'domainConfig',
] as const;

export interface ConfigItem {
  type: typeof types[number];
  handler: Function;
  options?: ActionItem2;
}

// 根据配置返回对应的actions
export function setActions(actions: ConfigItem[]) {
  return actions.reduce((preRes: any, { type, handler, options = {} }) => {
    const fn = typeHandlerMaps.get(type);
    preRes.push(fn(handler, options));
    return preRes;
  }, []);
}
