<template lang="pug">
div
  //- a-button(v-if="true" @click="testApi") API测试
  Loading(:loading="loading" absolute="true" tip="正在加载车站信息")
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
      span {{ record.stationTypeValue }}
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
    template(#serviceDtoList="{model, field}")
      FormTable(
          :schemas="travelerUseTableSchemas" 
          ref="formTable"
          :initList='model[field]'
          showIndex
          )
    template(#pipeNetworkDtoList="{model, field}")
      FormTable(
          :schemas="travelerUseTableSchemas" 
          ref="formTable"
          :initList='model[field]'
          showIndex
          )
    template(#capitalConstructionDtoList="{model, field}")
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
  import { defineComponent, ref, unref, computed } from 'vue';
  import { XList, DrawerFormMode } from '/@/components-business/XList/v-2.0';
  import { useXListOptions, LAYERS } from './config.data';
  // import { addPage, batchPage } from './api/http';
  import { message } from 'ant-design-vue';
  import { editPage, getStationInfoList, updateStationType } from './api/http';
  import { BasicColumn } from '/@/components/Table/src/types/table';
  import FormTable from '/@/comps/FormTable2.vue';
  import { findLabelByValue } from '/@/utils/util';
  import { travelerUseTableSchemas } from './dataConfig/stationType1.data';
  import { STATION_TYPE_OPTIONS } from './dataConfig/constant';
  import { waterSourceStore } from '/@/store/modules/waterInfo';
  import { getTestAPI } from '/@/api/demo/system';
  import { Loading } from '/@/components/Loading';
  export default defineComponent({
    components: {
      XList,
      FormTable,
      Loading,
    },
    setup() {
      let store = waterSourceStore();
      // store.getAllItemList();
      const loading = computed(() => {
        return store.waterSupplyAndDrainageDetailsLoadingGetter;
      });
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
            await exec(updateStationType, record);
            // TODO: 发送接口数据；里面会自动刷新列表
            let params = { projectId: record.projectID, pageIndex: 1, pageSize: 50, totalCount: 0 };
            await exec(getStationInfoList, params);
          } else {
            console.log(record);
            record.stationName = 'WUHAN';
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

      function testApi() {
        getTestAPI({ useid: 1 });
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
        dataSource,
        selectedRows,
        batchExport,
        testApi,
        loading,
      };
    },
  });
</script>

<style lang="stylus" scoped>
  .warn-font
    color red
</style>
