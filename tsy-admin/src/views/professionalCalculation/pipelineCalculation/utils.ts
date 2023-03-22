//BasicForm
import { ref } from 'vue';
import { PipelineCalculationEnum } from '/@/enums/pipelineCalculation';
import { defHttp } from '/@/utils/http/axios';
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
        required: false,
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
        label: '流量(L/s)',
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
        label: '流量(L/s)',
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
        label: '流量(L/s)',
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
        label: '流量(L/s)',
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
export const pipeMaterialSwitchingPressure = (updateSchema, target) => {
  if (target === PipelineCalculationEnum.PIPE_DIAMETER_GRADIENT) {
    updateSchema([
      {
        field: 'rateOfFlow',
        label: '流量',
        required: true,
        component: 'InputNumberExpand',
        colProps: { span: 6 },
        componentProps: {
          disabled: false,
        },
      },
      {
        field: 'calculateInnerDiameter',
        label: '计算内径(mm)',
        required: false,
        component: 'InputNumberExpand',
        colProps: { span: 12 },
        componentProps: {
          disabled: true,
        },
      },
      {
        field: 'velocityOfFlow',
        label: '流速',
        required: true,
        component: 'InputNumberExpand',
        colProps: { span: 12 },
        componentProps: {
          disabled: false,
        },
      },
      {
        field: 'hydraulicGradient',
        label: '水力坡度',
        required: false,
        component: 'InputNumberExpand',
        colProps: { span: 12 },
        componentProps: {
          disabled: true,
        },
      },
    ]);
  } else if (target === PipelineCalculationEnum.FLOW_SPEED_GRADIENT) {
    updateSchema([
      {
        field: 'rateOfFlow',
        label: '流量',
        required: true,
        component: 'InputNumberExpand',
        colProps: { span: 6 },
        componentProps: {
          disabled: false,
        },
      },
      {
        field: 'calculateInnerDiameter',
        label: '计算内径(mm)',
        required: true,
        component: 'InputNumberExpand',
        colProps: { span: 12 },
        componentProps: {
          disabled: false,
        },
      },
      {
        field: 'velocityOfFlow',
        label: '流速',
        required: false,
        component: 'InputNumberExpand',
        colProps: { span: 12 },
        componentProps: {
          disabled: true,
        },
      },
      {
        field: 'hydraulicGradient',
        label: '水力坡度',
        required: false,
        component: 'InputNumberExpand',
        colProps: { span: 12 },
        componentProps: {
          disabled: true,
        },
      },
    ]);
  } else if (target === PipelineCalculationEnum.FLOW_GRADIENT) {
    updateSchema([
      {
        field: 'rateOfFlow',
        label: '流量',
        required: false,
        component: 'InputNumberExpand',
        colProps: { span: 6 },
        componentProps: {
          disabled: true,
        },
      },
      {
        field: 'calculateInnerDiameter',
        label: '计算内径(mm)',
        required: true,
        component: 'InputNumberExpand',
        colProps: { span: 12 },
        componentProps: {
          disabled: false,
        },
      },
      {
        field: 'velocityOfFlow',
        label: '流速',
        required: true,
        component: 'InputNumberExpand',
        colProps: { span: 12 },
        componentProps: {
          disabled: false,
        },
      },
      {
        field: 'hydraulicGradient',
        label: '水力坡度',
        required: false,
        component: 'InputNumberExpand',
        colProps: { span: 12 },
        componentProps: {
          disabled: true,
        },
      },
    ]);
  } else if (target === PipelineCalculationEnum.PIPE_DIAMETER_FLOW_RATE) {
    updateSchema([
      {
        field: 'rateOfFlow',
        label: '流量',
        required: true,
        component: 'InputNumberExpand',
        colProps: { span: 6 },
        componentProps: {
          disabled: false,
        },
      },
      {
        field: 'calculateInnerDiameter',
        label: '计算内径(mm)',
        required: false,
        component: 'InputNumberExpand',
        colProps: { span: 12 },
        componentProps: {
          disabled: true,
        },
      },
      {
        field: 'velocityOfFlow',
        label: '流速',
        required: false,
        component: 'InputNumberExpand',
        colProps: { span: 12 },
        componentProps: {
          disabled: true,
        },
      },
      {
        field: 'hydraulicGradient',
        label: '水力坡度',
        required: true,
        component: 'InputNumberExpand',
        colProps: { span: 12 },
        componentProps: {
          disabled: false,
        },
      },
    ]);
  } else if (target === PipelineCalculationEnum.FLOW_RATE) {
    updateSchema([
      {
        field: 'rateOfFlow',
        label: '流量',
        required: false,
        component: 'InputNumberExpand',
        colProps: { span: 6 },
        componentProps: {
          disabled: true,
        },
      },
      {
        field: 'calculateInnerDiameter',
        label: '计算内径(mm)',
        required: true,
        component: 'InputNumberExpand',
        colProps: { span: 12 },
        componentProps: {
          disabled: false,
        },
      },
      {
        field: 'velocityOfFlow',
        label: '流速',
        required: false,
        component: 'InputNumberExpand',
        colProps: { span: 12 },
        componentProps: {
          disabled: true,
        },
      },
      {
        field: 'hydraulicGradient',
        label: '水力坡度',
        required: true,
        component: 'InputNumberExpand',
        colProps: { span: 12 },
        componentProps: {
          disabled: false,
        },
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

const downloadMedicationOrderGroupStatisticsList = async (data): Promise<string> => {
  const url = `/XMedicationOrder/statistic/outHospital/complex/downloadMedicationOrderGroupStatisticsList`;
  // eslint-disable-next-line no-return-await
  return await defHttp.post({ url, data, responseType: 'blob' });
};

// 当后端直接返回文件流而不是返回的阿里云在线链接地址时下载excel文件
export const batchExport = async (params) => {
  const excelDownloadInfo = (await downloadMedicationOrderGroupStatisticsList({
    ...params,
  })) as any;
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

//将全局变量导出，对应的方法也导出，提取出来进行计算，再将结果导入。
export const operableControlFlag = ref<any>(false);
export const operableControl = () => {
  operableControlFlag.value = !operableControlFlag.value;
};
