<template lang="pug">
a-tooltip(placement='topLeft') 
  template(#title) 点击查看详情
  span.cursor-pointer.ant-btn-link(
    @click="!disabled ? $emit('click') : ''"
    :class="{disabled: disabled}"
    ) {{ data.text }}
</template>
<script lang="ts">
  import { defineComponent } from 'vue';
  export default defineComponent({
    props: {
      data: Object,
      disabled: Boolean,
    },
    emits: ['click'],
    setup() {},
  });
</script>

<style lang="stylus" scoped>
  .disabled
    color: #bbb
</style>
