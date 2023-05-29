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


  projectID 等后台更新了，要改成projectID

  vben文档地址 D:\devCode\gitup\vue-vben-admin-doc

  设置文件路径： D:\tsy-admin-git\tsy-admin\src\components-business\XList\v-2.0\utils.ts
  canResize: true, 这个可以控制


      //- template(#localSearch="{ model, field }")
    //-   a-select(            
    //-     :api="getProjectInformation"
    //-     showSearch
    //-     v-model:value="model[field]"
    //-   )

import { useGo } from '/@/hooks/web/usePage';
import { defineComponent } from 'vue';
export default defineComponent({
  setup() {
    const go = useGo();

    // 执行刷新
    go();
    go(PageEnum.Home);
    return {};
  },
});
如何携带项目id


项目 支持模糊查询
/api/waterSupplyAndDrainageProjectData 

序号 项目名称 projectName 项目类型 projectTypeName  数据来源 isSynchroType 操作--用水量计算 录入数据 编辑 删除 
新增项目 
项目名称 projectName
普铁还是高铁 ordinaryOrHighSpeedRail


项目名称 车站查询

接口方法名
enterAndUpdateProjects

车站名称 车站类型   操作 添加用水项 修改 删除
接入 录入车站数据 enteringStationData 

跳转携带参数

const query = getRouterQuery(); //获取路由参数

车站用水项目

用水项目  waterUseProject 用水明细 waterProject  单位 unit  数量(近期) recentQuantity 数量(远期) forwardQuantity

穿梭框显示 搜索功能 show-search

初始化渲染，将所有的值渲染在左边；

可以将值在左边渲染和右边渲染；

可以获取到右边渲染的值；

搜索功能，支持对name进行模糊查询

将数据进行一下整理
将公共方法整理出来

