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
  和时间赛跑，社戏，我的于勒叔叔 氓  始得西山宴游记 项脊轩志 游褒禅山记 鸿门宴 祝福 曹冲称象 丑小鸭 小马过河 登山 闻鸡起舞 草船借箭 高大的皂荚树 猴子捞月 骆驼和羊 两个铁球同事着地 

  在onchange的时候改变这个值，这个值作为响应式的，ref<string>[]([])，这个响应式的值，作为computed中的一项。computed的值作为option。

  import { cloneDeep } from 'lodash-es'; 使用这种方法，在调用的时候按需引入。

          fieldMapToTime: [
          // data为时间组件在表单内的字段，startTime，endTime为转化后的开始时间与结束时间
          // 'YYYY-MM-DD'为时间格式，参考moment
          ['datetime', ['startTime', 'endTime'], 'YYYY-MM-DD'],
          // 支持多个字段
          ['datetime1', ['xx', 'endTime1'], 'YYYY-MM-DD HH:mm:ss'],
        ],荆轲刺秦王 鸿门宴 荷塘月色 离骚 孔雀东南飞 兰亭集序 赤壁赋 游褒禅山记 祝福 蜀道难 琵琶行并序 劝学 过秦论 师说 雷雨 拿来主义 廉颇蔺相如列传 归去来兮辞 滕王阁序 陈情表 长恨歌 蜀相 将进酒 李凭箜篌引 庖丁解牛 阿房宫赋 六国论 祭十二郎文 项脊轩志 桥边的老人 白鹿原 小二黑结婚 骆驼祥子 官场现形记 动人的北平 贺新郎 有无相生 己所不欲勿施于人 有教无类
        
        人教版高中语文经典课文都有哪些?...... 必修3的《林黛玉进贾府》、《祝福》...
        
        高中语文精美片段积累作业 20篇(100 - 200字)...... 1、叔本华《人生的智慧》第三和第四部分(节选),可以选抄一些自己有感触的部分.网上很容易找到电子书.2、《培根论说文集》节选.第二部分 我们对待自己的态度 第五节 人生智慧的重要一点就是在关注现在和计划将来这两者之间达致...
        
        
        人教版高一语文课本上册要求背诵的篇目 - ...... 有很多啊~ 我翻过语文书了哦~四册 必修一《沁园春长沙》《师说》《劝学》《赤壁赋》 还有篇《始得西山宴游记》我背了,但是老师没怎么要求 必修二:《荷塘月色》四~六段 、《六国论》《阿房宫赋》《念奴娇 赤壁怀古》《永遇乐 京口北...
        
        高中语文书中有哪些经典文章...... 高中语文书中有哪些经典文章春江花月夜 滕王阁序 孔雀东南飞 师说 孔乙己
        
        高中的语文必背篇目有哪些? - ...... 新课标高中语文必修(1-5)规定背诵篇目总集 总目录:一、新课标高中人教版必修(1)1、《沁园春·长沙》2、《雨巷》3、《再别康桥》4、《烛之武退秦师》5、《荆轲刺秦王》(第8段)6、《记念刘和珍君》(第2、4节) 二、新课标高...
