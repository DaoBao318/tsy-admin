<template>
  <div class="pressure-top">
    <BasicTable @register="registerTablePressure">
      <template #toolbar>
        <a-button type="primary" @click="handleCreatePressure"> 管道压力新增 </a-button>
      </template>
      <template #action="{ record }">
        <TableAction
          :actions="[
            {
              icon: 'clarity:note-edit-line',
              tooltip: '管道压力修改',
              onClick: handleEditPressure.bind(null, record),
            },
            {
              icon: 'ant-design:delete-outlined',
              tooltip: '删除',
              popConfirm: {
                title: '确认删除?',
                confirm: handleDelete.bind(null, record),
              },
            },
          ]"
        />
      </template>
    </BasicTable>
    <PressureDrawer @register="registerDrawerPressure" @success="handleSuccessPressure" />
  </div>
</template>
<script lang="ts">
  import { defineComponent } from 'vue';

  import { BasicTable, useTable, TableAction } from '/@/components/Table';

  import { useDrawer } from '/@/components/Drawer';
  import PressureDrawer from './component/PressureDrawer.vue';

  import { columnsPressure, searchFormPressure } from './pipelineCalculation.data';
  import { getPressurePage } from './http';
  import { deletePressure } from './utils';

  export default defineComponent({
    name: 'WaterConsumption',
    components: { BasicTable, TableAction, PressureDrawer },
    setup() {
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
        useSearchForm: false,
        showTableSetting: true,
        bordered: true,
        showIndexColumn: true,
        pagination: {
          showQuickJumper: false,
        },
        actionColumn: {
          width: 140,
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
      function handleDelete(record) {
        deletePressure(record);
        reloadPressure();
      }

      return {
        registerTablePressure,
        registerDrawerPressure,
        handleCreatePressure,
        handleEditPressure,
        handleSuccessPressure,
        handleDelete,
      };
    },
  });
</script>
<style scoped>
  .pressure-top {
    padding: 15px 10px 0 10px;
  }
</style>
