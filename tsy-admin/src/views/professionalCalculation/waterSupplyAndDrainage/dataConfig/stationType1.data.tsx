// eg: 会让站配置数据
import { STATION_TYPE_OPTIONS, STATION_WIDTH } from './constant';
import { FormSchema } from '/@/components/Table';
import { message } from 'ant-design-vue';
import { subtotalOfWaterConsumption } from '../utilsWaterSupplyAndDrainage';
// import { waterSourceStore } from '/@/store/modules/waterInfo';
// const store = waterSourceStore();

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
    colProps: { span: 12 },
    componentProps: {
      disabled: true,
    },
  },
  {
    label: '车站类型:',
    field: 'stationTypeName',
    component: 'Input',
    colProps: { span: 12 },
    componentProps: {
      disabled: true,
    },
  },
  {
    label: '车站类型:',
    field: 'stationType',
    component: 'Select',
    colProps: { span: 12 },
    show: false,
    componentProps: {
      disabled: true,
      options: STATION_TYPE_OPTIONS,
    },
  },
];

export const travelerUseTableSchemas: FormSchema[] = [
  {
    label: '用水项目',
    field: 'waterProject',
    component: 'InputColor',
    colProps: { span: STATION_WIDTH.NUMBER_PRODUCT },
    componentProps: {
      disabled: true,
      size: 'small',
    },
  },
  {
    label: '单位',
    field: 'unit',
    component: 'InputColor',
    colProps: { span: STATION_WIDTH.NUMBER_WIDTH },
    componentProps: {
      disabled: true,
      size: 'small',
    },
  },
  {
    label: '数量(近期)',
    field: 'recentQuantity',
    component: 'InputNumber',
    colProps: { span: STATION_WIDTH.NUMBER_NUMBER },
    componentProps: {
      disabled: true,
      size: 'small',
    },
  },
  {
    label: '数量(远期)',
    field: 'forwardQuantity',
    component: 'InputNumber',
    colProps: { span: STATION_WIDTH.NUMBER_NUMBER },
    componentProps: {
      disabled: true,
      size: 'small',
    },
  },
  {
    label: '单位用水量(m³)',
    field: 'unitWater',
    component: 'InputNumberExpand40',
    required: true,
    colProps: { span: STATION_WIDTH.NUMBER_NUMBER },

    componentProps: ({ formModel }) => {
      return {
        placeholder: '请选择单位用水量',
        disabled: false,
        size: 'small',
        onChange: function () {
          const proxyData = { [formModel.stationID]: window.allFormList };
          subtotalOfWaterConsumption(formModel, proxyData);
        },
        onBlur: (value) => {
          const target = value.target;
          value = Number(value.currentTarget.value);
          target.style.color = '';
          if (
            formModel.unitWaterMan === formModel.unitWaterMin &&
            value !== formModel.unitWaterMin
          ) {
            message.warn('单位用水量建议与推荐值保持一致', 3);
            target.style.color = 'red';
          } else {
            if (value < formModel.unitWaterMin || value > formModel.unitWaterMan) {
              message.warn('单位用水量不建议超出用水量的范围', 3);
              target.style.color = 'red';
            }
          }
        },
      };
    },
  },
  {
    label: '日用水量(近期m³)',
    field: 'recentConsumption',
    component: 'InputNumberExpand42',
    colProps: { span: STATION_WIDTH.NUMBER_NUMBER },
    componentProps: {
      disabled: true,
      size: 'small',
    },
  },
  {
    label: '日用水量(远期m³)',
    field: 'forwardConsumption',
    component: 'InputNumberExpand42',
    colProps: { span: STATION_WIDTH.NUMBER_NUMBER },
    componentProps: {
      disabled: true,
      size: 'small',
    },
  },
  {
    label: '单位用水量推荐值',
    field: 'recommendedUnitWater',
    component: 'Input',
    colProps: { span: STATION_WIDTH.NUMBER_RECOMMEND },
    recommendedUnitWater: true,
    // show: false,
    componentProps: {
      disabled: true,
      size: 'small',
    },
  },
];
export const servicesUseTableSchemas: FormSchema[] = [
  {
    label: '用水项目',
    field: 'waterProject',
    component: 'InputColor',
    colProps: { span: STATION_WIDTH.NUMBER_PRODUCT },
    componentProps: {
      disabled: true,
      size: 'small',
    },
  },
  {
    label: '单位',
    field: 'unit',
    component: 'InputColor',
    colProps: { span: STATION_WIDTH.NUMBER_WIDTH },
    componentProps: {
      disabled: true,
      size: 'small',
    },
  },
  {
    label: '数量(近期)',
    field: 'recentQuantity',
    component: 'InputNumber',
    colProps: { span: STATION_WIDTH.NUMBER_NUMBER },
    componentProps: {
      disabled: true,
      size: 'small',
    },
  },
  {
    label: '数量(远期)',
    field: 'forwardQuantity',
    component: 'InputNumber',
    colProps: { span: STATION_WIDTH.NUMBER_NUMBER },
    componentProps: {
      disabled: true,
      size: 'small',
    },
  },
  {
    label: '单位用水百分比',
    field: 'unitWater',
    component: 'InputNumberExpand40',
    required: true,
    colProps: { span: STATION_WIDTH.NUMBER_NUMBER },

    componentProps: ({ formModel }) => {
      return {
        placeholder: '请选择单位用水百分比',
        disabled: false,
        size: 'small',
        onChange: function () {
          const proxyData = { [formModel.stationID]: window.allFormList };
          subtotalOfWaterConsumption(formModel, proxyData);
        },
        onBlur: (value) => {
          const target = value.target;
          value = Number(value.currentTarget.value);
          target.style.color = '';
          if (
            formModel.unitWaterMan === formModel.unitWaterMin &&
            value !== formModel.unitWaterMin
          ) {
            message.warn('单位用水百分比建议与推荐值保持一致', 3);
            target.style.color = '#ff4d4f';
          } else {
            if (value < formModel.unitWaterMin || value > formModel.unitWaterMan) {
              message.warn('单位用水百分比不建议超出用水量的范围', 3);
              target.style.color = '#ff4d4f';
            }
          }
        },
      };
    },
  },
  {
    label: '日用水量(近期m³)',
    field: 'recentConsumption',
    component: 'InputNumberExpand42',
    colProps: { span: STATION_WIDTH.NUMBER_NUMBER },
    componentProps: {
      disabled: true,
      size: 'small',
    },
  },
  {
    label: '日用水量(远期m³)',
    field: 'forwardConsumption',
    component: 'InputNumberExpand42',
    colProps: { span: STATION_WIDTH.NUMBER_NUMBER },
    componentProps: {
      disabled: true,
      size: 'small',
    },
  },
  {
    label: '单位用水百分比推荐值',
    field: 'recommendedUnitWater',
    component: 'Input',
    colProps: { span: STATION_WIDTH.NUMBER_RECOMMEND },
    // show: false,
    recommendedUnitWater: true,
    componentProps: {
      disabled: true,
      size: 'small',
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
    componentProps: () => {
      return {
        disabled: true,
        immediate: true,
      };
    },
  },
  {
    label: '旅客近期用水小计',
    labelWidth: STATION_WIDTH.COUNT_LABEL,
    field: 'passengerTransportationDtoList_recent',
    component: 'InputNumberExpand40',
    helpMessage: '旅客单位用水量*近期数量之和',
    colProps: { span: STATION_WIDTH.COUNT_WIDTH },
    componentProps: () => {
      return {
        disabled: true,
        immediate: false,
      };
    },
  },
  {
    label: '旅客远期用水小计',
    labelWidth: STATION_WIDTH.COUNT_LABEL,
    field: 'passengerTransportationDtoList_forward',
    component: 'InputNumberExpand40',
    helpMessage: '旅客单位用水量*远期数量之和',
    colProps: { span: STATION_WIDTH.COUNT_WIDTH },
    componentProps: () => {
      return {
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
    component: 'InputNumberExpand40',
    helpMessage: '生产单位用水量*近期数量之和',
    colProps: { span: STATION_WIDTH.COUNT_WIDTH },
    componentProps: () => {
      return {
        disabled: true,
        immediate: true,
      };
    },
  },
  {
    label: '生产远期用水小计',
    labelWidth: STATION_WIDTH.COUNT_LABEL,
    field: 'produceDtoList_forward',
    component: 'InputNumberExpand40',
    helpMessage: '生产单位用水量*远期数量之和',
    colProps: { span: STATION_WIDTH.COUNT_WIDTH },
    componentProps: () => {
      return {
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
    component: 'InputNumberExpand40',
    helpMessage: '生活单位用水量*近期数量之和',
    colProps: { span: STATION_WIDTH.COUNT_WIDTH },
    componentProps: ({ formModel }) => {
      setTimeout(() => {
        window.allFormList = formModel;
        console.log('==============================打印所有数据formModel============:', formModel);
      }, 0);

      return {
        disabled: true,
        immediate: false,
      };
    },
  },
  {
    label: '生活远期用水小计',
    labelWidth: STATION_WIDTH.COUNT_LABEL,
    field: 'lifeDtoList_forward',
    component: 'InputNumberExpand40',
    helpMessage: '生活单位用水量*远期数量之和',
    colProps: { span: STATION_WIDTH.COUNT_WIDTH },
    componentProps: () => {
      return {
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
    component: 'InputNumberExpand40',
    helpMessage: '绿化单位用水量*近期数量之和',
    colProps: { span: STATION_WIDTH.COUNT_WIDTH },
    componentProps: () => {
      return {
        disabled: true,
        immediate: true,
      };
    },
  },
  {
    label: '绿化远期用水小计',
    labelWidth: STATION_WIDTH.COUNT_LABEL,
    field: 'makeGreenSprinklingDtoList_forward',
    component: 'InputNumberExpand40',
    helpMessage: '绿化单位用水量*远期数量之和',
    colProps: { span: STATION_WIDTH.COUNT_WIDTH },
    componentProps: () => {
      return {
        disabled: true,
        immediate: true,
      };
    },
  },
];

// 服务用水小计
const serviceDtoListType = (helpMessage): FormSchema[] => {
  return [
    {
      label: '',
      labelWidth: 0,
      field: 'serviceDtoList',
      component: 'Input',
      colProps: { span: 24 },
      slot: 'serviceDtoList',
    },
    {
      label: '服务近期用水小计',
      labelWidth: STATION_WIDTH.COUNT_LABEL,
      field: 'serviceDtoList_recent',
      component: 'InputNumberExpand40',
      helpMessage: '近期的' + helpMessage,
      colProps: { span: STATION_WIDTH.COUNT_WIDTH },
      componentProps: () => {
        return {
          disabled: true,
          immediate: true,
        };
      },
    },
    {
      label: '服务远期用水小计',
      labelWidth: STATION_WIDTH.COUNT_LABEL,
      field: 'serviceDtoList_forward',
      component: 'InputNumberExpand40',
      helpMessage: '远期的' + helpMessage,
      colProps: { span: STATION_WIDTH.COUNT_WIDTH },
      componentProps: () => {
        return {
          disabled: true,
          immediate: true,
        };
      },
    },
  ];
};
// 管网漏失及基建、未预见水量 又分开处理 作废
// export const pipeAndCapitalConstructionDtoList: FormSchema[] = [
//   {
//     label: '管网漏失及基建、未预见近期水量',
//     labelWidth: STATION_WIDTH.COUNT_LABEL,
//     field: 'pipeAndCapitalConstructionDtoList_recent',
//     component: 'InputNumberExpand40',
//     helpMessage: '近期的生产用水、生活用水、浇洒道路及绿化用水之和乘以15%',
//     colProps: { span: STATION_WIDTH.COUNT_WIDTH },
//     componentProps: () => {
//       return {
//         disabled: true,
//         immediate: true,
//       };
//     },
//   },
//   {
//     label: '管网漏失及基建、未预见远期水量',
//     labelWidth: STATION_WIDTH.COUNT_LABEL,
//     field: 'pipeAndCapitalConstructionDtoList_forward',
//     component: 'InputNumberExpand40',
//     helpMessage: '远期的生产用水、生活用水、浇洒道路及绿化用水之和乘以15%',
//     colProps: { span: STATION_WIDTH.COUNT_WIDTH },
//     componentProps: () => {
//       return {
//         disabled: true,
//         immediate: true,
//       };
//     },
//   },
// ];

// 管网漏失
const pipeNetworkDtoListType = (helpMessage): FormSchema[] => {
  return [
    {
      label: '',
      labelWidth: 0,
      field: 'pipeNetworkDtoList',
      component: 'Input',
      colProps: { span: 24 },
      slot: 'pipeNetworkDtoList',
    },
    {
      label: '管网漏失近期的用水小计',
      labelWidth: STATION_WIDTH.COUNT_LABEL,
      field: 'pipeNetworkDtoList_recent',
      component: 'InputNumberExpand40',
      helpMessage: '近期的' + helpMessage,
      colProps: { span: STATION_WIDTH.COUNT_WIDTH },
      componentProps: () => {
        return {
          disabled: true,
          immediate: true,
        };
      },
    },
    {
      label: '管网漏失远期的用水小计',
      labelWidth: STATION_WIDTH.COUNT_LABEL,
      field: 'pipeNetworkDtoList_forward',
      component: 'InputNumberExpand40',
      helpMessage: '远期的' + helpMessage,
      colProps: { span: STATION_WIDTH.COUNT_WIDTH },
      componentProps: () => {
        return {
          disabled: true,
          immediate: true,
        };
      },
    },
  ];
};
// 基建未预见
const capitalConstructionDtoList = (helpMessage): FormSchema[] => [
  {
    label: '',
    labelWidth: 0,
    field: 'capitalConstructionDtoList',
    component: 'Input',
    colProps: { span: 24 },
    slot: 'capitalConstructionDtoList',
  },
  {
    label: '基建未预见近期用水小计',
    labelWidth: STATION_WIDTH.COUNT_LABEL,
    field: 'capitalConstructionDtoList_recent',
    component: 'InputNumberExpand40',
    helpMessage: '近期的' + helpMessage,
    colProps: { span: STATION_WIDTH.COUNT_WIDTH },
    componentProps: () => {
      return {
        disabled: true,
        immediate: true,
      };
    },
  },
  {
    label: '基建未预见远期用水小计',
    labelWidth: STATION_WIDTH.COUNT_LABEL,
    field: 'capitalConstructionDtoList_forward',
    component: 'InputNumberExpand40',
    helpMessage: '远期的' + helpMessage,
    colProps: { span: STATION_WIDTH.COUNT_WIDTH },
    componentProps: () => {
      return {
        disabled: true,
      };
    },
  },
];
// 昼夜最大用水量
const makeMaxWaterDtoList = (helpMessage): FormSchema[] => [
  {
    label: ' 近期昼夜最大用水量总计',
    labelWidth: STATION_WIDTH.COUNT_LABEL,
    field: 'makeMaxWaterDtoList_recent',
    component: 'InputNumberExpand40',
    helpMessage: '近期的' + helpMessage,
    colProps: { span: STATION_WIDTH.COUNT_WIDTH },
    componentProps: () => {
      return {
        disabled: true,
      };
    },
  },
  {
    label: '远期昼夜最大用水量总计',
    labelWidth: STATION_WIDTH.COUNT_LABEL,
    field: 'makeMaxWaterDtoList_forward',
    component: 'InputNumberExpand40',
    helpMessage: '远期的' + helpMessage,
    colProps: { span: STATION_WIDTH.COUNT_WIDTH },
    componentProps: () => {
      return {
        disabled: true,
      };
    },
  },
];
// 生产生活排水量
const designSewageVolumeNewDtoList = (helpMessage): FormSchema[] => [
  {
    label: '',
    labelWidth: 0,
    field: 'designSewageVolumeNewDtoList',
    component: 'Input',
    colProps: { span: 24 },
    slot: 'designSewageVolumeNewDtoList',
  },
  {
    label: '近期生产生活排水量',
    labelWidth: STATION_WIDTH.COUNT_LABEL,
    field: 'designSewageVolumeNewDtoList_recent',
    component: 'InputNumberExpand40',
    helpMessage: '近期的' + helpMessage,
    colProps: { span: STATION_WIDTH.COUNT_WIDTH },
    componentProps: () => {
      return {
        disabled: true,
      };
    },
  },
  {
    label: '远期生产生活排水量',
    labelWidth: STATION_WIDTH.COUNT_LABEL,
    field: 'designSewageVolumeNewDtoList_forward',
    component: 'InputNumberExpand40',
    helpMessage: '远期的' + helpMessage,
    colProps: { span: STATION_WIDTH.COUNT_WIDTH },
    componentProps: () => {
      return {
        disabled: true,
      };
    },
  },
];
// 旅客列车集便污水量
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
    label: ' 近期旅客列车集便污水量',
    labelWidth: STATION_WIDTH.COUNT_LABEL,
    field: 'passengerTrainsFecalSewageDtoList_recent',
    component: 'InputNumberExpand40',
    helpMessage: '近期运输污水小计*单位用水百分比',
    colProps: { span: STATION_WIDTH.COUNT_WIDTH },
    componentProps: () => {
      return {
        disabled: true,
      };
    },
  },
  {
    label: '远期旅客列车集便污水量',
    labelWidth: STATION_WIDTH.COUNT_LABEL,
    field: 'passengerTrainsFecalSewageDtoList_forward',
    component: 'InputNumberExpand40',
    helpMessage: '远期运输污水小计*单位用水百分比',
    colProps: { span: STATION_WIDTH.COUNT_WIDTH },
    componentProps: () => {
      return {
        disabled: true,
      };
    },
  },
];
// 昼夜最大排水量
const makeMaxDrainageDtoList = (helpMessage): FormSchema[] => [
  {
    label: ' 近期昼夜最大排水量',
    labelWidth: STATION_WIDTH.COUNT_LABEL,
    field: 'makeMaxDrainageDtoList_recent',
    component: 'InputNumberExpand40',
    helpMessage: '近期的' + helpMessage,
    colProps: { span: STATION_WIDTH.COUNT_WIDTH },
    componentProps: () => {
      return {
        disabled: true,
      };
    },
  },
  {
    label: '远期昼夜最大排水量',
    labelWidth: STATION_WIDTH.COUNT_LABEL,
    field: 'makeMaxDrainageDtoList_forward',
    component: 'InputNumberExpand40',
    helpMessage: '远期的' + helpMessage,
    colProps: { span: STATION_WIDTH.COUNT_WIDTH },
    componentProps: () => {
      return {
        disabled: true,
      };
    },
  },
];
// 昼夜最大排水量 有系数
const makeMaxDrainageDtoListCoefficient = (helpMessage): FormSchema[] => [
  {
    label: '',
    labelWidth: 0,
    field: 'makeMaxDrainageDtoList',
    component: 'Input',
    colProps: { span: 24 },
    slot: 'makeMaxDrainageDtoList',
  },
  {
    label: ' 近期昼夜最大排水量',
    labelWidth: STATION_WIDTH.COUNT_LABEL,
    field: 'makeMaxDrainageDtoList_recent',
    component: 'InputNumberExpand40',
    helpMessage: '近期的' + helpMessage,
    colProps: { span: STATION_WIDTH.COUNT_WIDTH },
    componentProps: () => {
      return {
        disabled: true,
      };
    },
  },
  {
    label: '远期昼夜最大排水量',
    labelWidth: STATION_WIDTH.COUNT_LABEL,
    field: 'makeMaxDrainageDtoList_forward',
    component: 'InputNumberExpand40',
    helpMessage: '远期的' + helpMessage,
    colProps: { span: STATION_WIDTH.COUNT_WIDTH },
    componentProps: () => {
      return {
        disabled: true,
      };
    },
  },
];

// 根据不同的类型进行项目配置
//01
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
    schemas: serviceDtoListType('（运输用水+生产用水+生活用水+绿化用水）*单位用水百分比'),
  },
  {
    title: '六、管网漏失',
    schemas: pipeNetworkDtoListType('（运输用水+生产用水+生活用水+绿化用水）*单位用水百分比'),
  },
  {
    title: '七、基建未预见',
    schemas: capitalConstructionDtoList(
      '（运输用水+生产用水+生活用水+绿化用水+管网漏失）*单位用水百分比',
    ),
  },
  {
    title: '八、昼夜最大用水量',
    schemas: makeMaxWaterDtoList(
      '（运输用水+生产用水+生活用水+绿化用水+服务行业+管网漏失+基建未预见）小计之和',
    ),
  },
  {
    title: '九、旅客列车集便污水量',
    schemas: passengerTrainsFecalSewageDtoList,
  },
  {
    title: '十、生产生活排水量',
    schemas: designSewageVolumeNewDtoList('（生产用水 + 生活用水 + 服务行业用水）*单位用水百分比'),
  },

  {
    title: '十二、昼夜最大排水量',
    schemas: makeMaxDrainageDtoList('（旅客列车集便污水量小计+生产生活排水小计）之和'),
  },
];
//09 折返段
export const PASSENGER_AIRCRAFT_TURNAROUND_SECTION = [
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
    title: '五、管网漏失',
    schemas: pipeNetworkDtoListType('（运输用水+生产用水+生活用水+绿化用水）*单位用水百分比'),
  },
  {
    title: '六、基建未预见',
    schemas: capitalConstructionDtoList(
      '（运输用水+生产用水+生活用水+绿化用水+管网漏失）*单位用水百分比',
    ),
  },
  {
    title: '七、昼夜最大用水量',
    schemas: makeMaxWaterDtoList(
      '（运输用水+生产用水+生活用水+绿化用水+管网漏失+基建未预见）小计之和',
    ),
  },
  {
    title: '八、旅客列车集便污水量',
    schemas: passengerTrainsFecalSewageDtoList,
  },
  {
    title: '九、生产生活排水量',
    schemas: designSewageVolumeNewDtoList('（生产用水 + 生活用水）*单位用水百分比'),
  },

  {
    title: '十、昼夜最大排水量',
    schemas: makeMaxDrainageDtoList('（旅客列车集便污水量小计+生产生活排水小计）之和'),
  },
];
//02
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
    schemas: serviceDtoListType('（生产用水+生活用水+绿化用水）*单位用水百分比'),
  },
  {
    title: '五、管网漏失',
    schemas: pipeNetworkDtoListType('（生产用水+生活用水+绿化用水）*单位用水百分比'),
  },
  {
    title: '六、基建未预见',
    schemas: capitalConstructionDtoList('（生产用水+生活用水+绿化用水+管网漏失）*单位用水百分比'),
  },
  {
    title: '七、昼夜最大用水量',
    schemas: makeMaxWaterDtoList(
      '（生产用水+生活用水+绿化用水+服务行业+管网漏失+基建未预见）小计之和',
    ),
  },
  {
    title: '八、昼夜最大排水量',
    schemas: makeMaxDrainageDtoListCoefficient('（生产用水+生活用水+服务行业用水）*单位用水百分比'),
  },
];
//03
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
    schemas: pipeNetworkDtoListType('（生产用水+生活用水+绿化用水）*单位用水百分比'),
  },
  {
    title: '五、基建未预见',
    schemas: capitalConstructionDtoList('（生产用水+生活用水+绿化用水+管网漏失）*单位用水百分比'),
  },
  {
    title: '六、昼夜最大用水量',
    schemas: makeMaxWaterDtoList('（生产用水+生活用水+绿化用水+管网漏失+基建未预见）小计之和'),
  },
  {
    title: '七、昼夜最大排水量',
    schemas: makeMaxDrainageDtoListCoefficient('（生产用水+生活用水）*单位用水百分比'),
  },
];
//04取消
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
    schemas: pipeNetworkDtoListType('（运输用水+生产用水+生活用水+绿化用水）*单位用水百分比'),
  },
  {
    title: '五、基建未预见',
    schemas: capitalConstructionDtoList(
      '（运输用水+生产用水+生活用水+绿化用水+管网漏失）*单位用水百分比',
    ),
  },
  {
    title: '六、昼夜最大用水量',
    schemas: makeMaxWaterDtoList(
      '（运输用水+生产用水+生活用水+绿化用水+服务行业+管网漏失+基建未预见）小计之和',
    ),
  },
  {
    title: '七、生产生活排水量',
    schemas: designSewageVolumeNewDtoList('生产用水 + 生活用水 + 服务行业用水）*单位用水百分比'),
  },

  {
    title: '九、昼夜最大排水量',
    schemas: makeMaxDrainageDtoList('（旅客列车集便污水量小计+生产生活排水量小计）之和'),
  },
];
//05
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
    schemas: serviceDtoListType('（生产用水+生活用水+绿化用水）*单位用水百分比'),
  },
  {
    title: '五、管网漏失',
    schemas: pipeNetworkDtoListType('（生产用水+生活用水+绿化用水）*单位用水百分比'),
  },
  {
    title: '六、基建未预见',
    schemas: capitalConstructionDtoList('（生产用水+生活用水+绿化用水+管网漏失）*单位用水百分比'),
  },
  {
    title: '七、昼夜最大用水量',
    schemas: makeMaxWaterDtoList(
      '（生产用水+生活用水+绿化用水+服务行业+管网漏失+基建未预见）小计之和',
    ),
  },
  {
    title: '八、昼夜最大排水量',
    schemas: makeMaxDrainageDtoListCoefficient('（生产用水+生活用水+服务行业用水）小计之和'),
  },
];
//06
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
    title: '五、管网漏失',
    schemas: pipeNetworkDtoListType('（运输用水+生产用水+生活用水+绿化用水）*单位用水百分比'),
  },
  {
    title: '六、基建未预见',
    schemas: capitalConstructionDtoList(
      '（运输用水+生产用水+生活用水+绿化用水+管网漏失）*单位用水百分比',
    ),
  },
  {
    title: '七、昼夜最大用水量',
    schemas: makeMaxWaterDtoList(
      '（运输用水+生产用水+生活用水+绿化用水+管网漏失+基建未预见）小计之和',
    ),
  },
  {
    title: '八、旅客列车集便污水量',
    schemas: passengerTrainsFecalSewageDtoList,
  },
  {
    title: '九、生产生活排水量',
    schemas: designSewageVolumeNewDtoList('（生产用水 + 生活用水）*单位用水百分比'),
  },
  {
    title: '十、昼夜最大排水量',
    schemas: makeMaxDrainageDtoList('（旅客列车集便污水量小计+生产生活排水量小计）之和'),
  },
];
//07
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
    schemas: serviceDtoListType('（运输用水+生产用水+生活用水+绿化用水）*单位用水百分比'),
  },
  {
    title: '六、管网漏失',
    schemas: pipeNetworkDtoListType('（运输用水+生产用水+生活用水+绿化用水）*单位用水百分比'),
  },
  {
    title: '七、基建未预见',
    schemas: capitalConstructionDtoList(
      '（运输用水+生产用水+生活用水+绿化用水+管网漏失）*单位用水百分比',
    ),
  },
  {
    title: '八、昼夜最大用水量',
    schemas: makeMaxWaterDtoList(
      '（运输用水+生产用水+生活用水+绿化用水+服务行业+管网漏失+基建未预见）小计之和',
    ),
  },
  {
    title: '九、旅客列车集便污水量',
    schemas: passengerTrainsFecalSewageDtoList,
  },
  {
    title: '十、生产生活排水量',
    schemas: designSewageVolumeNewDtoList('（生产用水 + 生活用水 + 服务行业用水）*单位用水百分比'),
  },
  {
    title: '十一、昼夜最大排水量',
    schemas: makeMaxDrainageDtoList('（旅客列车集便污水量小计+生产生活排水小计）之和'),
  },
];
