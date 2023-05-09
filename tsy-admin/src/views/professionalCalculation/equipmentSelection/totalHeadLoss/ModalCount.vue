<template>
  <BasicModal
    v-bind="$attrs"
    @register="register"
    title="水头损失计算"
    okText="计算"
    cancelText="关闭"
    @ok="okHandle"
    @cancel="closeHandle"
    width="60%"
    :min-height="350"
    @visible-change="handleVisibleChange"
  >
    <div :class="stylePaddingModal">
      <BasicForm @register="registerForm" :model="model" />
    </div>
  </BasicModal>
</template>
<script lang="ts">
  import { defineComponent, ref, nextTick, onBeforeUnmount } from 'vue';
  import { BasicModal, useModalInner } from '/@/components/Modal';
  import { BasicForm, useForm } from '/@/components/Form/index';
  import { formSchemaCount } from './count.data';
  import { pressureCalculation } from '../../pipelineCalculation/utils';

  export default defineComponent({
    components: { BasicModal, BasicForm },
    props: {
      userData: { type: Object },
    },
    emits: ['countValue'],
    setup(props, { emit }) {
      const stylePaddingModal = ref();
      const modelSetInterval = setInterval(() => {
        if (window.screen.width > 1800) {
          stylePaddingModal.value = 'largeScreen';
        } else {
          stylePaddingModal.value = 'smallScreen';
        }
      }, 1000);

      onBeforeUnmount(() => {
        clearInterval(modelSetInterval);
      });

      const modelRef = ref({});
      const [registerForm, { setFieldsValue, validate, getFieldsValue, clearValidate }] = useForm({
        labelWidth: 120,
        schemas: formSchemaCount,
        showActionButtonGroup: false,
        compact: true,
        size: 'default',
        actionColOptions: {
          span: 24,
        },
      });

      const [register, { closeModal }] = useModalInner((data) => {
        data && onDataReceive(data);
      });
      async function okHandle() {
        try {
          const values = await validate();
          pressureCalculation(values, setFieldsValue);
        } finally {
          console.log('计算完成');
        }
      }
      let fromDrawetobj = {};
      function onDataReceive(data) {
        console.log('Data Received', data);
        fromDrawetobj = data;
        setFieldsValue({
          rateOfFlow: data.rateOfFlow,
          pipeMaterial: undefined,
          nominalDiameter: undefined,
          hydraulicLossResult: undefined,
          hydraulicGradientResult: undefined,
          velocityOfFlowResult: undefined,
          velocityOfFlow: undefined,
          hydraulicGradient: undefined,
        });
        clearValidate();
      }
      function closeHandle() {
        const { hydraulicLossResult } = getFieldsValue();
        if (fromDrawetobj.type === 'voltageStabilization') {
          emit('countValue', { type: 'voltageStabilization', hydraulicLossResult });
        } else {
          emit('countValue', { type: 'fireFighting', hydraulicLossResult });
        }
        closeModal();
      }

      function handleVisibleChange(v) {
        v && props.userData && nextTick(() => onDataReceive(props.userData));
      }

      return {
        register,
        registerForm,
        model: modelRef,
        handleVisibleChange,
        okHandle,
        closeHandle,
        stylePaddingModal,
      };
    },
  });
</script>
<style lang="stylus" scoped>
  .largeScreen {
    padding: 40px 100px 0 100px;
    >>> .ant-divider-inner-text {
      font-weight: 900;
      position: absolute;
      top: -12px;
      left: -40px;
      font-size: 15px;
    }
    >>> .ant-form-item-required{
      color: red;
    }
  }
  .smallScreen {
    padding: 10px 0 0 0;
    >>> .ant-divider-inner-text {
      font-weight: 900;
      position: absolute;
      top: -12px;
      left: -40px;
      font-size: 15px;
    }
    >>> .ant-form-item-required{
      color: red;
    }
  }
</style>
