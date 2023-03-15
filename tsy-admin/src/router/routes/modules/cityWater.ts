import type { AppRouteModule } from '/@/router/types';
import { LAYOUT } from '/@/router/constant';

const cityWater: AppRouteModule = {
  path: '/cityWater',
  name: 'cityWater',
  component: LAYOUT,
  redirect: '/cityWater/railway',
  meta: {
    orderNo: 1,
    icon: 'carbon:calculator-check',
    title: '专业计算子模块',
    // permCode: 'cityWater',
  },
  children: [
    {
      path: 'railway',
      name: 'railway useWater',
      meta: {
        title: '昼夜最大用水量计算',
        icon: 'ion:water-outline',
        // permCode: 'cityWater:railway',
      },
      component: () => import('/@/views/cityWater/railway/index.vue'),
    },
    {
      path: 'waterConsumption',
      name: 'WaterConsumption',
      component: () => import('/@/views/cityWater/waterConsumption/index.vue'),
      meta: {
        // affix: true,
        icon: 'fluent:pipeline-20-filled',
        title: '管道水力计算',
      },
    },
  ],
};

export default cityWater;
