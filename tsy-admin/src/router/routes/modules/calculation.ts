import type { AppRouteModule } from '/@/router/types';

import { LAYOUT } from '/@/router/constant';

const dashboard: AppRouteModule = {
  path: '/calculation',
  name: 'Calculation',
  component: LAYOUT,
  redirect: '/calculation/waterConsumption',
  meta: {
    icon: 'ion:grid-outline',
    title: '专业计算子模块',
  },
  children: [
    {
      path: 'waterConsumption',
      name: 'WaterConsumption',
      component: () => import('/@/views/sys/calculation/waterConsumption/index.vue'),
      meta: {
        // affix: true,
        title: '昼夜最大用水量',
      },
    },
    // {
    //   path: 'workbench',
    //   name: 'Workbench',
    //   component: () => import('/@/views/dashboard/workbench/index.vue'),
    //   meta: {
    //     title: t('routes.dashboard.workbench'),
    //   },
    // },
  ],
};

export default dashboard;
