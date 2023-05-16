import {
  getStationInfoList,
  getRecordInfo,
  getStationTypeList,
  exportExcel,
  updateStationType,
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
  PASSENGER_AIRCRAFT_TURNAROUND_SECTION,
} from './dataConfig/stationType1.data';
import { FormSchema } from '/@/components/Form';
import { BasicColumn } from '/@/components/Table';
import { waterSourceStore } from '/@/store/modules/waterInfo';
import { STATION_WIDTH } from './dataConfig/constant';

export const LAYERS = {
  CHANGE_STATION_TYPE: '0', // 变更车站的modal弹窗
  ORDINARY_RAILWAY_SECTION_STATION: '01', // 普铁区段站
  ORDINARY_RAILWAY_INTERMEDIATE_STATION_OF: '02', // 普铁-中间站
  ORDINARY_RAILWAY_WILL_PASS_OVER_THE_STATION: '03', // 普铁-会让站、越行站
  PASSENGER_AIRCRAFT_TURNAROUND_SECTION: '09', // 普铁-会让站、越行站
  ORDINARY_RAILWAY_LINE_POLICE_AREA_ALONG: '04', // 普铁-牵引变电所、线路所、警务区
  HIGH_SPEED_RAILWAY_INTERMEDIATE_STATION: '05', // 高铁-中间站
  HIGH_SPEED_TRAIN_DEPOT: '06', // 高铁-动车段
  HIGH_SPEED_LARGE_STATIONS: '07', // 高铁-大型车站
};
const store = waterSourceStore();
// 表单搜索框配置

export const searchFormSchema: FormSchema[] = [
  {
    field: 'projectID',
    label: '项目名称:',
    component: 'Input',
    dynamicDisabled: true,
    colProps: { span: 8 },
  },
  {
    field: 'likeQuery',
    label: '车站名称:',
    component: 'Input',
    colProps: { span: 8 },
    componentProps: () => {
      return {
        onChange: () => {
          setTimeout(() => {
            window.contextLoad.value.table.reload();
          }, 10);
        },
      };
    },
  },
];

// column表单列表
const columns: BasicColumn[] = [
  {
    title: '车站名称',
    dataIndex: 'stationName',
  },
  {
    title: '车站类型',
    dataIndex: 'stationType',
    width: 240,
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
      computeID: record.computeID,
      projectID: record.projectID,
      stationID: record.stationID,
      stationType: record.stationType,
    });
    store.waterSupplyAndDrainageDetailsLoadingAction(false);
    context.layers[layerName].open(true, data, {
      mode: DrawerFormMode.EDIT,
    });
  }
  async function resetStationData() {
    const { stationType, stationID, projectID } = record;
    updateStationType({ stationType, stationID, projectID }).then(() => {
      context.table.reload();
    });
  }

  async function viewDetail() {
    // 判断车站类型，打开不同的layer；假使是会让站
    const layerName = getStationType();
    // 单独根据接口请求具体数据，或者是直接在record中读取
    store.waterSupplyAndDrainageDetailsLoadingAction(true);
    const data = await getRecordInfo({
      computeID: record.computeID, //计算id有值
      projectID: record.projectID,
      stationID: record.stationID,
      stationType: record.stationType,
    });
    store.waterSupplyAndDrainageDetailsLoadingAction(false);
    context.layers[layerName].open(true, data, {
      mode: DrawerFormMode.VIEW,
    });
    //可以使用pinia 全局状态数据 TODO
  }
  function handlerExport() {
    const arr = [];
    const {
      computeID,
      projectID,
      stationID,
      stationType,
      projectName,
      stationName,
      stationTypeValue,
    } = record;
    arr.push({ computeID, projectID, stationID, stationType });
    const exportNameObj = { projectName, stationName, stationTypeValue };
    exportExcel({ waterProjectWDtolist: arr, exportNameObj });
    console.log('导出当前');
  }
  if (!record.computeID) {
    return [
      {
        icon: 'material-symbols:add-box-outline',
        label: '新增',
        tooltip: '首次计算昼夜最大用水量和排水量',
        onClick: handlerEdit,
      },
    ];
  } else {
    return [
      {
        icon: 'clarity:note-edit-line',
        tooltip: '修改单位用水量',
        onClick: handlerEdit,
      },
      // {
      //   icon: 'bx:message-detail',
      //   label: '',
      //   tooltip: '查看详情',
      //   onClick: viewDetail,
      // },
      {
        icon: 'ant-design:retweet-outlined',
        tooltip: '删除昼夜用水量和排水量的计算结果',
        onClick: resetStationData,
      },
      {
        icon: 'mdi:export',
        tooltip: '导出计算结果',
        onClick: handlerExport,
      },
    ];
  }
}

