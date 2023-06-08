import { seamlessSteelTube } from './seamlessSteelTube';
import { PipelineCalculationEnum } from '/@/enums/pipelineCalculation';

export function keepTwoDecimalFull(num, digit = 5): number {
  let result = parseFloat(num);
  if (isNaN(result)) {
    console.log('计算结果为NaN');
    return 0;
  }
  result = Math.round(num * Math.pow(10, digit)) / Math.pow(10, digit);
  let s_x = result.toString(); //将数字转换为字符串

  let pos_decimal = s_x.indexOf('.'); //小数点的索引值

  // 当整数时，pos_decimal=-1 自动补0
  if (pos_decimal < 0) {
    pos_decimal = s_x.length;
    s_x += '.';
  }

  // 当数字的长度< 小数点索引+2时，补0
  while (s_x.length <= pos_decimal + 2) {
    s_x += '0';
  }
  return Number(s_x);
}
/**
 * @param q 流量 m3/s  v流速 m/s
 * 得到管径 d m
 */
export function calculatePipeDiameter1(q, v, unit = 'cubicMeter') {
  if (unit === 'rise') {
    q = q / 1000;
  } else {
    q = q / 3600;
  }
  const num = Math.pow((4 * q) / Math.PI / v, 0.5);
  return keepTwoDecimalFull(num * 1000, 1);
}
/**
 * @param d 管径 计算得到
 * @param q 流量 海曾威廉系数 c
 * 得到水力梯度
 */
export function hydraulicGradient1(d, q, c, unit = 'cubicMeter', calculationManualObj?) {
  d = d / 1000;
  if (unit === 'rise') {
    q = q / 1000;
  } else {
    q = q / 3600;
  }
  let num = (10.67 * Math.pow(q, 1.852)) / Math.pow(c, 1.852) / Math.pow(d, 4.87);
  const { calculationFormula, pipeMaterial, velocityOfFlow } = calculationManualObj;
  if (calculationFormula === 'gs11') {
    if (['m1', 'm2', 'm21', 'm3', 'm4', 'm8'].includes(pipeMaterial)) {
      if (Number(velocityOfFlow) >= 1.2) {
        num = (0.00107 * Math.pow(velocityOfFlow, 2)) / Math.pow(d, 1.3);
      } else {
        num =
          ((0.000912 * Math.pow(velocityOfFlow, 2)) / Math.pow(d, 1.3)) *
          Math.pow(1 + 0.867 / velocityOfFlow, 0.3);
      }
    } else {
      num = (0.000915 * Math.pow(q, 1.774)) / Math.pow(d, 4.774);
    }
  }

  return keepTwoDecimalFull(num, 5);
}
/**
 *@param  管径 d m
 * @param 流量 q m3/s
 * 得到计算流速v
 */
export function calculateFlowRate2(d, q, unit = 'cubicMeter') {
  d = d / 1000;
  if (unit === 'rise') {
    q = q / 1000;
  } else {
    q = q / 3600;
  }
  const num = (4 * q) / Math.PI / Math.pow(d, 2);
  return keepTwoDecimalFull(num, 3);
}
/**
 * @param d 管径 计算得到
 * @param q 流量 海曾威廉系数 c
 * 得到水力梯度
 */
export function hydraulicGradient2(d, q, c, unit = 'cubicMeter', calculationManualObj?) {
  const velocityOfFlow = calculateFlowRate2(d, q, unit);
  d = d / 1000;
  if (unit === 'rise') {
    q = q / 1000;
  } else {
    q = q / 3600;
  }
  let num = (10.67 * Math.pow(q, 1.852)) / Math.pow(c, 1.852) / Math.pow(d, 4.87);
  const { calculationFormula, pipeMaterial } = calculationManualObj;
  if (calculationFormula === 'gs11') {
    if (['m1', 'm2', 'm21', 'm3', 'm4', 'm8'].includes(pipeMaterial)) {
      if (Number(velocityOfFlow) >= 1.2) {
        num = (0.00107 * Math.pow(velocityOfFlow, 2)) / Math.pow(d, 1.3);
      } else {
        num =
          ((0.000912 * Math.pow(velocityOfFlow, 2)) / Math.pow(d, 1.3)) *
          Math.pow(1 + 0.867 / velocityOfFlow, 0.3);
      }
    } else {
      num = (0.000915 * Math.pow(q, 1.774)) / Math.pow(d, 4.774);
    }
  }
  return keepTwoDecimalFull(num, 5);
}

/**
 * 流量计算
 * @param v—流速，m/s
 * @param d—管道计算内径，m；
 */
