<template>
  <a-input
    class="input-color"
    v-model:value="value"
    :title="value"
    style="border: 1px solid green; background-color: yellow"
  />
</template>
<script lang="ts">
  import { defineComponent, ref } from 'vue';
  export default defineComponent({
    name: 'InputColor',
    setup() {
      const value = ref<string>('');

      return {
        value,
      };
    },
  });
</script>
