import { MockMethod } from 'vite-plugin-mock';
import { resultSuccess } from '../_util';

export const pageInfo = {
  list: [
    {
      projectID: 1,
      projectName: '常泰项目',
      stationID: 5,
      stationName: '常州南站',
      stationType: '07',
      stationTypeName: '高铁-大型车站',
      modelSelectType: null,
      modelSelectTypeName: null,
      cleanPoolModel: null,
      producePoolModel: null,
      ffPoolModel: null,
      waterSupplyModel: null,
      firePumpModel: null,
      stabilivoltPumpModel: null,
      disinfectDeviceModel: null,
    },
    {
      projectID: 1,
      projectName: '常泰项目',
      stationID: 4,
      stationName: '常州高新区站',
      stationType: '06',
      stationTypeName: '高铁-动车段',
      modelSelectType: null,
      modelSelectTypeName: null,
      cleanPoolModel: null,
      producePoolModel: null,
      ffPoolModel: null,
      waterSupplyModel: null,
      firePumpModel: null,
      stabilivoltPumpModel: null,
      disinfectDeviceModel: null,
    },
    {
      projectID: 1,
      projectName: '常泰项目',
      stationID: 2,
      stationName: '常泰长江大桥桥工区',
      stationType: '01',
      stationTypeName: '普铁-区段站',
      modelSelectType: null,
      modelSelectTypeName: null,
      cleanPoolModel: null,
      producePoolModel: null,
      ffPoolModel: null,
      waterSupplyModel: null,
      firePumpModel: null,
      stabilivoltPumpModel: null,
      disinfectDeviceModel: null,
    },
    {
      projectID: 1,
      projectName: '常泰项目',
      stationID: 3,
      stationName: '常泰长江大桥桥梁守护区',
      stationType: '02',
      stationTypeName: '普铁-中间站',
      modelSelectType: null,
      modelSelectTypeName: null,
      cleanPoolModel: null,
      producePoolModel: null,
      ffPoolModel: null,
      waterSupplyModel: null,
      firePumpModel: null,
      stabilivoltPumpModel: null,
      disinfectDeviceModel: null,
    },
    {
      projectID: 1,
      projectName: '常泰项目',
      stationID: 1,
      stationName: '泰兴东站',
      stationType: '05',
      stationTypeName: '高铁-中间站',
      modelSelectType: 'JointDesign',
      modelSelectTypeName: '生活、消防管网合设',
      cleanPoolModel: null,
      producePoolModel: null,
      ffPoolModel: null,
      waterSupplyModel: null,
      firePumpModel: null,
      stabilivoltPumpModel: null,
      disinfectDeviceModel: null,
    },
  ],
  split: { page: 1, size: 10, total: 5 },
};
export const waterSupplyAndDrainageProjectData = {
  list: [
    {
      projectID: 1,
      projectName: '常泰项目MOCK',
      projectType: 'HighSpeed',
      projectTypeName: '高铁',
      isSynchro: 1,
      isExist: '否',
      isSynchroType: '同步',
    },
    {
      projectID: 141,
      projectName: '广州南至东莞高铁MOCK',
      projectType: 'HighSpeed',
      projectTypeName: '高铁',
      isSynchro: 0,
      isExist: '是',
      isSynchroType: '录入',
    },
    {
      projectID: 121,
      projectName: '广州南至深圳高铁MOCK',
      projectType: 'HighSpeed',
      projectTypeName: '高铁',
      isSynchro: 0,
      isExist: '是',
      isSynchroType: '录入',
    },
    {
      projectID: 101,
      projectName: '武汉西MOCK',
      projectType: 'OrdinaryRailway',
      projectTypeName: '普铁',
      isSynchro: 0,
      isExist: '是',
      isSynchroType: '录入',
    },
    {
      projectID: 26,
      projectName: '武汉项目MOCK',
      projectType: 'HighSpeed',
      projectTypeName: '高铁',
      isSynchro: 0,
      isExist: '否',
      isSynchroType: '录入',
    },
  ],
  split: { page: 1, size: 999, total: 5 },
};
export const getModelSelectTypeList = [
  {
    label: '生活、消防管网分设',
    value: 'Division',
  },
  {
    label: '生活、消防管网合设',
    value: 'JointDesign',
  },
];

export default [
  // //列表
  // {
  //   url: '/professional-subsystem/api/ZYJSWaterCompute/GetStationDeviceSelectionList',
  //   timeout: 0,
  //   method: 'post',
  //   response: () => {
  //     return resultSuccess(pageInfo);
  //   },
  // },
  // //项目下拉
  // {
  //   url: '/professional-subsystem/api/Project/GetProjectList',
  //   timeout: 0,
  //   method: 'post',
  //   response: () => {
  //     return resultSuccess(waterSupplyAndDrainageProjectData);
  //   },
  // },
  // //合设分设下拉
  // {
  //   url: '/professional-subsystem/api/ZYJSWaterCompute/GetModelSelectTypeList',
  //   timeout: 0,
  //   method: 'post',
  //   response: () => {
  //     return resultSuccess(getModelSelectTypeList);
  //   },
  // },
] as MockMethod[];
