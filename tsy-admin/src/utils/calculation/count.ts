import { PipelineCalculationEnum } from '/@/enums/pipelineCalculation';

function keepTwoDecimalFull(num, digit = 5) {
  let result = parseFloat(num);
  if (isNaN(result)) {
    console.error('参数传递错误');
    return false;
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
 * 流量计算
 * v—流速，m/s
 * dj—管道计算内径，m；
 */
export function rateOfFlow(d, v) {
  const rateOfFlowValue = ((Math.PI * Math.pow(d, 2)) / 4) * v;
  return keepTwoDecimalFull(rateOfFlowValue, 3);
}
/**
 *
 * 水力坡降计算；
 * q—流量，m3/s；
 * C—海曾-威廉系数，可查表取得（枚举值）；
 * d—管道计算内径，m；
 */

export function hydraulicGradient(q, c, d, digit) {
  const hydraulicGradientValue =
    (10.67 * Math.pow(q, 1.852)) / Math.pow(c, 1.852) / Math.pow(d, 4.87);
  return keepTwoDecimalFull(hydraulicGradientValue, digit);
}
/**
 * 海曾 威廉系数
 */
// export const Ch = {
//   m1: [130, 140],
//   m2: [130, 140],
//   m3: [130, 140],
//   m4: [130, 140],
//   m5: [110, 130],
//   m6: [110, 130],
//   m7: [140, 150],
//   m8: [130, 140],
//   m9: [140, 150],
// };
export const Ch = {
  m1: 130,
  m2: 130,
  m3: 130,
  m4: 130,
  m5: 110,
  m6: 110,
  m7: 140,
  m8: 130,
  m9: 140,
};
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
  { label: '升/秒', value: 'dw1' },
  { label: '立方米/每小时', value: 'dw2' },
];
/**
 *公称直径
 *镀锌钢管
 */
export const nominalDiameterOption = [
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
/**
 * 公称直径
 * 焊接钢管
 */
export const weldedSteelPipe = [
  { label: '70', value: 70 },
  { label: '80', value: 80 },
  { label: '100', value: 100 },
  { label: '125', value: 125 },
  { label: '150', value: 150 },
];

export const nominalDiameterObj = {
  m1: nominalDiameterOption,
  m2: weldedSteelPipe,
};
