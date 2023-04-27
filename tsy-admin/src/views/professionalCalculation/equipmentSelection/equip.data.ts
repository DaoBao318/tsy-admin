import { getModelSelectTypeList, getProjectInformation } from './api/http';
import { EQUIP, nc } from './equipUtil';
import { BasicColumn } from '/@/components/Table';
import { FormSchema } from '/@/components/Table';

export const columns: BasicColumn[] = [
  {
    title: '项目名称',
    dataIndex: 'projectName',
    width: 200,
  },
  {
    title: '车站名',
    dataIndex: 'stationName',
    width: 180,
    // customRender: ({ record }) => {
    //   if (record.projectType === 'HighSpeed') {
    //     return record.projectTypeName;
    //   } else {
    //     return record.projectTypeName;
    //   }
    // },
  },
  {
    title: '车站类型',
    dataIndex: 'stationTypeName',
    width: 180,
  },
  {
    title: '清水池(与消防水池合设)-水池型号 ',
    dataIndex: 'cleanPoolModel',
    width: 180,
  },
  {
    title: '生活水池(水箱)-水池型号11',
    dataIndex: 'producePoolModel',
    width: 180,
  },
  {
    title: '消防水池型号11',
    dataIndex: 'ffPoolModel',
    width: 180,
  },
  {
    title: '消防水池水池型号-泵型号',
    dataIndex: 'waterSupplyModel',
    width: 180,
  },
  {
    title: '消防泵-泵型号',
    dataIndex: 'firePumpModel',
    width: 180,
  },
  {
    title: '稳压泵-泵型号',
    dataIndex: 'stabilivoltPumpModel',
    width: 180,
  },
  {
    title: '消毒设备型号',
    dataIndex: 'disinfectDeviceModel',
    width: 180,
  },
];

export const searchFormSchema: FormSchema[] = [
  {
    field: 'projectID',
    label: '切换项目:',
    component: 'ApiSelect',
    colProps: { span: 8 },
    required: true,
    componentProps: {
      api: getProjectInformation,
      params: {
        likeQuery: '',
        pageIndex: 1,
        pageSize: 999,
        totalCount: 0,
        useID: 0,
      },
      showSearch: true,
      optionFilterProp: 'label',
      resultField: 'list',
      // // use name as label
      labelField: 'projectName',
      // // use id as value
      valueField: 'projectID',
      // not request untill to select
      immediate: true,
      onChange: (e, v) => {
        if (!!v) {
          setTimeout(() => {
            window.equipLoad();
          }, 10);
        } else {
        }
      },
      onOptionsChange: (options) => {
        console.log('get options', options.length, options);
      },
    },
  },
  {
    field: 'likeQuery',
    label: '车站名称',
    helpMessage: '支持模糊查询',
    component: 'Input',
    colProps: { span: 8 },
    componentProps: {
      onChange: (e) => {
        // if (!!e) {
        //   setTimeout(() => {
        //     window.equipLoad();
        //   }, 10);
        // }
      },
    },
  },
];

