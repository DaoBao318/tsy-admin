import { BasicColumn } from '/@/components/Table';
import { FormSchema } from '/@/components/Table';

export const columns: BasicColumn[] = [
  {
    title: '项目名称',
    dataIndex: 'projectName',
  },
  {
    title: '车站名称',
    dataIndex: 'stationName',
    // customRender: ({ record }) => {
    //   if (record.waterSupplyAndDrainageType) {
    //     return record.waterSupplyAndDrainageType + '类型';
    //   }
    // },
  },
  {
    title: '车站类型',
    dataIndex: 'stationTypeValue',
  },
];

export const searchFormSchema: FormSchema[] = [
  {
    field: 'stationName',
    label: '车站名称',
    component: 'Input',
    colProps: { span: 8 },
  },
];

export const formSchema: FormSchema[] = [
  {
    field: 'stationName',
    label: '车站名称',
    required: true,
    component: 'Input',
  },
  {
    field: 'waterSupplyAndDrainageType',
    label: '车站类型',
    component: 'Select',
    defaultValue: '01',
    componentProps: {
      options: [
        { value: '01', label: '普铁-区段站' },
        { value: '02', label: '普铁-中间站' },
        { value: '03', label: '普铁-会让站、越行站' },
        { value: '04', label: '普铁-牵引变电所、线路所、警务区' },
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
