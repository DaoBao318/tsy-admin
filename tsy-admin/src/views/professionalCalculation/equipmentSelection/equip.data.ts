import { getModelSelectTypeList, getProjectInformation } from './api/http';
import { EQUIP, nc, transformData } from './equipUtil';
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
    title: '蓄水设施设备选型',
    dataIndex: 'cleanPoolModel',
    width: 180,
  },
  // {
  //   title: '生活水池(水箱)-水池型号11',
  //   dataIndex: 'producePoolModel',
  //   width: 180,
  // },
  // {
  //   title: '消防水池型号11',
  //   dataIndex: 'ffPoolModel',
  //   width: 180,
  // },
  {
    title: '变频供水设备选型',
    dataIndex: 'waterSupplyModel',
    width: 180,
  },
  // {
  //   title: '消防泵-泵型号',
  //   dataIndex: 'firePumpModel',
  //   width: 180,
  // },
  {
    title: '变频供水设备选型',
    dataIndex: 'stabilivoltPumpModel',
    width: 180,
  },
  {
    title: '消毒设备选型',
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
  { label: '设计基础参数配置', field: 'divider1', component: 'Divider' },
  {
    field: 'projectName',
    label: '项目信息',
    component: 'Input',
    dynamicDisabled: true,
    show: false,
    colProps: { span: EQUIP.WIDTH_NUMBER },
  },
  {
    field: 'stationName',
    label: '车站名称',
    show: false,
    component: 'Input',
    dynamicDisabled: true,
    colProps: { span: EQUIP.WIDTH_NUMBER },
  },
  {
    field: 'stationTypeName',
    label: '车站类型',
    show: false,
    component: 'Input',
    dynamicDisabled: true,
    colProps: { span: EQUIP.WIDTH_NUMBER },
  },
  {
    field: 'stationType',
    label: '车站类型',
    show: false,
    component: 'Input',
    dynamicDisabled: true,
    colProps: { span: EQUIP.WIDTH_NUMBER },
  },

  {
    field: 'modelSelectType',
    label: '管网布设形式',
    helpMessage: '设计站点生活、消防管网布设形式：合设or分设。',
    component: 'ApiSelect',
    colProps: { span: EQUIP.WIDTH_NUMBER },
    required: true,
    componentProps: ({ formModel, formActionType }) => {
      return {
        api: getModelSelectTypeList,
        params: {},
        immediate: true,
        onChange: (e: any) => {
          if (e === 'JointDesign') {
            formActionType.updateSchema([
              {
                field: 'cleanPoolEffectiveVolume',
                label: '水池合设容积',
                show: true,
              },
              {
                field: 'producePoolEffectiveVolume',
                label: '生活水池容积',
                show: false,
              },
              {
                field: 'ffPoolEffectiveVolume',
                label: '消防水池容积',
                show: false,
              },
            ]);
            formModel.modelSelectType1 = '生活泵、消防泵分设';
            formModel.modelSelectType2 = '生活、消防水池合设';
          } else if (e === 'Division') {
            formActionType.updateSchema([
              {
                field: 'cleanPoolEffectiveVolume',
                label: '水池合设容积',
                show: false,
              },
              {
                field: 'producePoolEffectiveVolume',
                label: '生活水池容积',
                show: true,
              },
              {
                field: 'ffPoolEffectiveVolume',
                label: '消防水池容积',
                show: true,
              },
            ]);
            formModel.modelSelectType1 = '生活泵、消防泵分设';
            formModel.modelSelectType2 = '生活、消防水池分设';
          } else {
          }
          console.log(e);
        },
      };
    },
  },
  {
    field: 'modelSelectType1',
    label: '泵组设置形式',
    helpMessage: '设计站点生活、消防水泵设置形式：合设or分设。',
    component: 'Input',
    dynamicDisabled: true,
    colProps: { span: EQUIP.WIDTH_NUMBER },
  },
  {
    field: 'modelSelectType2',
    label: '蓄水设施设置',
    helpMessage: '设计站点生活清水池（水箱）、消防水池设置形式：合设or分设。',
    component: 'Input',
    dynamicDisabled: true,
    colProps: { span: EQUIP.WIDTH_NUMBER },
  },

  {
    field: 'dnMwoMax',
    label: '最大用水量Qd',
    helpMessage: '设计站点（含站房）昼夜最大用水量Qd（m3/d）。',
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
    label: '同时上水排数',
    helpMessage: '设计站点（给水站、动车所等）旅客列车同时上水排数N（列）。',
    component: 'InputNumberExpand',
    required: true,
    colProps: { span: EQUIP.WIDTH_NUMBER },
    componentProps: ({ formModel }) => {
      return {
        onChange: () => {
          formModel.vfpBadWayHeadLoss = undefined;
        },
      };
    },
  },
  {
    field: 'groupsNumber',
    label: '列车最大编组',
    helpMessage: '设计站点（给水站、动车所等）旅客列车最大编组辆数ni（辆/列）。',
    component: 'InputNumberExpand',
    required: true,
    colProps: { span: EQUIP.WIDTH_NUMBER },
    componentProps: ({ formModel }) => {
      return {
        onChange: () => {
          formModel.vfpBadWayHeadLoss = undefined;
        },
      };
    },
  },
  {
    field: 'busWaterSingle',
    label: '上水栓流量',
    helpMessage: '客车上水栓单栓秒流量qi（L/s）。',
    component: 'InputNumberExpand',
    required: true,
    colProps: { span: EQUIP.WIDTH_NUMBER },
    componentProps: ({ formModel }) => {
      return {
        onChange: () => {
          formModel.vfpBadWayHeadLoss = undefined;
        },
      };
    },
  },
  {
    field: 'produceLifeTotalFlow',
    label: '房屋总秒流量',
    helpMessage: '设计站点生产生活房屋（含站房）设计总秒流量Q2（L/s）。',
    component: 'InputNumberExpand',
    required: true,
    colProps: { span: EQUIP.WIDTH_NUMBER },
    componentProps: ({ formModel }) => {
      return {
        onChange: () => {
          formModel.vfpBadWayHeadLoss = undefined;
        },
      };
    },
  },
  {
    field: 'waterSameRatio',
    label: '同时用水系数',
    helpMessage: '指生产生活房屋（含站房）同时用水系数k1。',
    component: 'InputNumberExpand',
    required: true,
    dynamicDisabled: false,
    colProps: { span: EQUIP.WIDTH_NUMBER },
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
    componentProps: ({ formModel }) => {
      return {
        onChange: () => {
          formModel.vfpBadWayHeadLoss = undefined;
        },
      };
    },
  },
  {
    field: 'outdoorFireMaxStrength',
    label: '消防秒流量',
    helpMessage: '设计站点室外消防最大设计秒流量（L/s）。',
    component: 'InputNumberExpand',
    required: true,
    colProps: { span: EQUIP.WIDTH_NUMBER },
    componentProps: ({ formModel }) => {
      return {
        onChange: (e: any) => {
          formModel.firePumpDesignFlow = e;
          formModel.firePumpBadWayHeadLoss = undefined;
          console.log(e);
        },
      };
    },
  },
  {
    field: 'fireContinueTime',
    label: '火灾延续时间',
    helpMessage: '设计站点室外消防火灾延续时间t（h）。',
    component: 'InputNumberExpand',
    required: true,
    colProps: { span: EQUIP.WIDTH_NUMBER },
  },

  {
    field: 'busWaterTotalFlow',
    label: '上水总流量',
    helpMessage: '设计站点（给水站、动车所等）考虑同时上水的客车上水总流量q1（L/s）。',
    dynamicDisabled: true,
    component: 'InputNumberExpand',
    colProps: { span: EQUIP.WIDTH_NUMBER },
  },

  {
    label: '蓄水设施设备选型计算',
    field: 'divider2',
    component: 'Divider',
  },
  {
    field: 'pollShape',
    component: 'Select',
    label: '蓄水池形状',
    helpMessage: '蓄水池形状',
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
    label: '池顶覆土厚度',
    helpMessage: '蓄水池池顶覆土厚度分为500mm、1000mm、1500mm(部分蓄水池)三种。',
    required: true,
    colProps: { span: EQUIP.WIDTH_NUMBER },
    componentProps: {
      options: [
        {
          label: '500mm',
          value: 500,
          key: '1',
        },
        {
          label: '1000mm',
          value: 1000,
          key: '2',
        },
        {
          label: '1500mm',
          value: 1500,
          key: '3',
        },
      ],
    },
  },

  {
    field: 'waterStorageCoefficient',
    label: '水池贮水系数',
    component: 'InputNumberExpand',
    helpMessage: [
      '生产生活用水水池贮水系数β',
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
    label: '消防用水量',
    helpMessage: '设计站点室外消防最大用水量YX（m3/d）。',
    dynamicDisabled: true,
    component: 'InputNumberExpand',
    colProps: { span: EQUIP.WIDTH_NUMBER },
  },

  {
    field: 'cleanPoolEffectiveVolume',
    label: '水池合设容积',
    helpMessage: '设计站点清水池与消防水池合设的有效容积V1。',
    dynamicDisabled: true,
    component: 'InputNumberExpand',
    colProps: { span: EQUIP.WIDTH_NUMBER },
  },

  {
    field: 'producePoolEffectiveVolume',
    label: '生活水池容积',
    helpMessage: '设计站点生活水池（水箱）单独设置的有效容积V2。',
    dynamicDisabled: true,
    component: 'InputNumberExpand',
    colProps: { span: EQUIP.WIDTH_NUMBER },
  },
  {
    field: 'ffPoolEffectiveVolume',
    label: '消防水池容积',
    helpMessage: '设计站点消防水池单独设置的有效容积V3。',
    dynamicDisabled: true,
    colProps: { span: EQUIP.WIDTH_NUMBER },
    component: 'InputNumberExpand',
  },
  {
    field: 'cleanPoolModel',
    label: '蓄水设施设备选型',
    dynamicDisabled: true,
    component: 'InputTextArea',
    colProps: { span: EQUIP.WIDTH_TEXT_AREA },
  },
  {
    field: 'producePoolModel',
    label: '生活水池型号',
    helpMessage: '生活水池(水箱)-水池型号',
    dynamicDisabled: true,
    component: 'Input',
    colProps: { span: EQUIP.WIDTH_NUMBER },
    show: false,
  },
  {
    field: 'ffPoolModel',
    label: '消防水池型号',
    helpMessage: '消防水池水池型号',
    dynamicDisabled: true,
    component: 'Input',
    show: false,
    colProps: { span: EQUIP.WIDTH_NUMBER },
  },

  { label: '变频供水设备选型计算', field: 'divider3', component: 'Divider' },
  {
    field: 'pooLowWaterElevation',
    label: '低水位标高',
    helpMessage: '设计站点水池（水箱）最低水位绝对标高h1（m）。',
    component: 'InputNumberExpand',
    required: true,
    colProps: { span: EQUIP.WIDTH_NUMBER },
    componentProps: ({ formModel }) => {
      return {
        onBlur: (value) => {
          const target = value.target.value;
          formModel.pooLowWaterElevation = transformData(target);
        },
      };
    },
  },
  {
    field: 'dullDesignGroundElevation',
    label: '地面标高',
    helpMessage: '设计站点水力计算最不利点处的房屋设计地面绝对标高h2（m）。',
    component: 'InputNumberExpand',
    required: true,
    colProps: { span: EQUIP.WIDTH_NUMBER },
    componentProps: ({ formModel }) => {
      return {
        onBlur: (value) => {
          const target = value.target.value;
          formModel.dullDesignGroundElevation = transformData(target);
        },
      };
    },
  },
  {
    field: 'vfpBadWayHeadLoss',
    label: '总水头损失',
    helpMessage:
      '设计站点变频泵至最不利点的总水头损失，含沿程水头损失h4（m）和局部水头损失h5（m）。',
    component: 'InputNumberExpand',
    required: true,
    dynamicDisabled: true,
    colProps: { span: EQUIP.WIDTH_NUMBER },
  },
  {
    field: 'js1',
    component: 'Input',
    label: '',
    colProps: { span: EQUIP.WIDTH_NUMBER },
    slot: 'add1',
  },
  {
    field: 'dullAskWaterPressure',
    label: '房屋要求水压',
    helpMessage: '设计站点最不利点处的房屋室内要求水压h3（m）。',
    component: 'InputNumberExpand',
    required: true,
    colProps: { span: EQUIP.WIDTH_NUMBER },
    componentProps: ({ formModel }) => {
      return {
        onBlur: (value) => {
          const target = value.target.value;
          formModel.dullAskWaterPressure = transformData(target);
        },
      };
    },
  },

  {
    field: 'excessHeadHSix',
    label: '富裕水头',
    helpMessage: '计算泵组设计扬程的富裕水头h6（m）。',
    component: 'InputNumberExpand',
    required: true,
    colProps: { span: EQUIP.WIDTH_NUMBER },
    componentProps: ({ formModel }) => {
      return {
        onBlur: (value) => {
          const target = value.target.value;
          formModel.excessHeadHSix = transformData(target);
        },
      };
    },
  },

  {
    field: 'waterSupplyDesignFlow',
    label: '设计流量',
    helpMessage: '变频供水设备设计流量Q（m3/h）。',
    dynamicDisabled: true,
    component: 'InputNumberExpand',
    colProps: { span: EQUIP.WIDTH_NUMBER },
  },
  {
    field: 'waterSupplyDesignLift',
    label: '泵组设计扬程',
    helpMessage: '变频供水设备设计扬程H1（m）=h2-h1+h3+h4+h5+h6。',
    dynamicDisabled: true,
    colProps: { span: EQUIP.WIDTH_NUMBER },
    component: 'InputNumberExpand',
  },
  {
    field: 'waterSupplyModel',
    label: '变频供水设备选型',
    dynamicDisabled: true,
    colProps: { span: EQUIP.WIDTH_TEXT_AREA },
    component: 'InputTextArea',
  },
  { label: '消防供水设备选型计算', field: 'divider41', component: 'Divider' },
  { label: '<<<<<<消防主泵计算', field: 'divider4', component: 'Divider' },
  {
    field: 'firePumpDesignFlow',
    label: '主泵设计流量',
    helpMessage: '消防泵设计流量（L/s)',
    component: 'InputNumberExpand',
    dynamicDisabled: true,
    colProps: { span: EQUIP.WIDTH_NUMBER },
    componentProps: ({ formModel }) => {
      return {
        onChange: (e: any) => {
          formModel.outdoorFireMaxStrength = e;
          console.log(e);
        },
      };
    },
  },
  {
    field: 'sffPoolLowestWaterLevel',
    label: '低水位标高',
    helpMessage: '设计站点消防水池最低水位绝对标高h7（m）',
    component: 'InputNumberExpand',
    required: true,
    colProps: { span: EQUIP.WIDTH_NUMBER },
    componentProps: ({ formModel }) => {
      return {
        onChange: (e: any) => {
          formModel.ffPoolLowestWaterLevel = e;
          console.log(e);
        },
        onBlur: (value) => {
          const target = value.target.value;
          formModel.sffPoolLowestWaterLevel = transformData(target);
        },
      };
    },
  },
  {
    field: 'sffBadDesignGroundElevation',
    label: '地面标高',
    helpMessage: '设计站点消防最不利点处的房屋设计地面绝对标高h8（m)',
    component: 'InputNumberExpand',
    required: true,
    colProps: { span: EQUIP.WIDTH_NUMBER },
    componentProps: ({ formModel }) => {
      return {
        onChange: (e: any) => {
          formModel.ffBadDesignGroundElevation = e;
          console.log(e);
        },
        onBlur: (value) => {
          const target = value.target.value;
          formModel.sffBadDesignGroundElevation = transformData(target);
        },
      };
    },
  },
  {
    field: 'ffBadHydrantPressure',
    label: '消防栓压力',
    helpMessage: '设计站点消防最不利点处消火栓所需设计压力h9（m）。',
    component: 'InputNumberExpand',
    required: true,
    colProps: { span: EQUIP.WIDTH_NUMBER },
    componentProps: ({ formModel }) => {
      return {
        onBlur: (value) => {
          const target = value.target.value;
          formModel.ffBadHydrantPressure = transformData(target);
        },
      };
    },
  },
  {
    field: 'firePumpBadWayHeadLoss',
    label: '总水头损失',
    helpMessage:
      '设计站点消防泵至最不利点的总水头损失，含沿程水头损失h10（m）和局部水头损失h11（m）。',
    component: 'InputNumberExpand',
    dynamicDisabled: true,
    required: true,
    colProps: { span: EQUIP.WIDTH_NUMBER },
  },
  {
    field: 'js2',
    component: 'Input',
    label: '',
    colProps: { span: EQUIP.WIDTH_NUMBER },
    slot: 'add2',
  },

  {
    field: 'excessHeadHTwelve',
    label: '富裕水头',
    helpMessage: '富裕水头h12（m）',
    component: 'InputNumberExpand',
    required: true,
    colProps: { span: EQUIP.WIDTH_NUMBER },
    componentProps: ({ formModel }) => {
      return {
        onBlur: (value) => {
          const target = value.target.value;
          formModel.excessHeadHTwelve = transformData(target);
        },
      };
    },
  },
  {
    field: 'firePumpDesignLift',
    label: '主泵设计扬程',
    helpMessage: '消防主泵设计扬程H2（m）=h8-h7+h9+h10+h11+h12。',
    dynamicDisabled: true,
    component: 'InputNumberExpand',
    colProps: { span: EQUIP.WIDTH_NUMBER },
  },
  {
    field: 'stabilivoltPumpModel',
    label: '变频供水设备选型',
    dynamicDisabled: true,
    component: 'InputTextArea',
    colProps: { span: EQUIP.WIDTH_TEXT_AREA },
    show: false,
  },

  { label: '<<<<<<消防稳压泵计算', field: 'divider5', component: 'Divider' },
  {
    field: 'stabilivoltPumpDesignFlow',
    label: '辅泵设计流量',
    helpMessage: '消防稳压泵设计秒流量（L/s）',
    component: 'InputNumberExpand',
    required: true,
    colProps: { span: EQUIP.WIDTH_NUMBER },
  },
  {
    field: 'ffPoolLowestWaterLevel',
    label: '消防水池最低有效水位h7(m)',
    helpMessage: '',
    show: false,
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
    helpMessage: '',
    show: false,
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
    label: '消防设施压力',
    helpMessage: '准工作状态最不利点消防设施压力P0（MPa），临高压时应以水带充实水柱来推算。',
    required: true,
    component: 'InputNumberExpand',
    colProps: { span: EQUIP.WIDTH_NUMBER },
  },
  {
    field: 'stabilivoltPumpMinWorkingPressure',
    label: '最低工作压力',
    helpMessage: '稳压泵最低工作压力P1（MPa）',
    dynamicDisabled: true,
    component: 'InputNumberExpand',
    colProps: { span: EQUIP.WIDTH_NUMBER },
  },
  {
    field: 'firePumpStartPressure',
    label: '主泵启动压力',
    helpMessage: '消防主泵启动压力P2(MPa)',
    dynamicDisabled: true,
    component: 'InputNumberExpand',
    colProps: { span: EQUIP.WIDTH_NUMBER },
  },
  {
    field: 'firePumpStartPumpPressure',
    label: '稳压泵启泵压力',
    helpMessage: '稳压泵启泵压力：PS1(MPa)',
    dynamicDisabled: true,
    component: 'InputNumberExpand',
    colProps: { span: EQUIP.WIDTH_NUMBER },
  },
  {
    field: 'firePumpStopPumpPressure',
    label: '稳压泵停泵压力',
    helpMessage: '稳压泵停泵压力PS2(MPa)',
    dynamicDisabled: true,
    component: 'InputNumberExpand',
    colProps: { span: EQUIP.WIDTH_NUMBER },
  },
  {
    field: 'stabilivoltPumpDesignLift',
    label: '稳压泵扬程',
    helpMessage: '稳压泵扬程P（MPa）',
    dynamicDisabled: true,
    component: 'InputNumberExpand',
    colProps: { span: EQUIP.WIDTH_NUMBER },
  },
  {
    field: 'firePumpModel',
    label: '消防供水设备选型',
    dynamicDisabled: true,
    component: 'InputTextArea',
    colProps: { span: EQUIP.WIDTH_TEXT_AREA },
  },

  { label: '消毒设备选型计算', field: 'divider6', component: 'Divider' },
  {
    field: 'disinfectDeviceDosage',
    label: '消毒设备投加量(g/m³)',
    show: false,
    helpMessage: '',
    component: 'Input',
    dynamicDisabled: true,
    colProps: { span: EQUIP.WIDTH_NUMBER },
  },

  {
    field: 'disinfectWaterSupplyDesignFlow',
    label: '变频供水设备设计流量Q(L/s)结果',
    helpMessage: '',
    show: false,
    dynamicDisabled: true,
    component: 'InputNumberExpand',
    colProps: { span: EQUIP.WIDTH_NUMBER },
  },
  {
    field: 'activeChlorineMes',
    label: '设计有效氯(g/h)',
    helpMessage: '消毒剂投加量按0.5~1.0（g/m³）计。',
    dynamicDisabled: true,
    component: 'Input',
    colProps: { span: EQUIP.WIDTH_NUMBER },
  },
  {
    field: 'activeChlorine',
    label: '有效氯(g/h)最小值',
    helpMessage: '消毒剂投加量按0.5~1.0（g/m³）计。',
    dynamicDisabled: true,
    show: false,
    component: 'InputNumberExpand',
    colProps: { span: EQUIP.WIDTH_NUMBER },
  },
  {
    field: 'activeChlorineMax',
    label: '有效氯(g/h)最大值',
    show: false,
    helpMessage: '消毒剂投加量按0.5~1.0（g/m³）计。',
    dynamicDisabled: true,
    component: 'InputNumberExpand',
    colProps: { span: EQUIP.WIDTH_NUMBER },
  },
  {
    field: 'disinfectDeviceModel',
    label: '消毒设备选型',
    dynamicDisabled: true,
    component: 'InputTextArea',
    colProps: { span: EQUIP.WIDTH_TEXT_AREA },
  },
];
