import { BasicColumn } from '/@/components/Table';
import { FormSchema } from '/@/components/Table';
import { h, reactive } from 'vue';
//BasicForm
import {
  pipeMaterialOption,
  calculationFormulaOptionPressure,
  calculationFormulaOption,
  calculationContentOption,
  unitOption,
  flowConditionsOption,
  pipeShapeOption,
} from '/@/utils/calculation/count';
import {
  calculateWilliamCoefficient,
  countNominalDiameter,
  pipeMaterialSwitchingGravity,
  pipeMaterialSwitchingPressure,
} from './utils';
export const columnGravity: BasicColumn[] = [
  {
    title: '计算公式',
    dataIndex: 'calculationFormula',
    width: 200,
  },
  {
    title: '管道材料',
    dataIndex: 'pipeMaterial',
    width: 180,
    slots: { customRender: 'pipeMaterial' },
  },
  {
    title: '计算内容',
    dataIndex: 'calculationContent',
    width: 200,
  },
  {
    title: '计算内径（mm）',
    dataIndex: 'calculateInnerDiameter',
    width: 120,
    customRender: () => {
      return h('span', { class: 'status' }, '100mm');
    },
  },
  {
    title: '流速',
    dataIndex: 'velocityOfFlow',
    width: 180,
  },
  {
    title: '流量（L/s）',
    dataIndex: 'rateOfFlow',
  },
  {
    title: '水力坡度',
    dataIndex: 'hydraulicGradient',
  },
  {
    title: '地沟高（mm）',
    dataIndex: 'trenchHeight',
  },
  {
    title: '沟宽（mm）',
    dataIndex: 'ditchWidth',
  },
];

export const searchFormGravity: FormSchema[] = [
  {
    field: 'pipeMaterial',
    label: '管道材料',
    helpMessage: (renderCallbackParams) => {
      console.log('renderCallbackParams', renderCallbackParams);
      return '2';
    },
    component: 'Select',
    componentProps: {
      options: pipeMaterialOption,
    },
    colProps: { span: 8 },
  },
  {
    field: 'flowConditions',
    label: '水流条件',
    component: 'Select',
    componentProps: {
      options: [
        { label: '满流', value: '0' },
        { label: '非满流', value: '1' },
      ],
    },
    colProps: { span: 8 },
  },
];

