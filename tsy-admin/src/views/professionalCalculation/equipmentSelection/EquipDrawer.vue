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
    <a-tabs v-model:activeKey="activeKey" :class="stylePaddingDrawer">
      <a-tab-pane key="1" tab="给水设备设施选型">
        <div class="equipt-basis water-supply">
          <BasicForm @register="registerForm">
            <template #add1>
              <a-button
                size="small"
                preIcon="carbon:calculator-check"
                type="primary"
                @click="openDialog('voltageStabilization')"
                >算</a-button
              >
            </template>
            <template #add2>
              <a-button
                size="small"
                type="primary"
                preIcon="carbon:calculator-check"
                @click="openDialog('fireFighting')"
                >算</a-button
              >
            </template>
          </BasicForm>
        </div>
      </a-tab-pane>
      <a-tab-pane key="2" tab="排水设备设施选型">
        <div class="equipt-basis water-drainage">
          <BasicForm @register="registerFormDrainage">
            <template #add1>
              <a-button
                size="small"
                preIcon="carbon:calculator-check"
                type="primary"
                @click="openDialog('type1')"
                >算</a-button
              >
            </template>
            <template #add2>
              <a-button
                size="small"
                type="primary"
                preIcon="carbon:calculator-check"
                @click="openDialog('type2')"
                >算</a-button
              >
            </template>
            <template #add3>
              <a-button
                size="small"
                type="primary"
                preIcon="carbon:calculator-check"
                @click="openDialog('type3')"
                >算</a-button
              >
            </template>
            <template #add4>
              <a-button
                size="small"
                type="primary"
                preIcon="carbon:calculator-check"
                @click="openDialog('type4')"
                >算</a-button
              >
            </template>
            <template #add5>
              <a-button
                size="small"
                type="primary"
                preIcon="carbon:calculator-check"
                @click="openDialog('type5')"
                >算</a-button
              >
            </template>
            <template #add6>
              <a-button
                size="small"
                type="primary"
                preIcon="carbon:calculator-check"
                @click="openDialog('type6')"
                >算</a-button
              >
            </template>
          </BasicForm>
        </div></a-tab-pane
      >
    </a-tabs>
    <Loading :loading="loading" :absolute="true" tip="正在计算" />
  </BasicDrawer>
