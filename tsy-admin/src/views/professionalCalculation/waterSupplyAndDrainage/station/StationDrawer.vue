<template>
  <BasicDrawer
    v-bind="$attrs"
    @register="registerDrawer"
    showFooter
    :okText="'保存'"
    :title="getTitle"
    width="90%"
    @ok="handleSubmit"
  >
    <BasicForm @register="registerForm" />
    <BasicTable @register="registerTable">
      <template #toolbar>
        <a-button @click="deleteBatch">批量删除 </a-button>
        <a-button type="primary" @click="createWaterItem"
          >{{ isUpdate ? '编辑用水项' : '新增用水项' }}
        </a-button>
      </template>
      <template #action="{ record }">
        <TableAction :actions="creatAction(record)" />
      </template>
      <template #recentQuantity="{ record }">
        <a-input-number v-model:value="record.recentQuantity" min="0" />
      </template>
    </BasicTable>
    <ModalWaterItem @register="registerWaterItem" @selectData="renderTable" />
  </BasicDrawer>
</template>
<script lang="ts">
  import { defineComponent, ref, computed, unref, onMounted, nextTick, onBeforeUnmount } from 'vue';
  import { BasicForm, useForm } from '/@/components/Form/index';
  import { formSchema, waterItemColumns } from './station.data';
  import { BasicDrawer, useDrawerInner } from '/@/components/Drawer';
  import { BasicTable, useTable, ActionItem, TableAction } from '/@/components/Table';
  import ModalWaterItem from './ModalWaterItem.vue';
  import { useModal } from '/@/components/Modal';
  import { message } from 'ant-design-vue';
  import { getWaterProjectList, saveEnterWaterProjectData } from '../api/http';
  import {
    getSeletcted,
    QueryModel,
    stationSave,
    transformToTable,
    validateNum,
  } from './stationUtils';

  export default defineComponent({
    name: 'StationDrawer',
    components: { BasicDrawer, BasicForm, BasicTable, ModalWaterItem, TableAction },
    emits: ['success', 'register'],
    setup(_, { emit }) {
      onMounted(() => {
        nextTick(() => {
          document.addEventListener('keydown', onkeydownFn);
        });
      });
      onBeforeUnmount(() => {
        document.removeEventListener('keydown', onkeydownFn);
      });
      const onkeydownFn = (e) => {
        if (e && e.keyCode === 13) {
          e.target.blur();
        }
      };
      //用水项弹窗
      const [registerWaterItem, { openModal: openModalWaterItem }] = useModal();
      const [
        registerTable,
        { deleteTableDataRecord, getSelectRowKeys, setTableData, getDataSource },
      ] = useTable({
        title: '用水项列表',
        columns: waterItemColumns,
        useSearchForm: false,
        showTableSetting: false,
        bordered: true,
        showIndexColumn: true,
        // beforeFetch,
        immediate: true,
        pagination: false,
        rowSelection: {
          type: 'checkbox',
        },
        clickToRowSelect: false,
        actionColumn: {
          width: 120,
          title: '操作',
          dataIndex: 'action',
          slots: { customRender: 'action' },
        },
      });

      const queryWater = ref<QueryModel>({});
      const [registerDrawer, { setDrawerProps, closeDrawer }] = useDrawerInner(async (data) => {
        resetFields();
        setDrawerProps({ confirmLoading: false });
        isUpdate.value = !!data?.isUpdate;
        queryWater.value = data.record;
        setTableData(data.res.list);
        if (unref(isUpdate)) {
          setFieldsValue({
            ...data.record,
          });
        }
      });
      //编辑用水项
      function createWaterItem() {
        const { stationID, stationType } = queryWater.value;
        getWaterProjectList({
          stationID,
          stationType,
          pageIndex: 0,
          pageSize: 0,
          totalCount: 0,
        }).then((res) => {
          const waterSelected = getSeletcted(getDataSource);
          let arr = res.list;
          openModalWaterItem(true, {
            list: arr,
            waterSelected,
          });
        });

        console.log(111);
      }
      const isUpdate = ref(true);
      const [registerForm, { resetFields, setFieldsValue }] = useForm({
        labelWidth: 90,
        baseColProps: { span: 24 },
        schemas: formSchema,
        showActionButtonGroup: false,
      });

      function renderTable(selectData) {
        const transformToTableRaw = getDataSource();
        const list = transformToTable(queryWater.value, selectData, transformToTableRaw);
        setTableData(list);
      }

      const getTitle = computed(() => (!unref(isUpdate) ? '操作用水项目' : '操作用水项目'));

      async function handleSubmit() {
        try {
          setDrawerProps({ confirmLoading: true });
          const { projectID, stationID } = queryWater.value;
          const list = stationSave(getDataSource);
          //校验TODO
          if (list.length === 0) {
            message.warn('请添加用水项之后在保存！');
            return;
          }
          let unValidateMessage = validateNum(list);
          if (!!unValidateMessage) {
            message.warn('请给如下用水项目添加数量(近期):' + unValidateMessage);
            return;
          }
          let params = { projectID, stationID, list };
          saveEnterWaterProjectData(params).then(() => {
            closeDrawer();
            emit('success');
          });
        } finally {
          setDrawerProps({ confirmLoading: false });
        }
      }
      function creatAction(record): ActionItem[] {
        return [
          {
            icon: 'ant-design:delete-outlined',
            tooltip: '删除用水项',
            popConfirm: {
              title: '是否确认删除！',
              confirm: handleDelete.bind(null, record),
            },
          },
        ];
      }
      function handleDelete(record) {
        deleteTableDataRecord(record.key);
      }
      function deleteBatch() {
        const keys = getSelectRowKeys();
        if (keys.length > 0) {
          deleteTableDataRecord(getSelectRowKeys());
        } else {
          message.warn('请至少选择一条数据');
        }
      }

      return {
        registerDrawer,
        registerForm,
        getTitle,
        handleSubmit,

        registerTable,
        createWaterItem,

        registerWaterItem,
        isUpdate,
        creatAction,
        handleDelete,
        deleteBatch,
        renderTable,
      };
    },
  });
</script>
