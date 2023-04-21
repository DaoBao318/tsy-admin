<template>
  <div>
    <BasicTable @register="registerTable">
      <template #toolbar>
        <a-button preIcon="ant-design:rollback-outlined" @click="handleBack"> 返回 </a-button>
        <a-button preIcon="ant-design:send-outlined" @click="handleCalculate">
          用水量计算
        </a-button>
        <a-button type="primary" @click="handleCreate"> 新增车站 </a-button>
      </template>
      <template #action="{ record }">
        <TableAction :actions="creatAction(record)" />
      </template>
    </BasicTable>
    <StationDrawer @register="registerDrawer" @success="handleSuccess" />
    <ModalStation @register="registerStation" @success="handleSuccess" />
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
  import { useModal } from '/@/components/Modal';
  import { waterSourceStore } from '/@/store/modules/waterInfo';
  import { message } from 'ant-design-vue';

  export default defineComponent({
    name: 'StationManagement',
    components: { BasicTable, StationDrawer, TableAction, ModalStation },
    setup() {
      //用水项弹窗
      const store = waterSourceStore();
      const [registerStation, { openModal: openModalStation }] = useModal();
      const query = getRouterQuery(); //获取路由参数
      const { projectID, projectName, projectType } = query;
      const [registerDrawer, { openDrawer }] = useDrawer();
      function beforeFetch(params) {
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
          schemas: searchFormSchema,
          autoSubmitOnEnter: true,
          showResetButton: false,
        },
        beforeFetch,
        useSearchForm: true,
        showTableSetting: true,
        bordered: true,
        showIndexColumn: true,
        actionColumn: {
          width: 180,
          title: '操作',
          dataIndex: 'action',
          slots: { customRender: 'action' },
          fixed: 'right',
        },
      });
      onMounted(() => {
        getForm().setFieldsValue({ projectID: query.projectName });
        store.waterSupplyAndDrainageProjectTypeAction(query.projectType);
      });

      function handleCreate() {
        query.type = 'add';
        openModalStation(true, query);
      }
      function handleEditStation(record: Recordable) {
        openModalStation(true, record);
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
            icon: 'ant-design:delete-outlined',
            tooltip: '删除车站',
            popConfirm: {
              title: '是否确认删除',
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
      };
    },
  });
</script>