</template>
<script lang="ts">
  import { defineComponent, ref, onBeforeUnmount, nextTick, onMounted, watch, computed } from 'vue';
  import { BasicForm, useForm } from '/@/components/Form/index';
  import { formSchema } from './equip.data';
  import { BasicDrawer, useDrawerInner } from '/@/components/Drawer';
  import { Loading } from '/@/components/Loading';
  import {
    getStationDeviceSelectionDrainageEdit,
    saveEquipment,
    saveEquipmentDrainage,
  } from './api/http';

  import {
    calculateEquip,
    initializeAssignmentStructure,
    judgmentType,
    saveDisplay,
  } from './equipUtil';
  import { message } from 'ant-design-vue';
  import { keepTwoDecimalFull } from '/@/utils/calculation/count';
  import { EQUIP_TYPE } from './equipUtil';
  import { formSchemaDrainage } from './drainage.data';
  import {
    caculateDrainage,
    chonseTypeEquip,
    dealSaveDataDrainage,
    displayProcess,
    initDrainage,
    nc,
    saveDisplayDrainage,
  } from './drainageUtil';
  import { waterSourceStore } from '/@/store/modules/waterInfo';

  export default defineComponent({
    name: 'EquipDrawer',
    components: { BasicDrawer, BasicForm, Loading },
    emits: ['success', 'register', 'totalHead'],
    setup(_, { emit }) {
      const store = waterSourceStore();
      const loading = computed(() => {
        return store.waterSupplyAndDrainageDetailsLoadingGetter;
      });
      const activeKey = ref('1');
      const stylePaddingDrawer = ref();
      // const drawerSetInterval = setInterval(() => {
      //   if (window.screen.width > 1800) {
      //     stylePaddingDrawer.value = 'largeScreen';
      //   } else {
      //     stylePaddingDrawer.value = 'smallScreen';
      //   }
      // }, 1000);
      // onBeforeUnmount(() => {
      //   clearInterval(drawerSetInterval);
      // });
      onMounted(() => {
        nextTick(() => {
          resizeFun();
          window.addEventListener('resize', resizeFun);
          document.addEventListener('keydown', onkeydownFn);
        });
      });
      onBeforeUnmount(() => {
        window.removeEventListener('resize', resizeFun);
        document.removeEventListener('keydown', onkeydownFn);
      });
      const resizeFun = () => {
        if (window.screen.width > 1800) {
          stylePaddingDrawer.value = 'largeScreen';
        } else {
          stylePaddingDrawer.value = 'smallScreen';
        }
      };
      const onkeydownFn = (e) => {
        if (e && e.keyCode === 13) {
          e.target.blur();
        }
      };
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
      const [
        registerFormDrainage,
        {
          clearValidate: clearValidateDrainage,
          setFieldsValue: setFieldsValueDrainage,
          validate: validateDrainage,
          validateFields: validateFieldsDrainage,
          updateSchema: updateSchemaDrainage,
        },
      ] = useForm({
        labelWidth: 150,
        baseColProps: { span: 24 },
        schemas: formSchemaDrainage,
        showActionButtonGroup: false,
        compact: true,
        size: 'small',
      });
      let basicData: any = {};
      let openModalCount;
      const [registerDrawer, { setDrawerProps }] = useDrawerInner(async (data) => {
        // 初始化赋值给水
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
      watch(
        () => activeKey.value,
        (newValue) => {
          if (newValue === '2') {
            setTimeout(() => {
              const { projectID, stationID } = basicData;
              // 初始化赋值排水
              // resetFieldsDrainage();
              // 请求数据的回调中
              getStationDeviceSelectionDrainageEdit({ projectID, stationID }).then((res) => {
                initDrainage(updateSchemaDrainage, setFieldsValueDrainage, { res });
                let technologyType = 'GreenReuseSBR';
                if (!!res.technologyType) {
                  technologyType = res.technologyType;
                }
                chonseTypeEquip(technologyType, updateSchemaDrainage);
                displayProcess(technologyType, updateSchemaDrainage);

                clearValidateDrainage();
              });
            }, 0);
          }
        },
        { immediate: true },
      );
      async function handleSubmit() {
        if (activeKey.value === '1') {
          try {
            const values = await validate();
            values.stationType = basicData.stationType;
            const flag = calculateEquip(values, setFieldsValue);
            if (flag) {
              return;
            }
            const newValues = await validate();
            const data = Object.assign(newValues, basicData);
            delete data.activeChlorineMes;
            delete data.modelSelectType1;
            delete data.modelSelectType2;
            store.waterSupplyAndDrainageDetailsLoadingAction(true);
            saveEquipment(data).then((res) => {
              saveDisplay(setFieldsValue, res);
              message.success('给水设备选型数据保存成功');
              store.waterSupplyAndDrainageDetailsLoadingAction(false);
              // closeDrawer();
            });
          } finally {
            setDrawerProps({ confirmLoading: false });
          }
        } else {
          //计算排水保存
          try {
            const values = await validateDrainage();
            caculateDrainage(values, setFieldsValueDrainage);
            const newValues = await validateDrainage();
            const data = dealSaveDataDrainage(newValues);
            store.waterSupplyAndDrainageDetailsLoadingAction(true);
            saveEquipmentDrainage(data).then((res) => {
              saveDisplayDrainage(setFieldsValueDrainage, res);
              store.waterSupplyAndDrainageDetailsLoadingAction(false);
              message.success('排水设备选型数据保存成功');
              // closeDrawer();
            });
          } finally {
            setDrawerProps({ confirmLoading: false });
          }
        }
      }
      async function handleClose() {
        activeKey.value = '1';
        emit('success');
        return;
      }
      async function openDialog(type) {
        emit('totalHead', { setFieldsValue, setFieldsValueDrainage });
        if (type === 'voltageStabilization') {
          try {
            const values = await validateFields([
              'busWaterRows',
              'groupsNumber',
              'busWaterSingle',
              'waterSameRatio',
              'stationType',
              'dnMwoMax',
            ]);
            const {
              busWaterRows,
              groupsNumber,
              busWaterSingle,
              stationType,
              dnMwoMax,
              waterSameRatio,
            } = values;
            let produceLifeTotalFlow = 0;
            let divisionCoefficient = 16;
            if (EQUIP_TYPE.INTERMEDIATE_STATION.includes(stationType)) {
              divisionCoefficient = 12;
            }
            produceLifeTotalFlow = (dnMwoMax * waterSameRatio) / divisionCoefficient;
            //按照类型判断,中间站已经默认为0
            let waterSupplyDesignFlow = 0;
            const busWaterTotalFlow = busWaterRows * groupsNumber * busWaterSingle;
            if (EQUIP_TYPE.LARGE_STATION.includes(stationType)) {
              const temp = busWaterTotalFlow + produceLifeTotalFlow;
              waterSupplyDesignFlow = keepTwoDecimalFull(temp, 1);
            } else if (EQUIP_TYPE.INTERMEDIATE_STATION.includes(stationType)) {
              const temp = produceLifeTotalFlow;
              waterSupplyDesignFlow = keepTwoDecimalFull(temp, 1);
            } else if (EQUIP_TYPE.HIGH_SPEED_TRAIN_STATION.includes(stationType)) {
              const temp = 0.5 * busWaterTotalFlow + produceLifeTotalFlow;
              waterSupplyDesignFlow = keepTwoDecimalFull(temp, 1);
            }

            setFieldsValue({ waterSupplyDesignFlow });
            openModalCount(true, {
              rateOfFlow: waterSupplyDesignFlow,
              type: 'voltageStabilization',
            });
          } catch (e) {
            const { busWaterRows, groupsNumber, busWaterSingle, dnMwoMax, waterSameRatio } =
              getFieldsValue();
            let info = '';
            if (judgmentType(busWaterRows) === 'null') {
              info = '同时上水排数';
            } else if (judgmentType(groupsNumber) === 'null') {
              info = '列车最大编组';
            } else if (judgmentType(busWaterSingle) === 'null') {
              info = '上水栓流量';
            } else if (judgmentType(dnMwoMax) === 'null') {
              info = '最大用水量';
            } else if (judgmentType(waterSameRatio) === 'null') {
              info = '房屋变化系数';
            } else {
              info = '';
            }
            message.warn('请输入《' + info + '》');
          }

          //
        } else if (type === 'fireFighting') {
          //消防泵设计流量(L/s)
          try {
            const values = await validateFields(['outdoorFireMaxStrength']);
            const { outdoorFireMaxStrength } = values;
            openModalCount(true, { rateOfFlow: outdoorFireMaxStrength, type: 'fireFighting' });
          } catch (e) {
            message.warn('请填写《消防秒流量》');
          }
        } else if (type === 'type1') {
          //处理污水量
          try {
            const values = await validateFieldsDrainage(['sewageTreatmentCapacity']);
            const { sewageTreatmentCapacity } = values;
            const adjustWellPumpFlow = keepTwoDecimalFull(
              ((sewageTreatmentCapacity / 18) * 6) / 1.5,
              3,
            );
            setFieldsValueDrainage({ adjustWellPumpFlow });
            openModalCount(true, {
              rateOfFlow: adjustWellPumpFlow,
              type: 'type1',
            });
          } catch (e) {
            message.warn('请填写《处理污水量》');
          }
        } else if (type === 'type2') {
          //处理污水量
          try {
            const values = await validateFieldsDrainage(['sewageTreatmentCapacity']);
            const { sewageTreatmentCapacity } = values;
            const pumpingWellPumpFlow = keepTwoDecimalFull(sewageTreatmentCapacity / 18, 3);
            setFieldsValueDrainage({ pumpingWellPumpFlow });
            openModalCount(true, {
              rateOfFlow: pumpingWellPumpFlow,
              type: 'type2',
            });
          } catch (e) {
            message.warn('请填写《处理污水量》');
          }
        } else if (type === 'type3') {
          //处理污水量
          try {
            const values = await validateFieldsDrainage(['sprinklerFlowRate']);
            const { sprinklerFlowRate } = values;
            const reusePumpFlow = keepTwoDecimalFull(sprinklerFlowRate * 4 * 3.6, 3);
            setFieldsValueDrainage({ reusePumpFlow });
            openModalCount(true, {
              rateOfFlow: reusePumpFlow,
              type: 'type3',
            });
          } catch (e) {
            message.warn('请填写《洒水栓流量》');
          }
        } else if (type === 'type4') {
          //处理污水量
          try {
            const values = await validateFieldsDrainage(['mbrSewageTreatmentCapacity']);
            const { mbrSewageTreatmentCapacity } = values;
            const mbrAdjustWellPumpFlow = keepTwoDecimalFull(mbrSewageTreatmentCapacity / 24, 3);
            openModalCount(true, {
              rateOfFlow: mbrAdjustWellPumpFlow,
              type: 'type4',
            });
          } catch (e) {
            message.warn('请填写《处理污水量》');
          }
        } else if (type === 'type5') {
          //处理污水量
          try {
            const values = await validateFieldsDrainage(['pumpingWellSewageMeasure']);
            const { pumpingWellSewageMeasure } = values;
            const coefficientOfVariation = nc(
              keepTwoDecimalFull(pumpingWellSewageMeasure / 24 / 3.6, 1),
            ); // 变化系数
            const submersibleSewagePumpFlow = keepTwoDecimalFull(
              (pumpingWellSewageMeasure * coefficientOfVariation) / 24,
              3,
            );

            setFieldsValueDrainage({ submersibleSewagePumpFlow });
            openModalCount(true, {
              rateOfFlow: submersibleSewagePumpFlow,
              type: 'type5',
            });
          } catch (e) {
            message.warn('请填写《抽升井污水量》');
          }
        } else if (type === 'type6') {
          //处理污水量
          try {
            const values = await validateFieldsDrainage(['amountOilyWastewater', 'workTime']);
            const { amountOilyWastewater, workTime } = values;
            const inletSubmersibleSewagePumpFlow = keepTwoDecimalFull(
              amountOilyWastewater / workTime,
              3,
            );
            setFieldsValueDrainage({ inletSubmersibleSewagePumpFlow });
            openModalCount(true, {
              rateOfFlow: inletSubmersibleSewagePumpFlow,
              type: 'type6',
            });
          } catch (e) {
            message.warn('请填写《处理污水量》或者《设备工作小时》');
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
        stylePaddingDrawer,
        activeKey,
        registerFormDrainage,
        loading,
      };
    },
  });
</script>
<style lang="stylus" scoped>
  .largeScreen {
    >>> .ant-tabs-bar.ant-tabs-top-bar{
      margin: 0 320px 15px 150px;
    }
    .equipt-basis{
      padding: 0 360px 0 250px;
      >>> .ant-form-item-required{
        color: red;
      }
      >>> .ant-divider-inner-text {
        font-weight: 900;
        position: absolute;
        top: -12px;
        left: -40px;
        font-size: 15px;
      }
      >>> .ant-col-23{
        .ant-divider-inner-text {
        font-weight: 600;
        position: absolute;
        top: -12px;
        left: -20px;
        font-size: 14px;
      }
      }
      >>> .ant-col-19{
        .ant-form-item-no-colon{
          position: relative;
          top: 5px;
        }
        .ant-form-item-label{
          border: 1px solid #d9d9d9;
          text-align: center;
        }
        .ant-input{
          height: 30px;
        }
      }
      >>> .ant-col-22{
        .ant-divider-horizontal.ant-divider-with-text::before, .ant-divider-horizontal.ant-divider-with-text::after{
          border-top: 0 solid;
        }
        .ant-divider-inner-text{
          padding: 4px 100px 4px 116px;
          color: red;
        }
        .ant-col-24{
          height:30px;
        }
      }

    }

  }
  .smallScreen {
    >>> .ant-tabs-bar.ant-tabs-top-bar{
      margin: 0 30px 0 10px;
    }
    .equipt-basis{
      padding: 0 30px 0 35px;
      >>> .ant-divider-inner-text {
        font-weight: 900;
        position: absolute;
        top: -12px;
        left: -40px;
        font-size: 15px;
      }
      >>> .ant-col-23{
        .ant-divider-inner-text {
          font-weight: 600;
          position: absolute;
          top: -12px;
          left: -20px;
          font-size: 14px;
        }
      }
      >>> .ant-col-19{
        .ant-form-item-no-colon{
          position: relative;
          top: 5px;
        }
        .ant-form-item-label{
          border: 1px solid #d9d9d9;
          text-align: center;
        }
        .ant-input{
          height: 30px;
        }
      }
      >>> .ant-form-item-required{
        color: red;
      }
      >>> .ant-col-22{
        .ant-divider-horizontal.ant-divider-with-text::before, .ant-divider-horizontal.ant-divider-with-text::after{
          border-top: 0 solid;
        }
        .ant-divider-inner-text{
          padding: 4px 100px 4px 116px;
          color: red;
        }
        .ant-col-24{
          height:30px;
        }
      }
    }

  }
</style>
