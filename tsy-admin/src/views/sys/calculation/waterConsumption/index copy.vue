<template>
  <div style="border: 1px solid white; padding: 10px 20px">
    <div class="top-line">
      <div class="line-left"></div>
      <div class="line-right">
        <div class="item-left">切换项目</div>
        <a-select
          v-model:value="value"
          show-search
          placeholder="Select a person"
          style="width: 200px"
          :options="options"
          :filter-option="filterOption"
          @focus="handleFocus"
          @blur="handleBlur"
          @change="handleChange"
        />
        <div class="item-right">普通铁路</div>
      </div>
      <!-- <a-button @click="handler">获取项目信息</a-button> -->
    </div>
    <div style="display: flex; justify-content: end; margin: 10px 5px">
      <a-space>
        <a-button>批量导出</a-button>
        <a-button>批量重置</a-button>
      </a-space>
    </div>

    <a-table :columns="columns" :data-source="dataSource" :row-selection="rowSelection" bordered>
      <template #bodyCell="{ column, text, record }">
        <template v-if="['name', 'typeStation', 'address'].includes(column.dataIndex)">
          <div>
            <!-- <a-input
              v-if="text === '中间站' && editableData[record.key]"
              v-model:value="editableData[record.key][column.dataIndex]"
              style="margin: -5px 0"
            /> -->
            <a-select
              v-if="column.dataIndex === 'typeStation' && !record.typeStation"
              v-model:value="dataSource[record.key][column.dataIndex]"
              show-search
              placeholder="请先选择车站类型"
              style="width: 200px"
              :options="optionsType"
            />

            <template v-else>
              <span v-if="column.dataIndex === 'typeStation'"> {{ valueToLabel[text] }}</span>
              <span v-else> {{ text }}</span>
            </template>
          </div>
        </template>
        <template v-else-if="column.dataIndex === 'operation'">
          <div class="editable-row-operations">
            <span v-if="record.typeStation && record.address !== '15m3 '">
              <a @click="computedWater(record)">计算</a>
            </span>
            <span v-else-if="record.address === '15m3 '">
              <a @click="editWater(record)">编辑</a>
              <a-divider type="vertical" />
              <a @click="detailWater(record)">详情</a>
              <a-divider type="vertical" />
              <a @click="exportWater(record)">导出</a>
              <a-divider type="vertical" />
              <a @click="resetWater(record)">重置</a>
            </span>
            <span v-else>
              <a>请先选择车站类型</a>
            </span>
          </div>
        </template>
      </template>
    </a-table>
  </div>
</template>

<script lang="ts">
import type { SelectProps, TableProps, TableColumnType } from 'ant-design-vue';
import { defineComponent, ref, reactive, onMounted, computed } from 'vue';
// import * as Api from "@/api";
import type { UnwrapRef } from 'vue';
const columns = [
  {
    title: '序号',
    width: '5%',
    dataIndex: 'index',
    key: 'index',
    customRender: ({ index }: any) => {
      return index + 1;
    },
  },
  {
    title: '车站名称',
    dataIndex: 'name',
    width: '15%',
  },
  {
    title: '车站类型',
    dataIndex: 'typeStation',
    width: '15%',
  },
  {
    title: '昼夜最大用水量（m3）',
    dataIndex: 'address',
    width: '15%',
  },
  {
    title: '昼夜最大排水量（m3）',
    dataIndex: 'address',
    width: '15%',
  },
  {
    title: '操作',
    width: '35%',
    dataIndex: 'operation',
  },
];
interface DataItem {
  key: string;
  name: string;
  typeStation: string;
  address: string;
}
export default defineComponent({
  setup() {
    const options = ref<any>([]);
    const handleChange = (value: string) => {
      console.log(`selected ${value}`);
    };
    const handleBlur = () => {};
    const handleFocus = () => {
      console.log('focus');
    };
    const filterOption = (input: string, option: any) => {
      return option.label.toLowerCase().indexOf(input.toLowerCase()) >= 0;
    };
    onMounted(async () => {
      // let opResult = await Api.Water.TestWater();
      options.value = [
        { value: 'type1', label: '中间站' },
        { value: 'type2', label: '会让站' },
        { value: 'type3', label: '越行站' },
      ];
    });
    const handler = async () => {
      // let opResult = await Api.Water.TestProduct();
      options.value = [];
    };
    let optionsType = ref<any>([]);
    optionsType.value = [
      { value: 'type1', label: '中间站' },
      { value: 'type2', label: '会让站' },
      { value: 'type3', label: '越行站' },
    ];
    let valueToLabel: any = {
      type1: '中间站',
      type2: '会让站',
      type3: '会让站',
    };

    //表格内容
    const data: DataItem[] = [];
    for (let i = 0; i < 100; i++) {
      data.push({
        key: i.toString(),
        name: `北京--武汉段1 ${i}`,
        typeStation: '',
        address: `${10 + i}m3 `,
      });
    }

    const dataSource = ref(data);
    const rowSelection: TableProps['rowSelection'] = {
      onChange: (selectedRowKeys: string[], selectedRows: DataItem[]) => {
        console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
      },
      getCheckboxProps: (record: DataItem) => ({
        disabled: record.name === 'Disabled User', // Column configuration not to be checked
        name: record.name,
      }),
    };
    const computedWater = (record) => {};
    const editWater = (record) => {};
    const detailWater = (record) => {};
    const exportWater = (record) => {};
    const resetWater = (record) => {};
    return {
      value: ref<string | undefined>(undefined),
      filterOption,
      handleBlur,
      handleFocus,
      handleChange,
      options,
      handler,

      dataSource,
      columns,
      editingKey: '',
      computedWater,
      editWater,
      detailWater,
      exportWater,
      resetWater,
      rowSelection,
      optionsType,
      valueToLabel,
    };
  },
});
</script>
<style lang="less" scoped>
.top-line {
  display: flex;
  justify-content: end;
  margin-top: 20px;
  .line-right {
    display: flex;
    .item-right,
    .item-left {
      align-self: center;
    }
    .item-right {
      margin-left: 10px;
      margin-right: 20px;
    }
    .item-left {
      margin-right: 10px;
    }
  }
}
.editable-row-operations a {
  margin-right: 8px;
}
</style>