// import { createAxios } from '/@/utils/http/axios';
import { processingStationDetails } from '../utilsWaterSupplyAndDrainage';
import { defHttp } from '/@/utils/http/axios';
import { waterSourceStore } from '/@/store/modules/waterInfo';
import { transBlob } from '../../pipelineCalculation/utils';
// import { ContentTypeEnum } from '/@/enums/httpEnum';
const store = waterSourceStore();
enum Api {
  getListApi = '/api/test/get_city_list', // 列表

  getDetailApi = '/api/detail/get_station_list',
  getDetailApi1 = '/api/detail/get_station_list1',
  addPage = '/api/yuque/add_page',
  updatePage = '/api/yuque/update_page',
  batchPage = 'api/yuque/batch_page',
  updateStationType = '/api/Project/UpdateStationType', //变更车站
  getProjectInformation = '/api/Project/GetProjectList',
  getStationInfoList = '/api/Project/GetStationInfoList', // 列表
  getStationTypeList = '/api/Project/GetStationTypeList',
  getWaterProjectInfo = '/api/ZYJSWaterCompute/GetWaterProjectInfo', //详情信息
  saveComputeData = '/api/ZYJSWaterCompute/SaveComputeData', //保存车站详情信息
  exportExcel = '/api/ZYJSWaterCompute/ExportExcel', //导出车站信息
  enterAndUpdateProjects = '/api/Project/GetProjectList', //录入和更新的接口
  updateProject = '/api/Project/UpdateProject', //新增项目信息
  deleteProject = '/api/Project/DeleteProject', //新增项目信息

  enteringStationData = '/api/enteringStationData', //新建的车站信息
  waterUseProjectItem = '/api/waterUseProjectItem', //获取用水条目信息
  updateStation = '/api/Project/UpdateStation',
  deleteStation = '/api/Project/DeleteStation',
}

// other api url
// export const otherHttp = createAxios({
//   // baseURL: 'http://127.0.0.1:7001/',
//   // baseURL: 'https://midway.17zjh.com/',
//   headers: { 'Content-Type': ContentTypeEnum.JSON },
// });

// export const getRecordInfo = async (params) => {
//   console.log(params);
//   if (params.id === '1') {
//     return defHttp.post({ url: Api.getDetailApi, params });
//   } else {
//     return defHttp.post({ url: Api.getDetailApi1, params });
//   }
// };

// 批量更新
export function batchPage(yuque_link: number) {
  return defHttp.get({ url: Api.batchPage, params: { yuque_link } });
}

export function addPage(params) {
  return defHttp.post({ url: Api.addPage, params });
}

export function updatePage(id: number) {
  return defHttp.get({ url: Api.updatePage, params: { id } });
}

// 车站修改
export function updateStationType(params) {
  return defHttp.post({ url: Api.updateStationType, params });
}
// 获取项目信息
export const getProjectInformation = () => {
  const params = {};
  params['id'] = 1; //获取用户信息
  return new Promise((resolve) => {
    defHttp.post({ url: Api.getProjectInformation, params }).then((res) => {
      resolve(res);
    });
  });
};
// 获取列表
export const getStationInfoList = (params) => {
  console.log(params);
  debugger;
  return defHttp.post({ url: Api.getStationInfoList, params });
};
// 获取车站类型
export const getStationTypeList = (params) => {
  params.projectType = store.waterSupplyAndDrainageProjectTypeGetter;
  return new Promise((resolve) => {
    defHttp.post({ url: Api.getStationTypeList, params }).then((res) => {
      resolve(res);
    });
  });
};

// 获取项目信息
export const getRecordInfo = (params) => {
  return new Promise((resolve) => {
    defHttp.post({ url: Api.getWaterProjectInfo, params }).then((res) => {
      res.computeID = params.computeID || 0;
      resolve(processingStationDetails(res));
    });
  });
};
// 车站信息保存
export function saveComputeData(data) {
  // const dealParams = JSON.stringify(params);
  // debugger;
  // console.log(dealParams);
  return defHttp.post({ url: Api.saveComputeData, data });
}
// 车站信息导出
export function exportExcel(params) {
  // batchExport(params);
  const exportNameObj = params.exportNameObj;
  delete params.exportNameObj;
  return new Promise((resolve) => {
    defHttp.post({ url: Api.exportExcel, params, responseType: 'blob' }).then((res) => {
      transBlob(res, exportNameObj);
      resolve(res);
    });
  });
}
// 整改后
// 获取录入和更新的项目列表
export const enterAndUpdateProjects = (params) => {
  return new Promise((resolve) => {
    defHttp.post({ url: Api.enterAndUpdateProjects, params }).then((res) => {
      debugger;
      if (res.list.length == 0) {
        store.dispalyProjectAction(true);
      } else {
        store.dispalyProjectAction(false);
      }
      resolve(res);
    });
  });
};
//新增项目
export const updateProject = (params) => {
  return new Promise((resolve) => {
    defHttp.post({ url: Api.updateProject, params }).then((res) => {
      resolve(res);
    });
  });
};
//删除项目
export const deleteProject = (params) => {
  return new Promise((resolve) => {
    defHttp.get({ url: Api.deleteProject, params }).then((res) => {
      resolve(res);
    });
  });
};
// 获取录入和更新的项目列表
export const enteringStationData = (params) => {
  return new Promise((resolve) => {
    defHttp.post({ url: Api.enteringStationData, params }).then((res) => {
      resolve(res);
    });
  });
};

// 获取用水条目信息 api/waterUseProjectItem
export const waterUseProjectItem = (params) => {
  return new Promise((resolve) => {
    defHttp.post({ url: Api.waterUseProjectItem, params }).then((res) => {
      resolve(res);
    });
  });
};
//新增车站项目
export const updateStation = (params) => {
  return new Promise((resolve) => {
    defHttp.post({ url: Api.updateStation, params }).then((res) => {
      resolve(res);
    });
  });
};
//删除车站项目
export const deleteStation = (params) => {
  return new Promise((resolve) => {
    defHttp.get({ url: Api.deleteStation, params }).then((res) => {
      resolve(res);
    });
  });
};
