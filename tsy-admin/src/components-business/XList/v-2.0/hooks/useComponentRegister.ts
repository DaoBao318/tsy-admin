import { tryOnUnmounted } from '@vueuse/core';
import { Component } from 'vue';
import { add, del, componentMap } from '../componentMap';
export function useComponentRegister(compName: string, comp: Component) {
  add(compName, comp);
  tryOnUnmounted(() => {
    del(compName);
  });
}
export { componentMap };
