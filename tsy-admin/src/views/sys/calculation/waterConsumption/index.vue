<template lang="pug">
div
  div.top-line
    .line-left
      .item-left 切换项目
    a-select(
      v-model:value="value"
      show-search
      placeholder="选择一个项目"
      style="width: 200px"
      :options="options"
      :filter-option="filterOption"
      @focus="handleFocus"
      @blur="handleBlur"
      @change="handleChange"
    )
    .line-right
      .item-right 普通铁路
  div(style="display: flex; justify-content: end; margin: 10px 5px")
    a-space
      a-button 批量导出
      a-button 批量重置
  a-table(
    :columns="columns"
    :data-source="dataSource"
    :row-selection="rowSelection"
    bordered
  )
      template( #typeStation="{record,text}")
        a-select(
          v-if="!record.typeStation"
          v-model:value="dataSource[record.key].typeStation"
          show-search
          placeholder="请先选择车站类型"
          style="width: 200px"
          :options="optionsType"
        )
        template(v-else)  {{valueToLabel[text]}}
      template(#operation="{record}")
        div.editable-row-operations
          span( v-if="record.typeStation && record.address !== '15m3 '")
            a(@click="computedWater(record)") 计算
          span(v-else-if="record.address === '15m3 '")
            a(@click="editWater(record)") 编辑
            a-divider(type="vertical")
            a(@click="detailWater(record)") 详情 
            a-divider(type="vertical")
            a(@click="exportWater(record)") 导出
            a-divider(type="vertical")
            a(@click="resetWater(record)") 重置
          a(v-else) 请先选择车站类型
</template>
<script lang="ts">
  import { defineComponent, ref } from 'vue';
  import type { TableProps } from 'ant-design-vue';
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
      slots: { customRender: 'typeStation' },
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
      slots: { customRender: 'operation' },
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
      const options = ref<any[]>([
        { value: 'jack', label: 'Jack' },
        { value: 'lucy', label: 'Lucy' },
        { value: 'tom', label: 'Tom' },
      ]);
      const handleChange = (value: string) => {
        console.log(`selected ${value}`);
      };
      const handleBlur = () => {
        console.log('blur');
      };
      const handleFocus = () => {
        console.log('focus');
      };
      const filterOption = (input: string, option: any) => {
        return option.value.toLowerCase().indexOf(input.toLowerCase()) >= 0;
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
    justify-content: flex-end;
    margin-top: 20px;
    .line-right,
    .line-left {
      display: flex;
      align-items: center;

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
