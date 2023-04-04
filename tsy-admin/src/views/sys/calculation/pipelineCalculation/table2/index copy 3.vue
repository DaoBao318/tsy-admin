<template>
  <PageWrapper title="表单基础示例" contentFullHeight>
    <CollapseContainer title="基础示例">
      <BasicForm
        autoFocusFirstItem
        :labelWidth="200"
        @register="registerForm"
        :actionColOptions="{ span: 24 }"
        @submit="handleSubmit"
        @reset="handleReset"
      >
        <template #selectA="{ model, field }">
          <a-select
            :options="optionsA"
            mode="multiple"
            v-model:value="model[field]"
            @change="valueSelectA = model[field]"
            allowClear
          />
        </template>
        <template #selectB="{ model, field }">
          <a-select
            :options="optionsB"
            mode="multiple"
            v-model:value="model[field]"
            @change="changeB(model, field)"
            allowClear
          />
        </template>
        <template #localSearch="{ model, field }">
          <ApiSelect
            :api="optionsListApi"
            showSearch
            v-model:value="model[field]"
            optionFilterProp="label"
            resultField="list"
            labelField="name"
            valueField="id"
          />
        </template>
        <template #remoteSearch="{ model, field }">
          <ApiSelect
            :api="optionsListApi"
            showSearch
            v-model:value="model[field]"
            :filterOption="false"
            resultField="list"
            labelField="name"
            valueField="id"
            :params="searchParams"
            @search="onSearch"
          />
        </template>
      </BasicForm>
    </CollapseContainer>
  </PageWrapper>
