<template>
  <div>
    <a-button v-if="false" @click="testApi">API测试</a-button>
    <a-tabs v-model:activeKey="activeKey" :style="{ marginBottom: '1px' }">
      <a-tab-pane key="1" tab="管道重力计算">
        <BasicTable @register="registerTable">
          <template #toolbar>
            <a-button type="primary" @click="handleCreate"> 新增 </a-button>
            <a-button type="primary" @click="handleCreate"> 批量导出 </a-button>
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
        </BasicTable>
      </a-tab-pane>
      <a-tab-pane key="2" tab="管道压力计算" force-render>
        <BasicTable @register="registerTablePressure">
          <template #toolbar>
            <a-button type="primary" @click="handleCreatePressure"> 新增 </a-button>
            <a-button type="primary" @click="handleCreatePressure"> 批量导出 </a-button>
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

    <RoleDrawer @register="registerDrawer" @success="handleSuccess" />
    <RoleDrawerPressure @register="registerDrawerPressure" @success="handleSuccessPressure" />
  </div>
</template>
<script lang="ts">
  import { defineComponent, ref } from 'vue';

  import { BasicTable, useTable, TableAction } from '/@/components/Table';
  import { getRoleListByPage, getRoleListByPagePressure, getTestAPI } from '/@/api/demo/system';

  import { useDrawer } from '/@/components/Drawer';
  import RoleDrawer from './RoleDrawer.vue';
  import RoleDrawerPressure from './RoleDrawerPressure.vue';

  import {
    columns,
    searchFormSchema,
    columnsPressure,
    searchFormSchemaPressure,
  } from './role.data';

  export default defineComponent({
    name: 'RoleManagement',
    components: { BasicTable, RoleDrawer, TableAction, RoleDrawerPressure },
    setup() {
      const [registerDrawer, { openDrawer }] = useDrawer();
      const [registerTable, { reload }] = useTable({
        title: '管道重力列表',
        api: getRoleListByPage,
        columns,
        formConfig: {
          labelWidth: 120,
          schemas: searchFormSchema,
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

      function handleDelete(record: Recordable) {
        console.log(record);
      }

      function handleSuccess() {
        reload();
      }
      //管道压力计算 Pressure
      const [registerDrawerPressure, { openDrawer: openDrawerPressure }] = useDrawer();
      const [registerTablePressure, { reload: reloadPressure }] = useTable({
        title: '管道重力列表',
        api: getRoleListByPagePressure,
        columns: columnsPressure,
        formConfig: {
          labelWidth: 120,
          schemas: searchFormSchemaPressure,
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

      function handleDeletePressure(record: Recordable) {
        console.log(record);
      }

      function handleSuccessPressure() {
        reloadPressure();
      }

      let activeKey = ref('1');
      function testApi() {
        getTestAPI({ useid: 1 });
      }
      return {
        registerTable,
        registerDrawer,
        handleCreate,
        handleEdit,
        handleDelete,
        handleSuccess,

        registerTablePressure,
        registerDrawerPressure,
        handleCreatePressure,
        handleEditPressure,
        handleDeletePressure,
        handleSuccessPressure,
        activeKey,
        testApi,
      };
    },
  });
</script>
