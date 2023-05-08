<template>
  <a-input-number v-model:value="value" style="width: 100%" :step="0.1" string-mode />
</template>
<script lang="ts">
  import { defineComponent, ref } from 'vue';
  export default defineComponent({
    name: 'InputNumberExpand1',
    setup() {
      const value = ref<string>('1');

      return {
        value,
      };
    },
  });
</script>
