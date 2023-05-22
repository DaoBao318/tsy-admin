import { EQUIP } from './equipUtil';
import { FormSchema } from '/@/components/Table';
export const formSchemaDrainage: FormSchema[] = [
  { label: '设计基础参数配置', field: 'divider1', component: 'Divider' },
  {
    field: 'projectName',
    label: '项目信息',
    component: 'Input',
    // dynamicDisabled: true,
    colProps: { span: EQUIP.WIDTH_NUMBER },
  },
  {
    field: 'stationName',
    label: '车站名称',
    component: 'Input',
    // dynamicDisabled: true,
    colProps: { span: EQUIP.WIDTH_NUMBER },
  },
  {
    field: 'stationTypeName',
    label: '车站类型',
    component: 'Input',
    dynamicDisabled: true,
    colProps: { span: EQUIP.WIDTH_NUMBER },
  },
];
