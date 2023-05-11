<template>
  <a-input
    class="input-color"
    v-model:value="inputValue"
    style="border: 1px solid green; background-color: yellow"
  >
    <template #suffix v-if="titleValue">
      <a-tooltip :title="titleValue">
        <info-circle-outlined style="color: rgba(0, 0, 0, 0.45)" />
      </a-tooltip>
    </template>
  </a-input>
</template>
<script lang="ts">
  import { InfoCircleOutlined } from '@ant-design/icons-vue';
  import { defineComponent, ref, watch } from 'vue';
  export default defineComponent({
    name: 'InputColor2',
    components: {
      InfoCircleOutlined,
    },
    setup() {
      const inputValue = ref<string>('');
      const titleValue = ref<string>('');
      watch(
        () => inputValue.value,
        (newValue) => {
          titleValue.value = newValue;
        },
        // { immediate: true },
      );
      return {
        inputValue,
        titleValue,
      };
    },
  });
</script>