export function calculateFlow3(d, v, unit = 'cubicMeter') {
  d = d / 1000;
  const rateOfFlowValue = ((Math.PI * Math.pow(d, 2)) / 4) * v;
  if (unit === 'rise') {
    return keepTwoDecimalFull(rateOfFlowValue * 1000, 3);
  }
  return keepTwoDecimalFull(rateOfFlowValue * 3600, 3);
}
/**
 *
 * 水力坡降计算；
 * @param q—流量，m3/s；
 * @param c—海曾-威廉系数，可查表取得（枚举值）；
 * @param d—管道计算内径，m；
 */

export function hydraulicGradient3(q, c, d, unit = 'cubicMeter', calculationManualObj?) {
  d = d / 1000;
  if (unit === 'rise') {
    q = q / 1000;
  } else {
    q = q / 3600;
  }
  let num = (10.67 * Math.pow(q, 1.852)) / Math.pow(c, 1.852) / Math.pow(d, 4.87);
  const { calculationFormula, pipeMaterial, velocityOfFlow } = calculationManualObj;
  if (calculationFormula === 'gs11') {
    if (['m1', 'm2', 'm21', 'm3', 'm4', 'm8'].includes(pipeMaterial)) {
      if (Number(velocityOfFlow) >= 1.2) {
        num = (0.00107 * Math.pow(velocityOfFlow, 2)) / Math.pow(d, 1.3);
      } else {
        num =
          ((0.000912 * Math.pow(velocityOfFlow, 2)) / Math.pow(d, 1.3)) *
          Math.pow(1 + 0.867 / velocityOfFlow, 0.3);
      }
    } else {
      num = (0.000915 * Math.pow(q, 1.774)) / Math.pow(d, 4.774);
    }
  }
  return keepTwoDecimalFull(num, 5);
}
function trialCalculationOfPipeDiameter1(q, i) {
  const num = (0.00107 * 16 * Math.pow(q, 2)) / i / Math.pow(Math.PI, 2);
  return Math.pow(num, 1 / 5.3);
}

function trialSpeed(d, i) {
  const v = (i / 0.00107) * Math.pow(d, 1.3);
  return Math.pow(v, 0.5);
}
function trialCalculationOfPipeDiameter2(v, i) {
  const num = (0.000912 * Math.pow(v, 2) * Math.pow(1 + 0.867 / v, 0.3)) / i;
  return Math.pow(num, 10 / 13);
}
/**
 *
 * @param q 流量，m3/s；
 * @param i 水力坡降
 * @param c 海曾-威廉系数，可查表取得（枚举值）
 * 得到计算管径
 */
export function calculatePipeDiameter4(q, i, c, unit = 'cubicMeter', calculationManualObj?) {
  if (unit === 'rise') {
    q = q / 1000;
  } else {
    q = q / 3600;
  }
  const raw = (10.67 * Math.pow(q, 1.852)) / i / Math.pow(c, 1.852);
  let calculatePipeDiameter = Math.pow(raw, 1 / 4.87);
  const { calculationFormula, pipeMaterial } = calculationManualObj;
  if (calculationFormula === 'gs11') {
    //使用大于1.2的计算公式去计算管径
    if (['m1', 'm2', 'm21', 'm3', 'm4', 'm8'].includes(pipeMaterial)) {
      const d = trialCalculationOfPipeDiameter1(q, i);
      const v = trialSpeed(d, i);
      if (v >= 1.2) {
        calculatePipeDiameter = d;
      } else {
        calculatePipeDiameter = trialCalculationOfPipeDiameter2(v * 1.103, i);
      }
    } else {
      const num3 = (0.000915 * Math.pow(q, 1.774)) / i;
      calculatePipeDiameter = Math.pow(num3, 1 / 4.774);
    }
  }
  return keepTwoDecimalFull(calculatePipeDiameter * 1000, 1);
}
/**
 *
 * @param  q—流量，m3/s； 6
 * @param d—管道计算内径，m； 1
 * 得到v—流速，m/s
 */
export function calculateFlowRate4(q, d, unit = 'cubicMeter') {
  d = d / 1000;
  if (unit === 'rise') {
    q = q / 1000;
  } else {
    q = q / 3600;
  }
  const calculateFlowRate = (4 * q) / Math.PI / Math.pow(d, 2);
  return keepTwoDecimalFull(calculateFlowRate, 3);
}
/**
 *
 * @param i 水力坡降 0.03583
 * @param c  海曾-威廉系数，可查表取得（枚举值）130
 * @param d  管道计算内径，m；1
 * 得到 流量
 */
