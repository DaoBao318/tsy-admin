<template lang="pug">
div.geipaishui
  //- a-button(v-if="true" @click="testApi") API测试
  Loading(:loading="loading" :absolute="true" tip="正在加载车站信息")
  XList(
    :useXListOptions="useXListOptions"
    @getContext="cont => context = cont"
    @confirm="onConfirm"
    rowKey="stationID"
    :checkedIsDis = "{type: 'checkbox'}"
    )
    template(#toolbar)
      a-button(type="default" preIcon="ant-design:rollback-outlined"  @click="backPage") 返回项目
      a-button(type="default" preIcon="ant-design:rollback-outlined"  @click="backPageCalculate") 用水项目编辑
      a-button(type="default" preIcon="mdi:export"  @click="batchExport") 批量导出
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
          :schemas="servicesUseTableSchemas" 
          ref="formTable"
          :initList='model[field]'
          showIndex
          )
    template(#pipeNetworkDtoList="{model, field}")
      FormTable(
          :schemas="servicesUseTableSchemas" 
          ref="formTable"
          :initList='model[field]'
          showIndex
          )
    template(#capitalConstructionDtoList="{model, field}")
      FormTable(
          :schemas="servicesUseTableSchemas" 
          ref="formTable"
          :initList='model[field]'
          showIndex
          )
    template(#designSewageVolumeNewDtoList="{model, field}")
      FormTable(
          :schemas="servicesUseTableSchemas" 
          ref="formTable"
          :initList='model[field]'
          showIndex
          )
    template(#makeMaxDrainageDtoList="{model, field}")
      FormTable(
          :schemas="servicesUseTableSchemas" 
          ref="formTable"
          :initList='model[field]'
          showIndex
          )
    template(#passengerTrainsFecalSewageDtoList="{model, field}")
      FormTable(
          :schemas="servicesUseTableSchemas" 
          ref="formTable"
          :initList='model[field]'
          showIndex
          ) 
    template(#pipeAndCapitalConstructionDtoList="{model, field}")
      FormTable(
          :schemas="servicesUseTableSchemas" 
          ref="formTable"
          :initList='model[field]'
          showIndex
          )       
    template(#EditTip) 
      .warn-font 提示：车站类型一旦变更，模版将发生变化，旧模版所有数据将会被清空，数据需要重新编辑；请谨慎操作！！！
</template>

<script lang="ts">
  import { defineComponent, ref, unref, computed, onMounted } from 'vue';
  import { XList, DrawerFormMode } from '/@/components-business/XList/v-2.0';
  import { useXListOptions, LAYERS } from './config.data';
  // import { addPage, batchPage } from './api/http';
  import { message } from 'ant-design-vue';
  import { saveComputeData, updateStationType } from './api/http';
  import { BasicColumn } from '/@/components/Table/src/types/table';
  import FormTable from '/@/comps/FormTable2.vue';
  import { findLabelByValue } from '/@/utils/util';
  import { travelerUseTableSchemas, servicesUseTableSchemas } from './dataConfig/stationType1.data';
  import { STATION_TYPE_OPTIONS } from './dataConfig/constant';
  import { waterSourceStore } from '/@/store/modules/waterInfo';
  import { getTestAPI } from '/@/api/demo/system';
  import { Loading } from '/@/components/Loading';
  import { dealSaveData, getRouterQuery } from './utilsWaterSupplyAndDrainage';
  import { exportExcel } from './api/http';
  import { useRouter } from 'vue-router';

  export default defineComponent({
    components: {
      XList,
      FormTable,
      Loading,
    },
    setup() {
      let store = waterSourceStore();
      window.queryParams = getRouterQuery();
      const router = useRouter();
      store.waterSupplyAndDrainageProjectTypeAction(window.queryParams.projectType);
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
      window.contextLoad = context;
      onMounted(() => {
        context.value.table.getForm().setFieldsValue({ projectID: window.queryParams.projectName });
      });

      async function onConfirm({ exec, record, layerName, type }) {
        if (layerName === LAYERS.CHANGE_STATION_TYPE) {
          await exec(updateStationType, record);
          // TODO: 发送接口数据；里面会自动刷新列表
          setTimeout(() => {
            context.value.table.reload();
          }, 1000);
        } else {
          if (type === 'export') {
            const { projectName, computeID, projectID, stationID, stationType } = record;

            const waterProjectWDtolist = [{ computeID, projectID, stationID, stationType }];
            const exportNameObj = { projectName };
            exportExcel({ waterProjectWDtolist, exportNameObj });
          } else {
            console.log(record);
            let params = dealSaveData(record);
            await exec(saveComputeData, params);
            setTimeout(() => {
              context.value.table.reload();
            }, 1000);
          }
        }
        // try {

        // } catch (err) {
        //   message.error(JSON.stringify(err));
        // }
      }
      function batchExport() {
        let selectRows = context.value.table.getSelectRows();

        let selectedRows = selectRows.filter((item) => {
          return item.computeID;
        });
        let selectedRowsTips = selectRows
          .filter((item) => {
            return !item.computeID;
          })
          .map((item) => item.stationName);
        let waterProjectWDtolist = selectedRows.map((item) => {
          return {
            computeID: item.computeID,
            projectID: item.projectID,
            stationID: item.stationID,
            stationType: item.stationType,
          };
        });
        if (selectedRows.length === 0) {
          if (selectRows.length === 0) {
            message.warn('请先选择一条数据', 3);
          } else {
            message.warn('所选的数据中，未包含计算过的数据，请先计算后再导出', 3);
          }
        } else {
          if (selectedRowsTips.length > 0) {
            message.warn(selectedRowsTips.join('、') + '；请新增之后再导出', 3);
          }
          if (selectedRows.length > 0) {
            const { projectName, stationName, stationTypeValue } = selectedRows[0];
            const exportNameObj = { projectName, stationName, stationTypeValue };
            exportExcel({ waterProjectWDtolist, exportNameObj });
          }
        }
      }
      function backPage() {
        router.push({ name: 'WaterSupplyAndDrainage' });
      }
      function backPageCalculate() {
        // projectID=2&projectName=常泰普铁项目&projectType=OrdinaryRailway
        const { projectID, projectName, projectType } = window.queryParams;
        router.push({
          name: 'Station',
          query: {
            projectID,
            projectName,
            projectType,
          },
        });
      }

      function testApi() {
        getTestAPI({ useid: 1 });
      }
      return {
        STATION_TYPE_OPTIONS,
        findLabelByValue,
        useXListOptions,
        travelerUseTableSchemas,
        servicesUseTableSchemas,
        context,
        onOpenDrawer,
        LAYERS,
        onConfirm,
        dataSource,
        batchExport,
        backPage,
        backPageCalculate,
        testApi,
        loading,
      };
    },
  });
</script>

<style lang="less" scoped>
  .warn-font {
    margin-bottom: 60px;
    color: red;
  }
</style>
