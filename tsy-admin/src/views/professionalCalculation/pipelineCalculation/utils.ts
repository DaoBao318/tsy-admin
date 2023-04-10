//BasicForm
import { ref } from 'vue';
import { PipelineCalculationEnum } from '/@/enums/pipelineCalculation';
import {
  calculateFlow3,
  calculateFlow5,
  calculateFlowRate2,
  calculateFlowRate4,
  calculateFlowRate5,
  calculatePipeDiameter1,
  calculatePipeDiameter4,
  Ch,
  Ch_recommend,
  hydraulicGradient1,
  hydraulicGradient2,
  hydraulicGradient3,
  nominalDiameterObj,
  keepTwoDecimalFull,
} from '/@/utils/calculation/count';
import { defHttp } from '/@/utils/http/axios';
import moment from 'moment';
export const pipeMaterialSwitchingGravity = (updateSchema, target) => {
  if (target === PipelineCalculationEnum.PIPE_DIAMETER_GRADIENT) {
    updateSchema([
      {
        field: 'rateOfFlow',
        required: true,
        dynamicDisabled: false,
      },
      {
        field: 'calculateInnerDiameter',
        label: '计算内径(mm)',
        required: false,
        dynamicDisabled: true,
      },
      {
        field: 'nominalDiameter',
        label: '公称直径',
        dynamicDisabled: true,
      },
      {
        field: 'velocityOfFlow',
        dynamicDisabled: false,
      },
      {
        field: 'hydraulicGradient',
        required: false,
        dynamicDisabled: true,
      },
      {
        field: 'trenchHeight',
        required: false,
        dynamicDisabled: true,
      },
      {
        field: 'wideHeightRatio',
        label: '宽高比',
        required: true,
        dynamicDisabled: false,
      },
      {
        field: 'maximumDitchHeight',
        label: '最大沟高（mm）',
        required: true,
        dynamicDisabled: false,
      },
      {
        field: 'maximumPipeDiameter',
        label: '最大管径',
        required: true,
        dynamicDisabled: false,
      },
    ]);
  } else if (target === PipelineCalculationEnum.FLOW_SPEED_GRADIENT) {
    updateSchema([
      {
        field: 'rateOfFlow',
        required: true,
        dynamicDisabled: false,
      },
      {
        field: 'calculateInnerDiameter',
        label: '计算内径(mm)',
        required: true,
        dynamicDisabled: false,
      },
      {
        field: 'nominalDiameter',
        label: '公称直径',
        dynamicDisabled: false,
      },
      {
        field: 'velocityOfFlow',
        label: '流速（m/s）',
        required: false,
        dynamicDisabled: true,
      },
      {
        field: 'hydraulicGradient',
        label: '水力坡度',
        required: false,
        dynamicDisabled: true,
      },
      {
        field: 'trenchHeight',
        label: '地沟高（mm）',
        required: false,
        dynamicDisabled: true,
      },
      {
        field: 'wideHeightRatio',
        label: '沟宽',
        required: false,
        dynamicDisabled: true,
      },
      {
        field: 'maximumDitchHeight',
        label: '最大沟高（mm）',
        required: false,
        dynamicDisabled: true,
      },
      {
        field: 'maximumPipeDiameter',
        label: '最大管径',
        required: false,
        dynamicDisabled: true,
      },
    ]);
  } else if (target === PipelineCalculationEnum.FLOW_GRADIENT) {
    updateSchema([
      {
        field: 'rateOfFlow',
        required: false,
        dynamicDisabled: true,
      },
      {
        field: 'calculateInnerDiameter',
        label: '计算内径(mm)',
        required: true,
        dynamicDisabled: false,
      },
      {
        field: 'nominalDiameter',
        label: '公称直径',
        dynamicDisabled: false,
      },
      {
        field: 'velocityOfFlow',
        label: '流速（m/s）',
        required: true,
        dynamicDisabled: false,
      },
      {
        field: 'hydraulicGradient',
        label: '水力坡度',
        required: false,
        dynamicDisabled: true,
      },
      {
        field: 'trenchHeight',
        label: '地沟高（mm）',
        required: false,
        dynamicDisabled: true,
      },
      {
        field: 'wideHeightRatio',
        label: '沟宽',
        defaultValue: 1500,
        required: false,
        dynamicDisabled: true,
      },
      {
        field: 'maximumDitchHeight',
        label: '最大沟高（mm）',
        required: false,
        dynamicDisabled: true,
      },
      {
        field: 'maximumPipeDiameter',
        label: '最大管径',
        required: false,
        dynamicDisabled: true,
      },
    ]);
  } else if (target === PipelineCalculationEnum.PIPE_DIAMETER_FLOW_RATE) {
    updateSchema([
      {
        field: 'rateOfFlow',
        required: true,
        dynamicDisabled: false,
      },
      {
        field: 'calculateInnerDiameter',
        label: '计算内径(mm)',
        required: false,
        dynamicDisabled: true,
      },
      {
        field: 'nominalDiameter',
        label: '公称直径',
        dynamicDisabled: true,
      },
      {
        field: 'velocityOfFlow',
        label: '流速（m/s）',
        required: false,
        dynamicDisabled: true,
      },
      {
        field: 'hydraulicGradient',
        label: '水力坡度',
        required: true,
        dynamicDisabled: false,
      },
      {
        field: 'trenchHeight',
        label: '地沟高（mm）',
        required: false,
        dynamicDisabled: true,
      },
      {
        field: 'wideHeightRatio',
        label: '宽高比',
        required: true,
        dynamicDisabled: false,
      },
      {
        field: 'maximumDitchHeight',
        label: '最大沟高（mm）',
        required: true,
        dynamicDisabled: false,
      },
      {
        field: 'maximumPipeDiameter',
        label: '最大管径',
        required: true,
        dynamicDisabled: false,
      },
    ]);
  } else if (target === PipelineCalculationEnum.FLOW_RATE) {
    updateSchema([
      {
        field: 'rateOfFlow',
        required: false,
        dynamicDisabled: true,
      },
      {
        field: 'calculateInnerDiameter',
        label: '计算内径(mm)',
        required: true,
        dynamicDisabled: false,
      },
      {
        field: 'nominalDiameter',
        label: '公称直径',
        dynamicDisabled: false,
      },
      {
        field: 'velocityOfFlow',
        label: '流速（m/s）',
        required: false,
        dynamicDisabled: true,
      },
      {
        field: 'hydraulicGradient',
        label: '水力坡度',
        required: true,
        dynamicDisabled: false,
      },
      {
        field: 'trenchHeight',
        label: '地沟高（mm）',
        required: false,
        dynamicDisabled: true,
      },
      {
        field: 'wideHeightRatio',
        label: '沟宽',
        required: false,
        dynamicDisabled: true,
      },
      {
        field: 'maximumDitchHeight',
        label: '最大沟高（mm）',
        required: false,
        dynamicDisabled: true,
      },
      {
        field: 'maximumPipeDiameter',
        label: '最大管径',
        required: false,
        dynamicDisabled: true,
      },
    ]);
  }
};
export const pipeMaterialSwitchingPressure = (updateSchema, target, formModel) => {
  if (target === PipelineCalculationEnum.PIPE_DIAMETER_GRADIENT) {
    formModel.hydraulicGradient = undefined;
    formModel.calculateInnerDiameter = undefined;
    updateSchema([
      {
        field: 'rateOfFlow',
        required: true,
        dynamicDisabled: false,
      },
      {
        field: 'calculateInnerDiameter',
        label: '计算内径(mm)',
        required: false,
        dynamicDisabled: true,
      },
      {
        field: 'nominalDiameter',
        label: '公称直径',
        dynamicDisabled: true,
      },
      {
        field: 'velocityOfFlow',
        label: '流速（m/s）',
        required: true,
        dynamicDisabled: false,
      },
      {
        field: 'hydraulicGradient',
        label: '水力坡度',
        required: false,
        dynamicDisabled: true,
      },
    ]);
  } else if (target === PipelineCalculationEnum.FLOW_SPEED_GRADIENT) {
    formModel.hydraulicGradient = undefined;
    formModel.velocityOfFlow = undefined;
    updateSchema([
      {
        field: 'rateOfFlow',
        required: true,
        dynamicDisabled: false,
      },
      {
        field: 'calculateInnerDiameter',
        label: '计算内径(mm)',
        required: true,
        dynamicDisabled: false,
      },
      {
        field: 'nominalDiameter',
        label: '公称直径',
        dynamicDisabled: false,
      },
      {
        field: 'velocityOfFlow',
        label: '流速（m/s）',
        required: false,
        dynamicDisabled: true,
      },
      {
        field: 'hydraulicGradient',
        label: '水力坡度',
        required: false,
        dynamicDisabled: true,
      },
    ]);
  } else if (target === PipelineCalculationEnum.FLOW_GRADIENT) {
    formModel.rateOfFlow = undefined;
    formModel.hydraulicGradient = undefined;
    updateSchema([
      {
        field: 'rateOfFlow',
        required: false,
        dynamicDisabled: true,
      },
      {
        field: 'calculateInnerDiameter',
        label: '计算内径(mm)',
        required: true,
        dynamicDisabled: false,
      },
      {
        field: 'nominalDiameter',
        label: '公称直径',
        dynamicDisabled: false,
      },
      {
        field: 'velocityOfFlow',
        label: '流速（m/s）',
        required: true,
        dynamicDisabled: false,
      },
      {
        field: 'hydraulicGradient',
        label: '水力坡度',
        required: false,
        dynamicDisabled: true,
      },
    ]);
  } else if (target === PipelineCalculationEnum.PIPE_DIAMETER_FLOW_RATE) {
    formModel.calculateInnerDiameter = undefined;
    formModel.velocityOfFlow = undefined;
    formModel.nominalDiameter = undefined;
    updateSchema([
      {
        field: 'rateOfFlow',
        required: true,
        dynamicDisabled: false,
      },
      {
        field: 'calculateInnerDiameter',
        label: '计算内径(mm)',
        required: false,
        dynamicDisabled: true,
      },
      {
        field: 'nominalDiameter',
        label: '公称直径',
        dynamicDisabled: true,
      },
      {
        field: 'velocityOfFlow',
        label: '流速（m/s）',
        required: false,
        dynamicDisabled: true,
      },
      {
        field: 'hydraulicGradient',
        label: '水力坡度',
        required: true,
        dynamicDisabled: false,
      },
    ]);
  } else if (target === PipelineCalculationEnum.FLOW_RATE) {
    formModel.rateOfFlow = undefined;
    formModel.velocityOfFlow = undefined;
    updateSchema([
      {
        field: 'rateOfFlow',
        required: false,
        dynamicDisabled: true,
      },
      {
        field: 'calculateInnerDiameter',
        label: '计算内径(mm)',
        required: true,
        dynamicDisabled: false,
      },
      {
        field: 'nominalDiameter',
        label: '公称直径',
        dynamicDisabled: false,
      },
      {
        field: 'velocityOfFlow',
        label: '流速（m/s）',
        required: false,
        dynamicDisabled: true,
      },
      {
        field: 'hydraulicGradient',
        label: '水力坡度',
        required: true,
        dynamicDisabled: false,
      },
    ]);
  }
};