export function calculateFlow5(i, c, d, unit = 'cubicMeter', calculationManualObj?) {
  d = d / 1000;
  const raw = (i * Math.pow(c, 1.852) * Math.pow(d, 4.87)) / 10.67;
  let calculateFlow = Math.pow(raw, 1 / 1.852);
  const { calculationFormula, pipeMaterial } = calculationManualObj;
  if (calculationFormula === 'gs11') {
    if (['m1', 'm2', 'm21', 'm3', 'm4', 'm8'].includes(pipeMaterial)) {
      const v = trialSpeed(d, i);
      //默认用第一个速度计算流量
      if (v >= 1.2) {
        calculateFlow = (Math.PI * Math.pow(d, 2) * v) / 4;
      } else {
        calculateFlow = (Math.PI * Math.pow(d, 2) * v * 1.103) / 4;
      }
    } else {
      calculateFlow = (i * Math.pow(d, 4.774)) / 0.000915;
      calculateFlow = Math.pow(calculateFlow, 1 / 1.774);
    }
  }

  if (unit === 'rise') {
    return keepTwoDecimalFull(calculateFlow * 1000, 3);
  }
  return keepTwoDecimalFull(calculateFlow * 3600, 3);
}
/**
 * @param q 流量，m3/s 6
 * @param d 管道计算内径，m；1
 * 得到v—流速，m/s 7
 */
export function calculateFlowRate5(q, d, i, unit = 'cubicMeter', calculationManualObj?) {
  d = d / 1000;
  if (unit === 'rise') {
    q = q / 1000;
  } else {
    q = q / 3600;
  }

  let calculateFlowRate = (4 * q) / Math.PI / Math.pow(d, 2);
  const { calculationFormula, pipeMaterial } = calculationManualObj;
  if (calculationFormula === 'gs11') {
    if (['m1', 'm2', 'm21', 'm3', 'm4', 'm8'].includes(pipeMaterial)) {
      //默认用第一个速度计算流量
      calculateFlowRate = trialSpeed(d, i);
    } else {
      calculateFlowRate = (4 * q) / Math.PI / Math.pow(d, 2);
    }
  }
  return keepTwoDecimalFull(calculateFlowRate, 3);
}

export const pipeMaterialOptionMap11 = {
  m4: '球墨铸铁管',
  m21: '钢管',
  m1: '镀锌钢管',
  m8: '不锈钢管',
  m3: '无缝钢管',
  m5: '聚乙烯PE100管（0.6MPa）',
  m6: '聚乙烯PE100管（1.0MPa）',
  m61: '聚乙烯PE100管（1.6MPa）',
};
/**
 * 海曾 威廉系数和粗糙系数与公式和材料有关
 */
export const Ch_recommend = {
  gs1: {
    m1: '90 ~ 100',
    m2: '90 ~ 100',
    m21: '90 ~ 100',
    m3: '90 ~ 100',
    m4: '90 ~ 100',
    m5: '140 ~ 150',
    m6: '140 ~ 150',
    m61: '140 ~ 150',
    m7: '140 ~ 150',
    m8: '130 ~ 140',
    m9: '140 ~ 150',
  },
  gs2: {
    m1: '0.0105 ~ 0.0115',
    m2: '0.0105 ~ 0.0115',
    m21: '0.0105 ~ 0.0115',
    m3: '0.0105 ~ 0.0115',
    m4: '0.0105 ~ 0.0115',
    m5: '0.012 ~ 0.013',
    m6: '0.012 ~ 0.013',
    m61: '0.012 ~ 0.013',
    m7: '0.010 ~ 0.030',
    m8: '0.0105 ~ 0.0115',
    m9: '0.010 ~ 0.030',
  },
  gs3: {
    m1: '0.0105 ~ 0.0115',
    m2: '0.0105 ~ 0.0115',
    m21: '0.0105 ~ 0.0115',
    m3: '0.0105 ~ 0.0115',
    m4: '0.0105 ~ 0.0115',
    m5: '0.012 ~ 0.013',
    m6: '0.012 ~ 0.013',
    m61: '0.012 ~ 0.013',
    m7: '0.010 ~ 0.030',
    m8: '0.0105 ~ 0.0115',
    m9: '0.010 ~ 0.030',
  },
  gs11: {
    m1: '90 ~ 100',
    m2: '90 ~ 100',
    m21: '90 ~ 100',
    m3: '90 ~ 100',
    m4: '90 ~ 100',
    m5: '140 ~ 150',
    m6: '140 ~ 150',
    m61: '140 ~ 150',
    m7: '140 ~ 150',
    m8: '130 ~ 140',
    m9: '140 ~ 150',
  },
};
export const Ch = {
  gs1: {
    m1: 100,
    m2: 90,
    m21: 100,
    m3: 100,
    m4: 100,
    m5: 140,
    m6: 140,
    m61: 140,
    m7: 140,
    m8: 130,
    m9: 140,
  },
  gs2: {
    m1: 0.0105,
    m2: 0.0105,
    m21: 0.0105,
    m3: 0.0105,
    m4: 0.0105,
    m5: 0.012,
    m6: 0.012,
    m61: 0.012,
    m7: 0.011,
    m8: 0.0105,
    m9: 0.011,
  },
  gs3: {
    m1: 0.0105,
    m2: 0.0105,
    m21: 0.0105,
    m3: 0.0105,
    m4: 0.0105,
    m5: 0.012,
    m6: 0.012,
    m61: 0.012,
    m7: 0.011,
    m8: 0.0105,
    m9: 0.011,
  },
  gs11: {
    m1: 100,
    m2: 90,
    m21: 100,
    m3: 100,
    m4: 100,
    m5: 140,
    m6: 140,
    m61: 140,
    m7: 140,
    m8: 130,
    m9: 140,
  },
};
/**
 * 计算公式
 */