//===================== -useXListOptions- ========================
function beforeFetch(params) {
  params.projectID = Number(window.queryParams.projectID);
  params.pageIndex = params['split.page'];
  params.pageSize = params['split.size'];
  params.likeQuery = params.likeQuery ? params.likeQuery : '';
  params.totalCount = 0;
  params.isSynchro = window.queryParams.isSynchro;
  delete params['split.page'];
  delete params['split.size'];
  delete params['time'];
  return params;
}
// const titleName = window.queryParams.projectID + ;
export const useXListOptions = {
  useTableOptions: {
    title: '昼夜最大用水量排水量列表',
    api: getStationInfoList,
    columns,
    immediate: true,
    createActions: (record, context) => createActionsColumns(record, context),
    beforeFetch,
    canResize: true,
    canColDrag: true,
    inset: false,
    // resizeHeightOffset: -10,
    // scroll: { x: 6000, y: 200 },
    pagination: { pageSize: 10 },
    showIndexColumn: true,
    clickToRowSelect: false,
    // schemas: searchFormSchema,
    formConfig: {
      labelWidth: 120,
      innerWidth: 100,
      schemas: searchFormSchema,
      alwaysShowLines: 10,
      showActionButtonGroup: true,
      layout: 'horizontal',
      autoSubmitOnEnter: true,
      showResetButton: false,
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
            componentProps: {
              api: getStationTypeList,
              params: {
                projectType: '22',
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
        width: STATION_WIDTH.DRAWER_WIDTH,
        title: '普铁-区段站',
      },
      useFormOptions: {
        labelWidth: STATION_WIDTH.COUNT_UNIFY_WIDTH,
        schemas: ORDINARY_RAILWAY_SECTION_STATION,
      },
    },
    {
      name: LAYERS.PASSENGER_AIRCRAFT_TURNAROUND_SECTION,
      component: 'DrawerForm',
      componentProps: {
        width: STATION_WIDTH.DRAWER_WIDTH,
        title: '普铁-区段站',
      },
      useFormOptions: {
        labelWidth: STATION_WIDTH.COUNT_UNIFY_WIDTH,
        schemas: PASSENGER_AIRCRAFT_TURNAROUND_SECTION,
      },
    },
    {
      name: LAYERS.ORDINARY_RAILWAY_INTERMEDIATE_STATION_OF,
      component: 'DrawerForm',
      componentProps: {
        width: STATION_WIDTH.DRAWER_WIDTH,
        title: '普铁-中间站',
      },
      useFormOptions: {
        labelWidth: STATION_WIDTH.COUNT_UNIFY_WIDTH,
        schemas: ORDINARY_RAILWAY_INTERMEDIATE_STATION_OF,
      },
    },
    {
      name: LAYERS.ORDINARY_RAILWAY_WILL_PASS_OVER_THE_STATION,
      component: 'DrawerForm',
      componentProps: {
        width: STATION_WIDTH.DRAWER_WIDTH,
        title: '普铁-会让站、越行站',
      },
      useFormOptions: {
        labelWidth: STATION_WIDTH.COUNT_UNIFY_WIDTH,
        schemas: ORDINARY_RAILWAY_WILL_PASS_OVER_THE_STATION,
      },
    },
    {
      name: LAYERS.ORDINARY_RAILWAY_LINE_POLICE_AREA_ALONG,
      component: 'DrawerForm',
      componentProps: {
        width: STATION_WIDTH.DRAWER_WIDTH,
        title: '普铁-牵引变电所、线路所、警务区',
      },
      useFormOptions: {
        labelWidth: STATION_WIDTH.COUNT_UNIFY_WIDTH,
        schemas: ORDINARY_RAILWAY_LINE_POLICE_AREA_ALONG,
      },
    },
    {
      name: LAYERS.HIGH_SPEED_RAILWAY_INTERMEDIATE_STATION,
      component: 'DrawerForm',
      componentProps: {
        width: STATION_WIDTH.DRAWER_WIDTH,
        title: '高铁-中间站',
      },
      useFormOptions: {
        labelWidth: STATION_WIDTH.COUNT_UNIFY_WIDTH,
        schemas: HIGH_SPEED_RAILWAY_INTERMEDIATE_STATION,
      },
    },
    {
      name: LAYERS.HIGH_SPEED_TRAIN_DEPOT,
      component: 'DrawerForm',
      componentProps: {
        width: STATION_WIDTH.DRAWER_WIDTH,
        title: '高铁-动车段',
      },
      useFormOptions: {
        labelWidth: STATION_WIDTH.COUNT_UNIFY_WIDTH,
        schemas: HIGH_SPEED_TRAIN_DEPOT,
      },
    },
    {
      name: LAYERS.HIGH_SPEED_LARGE_STATIONS,
      component: 'DrawerForm',
      componentProps: {
        width: STATION_WIDTH.DRAWER_WIDTH,
        title: '高铁-大型车站',
      },
      useFormOptions: {
        labelWidth: STATION_WIDTH.COUNT_UNIFY_WIDTH,
        schemas: HIGH_SPEED_LARGE_STATIONS,
      },
    },
  ],
};
