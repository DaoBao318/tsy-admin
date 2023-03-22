<template>
  <BasicForm @register="register1" @submit="handleSubmit" />
</template>
<script lang="ts">
  import { defineComponent, nextTick, ref } from 'vue';
  import { BasicForm, FormSchema, useForm } from '/@/components/Form/index';
  import { CollapseContainer } from '/@/components/Container/index';
  import { useMessage } from '/@/hooks/web/useMessage';
  let dynamicDisabled = ref<any>(false);
  const schemas: FormSchema[] = [
    {
      field: 'field1',
      component: 'Input',
      label: '字段1',
      subLabel: '二级标签',
      suffix: '组件后面',
      dynamicDisabled: dynamicDisabled,
      colProps: {
        span: 8,
        style: { minWidth: '100%' },
      },
      componentProps: ({ formModel, formActionType }) => {
        return {
          placeholder: '请选择内容',

          onChange: async (e: any) => {
            console.log(e);
          },
        };
      },
      // componentProps: () => {
      //   return {
      //     placeholder: '自定义placeholder',
      //     onChange: async (e: any) => {
      //       console.log(e.target.value);
      //     },
      //   };
      // },
    },
    { label: '', field: 'field3', component: 'Divider' },
    {
      field: 'field2',
      component: 'Input',
      label: '字段1',
      subLabel: '二级标签',
      suffix: '组件后面',
      helpMessage: 'zujiantishineri',
      helpComponentProps: {
        text: '内容提示',
        color: 'red',
      },
      colProps: {
        span: 8,
      },
    },
  ];

  export default defineComponent({
    components: { BasicForm, CollapseContainer },
    setup() {
      const { createMessage } = useMessage();
      const [register1, { setProps, setFieldsValue }] = useForm({
        labelWidth: 120,
        schemas,

        // layout: 'vertical',
        // showActionButtonGroup: false,
        actionColOptions: {
          span: 24,
        },
      });
      setProps({ model: { field1: 'wbb3' } });
      nextTick(() => {
        setProps({ model: { field1: 'wbb3' } });
        // setFieldsValue({ field1: 'wbb1' });
      });

      return {
        register1,
        handleSubmit: (values: any) => {
          setFieldsValue({ field1: 'wbb' });
          dynamicDisabled.value = !dynamicDisabled.value;
          createMessage.success('click search,values:' + JSON.stringify(values));
        },
        setProps,
      };
    },
  });
</script>