export const batchExportUrl = (url) => {
  const elelink = document.createElement('a');
  elelink.style.display = 'none';
  elelink.download = '昼夜最大给水排水用水量';
  elelink.href = url;
  document.body.appendChild(elelink);
  elelink.click();
  // window.open()
};

const downloadMedicationOrderGroupStatisticsList = async (url, data): Promise<string> => {
  return await defHttp.post({ url, data, responseType: 'blob' });
};

// 当后端直接返回文件流而不是返回的阿里云在线链接地址时下载excel文件
export const batchExport = async (url, data) => {
  const excelDownloadInfo = (await downloadMedicationOrderGroupStatisticsList(url, data)) as any;
  console.log(decodeURI(excelDownloadInfo.contentDisposition.split('Filename=')[1]));
  // 如果后端返回的result是进过Blob处理的，直接 window.URL.createObjectURL()
  // 如果没有,就需要先实例化一个Blob对象,再window.URL.createObjectURL()
  // const excelDownloadInfo = new Blob([JSON.stringify(excelDownloadInfo.data) as any], {
  //     type: 'application/vnd.ms-excel',// 指定类型
  // });
  // 创建标签
  const link = document.createElement('a');
  link.style.display = 'none';
  // 设置标签href属性为文件路径
  link.href = URL.createObjectURL(excelDownloadInfo);
  // 截取接口给的文件名
  const fileName =
    decodeURI(excelDownloadInfo.contentDisposition.split('Filename=')[1]) ||
    '昼夜最大给水排水用水量';
  // 设置下载文件名
  link.download = fileName;
  document.body.appendChild(link);
  // 点击触发下载
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(URL.createObjectURL(excelDownloadInfo));
};
export const transBlob = (excelDownloadInfo, exportNameObj) => {
  // 如果后端返回的result是进过Blob处理的，直接 window.URL.createObjectURL()
  // 如果没有,就需要先实例化一个Blob对象,再window.URL.createObjectURL()
  // excelDownloadInfo = new Blob([JSON.stringify(excelDownloadInfo.data) as any], {
  //   type: 'application/vnd.ms-excel', // 指定类型
  // });
  const blob = new Blob([excelDownloadInfo], { type: excelDownloadInfo.type });
  if (window.navigator && window.navigator.msSaveOrOpenBlob) {
    window.navigator.msSaveOrOpenBlob(
      excelDownloadInfo,
      `${exportNameObj.projectName}-昼夜最大用水量排水计算-${moment().format(
        'YYYYMMDDHHmmss',
      )}.xlsx`,
    );
  } else {
    const downloadElement = document.createElement('a');
    const href = window.URL.createObjectURL(blob); //创建下载的链接
    downloadElement.href = href;
    downloadElement.download = `${
      exportNameObj.projectName
    }-昼夜最大用水量排水计算-${moment().format('YYYYMMDDHHmmss')}.xlsx`; //下载后文件名
    document.body.appendChild(downloadElement);
    downloadElement.click(); //点击下载
    document.body.removeChild(downloadElement); //下载完成移除元素
    window.URL.revokeObjectURL(href); //释放blob对象
  }
};

