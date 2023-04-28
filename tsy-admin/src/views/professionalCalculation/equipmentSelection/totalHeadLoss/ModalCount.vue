<template>
  <BasicModal
    v-bind="$attrs"
    @register="register"
    title="水头损失计算"
    okText="计算"
    cancelText="关闭"
    @ok="okHandle"
    @cancel="closeHandle"
    width="90%"
    :min-height="300"
    @visible-change="handleVisibleChange"
  >
    <div class="pt-3px pr-3px">
      <BasicForm @register="registerForm" :model="model" />
    </div>
  </BasicModal>
</template>
<script lang="ts">
  import { defineComponent, ref, nextTick } from 'vue';
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
      const modelRef = ref({});
      const [registerForm, { setFieldsValue, validate, getFieldsValue, clearValidate }] = useForm({
        labelWidth: 150,
        schemas: formSchemaCount,
        showActionButtonGroup: false,
        compact: true,
        size: 'small',
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
      };
    },
  });
</script>
