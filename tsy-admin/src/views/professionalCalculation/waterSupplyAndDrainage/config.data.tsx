import {
  getStationInfoList,
  getProjectInformation,
  getRecordInfo,
  getStationTypeList,
} from './api/http';
import { DrawerFormMode } from '/@/components-business/XList/v-2.0';
import {
  HIGH_SPEED_LARGE_STATIONS,
  HIGH_SPEED_RAILWAY_INTERMEDIATE_STATION,
  HIGH_SPEED_TRAIN_DEPOT,
  ORDINARY_RAILWAY_INTERMEDIATE_STATION_OF,
  ORDINARY_RAILWAY_LINE_POLICE_AREA_ALONG,
  ORDINARY_RAILWAY_SECTION_STATION,
  ORDINARY_RAILWAY_WILL_PASS_OVER_THE_STATION,
} from './dataConfig/stationType1.data';
import { FormSchema } from '/@/components/Form';
import { BasicColumn } from '/@/components/Table';
import { waterSourceStore } from '/@/store/modules/waterInfo';

export const LAYERS = {
  CHANGE_STATION_TYPE: '0', // 变更车站的modal弹窗
  ORDINARY_RAILWAY_SECTION_STATION: '01', // 普铁区段站
  ORDINARY_RAILWAY_INTERMEDIATE_STATION_OF: '02', // 普铁-中间站
  ORDINARY_RAILWAY_WILL_PASS_OVER_THE_STATION: '03', // 普铁-会让站、越行站
  ORDINARY_RAILWAY_LINE_POLICE_AREA_ALONG: '04', // 普铁-牵引变电所、线路所、警务区
  HIGH_SPEED_RAILWAY_INTERMEDIATE_STATION: '05', // 高铁-中间站
  HIGH_SPEED_TRAIN_DEPOT: '06', // 高铁-动车段
  HIGH_SPEED_LARGE_STATIONS: '07', // 高铁-大型车站
};
const store = waterSourceStore();
let projectType = 'OrdinaryRailway';
// 表单搜索框配置
export const searchFormSchema: FormSchema[] = [
  {
    field: 'projectId',
    label: '切换项目:',
    component: 'ApiSelect',
    colProps: { span: 8 },
    required: true,
    componentProps: {
      api: getProjectInformation,
      params: {
        id: 1,
      },
      // resultField: 'list2',
      // // use name as label
      // labelField: 'name',
      // // use id as value
      // valueField: 'id',
      // not request untill to select
      immediate: true,
      onChange: (e, v) => {
        if (!!v) {
          projectType = v.projectType;
        } else {
          projectType = '';
        }
        console.log('ApiSelect====>:', e, v);
      },
      onOptionsChange: (options) => {
        console.log('get options', options.length, options);
      },
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
    dataIndex: 'stationName',
    width: 120,
  },
  {
    title: '车站类型',
    dataIndex: 'stationType',
    slots: { customRender: 'stationType' },
  },
  {
    title: '昼夜最大用水量（m3）',
    dataIndex: 'dnMwoMax',
  },
  {
    title: '昼夜最大排水量（m3）',
    dataIndex: 'dnDisplacementMax',
  },
];

// 设置column操作栏
function createActionsColumns(record, context) {
  function getStationType() {
    return record.stationType;
  }
  async function handlerEdit() {
    // 单独根据接口请求具体数据，或者是直接在record中读取
    // const data = await getRecordInfo(record.id);
    const layerName = getStationType();
    store.waterSupplyAndDrainageDetailsLoadingAction(true);
    const data = await getRecordInfo({
      computeId: record.computeID,
      projectId: record.projectID,
      stationID: record.stationID,
      stationType: record.stationType,
    });
    store.waterSupplyAndDrainageDetailsLoadingAction(false);
    debugger;
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
  if (!record.computeID) {
    return [
      {
        icon: 'material-symbols:add-box-outline',
        label: '新增',
        onClick: handlerEdit,
      },
    ];
  } else {
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
}

//===================== -useXListOptions- ========================
function beforeFetch(params) {
  params.pageIndex = params['split.page'];
  params.pageSize = params['split.size'];
  params.totalCount = 0;
  params.projectId = Number(params.projectId);
  delete params['split.page'];
  delete params['split.size'];
  delete params['time'];
  return params;
}

export const useXListOptions = {
  useTableOptions: {
    title: '昼夜最大用水量排水量列表',
    api: getStationInfoList,
    columns,
    immediate: false,
    createActions: (record, context) => createActionsColumns(record, context),
    beforeFetch,
    pagination: { pageSize: 10 },
    showIndexColumn: true,
    // schemas: searchFormSchema,
    formConfig: {
      labelWidth: 120,
      innerWidth: 100,
      schemas: searchFormSchema,
      alwaysShowLines: 10,
      showActionButtonGroup: true,
      layout: 'horizontal',
    },
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
            field: 'stationType',
            label: '车站类型：',
            component: 'ApiSelect',
            required: true,
            colProps: { span: 22 },
            // componentProps: {
            //   min: 0,
            //   style: { width: '100%' },
            //   options: STATION_TYPE_OPTIONS,
            // },
            componentProps: {
              api: getStationTypeList,
              params: {
                projectType,
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
            field: 'stationID',
            label: '车站id：',
            component: 'InputNumber',
            show: false,
          },
          {
            field: 'projectID',
            label: '项目id：',
            component: 'InputNumber',
            show: false,
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
      name: LAYERS.ORDINARY_RAILWAY_SECTION_STATION,
      component: 'DrawerForm',
      componentProps: {
        width: '90%',
        title: '普铁-区段站',
      },
      useFormOptions: {
        labelWidth: 140,
        schemas: ORDINARY_RAILWAY_SECTION_STATION,
      },
    },
    {
      name: LAYERS.ORDINARY_RAILWAY_INTERMEDIATE_STATION_OF,
      component: 'DrawerForm',
      componentProps: {
        width: '90%',
        title: '普铁-中间站',
      },
      useFormOptions: {
        labelWidth: 140,
        schemas: ORDINARY_RAILWAY_INTERMEDIATE_STATION_OF,
      },
    },
    {
      name: LAYERS.ORDINARY_RAILWAY_WILL_PASS_OVER_THE_STATION,
      component: 'DrawerForm',
      componentProps: {
        width: '90%',
        title: '普铁-会让站、越行站',
      },
      useFormOptions: {
        labelWidth: 140,
        schemas: ORDINARY_RAILWAY_WILL_PASS_OVER_THE_STATION,
      },
    },
    {
      name: LAYERS.ORDINARY_RAILWAY_LINE_POLICE_AREA_ALONG,
      component: 'DrawerForm',
      componentProps: {
        width: '90%',
        title: '普铁-牵引变电所、线路所、警务区',
      },
      useFormOptions: {
        labelWidth: 140,
        schemas: ORDINARY_RAILWAY_LINE_POLICE_AREA_ALONG,
      },
    },
    {
      name: LAYERS.HIGH_SPEED_RAILWAY_INTERMEDIATE_STATION,
      component: 'DrawerForm',
      componentProps: {
        width: '90%',
        title: '高铁-中间站',
      },
      useFormOptions: {
        labelWidth: 140,
        schemas: HIGH_SPEED_RAILWAY_INTERMEDIATE_STATION,
      },
    },
    {
      name: LAYERS.HIGH_SPEED_TRAIN_DEPOT,
      component: 'DrawerForm',
      componentProps: {
        width: '90%',
        title: '高铁-动车段',
      },
      useFormOptions: {
        labelWidth: 140,
        schemas: HIGH_SPEED_TRAIN_DEPOT,
      },
    },
    {
      name: LAYERS.HIGH_SPEED_LARGE_STATIONS,
      component: 'DrawerForm',
      componentProps: {
        width: '90%',
        title: '高铁-大型车站',
      },
      useFormOptions: {
        labelWidth: 140,
        schemas: HIGH_SPEED_LARGE_STATIONS,
      },
    },
  ],
};
