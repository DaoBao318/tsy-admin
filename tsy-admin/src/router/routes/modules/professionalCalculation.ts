import type { AppRouteModule } from '/@/router/types';
import { LAYOUT } from '/@/router/constant';

const professionalCalculation: AppRouteModule = {
  path: '/professionalCalculation',
  name: 'professionalCalculation',
  component: LAYOUT,
  redirect: '/professionalCalculation/waterSupplyAndDrainage',
  meta: {
    orderNo: 1,
    icon: 'carbon:calculator-check',
    title: '专业计算子模块',
    // permCode: 'professionalCalculation',
  },
  children: [
    {
      path: 'waterSupplyAndDrainage',
      name: 'WaterSupplyAndDrainage',
      meta: {
        title: '昼夜最大用水量计算',
        icon: 'ion:water-outline',
        // ignoreKeepAlive: true,
        // hideTab: true,
        // permCode: 'professionalCalculation:waterSupplyAndDrainage',
      },
      component: () =>
        import('/@/views/professionalCalculation/waterSupplyAndDrainage/project/index.vue'),
    },
    {
      path: 'station',
      name: 'Station',
      meta: {
        title: '昼夜最大用水量计算111',
        icon: 'ion:water-outline',
        hideTab: true,
        hideMenu: true,
        // ignoreKeepAlive: true,
        // hideTab: true,
        // permCode: 'professionalCalculation:waterSupplyAndDrainage',
      },
      component: () =>
        import('/@/views/professionalCalculation/waterSupplyAndDrainage/station/index.vue'),
    },
    {
      path: 'waterConsumptionCalculation',
      name: 'WaterConsumptionCalculation',
      meta: {
        title: '昼夜最大用水量计算',
        icon: 'ion:water-outline',
        hideTab: true,
        hideMenu: true,
        // ignoreKeepAlive: true,
        // hideTab: true,
        // permCode: 'professionalCalculation:waterSupplyAndDrainage',
      },
      component: () => import('/@/views/professionalCalculation/waterSupplyAndDrainage/index.vue'),
    },
    {
      path: 'pipelineCalculation',
      name: 'WaterConsumption',
      component: () => import('/@/views/professionalCalculation/pipelineCalculation/index.vue'),
      meta: {
        // affix: true,
        icon: 'fluent:pipeline-20-filled',
        title: '管道水力计算',
      },
    },
  ],
};

export default professionalCalculation;
