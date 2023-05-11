<template>
  <a-input-number v-model:value="value" style="width: 40%" :step="0.01" string-mode />
</template>
<script lang="ts">
  import { defineComponent, ref } from 'vue';
  export default defineComponent({
    name: 'InputNumberExpand42',
    setup() {
      const value = ref<string>('1');

      return {
        value,
      };
    },
  });
</script>
