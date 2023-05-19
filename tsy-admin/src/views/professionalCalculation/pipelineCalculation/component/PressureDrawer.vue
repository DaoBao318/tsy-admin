<template>
  <BasicDrawer
    v-bind="$attrs"
    @register="registerDrawer"
    showFooter
    cancelText="保存"
    okText="计算"
    :title="getTitle"
    width="80%"
    @close="handleCancel"
    @ok="handleSubmit"
  >
    <BasicForm @register="registerForm" />
  </BasicDrawer>
</template>
<script lang="ts">
  import { defineComponent, ref, computed, unref, onMounted, nextTick, onBeforeUnmount } from 'vue';
  import { BasicForm, useForm } from '/@/components/Form/index';
  import { drawerFormPressure } from '../pipelineCalculation.data';
  import { BasicDrawer, useDrawerInner } from '/@/components/Drawer';
  import { dealPressureData, pressureCalculation } from '../utils';

  export default defineComponent({
    name: 'PressureDrawer',
    components: { BasicDrawer, BasicForm },
    emits: ['success', 'register'],
    setup(_, { emit }) {
      const isUpdate = ref(true);
      const [registerForm, { resetFields, setFieldsValue, validate, clearValidate }] = useForm({
        labelWidth: 185,
        baseColProps: { span: 24 },
        schemas: drawerFormPressure,
        showActionButtonGroup: false,
        compact: true,
      });

      const [registerDrawer, { setDrawerProps }] = useDrawerInner(async (data) => {
        resetFields();
        setDrawerProps({ confirmLoading: false });
        // 需要在setFieldsValue之前先填充treeData，否则Tree组件可能会报key not exist警告
        isUpdate.value = !!data?.isUpdate;

        if (unref(isUpdate)) {
          setFieldsValue({
            ...data.record,
          });
          clearValidate();
        }
      });

      const getTitle = computed(() => (!unref(isUpdate) ? '新增管道压力计算' : '编辑管道压力计算'));
      let dataPressure = {};
      async function handleSubmit() {
        debugger;
        try {
          const values = await validate();
          setDrawerProps({ confirmLoading: true });
          pressureCalculation(values, setFieldsValue);
          dataPressure = await validate();
        } finally {
          setDrawerProps({ confirmLoading: false });
        }
      }
      function handleCancel() {
        // if (!unref(isUpdate)) {
        //   dataPressure = {};
        // }
        dealPressureData(dataPressure);
        emit('success');
        // message.success('保存成功！');
      }
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

      return {
        registerDrawer,
        registerForm,
        getTitle,
        handleSubmit,
        handleCancel,
      };
    },
  });
</script>
