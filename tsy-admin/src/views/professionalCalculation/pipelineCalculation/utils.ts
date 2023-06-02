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
  calculationContentOption,
  calculationContentOption2,
} from '/@/utils/calculation/count';
import { defHttp } from '/@/utils/http/axios';
import moment from 'moment';
export function getnominalDiameterName(pipeMaterial, calculationContent) {
  let label = '';
  if (['m1', 'm8', 'm3'].includes(pipeMaterial)) {
    if (['nr1', 'nr4'].includes(calculationContent)) {
      label = '推荐公称直径/外径/壁厚(mm)';
    } else {
      label = '公称直径/外径/壁厚(mm)';
    }
  } else {
    if (['nr1', 'nr4'].includes(calculationContent)) {
      label = '推荐公称直径DN(mm)';
    } else {
      label = '公称直径DN(mm)';
    }
  }
  return label;
}
export const pipeMaterialSwitchingPressure = (updateSchema, target, formModel) => {
  const labelNominalDiameter = getnominalDiameterName(formModel.pipeMaterial, target);
  if (target === PipelineCalculationEnum.PIPE_DIAMETER_GRADIENT) {
    formModel.hydraulicGradient = undefined;
    formModel.nominalDiameter = undefined;
    formModel.calculateInnerDiameter = undefined;
    formModel.velocityOfFlow = 1;
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
        label: labelNominalDiameter,
        required: false,
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
        label: '水力坡降',
        required: false,
        dynamicDisabled: true,
      },
    ]);
  } else if (target === PipelineCalculationEnum.FLOW_SPEED_GRADIENT) {
    formModel.hydraulicGradient = undefined;
    formModel.velocityOfFlow = undefined;
    formModel.nominalDiameter = undefined;
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
        dynamicDisabled: true,
      },
      {
        field: 'nominalDiameter',
        label: labelNominalDiameter,
        required: true,
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
        label: '水力坡降',
        required: false,
        dynamicDisabled: true,
      },
    ]);
  } else if (target === PipelineCalculationEnum.FLOW_GRADIENT) {
    formModel.rateOfFlow = undefined;
    formModel.hydraulicGradient = undefined;
    formModel.nominalDiameter = undefined;
    formModel.calculateInnerDiameter = undefined;
    formModel.velocityOfFlow = 1;
    updateSchema([
      {
        field: 'rateOfFlow',
        required: false,
        dynamicDisabled: true,
      },
      {
        field: 'calculateInnerDiameter',
        label: '计算内径(mm)',
        dynamicDisabled: true,
      },
      {
        field: 'nominalDiameter',
        label: labelNominalDiameter,
        required: true,
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
        label: '水力坡降',
        required: false,
        dynamicDisabled: true,
      },
    ]);
  } else if (target === PipelineCalculationEnum.PIPE_DIAMETER_FLOW_RATE) {
    formModel.calculateInnerDiameter = undefined;
    formModel.velocityOfFlow = undefined;
    formModel.nominalDiameter = undefined;
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
        label: labelNominalDiameter,
        required: false,
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
        label: '水力坡降',
        required: true,
        dynamicDisabled: false,
      },
    ]);
  } else if (target === PipelineCalculationEnum.FLOW_RATE) {
    formModel.rateOfFlow = undefined;
    formModel.velocityOfFlow = undefined;
    formModel.nominalDiameter = undefined;
    formModel.calculateInnerDiameter = undefined;
    updateSchema([
      {
        field: 'rateOfFlow',
        required: false,
        dynamicDisabled: true,
      },
      {
        field: 'calculateInnerDiameter',
        label: '计算内径(mm)',
        dynamicDisabled: true,
      },
      {
        field: 'nominalDiameter',
        required: true,
        label: labelNominalDiameter,
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
        label: '水力坡降',
        required: true,
        dynamicDisabled: false,
      },
    ]);
  }
};
export const stateControlPressure = (updateSchema, target, pipeMaterial) => {
  const labelNominalDiameter = getnominalDiameterName(pipeMaterial, target);
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
        label: labelNominalDiameter,
        required: false,
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
        label: '水力坡降',
        required: false,
        dynamicDisabled: true,
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
        dynamicDisabled: true,
      },
      {
        field: 'nominalDiameter',
        label: labelNominalDiameter,
        required: true,
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
        label: '水力坡降',
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
        dynamicDisabled: true,
      },
      {
        field: 'nominalDiameter',
        label: labelNominalDiameter,
        required: true,
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
        label: '水力坡降',
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
        label: labelNominalDiameter,
        required: false,
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
        label: '水力坡降',
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
        dynamicDisabled: true,
      },
      {
        field: 'nominalDiameter',
        required: true,
        label: labelNominalDiameter,
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
        label: '水力坡降',
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
    }-昼夜最大用水量排水计算-${moment().format('YYYYMMDDHHmmss')}.xlsx`; //下载后文件名docx
    document.body.appendChild(downloadElement);
    downloadElement.click(); //点击下载
    document.body.removeChild(downloadElement); //下载完成移除元素
    window.URL.revokeObjectURL(href); //释放blob对象
  }
};
export const transBlobExcel = (excelDownloadInfo, exportNameObj) => {
  // 如果后端返回的result是进过Blob处理的，直接 window.URL.createObjectURL()
  // 如果没有,就需要先实例化一个Blob对象,再window.URL.createObjectURL()
  // excelDownloadInfo = new Blob([JSON.stringify(excelDownloadInfo.data) as any], {
  //   type: 'application/vnd.ms-excel', // 指定类型
  // });
  const blob = new Blob([excelDownloadInfo], { type: excelDownloadInfo.type });
  if (window.navigator && window.navigator.msSaveOrOpenBlob) {
    window.navigator.msSaveOrOpenBlob(
      excelDownloadInfo,
      `${exportNameObj.projectName}-设施设备选型计算-${moment().format('YYYYMMDDHHmmss')}.xlsx`,
    );
  } else {
    const downloadElement = document.createElement('a');
    const href = window.URL.createObjectURL(blob); //创建下载的链接
    downloadElement.href = href;
    downloadElement.download = `${exportNameObj.projectName}-设施设备选型计算-${moment().format(
      'YYYYMMDDHHmmss',
    )}.xlsx`; //下载后文件名xlsx
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
  const label = getnominalDiameterName(e, formModel.calculationContent);
  updateSchema({
    field: 'nominalDiameter',
    label,
    componentProps: {
      options: nominalDiameterOptions,
      showSearch: true,
      optionFilterProp: 'label',
      onChange(e, v) {
        if (v) {
          const { shineUponNominalDiameter } = v;
          //无缝钢管公称外径壁厚不同，计算内径相同。shineUponNominalDiameter为计算内径。
          let duplicateValueProcessing = Number(shineUponNominalDiameter);
          if (duplicateValueProcessing > 1000) {
            duplicateValueProcessing = duplicateValueProcessing - 1000;
          }
          formModel.calculateInnerDiameter = duplicateValueProcessing;
          console.log('--------e--', e, formModel);
        }
      },
    },
  });
  let options = calculationContentOption;
  if (['m1', 'm4', 'm8', 'm3', 'm21'].includes(e) && formModel.calculationFormula === 'gs11') {
    options = calculationContentOption2;
  }
  updateSchema({
    field: 'calculationContent',
    label: '计算内容',
    componentProps: ({ formModel, formActionType }) => {
      return {
        placeholder: '请选择内容',
        options,
        disabled: false,
        onChange: async (e: any) => {
          const target = e;
          const { updateSchema } = formActionType;
          pipeMaterialSwitchingPressure(updateSchema, target, formModel);
        },
      };
    },
  });
};
//工程直径初始化
export const initountNominalDiameter = (e, updateSchema, obj) => {
  let nominalDiameterOptions = nominalDiameterObj[e] || [];
  if (e === undefined) {
    nominalDiameterOptions = [];
  }
  // formModel.calculateInnerDiameter = undefined;
  // formModel.nominalDiameter = undefined;
  // const label = getnominalDiameterName(e, formModel.calculationContent);
  updateSchema({
    field: 'nominalDiameter',
    // label,
    componentProps: ({ formModel }) => {
      return {
        options: nominalDiameterOptions,
        showSearch: true,
        optionFilterProp: 'label',
        onChange(e, v) {
          if (v) {
            const { shineUponNominalDiameter } = v;
            //无缝钢管公称外径壁厚不同，计算内径相同。shineUponNominalDiameter为计算内径。
            let duplicateValueProcessing = Number(shineUponNominalDiameter);
            if (duplicateValueProcessing > 1000) {
              duplicateValueProcessing = duplicateValueProcessing - 1000;
            }
            formModel.calculateInnerDiameter = duplicateValueProcessing;
            console.log('--------e--', e, formModel);
          }
        },
      };
    },
  });
  let options = calculationContentOption;
  if (['m1', 'm4', 'm8', 'm3', 'm21'].includes(e) && obj.calculationFormula === 'gs11') {
    options = calculationContentOption2;
  }
  updateSchema({
    field: 'calculationContent',
    label: '计算内容',
    componentProps: ({ formModel, formActionType }) => {
      return {
        placeholder: '请选择内容',
        options,
        disabled: false,
        onChange: async (e: any) => {
          const target = e;
          const { updateSchema } = formActionType;
          pipeMaterialSwitchingPressure(updateSchema, target, formModel);
        },
      };
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
//获取对象中的数组
const getArr = function (arr) {
  return arr.map((item) => item.shineUponNominalDiameter);
};
// 获取数组中的临近值
export const getArrMiddle = function (arr, item) {
  const newMapArr = JSON.parse(JSON.stringify(arr));
  const newMap = {};
  newMapArr.forEach((item) => {
    newMap[item.shineUponNominalDiameter] = item.value;
  });
  arr = getArr(arr);
  arr.push(item);
  arr = arr.sort((a, b) => a - b);
  const index = arr.indexOf(item);
  const len = arr.length;
  let result = 0;
  if (index === 0) {
    result = arr[1];
  } else if (index === len - 1) {
    result = arr[len - 2];
  } else {
    const left = item - arr[index - 1];
    const right = arr[index + 1] - item;
    const min = Math.min(left, right);
    if (min === right) {
      result = arr[index + 1];
    } else {
      result = arr[index - 1];
    }
  }
  return newMap[result];
};

// 压力计算 nominalDiameter
/**
 * 五种模式的 水力梯度 流量 流速 管径
 * @param values 当前form的所有值
 * @param setFieldsValue 给当前form设置value
 */
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
    const i = hydraulicGradient1(d, q, c, unit, values);
    const lossAlongTheWayResult = frictionalHeadLoss(i, l);
    const LocalResistanceLossResult = lossAlongTheWayResultCal(lossAlongTheWayResult, percentage);
    const hydraulicLossResult = keepTwoDecimalFull(
      lossAlongTheWayResult + LocalResistanceLossResult,
      2,
    );
    const nominalDiameter = getArrMiddle(nominalDiameterObj[values.pipeMaterial], d);
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
      nominalDiameter,
    });
  } else if (values.calculationContent === PipelineCalculationEnum.FLOW_SPEED_GRADIENT) {
    const d = values.calculateInnerDiameter;
    const q = values.rateOfFlow;
    const v = calculateFlowRate2(d, q, unit);
    const i = hydraulicGradient2(d, q, c, unit, values);
    const lossAlongTheWayResult = frictionalHeadLoss(i, l);
    const LocalResistanceLossResult = lossAlongTheWayResultCal(lossAlongTheWayResult, percentage);
    const hydraulicLossResult = keepTwoDecimalFull(
      lossAlongTheWayResult + LocalResistanceLossResult,
      2,
    );
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
    const i = hydraulicGradient3(q, c, d, unit, values);
    const lossAlongTheWayResult = frictionalHeadLoss(i, l);
    const LocalResistanceLossResult = lossAlongTheWayResultCal(lossAlongTheWayResult, percentage);
    const hydraulicLossResult = keepTwoDecimalFull(
      lossAlongTheWayResult + LocalResistanceLossResult,
      2,
    );
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
    const i = values.hydraulicGradient;
    const d = calculatePipeDiameter4(q, i, c, unit, values);
    const v = calculateFlowRate4(q, d, unit);
    const lossAlongTheWayResult = frictionalHeadLoss(i, l);
    const LocalResistanceLossResult = lossAlongTheWayResultCal(lossAlongTheWayResult, percentage);
    const hydraulicLossResult = keepTwoDecimalFull(
      lossAlongTheWayResult + LocalResistanceLossResult,
      2,
    );
    const nominalDiameter = getArrMiddle(nominalDiameterObj[values.pipeMaterial], d);
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
      nominalDiameter,
    });
  } else if (values.calculationContent === PipelineCalculationEnum.FLOW_RATE) {
    const i = values.hydraulicGradient;
    const d = values.calculateInnerDiameter;
    const q = calculateFlow5(i, c, d, unit, values);
    const v = calculateFlowRate5(q, d, i, unit, values);
    const lossAlongTheWayResult = frictionalHeadLoss(i, l);
    const LocalResistanceLossResult = lossAlongTheWayResultCal(lossAlongTheWayResult, percentage);
    const hydraulicLossResult = keepTwoDecimalFull(
      lossAlongTheWayResult + LocalResistanceLossResult,
      2,
    );
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

//压力数据保存和修改

export const dealPressureData = (values) => {
  const pressureID = values.pressureID;
  let dealData = '[]';
  if (
    localStorage.getItem('pressurePageSave') !== 'undefined' &&
    !!localStorage.getItem('pressurePageSave')
  ) {
    dealData = localStorage.getItem('pressurePageSave');
  }
  let beforeData = JSON.parse(dealData);
  if (pressureID) {
    beforeData = beforeData.filter((item) => item.pressureID !== pressureID);
    beforeData = beforeData.concat(values);
  } else {
    const id = '' + new Date().getTime();
    values.pressureID = id;
    beforeData.push(values);
  }
  //通过一个必填项，对不合理的数据进行过滤
  beforeData = beforeData.filter((item) => !!item.hydraulicLossResult);
  const sortData = beforeData.sort((a, b) => Number(a.pressureID) - Number(b.pressureID));
  console.log('paixu----------11----', sortData);
  localStorage.setItem('pressurePageSave', JSON.stringify(sortData));
};

export const deletePressure = (values) => {
  const pressureID = values.pressureID;
  let dealData = '[]';
  if (
    localStorage.getItem('pressurePageSave') !== 'undefined' &&
    !!localStorage.getItem('pressurePageSave')
  ) {
    dealData = localStorage.getItem('pressurePageSave');
  }
  let beforeData = JSON.parse(dealData);
  if (pressureID) {
    beforeData = beforeData.filter((item) => item.pressureID !== pressureID);
  }
  localStorage.setItem('pressurePageSave', JSON.stringify(beforeData));
};
