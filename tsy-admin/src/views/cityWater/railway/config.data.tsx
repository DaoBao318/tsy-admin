import { getList, getRecordInfo } from './api/http';
import { DrawerFormMode } from '/@/components-business/XList/v-2.0';
import { typeHRchemas, typeZJchemas } from './dataConfig/stationType1.data';
import { PROJECT_OPTIONS, STATION_TYPE_OPTIONS } from './dataConfig/constant';
import { FormSchema } from '/@/components/Form';
import { BasicColumn } from '/@/components/Table';
import { waterSourceStore } from '/@/store/modules/waterInfo';

export const LAYERS = {
  CHANGE_STATION_TYPE: '0', // 变更车站的modal弹窗
  PASSING_STATION: '1', // 会让站
  MIDDLE_STATION: '2', // 中间站
  OVERTAKING_STATION: '3', // 越行站
  HIGNSPEED_STATION: '4', //高铁站
};
const store = waterSourceStore();
// 表单搜索框配置
export const searchFormSchema: FormSchema[] = [
  {
    field: 'project_type',
    label: '切换项目:',
    component: 'Select',
    colProps: { span: 3, style: { minWidth: '300px' } },
    componentProps: () => {
      return {
        // options: PROJECT_OPTIONS,
        options: store.allRewardSelectOptions,
        immediate: true,
        // showSearch: true,
        placeholder: '请选择项目',
      };
    },
  },
];

// column表单列表
const columns: BasicColumn[] = [
  // {
  //   title: 'id',
  //   dataIndex: 'id',
  //   width: 60,
  // },
  {
    title: '车站名称',
    dataIndex: 'station',
    width: 120,
  },
  {
    title: '车站类型',
    dataIndex: 'station_type',
    slots: { customRender: 'stationType' },
  },
  {
    title: '昼夜最大用水量（m3）',
    dataIndex: 'max_consumption_water',
  },
  {
    title: '昼夜最大排水量（m3）',
    dataIndex: 'max_displacement_water',
  },
];

// 设置column操作栏
function createActionsColumns(record, context) {
  function getStationType() {
    let typeStation = '1';
    if (record.station_type === '1') {
      typeStation = LAYERS.PASSING_STATION;
    } else if (record.station_type === '2') {
      typeStation = record.station_type;
    } else {
      typeStation = '2';
    }
    return typeStation;
  }
  async function handlerEdit() {
    // 单独根据接口请求具体数据，或者是直接在record中读取
    // const data = await getRecordInfo(record.id);
    const layerName = getStationType();
    const data = await getRecordInfo({ id: layerName });
    context.layers[layerName].open(true, data, {
      mode: DrawerFormMode.EDIT,
      // title: 'wbb123',
    });
  }

  async function viewDetail() {
    // 判断车站类型，打开不同的layer；假使是会让站
    const layerName = getStationType();
    // 单独根据接口请求具体数据，或者是直接在record中读取
    const data = await getRecordInfo(record.id);
    context.layers[layerName].open(true, data, {
      mode: DrawerFormMode.VIEW,
    });
  }
  function handlerExport() {
    console.log('导出当前');
  }
  return [
    {
      icon: 'clarity:note-edit-line',
      label: '编辑',
      onClick: handlerEdit,
    },
    {
      icon: 'bx:comment-detail',
      label: '详情',
      onClick: viewDetail,
      color: 'success',
    },
    {
      icon: 'mdi:export',
      label: '导出',
      onClick: handlerExport,
      color: 'error',
    },
  ];
}

//===================== -useXListOptions- ========================
export const useXListOptions = {
  useTableOptions: {
    title: '昼夜最大用水量排水量列表',
    api: getList,
    columns,
    createActions: (record, context) => createActionsColumns(record, context),
    pagination: { pageSize: 10 },
    showIndexColumn: true,
    schemas: searchFormSchema,
  },
  layers: [
    {
      name: LAYERS.CHANGE_STATION_TYPE,
      component: 'ModalForm',
      componentProps: {
        width: '600px',
        title: '变更车站类型',
      },
      useFormOptions: {
        labelWidth: 100,
        centered: true,
        schemas: [
          {
            field: 'station_type',
            label: '车站类型：',
            component: 'Select',
            required: true,
            colProps: { span: 22 },
            componentProps: {
              min: 0,
              style: { width: '100%' },
              options: STATION_TYPE_OPTIONS,
            },
          },
          {
            field: 'id',
            label: '车站id：',
            component: 'InputNumber',
            show: true,
          },
          {
            field: 'edit_tip',
            label: '',
            labelWith: 0,
            component: 'Input',
            slot: 'EditTip',
          },
        ],
      },
    },
    {
      name: LAYERS.PASSING_STATION,
      component: 'DrawerForm',
      componentProps: {
        width: '90%',
        title: '会让站',
      },
      useFormOptions: {
        labelWidth: 140,
        schemas: typeHRchemas,
      },
    },
    {
      name: LAYERS.MIDDLE_STATION,
      component: 'DrawerForm',
      componentProps: {
        width: '90%',
        title: '中间站',
      },
      useFormOptions: {
        labelWidth: 140,
        schemas: typeZJchemas,
      },
    },
  ],
};
