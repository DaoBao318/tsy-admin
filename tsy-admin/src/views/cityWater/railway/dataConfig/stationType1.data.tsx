// eg: 会让站配置数据
import { STATION_TYPE_OPTIONS } from './constant';
import { BasicColumn, FormSchema } from '/@/components/Table';

const basicSchema: FormSchema[] = [
  {
    field: 'id',
    label: 'id:',
    component: 'InputNumber',
    colProps: { span: 23 },
    show: false,
  },
  {
    label: '车站名称:',
    field: 'station',
    component: 'Input',
    colProps: { span: 23 },
    required: true,
    componentProps: {
      placeholder: '请输入车站名称 eg:北京',
    },
  },
  {
    label: '车站类型:',
    field: 'station_type',
    component: 'Select',
    colProps: { span: 23 },
    required: true,
    componentProps: {
      disabled: true,
      placeholder: '请选择车站类型',
      options: STATION_TYPE_OPTIONS,
    },
  },
];

const travelerUseWaterSchemas: FormSchema[] = [
  {
    label: '',
    labelWidth: 0,
    field: 'traveler_use_list',
    component: 'Input',
    colProps: { span: 24 },
    slot: 'travelerUseList',
  },
  {
    label: '旅客近期用水小计',
    field: 'traveler_recent_total',
    component: 'Input',
    helpMessage: '由啥啥啥计算得出',
    colProps: { span: 16 },
    componentProps: {
      disabled: true,
    },
  },
];

export const travelerUseTableSchemas: FormSchema[] = [
  {
    label: '用水项目',
    field: 'use_name',
    component: 'Input',
    colProps: { span: 3 },
    componentProps: {
      disabled: true,
    },
  },
  {
    label: '单位',
    field: 'unit',
    component: 'Input',
    colProps: { span: 2 },
    componentProps: {
      disabled: false,
    },
  },
  {
    label: '数量(近期)',
    field: 'amount_recent',
    component: 'InputNumber',
    colProps: { span: 3 },
    componentProps: {
      disabled: false,
    },
  },
  {
    label: '数量(远期)',
    field: 'amount_forward',
    component: 'InputNumber',
    colProps: { span: 3 },
    componentProps: {
      disabled: false,
    },
  },
  {
    label: '单位用水量(m3)',
    field: 'unit_water',
    component: 'InputNumber',
    colProps: { span: 3 },
    required: true,
    componentProps: {
      disabled: false,
    },
  },
  {
    label: '日用水量(近期m3)',
    field: 'daily_water_recent',
    component: 'InputNumber',
    colProps: { span: 3 },
    componentProps: {
      disabled: false,
    },
  },
  {
    label: '日用水量(远期m3)',
    field: 'daily_water_forward',
    component: 'InputNumber',
    colProps: { span: 4 },
    componentProps: {
      disabled: false,
    },
  },
  {
    label: '单位用水量推荐值',
    field: 'unit_water_level',
    component: 'InputNumber',
    colProps: { span: 3 },
    componentProps: {
      disabled: true,
    },
  },
];

const productUseWaterSchemas: FormSchema[] = [
  {
    label: '',
    labelWidth: 0,
    field: 'product_use_list',
    component: 'Input',
    colProps: { span: 24 },
    slot: 'productUseList',
  },
  {
    label: '生产近期用水小计',
    field: 'product_recent_total',
    component: 'Input',
    helpMessage: '由啥啥啥计算得出',
    colProps: { span: 16 },
    componentProps: {
      disabled: true,
    },
  },
];

export const relativeColumns: BasicColumn[] = [
  {
    title: 'id',
    dataIndex: 'id',
  },
  {
    title: '标题',
    dataIndex: 'title',
  },
  {
    title: '文件名',
    dataIndex: 'filename',
  },
];

export const typeXSchemas = [
  {
    title: '基本配置',
    schemas: basicSchema,
  },
  {
    title: '一、旅客运输用水',
    schemas: travelerUseWaterSchemas,
  },
  {
    title: '二、生产用水',
    schemas: productUseWaterSchemas,
  },
  {
    title: '三、生活用水',
    schemas: productUseWaterSchemas,
  },
  {
    title: '四、绿化及浇洒道路',
    schemas: productUseWaterSchemas,
  },
  {
    title: '五、服务行业用水',
    schemas: productUseWaterSchemas,
  },
  {
    title: '六、管网漏失',
    schemas: productUseWaterSchemas,
  },
  {
    title: '七、基建未预见',
    schemas: productUseWaterSchemas,
  },
  {
    title: '八、近期昼夜最大用水量',
    schemas: productUseWaterSchemas,
  },
];
