import { getStationTypeList } from '../api/http';
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
    //   if (record.projectTypeName) {
    //     return record.projectTypeName + '类型';
    //   }
    // },
  },
  {
    title: '车站类型',
    dataIndex: 'stationTypeValue',
  },
];
//用水项目  waterUseProject 用水明细 waterProject  单位 unit 数量(近期) recentQuantity 数量(远期) forwardQuantity
export const waterItemColumns: BasicColumn[] = [
  {
    title: '用水类别',
    dataIndex: 'classificationName',
  },
  {
    title: '用水项目',
    dataIndex: 'waterProject',
  },
  {
    title: '单位',
    dataIndex: 'unit',
  },
  {
    title: '数量(近期)',
    dataIndex: 'recentQuantity',
    helpMessage: '编辑之后请点击小√',
    edit: true,
    // editable: true,
  },
  // {
  //   title: '数量(远期)',
  //   dataIndex: 'forwardQuantity',
  //   helpMessage: '支持Tab键跳的下一项',
  //   edit: true,
  //   editable: true,
  // },
];

export const searchFormSchema: FormSchema[] = [
  {
    field: 'projectID',
    label: '项目名称',
    component: 'Input',
    colProps: { span: 8 },
    dynamicDisabled: true,
  },
  {
    field: 'likeQuery',
    label: '车站名称',
    component: 'Input',
    colProps: { span: 8 },
  },
];

//进行展示的
export const formSchema: FormSchema[] = [
  {
    field: 'stationName',
    label: '车站名称',
    component: 'Input',
    colProps: { span: 12 },
    dynamicDisabled: true,
  },
  {
    field: 'stationTypeValue',
    label: '车站类型',
    component: 'Input',
    colProps: { span: 12 },
    dynamicDisabled: true,
  },
];
//进行新增和编辑操作的
export const formSchemaStation: FormSchema[] = [
  {
    field: 'stationName',
    label: '车站名称',
    component: 'Input',
    required: true,
    colProps: { span: 24 },
  },
  {
    field: 'stationType',
    label: '车站类型：',
    component: 'ApiSelect',
    required: true,
    colProps: { span: 24 },
    // componentProps: {
    //   min: 0,
    //   style: { width: '100%' },
    //   options: STATION_TYPE_OPTIONS,
    // },
    componentProps: {
      api: getStationTypeList,
      params: {
        projectType: 'OrdinaryRailway',
      },
      // resultField: 'list2',
      // // use name as label
      // labelField: 'name',
      // // use id as value
      // valueField: 'id',
      // not request untill to select
      immediate: true,
      onChange: (e, v) => {
        console.log('ApiSelect====>:', e, v);
      },
      // atfer request callback
      onOptionsChange: (options) => {
        console.log('get options', options.length, options);
      },
    },
  },
  {
    field: 'projectID',
    label: '项目id',
    show: false,
    component: 'Input',
    colProps: { span: 24 },
  },
  {
    field: 'projectName',
    label: '项目名称',
    component: 'Input',
    show: false,
    colProps: { span: 24 },
  },
  {
    field: 'stationID',
    label: '车站ID',
    show: false,
    component: 'Input',
    colProps: { span: 24 },
  },
];

export const transformTableColumns = [
  {
    dataIndex: 'classificationName',
    title: '用水类别',
  },
  {
    dataIndex: 'waterProject',
    title: '用水项目',
  },
  {
    dataIndex: 'unit',
    title: '单位',
  },
];
export interface TransformData {
  key: string;
  classificationName: string;
  waterProjectName: string;
  unit: string;
}
