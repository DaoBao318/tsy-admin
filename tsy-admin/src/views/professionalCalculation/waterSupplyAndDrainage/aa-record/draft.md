专业计算  professionalCalculation

给排水 waterSupplyAndDrainage  waterSupplyAndDrainage
 pagination: { pageSize: 10 },
     formConfig: {
      labelWidth: 120,
      innerWidth: 100,
      schemas: searchFormSchema,
      alwaysShowLines: 10,
      showActionButtonGroup: true,
      layout: 'horizontal',
    },
    和api同级

//返回一个Promise，对Promise中的值进行处理，然后通过resolve，会对resolve中的值进行处理。
    export const optionsListApi = (params?: selectParams) => {
  return new Promise((resolve) => {
    defHttp.get<DemoOptionsItem[]>({ url: Api.OPTIONS_LIST, params }).then((res) => {
      resolve([{ label: res.list[2].name, value: 't' }]);
    });
  });
};
      componentProps: {
        // more details see /src/components/Form/src/components/ApiSelect.vue
        api: optionsListApi,
        params: {
          id: 1,
        },

        // resultField: 'list2',
        // // use name as label
        // labelField: 'name',
        // // use id as value
        // valueField: 'id',
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
value可以为任何
采用params或者data取决于后台的解析，后台再body中解析需要data，在query中解析需要params
      axios({
    method: 'POST',
    url: '/xxxxx',
    data: param,
  })
  或者
 axios({
    method: 'POST',
    url: '/xxxxx',
    params: param,
  })


  在onchange的时候改变这个值，这个值作为响应式的，ref<string>[]([])，这个响应式的值，作为computed中的一项。computed的值作为option。

  import { cloneDeep } from 'lodash-es'; 使用这种方法，在调用的时候按需引入。

          fieldMapToTime: [
          // data为时间组件在表单内的字段，startTime，endTime为转化后的开始时间与结束时间
          // 'YYYY-MM-DD'为时间格式，参考moment
          ['datetime', ['startTime', 'endTime'], 'YYYY-MM-DD'],
          // 支持多个字段
          ['datetime1', ['xx', 'endTime1'], 'YYYY-MM-DD HH:mm:ss'],
        ]
版本控制，可以在git中添加忽略版本控制。是否要保留到本地，保留本地就不会删除。

遮罩层信息 changeOkLoading }] = useModalInner(async (outData) => {


  projectId 等后台更新了，要改成projectID

  vben文档地址 D:\devCode\gitup\vue-vben-admin-doc