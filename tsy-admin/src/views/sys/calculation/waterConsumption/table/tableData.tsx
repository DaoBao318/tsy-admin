// tableData.tsx
import { h } from 'vue';
import { BasicColumn } from '/@/components/Table/src/types/table';
// 表头数据
export function getBasicColumns(): BasicColumn[] {
  return [
    {
      title: '卡号',
      dataIndex: 'cardNo',
      fixed: 'left',
      width: 100,
      sorter: true,
    },
    {
      title: '姓名',
      dataIndex: 'name',
      fixed: 'left',
      slots: { customRender: 'name' },
      width: 100,
    },
    {
      title: '性别',
      dataIndex: 'sex',
      fixed: 'left',
      width: 200,
      customRender: ({ record }) => {
        if (record.sex[0].value === 0) {
          return '男性';
        }
        if (record.sex[0].value === 1) {
          return h(
            'div',
            record.sex.map((p, index) => {
              return h(
                'div',
                {
                  class: index == 0 ? 'cont-height' : 'cont-border',
                },
                p.text || '-',
              );
            }),
          );
        }
      },
    },
  ];
}
// 表单数据
export function getBasicData() {
  return [
    {
      cardNo: 1521,
      name: 'mike',
      sex: [{ text: '男', value: 0 }],
    },
    {
      cardNo: 21236,
      name: 'jack',
      sex: [{ text: '女', value: 1 }],
    },
    {
      cardNo: 321131,
      name: 'lucy',
      sex: [{ text: '男', value: 0 }],
    },
    {
      cardNo: 456,
      name: 'tom',
      sex: [{ text: '男', value: 0 }],
    },
    {
      cardNo: 5132,
      name: 'timi',
      sex: [{ text: '女', value: 1 }],
    },
  ];
}
