export function findLabelByValue(arr, value) {
  if (!arr || !arr.length) return '';
  const idx = arr.findIndex((item) => item.value === value);
  return idx !== -1 ? arr[idx].label : '';
}
import { FormSchema } from '/@/components/Table';
export interface RenderCallbackParams {
  schema: FormSchema;
  values: Recordable;
  model: Recordable;
  field: string;
}

type showType = boolean | ((renderCallbackParams: RenderCallbackParams) => boolean) | undefined;

export function setDividerFormItem(label: string, show: showType = true): FormSchema {
  return {
    label: label,
    field: label, // 不加该属性，在使用updateSchema时会被uniqBy(schema, 'field')去除
    component: 'Divider',
    componentProps: {
      orientation: 'left',
      plain: true,
      style: {
        backgroundColor: '#fafafa',
        padding: '10px 0',
        minHeight: label ? '48px' : '24px',
        color: 'rgba(0,0,0,0.85)',
        border: '1px solid #f0f0f0',
        borderRadius: label ? '2px 2px 0 0' : '0 0 2px 2px',
        fontWeight: 500,
        fontSize: '16px',
      },
    },
    show,
  };
}