请求之前处理参数
function beforeFetch(params) {

项目id来自于

通过用户查询项目 getProjectInformation

OrdinaryRailway 普铁
HighSpeed 高铁

新增车站的查询页面修改


value值发生变化，自动进行查询。
// componentProps: {
    //   api: getProjectInformation,
    //   params: {
    //     id: 1,
    //   },
    //   showSearch: true,
    //   optionFilterProp: 'label',
    //   // resultField: 'list2',
    //   // // use name as label
    //   // labelField: 'name',
    //   // // use id as value
    //   // valueField: 'id',
    //   // not request untill to select
    //   immediate: true,
    //   onChange: (e, v) => {
    //     if (!!v) {
    //       setTimeout(() => {
    //         window.contextLoad._value.table.reload();
    //       }, 10);

    //       store.waterSupplyAndDrainageProjectTypeAction(v.projectType);
    //     } else {
    //       store.waterSupplyAndDrainageProjectTypeAction('');
    //     }
    //     console.log('ApiSelect====>:', e, v);
    //   },
    //   onOptionsChange: (options) => {
    //     console.log('get options', options.length, options);
    //   },
    // },

      if (createActions) {
    other['actionColumn'] = {
      width: 280,
      title: '操作',
      dataIndex: 'action',
      fixed: 'right',
      slots: { customRender: 'action' },
    };
  }

  //请求前非标数据转化，如果不是vben框架的非标数据，需要转化为code，message，result,type数据类型。

  passengerTrainsFecalSewageDtoList 旅客列车集便污水 不变，只是改名称和计算逻辑
designSewageVolumeNewDtoList 生产生活排水量（原设计污水） 生产生活排水量 1
makeMaxDrainageDtoList 昼夜最大排水量（新增） 使用原设计污水逻辑  2

index 


删除生产生活 06删除服务用水
producedrainMaxWaterDtoList 被替换
lifedrainMaxWaterDtoList 删除掉

  {
    title: '八、昼夜最大排水量（生活污水）',
    schemas: lifedrainMaxWaterDtoList,
  },

  初始化

  修改值

  HIGH_SPEED_TRAIN_DEPOT 06

    { value: '01', label: '普铁-区段站' },0.55 *16 *2 *2  0.55*16*2
  { value: '02', label: '普铁-中间站' },
  { value: '03', label: '普铁-会让站、越行站' },
  { value: '05', label: '高铁-中间站' }, 正在做
  { value: '06', label: '高铁-动车段' }, 搞定
  { value: '07', label: '高铁-大型车站' },

    ORDINARY_RAILWAY_LINE_POLICE_AREA_ALONG: '04', // 普铁-牵引变电所、线路所、警务区

      CHANGE_STATION_TYPE: '0', // 变更车站的modal弹窗
  ORDINARY_RAILWAY_SECTION_STATION: '01', // 普铁区段站 有*2
  ORDINARY_RAILWAY_INTERMEDIATE_STATION_OF: '02', // 普铁-中间站 无
  ORDINARY_RAILWAY_WILL_PASS_OVER_THE_STATION: '03', // 普铁-会让站、越行站 无 特殊 两项合并

  HIGH_SPEED_RAILWAY_INTERMEDIATE_STATION: '05', // 高铁-中间站 无
  HIGH_SPEED_TRAIN_DEPOT: '06', // 高铁-动车段  有
  HIGH_SPEED_LARGE_STATIONS: '07', // 高铁-大型车站 有 *2

  window.screen.width

        window.οnresize = function () {
        console.log(window.screen.width + '-------------------------');
      };
      stylePadding


      calculationFormulaDisplay

      else if (waterProject.indexOf('服务行业用水') > -1) {
      mes = '（Q1+Q2+Q3+Q4）*（0.08～0.1）=Q5';
    } else if (waterProject.indexOf('管网漏失') > -1) {
      mes = '（Q1+Q2+Q3+Q4）*（0.1～0.12）=Q6';
    } else if (waterProject.indexOf('基建未预见') > -1) {
      mes = '（Q1+Q2+Q3+Q4+Q6）*（0.1～0.15）=Q7';
    }else if (waterProject.indexOf('生产生活排水量') > -1) {
      mes = '（Q2+Q3+Q5）*（0.80～0.95）=Q2’';
    } 

    if (waterProject.indexOf('服务行业用水') > -1) {
      mes = '（Q1+Q2+Q3）*（0.08～0.1）=Q4';
    } else if (waterProject.indexOf('管网漏失') > -1) {
      mes = '（Q1+Q2+Q3）*（0.1～0.12）=Q5';
    } else if (waterProject.indexOf('基建未预见') > -1) {
      mes = '（Q1+Q2+Q3+Q5）*（0.1～0.15）=Q6';
    } else if (waterProject.indexOf('近期昼夜最大排水量') > -1) {
      mes = '（Q1+Q2+Q4）*（0.80～0.95）=Q’';
    } else

      if (waterProject.indexOf('管网漏失') > -1) {
      mes = '（Q1+Q2+Q3）*（0.1～0.12）=Q4';
    } else if (waterProject.indexOf('基建未预见') > -1) {
      mes = '（Q1+Q2+Q3+Q4）*（0.1～0.15）=Q5';
    } else if (waterProject.indexOf('近期昼夜最大排水量') > -1) {
      mes = '（Q1+Q2）*（0.80～0.95）=Q’';
    } else

    else if (waterProject.indexOf('管网漏失') > -1) {
      mes = '（Q1+Q2+Q3+Q4）*（0.1～0.12）=Q5';
    } else if (waterProject.indexOf('基建未预见') > -1) {
      mes = '（Q1+Q2+Q3+Q4+Q5）*（0.1～0.15）=Q6';
    } else if (waterProject.indexOf('生产生活排水量') > -1) {
      mes = '（Q2+Q3）*（0.80～0.95）=Q2’';
    }

        if (waterProject.indexOf('服务行业用水') > -1) {
      mes = '（Q1+Q2+Q3）*（0.08～0.1）=Q4';
    } else if (waterProject.indexOf('管网漏失') > -1) {
      mes = '（Q1+Q2+Q3）*（0.1～0.12）=Q5';
    } else if (waterProject.indexOf('基建未预见') > -1) {
      mes = '（Q1+Q2+Q3+Q5）*（0.1～0.15）=Q6';
    } else if (waterProject.indexOf('近期昼夜最大排水量') > -1) {
      mes = '（Q1+Q2+Q4）*（0.80～0.95）=Q’';
    } else

     else if (waterProject.indexOf('生产生活排水量') > -1) {
      mes = '（Q2+Q3）*（0.80～0.95）=Q2’';
    } 

    else if (waterProject.indexOf('服务行业用水') > -1) {
      mes = '（Q1+Q2+Q3+Q4）*（0.08～0.1）=Q5';
    } else if (waterProject.indexOf('管网漏失') > -1) {
      mes = '（Q1+Q2+Q3+Q4）*（0.1～0.12）=Q6';
    } else if (waterProject.indexOf('基建未预见') > -1) {
      mes = '（Q1+Q2+Q3+Q4+Q6）*（0.1～0.15）=Q7';
    }

    : '近期的（运输用水+生产用水+生活用水+绿化用水）*单位用水量' 01