// import { createAxios } from '/@/utils/http/axios';
import { defHttp } from '/@/utils/http/axios';
import { waterSourceStore } from '/@/store/modules/waterInfo';
import { transBlobExcel } from '../../pipelineCalculation/utils';
const store = waterSourceStore();
enum Api {
  exportEquipWord = '/api/ZYJSWaterCompute/WaterSupplyDrainageExcelFrom', //导出车站信息

  getProjectInformation = '/api/Project/GetProjectList', //获取项目信息
  getModelSelectTypeList = '/api/ZYJSWaterCompute/GetModelSelectTypeList', //获取项目信息
  getEquitment = '/api/ZYJSWaterCompute/GetStationDeviceSelectionList', //设备列表
  getStationDeviceSelectionEdit = '/api/ZYJSWaterCompute/GetStationDeviceSelectionEdit', //编辑页面初始化
  saveStationDeviceSelectionEdit = '/api/ZYJSWaterCompute/SaveStationDeviceSelectionEdit', //设备选型保存接口
  getStationDeviceSelectionDrainageEdit = '/api/ZYJSWaterCompute/GetStationDeviceSelectionDrainageEdit', //获取排水详情
  saveStationDeviceSelectionDrainageEdit = '/api/ZYJSWaterCompute/SaveStationDeviceSelectionDrainageEdit', //设备选型排水保存接口
}

// other api url
// export const otherHttp = createAxios({
//   // baseURL: 'http://127.0.0.1:7001/',
//   // baseURL: 'https://midway.17zjh.com/',
//   headers: { 'Content-Type': ContentTypeEnum.JSON },
// });

// 车站信息导出
export function exportEquipWord(params) {
  // batchExport(params);
  const exportNameObj = params.exportNameObj;
  delete params.exportNameObj;
  return new Promise((resolve) => {
    defHttp.post({ url: Api.exportEquipWord, params, responseType: 'blob' }).then((res) => {
      transBlobExcel(res, exportNameObj);
      resolve(res);
    });
  });
}

// 获取项目信息
export const getProjectInformation = (params) => {
  return new Promise((resolve) => {
    defHttp.post({ url: Api.getProjectInformation, params }).then((res) => {
      resolve(res);
    });
  });
};
//获取分设合设
export const getModelSelectTypeList = () => {
  const params = { likeQuery: '', pageIndex: 1, pageSize: 999, totalCount: 0, useID: 0 };

  return new Promise((resolve) => {
    defHttp.post({ url: Api.getModelSelectTypeList, params }).then((res) => {
      resolve(res);
    });
  });
};

//查询设备列表页面
export const getEquitment = (params) => {
  return new Promise((resolve) => {
    defHttp.post({ url: Api.getEquitment, params }).then((res) => {
      resolve(res);
    });
  });
};
//编辑详情页面
export const getStationDeviceSelectionEdit = (params) => {
  return new Promise((resolve) => {
    defHttp.post({ url: Api.getStationDeviceSelectionEdit, params }).then((res) => {
      resolve(res);
    });
  });
};

//保存给水设施设备选型
export const saveEquipment = (params) => {
  return new Promise((resolve) => {
    defHttp.post({ url: Api.saveStationDeviceSelectionEdit, params }).then((res) => {
      resolve(res);
    });
  });
};

//编辑详情页面
export const getStationDeviceSelectionDrainageEdit = (params) => {
  return new Promise((resolve) => {
    defHttp.post({ url: Api.getStationDeviceSelectionDrainageEdit, params }).then((res) => {
      resolve(res);
    });
  });
};

//保存排水设施设备选型
export const saveEquipmentDrainage = (params) => {
  return new Promise((resolve) => {
    defHttp.post({ url: Api.saveStationDeviceSelectionDrainageEdit, params }).then((res) => {
      resolve(res);
    });
  });
};
