<template lang="pug">
BasicDrawer(
  v-bind="drawerProps"
  @register='registerDrawer'
  @ok="toSubmit('confirm')"
  @export = "toSubmit('export')"
)
  BasicForm(@register='registerForm')
    template(#[item]='data', v-for='item in Object.keys($slots)')
      slot(:name='item', v-bind='data || {}')
</template>
<script lang="ts">
  import { defineComponent, ref, unref } from 'vue';
  import _ from 'lodash';
  import { BasicForm, useForm } from '/@/components/Form/index';
  import { BasicDrawer, useDrawerInner } from '/@/components/Drawer';
  import Icon from '/@/components/Icon/index';
  import { DrawerFormMode } from './typing';
  import { message } from 'ant-design-vue';
  // import { useWatermark } from '/@/hooks/web/useWatermark';

  const DRAWER_TITLE: Record<DrawerFormMode, string> = {
    [DrawerFormMode.VIEW]: '查看',
    [DrawerFormMode.EDIT]: '编辑',
    [DrawerFormMode.ADD]: '新增',
    [DrawerFormMode.COPY]: '复制新建',
  };

  type drawerProps = {
    isDetail?: boolean;
    loading?: boolean;
    loadingText?: string;
    showDetailBack?: boolean;
    closeFunc?: () => Promise<boolean>;
    showFooter?: boolean;
    footerHeight?: number;
    mode?: number;
    maskClosable: boolean;
  };

  export default defineComponent({
    components: { BasicForm, BasicDrawer, Icon },
    props: {
      title: String,
      useFormOptions: Object,
      layerName: String,
      context: Object,
    },
    emits: ['confirm', 'register', 'export'],
    setup(props, { emit }) {
      const { useFormOptions } = unref(props);
      const confirmLoading = ref<boolean>(false);
      const drawerTitle = ref('');
      // const { setWatermark, clear } = useWatermark();
      const [registerForm, { setFieldsValue, validate, resetFields }] = useForm({
        ...useFormOptions,
        showActionButtonGroup: false,
      });
      const drawerProps = ref<drawerProps>({
        isDetail: false,
        showDetailBack: true,
        showFooter: true,
        mode: DrawerFormMode.ADD,
        maskClosable: false,
      });

      const [registerDrawer, { closeDrawer, changeOkLoading }] = useDrawerInner((outData) => {
        resetFields();
        if (Array.isArray(outData)) {
          const [data, outDrawerProps] = outData;
          let { mode = DrawerFormMode.ADD, ...other } = outDrawerProps;
          if (typeof mode !== 'number') {
            mode = DrawerFormMode.EDIT;
          }
          const isDetailMode = mode === DrawerFormMode.VIEW;
          if (isDetailMode) {
            // setWatermark('详情，编辑无用');
          } else {
            // clear();
          }

          Object.assign(drawerProps.value, other, {
            // showFooter: !isDetailMode,
            showOkBtn: !isDetailMode,
            maskClosable: isDetailMode,
            mode,
            title: other.title ? other.title : `${DRAWER_TITLE[mode] || ''}${props.title}`,
          });
          setFieldsValue(data);
        } else {
          setFieldsValue(outData);
        }
      });

      async function toSubmit(type) {
        let record = null;
        try {
          record = await validate(); // 校验必填项目
        } catch (err) {
          message.error('有必填项目还未填写，请检查！！！');
          changeOkLoading(false);
          return;
        }
        const success = () => {
          message.success('提交成功');
          changeOkLoading(false);
          closeDrawer();
          props.context?.table?.reload();
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
          type,
        });
      }

      return {
        registerDrawer,
        registerForm,
        cancel: () => {
          closeDrawer();
        },
        drawerTitle,
        confirmLoading,
        DrawerFormMode,
        drawerProps,
        toSubmit,
      };
    },
  });
</script>
