<template>
  <BasicModal
    v-bind="$attrs"
    @register="register"
    :title="'编辑车站'"
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
  import { formSchemaStationEditor } from './station.data';
  import { updateStation } from '../api/http';
  import { message } from 'ant-design-vue';

  export default defineComponent({
    components: { BasicModal, BasicForm },
    props: {
      userData: { type: Object },
    },
    emits: ['success'],
    setup(props, { emit }) {
      const modelRef = ref({});
      let messageStation = '车站修改成功';
      const [registerForm, { setFieldsValue, validate }] = useForm({
        labelWidth: 120,
        schemas: formSchemaStationEditor(),
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
        values.stationID = values.stationID ? values.stationID : 0;
        const { stationID, projectID, projectName, stationName, stationType } = values;
        updateStation({ stationID, projectID, projectName, stationName, stationType }).then(
          (res) => {
            if (typeof res === 'string') {
              emit('success');
              message.success(messageStation);
              closeModal();
            } else {
              return;
            }
          },
        );
      }
      function onDataReceive(data) {
        console.log('Data Received', data);
        // 方式1;
        setFieldsValue({
          stationName: data.stationName,
          stationType: data.stationType,
          projectID: data.projectID,
          projectName: data.projectName,
          stationID: data.stationID,
        });
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
