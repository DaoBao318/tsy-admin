import { FormSchema } from '/@/components/Table';
//BasicForm
import {
  pipeMaterialOption,
  calculationFormulaOptionPressure,
  calculationContentOption,
  unitOption,
  ductileIronPipe,
} from '/@/utils/calculation/count';
import {
  calculateWilliamCoefficient,
  countNominalDiameter,
  pipeMaterialSwitchingPressure,
} from '../../pipelineCalculation/utils';
const COUNT_WIDTH = {
  LARGE_WIDTH: 12,
  MIDDLE_WIDTH: 8,
  SMALL_WIDTH: 6,
};

export const formSchemaCount: FormSchema[] = [
  {
    field: 'calculationFormula',
    label: '计算公式',
    required: true,
    component: 'Select',
    colProps: { span: COUNT_WIDTH.MIDDLE_WIDTH },
    defaultValue: 'gs1',
    // componentProps: {
    //   options: calculationFormulaOptionPressure,
    // },
    componentProps: ({ formModel, formActionType }) => {
      return {
        options: calculationFormulaOptionPressure,
        placeholder: '请选择计算公式',
        onChange: (e: any) => {
          // console.log(e)
          const { updateSchema } = formActionType;
          let label = '海曾-威廉系数';
          let show = true;
          if (e === 'gs1') {
            label = '海曾-威廉系数';
            show = true;
          } else if (e === 'gs11') {
            label = '海曾-威廉系数';
            show = false;
          } else {
            label = '粗糙系数';
          }
          formModel.coughnessCoefficient = undefined;
          formModel.coughnessCoefficientRecommend = undefined;
          formModel.pipeMaterial = undefined;
          updateSchema([
            {
              field: 'coughnessCoefficient',
              label: label,
              show,
            },
          ]);
        },
      };
    },
  },
  {
    field: 'pipeMaterial',
    label: '管道材料',
    required: true,
    component: 'Select',
    colProps: { span: COUNT_WIDTH.MIDDLE_WIDTH },
    componentProps: ({ formModel, formActionType }) => {
      return {
        options: pipeMaterialOption,
        placeholder: '请选择材料',
        onChange: (e: any) => {
          // console.log(e) calculateWilliamCoefficient
          const { updateSchema } = formActionType;
          countNominalDiameter(e, updateSchema, formModel);
          calculateWilliamCoefficient(e, formModel);
        },
      };
    },
  },
  {
    field: 'calculationContent',
    label: '计算内容',
    required: true,
    component: 'Select',
    dynamicDisabled: true,
    colProps: { span: COUNT_WIDTH.MIDDLE_WIDTH },
    defaultValue: 'nr2',
    componentProps: ({ formModel, formActionType }) => {
      return {
        placeholder: '请选择内容',
        options: calculationContentOption,
        disabled: false,
        onChange: async (e: any) => {
          const target = e;
          const { updateSchema } = formActionType;
          pipeMaterialSwitchingPressure(updateSchema, target, formModel);
        },
      };
    },
  },
  {
    field: 'coughnessCoefficient',
    label: '海曾-威廉系数',
    component: 'InputNumberExpand',
    show: true,
    defaultValue: 90,
    helpMessage: ({ values }) => {
      const mes = values.coughnessCoefficientRecommend
        ? values.coughnessCoefficientRecommend
        : '90 ~ 100';
      const message = '海曾-威廉系数推荐值：' + mes;
      return message;
    },
    colProps: { span: COUNT_WIDTH.MIDDLE_WIDTH },
    dynamicRules: ({ values }) => {
      return [
        {
          required: true,
          validator: (_, value) => {
            const min = Number(values.coughnessCoefficientRecommend.split('~')[0]);
            const max = Number(values.coughnessCoefficientRecommend.split('~')[1]);
            values.coughnessCoefficientRecommend;
            if (value > max || value < min) {
              const mes = '海曾-威廉系数范围在' + values.coughnessCoefficientRecommend + '之间';
              return Promise.reject(mes);
            }
            return Promise.resolve();
          },
        },
      ];
    },
  },
  {
    field: 'coughnessCoefficientRecommend',
    label: '海曾-威廉推荐值',
    required: false,
    component: 'Input',
    defaultValue: '90 ~ 100',
    colProps: { span: COUNT_WIDTH.MIDDLE_WIDTH },
    dynamicDisabled: true,
    show: false,
  },

  {
    field: 'calculateInnerDiameter',
    label: '计算内径(mm)',
    component: 'InputNumberExpand',
    dynamicDisabled: true,
    colProps: { span: COUNT_WIDTH.MIDDLE_WIDTH },
  },
  {
    field: 'nominalDiameter',
    label: '公称直径DN(mm)',
    component: 'Select',
    dynamicDisabled: false,
    required: true,
    colProps: { span: COUNT_WIDTH.MIDDLE_WIDTH },
    componentProps: () => {
      return {
        placeholder: ' ',
        options: ductileIronPipe,
      };
    },
  },
  {
    field: 'velocityOfFlow',
    label: '流速(m/s)',
    required: false,
    dynamicDisabled: true,
    component: 'InputNumberExpand',
    colProps: { span: COUNT_WIDTH.MIDDLE_WIDTH },
  },
  {
    field: 'rateOfFlow',
    label: '流量(m³/h)',
    required: true,
    component: 'InputNumberExpand',
    colProps: { span: COUNT_WIDTH.MIDDLE_WIDTH },
    componentProps: {
      disabled: true,
    },
  },
  {
    field: 'unit',
    label: '单位',
    required: true,
    component: 'Select',
    colProps: { span: COUNT_WIDTH.MIDDLE_WIDTH },
    defaultValue: 'cubicMeter',
    componentProps: ({ formActionType }) => {
      return {
        options: unitOption,
        onChange(e) {
          let label = '流量(m³/h)';
          if (e === 'rise') {
            label = '流量(l/s)';
          }
          const { updateSchema } = formActionType;
          updateSchema([
            {
              field: 'rateOfFlow',
              label: label,
            },
            {
              field: 'rateOfFlowResult',
              label: label,
            },
          ]);
        },
      };
    },
  },
  {
    field: 'hydraulicGradient',
    label: '水力坡度',
    dynamicDisabled: true,
    component: 'InputNumberExpand',
    colProps: { span: COUNT_WIDTH.MIDDLE_WIDTH },
  },
  {
    field: 'pipeLength',
    label: '管道长度(m)',
    required: true,
    component: 'InputNumberExpand',
    defaultValue: 1000,
    colProps: { span: COUNT_WIDTH.MIDDLE_WIDTH },
  },
  {
    field: 'percentageLocalResistanceLoss',
    label: '水头损失率',
    component: 'InputNumberExpand',
    colProps: { span: COUNT_WIDTH.MIDDLE_WIDTH },
    helpMessage: '局部水头损失范围在0.2-0.3之间',
    defaultValue: 0.2,
    dynamicRules: ({ values }) => {
      return [
        {
          required: true,
          validator: (_, value) => {
            if (value > 0.3 || value < 0.2) {
              return Promise.reject('局部水头损失范围在0.2-0.3之间');
            }
            return Promise.resolve();
          },
        },
      ];
    },
  },
  { label: '计算结果', field: 'field3', component: 'Divider', helpMessage: '计算结果' },
  {
    field: 'pipeLengthResult',
    label: '管道长度(m)',
    component: 'InputNumberExpand',
    colProps: { span: COUNT_WIDTH.MIDDLE_WIDTH },
    show: false,
    componentProps: {
      disabled: true,
    },
  },
  {
    field: 'hydraulicGradientResult',
    label: '水力坡度',
    component: 'InputNumberExpand',
    colProps: { span: COUNT_WIDTH.MIDDLE_WIDTH },
    componentProps: {
      disabled: true,
    },
  },
  {
    field: 'caliberResult',
    label: '管径',
    show: false,
    component: 'InputNumberExpand',
    colProps: { span: COUNT_WIDTH.MIDDLE_WIDTH },
    componentProps: {
      disabled: true,
    },
  },
  {
    field: 'velocityOfFlowResult',
    label: '流速(m/s)',
    component: 'InputNumberExpand',
    colProps: { span: COUNT_WIDTH.MIDDLE_WIDTH },
    componentProps: {
      disabled: true,
    },
  },
  {
    field: 'rateOfFlowResult',
    label: '流量(m³/h)',
    show: false,
    component: 'InputNumberExpand',
    colProps: { span: COUNT_WIDTH.MIDDLE_WIDTH },
    componentProps: {
      disabled: true,
    },
  },
  {
    field: 'lossAlongTheWayResult',
    label: '沿程损失',
    // show: false,
    component: 'InputNumberExpand',
    colProps: { span: COUNT_WIDTH.MIDDLE_WIDTH },
    componentProps: {
      disabled: true,
    },
  },
  {
    field: 'LocalResistanceLossResult',
    label: '局部阻力损失',
    component: 'InputNumberExpand',
    colProps: { span: COUNT_WIDTH.MIDDLE_WIDTH },
    // show: false,
    componentProps: {
      disabled: true,
    },
  },
  {
    field: 'hydraulicLossResult',
    label: '水力损失',
    component: 'InputNumberExpand',
    colProps: { span: COUNT_WIDTH.MIDDLE_WIDTH },
    componentProps: {
      disabled: false,
    },
  },
];
