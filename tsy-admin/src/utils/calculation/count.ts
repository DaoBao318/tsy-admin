import { PipelineCalculationEnum } from '/@/enums/pipelineCalculation';

export function keepTwoDecimalFull(num, digit = 5): number {
  let result = parseFloat(num);
  if (isNaN(result)) {
    console.error('参数传递错误');
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
    if (['m1', 'm2', 'm21', 'm21', 'm3', 'm4', 'm8'].includes(pipeMaterial)) {
      //默认用第一个速度计算流量
      calculateFlowRate = trialSpeed(d, i);
    } else {
      calculateFlowRate = (4 * q) / Math.PI / Math.pow(d, 2);
    }
  }
  return keepTwoDecimalFull(calculateFlowRate, 3);
}

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
    m7: '140 ~ 150',
    m8: '90 ~ 100',
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
    m7: '140 ~ 150',
    m8: '90 ~ 100',
    m9: '140 ~ 150',
  },
};
export const Ch = {
  gs1: {
    m1: 90,
    m2: 90,
    m21: 90,
    m3: 90,
    m4: 90,
    m5: 140,
    m6: 140,
    m7: 140,
    m8: 90,
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
    m7: 0.011,
    m8: 0.0105,
    m9: 0.011,
  },
  gs11: {
    m1: 90,
    m2: 90,
    m21: 90,
    m3: 90,
    m4: 90,
    m5: 140,
    m6: 140,
    m7: 140,
    m8: 90,
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
/**
 * 计算公式
 */
export const calculationFormulaOption = [
  { label: '柯尔-勃洛克公式', value: 'gs2', disabled: true },
  { label: '曼宁公式', value: 'gs3' },
];
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
/**
 * 水流条件
 */
export const flowConditionsOption = [
  { label: '满流', value: 'sl1' },
  { label: '非满流', value: 'sl2' },
];
/**
 * 管道形状
 */
export const pipeShapeOption = [
  { label: '圆形', value: 'xz1' },
  { label: '矩形管', value: 'xz2' },
];
/**
 * 单位
 */
export const unitOption = [
  { label: 'l/s', value: 'rise' },
  { label: 'm³/h', value: 'cubicMeter' },
];
/**
 *公称直径
 *镀锌钢管 todo
 */
const nominalDiameterOption = [
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
//无缝钢管 todo
const seamlessSteelTube = [
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
const ductileIronPipe = [
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
  { label: '32', value: 32, shineUponNominalDiameter: 31.6 },
  { label: '40', value: 40, shineUponNominalDiameter: 39.8 },
  { label: '50', value: 50, shineUponNominalDiameter: 57.4 },
  { label: '65', value: 65, shineUponNominalDiameter: 68.2 },
  { label: '80', value: 80, shineUponNominalDiameter: 82 },
  { label: '100', value: 100, shineUponNominalDiameter: 100.6 },
  { label: '110', value: 110, shineUponNominalDiameter: 114.4 },
  { label: '150', value: 150, shineUponNominalDiameter: 146.6 },
  { label: '175', value: 175, shineUponNominalDiameter: 183.6 },
  { label: '200', value: 200, shineUponNominalDiameter: 206.8 },
  { label: '225', value: 225, shineUponNominalDiameter: 229.8 },
  { label: '250', value: 250, shineUponNominalDiameter: 257.6 },
  { label: '300', value: 300, shineUponNominalDiameter: 289.8 },
  { label: '350', value: 350, shineUponNominalDiameter: 326.8 },
  { label: '400', value: 400, shineUponNominalDiameter: 368.4 },
];
//聚乙烯PE100管（1.0MPa）ok
const polyethylenePE100Pipe_10 = [
  { label: '32', value: 32, shineUponNominalDiameter: 32.6 },
  { label: '40', value: 40, shineUponNominalDiameter: 40.8 },
  { label: '50', value: 50, shineUponNominalDiameter: 51.4 },
  { label: '65', value: 65, shineUponNominalDiameter: 66 },
  { label: '80', value: 80, shineUponNominalDiameter: 79.2 },
  { label: '100', value: 100, shineUponNominalDiameter: 96.8 },
  { label: '110', value: 110, shineUponNominalDiameter: 110.2 },
  { label: '150', value: 150, shineUponNominalDiameter: 141 },
  { label: '175', value: 175, shineUponNominalDiameter: 176.2 },
  { label: '200', value: 200, shineUponNominalDiameter: 198.2 },
  { label: '225', value: 225, shineUponNominalDiameter: 220.4 },
  { label: '250', value: 250, shineUponNominalDiameter: 246.8 },
  { label: '300', value: 300, shineUponNominalDiameter: 277.6 },
  { label: '350', value: 350, shineUponNominalDiameter: 312.8 },
  { label: '400', value: 400, shineUponNominalDiameter: 352.6 },
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
//不锈钢无缝钢管 todo
const stainlessSteelSeamlessSteelPipe = [
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
  { label: '镀锌钢管', value: 'm1', id: 1 },
  { label: '焊接钢管', value: 'm2', id: 2 },
  { label: '钢管', value: 'm21', id: 21 },
  { label: '无缝钢管', value: 'm3', id: 3 },
  { label: '球墨铸铁管', value: 'm4', id: 4 },
  // { label: 'I级钢筋混凝土管', value: 'm5', id: 5 },
  // { label: 'II级钢筋混凝土管', value: 'm6', id: 6 },
  // { label: '高密度聚乙烯双壁波纹管（HDPE）', value: 'm7', id: 7 },
  { label: '聚乙烯PE100管（0.6MPa）', value: 'm5' },
  { label: '聚乙烯PE100管（1.0MPa）', value: 'm6' },
  { label: '不锈钢无缝钢管', value: 'm8' },
  // { label: '钢丝网骨架塑料（聚乙烯）复合管', value: 'm9', id: 8 },暂时不处理
];
// 管道材料和公称直径的关系
export const nominalDiameterObj = {
  m1: nominalDiameterOption,
  m21: steelPipe,
  m2: weldedSteelPipe,
  m3: seamlessSteelTube,
  m4: ductileIronPipe,
  m5: polyethylenePE100Pipe_6,
  m6: polyethylenePE100Pipe_10,
  m7: highDensityPolyethyleneDoubleWallCorrugatedPipe,
  m8: stainlessSteelSeamlessSteelPipe,
  m9: steelMeshSkeletonPlasticCompositePipe,
};
