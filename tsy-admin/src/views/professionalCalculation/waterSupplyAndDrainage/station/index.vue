<template>
  <div>
    <BasicTable @register="registerTable">
      <template #toolbar>
        <a-button type="primary" @click="handleCreate"> 新增车站 </a-button>
        <a-button preIcon="ant-design:rollback-outlined" @click="handleCalculate">
          返回计算结果
        </a-button>
        <a-button preIcon="ant-design:rollback-outlined" @click="handleBack"> 返回项目 </a-button>
      </template>
      <template #action="{ record }">
        <TableAction :actions="creatAction(record)" />
      </template>
    </BasicTable>
    <StationDrawer @register="registerDrawer" @success="handleSuccess" />
    <ModalStation @register="registerStation" @success="handleSuccess" />
    <ModalCopy @register="registerCopy" @success="handleSuccess" />
    <ModalStationEditor @register="registerEditor" @success="handleSuccess" />
  </div>
</template>
<script lang="ts">
  import { defineComponent, onMounted } from 'vue';

  import { BasicTable, useTable, TableAction, ActionItem } from '/@/components/Table';

  import { useDrawer } from '/@/components/Drawer';
  import StationDrawer from './StationDrawer.vue';

  import { columns, searchFormSchema } from './station.data';
  import { deleteStation, getSbuildWaterProjectData, getStationInfoList } from '../api/http';
  import { useGo } from '/@/hooks/web/usePage';
  import { getRouterQuery } from '../utilsWaterSupplyAndDrainage';
  import ModalStation from './ModalStation.vue';
  import ModalCopy from './ModalCopy.vue';
  import ModalStationEditor from './ModalStationEditor.vue';
  import { useModal } from '/@/components/Modal';
  import { waterSourceStore } from '/@/store/modules/waterInfo';
  import { message } from 'ant-design-vue';

  export default defineComponent({
    name: 'StationManagement',
    components: {
      BasicTable,
      StationDrawer,
      TableAction,
      ModalStation,
      ModalCopy,
      ModalStationEditor,
    },
    setup() {
      //用水项弹窗
      const store = waterSourceStore();
      const [registerStation, { openModal: openModalStation }] = useModal();
      const [registerCopy, { openModal: openModalCopy }] = useModal();
      const [registerEditor, { openModal: openModalEditor }] = useModal();
      const query = getRouterQuery(); //获取路由参数
      const { projectID, projectName, projectType } = query;
      const [registerDrawer, { openDrawer }] = useDrawer();
      let likeQuery = '';
      function beforeFetch(params) {
        likeQuery = params.likeQuery;
        params.projectID = Number(query.projectID);
        params.likeQuery = params.likeQuery ? params.likeQuery : '';
        params.pageIndex = params['split.page'];
        params.pageSize = params['split.size'];
        params.totalCount = 0;
        delete params['split.page'];
        delete params['split.size'];
        delete params['time'];
        return params;
      }
      const [registerTable, { reload, getForm }] = useTable({
        title: '车站列表',
        api: getStationInfoList,
        columns,
        formConfig: {
          labelWidth: 120,
          schemas: searchFormSchema(),
          autoSubmitOnEnter: true,
          showResetButton: false,
        },
        beforeFetch,
        useSearchForm: true,
        showTableSetting: true,
        bordered: true,
        showIndexColumn: true,
        actionColumn: {
          width: 200,
          title: '操作',
          dataIndex: 'action',
          slots: { customRender: 'action' },
          fixed: 'right',
        },
      });
      window.stationReload = reload;
      onMounted(() => {
        getForm().setFieldsValue({ projectID: query.projectName });
        store.waterSupplyAndDrainageProjectTypeAction(query.projectType);
      });

      function handleCreate() {
        query.type = 'add';
        query.likeQuery = likeQuery;
        openModalStation(true, query);
      }
      function handleEditStation(record: Recordable) {
        openModalEditor(true, record);
      }
      const go = useGo();
      function handleBack() {
        go('/professionalCalculation/waterSupplyAndDrainage');
      }
      function handleCalculate() {
        go({
          name: 'WaterConsumptionCalculation',
          query: {
            projectID,
            projectName,
            projectType,
          },
        });
      }
      //编辑用水项目
      function handleEdit(record: Recordable) {
        let params = {};
        params['projectID'] = Number(record.projectID);
        params['stationID'] = Number(record.stationID);
        params['stationType'] = record.stationType;
        getSbuildWaterProjectData(params).then((res) => {
          openDrawer(true, {
            res,
            isUpdate: true,
            record,
          });
        });
      }
      //复制车站
      function copyStation(record: Recordable) {
        openModalCopy(true, record);
      }

      function handleDelete(record: Recordable) {
        const { stationID } = record;
        deleteStation({ StationID: stationID }).then(() => {
          message.success('车站删除成功');
          handleSuccess();
        });
        console.log(record);
      }

      function handleSuccess() {
        reload();
      }
      function creatAction(record): ActionItem[] {
        return [
          {
            icon: 'clarity:note-edit-line',
            tooltip: '编辑车站',
            onClick: handleEditStation.bind(null, record),
          },
          {
            icon: 'ant-design:bg-colors-outlined',
            tooltip: '操作用水项目',
            onClick: handleEdit.bind(null, record),
          },
          {
            icon: 'ant-design:copy-outlined',
            tooltip: '复制车站',
            onClick: copyStation.bind(null, record),
          },
          {
            icon: 'ant-design:delete-outlined',
            tooltip: '删除车站',
            popConfirm: {
              title: '是否确认删除！',
              confirm: handleDelete.bind(null, record),
            },
          },
        ];
      }

      return {
        registerTable,
        registerDrawer,
        handleCreate,
        handleEdit,
        handleEditStation,
        handleDelete,
        handleSuccess,
        creatAction,
        handleBack,
        handleCalculate,
        registerStation,
        copyStation,
        registerCopy,
        registerEditor,
      };
    },
  });
</script>