export const calculationFormulaOptionPressure = [
  { label: '海曾-威廉公式', value: 'gs1' },
  { label: '《给水排水设计手册》计算公式', value: 'gs11' },
  // { label: '柯尔-勃洛克公式', value: 'gs2' },
  // { label: '曼宁公式', value: 'gs3' },
];
export const calculationFormulaOptionPressureMap = {
  gs1: '海曾-威廉公式',
  gs11: '《给水排水设计手册》计算公式',
};
/**
 * 计算内容
 */
export const calculationContentOption = [
  { label: '计算管径、水力坡降', value: PipelineCalculationEnum.PIPE_DIAMETER_GRADIENT },
  { label: '计算流速、水力坡降', value: PipelineCalculationEnum.FLOW_SPEED_GRADIENT },
  { label: '计算流量、水力坡降', value: PipelineCalculationEnum.FLOW_GRADIENT },
  { label: '计算管径、流速', value: PipelineCalculationEnum.PIPE_DIAMETER_FLOW_RATE },
  { label: '计算流量、流速', value: PipelineCalculationEnum.FLOW_RATE },
];
export const calculationContentOptionMap = {
  nr1: '计算管径、水力坡降',
  nr2: '计算流速、水力坡降',
  nr3: '计算流量、水力坡降',
  nr4: '计算管径、流速',
  nr5: '计算流量、流速',
};
export const calculationContentOption2 = [
  { label: '计算管径、水力坡降', value: PipelineCalculationEnum.PIPE_DIAMETER_GRADIENT },
  { label: '计算流速、水力坡降', value: PipelineCalculationEnum.FLOW_SPEED_GRADIENT },
  { label: '计算流量、水力坡降', value: PipelineCalculationEnum.FLOW_GRADIENT },
];
/**
 * 单位
 */
export const unitOption = [
  { label: 'L/s', value: 'rise' },
  { label: 'm³/h', value: 'cubicMeter' },
];
/**
 *公称直径
 *镀锌钢管 todo
 */
