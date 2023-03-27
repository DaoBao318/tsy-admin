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
  return keepTwoDecimalFull(num, 4) * 1000;
}
/**
 * @param d 管径 计算得到
 * @param q 流量 海曾威廉系数 c
 * 得到水力梯度
 */
export function hydraulicGradient1(d, q, c, unit = 'cubicMeter') {
  d = d / 1000;
  if (unit === 'rise') {
    q = q / 1000;
  } else {
    q = q / 3600;
  }
  const num = (10.67 * Math.pow(q, 1.852)) / Math.pow(c, 1.852) / Math.pow(d, 4.87);
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
export function hydraulicGradient2(d, q, c, unit = 'cubicMeter') {
  d = d / 1000;
  if (unit === 'rise') {
    q = q / 1000;
  } else {
    q = q / 3600;
  }
  const num = (10.67 * Math.pow(q, 1.852)) / Math.pow(c, 1.852) / Math.pow(d, 4.87);
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
    return keepTwoDecimalFull(rateOfFlowValue, 4) * 1000;
  }
  return keepTwoDecimalFull(rateOfFlowValue, 4) * 3600;
}
/**
 *
 * 水力坡降计算；
 * @param q—流量，m3/s；
 * @param c—海曾-威廉系数，可查表取得（枚举值）；
 * @param d—管道计算内径，m；
 */

export function hydraulicGradient3(q, c, d, unit = 'cubicMeter') {
  d = d / 1000;
  if (unit === 'rise') {
    q = q / 1000;
  } else {
    q = q / 3600;
  }
  const hydraulicGradientValue =
    (10.67 * Math.pow(q, 1.852)) / Math.pow(c, 1.852) / Math.pow(d, 4.87);
  return keepTwoDecimalFull(hydraulicGradientValue, 5);
}
/**
 *
 * @param q 流量，m3/s；
 * @param i 水力坡降
 * @param c 海曾-威廉系数，可查表取得（枚举值）
 * 得到计算管径
 */
