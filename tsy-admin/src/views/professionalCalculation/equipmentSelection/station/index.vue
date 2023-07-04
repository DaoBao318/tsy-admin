<template>
  <div>
    <BasicTable @register="registerTable">
      <template #toolbar>
        <a-button @click="backProject"> 返回项目 </a-button>
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
  import { defineComponent, ref, onMounted } from 'vue';

  import { BasicTable, useTable, TableAction, ActionItem } from '/@/components/Table';

  import { useDrawer } from '/@/components/Drawer';
  import EquipDrawer from '../EquipDrawer.vue';

  import { columnsStation, searchFormSchemaStation } from '../equip.data';
  import { exportEquipWord, getEquitment, getStationDeviceSelectionEdit } from '../api/http';
  import { message } from 'ant-design-vue';
  import ModalCount from '../totalHeadLoss/ModalCount.vue';
  import { useModal } from '/@/components/Modal';
  import { getRouterQueryEquip } from '../equipUtil';
  import { useGo } from '/@/hooks/web/usePage';

  export default defineComponent({
    name: 'EquipmentSelectionStation',
    components: { BasicTable, EquipDrawer, TableAction, ModalCount },
    setup() {
      const [registerCount, { openModal: openModalCount }] = useModal();

      const [registerDrawer, { openDrawer }] = useDrawer();
      const query = getRouterQueryEquip();

      function beforeFetch(params) {
        params.projectID = Number(query.projectID);
        params.pageIndex = params['split.page'];
        params.pageSize = params['split.size'];
        params.totalCount = 0;
        params.likeQuery = params.likeQuery ? params.likeQuery : '';
        delete params['split.page'];
        delete params['split.size'];
        delete params['time'];
        return params;
      }
      const [registerTable, { reload, getSelectRows, clearSelectedRowKeys, getForm }] = useTable({
        title: '设施设备选型列表',
        api: getEquitment,
        columns: columnsStation,
        formConfig: {
          labelWidth: 120,
          schemas: searchFormSchemaStation,
          showResetButton: false,
        },
        beforeFetch,
        clickToRowSelect: false,
        useSearchForm: true,
        showTableSetting: true,
        bordered: true,
        showIndexColumn: true,
        pagination: {
          pageSize: 20,
          defaultPageSize: 20,
          pageSizeOptions: ['20', '50', '80', '100'],
        },
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
      onMounted(() => {
        getForm().setFieldsValue({ projectName: query.projectName });
      });
      window.equipStationLoad = reload;
      function exportBatch() {
        const rows = getSelectRows();
        if (rows.length === 0) {
          message.warn('请先选择一条数据，再进行批量导出');
        } else {
          const { projectName, projectID } = rows[0];
          // const IsComputeTrue = rows.filter((item) => {
          //   return item.isCompute === '是';
          // });
          const IsComputeFalse = rows.filter((item) => {
            return item.isCompute === '否' || !item.technologyType;
          });
          const stationidList = rows.map((item) => {
            return item.stationID;
          });
          // const stationNameListExport = IsComputeTrue.map((item) => {
          //   return '《' + item.stationName + '》';
          // });
          const stationNameList = IsComputeFalse.map((item) => {
            return '《' + item.stationName + '》';
          });

          // 修改批量逻辑
          let str = stationidList.join(',');
          let params = { stationidList: str, projectID };
          params.exportNameObj = { projectName };
          exportEquipWord(params).then(() => {
            // const mes = stationNameListExport.join(',');
            let mesInfo = '';
            if (stationNameList.length > 0) {
              const mesStr = stationNameList.join(',');
              mesInfo = '  如下车站' + mesStr + '的给水、排水设施设备选型：未进行计算';
            } else {
              mesInfo = '';
            }
            message.success('导出成功 !' + mesInfo);
          });
        }
      }

      function handleEdit(record: Recordable) {
        //查询之后再去打开弹窗
        const { projectID, stationID, technologyType } = record;
        getStationDeviceSelectionEdit({ projectID, stationID }).then((res) => {
          clearSelectedRowKeys();
          res.technologyType = technologyType;
          openDrawer(true, {
            record: res,
            openModalCount: openModalCount,
          });
        });
      }
      let setFieldsValueFlag = function ({}) {};
      let setFieldsValueDrainageFlag = function ({}) {};
      //点击计算按钮的时候，传递过来
      function handleSuccess() {
        reload();
      }
      function handleTotalLoss(funOBJ) {
        setFieldsValueFlag = funOBJ.setFieldsValue;
        setFieldsValueDrainageFlag = funOBJ.setFieldsValueDrainage;
      }
      function creatAction(record): ActionItem[] {
        const { projectID, projectName, stationID } = record;
        return [
          {
            icon: 'clarity:note-edit-line',
            tooltip: '设施设备选型',
            onClick: handleEdit.bind(null, record),
          },
          {
            icon: 'mdi:export',
            tooltip: '导出',
            onClick: () => {
              exportEquipWord({
                projectID,
                stationidList: stationID + '',
                exportNameObj: { projectName },
              });
            },
          },
        ];
      }
      const transformValue = ref('');
      function countValue(value) {
        if (value.type === 'voltageStabilization') {
          if (!!value.hydraulicLossResult) {
            setFieldsValueFlag({ vfpBadWayHeadLoss: value.hydraulicLossResult });
          }
        } else if (value.type === 'fireFighting') {
          if (!!value.hydraulicLossResult) {
            setFieldsValueFlag({ firePumpBadWayHeadLoss: value.hydraulicLossResult });
          }
        } else if (value.type === 'type1') {
          if (!!value.hydraulicLossResult) {
            setFieldsValueDrainageFlag({ adjustWellTotalHeadLoss: value.hydraulicLossResult });
          }
        } else if (value.type === 'type2') {
          if (!!value.hydraulicLossResult) {
            setFieldsValueDrainageFlag({ pumpingWellTotalHeadLoss: value.hydraulicLossResult });
          }
        } else if (value.type === 'type3') {
          if (!!value.hydraulicLossResult) {
            setFieldsValueDrainageFlag({ makeGreenTotalHeadLoss: value.hydraulicLossResult });
          }
        } else if (value.type === 'type4') {
          if (!!value.hydraulicLossResult) {
            setFieldsValueDrainageFlag({ mbrTotalHeadLoss: value.hydraulicLossResult });
          }
        } else if (value.type === 'type5') {
          if (!!value.hydraulicLossResult) {
            setFieldsValueDrainageFlag({ pumpWellTotalHeadLoss: value.hydraulicLossResult });
          }
        } else if (value.type === 'type6') {
          if (!!value.hydraulicLossResult) {
            setFieldsValueDrainageFlag({ iaffTotalHeadLoss: value.hydraulicLossResult });
          }
        }
      }
      const go = useGo();
      const backProject = () => {
        go({
          name: 'EquipmentSelection',
        });
      };

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
        backProject,
      };
    },
  });
</script>
