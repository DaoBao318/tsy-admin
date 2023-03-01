import camelCase from 'camelcase';

// BasicTable events
// from src/components/Table/src/BasicTable.vue
// https://vvbin.cn/doc-next/components/table.html#%E4%BA%8B%E4%BB%B6
const TABLE_EVENTS = [
  'fetch-success',
  'fetch-error',
  'selection-change',
  'row-click',
  'row-dbClick',
  'row-contextmenu',
  'row-mouseenter',
  'row-mouseleave',
  'edit-end',
  'edit-cancel',
  'edit-row-end',
  'edit-change',
];

// 透传外部 BasicTable 的事件。
// 事件名有冲突的，也需要这里处理
export const getTableEvents = (attrs) => {
  return TABLE_EVENTS.reduce((ev, name) => {
    const pascalName = camelCase(name, { pascalCase: true });
    if (attrs[`on${pascalName}`]) {
      ev[name] = attrs[`on${pascalName}`];
    }
    return ev;
  }, {});
}
