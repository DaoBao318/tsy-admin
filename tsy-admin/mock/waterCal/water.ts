import { MockMethod } from 'vite-plugin-mock';
import { resultSuccess } from '../_util';

const itemInfo = [
  { value: '1', label: '北京-武汉段项目【普通类型】' },
  { value: '2', label: '北京-西安段项目【高铁类型】' },
];
export const pageInfo = {
  list: [
    {
      id: 1001,
      station: '北京',
      station_type: '4',
      max_consumption_water: 1000,
      max_displacement_water: 2000,
    },
    {
      id: 1002,
      station: '石家庄',
      station_type: '2',
      max_consumption_water: 1000,
      max_displacement_water: 2000,
    },
    {
      id: 1003,
      station: '郑州',
      station_type: '1',
      max_consumption_water: 1000,
      max_displacement_water: 2000,
    },
    {
      id: 1004,
      station: '孝感',
      station_type: '3',
      max_consumption_water: 1000,
      max_displacement_water: 2000,
    },
    {
      id: 1005,
      station: '武汉',
      station_type: '1',
      max_consumption_water: 1000,
      max_displacement_water: 2000,
    },
    {
      id: 1005,
      station: '武汉',
      station_type: '1',
      max_consumption_water: 1000,
      max_displacement_water: 2000,
    },
  ],
  split: {
    size: 10,
    page: 1,
    total: 5,
  },
};
export const beijingRecord = {
  id: 1001,
  station: '北京',
  station_type: '1',
  totalWaterConsumptionDayNight_recent: 0,
  totalWaterConsumptionDayNight_forward: 0,
  traveler_use_list: [
    {
      use_name: '通过旅客列车',
      unit: '对',
      daily_water_recent: 8,
      daily_water_forward: 7,
      amount_recent: 100,
      amount_forward: 101,
      unit_water: 0,
      unit_water_level: 9,
      type: 'traveler_use_list',
      id: 1001,
    },
    {
      use_name: '始发终到旅客列车',
      unit: '对',
      daily_water_recent: 8,
      daily_water_forward: 7,
      amount_recent: 100,
      amount_forward: 101,
      unit_water: 0,
      unit_water_level: 9,
      type: 'traveler_use_list',
      id: 1001,
    },
  ],
  traveler_use_list_recent: 0,
  traveler_use_list_forward: 0,
  product_use_list: [
    {
      use_name: '客机这番话段',
      unit: '对',
      daily_water_recent: 8,
      daily_water_forward: 7,
      amount_recent: 100,
      amount_forward: 101,
      unit_water: 0,
      unit_water_level: 9,
      type: 'product_use_list',
      id: 1001,
    },
    {
      use_name: '整备运转办公楼',
      unit: '对',
      daily_water_recent: 8,
      daily_water_forward: 7,
      amount_recent: 100,
      amount_forward: 101,
      unit_water: 0,
      unit_water_1: 9,
      type: 'product_use_list',
      id: 1001,
    },
    {
      use_name: '冷却水制备及油脂发放间',
      unit: '对',
      daily_water_recent: 8,
      daily_water_forward: 7,
      amount_recent: 100,
      amount_forward: 101,
      unit_water: 0,
      unit_water_1: 9,
      type: 'product_use_list',
      id: 1001,
    },
  ],
  product_use_list_recent: 0,
  product_use_list_forward: 0,
  life_use_list: [
    {
      use_name: '生活用水项目',
      unit: '对',
      daily_water_recent: 8,
      daily_water_forward: 7,
      amount_recent: 100,
      amount_forward: 101,
      unit_water: 0,
      unit_water_level: 9,
      type: 'life_use_list',
      id: 1001,
    },
  ],
  life_use_list_recent: 0,
  life_use_list_forward: 0,
  green_use_list: [
    {
      use_name: '生活用水项目',
      unit: '对',
      daily_water_recent: 8,
      daily_water_forward: 7,
      amount_recent: 100,
      amount_forward: 101,
      unit_water: 0,
      unit_water_level: 9,
      type: 'green_use_list',
      id: 1001,
    },
  ],
  green_use_list_recent: 0,
  green_use_list_forward: 0,
  serviceUseWaterSchemas: [
    {
      use_name: '服务项目用水',
      unit: '对',
      daily_water_recent: 8,
      daily_water_forward: 7,
      amount_recent: 100,
      amount_forward: 101,
      unit_water: 0,
      unit_water_level: 9,
      type: 'serviceUseWaterSchemas',
      id: 1001,
    },
  ],
  serviceUseWaterSchemas_recent: 0,
  serviceUseWaterSchemas_forward: 0,
  pipelineUseWaterSchemas: [
    {
      use_name: '管网漏失',
      unit: '对',
      daily_water_recent: 8,
      daily_water_forward: 7,
      amount_recent: 100,
      amount_forward: 101,
      unit_water: 0,
      unit_water_level: 9,
      type: 'pipelineUseWaterSchemas',
      id: 1001,
    },
  ],
  pipelineUseWaterSchemas_recent: 0,
  pipelineUseWaterSchemas_forward: 0,
  constructionUseWaterSchemas: [
    {
      use_name: '基建未预见',
      unit: '对',
      daily_water_recent: 8,
      daily_water_forward: 7,
      amount_recent: 100,
      amount_forward: 101,
      unit_water: 0,
      unit_water_level: 9,
      type: 'constructionUseWaterSchemas',
      id: 1001,
    },
  ],
  constructionUseWaterSchemas_recent: 0,
  constructionUseWaterSchemas_forward: 0,
};
export const beijingRecord1 = {
  id: 1002,
  station: '石家庄',
  station_type: '1',
  totalWaterConsumptionDayNight_recent: 0,
  totalWaterConsumptionDayNight_forward: 0,
  traveler_use_list: [
    {
      use_name: '通过旅客列车',
      unit: '对',
      daily_water_recent: 8,
      daily_water_forward: 7,
      amount_recent: 100,
      amount_forward: 101,
      unit_water: 0,
      unit_water_level: 9,
      type: 'traveler_use_list',
      id: 1002,
    },
    {
      use_name: '始发终到旅客列车',
      unit: '对',
      daily_water_recent: 8,
      daily_water_forward: 7,
      amount_recent: 100,
      amount_forward: 101,
      unit_water: 0,
      unit_water_level: 9,
      type: 'traveler_use_list',
      id: 1002,
    },
  ],
  traveler_use_list_recent: 0,
  traveler_use_list_forward: 0,
  product_use_list: [
    {
      use_name: '客机这番话段',
      unit: '对',
      daily_water_recent: 8,
      daily_water_forward: 7,
      amount_recent: 100,
      amount_forward: 101,
      unit_water: 0,
      unit_water_level: 9,
      type: 'product_use_list',
      id: 1002,
    },
    {
      use_name: '整备运转办公楼',
      unit: '对',
      daily_water_recent: 8,
      daily_water_forward: 7,
      amount_recent: 100,
      amount_forward: 101,
      unit_water: 0,
      unit_water_1: 9,
      type: 'product_use_list',
      id: 1002,
    },
    {
      use_name: '冷却水制备及油脂发放间',
      unit: '对',
      daily_water_recent: 8,
      daily_water_forward: 7,
      amount_recent: 100,
      amount_forward: 101,
      unit_water: 0,
      unit_water_1: 9,
      type: 'product_use_list',
      id: 1002,
    },
  ],
  product_use_list_recent: 0,
  product_use_list_forward: 0,
  life_use_list: [
    {
      use_name: '生活用水项目',
      unit: '对',
      daily_water_recent: 8,
      daily_water_forward: 7,
      amount_recent: 100,
      amount_forward: 101,
      unit_water: 0,
      unit_water_level: 9,
      type: 'life_use_list',
      id: 1002,
    },
  ],
  life_use_list_recent: 0,
  life_use_list_forward: 0,
  serviceUseWaterSchemas_recent: 0,
  serviceUseWaterSchemas_forward: 0,
  pipelineUseWaterSchemas: [
    {
      use_name: '管网漏失',
      unit: '对',
      daily_water_recent: 8,
      daily_water_forward: 7,
      amount_recent: 100,
      amount_forward: 101,
      unit_water: 0,
      unit_water_level: 9,
      type: 'pipelineUseWaterSchemas',
      id: 1002,
    },
  ],
  pipelineUseWaterSchemas_recent: 0,
  pipelineUseWaterSchemas_forward: 0,
  constructionUseWaterSchemas: [
    {
      use_name: '基建未预见',
      unit: '对',
      daily_water_recent: 8,
      daily_water_forward: 7,
      amount_recent: 100,
      amount_forward: 101,
      unit_water: 0,
      unit_water_level: 9,
      type: 'constructionUseWaterSchemas',
      id: 1002,
    },
  ],
  constructionUseWaterSchemas_recent: 0,
  constructionUseWaterSchemas_forward: 0,
};

export default [
  {
    url: '/professional-subsystem/get/product/item',
    timeout: 1000,
    method: 'get',
    response: () => {
      return resultSuccess(itemInfo);
    },
  },
  {
    url: '/professional-subsystem/api/test/get_city_list',
    timeout: 1000,
    method: 'post',
    response: () => {
      return resultSuccess(pageInfo);
    },
  },
  {
    url: '/professional-subsystem/api/edit/station',
    timeout: 1000,
    method: 'post',
    response: () => {
      return resultSuccess(['车站修改成功']);
    },
  },
  {
    url: '/professional-subsystem/api/page/edit_page',
    timeout: 1000,
    method: 'post',
    response: () => {
      return resultSuccess(['昼夜最大用水量保存成功']);
    },
  },
  {
    url: '/professional-subsystem/api/detail/get_station_list',
    timeout: 10,
    method: 'post',
    response: () => {
      return resultSuccess(beijingRecord);
    },
  },
  {
    url: '/professional-subsystem/api/detail/get_station_list1',
    timeout: 10,
    method: 'post',
    response: () => {
      return resultSuccess(beijingRecord1);
    },
  },
] as MockMethod[];
