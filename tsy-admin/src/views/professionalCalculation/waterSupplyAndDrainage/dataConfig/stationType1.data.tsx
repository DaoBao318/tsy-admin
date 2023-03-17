// eg: 会让站配置数据
import { STATION_TYPE_OPTIONS } from './constant';
import { BasicColumn, FormSchema } from '/@/components/Table';
import { message } from 'ant-design-vue';

export const allFormList = {};
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
// 必须要添加id，否则多套数据，就会发生紊乱
export function getRencetSum(type, id) {
  const recentSum = allFormList[id][type]?.reduce((pre, item) => {
    return (pre = pre + item.daily_water_recent);
  }, 0);
  allFormList[id][type + '_recent'] = recentSum || 0;
}
export function getForwardSum(type, id) {
  const forwardSum = allFormList[id][type]?.reduce((pre, item) => {
    return (pre = pre + item.daily_water_forward);
  }, 0);

  allFormList[id][type + '_forward'] = forwardSum || 0;
}
export function getRencetAll(formModel) {
  return formModel;
}
export function getForwardAll(formModel) {
  return formModel;
}

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
      disabled: true,
    },
  },
  {
    label: '数量(近期)',
    field: 'amount_recent',
    component: 'InputNumber',
    colProps: { span: 3 },
    componentProps: {
      disabled: true,
    },
  },
  {
    label: '数量(远期)',
    field: 'amount_forward',
    component: 'InputNumber',
    colProps: { span: 3 },
    componentProps: {
      disabled: true,
    },
  },
  {
    label: '单位用水量(m3)',
    field: 'unit_water',
    component: 'InputNumber',
    required: true,
    colProps: { span: 3 },

    componentProps: ({ schema, formModel }) => {
      return {
        placeholder: '11自定义placeholder11',
        disabled: false,
        onChange: (value) => {
          debugger;
          if (value > formModel.unit_water_level) {
            message.warn('单位用水量不建议大于单位用水量的推荐值', 1);
          }
          const unit_water = formModel.unit_water;
          if (!!unit_water || unit_water === 0) {
            formModel.daily_water_recent = formModel.amount_recent * unit_water;
            formModel.daily_water_forward = formModel.amount_forward * unit_water;
            getRencetSum(formModel.type, formModel.id);
            getForwardSum(formModel.type, formModel.id);
          }
        },
      };
    },
  },
  {
    label: '日用水量(近期m3)',
    field: 'daily_water_recent',
    component: 'InputNumber',
    colProps: { span: 3 },
    componentProps: {
      disabled: true,
    },
  },
  {
    label: '日用水量(远期m3)',
    field: 'daily_water_forward',
    component: 'InputNumber',
    colProps: { span: 4 },
    componentProps: {
      disabled: true,
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
//旅客运输用水
const travelerUseWaterSchemas: FormSchema[] = [
  {
    label: '',
    labelWidth: 0,
    field: 'traveler_use_list',
    component: 'Input',
    colProps: { span: 24 },
    slot: 'travelerUseList',
    componentProps: ({ schema, formModel }) => {
      return {
        placeholder: '自定义placeholder',
        disabled: true,
        immediate: true,
      };
    },
  },
  {
    label: '旅客近期用水小计',
    field: 'traveler_use_list_recent',
    component: 'InputNumber',
    helpMessage: '旅客近期用水小计',
    colProps: { span: 8 },
    componentProps: ({ schema, formModel }) => {
      allFormList[formModel.id] = formModel;
      console.log('==============================打印所有数据formModel============:', formModel);
      console.log(schema);
      return {
        placeholder: '自定义placeholder',
        disabled: true,
        immediate: false,
      };
    },
  },
  {
    label: '旅客远期用水小计',
    field: 'traveler_use_list_forward',
    component: 'InputNumber',
    helpMessage: '旅客远期用水小计',
    colProps: { span: 8 },
    componentProps: ({ schema, formModel }) => {
      return {
        placeholder: '自定义placeholder',
        disabled: true,
        immediate: true,
      };
    },
  },
];
//生产用水
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
    field: 'product_use_list_recent',
    component: 'InputNumber',
    helpMessage: '生产近期用水小计',
    colProps: { span: 8 },
    componentProps: ({ schema, formModel }) => {
      return {
        placeholder: '自定义placeholder',
        disabled: true,
        immediate: true,
      };
    },
  },
  {
    label: '生产远期用水小计',
    field: 'product_use_list_forward',
    component: 'InputNumber',
    helpMessage: '生产远期用水小计',
    colProps: { span: 8 },
    componentProps: () => {
      return {
        placeholder: '自定义placeholder',
        disabled: true,
        immediate: true,
      };
    },
  },
];

// 生活用水
const lifeUseWaterSchemas: FormSchema[] = [
  {
    label: '',
    labelWidth: 0,
    field: 'life_use_list',
    component: 'Input',
    colProps: { span: 24 },
    slot: 'lifeUseList',
  },
  {
    label: '生活近期用水小计',
    field: 'life_use_list_recent',
    component: 'InputNumber',
    helpMessage: '生活近期用水小计',
    colProps: { span: 8 },
    componentProps: ({ schema, formModel }) => {
      return {
        placeholder: '自定义placeholder',
        disabled: true,
        immediate: true,
      };
    },
  },
  {
    label: '生活远期用水小计',
    field: 'life_use_list_forward',
    component: 'InputNumber',
    helpMessage: '生活远期用水小计',
    colProps: { span: 8 },
    componentProps: () => {
      return {
        placeholder: '自定义placeholder',
        disabled: true,
        immediate: true,
      };
    },
  },
];
//绿化用水
const greenAndRoadWaterSchemas: FormSchema[] = [
  {
    label: '',
    labelWidth: 0,
    field: 'green_use_list',
    component: 'Input',
    colProps: { span: 24 },
    slot: 'greenUseList',
  },
  {
    label: '绿化近期用水小计',
    field: 'green_use_list_recent',
    component: 'InputNumber',
    helpMessage: '生活近期用水小计',
    colProps: { span: 8 },
    componentProps: ({ schema, formModel }) => {
      return {
        placeholder: '自定义placeholder',
        disabled: true,
        immediate: true,
      };
    },
  },
  {
    label: '绿化远期用水小计',
    field: 'green_use_list_forward',
    component: 'InputNumber',
    helpMessage: '生活远期用水小计',
    colProps: { span: 8 },
    componentProps: () => {
      return {
        placeholder: '自定义placeholder',
        disabled: true,
        immediate: true,
      };
    },
  },
];

