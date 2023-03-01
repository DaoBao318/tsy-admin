import { useTable } from '/@/components/Table';
import { handleUseTableOptions } from '../utils';
import { componentMap } from './useComponentRegister';
import { useDrawer, DrawerProps } from '/@/components/Drawer';
import { useModal } from '/@/components/Modal';
import { getStandardUseFormProps } from '../utils';
import { UseXListOptions, LayerItemProps } from '../types';

const handleInvalidComponent = () => {
  // 删除或者重新查找
};

// 注册layer层
function registerLayers(layers: Array<LayerItemProps> = []) {
  const registerLayersArr = [];
  const layersMethodsObj = {};
  if (!layers.length) {
    return {
      registerLayersArr: [],
      layersMethodsObj: {},
    };
  }

  layers.forEach((layer: LayerItemProps) => {
    const compName = layer.component || 'DrawerForm';
    const comp = componentMap.get(compName);
    if (!comp) {
      console.error(`unknown component "${layer.component}" in "schemas.layer"`);
      handleInvalidComponent();
      return;
    }
    const isDrawerExtend = /^Drawer/.test(compName);
    const isModalExtend = /^Modal/.test(compName);
    const use: Function | null = isDrawerExtend ? useDrawer : isModalExtend ? useModal : null;
    if (!use) {
      console.error(
        `component "${layer.component}" in "schemas.layer" must private a useXXX hooks`
      );
      handleInvalidComponent();
      return;
    }

    const [registerLayer, layerMethods] = use(true, {});
    const { useFormOptions, slotsNames } = getStandardUseFormProps(layer.useFormOptions);

    // 定义open方法，openDrawer支持传第三个参数，为设置draw属性的参数
    const open = (visible: boolean, data: any, drawerAttr: DrawerProps) => {
      if (isDrawerExtend) {
        return layerMethods.openDrawer(visible, [data, drawerAttr]);
      } else if (isModalExtend) {
        return layerMethods.openModal(visible, [data, drawerAttr]);
      }
    };
    layerMethods['open'] = open;
    layersMethodsObj[layer.name] = layerMethods;
    registerLayersArr.push({
      componentProps: layer.componentProps || {},
      component: compName,
      register: registerLayer,
      useFormOptions: useFormOptions,
      slotsNames: slotsNames,
      layerName: layer.name,
      ...layerMethods,
    });
  });
  return {
    layersMethodsObj,
    registerLayersArr,
  };
}

// 注册钩子函数useXList
export function useXList(props: UseXListOptions) {
  const context = {
    table: {},
    layers: {},
  };
  const { useTableOptions, layers = [] } = props;
  // 处理table注册
  const useTableProps1 = handleUseTableOptions(useTableOptions);
  const [rejecterTable, tableMethods] = useTable(useTableProps1);
  const { registerLayersArr, layersMethodsObj } = registerLayers(layers);
  context.table = tableMethods;
  context.layers = layersMethodsObj;

  return {
    rejecterTable,
    context,
    registerLayersArr,
  };
}
