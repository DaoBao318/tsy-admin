import { defHttp } from '/@/utils/http/axios';

enum Api {
  RolePageListPressure = '/localStorage/getPressurePage',
}

//获取压力数据

export const getPressurePage = (params) => {
  return new Promise((resolve) => {
    defHttp.post({ url: Api.RolePageListPressure, params }).then((res) => {
      let dealData = '[]';
      if (
        localStorage.getItem('pressurePageSave') !== 'undefined' &&
        !!localStorage.getItem('pressurePageSave')
      ) {
        dealData = localStorage.getItem('pressurePageSave');
      }
      res.list = JSON.parse(dealData);
      // res.list = [];
      res.split.total = res.list.length;
      resolve(res);
    });
  });
};
