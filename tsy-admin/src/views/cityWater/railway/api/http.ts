import { createAxios } from '/@/utils/http/axios';
import { ContentTypeEnum } from '/@/enums/httpEnum';

import { pageInfo, beijingRecord } from './mock';

enum Api {
  getListApi = '/api/test/get_city_list', // 列表
  addPage = '/api/yuque/add_page',
  updatePage = '/api/yuque/update_page',
  editPage = '/api/yuque/edit_page',
  batchPage = 'api/yuque/batch_page',
}

// other api url
export const otherHttp = createAxios({
  // baseURL: 'http://127.0.0.1:7001/',
  baseURL: 'https://midway.17zjh.com/',
  headers: { 'Content-Type': ContentTypeEnum.JSON },
});
// 获取列表
export const getList = (params) => {
  console.log(params);
  // return otherHttp.post({ url: Api.getListApi, params });
  return pageInfo;
};

export const getRecordInfo = async (params) => {
  console.log(params);
  return beijingRecord;
};

// 批量更新
export function batchPage(yuque_link: number) {
  return otherHttp.get({ url: Api.batchPage, params: { yuque_link } });
}

export function addPage(params) {
  return otherHttp.post({ url: Api.addPage, params });
}

export function updatePage(id: number) {
  return otherHttp.get({ url: Api.updatePage, params: { id } });
}

export function editPage(params) {
  return otherHttp.post({ url: Api.editPage, params });
}