</template>
<script lang="ts">
  import { computed, defineComponent, unref, ref } from 'vue';
  import { BasicForm, FormSchema, ApiSelect, useForm } from '/@/components/Form/index';
  import { CollapseContainer } from '/@/components/Container';
  import { useMessage } from '/@/hooks/web/useMessage';
  import { PageWrapper } from '/@/components/Page';

  import { optionsListApi } from '/@/api/demo/select';
  import { useDebounceFn } from '@vueuse/core';
  import { treeOptionsListApi } from '/@/api/demo/tree';
  import { Select } from 'ant-design-vue';
  import { cloneDeep } from 'lodash-es';
  import { areaRecord } from '/@/api/demo/cascader';

  const valueSelectA = ref<string[]>([]);
  const valueSelectB = ref<string[]>([]);
  const options = ref<Recordable[]>([]);
  for (let i = 1; i < 10; i++) options.value.push({ label: '选项' + i, value: `${i}` });

  const optionsA = computed(() => {
    // if (valueSelectB.value.indexOf('1') != -1) {
    //   return [];
    // }
    return cloneDeep(unref(options)).map((op) => {
      op.disabled = unref(valueSelectB).indexOf(op.value) !== -1;
      return op;
    });
  });
  const optionsB = computed(() => {
    return cloneDeep(unref(options)).map((op) => {
      op.disabled = unref(valueSelectA).indexOf(op.value) !== -1;
      return op;
    });
  });
  function changeB(model, field) {
    valueSelectB.value = model[field];
    model.field1 = 1000;
  }

  const provincesOptions = [
    {
      id: 'guangdong',
      label: '广东省',
      value: '1',
      key: '1',
    },
    {
      id: 'jiangsu',
      label: '江苏省',
      value: '2',
      key: '2',
    },
  ];
  const citiesOptionsData = {
    guangdong: [
      {
        label: '珠海市',
        value: '1',
        key: '1',
      },
      {
        label: '深圳市',
        value: '2',
        key: '2',
      },
      {
        label: '广州市',
        value: '3',
        key: '3',
      },
    ],
    jiangsu: [
      {
        label: '南京市',
        value: '1',
        key: '1',
      },
      {
        label: '无锡市',
        value: '2',
        key: '2',
      },
      {
        label: '苏州市',
        value: '3',
        key: '3',
      },
    ],
  };

  const schemas: FormSchema[] = [
    {
      field: 'divider-basic',
      component: 'Divider',
      label: '基础字段',
      colProps: {
        span: 24,
      },
    },
    {
      field: 'field1',
      component: 'Input',
      label: '字段1',

      colProps: {
        span: 8,
      },
      // componentProps:{},
      // can func
      componentProps: ({ schema, formModel }) => {
        console.log('form:', schema);
        console.log('formModel:', formModel);
        return {
          placeholder: '自定义placeholder',
          onChange: (e: any) => {
            console.log(e);
          },
        };
      },
      suffix: 's1',
      renderComponentContent: () => {
        return {
          prefix: () => 'pSlot',
          suffix: () => 'sSlot',
        };
      },
    },
    {
      field: 'field2',
      component: 'Input',
      label: '带后缀',
      defaultValue: '111',
      colProps: {
        span: 8,
        style: { minWidth: '600px' },
      },
      componentProps: {
        onChange: (e: any) => {
          console.log('---2----', e);
        },
      },
      suffix: '天',
    },
    {
      field: 'field3',
      component: 'RangePicker',
      label: '字段3',
      colProps: {
        span: 24,
        // style: { minWidth: '800px' },
      },
    },
    {
      field: 'field4',
      component: 'Select',
      label: '字段4',
      colProps: {
        span: 8,
      },
      componentProps: {
        options: [
          {
            label: '选项1',
            value: '1',
          },
          {
            label: '选项2',
            value: '2',
          },
        ],
      },
    },
    {
      field: 'field5',
      component: 'CheckboxGroup',
      label: '字段5',
      colProps: {
        span: 8,
      },
      componentProps: {
        options: [
          {
            label: '选项1',
            value: '1',
          },
          {
            label: '选项2',
            value: '2',
          },
        ],
      },
    },
    {
      field: 'field7',
      component: 'RadioGroup',
      label: '字段7',
      colProps: {
        span: 8,
      },
      componentProps: {
        options: [
          {
            label: '选项1',
            value: '1',
          },
          {
            label: '选项2',
            value: '2',
          },
        ],
      },
    },
    {
      field: 'field81',
      component: 'Checkbox',
      label: '字段8',
      colProps: {
        span: 8,
      },
      renderComponentContent: 'Select1',
    },
    {
      field: 'field9',
      component: 'Switch',
      label: '字段91',
      colProps: {
        span: 8,
      },
      renderComponentContent: 'Select',
    },
    {
      field: 'field10',
      component: 'RadioButtonGroup',
      label: '字段10',
      colProps: {
        span: 8,
      },
      componentProps: {
        options: [
          {
            label: '选项1',
            value: '1',
          },
          {
            label: '选项2',
            value: '2',
          },
        ],
        onChange: (e, v) => {
          console.log('RadioButtonGroup====>:', e, v);
        },
      },
    },
    {
      field: 'field11',
      component: 'Cascader',
      label: '字段11',
      colProps: {
        span: 10,
      },
      componentProps: {
        options: [
          {
            value: 'zhejiang',
            label: 'Zhejiang',
            children: [
              {
                value: 'hangzhou',
                label: 'Hangzhou',
                children: [
                  {
                    value: 'xihu',
                    label: 'West Lake',
                    children: [
                      {
                        value: 'xihu',
                        label: 'East Lake',
                      },
                    ],
                  },
                ],
              },
            ],
          },
          {
            value: 'jiangsu',
            label: 'Jiangsu',
            children: [
              {
                value: 'nanjing',
                label: 'Nanjing',
                children: [
                  {
                    value: 'zhonghuamen',
                    label: 'Zhong Hua Men',
                  },
                ],
              },
            ],
          },
        ],
      },
    },
    {
      field: 'divider-api-select',
      component: 'Divider',
      label: '远程下拉演示',
      colProps: {
        span: 24,
      },
    },
    {
      field: 'field30',
      component: 'ApiSelect',
      label: '懒加载远程下拉',
      componentProps: {
        // more details see /src/components/Form/src/components/ApiSelect.vue
        api: optionsListApi,
        params: {
          count: 4,
          keyword: '关键字',
        },

        resultField: 'list',
        // use name as label
        labelField: 'name',
        // use id as value
        valueField: 'id',
        // not request untill to select
        immediate: true,
        onChange: (e, v) => {
          console.log('ApiSelect====>:', e, v);
        },
        // atfer request callback
        onOptionsChange: (options) => {
          console.log('get options', options.length, options);
        },
      },
      colProps: {
        span: 8,
      },
      defaultValue: '0',
    },
    {
      field: 'field8',
      component: 'ApiCascader',
      label: '联动ApiCascader',
      // required: true,
      colProps: {
        span: 8,
      },
      componentProps: {
        api: areaRecord,
        apiParamKey: 'parentCode',
        dataField: 'data',
        labelField: 'name',
        valueField: 'code',
        initFetchParams: {
          parentCode: '',
        },
        isLeaf: (record) => {
          return !(record.levelType < 3);
        },
        onChange: (e, ...v) => {
          console.log('ApiCascader====>:', e, v);
        },
      },
    },
    {
      field: 'field31',
      component: 'Input',
      label: '下拉本地搜索',
      helpMessage: ['ApiSelect组件', '远程数据源本地搜索', '只发起一次请求获取所有选项'],
      slot: 'localSearch',
      colProps: {
        span: 8,
      },
    },
    {
      field: 'field32',
      component: 'Input',
      label: '下拉远程搜索',
      helpMessage: ['ApiSelect组件', '将关键词发送到接口进行远程搜索'],
      slot: 'remoteSearch',
      colProps: {
        span: 8,
      },
      defaultValue: '0',
    },
    {
      field: 'field33',
      component: 'ApiTreeSelect',
      label: '远程下拉树',
      helpMessage: ['ApiTreeSelect组件', '使用接口提供的数据生成选项'],
      componentProps: {
        api: treeOptionsListApi,
        resultField: 'list',
        onChange: (e, v) => {
          console.log('ApiTreeSelect====>:', e, v);
        },
      },
      colProps: {
        span: 8,
      },
    },
    {
      field: 'field34',
      component: 'ApiRadioGroup',
      label: '远程Radio',
      helpMessage: ['ApiRadioGroup组件', '使用接口提供的数据生成选项'],
      componentProps: {
        api: optionsListApi,
        params: {
          count: 2,
        },
        resultField: 'list',
        // use name as label
        labelField: 'name',
        // use id as value
        valueField: 'id',
      },
      defaultValue: '1',
      colProps: {
        span: 8,
      },
    },
    {
      field: 'field35',
      component: 'ApiRadioGroup',
      label: '远程Radio',
      helpMessage: ['ApiRadioGroup组件', '使用接口提供的数据生成选项'],
      componentProps: {
        api: optionsListApi,
        params: {
          count: 2,
        },
        resultField: 'list',
        // use name as label
        labelField: 'name',
        // use id as value
        valueField: 'id',
        isBtn: true,
        onChange: (e, v) => {
          console.log('ApiRadioGroup====>:', e, v);
        },
      },
      colProps: {
        span: 8,
      },
    },
    // {
    //   field: 'field36',
    //   component: 'ApiTree',
    //   label: '远程Tree',
    //   helpMessage: ['ApiTree组件', '使用接口提供的数据生成选项'],
    //   required: true,
    //   componentProps: {
    //     api: treeOptionsListApi,
    //     params: {
    //       count: 2,
    //     },
    //     afterFetch: (v) => {
    //       //do something
    //       return v;
    //     },
    //     resultField: 'list',
    //   },
    //   colProps: {
    //     span: 8,
    //   },
    // },
    {
      field: 'divider-linked',
      component: 'Divider',
      label: '字段联动',
      colProps: {
        span: 24,
      },
    },
    {
      field: 'province',
      component: 'Select',
      label: '省份',
      colProps: {
        span: 8,
      },
      componentProps: ({ formModel, formActionType }) => {
        return {
          options: provincesOptions,
          placeholder: '省份与城市联动1',
          onChange: (e: any) => {
            // console.log(e)
            let citiesOptions =
              e == 1
                ? citiesOptionsData[provincesOptions[0].id]
                : citiesOptionsData[provincesOptions[1].id];
            // console.log(citiesOptions)
            if (e === undefined) {
              citiesOptions = [];
            }
            formModel.city = undefined; //  reset city value
            const { updateSchema } = formActionType;
            updateSchema({
              field: 'city',
              componentProps: {
                options: citiesOptions,
                onChange(e) {
                  console.log('--------e--', e, formModel);
                },
              },
            });
          },
        };
      },
    },
    {
      field: 'city',
      component: 'Select',
      label: '城市1',
      colProps: {
        span: 8,
      },
      componentProps: () => {
        console.log('----------------');
        return {
          options: [
            {
              label: '珠海市',
              value: '1',
              key: '1',
            },
            {
              label: '深圳市',
              value: '2',
              key: '2',
            },
            {
              label: '广州市',
              value: '3',
              key: '3',
            },
          ], // defalut []
          placeholder: '省份与城市联动',
          onChange(e) {},
        };
      },
    },
    {
      field: 'divider-selects',
      component: 'Divider',
      label: '互斥多选',
      helpMessage: ['两个Select共用数据源', '但不可选择对方已选中的项目'],
      colProps: {
        span: 24,
      },
    },
    {
      field: 'selectA',
      component: 'Select',
      label: '互斥SelectA',
      slot: 'selectA',
      defaultValue: [],
      colProps: {
        span: 8,
      },
    },
    {
      field: 'selectB',
      component: 'Select',
      label: '互斥SelectB',
      slot: 'selectB',
      defaultValue: [],
      colProps: {
        span: 8,
      },
    },
    {
      field: 'divider-deconstruct',
      component: 'Divider',
      label: '字段解构',
      helpMessage: ['如果组件的值是 array 或者 object', '可以根据 ES6 的解构语法分别取值'],
      colProps: {
        span: 24,
      },
    },
    {
      field: 'datetime',
      label: '时间范围',
      component: 'RangePicker',
      componentProps: {
        placeholder: ['开始时间1', '结束时间'],
        showTime: { format: 'HH:mm:ss' },
      },
    },
    {
      field: 'datetime1',
      label: '时间范围',
      component: 'RangePicker',
      componentProps: {
        format: 'YYYY-MM-DD HH:mm:ss',
        placeholder: ['开始时间', '结束时间'],
        showTime: { format: 'HH:mm:ss' },
      },
    },
    {
      field: 'divider-others',
      component: 'Divider',
      label: '其它',
      colProps: {
        span: 24,
      },
    },
    {
      field: 'field20',
      component: 'InputNumber',
      label: '字段20',
      required: true,
      colProps: {
        span: 8,
      },
      componentProps: ({ formModel }) => {
        return {
          onChange: () => {
            console.log(formModel, 'ppppppppppppp');
          },
        };
      },
    },
    {
      field: 'field21',
      component: 'Slider',
      label: '字段21',
      componentProps: {
        min: 0,
        max: 100,
        range: true,
        marks: {
          20: '20°C',
          60: '60°C',
          40: '40°C',
        },
      },
      colProps: {
        span: 8,
      },
    },
    {
      field: 'field22',
      component: 'Rate',
      label: '字段22',
      defaultValue: 1,
      colProps: {
        span: 8,
      },
      componentProps: {
        disabled: false,
        allowHalf: true,
      },
    },
  ];

  export default defineComponent({
    components: { BasicForm, CollapseContainer, PageWrapper, ApiSelect, ASelect: Select },
    setup() {
      const check = ref(null);
      const { createMessage } = useMessage();
      const keyword = ref<string>('');
      const searchParams = computed<Recordable>(() => {
        return { keyword: unref(keyword) };
      });

      function onSearch(value: string) {
        keyword.value = value;
      }
      const [registerForm] = useForm({
        // labelWidth: 120,
        baseColProps: { span: 12 },
        schemas: schemas,
        showActionButtonGroup: true,
        compact: true,
        fieldMapToTime: [
          // data为时间组件在表单内的字段，startTime，endTime为转化后的开始时间与结束时间
          // 'YYYY-MM-DD'为时间格式，参考moment
          ['datetime', ['startTime', 'endTime'], 'YYYY-MM-DD'],
          // 支持多个字段
          ['datetime1', ['xx', 'endTime1'], 'YYYY-MM-DD HH:mm:ss'],
        ],
      });
      return {
        schemas,
        optionsListApi,
        optionsA,
        optionsB,
        changeB,
        valueSelectA,
        valueSelectB,
        onSearch: useDebounceFn(onSearch, 300),
        searchParams,
        handleReset: () => {
          keyword.value = '';
        },
        handleSubmit: (values: any) => {
          console.log('values', values);
          createMessage.success('click search,values:' + JSON.stringify(values));
        },
        check,
        registerForm,
      };
    },
  });
</script>
