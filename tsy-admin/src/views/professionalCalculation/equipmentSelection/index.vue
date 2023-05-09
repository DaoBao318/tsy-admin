<template>
  <div >
    <BasicTable @register="registerTable">
      <template #toolbar>
        <a-button type="primary" @click="exportBatch"> 批量导出 </a-button>
      </template>
      <template #action="{ record }">
        <TableAction :actions="creatAction(record)" />
      </template>
    </BasicTable>
    <EquipDrawer
      @register="registerDrawer"
      @success="handleSuccess"
      @totalHead="handleTotalLoss"
      :transformValue="transformValue"
    />
    <ModalCount @register="registerCount" @countValue="countValue" />
  </div>
</template>
<script lang="ts">
  import { defineComponent, ref, computed } from 'vue';

  import { BasicTable, useTable, TableAction, ActionItem } from '/@/components/Table';

  import { useDrawer } from '/@/components/Drawer';
  import EquipDrawer from './EquipDrawer.vue';

  import { columns, searchFormSchema } from './equip.data';
  import { exportEquipWord, getEquitment, getStationDeviceSelectionEdit } from './api/http';
  import { waterSourceStore } from '/@/store/modules/waterInfo';
  import { message } from 'ant-design-vue';
  import ModalCount from './totalHeadLoss/ModalCount.vue';
  import { useModal } from '/@/components/Modal';

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
    components: { BasicTable, EquipDrawer, TableAction, ModalCount },
    setup() {
      let store = waterSourceStore();
      const [registerCount, { openModal: openModalCount }] = useModal();

      const [registerDrawer, { openDrawer }] = useDrawer();
      const [registerTable, { reload, getSelectRows }] = useTable({
        title: '设施设备选型列表',
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
          debugger;
          const { projectName, projectID } = rows[0];
          const IsComputeTrue = rows.filter((item) => {
            return item.isCompute === '是';
          });
          const IsComputeFalse = rows.filter((item) => {
            return item.isCompute === '否';
          });
          const stationidList = IsComputeTrue.map((item) => {
            return item.stationID;
          });
          const stationNameListExport = IsComputeTrue.map((item) => {
            return '《' + item.stationName + '》';
          });
          const stationNameList = IsComputeFalse.map((item) => {
            return '《' + item.stationName + '》';
          });
          if (stationNameList.length > 0) {
            const mes = stationNameList.join(',');
            message.warning('请将如下车站进行设备选型计算之后再导出：' + mes);
          }
          if (stationidList.length > 0) {
            // 修改批量逻辑
            let str = stationidList.join(',');
            let params = { stationidList: str, projectID };
            params.exportNameObj = { projectName };
            exportEquipWord(params).then(() => {
              const mes = stationNameListExport.join(',');
              message.success(mes + '导出成功');
            });
          }
        }
      }

      function handleEdit(record: Recordable) {
        //查询之后再去打开弹窗
        const { projectID, stationID } = record;
        getStationDeviceSelectionEdit({ projectID, stationID }).then((res) => {
          openDrawer(true, {
            record: res,
            openModalCount: openModalCount,
          });
        });
      }
      let setFieldsValueFlag = function ({}) {};
      //点击计算按钮的时候，传递过来
      function handleSuccess() {
        reload();
      }
      function handleTotalLoss(setFieldsValue) {
        setFieldsValueFlag = setFieldsValue;
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
              exportEquipWord({
                projectID,
                stationidList: stationID + '',
                exportNameObj: projectName,
              });
            },
          },
        ];
      }
      const transformValue = ref('');
      function countValue(value) {
        if (value.type === 'voltageStabilization') {
          setFieldsValueFlag({ vfpBadWayHeadLoss: value.hydraulicLossResult });
        } else {
          setFieldsValueFlag({ firePumpBadWayHeadLoss: value.hydraulicLossResult });
        }
      }

      return {
        registerTable,
        registerDrawer,
        exportBatch,
        handleEdit,
        handleSuccess,
        handleTotalLoss,
        creatAction,
        registerCount,
        transformValue,
        countValue,
      };
    },
  });
</script>
