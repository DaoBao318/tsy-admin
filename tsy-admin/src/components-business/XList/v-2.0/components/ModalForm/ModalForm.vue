<template lang="pug">
BasicModal(
  v-bind='$attrs',
  @register='registerModal',
  showFooter,
  :title='title',
  width='500px',
  :minHeight='60'
  @ok="handleSubmit"
)
  BasicForm(@register='registerForm')
    template(#[item]='data', v-for='item in Object.keys($slots)')
      slot(:name='item', v-bind='data || {}')
</template>
<script lang="ts">
  import { defineComponent, unref } from 'vue';
  import { BasicModal, useModalInner } from '/@/components/Modal';
  import { BasicForm, useForm } from '/@/components/Form/index';
  import { message } from 'ant-design-vue';

  export default defineComponent({
    components: {
      BasicForm,
      BasicModal,
    },
    props: {
      title: String,
      useFormOptions: Object,
      layerName: String,
    },
    emits: ['confirm', 'register'],
    setup(props, { emit }) {
      const { useFormOptions } = unref(props);
      console.log(useFormOptions);
      const [registerForm, { resetFields, setFieldsValue, validate }] = useForm({
        ...useFormOptions,
        showActionButtonGroup: false,
      });

      const [registerModal, { closeModal, changeOkLoading }] = useModalInner(async (outData) => {
        resetFields();
        const [data] = outData;
        setFieldsValue(data);
      });

      const handleSubmit = async () => {
        let record = null;
        try {
          record = await validate(); // 校验必填项目
        } catch (err) {
          message.error('有必填项目还未填写，请检查！！！');
          return;
        }
        const success = () => {
          message.success('提交成功');
          changeOkLoading(false);
          closeModal();
        };
        const fail = () => {
          changeOkLoading(false);
        };
        emit('confirm', {
          layerName: props.layerName,
          record,
          exec: (fn, data = record) => {
            if (!fn) {
              message.error('需要传入执行函数');
            }
            if (fn) {
              try {
                changeOkLoading(true);
                fn(data).then(success).catch(fail);
              } catch (e) {
                fail();
              }
            }
          },
        });
      };
      return {
        registerForm,
        registerModal,
        cancel: () => {
          closeModal();
        },
        handleSubmit,
      };
    },
  });
</script>
