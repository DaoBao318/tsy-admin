import { BasicColumn } from '/@/components/Table';
import { FormSchema } from '/@/components/Table';
import { h } from 'vue';
import { Switch } from 'ant-design-vue';
import { setRoleStatus } from '/@/api/demo/system';
import { useMessage } from '/@/hooks/web/useMessage';
//BasicForm
import {
  pipeMaterialOption,
  calculationFormulaOption,
  calculationContentOption,
  unitOption,
  nominalDiameterOption,
} from '/@/utils/calculation/count';

export const columns: BasicColumn[] = [
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
  {
    title: '地沟高',
    dataIndex: 'trenchHeight',
  },
  {
    title: '沟宽',
    dataIndex: 'ditchWidth',
  },
];

export const searchFormSchema: FormSchema[] = [
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
    field: 'roleName',
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

export const formSchema: FormSchema[] = [
  {
    field: 'calculationFormula',
    label: '计算公式',
    required: true,
    component: 'Select',
    colProps: { span: 24 },
    componentProps: {
      options: calculationFormulaOption,
    },
  },
  {
    field: 'waterTemperature',
    label: '水温',
    required: true,
    component: 'Input',
    colProps: { span: 12 },
  },
  {
    field: 'pipeMaterial',
    label: '管道材料',
    required: true,
    component: 'Select',
    colProps: { span: 12 },
    componentProps: {
      options: pipeMaterialOption,
    },
  },
  {
    field: 'coughnessCoefficient',
    label: '粗糙系数',
    required: true,
    component: 'Input',
    colProps: { span: 12 },
  },
  {
    field: 'calculationContent',
    label: '计算内容',
    required: true,
    component: 'Select',
    colProps: { span: 12 },
    componentProps: {
      options: calculationContentOption,
    },
  },
  {
    field: 'rateOfFlow',
    label: '流量',
    required: true,
    component: 'Input',
    colProps: { span: 12 },
  },
  {
    field: 'unit',
    label: '单位',
    required: true,
    component: 'Select',
    colProps: { span: 12 },
    componentProps: {
      options: unitOption,
    },
  },
  {
    field: 'calculateInnerDiameter',
    label: '计算内径',
    required: true,
    component: 'Input',
    colProps: { span: 12 },
  },
  {
    field: 'nominalDiameter',
    label: '公称直径',
    required: true,
    component: 'Select',
    colProps: { span: 12 },
    componentProps: {
      options: nominalDiameterOption,
    },
  },
  {
    field: 'velocityOfFlow',
    label: '流速',
    required: true,
    component: 'Input',
    colProps: { span: 12 },
  },
  {
    field: 'hydraulicGradient',
    label: '水力坡降',
    required: true,
    component: 'Input',
    colProps: { span: 12 },
  },
  {
    field: 'pipeLength',
    label: '管道长度',
    required: true,
    component: 'Input',
    colProps: { span: 12 },
  },
  {
    field: 'pipeLength',
    label: '管道长度',
    component: 'Input',
    colProps: { span: 6 },
    componentProps: {
      disabled: true,
    },
  },
  {
    field: 'hydraulicGradient',
    label: '水力坡降',
    component: 'Input',
    colProps: { span: 6 },
    componentProps: {
      disabled: true,
    },
  },
  {
    field: 'caliber',
    label: '管径',
    component: 'Input',
    colProps: { span: 6 },
    componentProps: {
      disabled: true,
    },
  },
  {
    field: 'velocityOfFlow',
    label: '流速',
    component: 'Input',
    colProps: { span: 6 },
    componentProps: {
      disabled: true,
    },
  },
  {
    field: 'lossAlongTheWay',
    label: '沿程损失',
    component: 'Input',
    colProps: { span: 6 },
    componentProps: {
      disabled: true,
    },
  },
  {
    field: 'LocalResistanceLoss',
    label: '局部阻力损失',
    component: 'Input',
    colProps: { span: 6 },
    componentProps: {
      disabled: true,
    },
  },
  {
    field: 'hydraulicLoss',
    label: '水力损失',
    component: 'Input',
    colProps: { span: 6 },
    componentProps: {
      disabled: true,
    },
  },
];