const nominalDiameterOption = [
  { label: '15/21.3/2.8', value: 15, shineUponNominalDiameter: 15.7 },
  { label: '20/26.9/2.8', value: 20, shineUponNominalDiameter: 21.3 },
  { label: '25/33.7/3.2', value: 25, shineUponNominalDiameter: 27.3 },
  { label: '32/42.4/3.5', value: 32, shineUponNominalDiameter: 35.4 },
  { label: '40/48.3/3.5', value: 40, shineUponNominalDiameter: 41.3 },
  { label: '50/60.3/3.8', value: 50, shineUponNominalDiameter: 52.7 },
  { label: '65/76.1/4', value: 65, shineUponNominalDiameter: 68.1 },
  { label: '80/88.9/4', value: 80, shineUponNominalDiameter: 80.9 },
  { label: '100/114.3/4', value: 100, shineUponNominalDiameter: 106.3 },
  { label: '150/168.3/4.5', value: 150, shineUponNominalDiameter: 159.3 },
  { label: '200/219.1/6', value: 200.1, shineUponNominalDiameter: 207.1 },
  { label: '200/219.1/6.5', value: 200.2, shineUponNominalDiameter: 206.1 },
  { label: '250/273/7', value: 259, shineUponNominalDiameter: 259 },
  { label: '250/273/8', value: 257, shineUponNominalDiameter: 257 },
  { label: '250/273/9', value: 255, shineUponNominalDiameter: 255 },
  { label: '250/273/10', value: 253, shineUponNominalDiameter: 253 },
  { label: '250/273/11', value: 251, shineUponNominalDiameter: 251 },
  { label: '250/273/12', value: 249, shineUponNominalDiameter: 249 },
  { label: '250/273/13', value: 247, shineUponNominalDiameter: 247 },
  { label: '250/273/14', value: 245, shineUponNominalDiameter: 245 },
  { label: '250/273/15', value: 243, shineUponNominalDiameter: 243 },
  { label: '250/273/16', value: 241, shineUponNominalDiameter: 241 },
  { label: '300/325/8', value: 309, shineUponNominalDiameter: 309 },
  { label: '300/325/9', value: 307, shineUponNominalDiameter: 307 },
  { label: '300/325/10', value: 305, shineUponNominalDiameter: 305 },
  { label: '300/325/11', value: 303, shineUponNominalDiameter: 303 },
  { label: '300/325/12', value: 301, shineUponNominalDiameter: 301 },
  { label: '300/325/13', value: 299, shineUponNominalDiameter: 299 },
  { label: '300/325/14', value: 297, shineUponNominalDiameter: 297 },
  { label: '300/325/15', value: 295, shineUponNominalDiameter: 295 },
  { label: '300/325/16', value: 293, shineUponNominalDiameter: 293 },
  { label: '350/377/9', value: 359, shineUponNominalDiameter: 359 },
  { label: '350/377/10', value: 357, shineUponNominalDiameter: 357 },
  { label: '350/377/11', value: 355, shineUponNominalDiameter: 355 },
  { label: '350/377/12', value: 353, shineUponNominalDiameter: 353 },
  { label: '350/377/13', value: 351, shineUponNominalDiameter: 351 },
  { label: '350/377/14', value: 349, shineUponNominalDiameter: 349 },
  { label: '350/377/15', value: 347, shineUponNominalDiameter: 347 },
  { label: '350/377/16', value: 345, shineUponNominalDiameter: 345 },
];
//焊接钢管 ok
const weldedSteelPipe = [
  { label: '25', value: 25, shineUponNominalDiameter: 26 },
  { label: '32', value: 32, shineUponNominalDiameter: 34.75 },
  { label: '40', value: 40, shineUponNominalDiameter: 40 },
  { label: '50', value: 50, shineUponNominalDiameter: 52 },
  { label: '70', value: 70, shineUponNominalDiameter: 67 },
  { label: '80', value: 80, shineUponNominalDiameter: 79.5 },
  { label: '100', value: 100, shineUponNominalDiameter: 105 },
  { label: '125', value: 125, shineUponNominalDiameter: 125 },
  { label: '150', value: 150, shineUponNominalDiameter: 147 },
  { label: '200', value: 200, shineUponNominalDiameter: 198 },
  { label: '250', value: 250, shineUponNominalDiameter: 252 },
  { label: '300', value: 300, shineUponNominalDiameter: 305 },
  { label: '350', value: 350, shineUponNominalDiameter: 357 },
  { label: '400', value: 400, shineUponNominalDiameter: 406 },
  { label: '500', value: 500, shineUponNominalDiameter: 509 },
  { label: '600', value: 600, shineUponNominalDiameter: 610 },
];
//钢管
const steelPipe = [
  { label: '25', value: 25, shineUponNominalDiameter: 26 },
  { label: '32', value: 32, shineUponNominalDiameter: 34.75 },
  { label: '40', value: 40, shineUponNominalDiameter: 40 },
  { label: '50', value: 50, shineUponNominalDiameter: 52 },
  { label: '70', value: 70, shineUponNominalDiameter: 67 },
  { label: '80', value: 80, shineUponNominalDiameter: 79.5 },
  { label: '100', value: 100, shineUponNominalDiameter: 105 },
  { label: '125', value: 125, shineUponNominalDiameter: 125 },
  { label: '150', value: 150, shineUponNominalDiameter: 147 },
  { label: '200', value: 200, shineUponNominalDiameter: 198 },
  { label: '250', value: 250, shineUponNominalDiameter: 252 },
  { label: '300', value: 300, shineUponNominalDiameter: 305 },
  { label: '350', value: 350, shineUponNominalDiameter: 357 },
  { label: '400', value: 400, shineUponNominalDiameter: 406 },
  { label: '500', value: 500, shineUponNominalDiameter: 509 },
  { label: '600', value: 600, shineUponNominalDiameter: 610 },
];

