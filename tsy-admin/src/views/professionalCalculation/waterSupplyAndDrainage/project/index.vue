<template>
  <div>
    <BasicTable @register="registerTable">
      <template #toolbar>
        <a-button v-if="dispalyProject" type="primary" @click="handleCreate"> 新增项目 </a-button>
      </template>
      <template #action="{ record }">
        <TableAction :actions="creatAction(record)" />
      </template>
    </BasicTable>
    <RoleDrawer @register="registerDrawer" @success="handleSuccess" />
  </div>
</template>
<script lang="ts">
  import { defineComponent, computed } from 'vue';

  import { BasicTable, useTable, TableAction, ActionItem } from '/@/components/Table';

  import { useDrawer } from '/@/components/Drawer';
  import RoleDrawer from './ProjectDrawer.vue';

  import { columns, searchFormSchema } from './project.data';
  import { deleteProject, enterAndUpdateProjects } from '../api/http';
  import { useGo } from '/@/hooks/web/usePage';
  import { waterSourceStore } from '/@/store/modules/waterInfo';

  function beforeFetch(params) {
    params.pageIndex = params['split.page'];
    params.pageSize = params['split.size'];
    params.totalCount = 0;
    params.likeQuery = params.likeQuery ? params.likeQuery : '';
    params.useID = 0;
    delete params['split.page'];
    delete params['split.size'];
    delete params['time'];
    return params;
  }

  export default defineComponent({
    name: 'ProjectManagement',
    components: { BasicTable, RoleDrawer, TableAction },
    setup() {
      let store = waterSourceStore();
      const dispalyProject = computed(() => {
        return store.dispalyProjectGetter;
      });
      const [registerDrawer, { openDrawer }] = useDrawer();
      const [registerTable, { reload }] = useTable({
        title: '项目列表',
        api: enterAndUpdateProjects,
        columns,
        formConfig: {
          labelWidth: 120,
          schemas: searchFormSchema,
          autoSubmitOnEnter: true,
        },
        beforeFetch,
        useSearchForm: true,
        showTableSetting: true,
        bordered: true,
        showIndexColumn: true,
        actionColumn: {
          width: 120,
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
        const { projectID } = record;
        deleteProject({ ProjectID: projectID }).then(() => {
          handleSuccess();
        });
        console.log(record);
      }

      function handleSuccess() {
        reload();
      }
      const go = useGo();
      function creatAction(record): ActionItem[] {
        const { projectID, projectName, projectType } = record;
        if (record.isSynchro === 1) {
          return [
            {
              icon: 'typcn:arrow-forward',
              tooltip: '用水量计算',
              onClick: () => {
                go({
                  name: 'WaterConsumptionCalculation',
                  query: {
                    projectID,
                    projectName,
                    projectType,
                  },
                });
              },
            },
          ];
        } else {
          let jumbData = [
            {
              icon: 'typcn:arrow-forward-outline',
              tooltip: '数据录入',
              onClick: () => {
                go({
                  name: 'Station',
                  query: {
                    projectID,
                    projectName,
                    projectType,
                  },
                });
              },
            },
          ];
          if (record.isExist === '是') {
            jumbData = [
              {
                icon: 'typcn:arrow-forward',
                tooltip: '用水量计算',
                onClick: () => {
                  go({
                    name: 'WaterConsumptionCalculation',
                    query: {
                      projectID,
                      projectName,
                      projectType,
                    },
                  });
                },
              },
              {
                icon: 'typcn:arrow-forward-outline',
                tooltip: '数据录入',
                onClick: () => {
                  go({
                    name: 'Station',
                    query: {
                      projectID,
                      projectName,
                      projectType,
                    },
                  });
                },
              },
            ];
          }
          return jumbData.concat([
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
          ]);
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
        dispalyProject,
      };
    },
  });
</script>
