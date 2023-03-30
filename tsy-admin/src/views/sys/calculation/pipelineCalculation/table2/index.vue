<template>
  <div class="p-5" ref="wrapEl" v-loading="loadingRef" loading-tip="加载中...">
    <a-button class="my-4 mr-4" type="primary" @click="openCompFullLoading">全屏 Loading</a-button>
    <a-button class="my-4" type="primary" @click="openCompAbsolute">容器内 Loading</a-button>
    <Loading :loading="loading" :absolute="absolute" :tip="tip" />
  </div>
</template>
<script lang="ts">
  import { defineComponent, reactive, toRefs, ref } from 'vue';
  import { Loading } from '/@/components/Loading';
  export default defineComponent({
    components: { Loading },
    setup() {
      const loadingRef = ref(false);
      const compState = reactive({
        absolute: false,
        loading: false,
        tip: '加载中...',
      });

      function openLoading(absolute: boolean) {
        compState.absolute = absolute;
        compState.loading = true;
        setTimeout(() => {
          compState.loading = false;
        }, 2000);
      }

      function openCompFullLoading() {
        openLoading(false);
      }

      function openCompAbsolute() {
        openLoading(true);
      }

      return {
        openCompFullLoading,
        openCompAbsolute,
        ...toRefs(compState),
        loadingRef,
      };
    },
  });
</script>