export function calculatePipeDiameter4(q, i, c, unit = 'cubicMeter') {
  if (unit === 'rise') {
    q = q / 1000;
  } else {
    q = q / 3600;
  }
  const raw = (10.67 * Math.pow(q, 1.852)) / i / Math.pow(c, 1.852);
  const calculatePipeDiameter = Math.pow(raw, 1 / 4.87);
  return keepTwoDecimalFull(calculatePipeDiameter, 4) * 1000;
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
export function calculateFlow5(i, c, d, unit = 'cubicMeter') {
  d = d / 1000;
  const raw = (i * Math.pow(c, 1.852) * Math.pow(d, 4.87)) / 10.67;
  const calculateFlow = Math.pow(raw, 1 / 1.852);
  if (unit === 'rise') {
    return keepTwoDecimalFull(calculateFlow, 5) * 1000;
  }
  return keepTwoDecimalFull(calculateFlow, 5) * 3600;
}
/**
 * @param q 流量，m3/s 6
 * @param d 管道计算内径，m；1
 * 得到v—流速，m/s 7
 */
export function calculateFlowRate5(q, d, unit = 'cubicMeter') {
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
 * 海曾 威廉系数和粗糙系数与公式和材料有关
 */
export const Ch_recommend = {
  gs1: {
    m1: '130 ~ 140',
    m2: '130 ~ 140',
    m3: '130 ~ 140',
    m4: '130 ~ 140',
    m5: '110 ~ 130',
    m6: '110 ~ 130',
    m7: '140 ~ 150',
    m8: '130 ~ 140',
    m9: '140 ~ 150',
  },
  gs2: {
    m1: '0.0105 ~ 0.0115',
    m2: '0.0105 ~ 0.0115',
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
    m3: '0.0105 ~ 0.0115',
    m4: '0.0105 ~ 0.0115',
    m5: '0.012 ~ 0.013',
    m6: '0.012 ~ 0.013',
    m7: '0.010 ~ 0.030',
    m8: '0.0105 ~ 0.0115',
    m9: '0.010 ~ 0.030',
  },
};
export const Ch = {
  gs1: {
    m1: 130,
    m2: 130,
    m3: 130,
    m4: 130,
    m5: 110,
    m6: 110,
    m7: 140,
    m8: 130,
    m9: 140,
  },
  gs2: {
    m1: 0.0105,
    m2: 0.0105,
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
    m3: 0.0105,
    m4: 0.0105,
    m5: 0.012,
    m6: 0.012,
    m7: 0.011,
    m8: 0.0105,
    m9: 0.011,
  },
};
/**
 * 计算公式
 */
export const calculationFormulaOptionPressure = [
  { label: '海曾-威廉公式', value: 'gs1' },
  { label: '柯尔-勃洛克公式', value: 'gs2' },
  { label: '曼宁公式', value: 'gs3' },
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
 *镀锌钢管
 */
const nominalDiameterOption = [
  { label: '10', value: 10 },
  { label: '15', value: 15 },
  { label: '20', value: 20 },
  { label: '25', value: 25 },
  { label: '32', value: 32 },
  { label: '40', value: 40 },
  { label: '50', value: 50 },
  { label: '70', value: 70 },
  { label: '80', value: 80 },
  { label: '100', value: 100 },
  { label: '125', value: 125 },
  { label: '150', value: 150 },
];
//焊接钢管
const weldedSteelPipe = [
  { label: '15', value: 15 },
  { label: '20', value: 20 },
  { label: '25', value: 25 },
  { label: '32', value: 32 },
  { label: '40', value: 40 },
  { label: '50', value: 50 },
  { label: '65', value: 65 },
  { label: '70', value: 70 },
  { label: '80', value: 80 },
  { label: '100', value: 100 },
  { label: '125', value: 125 },
  { label: '150', value: 150 },
  { label: '170', value: 170 },
  { label: '200', value: 200 },
  { label: '225', value: 225 },
  { label: '250', value: 250 },
  { label: '300', value: 300 },
  { label: '350', value: 350 },
  { label: '400', value: 400 },
  { label: '450', value: 450 },
  { label: '500', value: 500 },
  { label: '600', value: 600 },
  { label: '700', value: 700 },
  { label: '800', value: 800 },
  { label: '900', value: 900 },
  { label: '1000', value: 1000 },
  { label: '1200', value: 1200 },
  { label: '1400', value: 1400 },
  { label: '1600', value: 1600 },
  { label: '1800', value: 1800 },
];
//无缝钢管
const seamlessSteelTube = [
  { label: '10', value: 10 },
  { label: '15', value: 15 },
  { label: '20', value: 20 },
  { label: '25', value: 25 },
  { label: '32', value: 32 },
  { label: '40', value: 40 },
  { label: '50', value: 50 },
  { label: '65', value: 65 },
  { label: '80', value: 80 },
  { label: '100', value: 100 },
  { label: '125', value: 125 },
  { label: '150', value: 150 },
  { label: '200', value: 200 },
  { label: '250', value: 250 },
  { label: '300', value: 300 },
  { label: '350', value: 350 },
];
//球墨铸铁管
const ductileIronPipe = [
  { label: '40', value: 40 },
  { label: '50', value: 50 },
  { label: '60', value: 60 },
  { label: '65', value: 65 },
  { label: '80', value: 80 },
  { label: '100', value: 100 },
  { label: '125', value: 125 },
  { label: '150', value: 150 },
  { label: '200', value: 200 },
  { label: '250', value: 250 },
  { label: '300', value: 300 },
  { label: '350', value: 350 },
  { label: '400', value: 400 },
  { label: '500', value: 500 },
  { label: '600', value: 600 },
  { label: '700', value: 700 },
  { label: '800', value: 800 },
  { label: '900', value: 900 },
  { label: '1000', value: 1000 },
  { label: '1200', value: 1200 },
  { label: '1400', value: 1400 },
  { label: '1600', value: 1600 },
  { label: '1800', value: 1800 },
  { label: '2000', value: 2000 },
  { label: '2200', value: 2200 },
  { label: '2400', value: 2400 },
  { label: '2600', value: 2600 },
];
//I级钢筋混凝土管
const reinforcedConcretePipeOfGradeI = [
  { label: '100', value: 100 },
  { label: '150', value: 150 },
  { label: '200', value: 200 },
  { label: '250', value: 250 },
  { label: '300', value: 300 },
  { label: '400', value: 400 },
  { label: '500', value: 500 },
  { label: '600', value: 600 },
  { label: '700', value: 700 },
  { label: '800', value: 800 },
  { label: '900', value: 900 },
  { label: '1000', value: 1000 },
  { label: '1100', value: 1100 },
  { label: '1200', value: 1200 },
  { label: '1400', value: 1400 },
  { label: '1500', value: 1500 },
  { label: '1600', value: 1600 },
  { label: '1800', value: 1800 },
  { label: '2000', value: 2000 },
  { label: '2200', value: 2200 },
  { label: '2400', value: 2400 },
];
//II级钢筋混凝土管
const reinforcedConcretePipeOfGradeII = [
  { label: '300', value: 300 },
  { label: '400', value: 400 },
  { label: '500', value: 500 },
  { label: '600', value: 600 },
  { label: '700', value: 700 },
  { label: '800', value: 800 },
  { label: '900', value: 900 },
  { label: '1000', value: 1000 },
  { label: '1100', value: 1100 },
  { label: '1200', value: 1200 },
  { label: '1400', value: 1400 },
  { label: '1500', value: 1500 },
  { label: '1600', value: 1600 },
  { label: '1800', value: 1800 },
  { label: '2000', value: 2000 },
  { label: '2200', value: 2200 },
  { label: '2400', value: 2400 },
];
//高密度聚乙烯双壁波纹管（HDPE）
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
//不锈钢无缝钢管
const stainlessSteelSeamlessSteelPipe = [
  { label: '10', value: 10 },
  { label: '15', value: 15 },
  { label: '20', value: 20 },
  { label: '25', value: 25 },
  { label: '32', value: 32 },
  { label: '40', value: 40 },
  { label: '50', value: 50 },
  { label: '65', value: 65 },
  { label: '80', value: 80 },
  { label: '100', value: 100 },
  { label: '125', value: 125 },
  { label: '150', value: 150 },
  { label: '200', value: 200 },
];
//钢丝网骨架塑料（聚乙烯）复合管
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
 */
export const pipeMaterialOption = [
  { label: '镀锌钢管', value: 'm1', id: 1 },
  { label: '焊接钢管', value: 'm2', id: 2 },
  { label: '无缝钢管', value: 'm3', id: 3 },
  { label: '球墨铸铁管', value: 'm4', id: 4 },
  { label: 'I级钢筋混凝土管', value: 'm5', id: 5 },
  { label: 'II级钢筋混凝土管', value: 'm6', id: 6 },
  { label: '高密度聚乙烯双壁波纹管（HDPE）', value: 'm7', id: 7 },
  { label: '不锈钢无缝钢管', value: 'm8' },
  { label: '钢丝网骨架塑料（聚乙烯）复合管', value: 'm9', id: 8 },
];
// 管道材料和公称直径的关系
export const nominalDiameterObj = {
  m1: nominalDiameterOption,
  m2: weldedSteelPipe,
  m3: seamlessSteelTube,
  m4: ductileIronPipe,
  m5: reinforcedConcretePipeOfGradeI,
  m6: reinforcedConcretePipeOfGradeII,
  m7: highDensityPolyethyleneDoubleWallCorrugatedPipe,
  m8: stainlessSteelSeamlessSteelPipe,
  m9: steelMeshSkeletonPlasticCompositePipe,
};
