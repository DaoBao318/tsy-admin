// eg: 会让站配置数据
import { STATION_TYPE_OPTIONS, STATION_WIDTH } from './constant';
import { BasicColumn, FormSchema } from '/@/components/Table';
import { message } from 'ant-design-vue';
import { subtotalOfWaterConsumption } from '../utilsWaterSupplyAndDrainage';

export const allFormList = {};
const basicSchema: FormSchema[] = [
  {
    field: 'stationID',
    label: 'stationID:',
    component: 'InputNumber',
    colProps: { span: 23 },
    show: false,
  },
  {
    label: '车站名称:',
    field: 'stationName',
    component: 'Input',
    colProps: { span: 23 },
    required: true,
    componentProps: {
      placeholder: '请输入车站名称 eg:北京',
    },
  },
  {
    label: '车站类型:',
    field: 'stationType',
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

export const travelerUseTableSchemas: FormSchema[] = [
  {
    label: '用水项目',
    field: 'waterProject',
    component: 'Input',
    colProps: { span: 10 },
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
    field: 'recentQuantity',
    component: 'InputNumberExpand',
    colProps: { span: 2 },
    componentProps: {
      disabled: true,
    },
  },
  {
    label: '数量(远期)',
    field: 'forwardQuantity',
    component: 'InputNumberExpand',
    colProps: { span: 2 },
    componentProps: {
      disabled: true,
    },
  },
  {
    label: '单位用水量(m3)',
    field: 'unitWater',
    component: 'InputNumberExpand',
    required: true,
    colProps: { span: 2 },

    componentProps: ({ schema, formModel, formActionType }) => {
      return {
        placeholder: '请选择单位用水量',
        disabled: false,
        onChange: (value) => {
          debugger;
          if (formModel.unitWaterMan === 0 && value !== formModel.unitWaterMin) {
            message.warn('单位用水量建议与推荐值保持一致', 1);
          } else {
            if (value < formModel.unitWaterMin || value > formModel.unitWaterMan) {
              message.warn('单位用水量不建议超出用水量的范围', 1);
            }
          }
          subtotalOfWaterConsumption(formModel, allFormList);
        },
      };
    },
  },
  {
    label: '日用水量(近期m3)',
    field: 'recentConsumption',
    component: 'InputNumberExpand',
    colProps: { span: 2 },
    componentProps: {
      disabled: true,
    },
  },
  {
    label: '日用水量(远期m3)',
    field: 'forwardConsumption',
    component: 'InputNumberExpand',
    colProps: { span: 2 },
    componentProps: {
      disabled: true,
    },
  },
  {
    label: '单位用水量推荐值',
    field: 'recommendedUnitWater',
    component: 'InputColor',
    colProps: { span: 2 },
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
    field: 'passengerTransportationDtoList',
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
    labelWidth: STATION_WIDTH.COUNT_LABEL,
    field: 'passengerTransportationDtoList_recent',
    component: 'InputNumber',
    helpMessage: '旅客近期用水小计',
    colProps: { span: STATION_WIDTH.COUNT_WIDTH },
    componentProps: ({ schema, formModel }) => {
      debugger;
      allFormList[formModel.stationID] = formModel;
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
    labelWidth: STATION_WIDTH.COUNT_LABEL,
    field: 'passengerTransportationDtoList_forward',
    component: 'InputNumber',
    helpMessage: '旅客远期用水小计',
    colProps: { span: STATION_WIDTH.COUNT_WIDTH },
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
    field: 'produceDtoList',
    component: 'Input',
    colProps: { span: 24 },
    slot: 'productUseList',
  },
  {
    label: '生产近期用水小计',
    labelWidth: STATION_WIDTH.COUNT_LABEL,
    field: 'produceDtoList_recent',
    component: 'InputNumber',
    helpMessage: '生产近期用水小计',
    colProps: { span: STATION_WIDTH.COUNT_WIDTH },
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
    labelWidth: STATION_WIDTH.COUNT_LABEL,
    field: 'produceDtoList_forward',
    component: 'InputNumber',
    helpMessage: '生产远期用水小计',
    colProps: { span: STATION_WIDTH.COUNT_WIDTH },
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
    field: 'lifeDtoList',
    component: 'Input',
    colProps: { span: 24 },
    slot: 'lifeUseList',
  },
  {
    label: '生活近期用水小计',
    labelWidth: STATION_WIDTH.COUNT_LABEL,
    field: 'lifeDtoList_recent',
    component: 'InputNumber',
    helpMessage: '生活近期用水小计',
    colProps: { span: STATION_WIDTH.COUNT_WIDTH },
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
    labelWidth: STATION_WIDTH.COUNT_LABEL,
    field: 'lifeDtoList_forward',
    component: 'InputNumber',
    helpMessage: '生活远期用水小计',
    colProps: { span: STATION_WIDTH.COUNT_WIDTH },
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
    field: 'makeGreenSprinklingDtoList',
    component: 'Input',
    colProps: { span: 24 },
    slot: 'greenUseList',
  },
  {
    label: '绿化近期用水小计',
    labelWidth: STATION_WIDTH.COUNT_LABEL,
    field: 'makeGreenSprinklingDtoList_recent',
    component: 'InputNumber',
    helpMessage: '生活近期用水小计',
    colProps: { span: STATION_WIDTH.COUNT_WIDTH },
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
    labelWidth: STATION_WIDTH.COUNT_LABEL,
    field: 'makeGreenSprinklingDtoList_forward',
    component: 'InputNumber',
    helpMessage: '生活远期用水小计',
    colProps: { span: STATION_WIDTH.COUNT_WIDTH },
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
const serviceDtoList: FormSchema[] = [
  {
    label: '',
    labelWidth: 0,
    field: 'serviceDtoList',
    component: 'Input',
    colProps: { span: 24 },
    slot: 'serviceDtoList',
  },
  {
    label: '服务用水小计',
    labelWidth: STATION_WIDTH.COUNT_LABEL,
    field: 'serviceDtoList_recent',
    component: 'InputNumber',
    helpMessage: '生产近期用水小计',
    colProps: { span: STATION_WIDTH.COUNT_WIDTH },
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
    labelWidth: STATION_WIDTH.COUNT_LABEL,
    field: 'serviceDtoList_forward',
    component: 'InputNumber',
    helpMessage: '生产远期用水小计',
    colProps: { span: STATION_WIDTH.COUNT_WIDTH },
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
const pipeNetworkDtoList: FormSchema[] = [
  {
    label: '',
    labelWidth: 0,
    field: 'pipeNetworkDtoList',
    component: 'Input',
    colProps: { span: 24 },
    slot: 'pipeNetworkDtoList',
  },
  {
    label: '管网漏失用水小计',
    labelWidth: STATION_WIDTH.COUNT_LABEL,
    field: 'pipeNetworkDtoList_recent',
    component: 'InputNumber',
    helpMessage: '生产近期用水小计',
    colProps: { span: STATION_WIDTH.COUNT_WIDTH },
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
    labelWidth: STATION_WIDTH.COUNT_LABEL,
    field: 'pipeNetworkDtoList_forward',
    component: 'InputNumber',
    helpMessage: '生产远期用水小计',
    colProps: { span: STATION_WIDTH.COUNT_WIDTH },
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
const capitalConstructionDtoList: FormSchema[] = [
  {
    label: '',
    labelWidth: 0,
    field: 'capitalConstructionDtoList',
    component: 'Input',
    colProps: { span: 24 },
    slot: 'capitalConstructionDtoList',
  },
  {
    label: '基建未预见用水小计',
    labelWidth: STATION_WIDTH.COUNT_LABEL,
    field: 'capitalConstructionDtoList_recent',
    component: 'InputNumber',
    helpMessage: '生产近期用水小计',
    colProps: { span: STATION_WIDTH.COUNT_WIDTH },
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
    labelWidth: STATION_WIDTH.COUNT_LABEL,
    field: 'capitalConstructionDtoList_forward',
    component: 'InputNumber',
    helpMessage: '生产远期用水小计',
    colProps: { span: STATION_WIDTH.COUNT_WIDTH },
    componentProps: () => {
      return {
        placeholder: '自定义placeholder',
        disabled: true,
      };
    },
  },
];
// 昼夜最大用水量
const makeMaxWaterDtoList: FormSchema[] = [
  {
    label: ' 近期昼夜最大用水量总计',
    labelWidth: STATION_WIDTH.COUNT_LABEL,
    field: 'makeMaxWaterDtoList_recent',
    component: 'InputNumber',
    helpMessage: '生产近期用水小计',
    colProps: { span: STATION_WIDTH.COUNT_WIDTH },
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
    labelWidth: STATION_WIDTH.COUNT_LABEL,
    field: 'makeMaxWaterDtoList_forward',
    component: 'InputNumber',
    helpMessage: '生产远期用水小计',
    colProps: { span: STATION_WIDTH.COUNT_WIDTH },
    componentProps: () => {
      return {
        placeholder: '自定义placeholder',
        disabled: true,
      };
    },
  },
];
// 昼夜最大排水水量
const drainMaxWaterDtoList: FormSchema[] = [
  {
    label: ' 近期昼夜最大排水量总计',
    labelWidth: STATION_WIDTH.COUNT_LABEL,
    field: 'drainMaxWaterDtoList_recent',
    component: 'InputNumber',
    helpMessage: '生产近期用水小计',
    colProps: { span: STATION_WIDTH.COUNT_WIDTH },
    componentProps: ({ schema }) => {
      console.log(schema);
      return {
        placeholder: '自定义placeholder',
        disabled: true,
      };
    },
  },
  {
    label: '远期昼夜最大排水量总计',
    labelWidth: STATION_WIDTH.COUNT_LABEL,
    field: 'drainMaxWaterDtoList_forward',
    component: 'InputNumber',
    helpMessage: '生产远期用水小计',
    colProps: { span: STATION_WIDTH.COUNT_WIDTH },
    componentProps: () => {
      return {
        placeholder: '自定义placeholder',
        disabled: true,
      };
    },
  },
];

// 根据不同的类型进行项目配置
export const ORDINARY_RAILWAY_SECTION_STATION = [
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
    schemas: serviceDtoList,
  },
  {
    title: '六、管网漏失',
    schemas: pipeNetworkDtoList,
  },
  {
    title: '七、基建未预见',
    schemas: capitalConstructionDtoList,
  },
  {
    title: '八、昼夜最大用水量',
    schemas: makeMaxWaterDtoList,
  },
  {
    title: '九、昼夜最大排水量',
    schemas: drainMaxWaterDtoList,
  },
];
export const ORDINARY_RAILWAY_INTERMEDIATE_STATION_OF = [
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
export const ORDINARY_RAILWAY_WILL_PASS_OVER_THE_STATION = [
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
    schemas: serviceDtoList,
  },
  {
    title: '六、管网漏失',
    schemas: pipeNetworkDtoList,
  },
  {
    title: '七、基建未预见',
    schemas: capitalConstructionDtoList,
  },
  {
    title: '八、近期昼夜最大用水量',
    schemas: makeMaxWaterDtoList,
  },
];
export const ORDINARY_RAILWAY_LINE_POLICE_AREA_ALONG = [
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
    schemas: serviceDtoList,
  },
  {
    title: '六、管网漏失',
    schemas: pipeNetworkDtoList,
  },
  {
    title: '七、基建未预见',
    schemas: capitalConstructionDtoList,
  },
  {
    title: '八、近期昼夜最大用水量',
    schemas: makeMaxWaterDtoList,
  },
];
export const HIGH_SPEED_RAILWAY_INTERMEDIATE_STATION = [
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
    schemas: serviceDtoList,
  },
  {
    title: '六、管网漏失',
    schemas: pipeNetworkDtoList,
  },
  {
    title: '七、基建未预见',
    schemas: capitalConstructionDtoList,
  },
  {
    title: '八、近期昼夜最大用水量',
    schemas: makeMaxWaterDtoList,
  },
];
export const HIGH_SPEED_TRAIN_DEPOT = [
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
    schemas: serviceDtoList,
  },
  {
    title: '六、管网漏失',
    schemas: pipeNetworkDtoList,
  },
  {
    title: '七、基建未预见',
    schemas: capitalConstructionDtoList,
  },
  {
    title: '八、近期昼夜最大用水量',
    schemas: makeMaxWaterDtoList,
  },
];
export const HIGH_SPEED_LARGE_STATIONS = [
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
    schemas: serviceDtoList,
  },
  {
    title: '六、管网漏失',
    schemas: pipeNetworkDtoList,
  },
  {
    title: '七、基建未预见',
    schemas: capitalConstructionDtoList,
  },
  {
    title: '八、近期昼夜最大用水量',
    schemas: makeMaxWaterDtoList,
  },
];
