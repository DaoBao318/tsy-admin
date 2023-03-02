// basicTableTest01\index.vue
<template>
  <BasicTable
    title="基础示例"
    titleHelpMessage="温馨提醒"
    :columns="columns"
    :dataSource="data"
    :canResize="canResize"
    :loading="loading"
    :striped="striped"
    :bordered="border"
    :pagination="{ pageSize: 20 }"
    showTableSetting
    @selection-change="handelSelectChange"
    :rowSelection="{ type: 'checkbox' }"
  >
    <template #toolbar>
      <a-button type="primary"> 操作按钮</a-button>
    </template>
  </BasicTable>
</template>
<script lang="ts">
  import { defineComponent, ref } from 'vue';
  import { BasicTable } from '/@/components/Table';
  import { getBasicColumns, getBasicData } from './tableData';
  export default defineComponent({
    name: 'ViewsTableTestBasicTableTest01',
    components: { BasicTable },
  });
</script>
<script lang="ts" setup>
  const columns = getBasicColumns(); //获取表头数据
  const data = getBasicData(); // 获取表格数据
  const canResize = ref(false);
  const loading = ref(false);
  const striped = ref(false);
  const border = ref(false);
  const handelSelectChange = () => {};
</script>
