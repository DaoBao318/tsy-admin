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
        :data-source="mockData"
        :target-keys="targetKeys"
        show-search
        :filter-option="
          (inputValue, item) => {
            return item.waterProject.indexOf(inputValue) !== -1;
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
  import { difference } from 'lodash-es';
  import { allDate } from './stationUtils';
  interface MockData {
    key: string;
    waterUseProject: string;
    waterProject: string;
    unit: string;
  }
  type tableColumn = Record<string, string>;
  const mockData: MockData[] = [];

  // 用水项目  waterUseProject 用水明细 waterProject  单位 unit

  const leftTableColumns = [
    {
      dataIndex: 'waterUseProject',
      title: '用水类别',
    },
    {
      dataIndex: 'waterProject',
      title: '用水项目',
    },
    {
      dataIndex: 'unit',
      title: '单位',
    },
  ];
  const rightTableColumns = [
    {
      dataIndex: 'waterUseProject',
      title: '用水类别',
    },
    {
      dataIndex: 'waterProject',
      title: '用水项目',
    },
    {
      dataIndex: 'unit',
      title: '单位',
    },
  ];
  export default defineComponent({
    components: { BasicModal },
    props: {
      userData: { type: Object },
    },
    setup(props) {
      //穿梭框数据
      debugger;
      const targetKeys = ref<string[]>([]);
      const leftColumns = ref<tableColumn[]>(leftTableColumns);
      const rightColumns = ref<tableColumn[]>(rightTableColumns);

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
        // for (let i = 0; i < 20; i++) {
        //   mockData.push({
        //     key: i.toString(),
        //     title: `content${i + 1}`,
        //     description: `description of content${i + 1}`,
        //   });
        // }
        if (mockData.length === 0) {
          allDate.forEach((item, index) => {
            item.key = index.toString();
            mockData.push(item);
          });
        }

        targetKeys.value = mockData.filter((item) => +item.key % 3 > 1).map((item) => item.key);

        //获取传递的值，进行set值
      }

      function handleVisibleChange(v) {
        v && props.userData && nextTick(() => onDataReceive(props.userData));
      }

      function filterWater(inputValue, item) {
        return (inputValue, item) => item.waterProject.indexOf(inputValue) !== -1;
      }
      function okHandle(params) {
        //获取选中值的key；
        targetKeys;
        // contentDialog.closeModal();
        debugger;
      }

      return {
        register,
        handleVisibleChange,
        okHandle,

        mockData,
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
