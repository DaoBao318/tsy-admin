import { defineStore } from 'pinia';
import { defHttp } from '/@/utils/http/axios';
// import { getAllItemApi } from '/@/api/water/waterApi';

export enum Api {
  getAllRewardApi = '/get/product/item', // 获取项目
}

export const waterSourceStore = defineStore({
  id: 'souce',
  state: () => ({
    allItemlist: [{}],
    waterSupplyAndDrainageDetailsLoading: false,
    waterSupplyAndDrainageProjectType: '',
    originalStationTemplate: {},
    dispalyProject: false,
  }),
  getters: {
    allRewardSelectOptions: (state) => {
      return state.allItemlist.map((item: any) => {
        item['label'] = `【${item.label}】`;
        item['value'] = item.value;
        return item;
      });
    },
    waterSupplyAndDrainageDetailsLoadingGetter: (state) => {
      return state.waterSupplyAndDrainageDetailsLoading;
    },
    waterSupplyAndDrainageProjectTypeGetter: (state) => {
      return state.waterSupplyAndDrainageProjectType;
    },
    originalStationTemplateGetter: (state) => {
      return state.originalStationTemplate;
    },
    dispalyProjectGetter: (state) => {
      return state.dispalyProject;
    },
  },
  actions: {
    async getAllItemList() {
      const result = await defHttp.get({
        url: Api.getAllRewardApi,
        params: { page: 0, page_size: 9999, search_purpose: -1, search_id: -1 },
      });
      // const result = await getProjectInformation({ useid: 1 });
      this.allItemlist = result;
    },
    waterSupplyAndDrainageDetailsLoadingAction(value) {
      this.waterSupplyAndDrainageDetailsLoading = value;
    },
    waterSupplyAndDrainageProjectTypeAction(value) {
      this.waterSupplyAndDrainageProjectType = value;
    },
    originalStationTemplateAction(value) {
      this.originalStationTemplate = value;
    },
    dispalyProjectAction(value) {
      this.dispalyProject = value;
    },
  },
});
