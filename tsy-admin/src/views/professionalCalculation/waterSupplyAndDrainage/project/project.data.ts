import { BasicColumn } from '/@/components/Table';
import { FormSchema } from '/@/components/Table';

export const columns: BasicColumn[] = [
  {
    title: '项目名称',
    dataIndex: 'waterSupplyAndDrainageProject',
    width: 200,
  },
  {
    title: '项目类型',
    dataIndex: 'waterSupplyAndDrainageType',
    width: 180,
    customRender: ({ record }) => {
      if (record.waterSupplyAndDrainageType) {
        return record.waterSupplyAndDrainageType + '类型';
      }
    },
  },
  {
    title: '数据来源',
    dataIndex: 'waterSupplyAndDrainageDataSource',
    width: 50,
  },
];

export const searchFormSchema: FormSchema[] = [
  {
    field: 'waterSupplyAndDrainageProject',
    label: '项目名称',
    component: 'Input',
    colProps: { span: 8 },
  },
];

export const formSchema: FormSchema[] = [
  {
    field: 'waterSupplyAndDrainageProject',
    label: '项目名称',
    required: true,
    component: 'Input',
  },
  {
    field: 'waterSupplyAndDrainageType',
    label: '项目类型',
    component: 'RadioButtonGroup',
    defaultValue: '0',
    componentProps: {
      options: [
        { label: '高铁', value: '0' },
        { label: '普铁', value: '1' },
      ],
    },
  },
  {
    field: 'projectID',
    label: '项目名称',
    show: false,
    component: 'Input',
  },
  {
    field: 'editorID',
    label: '项目名称',
    show: false,
    component: 'Input',
  },
];
