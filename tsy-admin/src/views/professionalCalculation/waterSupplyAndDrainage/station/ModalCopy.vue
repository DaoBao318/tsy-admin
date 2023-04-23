<template>
  <BasicModal
    v-bind="$attrs"
    @register="register"
    title="复制车站"
    @ok="okHandle"
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
  import { formSchemaStation } from './station.data';
  import { copyStation } from '../api/http';
  import { message } from 'ant-design-vue';

  export default defineComponent({
    components: { BasicModal, BasicForm },
    props: {
      userData: { type: Object },
    },
    emits: ['success'],
    setup(props, { emit }) {
      const modelRef = ref({});
      let messageStation = '车站复制成功';
      const [registerForm, { setFieldsValue, validate, clearValidate }] = useForm({
        labelWidth: 120,
        schemas: formSchemaStation(true),
        showActionButtonGroup: false,
        actionColOptions: {
          span: 24,
        },
      });

      const [register, { closeModal }] = useModalInner((data) => {
        data && onDataReceive(data);
      });
      async function okHandle() {
        const values = await validate();
        debugger;
        const { stationID, projectID, stationName } = values;
        copyStation({ stationID, projectID, stationName }).then((res) => {
          if (res.success) {
            emit('success');
            message.success(messageStation);
            closeModal();
          } else {
            message.warn(res.msg);
            return;
          }
        });
      }

      function onDataReceive(data) {
        console.log('Data Received', data);
        // 方式1;
        setFieldsValue({
          stationName: data.stationName + '___复制',
          stationType: data.stationType,
          projectID: data.projectID,
          projectName: data.projectName,
          stationID: data.stationID,
        });
        if (data.type === 'add') {
          clearValidate(['stationName', 'stationType']);
          messageStation = '车站新增成功';
        }
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
      };
    },
  });
</script>
