EquipmentSelection
equipmentSelection
result1

项目名称 projectName  车站名 stationName  车站类型  stationTypeName   
cleanPoolModel	string	清水池（与消防水池合设）-水池型号 ----
producePoolModel	string	生活水池（水箱）-水池型号 ------
fFPoolModel	string	消防水池水池型号  ------
waterSupplyModel	string	消防水池水池型号-泵型号 ----
firePumpModel	string	消防泵-泵型号 -----
stabilivoltPumpModel	string	稳压泵-泵型号 -----
disinfectDeviceModel	string	消毒设备型号 ------


  {
    field: 'modelSelectType',
    component: 'Select',
    label: '分设/合设',
    colProps: { span: EQUIP.WIDTH_NUMBER },
    componentProps: ({ formActionType }) => {
      return {
        onChange: (e: any) => {
          console.log(e);
        },
        options: [
          {
            label: '生活、消防管网合设',
            value: 'jointDesign',
            key: '1',
          },
          {
            label: '生活、消防管网分设',
            value: 'division',
            key: '2',
          },
        ],
      };
    },
  },


    field: 'busWaterRows',
    label: '客车上水同时上水排数N(列)',

        field: 'groupsNumber',
    label: '列车最大编组辆数ni(辆/列)',

        field: 'busWaterSingle',
    label: '单个客车上水栓流量qi(L/s)',

        field: 'busWaterTotalFlow',
    label: '客车上水总流量q1(L/s)',
分设隐藏这个
        field: 'cleanPoolEffectiveVolume',
    label: '清水池(与消防水池合设)有效容积V1',


大型车站 合设隐藏这个
        field: 'producePoolEffectiveVolume',
    label: '生活水池(水箱)有效容积V2',

        field: 'fFPoolEffectiveVolume',
    label: '消防水池有效容积V3',

  groupsNumber 2.5 0 1.5
    waterSameRatio 0.5 0.6 0.5

    stabilivoltPumpDesignFlow 1 1 1
waterStorageCoefficient 1/2 1/2 1/2 
excessHeadHSix 2  -- 3 

计算公式

当有一个必填项没有校验通过的时候，就会报错。

waterSupplyDesignFlow 流量1


outdoorFireMaxStrength
firePumpDesignFlow 1

busWaterSupply  客车上水量（m3/d)

YX(m³/d) todo

