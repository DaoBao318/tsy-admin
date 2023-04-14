<template>
  <div>
    <BasicTable @register="registerTable">
      <template #toolbar>
        <a-button type="primary" @click="handleCreate"> 新增项目 </a-button>
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
  import RoleDrawer from './ProjectDrawer.vue';

  import { columns, searchFormSchema } from './project.data';
  import { enterAndUpdateProjects } from '../api/http';
  import { useGo } from '/@/hooks/web/usePage';

  export default defineComponent({
    name: 'ProjectManagement',
    components: { BasicTable, RoleDrawer, TableAction },
    setup() {
      const [registerDrawer, { openDrawer }] = useDrawer();
      const [registerTable, { reload }] = useTable({
        title: '项目列表',
        api: enterAndUpdateProjects,
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
      const go = useGo();
      function creatAction(record): ActionItem[] {
        if (record.waterSupplyAndDrainageDataSource === '系统同步') {
          return [
            {
              icon: 'typcn:arrow-forward',
              tooltip: '用水量计算',
              onClick: () => {
                go({
                  name: 'WaterConsumptionCalculation',
                  query: {
                    id: 123,
                  },
                });
              },
            },
          ];
        } else {
          return [
            {
              icon: 'typcn:arrow-forward-outline',
              tooltip: '数据录入',
              onClick: () => {
                go({
                  name: 'Station',
                  query: {
                    id: 123,
                  },
                });
              },
            },
            {
              icon: 'clarity:note-edit-line',
              tooltip: '编辑项目',
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
