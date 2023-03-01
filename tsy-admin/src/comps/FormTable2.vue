<template lang="pug">
.reward-table
  .toolbar.mb-1
    m-button(type="primary" preIcon="ic:sharp-add-shopping-cart" @click='addOneItem') 新增
    slot(name="toolbar", :data="{ addOneItem, getFieldsValues }")
  .ant-table-thead
    a-row.tr(type='flex')
      //- a-col.ant-form-item.th(:span='1')
      template(v-for='(item, index) in schemas')
        a-col.ant-form-item.th(
          v-if='!(item.ifShow === false)',
          v-show="!(item.show === false)"
          :span='item?.colProps?.span || restSpan',
          :class='{ required: item.required, "margin-left": "5px" }'
        ) {{ item.label }}
  .ant-table-body
    .ant-table-body-empty(v-if='!dataSource || !dataSource.length', @click='addOneItem')
      SvgIcon(name='dynamic-avatar-3', :size='42')
      .empty-desc 暂无数据
    a-form(ref='formRef', :model='dataSource')
      a-row.tr(type='flex', v-for='(model, index) in dataSource', :key='index')
        //- a-col.ant-form-item.th(:span='1')
        //-   span {{ index + 1}}
        template(v-for='item in schemas')
          a-col.ant-form-item.th(
            v-if="!(item.ifShow === false)"
            v-show="!(item.show === false)"
            :span='item?.colProps?.span || restSpan',
          ) 
            a-form-item(
              v-if="item.ifShow !== false && !item.slot"
              v-show="!(item.show === false)"
              :label='item.label',
              :key='[index, item.field]',
              :name='[index, item.field]',
              :rules='rules(item)'
            )
              component(
                :is='componentMap.get(item.component)',
                v-model:value='model[item.field]',
                v-bind='typeof item.componentProps === "function" ? item.componentProps({ formModel: model, form: formRef, index }) : item.componentProps || {}'
              )
            template(v-else)
              template(v-if='item.slot === "no"')
                span {{ model[item.field] }}
              template(v-else-if='item.slot === "defaultAction"')
                .action
                  MinusCircleOutlined(@click='handleRemove(index)')
                  ArrowUpOutlined(@click='handleUp(index)', v-if='index')
                  ArrowDownOutlined(
                    @click='handleDown(index)',
                    v-if='index !== dataSource.length - 1'
                  )
              template(v-else-if="item.slot")
                slot(:name='item.slot' v-bind='{ model, field: item.field, index, fns: { handleRemove, handleUp, handleDown } } || {}')

