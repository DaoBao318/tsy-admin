<template>
  <div>
    <div class="top-line">
      <div class="line-left"></div>
      <div class="line-right">
        <div class="item-left">切换项目</div>
        <div class="item-right">普通铁路</div>
      </div>
      <!-- <a-button @click="handler">获取项目信息</a-button> -->
    </div>
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
    <div style="display: flex; justify-content: end; margin: 10px 5px">
      <a-space>
        <a-button>批量导出</a-button>
        <a-button>批量重置</a-button>
      </a-space>
    </div>
  </div>
</template>
<script lang="ts">
import type { SelectProps } from 'ant-design-vue';
import { defineComponent, ref } from 'vue';
export default defineComponent({
  setup() {
    const options = ref<SelectProps['options']>([
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
    return {
      value: ref<string | undefined>(undefined),
      filterOption,
      handleBlur,
      handleFocus,
      handleChange,
      options,
    };
  },
});
</script>
<style lang="less" scoped>
.top-line {
  display: flex;
  justify-content: flex-end;
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
</style>