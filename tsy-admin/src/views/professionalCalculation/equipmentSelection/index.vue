<template>
  <div>
    <BasicTable @register="registerTable">
      <template #action="{ record }">
        <TableAction :actions="creatAction(record)" />
      </template>
    </BasicTable>
  </div>
</template>
<script lang="ts">
  import { defineComponent, ref, onActivated } from 'vue';

  import { BasicTable, useTable, TableAction, ActionItem } from '/@/components/Table';
  import { columns, searchFormSchema } from './equip.data';
  import { getProjectInformation } from './api/http';
  import { useGo } from '/@/hooks/web/usePage';
  function beforeFetch(params) {
    params.pageIndex = params['split.page'];
    params.pageSize = params['split.size'];
    params.totalCount = 0;
    params.useID = 0;
    params.likeQuery = params.likeQuery ? params.likeQuery : '';
    delete params['split.page'];
    delete params['split.size'];
    delete params['time'];
    return params;
  }

  export default defineComponent({
    name: 'EquipmentSelection',
    components: { BasicTable, TableAction },
    setup() {
      const [registerTable, { reload }] = useTable({
        title: '项目选型列表',
        api: getProjectInformation,
        columns,
        formConfig: {
          labelWidth: 120,
          schemas: searchFormSchema,
        },
        beforeFetch,
        useSearchForm: true,
        showTableSetting: true,
        bordered: true,
        showIndexColumn: true,
        // rowSelection: {
        //   type: 'checkbox',
        // },
        actionColumn: {
          width: 80,
          title: '操作',
          dataIndex: 'action',
          slots: { customRender: 'action' },
          fixed: 'right',
        },
      });
      window.equipLoad = reload;
      onActivated(() => {
        reload();
      });
      const go = useGo();
      function handleEdit(record: Recordable) {
        //查询之后再去打开弹窗
        const { projectID, projectName } = record;
        go({
          name: 'EquipmentSelectionStation',
          query: {
            projectID,
            projectName,
          },
        });
      }
      function creatAction(record): ActionItem[] {
        return [
          {
            icon: 'ant-design:carry-out-outlined',
            tooltip: '进入设施设备选型',
            onClick: handleEdit.bind(null, record),
          },
        ];
      }
      const transformValue = ref('');

      return {
        registerTable,
        handleEdit,
        creatAction,
        transformValue,
      };
    },
  });
</script>
