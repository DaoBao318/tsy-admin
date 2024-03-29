import {
  AccountParams,
  DeptListItem,
  MenuParams,
  RoleParams,
  MenuListGetResultModel,
  DeptListGetResultModel,
  AccountListGetResultModel,
  RoleListGetResultModel,
} from './model/systemModel';
import { defHttp } from '/@/utils/http/axios';

enum Api {
  AccountList = '/system/getAccountList',
  IsAccountExist = '/system/accountExist',
  DeptList = '/system/getDeptList',
  setRoleStatus = '/system/setRoleStatus',
  MenuList = '/system/getMenuList',
  GetAllRoleList = '/system/getAllRoleList',

  getTestAPI = '/api/Project/GetProjectList',
}

export const getAccountList = (params: AccountParams) =>
  defHttp.get<AccountListGetResultModel>({ url: Api.AccountList, params });

export const getDeptList = (params?: DeptListItem) =>
  defHttp.get<DeptListGetResultModel>({ url: Api.DeptList, params });

export const getMenuList = (params?: MenuParams) =>
  defHttp.get<MenuListGetResultModel>({ url: Api.MenuList, params });
// //获取重力数据
// export const getGravityPage = (params?: RolePageParams) =>
//   defHttp.get<RolePageListGetResultModel>({ url: Api.RolePageList, params });
// //获取压力数据
// export const getPressurePage = (params?: RolePageParams) =>
//   defHttp.get<RolePageListGetResultModel>({ url: Api.RolePageListPressure, params });

export const getAllRoleList = (params?: RoleParams) =>
  defHttp.get<RoleListGetResultModel>({ url: Api.GetAllRoleList, params });

export const setRoleStatus = (id: number, status: string) =>
  defHttp.post({ url: Api.setRoleStatus, params: { id, status } });

export const isAccountExist = (account: string) =>
  defHttp.post({ url: Api.IsAccountExist, params: { account } }, { errorMessageMode: 'none' });

export const getTestAPI = (params) => defHttp.post({ url: Api.getTestAPI, params });
