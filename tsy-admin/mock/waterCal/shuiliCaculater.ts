import { MockMethod } from 'vite-plugin-mock';
import { resultPageSuccess } from '../_util';

//压力数据保存到本地
const roleListPressure = (() => {
  let result: any[] = [];
  result = [
    {
      pressureID: '',
      calculationFormula: 'gs1',
      pipeMaterial: 'm4',
      coughnessCoefficient: 90,
      coughnessCoefficientRecommend: '90 ~ 100',
      calculationContent: 'nr1',
      calculateInnerDiameter: 20,
      nominalDiameter: 21,
      rateOfFlow: 100,
      unit: 'l/s',
      velocityOfFlow: 5,
      hydraulicGradient: 20,
      pipeLength: 20,
      percentageLocalResistanceLoss: 0.2,
      pipeLengthResult: 20,
      hydraulicGradientResult: 40,
      caliberResult: 30,
      velocityOfFlowResult: 20,
      rateOfFlowResult: 50,
      lossAlongTheWayResult: 70,
      LocalResistanceLossResult: 60,
      hydraulicLossResult: 50,
    },
  ];
  return result;
})();
export default [
  {
    url: '/professional-subsystem/localStorage/getPressurePage',
    timeout: 100,
    method: 'post',
    response: ({ query }) => {
      const { page = 1, pageSize = 500 } = query;
      return resultPageSuccess(page, pageSize, roleListPressure);
    },
  },
] as MockMethod[];
