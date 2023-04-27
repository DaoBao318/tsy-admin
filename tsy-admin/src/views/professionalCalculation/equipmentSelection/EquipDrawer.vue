<template>
  <BasicDrawer
    v-bind="$attrs"
    @register="registerDrawer"
    showFooter
    okText="计算"
    cancelText="关闭"
    title="设备选型计算"
    width="100%"
    @close="handleClose"
    @ok="handleSubmit"
  >
    <BasicForm @register="registerForm" />
  </BasicDrawer>
</template>
<script lang="ts">
  import { defineComponent, ref, computed, unref } from 'vue';
  import { BasicForm, useForm } from '/@/components/Form/index';
  import { formSchema } from './equip.data';
  import { BasicDrawer, useDrawerInner } from '/@/components/Drawer';
  import { saveEquipment } from './api/http';
  import { calculateEquip, initializeAssignmentStructure } from './equipUtil';
  import { message } from 'ant-design-vue';

  export default defineComponent({
    name: 'EquipDrawer',
    components: { BasicDrawer, BasicForm },
    emits: ['success', 'register'],
    setup(_, { emit }) {
      // const treeData = ref<TreeItem[]>([]);

      const [registerForm, { resetFields, setFieldsValue, validate, updateSchema, clearValidate }] =
        useForm({
          labelWidth: 280,
          baseColProps: { span: 24 },
          schemas: formSchema,
          showActionButtonGroup: false,
          compact: true,
          size: 'small',
        });
      let basicData = {};
      const [registerDrawer, { setDrawerProps, closeDrawer }] = useDrawerInner(async (data) => {
        // 初始化赋值
        resetFields();
        const { projectID, projectName, stationID, stationName, stationType, stationTypeName } =
          data.record;
        basicData = {
          projectID,
          projectName,
          stationID,
          stationName,
          stationType,
          stationTypeName,
        };
        setDrawerProps({ confirmLoading: false });
        initializeAssignmentStructure(setFieldsValue, updateSchema, data.record);
        clearValidate();
      });

      async function handleSubmit() {
        try {
          const values = await validate();
          values.stationType = basicData.stationType;
          calculateEquip(values, setFieldsValue);
          const newValues = await validate();
          const data = Object.assign(newValues, basicData);
          saveEquipment(data).then((res) => {
            setFieldsValue({ ...res });
            message.success('设备选型数据保存成功');
            // closeDrawer();
          });
        } finally {
          setDrawerProps({ confirmLoading: false });
        }
      }
      async function handleClose() {
        emit('success');
        return;
      }

      return {
        registerDrawer,
        registerForm,
        handleSubmit,
        handleClose,
      };
    },
  });
</script>
