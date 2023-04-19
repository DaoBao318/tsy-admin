<template>
  <BasicModal
    v-bind="$attrs"
    @register="register"
    @ok="okHandle"
    title="选择用水项目"
    width="1000px"
    :defaultFullscreen="true"
    :min-height="360"
    @visible-change="handleVisibleChange"
  >
    <div class="pt-3px pr-3px">
      <a-transfer
        :data-source="transformData"
        :target-keys="targetKeys"
        show-search
        :filter-option="
          (inputValue, item) => {
            return item.waterProjectName.indexOf(inputValue) !== -1;
          }
        "
        :show-select-all="true"
        @change="onChange"
      >
        <template
          #children="{ direction, filteredItems, selectedKeys, onItemSelectAll, onItemSelect }"
        >
          <a-table
            :row-selection="
              getRowSelection({
                selectedKeys,
                onItemSelectAll,
                onItemSelect,
              })
            "
            :columns="direction === 'left' ? leftColumns : rightColumns"
            :data-source="filteredItems"
            size="small"
            :custom-row="
              ({ key }) => ({
                onClick: () => {
                  onItemSelect(key, !selectedKeys.includes(key));
                },
              })
            "
          />
        </template>
      </a-transfer>
    </div>
  </BasicModal>
</template>
<script lang="ts">
  import { defineComponent, ref, nextTick } from 'vue';
  import { BasicModal, useModalInner } from '/@/components/Modal';
  import { difference, cloneDeep } from 'lodash-es';
  import { TransformData, transformTableColumns } from './station.data';
  import { transformToTableRaw } from './stationUtils';

  type tableColumn = Record<string, string>;

  // 用水项目  classificationName 用水明细 waterProjectName  单位 unit

  export default defineComponent({
    components: { BasicModal },
    props: {
      userData: { type: Object },
    },
    emits: ['selectData'],
    setup(props, { emit }) {
      //穿梭框数据
      const transformData = ref<TransformData[]>([]);
      const targetKeys = ref<string[]>([]);
      let dataRaw = [];
      const leftColumns = ref<tableColumn[]>(transformTableColumns);
      const rightColumns = ref<tableColumn[]>(transformTableColumns);

      const onChange = (nextTargetKeys: string[]) => {
        targetKeys.value = nextTargetKeys;
      };

      const getRowSelection = ({
        selectedKeys,
        onItemSelectAll,
        onItemSelect,
      }: Record<string, any>) => {
        return {
          onSelectAll(selected: boolean, selectedRows: Record<string, string | boolean>[]) {
            const treeSelectedKeys = selectedRows.map(({ key }) => key);
            const diffKeys = selected
              ? difference(treeSelectedKeys, selectedKeys)
              : difference(selectedKeys, treeSelectedKeys);
            onItemSelectAll(diffKeys, selected);
          },
          onSelect({ key }: Record<string, string>, selected: boolean) {
            onItemSelect(key, selected);
          },
          selectedRowKeys: selectedKeys,
        };
      };

      const [register, contentDialog] = useModalInner((data) => {
        data && onDataReceive(data);
      });

      function onDataReceive(data) {
        console.log('Data Received', data);
        //数据初始化
        transformData.value = [];
        dataRaw = cloneDeep(data.list);
        data.list.forEach((item) => {
          item.key = item.id.toString();
          transformData.value.push(item);
        });

        targetKeys.value = data.waterSelected;

        //获取传递的值，进行set值
      }

      function handleVisibleChange(v) {
        v && props.userData && nextTick(() => onDataReceive(props.userData));
      }

      function filterWater(inputValue, item) {
        return (inputValue, item) => item.waterProjectName.indexOf(inputValue) !== -1;
      }
      function okHandle() {
        //获取选中值的key；
        const seletcedData = transformToTableRaw(targetKeys.value, dataRaw);
        emit('selectData', seletcedData);
        contentDialog.closeModal();
      }

      return {
        register,
        handleVisibleChange,
        okHandle,

        transformData,
        targetKeys,
        leftColumns,
        rightColumns,
        onChange,
        getRowSelection,
        filterWater,
      };
    },
  });
</script>
