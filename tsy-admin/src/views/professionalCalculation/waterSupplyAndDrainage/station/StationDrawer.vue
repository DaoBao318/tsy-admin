<template>
  <BasicDrawer
    v-bind="$attrs"
    @register="registerDrawer"
    showFooter
    :title="getTitle"
    width="90%"
    @ok="handleSubmit"
  >
    <BasicForm @register="registerForm" />
    <BasicTable @register="registerTable">
      <template #toolbar>
        <a-button type="primary" @click="createWaterItem"
          >{{ isUpdate ? '编辑用水项' : '新增用水项' }}
        </a-button>
      </template>
    </BasicTable>
    <WaterItem @register="registerWaterItem" />
  </BasicDrawer>
</template>
<script lang="ts">
  import { defineComponent, ref, computed, unref } from 'vue';
  import { BasicForm, useForm } from '/@/components/Form/index';
  import { formSchema, waterItemColumns } from './station.data';
  import { BasicDrawer, useDrawerInner } from '/@/components/Drawer';
  import { BasicTable, useTable } from '/@/components/Table';
  import { waterUseProjectItem } from '../api/http';
  import WaterItem from './ModalWaterItem.vue';
  import { useModal } from '/@/components/Modal';

  export default defineComponent({
    name: 'StationDrawer',
    components: { BasicDrawer, BasicForm, BasicTable, WaterItem },
    emits: ['success', 'register'],
    setup(_, { emit }) {
      //用水项弹窗
      const [registerWaterItem, { openModal: openModalWaterItem }] = useModal();

      //新增用水项
      const [registerTable, { reload }] = useTable({
        title: '车站列表',
        api: waterUseProjectItem,
        columns: waterItemColumns,
        useSearchForm: false,
        showTableSetting: false,
        bordered: true,
        showIndexColumn: true,
        pagination: false,
      });
      function createWaterItem() {
        openModalWaterItem(true, {
          data: 'content',
          info: 'Info',
        });
        console.log(111);
      }

      const isUpdate = ref(true);
      // const treeData = ref<TreeItem[]>([]);

      const [registerForm, { resetFields, setFieldsValue, validate }] = useForm({
        labelWidth: 90,
        baseColProps: { span: 24 },
        schemas: formSchema,
        showActionButtonGroup: false,
      });

      const [registerDrawer, { setDrawerProps, closeDrawer }] = useDrawerInner(async (data) => {
        resetFields();
        setDrawerProps({ confirmLoading: false });
        isUpdate.value = !!data?.isUpdate;
        if (unref(isUpdate)) {
          setFieldsValue({
            ...data.record,
          });
        }
      });

      const getTitle = computed(() => (!unref(isUpdate) ? '新增车站' : '编辑车站'));

      async function handleSubmit() {
        try {
          const values = await validate();
          setDrawerProps({ confirmLoading: true });
          // TODO custom api
          console.log(values);
          closeDrawer();
          emit('success');
        } finally {
          setDrawerProps({ confirmLoading: false });
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
      };
    },
  });
</script>
