<template>
  <BasicModal
    v-bind="$attrs"
    @register="register"
    :title="typeStation ? '批量新增车站' : '编辑车站'"
    width="1000px"
    @ok="okHandle"
    @visible-change="handleVisibleChange"
  >
    <div class="pt-3px pr-3px">
      <BasicForm @register="registerForm" :model="model">
        <template #add="{ field }">
          <a-button v-if="field === 'symbol0'" @click="add">+</a-button>
          <a-button v-else @click="del(field)">-</a-button>
        </template>
      </BasicForm>
    </div>
  </BasicModal>
</template>
<script lang="ts">
  import { defineComponent, ref, nextTick } from 'vue';
  import { BasicModal, useModalInner } from '/@/components/Modal';
  import { BasicForm, useForm } from '/@/components/Form/index';
  import { addFormList, formSchemaStation } from './station.data';
  import { addBatchStation } from '../api/http';
  import { message } from 'ant-design-vue';
  import { dealParams } from './stationUtils';

  export default defineComponent({
    components: { BasicModal, BasicForm },
    props: {
      userData: { type: Object },
    },
    emits: ['success'],
    setup(props, { emit }) {
      const modelRef = ref({});
      let messageStation = '车站修改成功';
      const [
        registerForm,
        { setFieldsValue, validate, clearValidate, appendSchemaByField, removeSchemaByFiled },
      ] = useForm({
        labelWidth: 120,
        schemas: formSchemaStation(),
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
        const { projectID, stationName, stationType } = values;
        let arr = dealParams(values);
        arr = arr.concat([{ stationName, stationType }]);
        addBatchStation({ projectID, list: arr }).then((res) => {
          if (typeof res === 'string') {
            emit('success');
            message.success(messageStation);
            for (let i = 1; i < arr.length; i++) {
              removeSchemaByFiled([`stationName${i}`, `stationType${i}`, `${i}`]);
            }

            closeModal();
          } else {
            return;
          }
        });
      }
      const typeStation = ref(true);
      function onDataReceive(data) {
        // 方式1;
        setFieldsValue({
          projectID: data.projectID,
          stationName: data.likeQuery,
          stationType: undefined,
        });
        if (data.type === 'add') {
          typeStation.value = true;
          clearValidate(['stationName', 'stationType']);
          messageStation = '车站新增成功';
        } else {
          typeStation.value = false;
        }
      }

      function handleVisibleChange(v) {
        v && props.userData && nextTick(() => onDataReceive(props.userData));
      }
      const n = ref(1);
      function add() {
        addFormList(appendSchemaByField, n);
      }
      function del(field) {
        removeSchemaByFiled([`stationName${field}`, `stationType${field}`, `${field}`]);
        n.value--;
      }

      return {
        register,
        registerForm,
        model: modelRef,
        handleVisibleChange,
        okHandle,
        typeStation,
        add,
        del,
      };
    },
  });
</script>