</template>
<script lang="ts">
  import { defineComponent, ref, unref, watch, computed } from 'vue';
  import { componentMap } from '/@/components/Form/src/componentMap';
  import { Form } from 'ant-design-vue';
  import { SvgIcon } from '/@/components/Icon/index';
  import { MinusCircleOutlined, ArrowUpOutlined, ArrowDownOutlined } from '@ant-design/icons-vue';

  export default defineComponent({
    components: { SvgIcon, MinusCircleOutlined, ArrowUpOutlined, ArrowDownOutlined, Form },
    props: {
      initList: {
        type: Array,
        default: () => [],
      },
      schemas: {
        type: Array,
        default: () => [],
      },
      // 针对固定的table条数
      fixedItemNum: {
        type: Number,
        default: 0,
      },
      // 索引名，有的是id 或者 reward_index
      indexName: {
        type: String,
        default: 'index',
      },
      showIndex: {
        type: Boolean,
        default: true,
      },
    },
    setup(props) {
      const formRef = ref(null);
      const dataSource = ref<any[]>([]);
      const index = ref<number>(1);
      const indexProp = unref(props).indexName;

      // 添加一项
      function addOneItem() {
        dataSource.value.push({
          [indexProp]: index.value,
        });
        index.value++;
      }

      watch(
        () => props.initList,
        (list = []) => {
          dataSource.value = list;
          // 如果是固定奖励项数的
          const pushLen = unref(props.fixedItemNum) - list.length;
          if (pushLen > 0) {
            for (let i = list.length; i < pushLen; i++) {
              // dataSource.value.push({});
            }
          }
        },
        { immediate: true }
      );

      // 删除一项
      function handleRemove(index: number) {
        dataSource.value.splice(index, 1);
      }

      function handleUp(i: number) {
        const index = unref(i);
        const current = dataSource.value[index];
        dataSource.value[index] = dataSource.value[index - 1];
        dataSource.value[index - 1] = current;
      }

      function handleDown(i: number) {
        const index = unref(i);
        const current = dataSource.value[index];
        dataSource.value[index] = dataSource.value[index + 1];
        dataSource.value[index + 1] = current;
      }

      function getFieldsValues() {
        return formRef.value.validate().then(() => {
          return unref(dataSource);
        });
      }
      const rules = (schema) => {
        return [
          {
            required: schema.required,
            message: `请${schema.component === 'Select' ? '选择' : '输入'}${schema.label}`,
          },
        ];
      };

      // 计算剩余span
      const restSpan = computed(() => {
        let grandTotalCol = 0;
        props.schemas.forEach((item: any) => {
          if (item.colProps && Object.keys(item.colProps).length) {
            const { span = 0, offset = 0 } = item.colProps;
            grandTotalCol += span + offset;
          }
        });
        return props.showIndex ? 24 - grandTotalCol - 1 : 24 - grandTotalCol;
      });

      const restSlots = computed(() => {
        const slots: string[] = [];
        props.schemas.forEach((item: any) => {
          if (item.slot) {
            if (item.slot !== 'no' && item.slot !== 'action') {
              slots.push(item.slot);
            }
          }
        });
        return slots;
      });

      return {
        addOneItem,
        handleRemove,
        getFieldsValues,
        handleUp,
        handleDown,
        formRef,
        componentMap,
        dataSource,
        rules,
        restSpan,
        restSlots,
      };
    },
  });
</script>

<style lang="stylus" scoped>
  .reward-table {
    width: 100%;
    // border: 1px solid #f0f0f0;
    border-right: 0;
    border-bottom: 0;
    border-collapse: separate;
    border-spacing: 0;

    >>> .ant-form-item-label {
      display: none;
    }

    >>> .ant-cascader-picker-large {
      width: 100%;
    }
  }

  .ant-table-thead {
    height: 40px;
  }

  .ant-table-thead > .tr > .th {
    color: rgba(0, 0, 0, 0.95);
    font-weight: 500;
    background: #fafafa;
    border-bottom: 1px solid #f0f0f0;
    transition: background 0.3s ease;
    text-align: center;
    height: 40px;
  }

  >>> .ant-form-item {
    text-align: center;
    margin-bottom: 0 !important;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    padding: 8px;
  }

  .ant-form-item.required::before {
    display: inline-block;
    margin-right: 4px;
    color: #ff4d4f;
    font-size: 14px;
    font-family: SimSun, sans-serif;
    line-height: 1;
    content: '*';
    background: #fff;
  }

  .ant-table-body-empty {
    border-right: 1px solid #f0f0f0;
    border-left: 1px solid #f0f0f0;
    background: #fff;
    padding: 32px 0;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }

  .empty-desc {
    color: rgba(0, 0, 0, 0.25);
    font-size: 14px;
  }

  .basic-form:nth-child(2n) {
    background-color: #fafafa;
  }

  .action .anticon {
    color: #1890ff;
    font-size: 16px;
    margin-right: 4px;
  }

  .add-new {
    color: #40a9ff !important;
    font-weight: bolder;
    border-color: #40a9ff;
  }

  .toolbar {
    text-align: right;
  }

  >>> .tcs-basic-form .ant-form-item {
    margin-bottom: 0 !important;
  }

  .ant-table-body {
    // max-height: 500px
    overflow-y: auto;
    border-bottom: 2px solid #f0f0f0;

    &::-webkit-scrollbar {
      display: none; /* Chrome Safari */
    }

    .tr {
      border-bottom: 1px solid #f0f0f0;
    }
  }
</style>
