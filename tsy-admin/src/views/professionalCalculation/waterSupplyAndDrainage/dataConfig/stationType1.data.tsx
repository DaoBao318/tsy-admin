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
    field: 'projectID',
    label: 'projectID:',
    component: 'InputNumber',
    colProps: { span: 23 },
    show: false,
  },
  {
    field: 'computeID',
    label: 'computeID:',
    component: 'InputNumber',
    colProps: { span: 23 },
    show: false,
  },
  {
    field: 'projectName',
    label: 'projectName:',
    component: 'InputNumber',
    colProps: { span: 23 },
    show: false,
  },
  {
    label: '车站名称:',
    field: 'stationName',
    component: 'Input',
    colProps: { span: 23 },
    componentProps: {
      disabled: true,
    },
  },
  {
    label: '车站名称:',
    field: 'stationTypeName',
    component: 'Input',
    colProps: { span: 23 },
    componentProps: {
      disabled: true,
    },
  },
  {
    label: '车站类型:',
    field: 'stationType',
    component: 'Select',
    colProps: { span: 23 },
    show: false,
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
    colProps: { span: 8 },
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
    colProps: { span: 3 },

    componentProps: ({ schema, formModel, formActionType }) => {
      return {
        placeholder: '请选择单位用水量',
        disabled: false,
        onChange: (value) => {
          if (formModel.unitWaterMan === 0 && value !== formModel.unitWaterMin) {
            message.warn('单位用水量建议与推荐值保持一致', 1);
          } else {
            if (value < formModel.unitWaterMin || value > formModel.unitWaterMan) {
              message.warn('单位用水量不建议超出用水量的范围', 1);
            }
          }
          const proxyData = { [formModel.stationID]: window.allFormList };
          subtotalOfWaterConsumption(formModel, proxyData);
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
    colProps: { span: 3 },
    // show: false,
    componentProps: {
      disabled: true,
    },
  },
];
export const servicesUseTableSchemas: FormSchema[] = [
  {
    label: '用水项目',
    field: 'waterProject',
    component: 'Input',
    colProps: { span: 8 },
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
    label: '单位用水百分比',
    field: 'unitWater',
    component: 'InputNumberExpand',
    required: true,
    colProps: { span: 3 },

    componentProps: ({ schema, formModel, formActionType }) => {
      return {
        placeholder: '请选择单位用水量',
        disabled: false,
        onChange: (value) => {
          if (formModel.unitWaterMan === 0 && value !== formModel.unitWaterMin) {
            message.warn('单位用水量建议与推荐值保持一致', 1);
          } else {
            if (value < formModel.unitWaterMin || value > formModel.unitWaterMan) {
              message.warn('单位用水量不建议超出用水量的范围', 1);
            }
          }
          const proxyData = { [formModel.stationID]: window.allFormList };
          subtotalOfWaterConsumption(formModel, proxyData);
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
    colProps: { span: 3 },
    // show: false,
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
        placeholder: '请先输入',
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
    helpMessage: '旅客单位用水量*近期数量之和',
    colProps: { span: STATION_WIDTH.COUNT_WIDTH },
    componentProps: ({ schema, formModel }) => {
      return {
        placeholder: '请先输入',
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
    helpMessage: '旅客单位用水量*远期数量之和',
    colProps: { span: STATION_WIDTH.COUNT_WIDTH },
    componentProps: ({ schema, formModel }) => {
      return {
        placeholder: '请先输入',
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
    helpMessage: '生产单位用水量*近期数量之和',
    colProps: { span: STATION_WIDTH.COUNT_WIDTH },
    componentProps: ({ schema, formModel }) => {
      return {
        placeholder: '请先输入',
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
    helpMessage: '生产单位用水量*远期数量之和',
    colProps: { span: STATION_WIDTH.COUNT_WIDTH },
    componentProps: () => {
      return {
        placeholder: '请先输入',
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
    helpMessage: '生活单位用水量*近期数量之和',
    colProps: { span: STATION_WIDTH.COUNT_WIDTH },
    componentProps: ({ formModel }) => {
      setTimeout(() => {
        window.allFormList = formModel;
        console.log('==============================打印所有数据formModel============:', formModel);
      }, 0);

      return {
        placeholder: '请先输入',
        disabled: true,
        immediate: false,
      };
    },
  },
  {
    label: '生活远期用水小计',
    labelWidth: STATION_WIDTH.COUNT_LABEL,
    field: 'lifeDtoList_forward',
    component: 'InputNumber',
    helpMessage: '生活单位用水量*远期数量之和',
    colProps: { span: STATION_WIDTH.COUNT_WIDTH },
    componentProps: () => {
      return {
        placeholder: '请先输入',
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
    helpMessage: '绿化单位用水量*近期数量之和',
    colProps: { span: STATION_WIDTH.COUNT_WIDTH },
    componentProps: ({ schema, formModel }) => {
      return {
        placeholder: '请先输入',
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
    helpMessage: '绿化单位用水量*远期数量之和',
    colProps: { span: STATION_WIDTH.COUNT_WIDTH },
    componentProps: () => {
      return {
        placeholder: '请先输入',
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
    helpMessage: '近期的（运输用水+生产用水+生活用水+绿化用水）*单位用水量',
    colProps: { span: STATION_WIDTH.COUNT_WIDTH },
    componentProps: ({ schema }) => {
      return {
        placeholder: '请先输入',
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
    helpMessage: '远期的（运输用水+生产用水+生活用水+绿化用水）*单位用水量',
    colProps: { span: STATION_WIDTH.COUNT_WIDTH },
    componentProps: () => {
      return {
        placeholder: '请先输入',
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
    helpMessage: '近期的（运输用水+生产用水+生活用水+绿化用水）*单位用水量',
    colProps: { span: STATION_WIDTH.COUNT_WIDTH },
    componentProps: ({ schema }) => {
      return {
        placeholder: '请先输入',
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
    helpMessage: '远期的（运输用水+生产用水+生活用水+绿化用水）*单位用水量',
    colProps: { span: STATION_WIDTH.COUNT_WIDTH },
    componentProps: () => {
      return {
        placeholder: '请先输入',
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
    helpMessage: '近期的（运输用水+生产用水+生活用水+绿化用水+管网漏失）*单位用水量',
    colProps: { span: STATION_WIDTH.COUNT_WIDTH },
    componentProps: ({ schema }) => {
      return {
        placeholder: '请先输入',
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
    helpMessage: '远期的（运输用水+生产用水+生活用水+绿化用水+管网漏失）*单位用水量',
    colProps: { span: STATION_WIDTH.COUNT_WIDTH },
    componentProps: () => {
      return {
        placeholder: '请先输入',
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
    helpMessage:
      '远期的（运输用水+生产用水+生活用水+绿化用水+服务行业+管网漏失+基建未预见）小计之和',
    colProps: { span: STATION_WIDTH.COUNT_WIDTH },
    componentProps: ({ schema }) => {
      return {
        placeholder: '请先输入',
        disabled: true,
      };
    },
  },
  {
    label: '远期昼夜最大用水量总计',
    labelWidth: STATION_WIDTH.COUNT_LABEL,
    field: 'makeMaxWaterDtoList_forward',
    component: 'InputNumber',
    helpMessage:
      '远期的（运输用水+生产用水+生活用水+绿化用水+服务行业+管网漏失+基建未预见）小计之和',
    colProps: { span: STATION_WIDTH.COUNT_WIDTH },
    componentProps: () => {
      return {
        placeholder: '请先输入',
        disabled: true,
      };
    },
  },
];
// 昼夜最大排水量（生产污水）
const producedrainMaxWaterDtoList: FormSchema[] = [
  {
    label: '',
    labelWidth: 0,
    field: 'producedrainMaxWaterDtoList',
    component: 'Input',
    colProps: { span: 24 },
    slot: 'producedrainMaxWaterDtoList',
  },
  {
    label: ' 近期昼夜最大排水量（生产污水）',
    labelWidth: STATION_WIDTH.COUNT_LABEL,
    field: 'producedrainMaxWaterDtoList_recent',
    component: 'InputNumber',
    helpMessage: '近期生产污水小计*单位用水量',
    colProps: { span: STATION_WIDTH.COUNT_WIDTH },
    componentProps: ({ schema }) => {
      return {
        placeholder: '请先输入',
        disabled: true,
      };
    },
  },
  {
    label: '远期昼夜最大排水量（生产污水）',
    labelWidth: STATION_WIDTH.COUNT_LABEL,
    field: 'producedrainMaxWaterDtoList_forward',
    component: 'InputNumber',
    helpMessage: '近期生产污水小计*单位用水量',
    colProps: { span: STATION_WIDTH.COUNT_WIDTH },
    componentProps: () => {
      return {
        placeholder: '请先输入',
        disabled: true,
      };
    },
  },
];
// 昼夜最大排水量（生活污水）
const lifedrainMaxWaterDtoList: FormSchema[] = [
  {
    label: '',
    labelWidth: 0,
    field: 'lifedrainMaxWaterDtoList',
    component: 'Input',
    colProps: { span: 24 },
    slot: 'lifedrainMaxWaterDtoList',
  },
  {
    label: ' 近期昼夜最大排水量（生活污水）',
    labelWidth: STATION_WIDTH.COUNT_LABEL,
    field: 'lifedrainMaxWaterDtoList_recent',
    component: 'InputNumber',
    helpMessage: '近期生活污水小计*单位用水量',
    colProps: { span: STATION_WIDTH.COUNT_WIDTH },
    componentProps: ({ schema }) => {
      return {
        placeholder: '请先输入',
        disabled: true,
      };
    },
  },
  {
    label: '远期昼夜最大排水量（生活污水）',
    labelWidth: STATION_WIDTH.COUNT_LABEL,
    field: 'lifedrainMaxWaterDtoList_forward',
    component: 'InputNumber',
    helpMessage: '远期生活污水小计*单位用水量',
    colProps: { span: STATION_WIDTH.COUNT_WIDTH },
    componentProps: () => {
      return {
        placeholder: '请先输入',
        disabled: true,
      };
    },
  },
];
// 昼夜最大排水量（运输污水）
const passengerTrainsFecalSewageDtoList: FormSchema[] = [
  {
    label: '',
    labelWidth: 0,
    field: 'passengerTrainsFecalSewageDtoList',
    component: 'Input',
    colProps: { span: 24 },
    slot: 'passengerTrainsFecalSewageDtoList',
  },
  {
    label: ' 近期昼夜最大排水量（运输污水）',
    labelWidth: STATION_WIDTH.COUNT_LABEL,
    field: 'passengerTrainsFecalSewageDtoList_recent',
    component: 'InputNumber',
    helpMessage: '近期运输污水小计*单位用水量',
    colProps: { span: STATION_WIDTH.COUNT_WIDTH },
    componentProps: ({ schema }) => {
      return {
        placeholder: '请先输入',
        disabled: true,
      };
    },
  },
  {
    label: '远期昼夜最大排水量（运输污水）',
    labelWidth: STATION_WIDTH.COUNT_LABEL,
    field: 'passengerTrainsFecalSewageDtoList_forward',
    component: 'InputNumber',
    helpMessage: '远期运输污水小计*单位用水量',
    colProps: { span: STATION_WIDTH.COUNT_WIDTH },
    componentProps: () => {
      return {
        placeholder: '请先输入',
        disabled: true,
      };
    },
  },
];
// 设计污水量
const designSewageVolumeDtoList: FormSchema[] = [
  {
    label: ' 近期设计污水量',
    labelWidth: STATION_WIDTH.COUNT_LABEL,
    field: 'designSewageVolumeDtoList_recent',
    component: 'InputNumber',
    helpMessage: '近期（运输污水小计+生产污水小计+生活污水小计）之和',
    colProps: { span: STATION_WIDTH.COUNT_WIDTH },
    componentProps: ({ schema }) => {
      return {
        placeholder: '请先输入',
        disabled: true,
      };
    },
  },
  {
    label: '近期设计污水量',
    labelWidth: STATION_WIDTH.COUNT_LABEL,
    field: 'designSewageVolumeDtoList_forward',
    component: 'InputNumber',
    helpMessage: '远期（运输污水小计+生产污水小计+生活污水小计）之和',
    colProps: { span: STATION_WIDTH.COUNT_WIDTH },
    componentProps: () => {
      return {
        placeholder: '请先输入',
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
    title: '九、昼夜最大排水量（运输污水）',
    schemas: passengerTrainsFecalSewageDtoList,
  },
  {
    title: '十、昼夜最大排水量（生产污水）',
    schemas: producedrainMaxWaterDtoList,
  },
  {
    title: '十一、昼夜最大排水量（生活污水）',
    schemas: lifedrainMaxWaterDtoList,
  },

  {
    title: '十二、设计污水量',
    schemas: designSewageVolumeDtoList,
  },
];
export const ORDINARY_RAILWAY_INTERMEDIATE_STATION_OF = [
  {
    title: '基本配置',
    schemas: basicSchema,
  },
  {
    title: '一、生产用水',
    schemas: productUseWaterSchemas,
  },
  {
    title: '二、生活用水',
    schemas: lifeUseWaterSchemas,
  },
  {
    title: '三、绿化及浇洒道路',
    schemas: greenAndRoadWaterSchemas,
  },
  {
    title: '四、服务行业用水',
    schemas: serviceDtoList,
  },
  {
    title: '五、管网漏失',
    schemas: pipeNetworkDtoList,
  },
  {
    title: '六、基建未预见',
    schemas: capitalConstructionDtoList,
  },
  {
    title: '七、昼夜最大用水量',
    schemas: makeMaxWaterDtoList,
  },
  {
    title: '八、昼夜最大排水量（生产污水）',
    schemas: producedrainMaxWaterDtoList,
  },
  {
    title: '九、昼夜最大排水量（生活污水）',
    schemas: lifedrainMaxWaterDtoList,
  },
  {
    title: '十、设计污水量',
    schemas: designSewageVolumeDtoList,
  },
];
export const ORDINARY_RAILWAY_WILL_PASS_OVER_THE_STATION = [
  {
    title: '基本配置',
    schemas: basicSchema,
  },
  {
    title: '一、生产用水',
    schemas: productUseWaterSchemas,
  },
  {
    title: '二、生活用水',
    schemas: lifeUseWaterSchemas,
  },
  {
    title: '三、绿化及浇洒道路',
    schemas: greenAndRoadWaterSchemas,
  },
  {
    title: '四、管网漏失',
    schemas: pipeNetworkDtoList,
  },
  {
    title: '五、基建未预见',
    schemas: capitalConstructionDtoList,
  },
  {
    title: '六、昼夜最大用水量',
    schemas: makeMaxWaterDtoList,
  },
  {
    title: '七、昼夜最大排水量（生产污水）',
    schemas: producedrainMaxWaterDtoList,
  },
  {
    title: '八、昼夜最大排水量（生活污水）',
    schemas: lifedrainMaxWaterDtoList,
  },
  {
    title: '九、设计污水量',
    schemas: designSewageVolumeDtoList,
  },
];
export const ORDINARY_RAILWAY_LINE_POLICE_AREA_ALONG = [
  {
    title: '基本配置',
    schemas: basicSchema,
  },
  {
    title: '二、生活用水',
    schemas: lifeUseWaterSchemas,
  },
  {
    title: '三、绿化及浇洒道路',
    schemas: greenAndRoadWaterSchemas,
  },
  {
    title: '四、管网漏失',
    schemas: pipeNetworkDtoList,
  },
  {
    title: '五、基建未预见',
    schemas: capitalConstructionDtoList,
  },
  {
    title: '六、昼夜最大用水量',
    schemas: makeMaxWaterDtoList,
  },
  {
    title: '七、昼夜最大排水量（生产污水）',
    schemas: producedrainMaxWaterDtoList,
  },
  {
    title: '八、昼夜最大排水量（生活污水）',
    schemas: lifedrainMaxWaterDtoList,
  },
  {
    title: '九、设计污水量',
    schemas: designSewageVolumeDtoList,
  },
];
export const HIGH_SPEED_RAILWAY_INTERMEDIATE_STATION = [
  {
    title: '基本配置',
    schemas: basicSchema,
  },
  {
    title: '一、生产用水',
    schemas: productUseWaterSchemas,
  },
  {
    title: '二、生活用水',
    schemas: lifeUseWaterSchemas,
  },
  {
    title: '三、绿化及浇洒道路',
    schemas: greenAndRoadWaterSchemas,
  },
  {
    title: '四、服务行业用水',
    schemas: serviceDtoList,
  },
  {
    title: '五、管网漏失',
    schemas: pipeNetworkDtoList,
  },
  {
    title: '六、基建未预见',
    schemas: capitalConstructionDtoList,
  },
  {
    title: '七、昼夜最大用水量',
    schemas: makeMaxWaterDtoList,
  },
  {
    title: '八、昼夜最大排水量（生产污水）',
    schemas: producedrainMaxWaterDtoList,
  },
  {
    title: '九、昼夜最大排水量（生活污水）',
    schemas: lifedrainMaxWaterDtoList,
  },
  {
    title: '十、设计污水量',
    schemas: designSewageVolumeDtoList,
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
    title: '八、昼夜最大用水量',
    schemas: makeMaxWaterDtoList,
  },
  {
    title: '九、昼夜最大排水量（运输污水）',
    schemas: passengerTrainsFecalSewageDtoList,
  },
  {
    title: '十、昼夜最大排水量（生产污水）',
    schemas: producedrainMaxWaterDtoList,
  },
  {
    title: '十一、昼夜最大排水量（生活污水）',
    schemas: lifedrainMaxWaterDtoList,
  },
  {
    title: '十二、设计污水量',
    schemas: designSewageVolumeDtoList,
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
    title: '八、昼夜最大用水量',
    schemas: makeMaxWaterDtoList,
  },
  {
    title: '九、昼夜最大排水量（运输污水）',
    schemas: passengerTrainsFecalSewageDtoList,
  },
  {
    title: '十、昼夜最大排水量（生产污水）',
    schemas: producedrainMaxWaterDtoList,
  },
  {
    title: '十一、昼夜最大排水量（生活污水）',
    schemas: lifedrainMaxWaterDtoList,
  },
  {
    title: '十二、设计污水量',
    schemas: designSewageVolumeDtoList,
  },
];