export const drawerFormGravity: FormSchema[] = [
  {
    field: 'calculationFormula',
    label: '计算公式',
    required: true,
    component: 'RadioGroup',
    colProps: { span: 24 },
    defaultValue: 'gs3',
    componentProps: {
      options: calculationFormulaOption,
    },
  },
  {
    field: 'pipeMaterial',
    label: '管道材料',
    required: true,
    component: 'Select',
    colProps: { span: 12 },
    componentProps: ({ formModel, formActionType }) => {
      return {
        options: pipeMaterialOption,
        placeholder: '请选择材料',
        onChange: (e: any) => {
          // console.log(e)
          const { updateSchema } = formActionType;
          countNominalDiameter(e, updateSchema, formModel);
        },
      };
    },
  },

  {
    field: 'calculationContent',
    label: '计算内容',
    required: true,
    component: 'Select',
    colProps: { span: 12 },
    componentProps: ({ formModel, formActionType }) => {
      return {
        placeholder: '请选择内容',
        options: calculationContentOption,
        disabled: false,
        onChange: async (e: any) => {
          const target = e;
          const { updateSchema, setProps } = formActionType;
          pipeMaterialSwitchingGravity(updateSchema, target);
        },
      };
    },
  },
  {
    field: 'pipeShape',
    label: '管道形状',
    required: true,
    component: 'RadioGroup',
    colProps: { span: 12 },
    componentProps: {
      options: pipeShapeOption,
    },
  },
  {
    field: 'flowConditions',
    label: '水流条件',
    required: true,
    component: 'RadioGroup',
    colProps: { span: 12 },
    componentProps: {
      options: flowConditionsOption,
    },
  },

  {
    field: 'rateOfFlow',
    label: '流量(L/s)',
    required: true,
    component: 'InputNumberExpand',
    defaultValue: 20,
    colProps: { span: 6 },
  },
  {
    field: 'unit',
    label: '单位',
    required: true,
    component: 'Select',
    colProps: { span: 6 },
    componentProps: {
      options: unitOption,
    },
  },
  {
    field: 'coughnessCoefficient',
    label: '阻力系数',
    required: true,
    component: 'InputNumberExpand',
    colProps: { span: 12 },
  },
  {
    field: 'calculateInnerDiameter',
    label: '计算内径(mm)',
    required: true,
    component: 'InputNumberExpand',
    colProps: { span: 12 },
  },
  {
    field: 'nominalDiameter',
    label: '公称直径',
    component: 'Select',
    colProps: { span: 12 },
    componentProps: () => {
      return {
        placeholder: '请选择内容',
        options: [],
        disabled: false,
      };
    },
  },

  {
    field: 'velocityOfFlow',
    label: '流速（m/s）',
    required: true,
    component: 'InputNumberExpand',
    colProps: { span: 12 },
  },
  {
    field: 'hydraulicGradient',
    label: '水力坡度',
    required: true,
    component: 'InputNumberExpand',
    colProps: { span: 12 },
  },
  {
    field: 'trenchHeight',
    label: '地沟高（mm）',
    required: true,
    component: 'InputNumberExpand',
    colProps: { span: 12 },
  },
  {
    field: 'wideHeightRatio',
    label: '宽高比',
    component: 'InputNumberExpand',
    colProps: { span: 12 },
  },
  {
    field: 'maximumDitchHeight',
    label: '最大沟高（mm）',
    component: 'InputNumberExpand',
    colProps: { span: 12 },
  },
  {
    field: 'maximumPipeDiameter',
    label: '最大管径',
    component: 'InputNumberExpand',
    colProps: { span: 12 },
  },
  { label: '计算结果', field: 'field3', component: 'Divider', helpMessage: '计算结果' },
  {
    field: 'rateOfFlowResult',
    label: '流量(L/s)',
    component: 'InputNumberExpand',
    colProps: { span: 6 },
    componentProps: {
      disabled: true,
    },
  },
  {
    field: 'caliberResult',
    label: '管径',
    component: 'InputNumberExpand',
    colProps: { span: 6 },
    componentProps: {
      disabled: true,
    },
  },
  {
    field: 'velocityOfFlowResult',
    label: '流速（m/s）',
    component: 'InputNumberExpand',
    colProps: { span: 6 },
    componentProps: {
      disabled: true,
    },
  },
  {
    field: 'hydraulicGradientResult',
    label: '水力坡度',
    component: 'InputNumberExpand',
    colProps: { span: 6 },
    componentProps: {
      disabled: true,
    },
  },
  {
    field: 'fullnessResult',
    label: '充满度',
    component: 'InputNumberExpand',
    colProps: { span: 6 },
    componentProps: {
      disabled: true,
    },
  },
  {
    field: 'ditchWidthResult',
    label: '沟宽（mm）',
    component: 'InputNumberExpand',
    colProps: { span: 6 },
    componentProps: {
      disabled: true,
    },
  },
];

export const columnsPressure: BasicColumn[] = [
  {
    title: '计算公式',
    dataIndex: 'calculationFormula',
    width: 200,
  },
  {
    title: '管道材料',
    dataIndex: 'pipeMaterial',
    width: 180,
  },
  {
    title: '计算内容',
    dataIndex: 'calculationContent',
    width: 200,
  },
  {
    title: '计算内径（mm）',
    dataIndex: 'calculateInnerDiameter',
    width: 120,
    customRender: () => {
      return h('span', { class: 'status' }, '100mm');
    },
  },
  {
    title: '流速',
    dataIndex: 'velocityOfFlow',
    width: 180,
  },
  {
    title: '流量（L/s）',
    dataIndex: 'rateOfFlow',
  },
  {
    title: '水力坡度',
    dataIndex: 'hydraulicGradient',
  },
];

export const searchFormPressure: FormSchema[] = [
  {
    field: 'pipeMaterial',
    label: '管道材料',
    component: 'Select',
    componentProps: {
      options: pipeMaterialOption,
    },
    colProps: { span: 8 },
  },
  {
    field: 'flowConditions',
    label: '水流条件',
    component: 'Select',
    componentProps: {
      options: [
        { label: '满流', value: '0' },
        { label: '非满流', value: '1' },
      ],
    },
    colProps: { span: 8 },
  },
];