//将全局变量导出，对应的方法也导出，提取出来进行计算，再将结果导入。
export const operableControlFlag = ref<any>(false);
export const operableControl = () => {
  operableControlFlag.value = !operableControlFlag.value;
};

//公称直径计算
export const countNominalDiameter = (e, updateSchema, formModel) => {
  let nominalDiameterOptions = nominalDiameterObj[e] || [];
  if (e === undefined) {
    nominalDiameterOptions = [];
  }
  formModel.calculateInnerDiameter = undefined;
  formModel.nominalDiameter = undefined;
  updateSchema({
    field: 'nominalDiameter',
    componentProps: {
      options: nominalDiameterOptions,
      onChange(e) {
        // formModel.calculateInnerDiameter = e - 1;
        console.log('--------e--', e, formModel);
      },
    },
  });
};
//海曾威廉系数计算
export const calculateWilliamCoefficient = (e, formModel) => {
  formModel.coughnessCoefficientRecommend =
    Ch_recommend[formModel.calculationFormula][e] || undefined;
  formModel.coughnessCoefficient = Ch[formModel.calculationFormula][e] || undefined;
};
export function frictionalHeadLoss(i, l): number {
  const frictionalHeadLoss = i * l;
  return keepTwoDecimalFull(frictionalHeadLoss, 1);
}
export function lossAlongTheWayResultCal(lossAlongTheWayResult, percentage): number {
  return keepTwoDecimalFull(lossAlongTheWayResult * percentage, 3);
}

