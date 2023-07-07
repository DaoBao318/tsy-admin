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
      path: 'professionalHome',
      name: 'ProfessionalHome',
      meta: {
        title: '专业计算子系统首页',
        icon: 'ant-design:home-outlined',
        // hideTab: true,
        // hideMenu: true,
        // ignoreKeepAlive: true,
        // hideTab: true,
        // permCode: 'professionalCalculation:waterSupplyAndDrainage',
      },
      component: () => import('/@/views/professionalCalculation/professionalHome/index.vue'),
    },
    {
      path: 'waterSupplyAndDrainage',
      name: 'WaterSupplyAndDrainage',
      meta: {
        title: '站点昼夜最大用水量排水量计算',
        icon: 'ion:water-outline',
        // ignoreKeepAlive: true,
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
        title: '车站列表',
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
        title: '站点昼夜最大用水量排水量计算',
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
        icon: 'ant-design:hourglass-filled',
        title: '压力管道水力计算',
      },
    },
    {
      path: 'equipmentSelection',
      name: 'EquipmentSelection',
      component: () => import('/@/views/professionalCalculation/equipmentSelection/index.vue'),
      meta: {
        // affix: true,
        icon: 'ant-design:carry-out-outlined',
        title: '设施设备选型计算',
        // ignoreKeepAlive: true,
      },
    },
    {
      path: 'equipmentSelectionStation',
      name: 'EquipmentSelectionStation',
      component: () =>
        import('/@/views/professionalCalculation/equipmentSelection/station/index.vue'),
      meta: {
        // affix: true,
        icon: 'ant-design:carry-out-outlined',
        title: '设施设备选型车站',
        hideTab: true,
        hideMenu: true,
      },
    },
  ],
};

export default professionalCalculation;
