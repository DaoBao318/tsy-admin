import { defineStore } from 'pinia';
// import { defHttp } from '/@/utils/http/axios';
import { getAllItemApi } from '/@/api/water/waterApi';
export enum Api {
  getAllRewardApi = '/get/product/item', // 获取项目
}

export const waterSourceStore = defineStore({
  id: 'souce',
  state: () => ({
    allItemlist: [{}],
  }),
  getters: {
    allRewardSelectOptions: (state) => {
      return state.allItemlist.map((item: any) => {
        item['label'] = `【${item.label}】${'标题'}`;
        item['value'] = item.value;
        return item;
      });
    },
  },
  actions: {
    async getAllItemList() {
      //   const result = await defHttp.get({
      //     url: Api.getAllRewardApi,
      //     params: { page: 0, page_size: 9999, search_purpose: -1, search_id: -1 },
      //   });
      const result = await getAllItemApi();
      this.allItemlist = result;
    },
  },
});
