// import { createAxios } from '/@/utils/http/axios';
import { defHttp } from '/@/utils/http/axios';
// import { ContentTypeEnum } from '/@/enums/httpEnum';

import { beijingRecord } from './mock';

enum Api {
  getListApi = '/api/test/get_city_list', // 列表
  getDetailApi = '/api/detail/get_station_list',
  getDetailApi1 = '/api/detail/get_station_list1',
  addPage = '/api/yuque/add_page',
  updatePage = '/api/yuque/update_page',
  editPage = '/api/page/edit_page',
  batchPage = 'api/yuque/batch_page',
  editStation = '/api/edit/station',
}

// other api url
// export const otherHttp = createAxios({
//   // baseURL: 'http://127.0.0.1:7001/',
//   // baseURL: 'https://midway.17zjh.com/',
//   headers: { 'Content-Type': ContentTypeEnum.JSON },
// });
// 获取列表
export const getList = (params) => {
  console.log(params);
  return defHttp.post({ url: Api.getListApi, params });
  // return pageInfo;
};

export const getRecordInfo = async (params) => {
  console.log(params);
  if (params.id === '1') {
    return defHttp.post({ url: Api.getDetailApi, params });
  } else {
    return defHttp.post({ url: Api.getDetailApi1, params });
  }
};

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
export function editStation(params) {
  return defHttp.post({ url: Api.editStation, params });
}
