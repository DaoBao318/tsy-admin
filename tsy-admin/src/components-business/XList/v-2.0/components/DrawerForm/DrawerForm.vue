<template lang="pug">
BasicDrawer(
  v-bind="drawerProps"
  @register='registerDrawer'
  @ok="toSubmit('confirm')"
  @close="closeDialog"
  @export = "toSubmit('export')"
)
  div(:class="stylePaddingXlistDrawer")
    BasicForm(@register='registerForm')
      template(#[item]='data', v-for='item in Object.keys($slots)')
        slot(:name='item', v-bind='data || {}')
    p(class="annotationContent") {{ outDataValue && outDataValue.annotationContent }}
</template>
<script lang="ts">
  import { defineComponent, ref, unref, onBeforeUnmount,onMounted,nextTick } from 'vue';
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
      const stylePaddingXlistDrawer = ref();
      // const drawerSetInterval = setInterval(() => {
      //   if (window.screen.width > 1800) {
      //     stylePaddingXlistDrawer.value = 'largeScreenXlist';
      //   } else {
      //     stylePaddingXlistDrawer.value = 'smallScreenXlist';
      //   }
      // }, 1000);
      // onBeforeUnmount(() => {
      //   clearInterval(drawerSetInterval);
      // });
      onMounted(() => {
        nextTick(() => {
          resizeFun();
          window.addEventListener('resize', resizeFun);
        });
      });
      onBeforeUnmount(() => {
        window.removeEventListener('resize', resizeFun);
      });
      const resizeFun = () => {
        if (window.screen.width > 1800) {
          stylePaddingXlistDrawer.value = 'largeScreenXlist';
        } else {
          stylePaddingXlistDrawer.value = 'smallScreenXlist';
        }
      };
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
      const outDataValue = ref(null);
      const [registerDrawer, { closeDrawer, changeOkLoading }] = useDrawerInner((outData) => {
        resetFields();
        if (Array.isArray(outData)) {
          debugger;
          const [data, outDrawerProps] = outData;
          outDataValue.value = data;
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
      const closeDialog = () => {};
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
          // message.success('提交成功');
          changeOkLoading(false);
          // closeDrawer();
          message.success('水量计算保存成功');
          // props.context?.table?.reload();
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
        closeDialog,
        stylePaddingXlistDrawer,
        outDataValue,
      };
    },
  });
</script>
<style lang="stylus" scoped>
  .largeScreenXlist {
    padding: 0 160px 0 150px;
    >>> .ant-divider-inner-text {
      font-weight: 900;
      // position: absolute;
      // top: -12px;
      // left: -40px;
      font-size: 15px;
    }
    .annotationContent{
      color: #666e;
      margin: 10px 0px;
      padding: 15px 20px;
      font-size: 14px;
      font-weight: 600;
      background: #eee;
      text-indent: 2em;
    }
  }
  .smallScreenXlist {
    padding: 0 12px 0 10px;
    >>> .ant-divider-inner-text {
      font-weight: 900;
      // position: absolute;
      // top: -12px;
      // left: -40px;
      font-size: 15px;
    }
    .annotationContent{
      color: #666e;
      margin: 10px 0px;
      padding: 10px 20px;
      font-size: 14px;
      font-weight: 600;
      background: #eee;
      text-indent: 2em;
    }
  }
</style>
