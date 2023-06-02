import { getModelSelectTypeList } from './api/http';
import { EQUIP, nc, transformData1, transformData2, transformData3 } from './equipUtil';
import { BasicColumn } from '/@/components/Table';
import { FormSchema } from '/@/components/Table';

export const columns: BasicColumn[] = [
  {
    title: '项目名称',
    dataIndex: 'projectName',
    width: 200,
  },
  {
    title: '项目类型',
    dataIndex: 'projectTypeName',
    width: 180,
    // customRender: ({ record }) => {
    //   if (record.projectType === 'HighSpeed') {
    //     return record.projectTypeName;
    //   } else {
    //     return record.projectTypeName;
    //   }
    // },
  },
  // {
  //   title: '数据来源',
  //   dataIndex: 'isSynchroType',
  //   width: 50,
  // },
];

export const columnsStation: BasicColumn[] = [
  {
    title: '车站名',
    dataIndex: 'stationName',
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
  },
  // {
  //   title: '清水池型号选型',
  //   dataIndex: 'cleanPoolModel',
  //   width: 180,
  // },
  // {
  //   title: '生活水池型号选型',
  //   dataIndex: 'producePoolModel',
  //   width: 180,
  // },
  // {
  //   title: '消防水池型号选型',
  //   dataIndex: 'ffPoolModel',
  //   width: 180,
  // },
  // {
  //   title: '变频供水设备选型',
  //   dataIndex: 'waterSupplyModel',
  //   width: 180,
  // },
  // // {
  // //   title: '消防泵-泵型号',
  // //   dataIndex: 'firePumpModel',
  // //   width: 180,
  // // },
  // {
  //   title: '变频供水设备选型',
  //   dataIndex: 'stabilivoltPumpModel',
  //   width: 180,
  // },
  // {
  //   title: '消毒设备选型',
  //   dataIndex: 'disinfectDeviceModel',
  //   width: 180,
  // },
];

export const searchFormSchema: FormSchema[] = [
  {
    field: 'likeQuery',
    label: '项目名称',
    helpMessage: '支持模糊查询',
    component: 'Input',
    colProps: { span: 8 },
    componentProps: {
      onChange: (e) => {
        if (!!e) {
          setTimeout(() => {
            window.equipLoad();
          }, 10);
        }
      },
    },
  },
];

