<template>
  <div>
    <BasicTable @register="registerTable">
      <template #toolbar>
        <a-button type="primary" @click="handleCreate"> 新增车站 </a-button>
      </template>
      <template #action="{ record }">
        <TableAction :actions="creatAction(record)" />
      </template>
    </BasicTable>
    <RoleDrawer @register="registerDrawer" @success="handleSuccess" />
  </div>
</template>
<script lang="ts">
  import { defineComponent } from 'vue';

  import { BasicTable, useTable, TableAction, ActionItem } from '/@/components/Table';

  import { useDrawer } from '/@/components/Drawer';
  import RoleDrawer from './StationDrawer.vue';

  import { columns, searchFormSchema } from './station.data';
  import { enteringStationData } from '../api/http';
  import { useGo } from '/@/hooks/web/usePage';
  import { getRouterQuery } from '../utilsWaterSupplyAndDrainage';

  export default defineComponent({
    name: 'StationManagement',
    components: { BasicTable, RoleDrawer, TableAction },
    setup() {
      const query = getRouterQuery(); //获取路由参数
      debugger;
      const [registerDrawer, { openDrawer }] = useDrawer();
      const [registerTable, { reload }] = useTable({
        title: '车站列表',
        api: enteringStationData,
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
          width: 180,
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
      const go = useGo();
      function creatAction(record): ActionItem[] {
        if (record.waterSupplyAndDrainageDataSource === '系统同步') {
          return [
            {
              tooltip: '用水量计算',
              onClick: () => {
                go('/professionalCalculation/waterConsumptionCalculation');
              },
            },
          ];
        } else {
          return [
            {
              icon: 'clarity:note-edit-line',
              tooltip: '编辑车站',
              onClick: handleEdit.bind(null, record),
            },
            {
              icon: 'ant-design:delete-outlined',
              tooltip: '删除项目',
              popConfirm: {
                title: '是否确认删除',
                confirm: handleDelete.bind(null, record),
              },
            },
          ];
        }
      }

      return {
        registerTable,
        registerDrawer,
        handleCreate,
        handleEdit,
        handleDelete,
        handleSuccess,
        creatAction,
      };
    },
  });
</script>