1	  2	  3  4	5	 6
52	17	16 17	3	 11

  {
    field: '',
    label: '',
    component: 'Input',
    colProps: { span: EQUIP.WIDTH_NUMBER },
    required: false,
    dynamicDisabled: false,
  },


  // {
  //   label: '集便器污物箱冲洗泵',
  //   field: 'divider6xx',
  //   component: 'Divider',
  // },
  // {
  //   field: 'flushPumpFlow',
  //   label: '冲洗泵流量Q（L/s)',
  //   helpMessage: '',
  //   component: 'InputNumberExpand1',
  //   colProps: { span: EQUIP.WIDTH_NUMBER },
  //   required: false,
  //   dynamicDisabled: false,
  // },
  // {
  //   field: 'flushPumpStopPumpWaterLevel',
  //   label: '冲洗水池（箱）停泵水位（m）',
  //   helpMessage: '',
  //   component: 'InputNumberExpand1',
  //   colProps: { span: EQUIP.WIDTH_NUMBER },
  //   required: false,
  //   dynamicDisabled: false,
  // },
  // {
  //   field: 'flushPlugGroundLevel',
  //   label: '冲洗栓地面标高（m）',
  //   helpMessage: '',
  //   component: 'InputNumberExpand1',
  //   colProps: { span: EQUIP.WIDTH_NUMBER },
  //   required: false,
  //   dynamicDisabled: false,
  // },
  // {
  //   field: 'flushPlugRequiredHead',
  //   label: '冲洗栓要求水头（m）',
  //   helpMessage: '',
  //   component: 'InputNumberExpand1',
  //   colProps: { span: EQUIP.WIDTH_NUMBER },
  //   required: false,
  //   dynamicDisabled: false,
  // },
  // {
  //   field: 'flushPlugSprinklerDullLength',
  //   label: '冲洗泵至最不利点冲洗栓长度（m）',
  //   helpMessage: '',
  //   component: 'InputNumberExpand1',
  //   colProps: { span: EQUIP.WIDTH_NUMBER },
  //   required: false,
  //   dynamicDisabled: false,
  // },

  // {
  //   field: 'flushPipeDiameter',
  //   label: '冲洗管管径（mm）',
  //   helpMessage: '',
  //   component: 'InputNumberExpand1',
  //   colProps: { span: EQUIP.WIDTH_NUMBER },
  //   required: false,
  //   dynamicDisabled: false,
  // },
  // {
  //   field: 'flushPipelineFlowRate',
  //   label: '管道流速(m/s）',
  //   helpMessage: '',
  //   component: 'InputNumberExpand1',
  //   colProps: { span: EQUIP.WIDTH_NUMBER },
  //   required: false,
  //   dynamicDisabled: false,
  // },
  // {
  //   field: 'flushHydraulicGradient',
  //   label: '水力坡降',
  //   helpMessage: '',
  //   component: 'InputNumberExpand1',
  //   colProps: { span: EQUIP.WIDTH_NUMBER },
  //   required: false,
  //   dynamicDisabled: false,
  // },

  // {
  //   field: 'flushHeadLoss',
  //   label: '冲洗泵至最不利点冲洗栓水头损失（m）',
  //   helpMessage: '',
  //   component: 'InputNumberExpand1',
  //   colProps: { span: EQUIP.WIDTH_NUMBER },
  //   required: false,
  //   dynamicDisabled: false,
  // },
  // {
  //   field: 'flushExcessHead',
  //   label: '富裕水头（m）',
  //   helpMessage: '',
  //   component: 'InputNumberExpand1',
  //   colProps: { span: EQUIP.WIDTH_NUMBER },
  //   required: false,
  //   dynamicDisabled: false,
  // },
  // {
  //   field: 'flushPumpLift',
  //   label: '冲洗泵扬程（m）',
  //   helpMessage: '',
  //   component: 'InputNumberExpand1',
  //   colProps: { span: EQUIP.WIDTH_NUMBER },
  //   required: false,
  //   dynamicDisabled: false,
  // },


  {
    field: 'xx6',
    label: '污水抽升泵井及泵组选型',
    dynamicDisabled: true,
    colProps: { span: EQUIP.WIDTH_TEXT_AREA },
    component: 'InputTextArea',
  },

  显示的 不一定为true，先默认显示的为true，然后再改。去掉永远为false的。
  但隐藏的一定为false，
1 已完成
SBRDesignGroundElevationPumpWell	抽升井设计地面标高h17（m）
SBRStopPumpWaterLevelInnerHeight	停泵水位距池内底高度h18（m）
SBRConcreteThickness				调节井封底混凝土厚度h19（m）
AdjustWellDepth						抽升井高度H（m）

2
PWDesignGroundElevationPumpWell		抽升井设计地面标高h20（m）
PWStopPumpWaterLevelInnerHeight		停泵水位距池内底高度h21（m）
PWConcreteThickness					调节井封底混凝土厚度h22（m）
PWLiftWellHeight					抽升井高度H（m）

3
MBRDesignGroundElevationPumpWell	抽升井设计地面标高h7（m）
MBRStopPumpWaterLevelInnerHeight	停泵水位距池内底高度h8（m）
MBRConcreteThickness				调节井封底混凝土厚度h9（m）
MBRLiftWellHeight					抽升井高度H1（m）

4
SWPDesignGroundElevationPumpWell	抽升井设计地面标高（m）
SWPStopPumpWaterLevelInnerHeight	停泵水位距池内底高度h8（m）
SWPConcreteThickness				调节井封底混凝土厚度h9（m）
SWPLiftWellHeight					抽升井高度H1（m）




iaffWaterInletPressure  9

iaffWaterPipeElevation  9 

makeGreenSprinklingWater 5