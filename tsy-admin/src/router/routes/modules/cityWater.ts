import type { AppRouteModule } from '/@/router/types';
import { LAYOUT } from '/@/router/constant';

const cityWater: AppRouteModule = {
  path: '/cityWater',
  name: 'cityWater',
  component: LAYOUT,
  redirect: '/cityWater/railway',
  meta: {
    orderNo: 1,
    icon: 'fa6-brands:adversal',
    title: '沿铁路段城市用水',
    permCode: 'cityWater',
  },
  children: [
    {
      path: 'railway',
      name: 'railway useWater',
      meta: {
        title: '沿铁路段城市用水',
        icon: 'file-icons:apple',
        permCode: 'cityWater:railway',
      },
      component: () => import('/@/views/cityWater/railway/index.vue'),
    },
  ],
};

export default cityWater;
