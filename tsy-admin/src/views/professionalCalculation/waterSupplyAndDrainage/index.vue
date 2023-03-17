<template lang="pug">
div
  XList(
    :useXListOptions="useXListOptions"
    @getContext="cont => context = cont"
    @confirm="onConfirm"
    rowKey="id"
    :checkedIsDis = "{type: 'checkbox'}"
    @selectRow = "selectedRows"
    )
    template(#toolbar)
      a-button(type="default"  preIcon="mdi:export" @click="batchExport") 批量导出
    template(#stationType="{ record, text }")
      span {{ findLabelByValue(STATION_TYPE_OPTIONS, text) }}
      a-button.ml-1(type="default" size="small"  @click="onOpenDrawer(LAYERS.CHANGE_STATION_TYPE, record)") 变更
    template(#travelerUseList="{model, field}")
      FormTable(
          :schemas="travelerUseTableSchemas" 
          ref="formTable"
          :initList='model[field]'
          showIndex
          )
    template(#productUseList="{model, field}")
      FormTable(
          :schemas="travelerUseTableSchemas" 
          ref="formTable"
          :initList='model[field]'
          showIndex
          )
    template(#lifeUseList="{model, field}")
      FormTable(
          :schemas="travelerUseTableSchemas" 
          ref="formTable"
          :initList='model[field]'
          showIndex
          )
    template(#greenUseList="{model, field}")
      FormTable(
          :schemas="travelerUseTableSchemas" 
          ref="formTable"
          :initList='model[field]'
          showIndex
          )
    template(#serviceUseWaterSchemas="{model, field}")
      FormTable(
          :schemas="travelerUseTableSchemas" 
          ref="formTable"
          :initList='model[field]'
          showIndex
          )
    template(#pipelineUseWaterSchemas="{model, field}")
      FormTable(
          :schemas="travelerUseTableSchemas" 
          ref="formTable"
          :initList='model[field]'
          showIndex
          )
    template(#constructionUseWaterSchemas="{model, field}")
      FormTable(
          :schemas="travelerUseTableSchemas" 
          ref="formTable"
          :initList='model[field]'
          showIndex
          )
    template(#EditTip)
      .warn-font 提示：车站类型一旦变更，模版将发生变化，旧模版所有数据将会被清空，数据需要重新编辑；请谨慎操作！！！
</template>

<script lang="ts">
  import { defineComponent, ref, unref } from 'vue';
  import { XList, DrawerFormMode } from '/@/components-business/XList/v-2.0';
  import { useXListOptions, LAYERS } from './config.data';
  // import { addPage, batchPage } from './api/http';
  import { message } from 'ant-design-vue';
  import { editPage, editStation } from './api/http';
  import { BasicColumn } from '/@/components/Table/src/types/table';
  import FormTable from '/@/comps/FormTable2.vue';
  import { findLabelByValue } from '/@/utils/util';
  import { relativeColumns, travelerUseTableSchemas } from './dataConfig/stationType1.data';
  import { STATION_TYPE_OPTIONS } from './dataConfig/constant';
  import { waterSourceStore } from '/@/store/modules/waterInfo';

  export default defineComponent({
    components: {
      XList,
      FormTable,
    },
    setup() {
      let store = waterSourceStore();
      store.getAllItemList();
      //这个是在异步请求之前执行的
      // TODO:store.$patch({ allItemlist: [{}] });`
      let context = ref({ layers: {}, table: {} });
      const dataSource = ref<BasicColumn[]>([]);

      function onOpenDrawer(layerName, record = null) {
        const pop = unref(context)?.layers[layerName];
        if (layerName === LAYERS.CHANGE_STATION_TYPE) {
          pop.open(true, record, { mode: DrawerFormMode.EDIT });
        }
      }

      async function onConfirm({ exec, record, layerName }) {
        debugger;
        try {
          if (layerName === LAYERS.CHANGE_STATION_TYPE) {
            debugger;
            await exec(editStation, record);
            // TODO: 发送接口数据；里面会自动刷新列表
            // await exec(addPage, record);
            //if (layerName === LAYERS.PASSING_STATION)
          } else {
            console.log(record);
            record.station = 'WUHAN';
            record.traveler_recent_total = '800';
            context.value.layers[3].setDrawerProps(record);
            console.log(context, '---------------------');
            await exec(editPage, record);
          }
        } catch (err) {
          message.error(JSON.stringify(err));
        }
      }
      let selectedRow = [];
      function selectedRows(rows) {
        selectedRow = rows;
      }
      function batchExport() {
        if (selectedRow.length === 0) {
          message.warn('请选择一条数据', 3);
        } else {
          debugger;
        }
      }

      return {
        STATION_TYPE_OPTIONS,
        findLabelByValue,
        useXListOptions,
        travelerUseTableSchemas,
        context,
        onOpenDrawer,
        LAYERS,
        onConfirm,
        relativeColumns,
        dataSource,
        selectedRows,
        batchExport,
      };
    },
  });
</script>

<style lang="stylus" scoped>
  .warn-font
    color red
</style>
