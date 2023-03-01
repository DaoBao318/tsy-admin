import type { Component } from 'vue';
import { ComponentType } from '/@/components/Form/src/types';
import { useDrawer } from '/@/components/Drawer';
import { useModal } from '/@/components/Modal';
import { add as addFormComp } from '/@/components/Form/src/componentMap';
import { DrawerForm } from './components/DrawerForm';
import { ModalForm } from './components/ModalForm';

import ColorConvert from '../../ColorConvert/ColorConvert.vue';
import ColorInput from '../../ColorConvert/ColorInput.vue';

console.log('componentMap init');

addFormComp('ColorConvert' as ComponentType, ColorConvert);
addFormComp('ColorInput' as ComponentType, ColorInput);

const componentMap = new Map<string, Component>();

export function add(compName: string, component: Component, use?: Function) {
  if (componentMap.get(compName)) {
    console.error(`component '${compName}' already exists! Please change another name!`);
    return;
  }
  componentMap.set(compName, {
    default: component,
    use,
  });
}

export function del(compName: string) {
  componentMap.delete(compName);
}

add('DrawerForm', DrawerForm, useDrawer);
add('ModalForm', ModalForm, useModal);

export { componentMap };
