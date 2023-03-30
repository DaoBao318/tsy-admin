// import { createAxios } from '/@/utils/http/axios';
import { array } from 'vue-types';
import { processingStationDetails } from '../utilsWaterSupplyAndDrainage';
import { keepTwoDecimalFull } from '/@/utils/calculation/count';
import { defHttp } from '/@/utils/http/axios';
// import { ContentTypeEnum } from '/@/enums/httpEnum';

enum Api {
  getListApi = '/api/test/get_city_list', // 列表

  getDetailApi = '/api/detail/get_station_list',
  getDetailApi1 = '/api/detail/get_station_list1',
  addPage = '/api/yuque/add_page',
  updatePage = '/api/yuque/update_page',
  editPage = '/api/page/edit_page',
  batchPage = 'api/yuque/batch_page',
  updateStationType = '/api/Project/UpdateStationType', //变更车站
  getProjectInformation = '/api/Project/GetProjectList',
  getStationInfoList = '/api/Project/GetStationInfoList', // 列表
  getStationTypeList = '/api/Project/GetStationTypeList',
  getWaterProjectInfo = '/api/ZYJSWaterCompute/GetWaterProjectInfo', //详情信息
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
// 车站信息保存
export function editPage(params) {
  return defHttp.post({ url: Api.editPage, params });
}
// 车站修改
export function updateStationType(params) {
  params.projectId = params.projectID;
  return defHttp.post({ url: Api.updateStationType, params });
}
// 获取项目信息
export const getProjectInformation = (params) => {
  return new Promise((resolve) => {
    defHttp.post({ url: Api.getProjectInformation, params }).then((res) => {
      resolve(res);
    });
  });
};
// 获取列表
export const getStationInfoList = (params) => {
  console.log(params);
  return defHttp.post({ url: Api.getStationInfoList, params });
};
// 获取车站类型
export const getStationTypeList = (params) => {
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
      resolve(processingStationDetails(res));
    });
  });
};