export const formSchema: FormSchema[] = [
  { label: '基础信息', field: 'divider1', component: 'Divider', helpMessage: '基础信息' },
  {
    field: 'projectName',
    label: '项目信息',
    component: 'Input',
    dynamicDisabled: true,
    colProps: { span: EQUIP.WIDTH_NUMBER },
  },
  {
    field: 'stationName',
    label: '车站名称',
    component: 'Input',
    dynamicDisabled: true,
    colProps: { span: EQUIP.WIDTH_NUMBER },
  },
  {
    field: 'stationTypeName',
    label: '车站类型',
    component: 'Input',
    dynamicDisabled: true,
    colProps: { span: EQUIP.WIDTH_NUMBER },
  },
  {
    field: 'dnMwoMax',
    label: '昼夜最大用水量Qd(m3/d)含站房',
    component: 'InputNumberExpand',
    required: true,
    colProps: { span: EQUIP.WIDTH_NUMBER },
    componentProps: ({ formModel }) => {
      return {
        onChange: (e: any) => {
          formModel.waterStorageCoefficient = nc(e);
        },
      };
    },
  },
  {
    field: 'busWaterRows',
    label: '客车上水同时上水排数N(列)',
    component: 'InputNumberExpand',
    required: true,
    colProps: { span: EQUIP.WIDTH_NUMBER },
  },
  {
    field: 'groupsNumber',
    label: '列车最大编组辆数ni(辆/列)',
    component: 'InputNumberExpand',
    required: true,
    colProps: { span: EQUIP.WIDTH_NUMBER },
  },
  {
    field: 'busWaterSingle',
    label: '单个客车上水栓流量qi(L/s)',
    component: 'InputNumberExpand',
    required: true,
    colProps: { span: EQUIP.WIDTH_NUMBER },
  },
  {
    field: 'produceLifeTotalFlow',
    label: '生产生活房屋(含站房)设计总秒流量Q2(L/s)',
    component: 'InputNumberExpand',
    required: true,
    colProps: { span: EQUIP.WIDTH_NUMBER },
  },
  {
    field: 'waterSameRatio',
    label: '同时用水系数k1',
    component: 'InputNumberExpand',
    required: true,
    dynamicDisabled: false,
    colProps: { span: EQUIP.WIDTH_NUMBER },
    helpMessage: '同时用水系数k1范围在0.6-0.7之间',
    dynamicRules: ({ values }) => {
      return [
        {
          required: true,
          validator: (_, value) => {
            if (value === 0.5) {
              return Promise.resolve();
            }
            if (value > 0.7 || value < 0.6) {
              return Promise.reject('同时用水系数k1在0.6-0.7之间');
            }
            return Promise.resolve();
          },
        },
      ];
    },
  },
  {
    field: 'outdoorFireMaxStrength',
    label: '室外消防最大秒流量(L/s)',
    component: 'InputNumberExpand',
    required: true,
    colProps: { span: EQUIP.WIDTH_NUMBER },
  },
  {
    field: 'fireContinueTime',
    label: '火灾延续时间t(h)',
    component: 'InputNumberExpand',
    required: true,
    colProps: { span: EQUIP.WIDTH_NUMBER },
  },

  {
    field: 'busWaterTotalFlow',
    label: '客车上水总流量q1(L/s)',
    dynamicDisabled: true,
    component: 'InputNumberExpand',
    colProps: { span: EQUIP.WIDTH_NUMBER },
  },

  {
    label: '室外消防用水量',
    field: 'divider2',
    component: 'Divider',
    helpMessage: '室外消防用水量',
  },
  {
    field: 'modelSelectType',
    label: '分设/合设',
    component: 'ApiSelect',
    colProps: { span: EQUIP.WIDTH_NUMBER },
    required: true,
    componentProps: ({ formModel, formActionType }) => {
      return {
        api: getModelSelectTypeList,
        params: {},
        immediate: true,
        onChange: (e: any) => {
          debugger;
          if (e === 'JointDesign') {
            formActionType.updateSchema([
              {
                field: 'cleanPoolEffectiveVolume',
                label: '清水池(与消防水池合设)有效容积V1',
                show: true,
              },
              {
                field: 'producePoolEffectiveVolume',
                label: '生活水池(水箱)有效容积V2',
                show: false,
              },
              {
                field: 'ffPoolEffectiveVolume',
                label: '消防水池有效容积V3',
                show: false,
              },
            ]);
          } else if (e === 'Division') {
            formActionType.updateSchema([
              {
                field: 'cleanPoolEffectiveVolume',
                label: '清水池(与消防水池合设)有效容积V1',
                show: false,
              },
              {
                field: 'producePoolEffectiveVolume',
                label: '生活水池(水箱)有效容积V2',
                show: true,
              },
              {
                field: 'ffPoolEffectiveVolume',
                label: '消防水池有效容积V3',
                show: true,
              },
            ]);
          } else {
          }
          console.log(e);
        },
      };
    },
  },
  {
    field: 'pollShape',
    component: 'Select',
    label: '水池形状',
    required: true,
    colProps: { span: EQUIP.WIDTH_NUMBER },
    componentProps: {
      options: [
        {
          label: '矩形',
          value: '矩形',
          key: '1',
        },
        {
          label: '方形',
          value: '方形',
          key: '2',
        },
      ],
    },
  },
  {
    field: 'poolTopCoveringSoil',
    component: 'Select',
    label: '池顶覆土',
    required: true,
    colProps: { span: EQUIP.WIDTH_NUMBER },
    componentProps: {
      options: [
        {
          label: '500',
          value: '500',
          key: '1',
        },
        {
          label: '1000',
          value: '1000',
          key: '2',
        },
        {
          label: '1500',
          value: '1500',
          key: '2',
        },
      ],
    },
  },

  {
    field: 'waterStorageCoefficient',
    label: '生产生活用水贮水系数β',
    component: 'InputNumberExpand',
    helpMessage: [
      'β=1/2~1/4（Qd≤500）',
      'β=1/4~1/6（500＜Qd≤1000）',
      'β=1/6~1/8（1000＜Qd≤2000）',
      'β=1/8~1/10（2000＜Qd≤3000）',
      'β=1/10（3000＜Qd）',
    ],
    required: true,
    colProps: { span: EQUIP.WIDTH_NUMBER },
  },
  {
    field: 'outdoorFireMaxMwoMax',
    label: '室外消防最大用水量YX(m3/d)',
    dynamicDisabled: true,
    component: 'InputNumberExpand',
    colProps: { span: EQUIP.WIDTH_NUMBER },
  },
  {
    field: 'cleanPoolModel',
    label: '清水池（与消防水池合设）-水池型号',
    dynamicDisabled: true,
    component: 'Input',
    colProps: { span: EQUIP.WIDTH_NUMBER },
  },
  {
    field: 'cleanPoolEffectiveVolume',
    label: '清水池(与消防水池合设)有效容积V1',
    dynamicDisabled: true,
    component: 'InputNumberExpand',
    colProps: { span: EQUIP.WIDTH_NUMBER },
  },
  {
    field: 'producePoolModel',
    label: '生活水池(水箱)-水池型号',
    dynamicDisabled: true,
    component: 'Input',
    colProps: { span: EQUIP.WIDTH_NUMBER },
  },
  {
    field: 'producePoolEffectiveVolume',
    label: '生活水池(水箱)有效容积V2',
    dynamicDisabled: true,
    component: 'InputNumberExpand',
    colProps: { span: EQUIP.WIDTH_NUMBER },
  },
  {
    field: 'ffPoolModel',
    label: '消防水池水池型号',
    dynamicDisabled: true,
    component: 'Input',
    colProps: { span: EQUIP.WIDTH_NUMBER },
  },
  {
    field: 'ffPoolEffectiveVolume',
    label: '消防水池有效容积V3',
    dynamicDisabled: true,
    colProps: { span: EQUIP.WIDTH_NUMBER },
    component: 'InputNumberExpand',
  },

  { label: '变频供水设备', field: 'divider3', component: 'Divider', helpMessage: '变频供水设备' },
  {
    field: 'pooLowWaterElevation',
    label: '水池(水箱)低水位标高h1(m)',
    component: 'InputNumberExpand',
    required: true,
    colProps: { span: EQUIP.WIDTH_NUMBER },
  },
  {
    field: 'dullDesignGroundElevation',
    label: '最不利点房屋设计地面标高h2(m)',
    component: 'InputNumberExpand',
    required: true,
    colProps: { span: EQUIP.WIDTH_NUMBER },
  },
  {
    field: 'dullAskWaterPressure',
    label: '最不利点房屋要求水压h3(m)',
    component: 'InputNumberExpand',
    required: true,
    colProps: { span: EQUIP.WIDTH_NUMBER },
  },

  {
    field: 'excessHeadHSix',
    label: '富裕水头h6(m)',
    component: 'InputNumberExpand',
    required: true,
    colProps: { span: EQUIP.WIDTH_NUMBER },
  },

  {
    field: 'waterSupplyDesignFlow',
    label: '变频供水设备设计流量Q(L/s)',
    dynamicDisabled: true,
    component: 'InputNumberExpand',
    colProps: { span: EQUIP.WIDTH_NUMBER },
  },
  {
    field: 'vfpBadWayHeadLoss',
    label: '变频泵至最不利点沿程水头损失h4(m)',
    helpMessage: '来自于管道压力计算的值',
    component: 'InputNumberExpand',
    dynamicDisabled: true,
    colProps: { span: EQUIP.WIDTH_NUMBER },
  },
  {
    field: 'waterSupplyDesignLift',
    label: '变频供水设备设计扬程H1(m)',
    dynamicDisabled: true,
    colProps: { span: EQUIP.WIDTH_NUMBER },
    component: 'InputNumberExpand',
  },
  {
    field: 'waterSupplyModel',
    label: '变频供水设备-泵型号',
    dynamicDisabled: true,
    colProps: { span: EQUIP.WIDTH_NUMBER },
    component: 'Input',
  },

  { label: '消防泵', field: 'divider4', component: 'Divider', helpMessage: '消防泵' },
  {
    field: 'firePumpDesignFlow',
    label: '消防泵设计流量(L/s)',
    component: 'InputNumberExpand',
    required: true,
    colProps: { span: EQUIP.WIDTH_NUMBER },
  },
  {
    field: 'sffPoolLowestWaterLevel',
    label: '消防水池最低有效水位h7(m)',
    component: 'InputNumberExpand',
    required: true,
    colProps: { span: EQUIP.WIDTH_NUMBER },
    componentProps: ({ formModel }) => {
      return {
        onChange: (e: any) => {
          formModel.ffPoolLowestWaterLevel = e;
          console.log(e);
        },
      };
    },
  },
  {
    field: 'sffBadDesignGroundElevation',
    label: '消防最不利点设计地面标高h8(m)',
    component: 'InputNumberExpand',
    required: true,
    colProps: { span: EQUIP.WIDTH_NUMBER },
    componentProps: ({ formModel }) => {
      return {
        onChange: (e: any) => {
          formModel.ffBadDesignGroundElevation = e;
          console.log(e);
        },
      };
    },
  },
  {
    field: 'ffBadHydrantPressure',
    label: '消防最不利点消火栓压力h9(m)',
    component: 'InputNumberExpand',
    required: true,
    colProps: { span: EQUIP.WIDTH_NUMBER },
  },

  {
    field: 'excessHeadHTwelve',
    label: '富裕水头h12(m)',
    component: 'InputNumberExpand',
    required: true,
    colProps: { span: EQUIP.WIDTH_NUMBER },
  },
  {
    field: 'firePumpBadWayHeadLoss',
    label: '消防泵至最不利点沿程水头损失h10(m)',
    component: 'InputNumberExpand',
    dynamicDisabled: true,
    colProps: { span: EQUIP.WIDTH_NUMBER },
  },
  {
    field: 'firePumpDesignLift',
    label: '消防主泵设计扬程H2(m)',
    dynamicDisabled: true,
    component: 'InputNumberExpand',
    colProps: { span: EQUIP.WIDTH_NUMBER },
  },
  {
    field: 'firePumpModel',
    label: '消防泵-泵型号',
    dynamicDisabled: true,
    component: 'Input',
    colProps: { span: EQUIP.WIDTH_NUMBER },
  },

  { label: '稳压泵', field: 'divider5', component: 'Divider', helpMessage: '稳压泵' },
  {
    field: 'stabilivoltPumpDesignFlow',
    label: '稳压泵设计秒流量(L/s)',
    component: 'InputNumberExpand',
    required: true,
    colProps: { span: EQUIP.WIDTH_NUMBER },
  },
  {
    field: 'ffPoolLowestWaterLevel',
    label: '消防水池最低有效水位h7(m)',
    component: 'InputNumberExpand',
    required: true,
    colProps: { span: EQUIP.WIDTH_NUMBER },
    componentProps: ({ formModel }) => {
      return {
        onChange: (e: any) => {
          formModel.sffPoolLowestWaterLevel = e;
          console.log(e);
        },
      };
    },
  },
  {
    field: 'ffBadDesignGroundElevation',
    label: '最不利点消防设施处地面标高h8(m)',
    component: 'InputNumberExpand',
    required: true,
    colProps: { span: EQUIP.WIDTH_NUMBER },
    componentProps: ({ formModel }) => {
      return {
        onChange: (e: any) => {
          console.log(e);
          formModel.sffBadDesignGroundElevation = e;
        },
      };
    },
  },

  {
    field: 'workConditionBadPressure',
    label: '准工作状态最不利点消防设施压力P0(MPa)',
    required: true,
    component: 'InputNumberExpand',
    colProps: { span: EQUIP.WIDTH_NUMBER },
  },
  {
    field: 'stabilivoltPumpMinWorkingPressure',
    label: '稳压泵最低工作压力P1(MPa)',
    dynamicDisabled: true,
    component: 'InputNumberExpand',
    colProps: { span: EQUIP.WIDTH_NUMBER },
  },
  {
    field: 'firePumpStartPressure',
    label: '消防主泵启动压力P2(MPa)',
    dynamicDisabled: true,
    component: 'InputNumberExpand',
    colProps: { span: EQUIP.WIDTH_NUMBER },
  },
  {
    field: 'firePumpStartPumpPressure',
    label: '稳压泵启泵压力：PS1(MPa)',
    dynamicDisabled: true,
    component: 'InputNumberExpand',
    colProps: { span: EQUIP.WIDTH_NUMBER },
  },
  {
    field: 'firePumpStopPumpPressure',
    label: '稳压泵停泵压力PS2(MPa)',
    dynamicDisabled: true,
    component: 'InputNumberExpand',
    colProps: { span: EQUIP.WIDTH_NUMBER },
  },
  {
    field: 'stabilivoltPumpDesignLift',
    label: '稳压泵扬程P(MPa)',
    dynamicDisabled: true,
    component: 'InputNumberExpand',
    colProps: { span: EQUIP.WIDTH_NUMBER },
  },
  {
    field: 'stabilivoltPumpModel',
    label: '稳压泵-泵型号',
    dynamicDisabled: true,
    component: 'Input',
    colProps: { span: EQUIP.WIDTH_NUMBER },
  },

  { label: '消毒设备', field: 'divider6', component: 'Divider', helpMessage: '消毒设备' },
  {
    field: 'disinfectDeviceDosage',
    label: '消毒设备投加量(g/m³)',
    component: 'Input',
    dynamicDisabled: true,
    colProps: { span: EQUIP.WIDTH_NUMBER },
  },

  {
    field: 'disinfectWaterSupplyDesignFlow',
    label: '变频供水设备设计流量Q(L/s)结果',
    dynamicDisabled: true,
    component: 'InputNumberExpand',
    colProps: { span: EQUIP.WIDTH_NUMBER },
  },
  {
    field: 'activeChlorine',
    label: '有效氯(g/h)最小值',
    dynamicDisabled: true,
    component: 'InputNumberExpand',
    colProps: { span: EQUIP.WIDTH_NUMBER },
  },
  {
    field: 'activeChlorineMax',
    label: '有效氯(g/h)最大值',
    dynamicDisabled: true,
    component: 'InputNumberExpand',
    colProps: { span: EQUIP.WIDTH_NUMBER },
  },
  {
    field: 'disinfectDeviceModel',
    label: '消毒设备型号',
    dynamicDisabled: true,
    component: 'Input',
    colProps: { span: EQUIP.WIDTH_NUMBER },
  },
];