export const searchFormSchemaStation: FormSchema[] = [
  {
    field: 'projectName',
    label: '项目名称',
    component: 'Input',
    colProps: { span: 8 },
    dynamicDisabled: true,
  },
  {
    field: 'likeQuery',
    label: '车站名称',
    helpMessage: '支持模糊查询',
    component: 'Input',
    colProps: { span: 8 },
    componentProps: {
      onChange: (e) => {
        if (!!e) {
          setTimeout(() => {
            window.equipStationLoad();
          }, 10);
        }
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
    helpMessage: '设计站点生活清水池(水箱)、消防水池设置形式：合设or分设。',
    component: 'Input',
    dynamicDisabled: true,
    colProps: { span: EQUIP.WIDTH_NUMBER },
  },

  {
    field: 'dnMwoMax',
    label: `最大用水量`,
    helpMessage: '设计站点（含站房，不含客车上水）昼夜最大用水量Qd（m3/d）。',
    component: 'InputNumberExpand1',
    required: true,
    colProps: { span: EQUIP.WIDTH_NUMBER },
    componentProps: ({ formModel }) => {
      return {
        onChange: () => {
          // formModel.waterStorageCoefficient = nc(e);
          formModel.vfpBadWayHeadLoss = undefined;
        },
        onBlur: (value) => {
          const target = value.target.value;
          formModel.dnMwoMax = transformData1(target);
        },
      };
    },
  },
  {
    field: 'busWaterSupply',
    label: `客车上水量Qₛ`,
    helpMessage: '设计站点客车上水量Qₛ(m³/d)。',
    component: 'InputNumberExpand1',
    required: true,
    colProps: { span: EQUIP.WIDTH_NUMBER },
    componentProps: ({ formModel }) => {
      return {
        onBlur: (value) => {
          const target = value.target.value;
          formModel.busWaterSupply = transformData1(target);
        },
      };
    },
  },
  {
    field: 'busWaterRows',
    label: '同时上水排数',
    helpMessage: '设计站点(给水站、动车所等)旅客列车同时上水排数N(列)。',
    component: 'InputNumberExpand1',
    required: true,
    colProps: { span: EQUIP.WIDTH_NUMBER },
    componentProps: ({ formModel }) => {
      return {
        onChange: () => {
          formModel.vfpBadWayHeadLoss = undefined;
        },
        onBlur: (value) => {
          const target = value.target.value;
          formModel.busWaterRows = transformData1(target);
        },
      };
    },
  },
  {
    field: 'groupsNumber',
    label: '列车最大编组',
    helpMessage: '设计站点(给水站、动车所等)旅客列车最大编组辆数ni(辆/列)。',
    component: 'InputNumberExpand',
    colProps: { span: EQUIP.WIDTH_NUMBER },
    componentProps: ({ formModel }) => {
      return {
        onChange: () => {
          formModel.vfpBadWayHeadLoss = undefined;
        },
      };
    },
    dynamicRules: () => {
      return [
        {
          required: true,
          validator: (_, value) => {
            if ((value + '').indexOf('.') > -1 || !value) {
              const mes = '只能输入正整数';
              return Promise.reject(mes);
            }

            return Promise.resolve();
          },
        },
      ];
    },
  },
  {
    field: 'busWaterSingle',
    label: '上水栓流量',
    helpMessage: '客车上水栓单栓秒流量qᵢ(L/s)。',
    component: 'InputNumberExpand1',
    required: true,
    colProps: { span: EQUIP.WIDTH_NUMBER },
    componentProps: ({ formModel }) => {
      return {
        onChange: () => {
          formModel.vfpBadWayHeadLoss = undefined;
        },
        onBlur: (value) => {
          const target = value.target.value;
          formModel.busWaterSingle = transformData1(target);
        },
      };
    },
  },
  {
    field: 'waterSameRatio',
    label: '时变化系数',
    helpMessage: '指生产生活房屋（含站房）用水时变化系数，为经验值k₁=2.5~3。',
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
    field: 'outdoorFireMaxStrength',
    label: '消防秒流量',
    helpMessage: '设计站点室外消防最大设计秒流量(L/s)。',
    component: 'InputNumberExpand1',
    required: true,
    colProps: { span: EQUIP.WIDTH_NUMBER },
    componentProps: ({ formModel }) => {
      return {
        onChange: (e: any) => {
          formModel.firePumpDesignFlow = e;
          formModel.firePumpBadWayHeadLoss = undefined;
          console.log(e);
        },
        onBlur: (value) => {
          const target = value.target.value;
          formModel.outdoorFireMaxStrength = transformData1(target);
        },
      };
    },
  },
  {
    field: 'fireContinueTime',
    label: '火灾延续时间',
    helpMessage: '设计站点室外消防火灾延续时间t(h)。',
    component: 'InputNumberExpand1',
    required: true,
    colProps: { span: EQUIP.WIDTH_NUMBER },
    componentProps: ({ formModel }) => {
      return {
        onBlur: (value) => {
          const target = value.target.value;
          formModel.fireContinueTime = transformData1(target);
        },
      };
    },
  },

  {
    field: 'busWaterTotalFlow',
    label: '上水总流量',
    helpMessage: '设计站点(给水站、动车所等)考虑同时上水的客车上水总流量Q₁(L/s)。',
    dynamicDisabled: true,
    component: 'InputNumberExpand1',
    colProps: { span: EQUIP.WIDTH_NUMBER },
    componentProps: ({ formModel }) => {
      return {
        onBlur: (value) => {
          const target = value.target.value;
          formModel.busWaterTotalFlow = transformData1(target);
        },
      };
    },
  },
  {
    field: 'produceLifeTotalFlow',
    label: '房屋设计流量',
    helpMessage: '设计站点生产生活房屋（含站房）设计流量Q₂（m³/d）。',
    component: 'InputNumberExpand1',
    dynamicDisabled: true,
    colProps: { span: EQUIP.WIDTH_NUMBER },
    componentProps: ({ formModel }) => {
      return {
        onBlur: (value) => {
          const target = value.target.value;
          formModel.produceLifeTotalFlow = transformData1(target);
        },
      };
    },
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
    component: 'InputNumberExpand3',
    helpMessage: '生产生活用水水池贮水系数β=1/2~1/3',
    required: true,
    colProps: { span: EQUIP.WIDTH_NUMBER },
    componentProps: ({ formModel }) => {
      return {
        onBlur: (value) => {
          const target = value.target.value;
          formModel.waterStorageCoefficient = transformData3(target);
        },
      };
    },
  },
  {
    field: 'outdoorFireMaxMwoMax',
    label: '消防用水量',
    helpMessage: '设计站点室外消防最大用水量Yₓ(m³/d)。',
    dynamicDisabled: true,
    component: 'InputNumberExpand3',
    colProps: { span: EQUIP.WIDTH_NUMBER },
  },

  {
    field: 'cleanPoolEffectiveVolume',
    label: '水池合设容积',
    helpMessage: '设计站点清水池与消防水池合设的有效容积V₁(m³)。',
    dynamicDisabled: true,
    component: 'InputNumberExpand',
    colProps: { span: EQUIP.WIDTH_NUMBER },
  },

  {
    field: 'producePoolEffectiveVolume',
    label: '生活水池容积',
    helpMessage: '设计站点生活水池(水箱)单独设置的有效容积V₂(m³)。',
    dynamicDisabled: true,
    component: 'InputNumberExpand',
    colProps: { span: EQUIP.WIDTH_NUMBER },
  },
  {
    field: 'ffPoolEffectiveVolume',
    label: '消防水池容积',
    helpMessage: '设计站点消防水池单独设置的有效容积V₃(m³)。',
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
    helpMessage: '设计站点水池(水箱)最低水位绝对标高h₁(m)。',
    component: 'InputNumberExpand3',
    required: true,
    colProps: { span: EQUIP.WIDTH_NUMBER },
    componentProps: ({ formModel }) => {
      return {
        onBlur: (value) => {
          const target = value.target.value;
          formModel.pooLowWaterElevation = transformData3(target);
        },
      };
    },
  },
  {
    field: 'dullDesignGroundElevation',
    label: '地面标高',
    helpMessage: '设计站点水力计算最不利点处的房屋设计地面绝对标高h₂(m)。',
    component: 'InputNumberExpand3',
    required: true,
    colProps: { span: EQUIP.WIDTH_NUMBER },
    componentProps: ({ formModel }) => {
      return {
        onBlur: (value) => {
          const target = value.target.value;
          formModel.dullDesignGroundElevation = transformData3(target);
        },
      };
    },
  },
  {
    field: 'vfpBadWayHeadLoss',
    label: '总水头损失',
    helpMessage: '设计站点变频泵至最不利点的总水头损失，含沿程水头损失h₄(m)和局部水头损失h₅(m)。',
    component: 'InputNumberExpand3',
    required: true,
    colProps: { span: EQUIP.WIDTH_NUMBER_JS },
    componentProps: ({ formModel }) => {
      return {
        onBlur: (value) => {
          const target = value.target.value;
          formModel.vfpBadWayHeadLoss = transformData3(target);
        },
      };
    },
  },
  {
    field: 'js1',
    component: 'Input',
    label: '',
    colProps: { span: 1 },
    slot: 'add1',
  },
  {
    field: 'dullAskWaterPressure',
    label: '房屋要求水压',
    helpMessage: '设计站点最不利点处的房屋室内要求水压h₃(m)。',
    component: 'InputNumberExpand3',
    required: true,
    colProps: { span: EQUIP.WIDTH_NUMBER },
    componentProps: ({ formModel }) => {
      return {
        onBlur: (value) => {
          const target = value.target.value;
          formModel.dullAskWaterPressure = transformData3(target);
        },
      };
    },
  },

  {
    field: 'excessHeadHSix',
    label: '富裕水头',
    helpMessage: '计算泵组设计扬程的富裕水头h₆=2~3(m)。',
    component: 'InputNumberExpand3',
    required: true,
    colProps: { span: EQUIP.WIDTH_NUMBER },
    componentProps: ({ formModel }) => {
      return {
        onBlur: (value) => {
          const target = value.target.value;
          formModel.excessHeadHSix = transformData3(target);
        },
      };
    },
  },

  {
    field: 'waterSupplyDesignFlow',
    label: '设计流量',
    helpMessage: '变频供水设备设计流量Q(m³/h)。',
    dynamicDisabled: true,
    component: 'InputNumberExpand3',
    colProps: { span: EQUIP.WIDTH_NUMBER },
  },
  {
    field: 'waterSupplyDesignLift',
    label: '泵组设计扬程',
    helpMessage: '变频供水设备设计扬程H₁(m)=h₂-h₁+h₃+h₄+h₅+h₆。',
    dynamicDisabled: true,
    colProps: { span: EQUIP.WIDTH_NUMBER },
    component: 'InputNumberExpand3',
  },
  {
    field: 'waterSupplyModel',
    label: '变频供水设备选型',
    dynamicDisabled: true,
    colProps: { span: EQUIP.WIDTH_TEXT_AREA },
    component: 'InputTextArea',
  },
  { label: '消防供水设备选型计算', field: 'divider41', component: 'Divider' },
  {
    label: '◆ 消防主泵计算',
    field: 'divider4',
    component: 'Divider',
    colProps: { span: 23 },
  },
  {
    field: 'firePumpDesignFlow',
    label: '主泵设计流量',
    helpMessage: '消防泵设计流量(L/s)',
    component: 'InputNumberExpand1',
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
    helpMessage: '设计站点消防水池最低水位绝对标高h₇(m)。',
    component: 'InputNumberExpand3',
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
          formModel.sffPoolLowestWaterLevel = transformData3(target);
        },
      };
    },
  },
  {
    field: 'sffBadDesignGroundElevation',
    label: '地面标高',
    helpMessage: '设计站点消防最不利点处的房屋设计地面绝对标高h₈(m)。',
    component: 'InputNumberExpand3',
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
          formModel.sffBadDesignGroundElevation = transformData3(target);
        },
      };
    },
  },
  {
    field: 'ffBadHydrantPressure',
    label: '消防栓水头',
    helpMessage: '设计站点消防最不利点处消火栓所需设计压力h₉(m)。',
    component: 'InputNumberExpand3',
    required: true,
    colProps: { span: EQUIP.WIDTH_NUMBER },
    componentProps: ({ formModel }) => {
      return {
        onBlur: (value) => {
          const target = value.target.value;
          formModel.ffBadHydrantPressure = transformData3(target);
        },
      };
    },
  },
  {
    field: 'firePumpBadWayHeadLoss',
    label: '总水头损失',
    helpMessage: '设计站点消防泵至最不利点的总水头损失，含沿程水头损失h₁₀(m)和局部水头损失h₁₁(m)。',
    component: 'InputNumberExpand3',
    required: true,
    colProps: { span: EQUIP.WIDTH_NUMBER_JS },
    componentProps: ({ formModel }) => {
      return {
        onBlur: (value) => {
          const target = value.target.value;
          formModel.firePumpBadWayHeadLoss = transformData3(target);
        },
      };
    },
  },
  {
    field: 'js2',
    component: 'Input',
    label: '',
    colProps: { span: 1 },
    slot: 'add2',
  },

  {
    field: 'excessHeadHTwelve',
    label: '富裕水头',
    helpMessage: '富裕水头h₁₂=2~3(m)',
    component: 'InputNumberExpand3',
    required: true,
    colProps: { span: EQUIP.WIDTH_NUMBER },
    componentProps: ({ formModel }) => {
      return {
        onBlur: (value) => {
          const target = value.target.value;
          formModel.excessHeadHTwelve = transformData3(target);
        },
      };
    },
  },
  {
    field: 'firePumpDesignLift',
    label: '主泵设计扬程',
    helpMessage: '消防主泵设计扬程H₂(m)=h₈-h₇+h₉+h₁₀+h₁₁+h₁₂',
    dynamicDisabled: true,
    component: 'InputNumberExpand3',
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

  { label: '◆ 消防稳压泵计算', field: 'divider5', component: 'Divider', colProps: { span: 23 } },
  {
    field: 'stabilivoltPumpDesignFlow',
    label: '辅泵设计流量',
    helpMessage: '消防稳压泵设计秒流量(L/s)',
    component: 'Select',
    required: true,
    colProps: { span: EQUIP.WIDTH_NUMBER },
    componentProps: {
      options: [
        {
          label: '2',
          value: '2',
          key: '1',
        },
        {
          label: '2.5',
          value: '2.5',
          key: '2',
        },
        {
          label: '3',
          value: '3',
          key: '3',
        },
      ],
    },
  },
  {
    field: 'ffPoolLowestWaterLevel',
    label: '消防水池最低有效水位h₇(m)。',
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
    label: '最不利点消防设施处地面标高h₈(m)。',
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
    helpMessage: '准工作状态最不利点消防设施压力Pₓ(MPa)，临高压时应以水带充实水柱来推算。',
    required: true,
    component: 'InputNumberExpand2',
    colProps: { span: EQUIP.WIDTH_NUMBER },
    componentProps: ({ formModel }) => {
      return {
        onBlur: (value) => {
          const target = value.target.value;
          formModel.workConditionBadPressure = transformData2(target);
        },
      };
    },
  },
  {
    field: 'stabilivoltPumpMinWorkingPressure',
    label: '气压罐充气压力',
    helpMessage: '气压罐充气压力P₀(MPa);P₀=Pₓ+0.01*(h₈ -h₇) + 0.07',
    dynamicDisabled: true,
    component: 'InputNumberExpand2',
    colProps: { span: EQUIP.WIDTH_NUMBER },
  },

  {
    field: 'firePumpStartPumpPressure',
    label: '稳压泵启泵压力',
    helpMessage: '稳压泵启泵压力：Ps₁(MPa); Ps₁ = P0 + (0.02~0.03)',
    dynamicDisabled: true,
    component: 'InputNumberExpand2',
    colProps: { span: EQUIP.WIDTH_NUMBER },
  },
  {
    field: 'firePumpStopPumpPressure',
    label: '稳压泵停泵压力',
    helpMessage: '稳压泵停泵压力Ps₂(MPa);Ps₂= (Ps₁ + Hg)/α - Hg,其中Hg一般取0.1，α取0.8',
    dynamicDisabled: true,
    component: 'InputNumberExpand2',
    colProps: { span: EQUIP.WIDTH_NUMBER },
  },
  {
    field: 'stabilivoltPumpDesignLift',
    label: '稳压泵扬程',
    helpMessage: '稳压泵扬程P(MPa)；P = (Ps₁ + Ps₂)/2',
    dynamicDisabled: true,
    component: 'InputNumberExpand2',
    colProps: { span: EQUIP.WIDTH_NUMBER },
  },
  {
    field: 'firePumpStartPressure',
    label: '主泵启动压力',
    helpMessage: '消防主泵启动压力P₂(MPa)； P₂ = Ps₁ - 0.07',
    dynamicDisabled: true,
    component: 'InputNumberExpand2',
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
    helpMessage: '消毒剂投加量按0.5~1.0(g/m³)计。',
    dynamicDisabled: true,
    component: 'Input',
    colProps: { span: EQUIP.WIDTH_NUMBER },
  },
  {
    field: 'activeChlorine',
    label: '有效氯(g/h)最小值',
    helpMessage: '消毒剂投加量按0.5~1.0(g/m³)计。',
    dynamicDisabled: true,
    show: false,
    component: 'InputNumberExpand',
    colProps: { span: EQUIP.WIDTH_NUMBER },
  },
  {
    field: 'activeChlorineMax',
    label: '有效氯(g/h)最大值',
    show: false,
    helpMessage: '消毒剂投加量按0.5~1.0(g/m³)计。',
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
