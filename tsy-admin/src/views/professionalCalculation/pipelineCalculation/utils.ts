//BasicForm
import { PipelineCalculationEnum } from '/@/enums/pipelineCalculation';
export const pipeMaterialSwitchingGravity = (updateSchema, target) => {
  if (target === PipelineCalculationEnum.PIPE_DIAMETER_GRADIENT) {
    updateSchema([
      {
        field: 'rateOfFlow',
        label: '流量(L/s)',
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
        label: '流速（m/s）',
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
      {
        field: 'trenchHeight',
        label: '地沟高（mm）',
        required: false,
        component: 'InputNumberExpand',
        colProps: { span: 12 },
        componentProps: {
          disabled: true,
        },
      },
      {
        field: 'wideHeightRatio',
        label: '宽高比',
        component: 'InputNumberExpand',
        required: true,
        colProps: { span: 12 },
        componentProps: {
          disabled: false,
        },
      },
      {
        field: 'maximumDitchHeight',
        label: '最大沟高（mm）',
        component: 'InputNumberExpand',
        colProps: { span: 12 },
        required: true,
        componentProps: {
          disabled: false,
        },
      },
      {
        field: 'maximumPipeDiameter',
        label: '最大管径',
        component: 'InputNumberExpand',
        required: true,
        colProps: { span: 12 },
        componentProps: {
          disabled: false,
        },
      },
    ]);
  } else if (target === PipelineCalculationEnum.FLOW_SPEED_GRADIENT) {
    updateSchema([
      {
        field: 'rateOfFlow',
        label: '流量(L/s)',
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
        label: '流速（m/s）',
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
      {
        field: 'trenchHeight',
        label: '地沟高（mm）',
        required: false,
        component: 'InputNumberExpand',
        colProps: { span: 12 },
        componentProps: {
          disabled: true,
        },
      },
      {
        field: 'wideHeightRatio',
        label: '沟宽',
        component: 'InputNumberExpand',
        required: false,
        colProps: { span: 12 },
        componentProps: {
          disabled: true,
        },
      },
      {
        field: 'maximumDitchHeight',
        label: '最大沟高（mm）',
        component: 'InputNumberExpand',
        colProps: { span: 12 },
        required: false,
        componentProps: {
          disabled: true,
        },
      },
      {
        field: 'maximumPipeDiameter',
        label: '最大管径',
        component: 'InputNumberExpand',
        required: false,
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
        label: '流量(L/s)',
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
        label: '流速（m/s）',
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
      {
        field: 'trenchHeight',
        label: '地沟高（mm）',
        required: false,
        component: 'InputNumberExpand',
        colProps: { span: 12 },
        componentProps: {
          disabled: true,
        },
      },
      {
        field: 'wideHeightRatio',
        label: '沟宽',
        component: 'InputNumberExpand',
        defaultValue: 1500,
        required: false,
        colProps: { span: 12 },
        componentProps: {
          disabled: true,
        },
      },
      {
        field: 'maximumDitchHeight',
        label: '最大沟高（mm）',
        component: 'InputNumberExpand',
        colProps: { span: 12 },
        required: false,
        componentProps: {
          disabled: true,
        },
      },
      {
        field: 'maximumPipeDiameter',
        label: '最大管径',
        component: 'InputNumberExpand',
        required: false,
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
        label: '流量(L/s)',
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
        label: '流速（m/s）',
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
      {
        field: 'trenchHeight',
        label: '地沟高（mm）',
        required: false,
        component: 'InputNumberExpand',
        colProps: { span: 12 },
        componentProps: {
          disabled: true,
        },
      },
      {
        field: 'wideHeightRatio',
        label: '宽高比',
        component: 'InputNumberExpand',
        required: true,
        colProps: { span: 12 },
        componentProps: {
          disabled: false,
        },
      },
      {
        field: 'maximumDitchHeight',
        label: '最大沟高（mm）',
        component: 'InputNumberExpand',
        colProps: { span: 12 },
        required: true,
        componentProps: {
          disabled: false,
        },
      },
      {
        field: 'maximumPipeDiameter',
        label: '最大管径',
        component: 'InputNumberExpand',
        required: true,
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
        label: '流量(L/s)',
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
        label: '流速（m/s）',
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
      {
        field: 'trenchHeight',
        label: '地沟高（mm）',
        required: false,
        component: 'InputNumberExpand',
        colProps: { span: 12 },
        componentProps: {
          disabled: true,
        },
      },
      {
        field: 'wideHeightRatio',
        label: '沟宽',
        component: 'InputNumberExpand',
        required: false,
        colProps: { span: 12 },
        componentProps: {
          disabled: true,
        },
      },
      {
        field: 'maximumDitchHeight',
        label: '最大沟高（mm）',
        component: 'InputNumberExpand',
        colProps: { span: 12 },
        required: false,
        componentProps: {
          disabled: true,
        },
      },
      {
        field: 'maximumPipeDiameter',
        label: '最大管径',
        component: 'InputNumberExpand',
        required: false,
        colProps: { span: 12 },
        componentProps: {
          disabled: true,
        },
      },
    ]);
  }
};
