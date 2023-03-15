import { MockMethod } from 'vite-plugin-mock';
import { resultPageSuccess } from '../_util';

const roleList = (() => {
  const result: any[] = [];
  for (let index = 0; index < 14; index++) {
    result.push({
      id: index + 1,
      orderNo: `${index + 1}`,
      calculationFormula: ['海曾-威廉公式', '柯尔-勃洛克公式', '曼宁公式', '曼宁公式'][index],
      pipeMaterial: [
        '镀锌钢管',
        '焊接钢管',
        '无缝钢管',
        '球墨铸铁管',
        'I级钢筋混凝土管',
        'II级钢筋混凝土管',
      ][index],
      calculationContent: '计算管径、水力坡降',
      calculateInnerDiameter: '10mm',
      velocityOfFlow: [['0', '1', '2'], ['0', '1'], ['0', '2'], ['2']][index],
      rateOfFlow: '流量1',
      hydraulicGradient: '水力坡降',
      trenchHeight: '地沟宽',
      ditchWidth: '地沟高',
    });
  }
  return result;
})();
export default [
  {
    url: '/water-api/system/getRoleListByPage',
    timeout: 100,
    method: 'get',
    response: ({ query }) => {
      const { page = 1, pageSize = 20 } = query;
      return resultPageSuccess(page, pageSize, roleList);
    },
  },
] as MockMethod[];
