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
    <BasicForm @register="registerForm">
      <template #add1>
        <a-button size="small" @click="openDialog('voltageStabilization')">计算</a-button>
      </template>
      <template #add2>
        <a-button size="small" @click="openDialog('fireFighting')">计算</a-button>
      </template>
    </BasicForm>
  </BasicDrawer>
</template>
<script lang="ts">
  import { defineComponent, watch, ref, computed, unref } from 'vue';
  import { BasicForm, useForm } from '/@/components/Form/index';
  import { formSchema } from './equip.data';
  import { BasicDrawer, useDrawerInner } from '/@/components/Drawer';
  import { saveEquipment } from './api/http';
  import { calculateEquip, initializeAssignmentStructure } from './equipUtil';
  import { message } from 'ant-design-vue';
  import { keepTwoDecimalFull } from '/@/utils/calculation/count';

  export default defineComponent({
    name: 'EquipDrawer',
    components: { BasicDrawer, BasicForm },
    emits: ['success', 'register', 'totalHead'],
    setup(_, { emit }) {
      // const treeData = ref<TreeItem[]>([]);

      const [
        registerForm,
        {
          resetFields,
          setFieldsValue,
          validate,
          updateSchema,
          clearValidate,
          getFieldsValue,
          validateFields,
        },
      ] = useForm({
        labelWidth: 280,
        baseColProps: { span: 24 },
        schemas: formSchema,
        showActionButtonGroup: false,
        compact: true,
        size: 'small',
      });
      let basicData = {};
      let openModalCount;
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
        openModalCount = data.openModalCount;
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
      async function openDialog(type) {
        emit('totalHead', setFieldsValue);
        if (type === 'voltageStabilization') {
          try {
            const values = await validateFields([
              'busWaterRows',
              'groupsNumber',
              'busWaterSingle',
              'produceLifeTotalFlow',
              'waterSameRatio',
            ]);
            const {
              busWaterRows,
              groupsNumber,
              busWaterSingle,
              produceLifeTotalFlow,
              waterSameRatio,
            } = values;
            //按照类型判断,中间站已经默认为0
            const waterSupplyDesignFlow = keepTwoDecimalFull(
              busWaterRows * groupsNumber * busWaterSingle + produceLifeTotalFlow * waterSameRatio,
              2,
            );
            setFieldsValue({ waterSupplyDesignFlow });
            openModalCount(true, {
              rateOfFlow: waterSupplyDesignFlow,
              type: 'voltageStabilization',
            });
          } catch (e) {
            const {
              busWaterRows,
              groupsNumber,
              busWaterSingle,
              produceLifeTotalFlow,
              waterSameRatio,
            } = getFieldsValue();
            let info = '';
            if (busWaterRows) {
              info = '客车上水同时上水排数N(列)';
            } else if (groupsNumber) {
              info = '列车最大编组辆数ni(辆/列)';
            } else if (busWaterSingle) {
              info = '单个客车上水栓流量qi(L/s)';
            } else if (produceLifeTotalFlow) {
              info = '生产生活房屋(含站房)设计总秒流量Q2(L/s)';
            } else if (waterSameRatio) {
              info = '同时用水系数k1';
            } else {
              info = '';
            }
            message.warn('请输入《' + info + '》');
          }

          //
        } else {
          //消防泵设计流量(L/s)
          try {
            const values = await validateFields(['firePumpDesignFlow']);
            const { firePumpDesignFlow } = values;
            openModalCount(true, { rateOfFlow: firePumpDesignFlow, type: 'fireFighting' });
          } catch (e) {
            message.warn('请填写《消防泵设计流量(L/s)》');
          }
        }
      }
      return {
        registerDrawer,
        registerForm,
        handleSubmit,
        handleClose,
        openDialog,
      };
    },
  });
</script>
