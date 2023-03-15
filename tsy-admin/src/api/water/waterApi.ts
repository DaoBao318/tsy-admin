import { defHttp } from '/@/utils/http/axios';

enum Api {
  // The address does not exist
  getAllItemApi = '/get/product/item',
}

/**
 * @description: Trigger ajax error
 */

export const getAllItemApi = () => defHttp.get({ url: Api.getAllItemApi });