// 服务用水小计
const serviceUseWaterSchemas: FormSchema[] = [
  {
    label: '',
    labelWidth: 0,
    field: 'serviceUseWaterSchemas',
    component: 'Input',
    colProps: { span: 24 },
    slot: 'serviceUseWaterSchemas',
  },
  {
    label: '服务用水小计',
    field: 'serviceUseWaterSchemas_recent',
    component: 'InputNumber',
    helpMessage: '生产近期用水小计',
    colProps: { span: 8 },
    componentProps: ({ schema }) => {
      console.log(schema);
      return {
        placeholder: '自定义placeholder',
        disabled: true,
        immediate: true,
      };
    },
  },
  {
    label: '服务远期用水小计',
    field: 'serviceUseWaterSchemas_forward',
    component: 'InputNumber',
    helpMessage: '生产远期用水小计',
    colProps: { span: 8 },
    componentProps: () => {
      return {
        placeholder: '自定义placeholder',
        disabled: true,
        immediate: true,
      };
    },
  },
];
// 管网漏失
const pipelineUseWaterSchemas: FormSchema[] = [
  {
    label: '',
    labelWidth: 0,
    field: 'pipelineUseWaterSchemas',
    component: 'Input',
    colProps: { span: 24 },
    slot: 'pipelineUseWaterSchemas',
  },
  {
    label: '管网漏失用水小计',
    field: 'pipelineUseWaterSchemas_recent',
    component: 'InputNumber',
    helpMessage: '生产近期用水小计',
    colProps: { span: 8 },
    componentProps: ({ schema }) => {
      console.log(schema);
      return {
        placeholder: '自定义placeholder',
        disabled: true,
        immediate: true,
      };
    },
  },
  {
    label: '管网漏失远期用水小计',
    field: 'pipelineUseWaterSchemas_forward',
    component: 'InputNumber',
    helpMessage: '生产远期用水小计',
    colProps: { span: 8 },
    componentProps: () => {
      return {
        placeholder: '自定义placeholder',
        disabled: true,
        immediate: true,
      };
    },
  },
];
// 基建未预见
const constructionUseWaterSchemas: FormSchema[] = [
  {
    label: '',
    labelWidth: 0,
    field: 'constructionUseWaterSchemas',
    component: 'Input',
    colProps: { span: 24 },
    slot: 'constructionUseWaterSchemas',
  },
  {
    label: '基建未预见用水小计',
    field: 'constructionUseWaterSchemas_recent',
    component: 'InputNumber',
    helpMessage: '生产近期用水小计',
    colProps: { span: 8 },
    componentProps: ({ schema }) => {
      console.log(schema);
      return {
        placeholder: '自定义placeholder',
        disabled: true,
        immediate: true,
      };
    },
  },
  {
    label: '基建未预见远期用水小计',
    field: 'constructionUseWaterSchemas_forward',
    component: 'InputNumber',
    helpMessage: '生产远期用水小计',
    colProps: { span: 8 },
    componentProps: () => {
      return {
        placeholder: '自定义placeholder',
        disabled: true,
      };
    },
  },
];
// 近期昼夜最大用水量
const totalWaterConsumptionDayNight: FormSchema[] = [
  {
    label: ' 近期昼夜最大用水量总计',
    field: 'totalWaterConsumptionDayNight_recent',
    component: 'InputNumber',
    helpMessage: '生产近期用水小计',
    colProps: { span: 8 },
    componentProps: ({ schema }) => {
      console.log(schema);
      return {
        placeholder: '自定义placeholder',
        disabled: true,
      };
    },
  },
  {
    label: '远期昼夜最大用水量总计',
    field: 'totalWaterConsumptionDayNight_forward',
    component: 'InputNumber',
    helpMessage: '生产远期用水小计',
    colProps: { span: 8 },
    componentProps: () => {
      return {
        placeholder: '自定义placeholder',
        disabled: true,
      };
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

// 根据不同的类型进行项目配置
export const typeHRchemas = [
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
    schemas: lifeUseWaterSchemas,
  },
  {
    title: '四、绿化及浇洒道路',
    schemas: greenAndRoadWaterSchemas,
  },
  {
    title: '五、服务行业用水',
    schemas: serviceUseWaterSchemas,
  },
  {
    title: '六、管网漏失',
    schemas: pipelineUseWaterSchemas,
  },
  {
    title: '七、基建未预见',
    schemas: constructionUseWaterSchemas,
  },
  {
    title: '八、近期昼夜最大用水量',
    schemas: totalWaterConsumptionDayNight,
  },
];
export const typeZJchemas = [
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
    schemas: lifeUseWaterSchemas,
  },
  {
    title: '四、绿化及浇洒道路',
    schemas: greenAndRoadWaterSchemas,
  },
];
