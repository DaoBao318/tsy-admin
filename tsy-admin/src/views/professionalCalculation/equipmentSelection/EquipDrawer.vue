<template>
  <BasicDrawer
    v-bind="$attrs"
    @register="registerDrawer"
    showFooter
    okText="计算"
    cancelText="关闭"
    :title="titleEquipment"
    width="100%"
    @close="handleClose"
    @ok="handleSubmit"
  >
    <!-- <CollapseContainer
      title="设备设施选型计算（长泰项目--常州南站--高铁-大型车站 ）"
      helpMessage="长泰项目--常州南站--高铁-大型车站 "
    >
  </CollapseContainer> -->
    <div :class="stylePadding">
      <BasicForm @register="registerForm">
        <template #add1>
          <a-button size="small" color="success" @click="openDialog('voltageStabilization')"
            >算</a-button
          >
        </template>
        <template #add2>
          <a-button size="small" color="success" @click="openDialog('fireFighting')">算</a-button>
        </template>
      </BasicForm>
    </div>
  </BasicDrawer>
</template>
<script lang="ts">
  import { defineComponent, watch, ref, computed, unref } from 'vue';
  import { BasicForm, useForm } from '/@/components/Form/index';
  import { formSchema } from './equip.data';
  import { BasicDrawer, useDrawerInner } from '/@/components/Drawer';
  import { saveEquipment } from './api/http';
  import { calculateEquip, initializeAssignmentStructure, saveDisplay } from './equipUtil';
  import { message } from 'ant-design-vue';
  import { keepTwoDecimalFull } from '/@/utils/calculation/count';
  import { CollapseContainer } from '/@/components/Container';
  import { EQUIP_TYPE } from './equipUtil';

  export default defineComponent({
    name: 'EquipDrawer',
    components: { BasicDrawer, BasicForm, CollapseContainer },
    emits: ['success', 'register', 'totalHead'],
    setup(_, { emit }) {
      // const treeData = ref<TreeItem[]>([]);
      const stylePadding = ref();
      if (window.screen.width > 1800) {
        stylePadding.value = 'largeScreen';
      } else {
        stylePadding.value = 'smallScreen';
      }
      const titleEquipment = ref('');
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
        labelWidth: 150,
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
        titleEquipment.value =
          '设施设备选型' + '(' + projectName + '-' + stationName + stationTypeName + ')';
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
          delete data.activeChlorineMes;
          delete data.modelSelectType1;
          delete data.modelSelectType2;
          saveEquipment(data).then((res) => {
            saveDisplay(updateSchema, setFieldsValue, res);
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
              'stationType',
            ]);
            const {
              busWaterRows,
              groupsNumber,
              busWaterSingle,
              produceLifeTotalFlow,
              waterSameRatio,
              stationType,
            } = values;
            //按照类型判断,中间站已经默认为0
            debugger;
            let waterSupplyDesignFlow = 0;
            const busWaterTotalFlow = busWaterRows * groupsNumber * busWaterSingle;
            if (EQUIP_TYPE.LARGE_STATION.includes(stationType)) {
              const temp = 3.6 * (busWaterTotalFlow + produceLifeTotalFlow * waterSameRatio);
              waterSupplyDesignFlow = keepTwoDecimalFull(temp, 1);
            } else if (EQUIP_TYPE.INTERMEDIATE_STATION.includes(stationType)) {
              const temp = 3.6 * (produceLifeTotalFlow * waterSameRatio);
              waterSupplyDesignFlow = keepTwoDecimalFull(temp, 1);
            } else if (EQUIP_TYPE.HIGH_SPEED_TRAIN_STATION.includes(stationType)) {
              const temp = 3.6 * (0.5 * busWaterTotalFlow + produceLifeTotalFlow * waterSameRatio);
              waterSupplyDesignFlow = keepTwoDecimalFull(temp, 1);
            }

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
              info = '同时上水排数';
            } else if (groupsNumber) {
              info = '列车最大编组';
            } else if (busWaterSingle) {
              info = '上水栓流量';
            } else if (produceLifeTotalFlow) {
              info = '房屋总秒流量';
            } else if (waterSameRatio) {
              info = '同时用水系数';
            } else {
              info = '';
            }
            message.warn('请输入《' + info + '》');
          }

          //
        } else {
          //消防泵设计流量(L/s)
          try {
            const values = await validateFields(['outdoorFireMaxStrength']);
            const { outdoorFireMaxStrength } = values;
            openModalCount(true, { rateOfFlow: outdoorFireMaxStrength, type: 'fireFighting' });
          } catch (e) {
            message.warn('请填写《消防秒流量》');
          }
        }
      }
      return {
        registerDrawer,
        registerForm,
        handleSubmit,
        handleClose,
        openDialog,
        titleEquipment,
        stylePadding,
      };
    },
  });
</script>
<style lang="less" scoped>
  .largeScreen {
    padding: 0 360px 0 250px;
  }
  .smallScreen {
    padding: 0 30px 0 35px;
  }
</style>
