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

