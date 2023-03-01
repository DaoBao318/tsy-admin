<template lang="pug">
.color-wrap
    a-input.color-box(:style="{ background: innerColr || 'transparent' }" disabled)
    a-input.hex(v-model:value="innerColr" v-bind="$attrs")
</template>

<script lang="ts">
  import { defineComponent, computed } from 'vue';

  export default defineComponent({
    name: 'ColorInput',
    props: {
      value: {
        type: String,
        default: '', // argb颜色
      },
    },
    emits: ['update:value', 'change'],
    setup(props, { emit }) {
      const innerColr = computed({
        get: () => props.value,
        set: (val) => {
          emit('update:value', val);
          // 这个存在时用全局组件配置才能生效
          emit('change', val);
        },
      });
      return {
        innerColr,
      };
    },
  });
</script>

<style lang="stylus" scoped>
  .color-wrap
      display: flex
      align-items: center
      justify-content: flex-start
      .hex
        width 90%
      .color-box
        width 10%
</style>
