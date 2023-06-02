import { BasicColumn } from '/@/components/Table';
import { FormSchema } from '/@/components/Table';
import { h } from 'vue';
//BasicForm
import {
  pipeMaterialOption,
  calculationFormulaOptionPressure,
  calculationContentOption,
  unitOption,
  ductileIronPipe,
  calculationFormulaOptionPressureMap,
  pipeMaterialOptionMap,
  calculationContentOptionMap,
} from '/@/utils/calculation/count';
import {
  calculateWilliamCoefficient,
  countNominalDiameter,
  pipeMaterialSwitchingPressure,
} from './utils';
import { PIPE } from './constPipe';
export const columnGravity: BasicColumn[] = [];

export const searchFormGravity: FormSchema[] = [];

export const drawerFormGravity: FormSchema[] = [];

export const columnsPressure: BasicColumn[] = [
  {
    title: '计算公式',
    dataIndex: 'calculationFormula',
    width: 220,
    customRender: ({ text }) => {
      const content = calculationFormulaOptionPressureMap[text];
      return h('span', { class: 'status' }, content);
    },
  },
  {
    title: '管道材料',
    dataIndex: 'pipeMaterial',
    width: 150,
    customRender: ({ text }) => {
      const content = pipeMaterialOptionMap[text];
      return h('span', { class: 'status' }, content);
    },
  },
  {
    title: '计算内容',
    dataIndex: 'calculationContent',
    width: 200,
    customRender: ({ text }) => {
      const content = calculationContentOptionMap[text];
      return h('span', { class: 'status' }, content);
    },
  },
  {
    title: '计算内径（mm）',
    dataIndex: 'calculateInnerDiameter',
    width: 80,
    customRender: ({ text }) => {
      return h('span', { class: 'status' }, text);
    },
  },
  {
    title: '流速(m/s)',
    dataIndex: 'velocityOfFlow',
    width: 80,
  },
  {
    title: '流量（L/s|m³/h）',
    dataIndex: 'rateOfFlow',
    width: 80,
    customRender: ({ text, record }) => {
      let unit = 'L/s';
      if (record.unit === 'cubicMeter') {
        unit = 'm³/h';
      }
      return h('span', { class: 'status' }, text + unit);
    },
  },
  {
    title: '水力坡降',
    dataIndex: 'hydraulicGradient',
    width: 80,
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
  { field: 'pressureID', label: '压力ID', show: false, component: 'Input' },
  {
    field: 'calculationFormula',
    label: '计算公式',
    required: true,
    component: 'Select',
    colProps: { span: PIPE.CONTENT_WIDTH },
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
    colProps: { span: PIPE.CONTENT_WIDTH },
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
      const mes = values.coughnessCoefficientRecommend ? values.coughnessCoefficientRecommend : '';
      const message = '海曾-威廉系数推荐值：' + mes;
      return message;
    },
    colProps: { span: PIPE.CONTENT_WIDTH },
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
    colProps: { span: PIPE.CONTENT_WIDTH },
    dynamicDisabled: true,
    show: false,
  },
  {
    field: 'calculationContent',
    label: '计算内容',
    required: true,
    component: 'Select',
    colProps: { span: PIPE.CONTENT_WIDTH },
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
    component: 'InputNumberExpand',
    dynamicDisabled: true,
    colProps: { span: PIPE.INPUT_WIDTH },
  },
  {
    field: 'nominalDiameter',
    label: '推荐公称直径DN(mm)',
    component: 'Select',
    dynamicDisabled: true,
    colProps: { span: PIPE.INPUT_WIDTH },
    componentProps: () => {
      return {
        showSearch: true,
        optionFilterProp: 'label',
        placeholder: ' ',
        options: ductileIronPipe,
      };
    },
  },
  {
    field: 'rateOfFlow',
    label: '流量(m³/h)',
    required: true,
    component: 'InputNumberExpand',
    colProps: { span: PIPE.INPUT_WIDTH },
  },
  {
    field: 'unit',
    label: '单位',
    required: true,
    component: 'Select',
    colProps: { span: PIPE.INPUT_WIDTH },
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
    defaultValue: 1,
    required: true,
    component: 'InputNumberExpand',
    colProps: { span: PIPE.INPUT_WIDTH },
  },
  {
    field: 'hydraulicGradient',
    label: '水力坡降',
    dynamicDisabled: true,
    component: 'InputNumberExpand',
    colProps: { span: PIPE.INPUT_WIDTH },
  },
  {
    field: 'pipeLength',
    label: '管道长度(m)',
    required: true,
    component: 'InputNumberExpand',
    defaultValue: 1000,
    colProps: { span: PIPE.INPUT_WIDTH },
  },
  {
    field: 'percentageLocalResistanceLoss',
    label: '水头损失率',
    component: 'InputNumberExpand',
    colProps: { span: PIPE.INPUT_WIDTH },
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
    colProps: { span: PIPE.INPUT_WIDTH },
    componentProps: {
      disabled: true,
    },
  },
  {
    field: 'hydraulicGradientResult',
    label: '水力坡降',
    component: 'InputNumberExpand',
    colProps: { span: PIPE.INPUT_WIDTH },
    componentProps: {
      disabled: true,
    },
  },
  {
    field: 'caliberResult',
    label: '管径',
    component: 'InputNumberExpand',
    colProps: { span: PIPE.INPUT_WIDTH },
    componentProps: {
      disabled: true,
    },
  },
  {
    field: 'velocityOfFlowResult',
    label: '流速(m/s)',
    component: 'InputNumberExpand',
    colProps: { span: PIPE.INPUT_WIDTH },
    componentProps: {
      disabled: true,
    },
  },
  {
    field: 'rateOfFlowResult',
    label: '流量(m³/h)',
    component: 'InputNumberExpand',
    colProps: { span: PIPE.INPUT_WIDTH },
    componentProps: {
      disabled: true,
    },
  },
  {
    field: 'lossAlongTheWayResult',
    label: '沿程损失',
    component: 'InputNumberExpand',
    colProps: { span: PIPE.INPUT_WIDTH },
    componentProps: {
      disabled: true,
    },
  },
  {
    field: 'LocalResistanceLossResult',
    label: '局部阻力损失',
    component: 'InputNumberExpand',
    colProps: { span: PIPE.INPUT_WIDTH },
    componentProps: {
      disabled: true,
    },
  },
  {
    field: 'hydraulicLossResult',
    label: '水力损失',
    component: 'InputNumberExpand',
    colProps: { span: PIPE.INPUT_WIDTH },
    componentProps: {
      disabled: true,
    },
  },
];
