import { BasicColumn } from '/@/components/Table';
import { FormSchema } from '/@/components/Table';

export const columns: BasicColumn[] = [
  {
    title: '项目名称',
    dataIndex: 'projectName',
    width: 200,
  },
  {
    title: '项目类型',
    dataIndex: 'projectTypeName',
    width: 180,
    // customRender: ({ record }) => {
    //   if (record.projectType === 'HighSpeed') {
    //     return record.projectTypeName;
    //   } else {
    //     return record.projectTypeName;
    //   }
    // },
  },
  {
    title: '数据来源',
    dataIndex: 'isSynchroType',
    width: 50,
  },
];

export const searchFormSchema: FormSchema[] = [
  {
    field: 'likeQuery',
    label: '项目名称',
    helpMessage: '请先搜索，搜索不到会出现新增按钮',
    component: 'Input',
    colProps: { span: 8 },
    componentProps: () => {
      return {
        onChange: () => {
          setTimeout(() => {
            window.projectReload();
          }, 10);
        },
      };
    },
  },
];

export const formSchema: FormSchema[] = [
  {
    field: 'projectName',
    label: '项目名称',
    component: 'Input',
    dynamicRules: () => {
      return [
        {
          required: true,
          validator: (_, value) => {
            if (value.length > 50) {
              return Promise.reject('项目名称长度不能超过50个字符');
            }
            return Promise.resolve();
          },
        },
      ];
    },
  },
  {
    field: 'projectType',
    label: '项目类型',
    component: 'RadioButtonGroup',
    defaultValue: 'HighSpeed',
    componentProps: {
      options: [
        { label: '高铁', value: 'HighSpeed' },
        { label: '普铁', value: 'OrdinaryRailway' },
      ],
    },
  },
  {
    field: 'projectID',
    label: '项目ID',
    show: false,
    component: 'InputNumber',
  },
];
