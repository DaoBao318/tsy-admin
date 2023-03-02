<template>
  <div class="class-item"></div>
  <input v-model="value1" type="text" />
</template>

<script setup lang="ts">
  import { reactive, ref, watch } from 'vue';
  interface People {
    number: number;
    age: String;
  }
  const num: People = reactive({ number: 1, age: '1' });
  num;
  let value1 = ref<string>('1');
  watch(
    () => value1,
    (newVale) => {
      console.log(newVale);
    },
  );
</script>

<style scoped lang="less">
  .class-item {
    color: red;
  }
</style>
