<template>
  <div>
    <a-tabs v-model:activeKey="activeKey" :style="{ marginBottom: '1px' }">
      <a-tab-pane key="1" tab="管道重力计算">
        <BasicTable @register="registerTable">
          <template #toolbar>
            <a-button type="primary" @click="handleCreate"> 新增 </a-button>
            <a-button type="primary" @click="batchExportGravity"> 批量导出 </a-button>
          </template>
          <template #action="{ record }">
            <TableAction
              :actions="[
                {
                  icon: 'clarity:note-edit-line',
                  onClick: handleEdit.bind(null, record),
                },
              ]"
            />
          </template>
          <template #pipeMaterial="{ record }">
            <div>
              {{ record.pipeMaterial + '材料' }}
            </div>
          </template>
        </BasicTable>
      </a-tab-pane>
      <a-tab-pane key="2" tab="管道压力计算" force-render>
        <BasicTable @register="registerTablePressure">
          <template #toolbar>
            <a-button type="primary" @click="handleCreatePressure"> 新增 </a-button>
            <a-button type="primary" @click="batchExportPressure"> 批量导出 </a-button>
          </template>
          <template #action="{ record }">
            <TableAction
              :actions="[
                {
                  icon: 'clarity:note-edit-line',
                  onClick: handleEditPressure.bind(null, record),
                },
              ]"
            />
          </template>
        </BasicTable>
      </a-tab-pane>
    </a-tabs>

    <GravityDrawer @register="registerDrawer" @success="handleSuccess" />
    <PressureDrawer @register="registerDrawerPressure" @success="handleSuccessPressure" />
  </div>
</template>
<script lang="ts">
  import { defineComponent, ref } from 'vue';

  import { BasicTable, useTable, TableAction } from '/@/components/Table';
  import { getGravityPage, getPressurePage } from '/@/api/demo/system';

  import { useDrawer } from '/@/components/Drawer';
  import GravityDrawer from './component/GravityDrawer.vue';
  import PressureDrawer from './component/PressureDrawer.vue';

  import {
    columnGravity,
    searchFormGravity,
    columnsPressure,
    searchFormPressure,
  } from './pipelineCalculation.data';

  export default defineComponent({
    name: 'RoleManagement',
    components: { BasicTable, GravityDrawer, TableAction, PressureDrawer },
    setup() {
      const [registerDrawer, { openDrawer }] = useDrawer();
      const [registerTable, { reload }] = useTable({
        title: '管道重力列表',
        api: getGravityPage,
        columns: columnGravity,
        formConfig: {
          labelWidth: 120,
          schemas: searchFormGravity,
          alwaysShowLines: 10,
          showActionButtonGroup: true,
          layout: 'horizontal',
          model: { pipeMaterial: 'm1', flowConditions: '0' },
          autoSetPlaceHolder: true,
          autoSubmitOnEnter: false,
        },
        pagination: {
          showQuickJumper: false,
        },
        useSearchForm: true,
        showTableSetting: true,
        bordered: true,
        showIndexColumn: true,
        actionColumn: {
          width: 80,
          title: '操作',
          dataIndex: 'action',
          slots: { customRender: 'action' },
          fixed: 'right',
        },
      });

      function handleCreate() {
        openDrawer(true, {
          isUpdate: false,
        });
      }

      function handleEdit(record: Recordable) {
        openDrawer(true, {
          record,
          isUpdate: true,
        });
      }
      function batchExportGravity() {}

      function handleSuccess() {
        reload();
      }
      //管道压力计算 Pressure
      const [registerDrawerPressure, { openDrawer: openDrawerPressure }] = useDrawer();
      const [registerTablePressure, { reload: reloadPressure }] = useTable({
        title: '管道压力列表',
        api: getPressurePage,
        columns: columnsPressure,
        formConfig: {
          labelWidth: 120,
          schemas: searchFormPressure,
        },
        useSearchForm: true,
        showTableSetting: true,
        bordered: true,
        showIndexColumn: true,
        pagination: {
          showQuickJumper: false,
        },
        actionColumn: {
          width: 80,
          title: '操作',
          dataIndex: 'action',
          slots: { customRender: 'action' },
          fixed: 'right',
        },
      });

      function handleCreatePressure() {
        openDrawerPressure(true, {
          isUpdate: false,
        });
      }

      function handleEditPressure(record: Recordable) {
        openDrawerPressure(true, {
          record,
          isUpdate: true,
        });
      }

      function handleSuccessPressure() {
        reloadPressure();
      }
      function batchExportPressure() {}

      let activeKey = ref('1');
      return {
        registerTable,
        registerDrawer,
        handleCreate,
        handleEdit,
        handleSuccess,
        batchExportGravity,

        registerTablePressure,
        registerDrawerPressure,
        handleCreatePressure,
        handleEditPressure,
        handleSuccessPressure,
        batchExportPressure,
        activeKey,
      };
    },
  });
</script>
