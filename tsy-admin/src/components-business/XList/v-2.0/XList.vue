<template lang="pug">
div
  //- 【1. basicTable】
  BasicTable(@register="rejecterTable" v-on="tableEvents" :rowKey="rowKey" :rowSelection="checkedIsDis" @selection-change="handelSelectChange" v-if="!hideBasicTable")
    template(#action="{ record }")
      TableAction(:actions="getTableActions(record)")
    template(#toolbar)
      slot(name="toolbar")
    template(#headerTop)
      slot(name='headerTop')
    //- table中查看详情🔎
    template(#X2_VIEW_DETAIL="data")
      ViewDetailColumn(:data='data' @click='handleDetail(data)') 
    //- 1.2处理table-column中slots
    template(#[item]='data', v-for='item in filterTableSlots(Object.keys($slots))')
      slot(:name='item', v-bind='data || {}')
  //- 【2. layer层组件Drawer/Modal】
  template(v-if="registerLayersArr.length")
    template(v-for='(layer, index) in registerLayersArr', :key='index')
      component(
        :is='componentMap.get(layer.component || "DrawerForm").default'
        @register='layer.register',
        v-bind='{ ...layer.componentProps }',
        :useFormOptions="layer.useFormOptions"
        :layerName="layer.layerName"
        :context="context"
        @confirm="onConfirm"
      )    
        //- 2.2 处理drawer或modal中的slots
        template(
          v-for="(formSlot, slotIdx) in layer.slotsNames"
          #[formSlot]='data',
          :key='slotIdx'
        )
          slot(
            :name='formSlot',
            v-bind='data || {}',
          )

</template>

<script lang="ts">
  import { defineComponent, unref, ref } from 'vue';
  import _ from 'lodash';
  import { getTableEvents } from '../utils';
  import { BasicTable, TableAction } from '/@/components/Table';
  import { useXList } from './hooks/useXList';
  import { componentMap } from './hooks/useComponentRegister';
  import { UseXListOptions } from './types';
  import { cloneDeep } from 'lodash-es';
  import ViewDetailColumn from './components/ViewDetailColumn.vue';
  import { message } from 'ant-design-vue';
  import { DrawerFormMode } from './components/DrawerForm';
  import { ActionItem2 } from './setActions';

  export default defineComponent({
    name: 'XList',
    components: { BasicTable, TableAction, ViewDetailColumn },
    props: {
      useXListOptions: {
        type: Object as PropType<UseXListOptions>,
        required: true,
      },
      rowKey: {
        type: String,
        default: 'id',
      },
      // 是否隐藏BasicTable,类似只需要引用xlist2中的drawer/model
      hideBasicTable: {
        type: Boolean,
        default: false,
      },
      checkedIsDis: {
        type: Object,
      },
    },
    emits: ['getContext', 'confirm', 'selectRow'],
    setup(props, { emit, attrs }) {
      const { useXListOptions } = unref(props);
      const { useTableOptions } = useXListOptions;
      const createActions = useTableOptions?.createActions;
      const { rejecterTable, context, registerLayersArr } = useXList(useXListOptions);
      emit('getContext', context);

      function filterTableSlots(slotKeys: string[]): string[] {
        const tableSlotsNames: string[] = ['action'];
        const { columns } = useXListOptions.useTableOptions || {};
        columns.forEach(({ slots }) => {
          if (slots) {
            tableSlotsNames.push(slots.customRender);
          }
        });
        return _.intersection(tableSlotsNames, slotKeys);
      }
      function getTableActions(record): ActionItem2[] {
        return createActions
          ? createActions(cloneDeep(record), context, { proxyRecord: record })
          : [];
      }

      function handleDetail({ record }) {
        const actions = getTableActions(record);
        const idx = actions.findIndex((item) => item?.flag === 'X2_VIEW_DETAIL');
        if (idx === -1) {
          message.error(`找不到有type为edit的操作按钮`);
          return;
        }
        if (!actions[idx]?.onClick) {
          message.error(`请给编辑 添加查看的handler函数`);
          return;
        }
        actions[idx]?.onClick?.(DrawerFormMode.VIEW);
      }
      function handelSelectChange({ keys, rows }) {
        emit('selectRow', keys);
      }

      return {
        getTableActions,
        registerLayersArr: ref(registerLayersArr),
        filterTableSlots,
        componentMap,
        rejecterTable,
        onConfirm: (obj) => emit('confirm', obj),
        context,
        tableEvents: getTableEvents(attrs),
        handleDetail,
        handelSelectChange,
      };
    },
  });
</script>
