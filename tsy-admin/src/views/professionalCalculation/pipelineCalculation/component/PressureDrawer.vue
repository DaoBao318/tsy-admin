<template>
  <BasicDrawer
    v-bind="$attrs"
    @register="registerDrawer"
    showFooter
    cancelText="退出"
    okText="计算并保存"
    :title="getTitle"
    width="80%"
    @close="handleCancel"
    @ok="handleSubmit"
  >
    <dir :class="stylePaddingDrawer">
      <BasicForm @register="registerForm" />
    </dir>
  </BasicDrawer>
</template>
<script lang="ts">
  import { defineComponent, ref, computed, unref, onMounted, nextTick, onBeforeUnmount } from 'vue';
  import { BasicForm, useForm } from '/@/components/Form/index';
  import { drawerFormPressure } from '../pipelineCalculation.data';
  import { BasicDrawer, useDrawerInner } from '/@/components/Drawer';
  import {
    initountNominalDiameter,
    dealPressureData,
    pressureCalculation,
    stateControlPressure,
  } from '../utils';

  export default defineComponent({
    name: 'PressureDrawer',
    components: { BasicDrawer, BasicForm },
    emits: ['success', 'register'],
    setup(_, { emit }) {
      const isUpdate = ref(true);
      const [registerForm, { resetFields, setFieldsValue, validate, clearValidate, updateSchema }] =
        useForm({
          labelWidth: 140,
          baseColProps: { span: 24 },
          schemas: drawerFormPressure,
          showActionButtonGroup: false,
          // compact: true,
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
          const { calculationFormula, calculationContent, pipeMaterial } = data.record;
          const show = calculationFormula === 'gs1';
          updateSchema({
            field: 'coughnessCoefficient',
            show,
          });
          stateControlPressure(updateSchema, calculationContent, pipeMaterial);
          const obj = { calculationFormula };
          initountNominalDiameter(pipeMaterial, updateSchema, obj);
          clearValidate();
        } else {
          updateSchema({
            field: 'coughnessCoefficient',
            show: true,
          });
        }
      });

      const getTitle = computed(() => (!unref(isUpdate) ? '新增管道压力计算' : '编辑管道压力计算'));
      let dataPressure = {};
      async function handleSubmit() {
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

      const stylePaddingDrawer = ref();
      const resizeFun = () => {
        if (window.screen.width > 1800) {
          stylePaddingDrawer.value = 'largePipeScreen';
        } else {
          stylePaddingDrawer.value = 'smallPipeScreen';
        }
      };
      onMounted(() => {
        nextTick(() => {
          resizeFun();
          window.addEventListener('resize', resizeFun);
          document.addEventListener('keydown', onkeydownFn);
        });
      });
      onBeforeUnmount(() => {
        document.removeEventListener('keydown', onkeydownFn);
        window.removeEventListener('resize', resizeFun);
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
        stylePaddingDrawer,
      };
    },
  });
</script>
<style scoped lang="less">
  .largePipeScreen {
    padding: 10px 180px 0 200px;
  }
  .smallPipeScreen {
    padding: 30px 10px 0 10px;
  }
</style>
