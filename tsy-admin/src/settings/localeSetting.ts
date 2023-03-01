import type { DropMenu } from '../components/Dropdown';
import type { LocaleSetting, LocaleType, WaterSupply } from '/#/config';

export const LOCALE: { [key: string]: LocaleType } = {
  ZH_CN: 'zh_CN',
  EN_US: 'en',
  RU_RU: 'ru',
};
export const LOCALKEY: WaterSupply[] = [
  {
    num: 1,
    sum: 2,
    title: '生活用水',
  },
  {
    sum: 3,
    num: 1,
    title: '生产用水',
  },
  {
    sum: 1,
    num: 3,
    title: '绿化用水',
  },
];
export const COLUM: WaterSupply = {
  title: '生产用水',
  num: 1,
  sum: 2,
};

export const localeSetting: LocaleSetting = {
  showPicker: true,
  // Locale
  locale: LOCALE.ZH_CN,
  // Default locale
  fallback: LOCALE.ZH_CN,
  // available Locales
  availableLocales: [LOCALE.ZH_CN, LOCALE.EN_US, LOCALE.RU_RU],
};

// locale list
export const localeList: DropMenu[] = [
  {
    text: '简体中文',
    event: LOCALE.ZH_CN,
  },
  {
    text: 'English',
    event: LOCALE.EN_US,
  },
  {
    text: 'Pycck',
    event: LOCALE.RU_RU,
    disabled: true,
  },
];