//球墨铸铁管 ok
export const ductileIronPipe = [
  { label: '100', value: 100, shineUponNominalDiameter: 99 },
  { label: '150', value: 150, shineUponNominalDiameter: 149 },
  { label: '200', value: 200, shineUponNominalDiameter: 199 },
  { label: '250', value: 250, shineUponNominalDiameter: 249 },
  { label: '300', value: 300, shineUponNominalDiameter: 300 },
  { label: '350', value: 350, shineUponNominalDiameter: 350 },
  { label: '400', value: 400, shineUponNominalDiameter: 400 },
  { label: '500', value: 500, shineUponNominalDiameter: 500 },
  { label: '600', value: 600, shineUponNominalDiameter: 600 },
];
//聚乙烯PE100管（0.6MPa）ok
const polyethylenePE100Pipe_6 = [
  { label: '50', value: 50, shineUponNominalDiameter: 58.4 },
  { label: '65', value: 65, shineUponNominalDiameter: 69.2 },
  { label: '80', value: 80, shineUponNominalDiameter: 83 },
  { label: '100', value: 100, shineUponNominalDiameter: 101.6 },
  { label: '150', value: 150, shineUponNominalDiameter: 147.6 },
  { label: '200', value: 200, shineUponNominalDiameter: 182.8 },
  { label: '250', value: 250, shineUponNominalDiameter: 228.6 },
  { label: '300', value: 300, shineUponNominalDiameter: 290.8 },
  { label: '350', value: 350, shineUponNominalDiameter: 327.8 },
  { label: '400', value: 400, shineUponNominalDiameter: 369.4 },
];
//聚乙烯PE100管（1.0MPa）ok
const polyethylenePE100Pipe_10 = [
  { label: '32', value: 32, shineUponNominalDiameter: 35.4 },
  { label: '40', value: 40, shineUponNominalDiameter: 44.2 },
  { label: '50', value: 50, shineUponNominalDiameter: 55.8 },
  { label: '65', value: 65, shineUponNominalDiameter: 66 },
  { label: '80', value: 80, shineUponNominalDiameter: 79.2 },
  { label: '100', value: 100, shineUponNominalDiameter: 96.8 },
  { label: '150', value: 150, shineUponNominalDiameter: 141 },
  { label: '200', value: 200, shineUponNominalDiameter: 173.2 },
  { label: '250', value: 250, shineUponNominalDiameter: 216.8 },
  { label: '300', value: 300, shineUponNominalDiameter: 277.6 },
  { label: '350', value: 350, shineUponNominalDiameter: 312.8 },
  { label: '400', value: 400, shineUponNominalDiameter: 352.6 },
];
////聚乙烯PE100管（1.6MPa）ok
const polyethylenePE100Pipe_16 = [
  { label: '32', value: 32, shineUponNominalDiameter: 32.6 },
  { label: '40', value: 40, shineUponNominalDiameter: 40.8 },
  { label: '50', value: 50, shineUponNominalDiameter: 51.4 },
  { label: '65', value: 65, shineUponNominalDiameter: 61.4 },
  { label: '80', value: 80, shineUponNominalDiameter: 73.6 },
  { label: '100', value: 100, shineUponNominalDiameter: 90 },
  { label: '150', value: 150, shineUponNominalDiameter: 130.8 },
  { label: '200', value: 200, shineUponNominalDiameter: 163.6 },
  { label: '250', value: 250, shineUponNominalDiameter: 204.6 },
  { label: '300', value: 300, shineUponNominalDiameter: 257.8 },
  { label: '350', value: 350, shineUponNominalDiameter: 290.6 },
  { label: '400', value: 400, shineUponNominalDiameter: 327.4 },
];
//高密度聚乙烯双壁波纹管（HDPE） 不显示
const highDensityPolyethyleneDoubleWallCorrugatedPipe = [
  { label: '225', value: 225 },
  { label: '315', value: 315 },
  { label: '400', value: 400 },
  { label: '500', value: 500 },
  { label: '600', value: 600 },
  { label: '800', value: 800 },
  { label: '1000', value: 1000 },
  { label: '1200', value: 1200 },
];
//不锈钢管
const stainlessSteelSeamlessSteelPipe = [
  { label: '20/20/0.6', value: 20.1, shineUponNominalDiameter: 18.8 },
  { label: '20/20/0.8', value: 20.2, shineUponNominalDiameter: 18.4 },
  { label: '20/20/1', value: 20.3, shineUponNominalDiameter: 18 },
  { label: '20/22.2/0.6', value: 20.4, shineUponNominalDiameter: 21 },
  { label: '20/22.2/0.8', value: 20.5, shineUponNominalDiameter: 20.6 },
  { label: '20/22.2/1', value: 20.6, shineUponNominalDiameter: 20.2 },
  { label: '25/25.4/0.8', value: 25.1, shineUponNominalDiameter: 23.8 },
  { label: '25/25.4/1', value: 25.2, shineUponNominalDiameter: 23.4 },
  { label: '25/28.58/0.8', value: 25.3, shineUponNominalDiameter: 26.98 },
  { label: '25/28.58/1', value: 25.4, shineUponNominalDiameter: 26.58 },
  { label: '32/31.8/0.8', value: 32.1, shineUponNominalDiameter: 30.2 },
  { label: '32/31.8/1', value: 32.2, shineUponNominalDiameter: 29.8 },
  { label: '32/31.8/1.2', value: 32.3, shineUponNominalDiameter: 29.4 },
  { label: '32/34/1', value: 32.4, shineUponNominalDiameter: 32 },
  { label: '32/34/1.2', value: 32.5, shineUponNominalDiameter: 31.6 },
  { label: '32/34/1.5', value: 32.6, shineUponNominalDiameter: 31 },
  { label: '40/40/1', value: 40.1, shineUponNominalDiameter: 38 },
  { label: '40/40/1.2', value: 40.2, shineUponNominalDiameter: 37.6 },
  { label: '40/42.7/1.2', value: 40.3, shineUponNominalDiameter: 40.3 },
  { label: '40/42.7/1.5', value: 40.4, shineUponNominalDiameter: 39.7 },
  { label: '50/48.6/1', value: 50.1, shineUponNominalDiameter: 46.6 },
  { label: '50/48.6/1.2', value: 50.2, shineUponNominalDiameter: 46.2 },
  { label: '50/48.6/1.5', value: 50.3, shineUponNominalDiameter: 45.6 },
  { label: '50/50.8/1', value: 50.4, shineUponNominalDiameter: 48.8 },
  { label: '50/50.8/1.2', value: 50.5, shineUponNominalDiameter: 48.4 },
  { label: '50/50.8/1.5', value: 50.6, shineUponNominalDiameter: 47.8 },
  { label: '65/76.1/1.2', value: 65.1, shineUponNominalDiameter: 73.7 },
  { label: '65/76.1/1.5', value: 65.2, shineUponNominalDiameter: 73.1 },
  { label: '65/76.1/2', value: 65.3, shineUponNominalDiameter: 72.1 },
  { label: '65/67/1.2', value: 65.4, shineUponNominalDiameter: 64.6 },
  { label: '80/88.9/2', value: 80.1, shineUponNominalDiameter: 84.9 },
  { label: '80/88.9/1.5', value: 80.2, shineUponNominalDiameter: 85.9 },
  { label: '100/101.6/2', value: 100.1, shineUponNominalDiameter: 97.6 },
  { label: '100/101.6/1.5', value: 100.2, shineUponNominalDiameter: 98.6 },
  { label: '100/108/2', value: 100.3, shineUponNominalDiameter: 104 },
  { label: '125/133/2', value: 125.1, shineUponNominalDiameter: 129 },
  { label: '125/133/2.5', value: 125.2, shineUponNominalDiameter: 128 },
  { label: '125/133/3', value: 125.3, shineUponNominalDiameter: 127 },
  { label: '150/159/3', value: 150.1, shineUponNominalDiameter: 153 },
  { label: '150/159/2.5', value: 150.2, shineUponNominalDiameter: 154 },
  { label: '150/159/2', value: 150.3, shineUponNominalDiameter: 155 },
  { label: '200/219/2.5', value: 200.1, shineUponNominalDiameter: 214 },
  { label: '200/219/3', value: 200.2, shineUponNominalDiameter: 213 },
  { label: '250/273/2.5', value: 250.1, shineUponNominalDiameter: 268 },
  { label: '250/273/3', value: 250.2, shineUponNominalDiameter: 267 },
  { label: '250/273/3.5', value: 250.3, shineUponNominalDiameter: 267 },
  { label: '250/273/4', value: 250.4, shineUponNominalDiameter: 265 },
  { label: '300/325/3', value: 250.5, shineUponNominalDiameter: 319 },
  { label: '300/325/3.5', value: 250.6, shineUponNominalDiameter: 318 },
  { label: '300/325/4', value: 317, shineUponNominalDiameter: 317 },
  { label: '350/377/3', value: 371, shineUponNominalDiameter: 371 },
  { label: '350/377/4', value: 369, shineUponNominalDiameter: 369 },
  { label: '350/377/5', value: 367, shineUponNominalDiameter: 367 },
  { label: '350/377/6', value: 365, shineUponNominalDiameter: 365 },
  { label: '350/377/7', value: 363, shineUponNominalDiameter: 363 },
  { label: '350/377/8', value: 361, shineUponNominalDiameter: 361 },
  { label: '350/377/9', value: 359, shineUponNominalDiameter: 359 },
  { label: '350/377/10', value: 357, shineUponNominalDiameter: 357 },
  { label: '350/377/11', value: 355, shineUponNominalDiameter: 355 },
  { label: '350/377/12', value: 353, shineUponNominalDiameter: 353 },
  { label: '400/426/4', value: 418, shineUponNominalDiameter: 418 },
  { label: '400/426/5', value: 416, shineUponNominalDiameter: 416 },
  { label: '400/426/6', value: 414, shineUponNominalDiameter: 414 },
  { label: '400/426/7', value: 412, shineUponNominalDiameter: 412 },
  { label: '400/426/8', value: 410, shineUponNominalDiameter: 410 },
  { label: '400/426/9', value: 408, shineUponNominalDiameter: 408 },
  { label: '400/426/10', value: 406, shineUponNominalDiameter: 406 },
  { label: '400/426/11', value: 404, shineUponNominalDiameter: 404 },
  { label: '400/426/12', value: 402, shineUponNominalDiameter: 402 },
];
//钢丝网骨架塑料（聚乙烯）复合管  暂不显示
const steelMeshSkeletonPlasticCompositePipe = [
  { label: '50', value: 50 },
  { label: '63', value: 63 },
  { label: '75', value: 75 },
  { label: '90', value: 90 },
  { label: '110', value: 110 },
  { label: '140', value: 140 },
  { label: '160', value: 160 },
  { label: '200', value: 200 },
  { label: '225', value: 225 },
  { label: '250', value: 250 },
  { label: '315', value: 315 },
  { label: '355', value: 355 },
  { label: '400', value: 400 },
  { label: '450', value: 450 },
  { label: '500', value: 500 },
  { label: '560', value: 560 },
  { label: '630', value: 630 },
];