export const drawerFormPressure: FormSchema[] = [
  {
    field: 'calculationFormula',
    label: '计算公式',
    required: true,
    component: 'Select',
    colProps: { span: 24 },
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
    colProps: { span: 12 },
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
    field: 'coughnessCoefficient',
    label: '海曾-威廉系数',
    component: 'InputNumberExpand',
    show: true,
    helpMessage: ({ values }) => {
      const mes = values.coughnessCoefficientRecommend
        ? values.coughnessCoefficientRecommend
        : '暂无';
      const message = '海曾-威廉系数推荐值：' + mes;
      return message;
    },
    colProps: { span: 12 },
    dynamicRules: ({ values }) => {
      return [
        {
          required: true,
          validator: (_, value) => {
            debugger;
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
    colProps: { span: 12 },
    dynamicDisabled: true,
    show: false,
  },
  {
    field: 'calculationContent',
    label: '计算内容',
    required: true,
    component: 'Select',
    colProps: { span: 12 },
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
    field: 'calculateInnerDiameter',
    label: '计算内径(mm)',
    required: true,
    component: 'InputNumberExpand',
    colProps: { span: 6 },
  },
  {
    field: 'nominalDiameter',
    label: '公称直径',
    component: 'Select',
    colProps: { span: 6 },
    componentProps: () => {
      return {
        placeholder: '请选择内容',
        options: [],
        disabled: false,
      };
    },
  },
  {
    field: 'rateOfFlow',
    label: '流量(m³/h)',
    required: true,
    component: 'InputNumberExpand',
    colProps: { span: 6 },
  },
  {
    field: 'unit',
    label: '单位',
    required: true,
    component: 'Select',
    colProps: { span: 6 },
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
    field: 'velocityOfFlow',
    label: '流速(m/s)',
    required: true,
    component: 'InputNumberExpand',
    colProps: { span: 12 },
  },
  {
    field: 'hydraulicGradient',
    label: '水力坡度',
    required: true,
    component: 'InputNumberExpand',
    colProps: { span: 12 },
  },
  {
    field: 'pipeLength',
    label: '管道长度(m)',
    required: true,
    component: 'InputNumberExpand',
    defaultValue: 1000,
    colProps: { span: 12 },
  },
  {
    field: 'percentageLocalResistanceLoss',
    label: '水头损失率',
    component: 'InputNumberExpand',
    colProps: { span: 12 },
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
    colProps: { span: 6 },
    componentProps: {
      disabled: true,
    },
  },
  {
    field: 'hydraulicGradientResult',
    label: '水力坡度',
    component: 'InputNumberExpand',
    colProps: { span: 6 },
    componentProps: {
      disabled: true,
    },
  },
  {
    field: 'caliberResult',
    label: '管径',
    component: 'InputNumberExpand',
    colProps: { span: 6 },
    componentProps: {
      disabled: true,
    },
  },
  {
    field: 'velocityOfFlowResult',
    label: '流速(m/s)',
    component: 'InputNumberExpand',
    colProps: { span: 6 },
    componentProps: {
      disabled: true,
    },
  },
  {
    field: 'rateOfFlowResult',
    label: '流量(m³/h)',
    component: 'InputNumberExpand',
    colProps: { span: 6 },
    componentProps: {
      disabled: true,
    },
  },
  {
    field: 'lossAlongTheWayResult',
    label: '沿程损失',
    component: 'InputNumberExpand',
    colProps: { span: 6 },
    componentProps: {
      disabled: true,
    },
  },
  {
    field: 'LocalResistanceLossResult',
    label: '局部阻力损失',
    component: 'InputNumberExpand',
    colProps: { span: 6 },
    componentProps: {
      disabled: true,
    },
  },
  {
    field: 'hydraulicLossResult',
    label: '水力损失',
    component: 'InputNumberExpand',
    colProps: { span: 6 },
    componentProps: {
      disabled: true,
    },
  },
];
