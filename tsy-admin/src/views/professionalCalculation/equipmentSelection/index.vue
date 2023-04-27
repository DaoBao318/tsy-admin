<template>
  <div>
    <BasicTable @register="registerTable">
      <template #toolbar>
        <a-button type="primary" @click="exportBatch"> 批量导出 </a-button>
      </template>
      <template #action="{ record }">
        <TableAction :actions="creatAction(record)" />
      </template>
    </BasicTable>
    <EquipDrawer @register="registerDrawer" @success="handleSuccess" />
  </div>
</template>
<script lang="ts">
  import { defineComponent, computed } from 'vue';

  import { BasicTable, useTable, TableAction, ActionItem } from '/@/components/Table';

  import { useDrawer } from '/@/components/Drawer';
  import EquipDrawer from './EquipDrawer.vue';

  import { columns, searchFormSchema } from './equip.data';
  import { exportEquipWord, getEquitment, getStationDeviceSelectionEdit } from './api/http';
  import { waterSourceStore } from '/@/store/modules/waterInfo';
  import { message } from 'ant-design-vue';

  function beforeFetch(params) {
    params.pageIndex = params['split.page'];
    params.pageSize = params['split.size'];
    params.totalCount = 0;
    params.likeQuery = params.likeQuery ? params.likeQuery : '';
    delete params['split.page'];
    delete params['split.size'];
    delete params['time'];
    return params;
  }

  export default defineComponent({
    name: 'EquipmentSelection',
    components: { BasicTable, EquipDrawer, TableAction },
    setup() {
      let store = waterSourceStore();

      const [registerDrawer, { openDrawer }] = useDrawer();
      const [registerTable, { reload, getSelectRows }] = useTable({
        title: '设备选型列表',
        api: getEquitment,
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
        rowSelection: {
          type: 'checkbox',
        },
        actionColumn: {
          width: 120,
          title: '操作',
          dataIndex: 'action',
          slots: { customRender: 'action' },
          fixed: 'right',
        },
      });
      window.equipLoad = reload;
      function exportBatch() {
        const rows = getSelectRows();
        if (rows.length === 0) {
          message.warn('请先选择一条数据，再进行批量导出');
        } else {
          const { projectName } = rows[0];
          let params = {};
          params.exportNameObj = { projectName };
          exportEquipWord(params);
        }
      }

      function handleEdit(record: Recordable) {
        //查询之后再去打开弹窗
        const { projectID, stationID } = record;
        getStationDeviceSelectionEdit({ projectID, stationID }).then((res) => {
          openDrawer(true, {
            record: res,
            isUpdate: true,
          });
        });
      }

      function handleSuccess() {
        reload();
      }
      function creatAction(record): ActionItem[] {
        const { projectID, projectName, stationID } = record;
        return [
          {
            icon: 'clarity:note-edit-line',
            tooltip: '设备选型',
            onClick: handleEdit.bind(null, record),
          },
          {
            icon: 'mdi:export',
            tooltip: '导出',
            onClick: () => {
              let params = {};
              params.exportNameObj = { projectName };
              exportEquipWord(params);
            },
          },
        ];
      }

      return {
        registerTable,
        registerDrawer,
        exportBatch,
        handleEdit,
        handleSuccess,
        creatAction,
      };
    },
  });
</script>