/**
 * 管道材料
 * 1,2,3,4,8 与速度有关
 * 5,6 与速度无关
 */
export const pipeMaterialOption = [
  { label: '球墨铸铁管', value: 'm4', id: 4 },
  { label: '钢管', value: 'm21', id: 21 },
  { label: '镀锌钢管', value: 'm1', id: 1 }, //一一对应
  { label: '不锈钢管', value: 'm8' }, // 联动
  { label: '无缝钢管', value: 'm3', id: 3 }, // 联动
  // { label: '焊接钢管', value: 'm2', id: 2 },
  // { label: 'I级钢筋混凝土管', value: 'm5', id: 5 },
  // { label: 'II级钢筋混凝土管', value: 'm6', id: 6 },
  // { label: '高密度聚乙烯双壁波纹管（HDPE）', value: 'm7', id: 7 },
  { label: '聚乙烯PE100管（0.6MPa）', value: 'm5' },
  { label: '聚乙烯PE100管（1.0MPa）', value: 'm6' },
  { label: '聚乙烯PE100管（1.6MPa）', value: 'm61' },
  // { label: '钢丝网骨架塑料（聚乙烯）复合管', value: 'm9', id: 8 },暂时不处理
];
export const pipeMaterialOptionMap = {
  m4: '球墨铸铁管',
  m21: '钢管',
  m1: '镀锌钢管',
  m8: '不锈钢管',
  m3: '无缝钢管',
  m5: '聚乙烯PE100管（0.6MPa）',
  m6: '聚乙烯PE100管（1.0MPa）',
  m61: '聚乙烯PE100管（1.6MPa）',
};
// 管道材料和公称直径的关系
export const nominalDiameterObj = {
  m1: nominalDiameterOption,
  m21: steelPipe,
  m2: weldedSteelPipe,
  m3: seamlessSteelTube,
  m4: ductileIronPipe,
  m5: polyethylenePE100Pipe_6,
  m6: polyethylenePE100Pipe_10,
  m61: polyethylenePE100Pipe_16,
  m7: highDensityPolyethyleneDoubleWallCorrugatedPipe,
  m8: stainlessSteelSeamlessSteelPipe,
  m9: steelMeshSkeletonPlasticCompositePipe,
};