// 压力计算
export const pressureCalculation = (values, setFieldsValue) => {
  const unit = values.unit;
  const c = values.coughnessCoefficient;
  const l = values.pipeLength;
  const percentage = values.percentageLocalResistanceLoss || 0.3;
  debugger;
  if (values.calculationContent === PipelineCalculationEnum.PIPE_DIAMETER_GRADIENT) {
    const q = values.rateOfFlow;
    const v = values.velocityOfFlow;
    const d = calculatePipeDiameter1(q, v, unit);
    const i = hydraulicGradient1(d, q, c, unit);
    const lossAlongTheWayResult = frictionalHeadLoss(i, l);
    const LocalResistanceLossResult = lossAlongTheWayResultCal(lossAlongTheWayResult, percentage);
    const hydraulicLossResult = lossAlongTheWayResult + LocalResistanceLossResult;
    setFieldsValue({
      calculateInnerDiameter: d,
      hydraulicGradient: i,
      pipeLengthResult: l,
      hydraulicGradientResult: i,
      caliberResult: d,
      velocityOfFlowResult: v,
      rateOfFlowResult: q,
      lossAlongTheWayResult,
      LocalResistanceLossResult,
      hydraulicLossResult,
    });
  } else if (values.calculationContent === PipelineCalculationEnum.FLOW_SPEED_GRADIENT) {
    const d = values.calculateInnerDiameter;
    const q = values.rateOfFlow;
    const v = calculateFlowRate2(d, q, unit);
    const i = hydraulicGradient2(d, q, c, unit);
    const lossAlongTheWayResult = frictionalHeadLoss(i, l);
    const LocalResistanceLossResult = lossAlongTheWayResultCal(lossAlongTheWayResult, percentage);
    const hydraulicLossResult = lossAlongTheWayResult + LocalResistanceLossResult;
    setFieldsValue({
      velocityOfFlow: v,
      hydraulicGradient: i,
      hydraulicGradientResult: i,
      pipeLengthResult: l,
      caliberResult: d,
      velocityOfFlowResult: v,
      rateOfFlowResult: q,
      lossAlongTheWayResult,
      LocalResistanceLossResult,
      hydraulicLossResult,
    });
  } else if (values.calculationContent === PipelineCalculationEnum.FLOW_GRADIENT) {
    const d = values.calculateInnerDiameter;
    const v = values.velocityOfFlow;
    const q = calculateFlow3(d, v, unit);
    const i = hydraulicGradient3(q, c, d, unit);
    const lossAlongTheWayResult = frictionalHeadLoss(i, l);
    const LocalResistanceLossResult = lossAlongTheWayResultCal(lossAlongTheWayResult, percentage);
    const hydraulicLossResult = lossAlongTheWayResult + LocalResistanceLossResult;
    setFieldsValue({
      rateOfFlow: q,
      hydraulicGradient: i,
      hydraulicGradientResult: i,
      pipeLengthResult: l,
      caliberResult: d,
      velocityOfFlowResult: v,
      rateOfFlowResult: q,
      lossAlongTheWayResult,
      LocalResistanceLossResult,
      hydraulicLossResult,
    });
  } else if (values.calculationContent === PipelineCalculationEnum.PIPE_DIAMETER_FLOW_RATE) {
    const q = values.rateOfFlow;
    const i = values.hydraulicGradientResult;
    const d = calculatePipeDiameter4(q, i, c, unit);
    const v = calculateFlowRate4(q, d, unit);
    const lossAlongTheWayResult = frictionalHeadLoss(i, l);
    const LocalResistanceLossResult = lossAlongTheWayResultCal(lossAlongTheWayResult, percentage);
    const hydraulicLossResult = lossAlongTheWayResult + LocalResistanceLossResult;
    setFieldsValue({
      velocityOfFlow: v,
      calculateInnerDiameter: d,
      hydraulicGradientResult: i,
      pipeLengthResult: l,
      caliberResult: d,
      velocityOfFlowResult: v,
      rateOfFlowResult: q,
      lossAlongTheWayResult,
      LocalResistanceLossResult,
      hydraulicLossResult,
    });
  } else if (values.calculationContent === PipelineCalculationEnum.FLOW_RATE) {
    const i = values.hydraulicGradientResult;
    const d = values.calculateInnerDiameter;
    const q = calculateFlow5(i, c, d, unit);
    const v = calculateFlowRate5(q, d, unit);
    const lossAlongTheWayResult = frictionalHeadLoss(i, l);
    const LocalResistanceLossResult = lossAlongTheWayResultCal(lossAlongTheWayResult, percentage);
    const hydraulicLossResult = lossAlongTheWayResult + LocalResistanceLossResult;
    setFieldsValue({
      velocityOfFlow: v,
      rateOfFlow: q,
      pipeLengthResult: l,
      hydraulicGradientResult: i,
      caliberResult: d,
      velocityOfFlowResult: v,
      rateOfFlowResult: q,
      lossAlongTheWayResult,
      LocalResistanceLossResult,
      hydraulicLossResult,
    });
  }
};

//重力计算

export const gravityCalculation = (values, setFieldsValue) => {};
