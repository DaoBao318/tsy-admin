import {
  technologyTypeOptionsData,
  provincesOptions,
  diameterOption,
  pumpWellShapeOption,
  pumpWellShapeOptionsData,
  sbrDeviceTypeOption,
  poolTopCoveringSoilOption,
  pollShapeOption,
} from './api/const';
import { getStationDeviceSelectionDrainageEdit } from './api/http';
import { chonseTypeEquip, displayProcess, initDrainageChangeValue } from './drainageUtil';
import { EQUIP, transformData1, transformData3 } from './equipUtil';
import { FormSchema } from '/@/components/Table';
import { waterSourceStore } from '/@/store/modules/waterInfo';
const store = waterSourceStore();

export const formSchemaDrainage: FormSchema[] = [
  {
    field: 'projectID',
    label: '项目ID',
    component: 'InputNumberExpand1',
    show: false,
    dynamicDisabled: true,
    colProps: { span: EQUIP.WIDTH_NUMBER },
  },
  {
    field: 'stationID',
    label: '车站ID',
    component: 'InputNumberExpand1',
    dynamicDisabled: true,
    show: false,
    colProps: { span: EQUIP.WIDTH_NUMBER },
  },

  {
    field: 'divider-linked',
    component: 'Divider',
    label: '计算基础参数配置',
    colProps: {
      span: 24,
    },
  },
  {
    field: 'outType',
    component: 'Select',
    label: '最终出路',
    required: true,
    colProps: {
      span: EQUIP.WIDTH_NUMBER,
    },
    componentProps: ({ formModel, formActionType }) => {
      return {
        options: provincesOptions,
        placeholder: '请选择',
        onChange: (e: any) => {
          let technologyTypeOptions = technologyTypeOptionsData[e];
          const { updateSchema } = formActionType;
          let mes = '请选择';
          if (e === undefined) {
            technologyTypeOptions = [];
            mes = '请先选择《最终出路》';
          }
          formModel.technologyType = undefined;
          chonseTypeEquip('', updateSchema);
          displayProcess('', updateSchema);
          updateSchema({
            field: 'technologyType',
            componentProps: ({ formModel, formActionType }) => {
              return {
                options: technologyTypeOptions,
                placeholder: mes,
                onChange: (e: any) => {
                  displayProcess(e, updateSchema);
                  chonseTypeEquip(e, updateSchema);
                  const { projectID, stationID } = formModel;
                  const { setFieldsValue: setFieldsValueDrainage, clearValidate } = formActionType;
                  let dealValue = e;
                  if (e === store.technologyTypeFromSaveGetter) {
                    dealValue = null;
                  }
                  debugger;
                  getStationDeviceSelectionDrainageEdit({
                    projectID,
                    stationID,
                    technologyType: dealValue,
                  }).then((res) => {
                    initDrainageChangeValue(setFieldsValueDrainage, { res }, clearValidate);
                  });
                },
              };
            },
          });
        },
      };
    },
  },
  {
    field: 'technologyType',
    component: 'Select',
    label: '处理工艺',
    required: true,
    colProps: {
      span: EQUIP.WIDTH_NUMBER,
    },
    componentProps: () => {
      return {
        options: [],
        placeholder: '请先选择《最终出路》',
      };
    },
  },
  {
    label:
      '处理流程:进水→2调节泵井及泵组→1SBR设备→4抽升泵井及泵组→3过滤器→5回用水池、泵组及消毒→回用',
    field: 'divider101',
    component: 'Divider',
    show: false,
    colProps: {
      span: 22,
    },
  },

  {
    label: '污水调节泵井及泵组选型',
    field: 'divider20',
    component: 'Divider',
  },
  {
    label: '◆ 污水调节泵井计算',
    field: 'divider21',
    component: 'Divider',
    colProps: { span: 23 },
  },
  {
    field: 'sbrAdjustTime',
    label: '调蓄时间',
    helpMessage: '调节泵井调蓄时间t（h），SBR（间歇式）设备按6h计。',
    component: 'InputNumberExpand1',
    defaultValue: 6,
    colProps: { span: EQUIP.WIDTH_NUMBER },
    componentProps: ({ formModel }) => {
      return {
        onBlur: (value) => {
          const target = value.target.value;
          formModel.sbrAdjustTime = transformData1(target);
        },
      };
    },
  },
  {
    field: 'sewageRegulatingWellVolume',
    label: '最小有效容积',
    helpMessage: '满足调蓄时间的污水调节泵井最小有效容积V₁（m3），按停留时间6h计。',
    component: 'InputNumberExpand3',
    colProps: { span: EQUIP.WIDTH_NUMBER },
    dynamicDisabled: true,
  },

  {
    field: 'adjustWellDiameter',
    label: '泵井直径',
    helpMessage: '污水调节泵井直径D₁（m），院通用图“肆水（2017）7411”。',
    component: 'Select',
    componentProps: () => {
      return {
        options: diameterOption,
      };
    },
    colProps: { span: EQUIP.WIDTH_NUMBER },
    dynamicDisabled: false,
  },
  {
    field: 'adjustWellWaterDepth',
    label: '最小有效水深',
    helpMessage: '最小有效容积下的污水调节泵井有效水深（m），按V₁/（3.14*(D₁/2)^2）≤h₁≤2.0m计。',
    component: 'InputNumberExpand3',
    colProps: { span: EQUIP.WIDTH_NUMBER },
    dynamicDisabled: true,
  },
  {
    field: 'adjustWellWaterPipeElevation',
    label: '进水管底标高',
    helpMessage: '污水调节泵井进水管底绝对标高（m）',
    component: 'InputNumberExpand3',
    colProps: { span: EQUIP.WIDTH_NUMBER },
    dynamicDisabled: false,
    componentProps: ({ formModel }) => {
      return {
        onBlur: (value) => {
          const target = value.target.value;
          formModel.adjustWellWaterPipeElevation = transformData3(target);
        },
      };
    },
  },
  {
    field: 'adjustWellStopPumpWaterLevel',
    label: '停泵水位',
    helpMessage: '开泵水位在进水管底以下0.2m',
    component: 'InputNumberExpand3',
    colProps: { span: EQUIP.WIDTH_NUMBER },
    dynamicDisabled: true,
  },
  {
    field: 'sbrDesignGroundElevationPumpWell',
    label: '泵井设计地面标高',
    helpMessage: '调节井设计地面标高h₁₇（m）。',
    component: 'InputNumberExpand3',
    colProps: { span: EQUIP.WIDTH_NUMBER },
    dynamicDisabled: false,
    componentProps: ({ formModel }) => {
      return {
        onBlur: (value) => {
          const target = value.target.value;
          formModel.sbrDesignGroundElevationPumpWell = transformData3(target);
        },
      };
    },
  },
  {
    field: 'sbrStopPumpWaterLevelInnerHeight',
    label: '停泵水位距内底高',
    helpMessage: '按水泵参数选取，需考虑水泵基础高度0.3m,h₁₈',
    component: 'InputNumberExpand3',
    colProps: { span: EQUIP.WIDTH_NUMBER },
    dynamicDisabled: false,
    componentProps: ({ formModel }) => {
      return {
        onBlur: (value) => {
          const target = value.target.value;
          formModel.sbrStopPumpWaterLevelInnerHeight = transformData3(target);
        },
      };
    },
  },
  {
    field: 'sbrconcreteThickness',
    label: '调节井封底混凝土厚度h₁₉（m）',
    helpMessage: '',
    component: 'InputNumberExpand3',
    colProps: { span: EQUIP.WIDTH_NUMBER },
    show: false,
    dynamicDisabled: false,
  },
  {
    field: 'adjustWellDepth',
    label: '泵井高度',
    helpMessage: '污水调节泵井深度H（m），院通用图“肆水（2017）7411”。按H≥h₁₇+0.3-h3+h₁₈+h₁₉计。',
    component: 'InputNumberExpand3',
    colProps: { span: EQUIP.WIDTH_NUMBER },
    dynamicDisabled: true,
  },
  {
    label: '◆ 潜污泵组计算',
    field: 'divider22',
    component: 'Divider',
    colProps: { span: 23 },
  },
  {
    field: 'adjustWellPumpFlow',
    label: '潜污泵流量',
    helpMessage: '调节泵井内潜污泵流量(m³/h），按处理设备一周期6h，进水时间为1.5h计。',
    component: 'InputNumberExpand3',
    colProps: { span: EQUIP.WIDTH_NUMBER },
    dynamicDisabled: true,
  },
  {
    field: 'sbrDeviceInletPipeElevation',
    label: '设备进管标高',
    helpMessage: '处理设备进水管绝对标高（m）',
    component: 'InputNumberExpand3',
    colProps: { span: EQUIP.WIDTH_NUMBER },
    dynamicDisabled: false,
    componentProps: ({ formModel }) => {
      return {
        onBlur: (value) => {
          const target = value.target.value;
          formModel.sbrDeviceInletPipeElevation = transformData3(target);
        },
      };
    },
  },
  {
    field: 'adjustWellTotalHeadLoss',
    label: '总水头损失',
    helpMessage: '',
    component: 'InputNumberExpand3',
    colProps: { span: EQUIP.WIDTH_NUMBER_JS },
    dynamicDisabled: false,
    componentProps: ({ formModel }) => {
      return {
        onBlur: (value) => {
          const target = value.target.value;
          formModel.adjustWellTotalHeadLoss = transformData3(target);
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
    field: 'sewageTreatmentOutflowHead',
    label: '流出水头',
    helpMessage: '处理设备进水管流出水头h₆（m），推荐取2~3。',
    component: 'InputNumberExpand3',
    colProps: { span: EQUIP.WIDTH_NUMBER },
    defaultValue: 3,
    dynamicDisabled: false,
    componentProps: ({ formModel }) => {
      return {
        onBlur: (value) => {
          const target = value.target.value;
          formModel.sewageTreatmentOutflowHead = transformData3(target);
        },
      };
    },
  },
  {
    field: 'adjustWellPumpLift',
    label: '潜污泵扬程',
    helpMessage: '调节泵井内潜污泵扬程H₁（m）。',
    component: 'InputNumberExpand3',
    colProps: { span: EQUIP.WIDTH_NUMBER },
    dynamicDisabled: true,
  },
  {
    field: 'adjustPumpModel',
    label: '污水调节泵井及泵组选型',
    helpMessage: '支持处理污水量范围为0~157 m³/d',
    dynamicDisabled: true,
    colProps: { span: EQUIP.WIDTH_TEXT_AREA },
    component: 'InputTextArea',
    labelWidth: EQUIP.WIDTH_LABEL_WIDTH,
  },
  {
    label: 'SBR设备选型',
    field: 'divider10',
    component: 'Divider',
  },
  {
    field: 'sewageTreatmentCapacity',
    label: '处理污水量',
    helpMessage: '需处理的污水量(m³/d）',
    component: 'InputNumberExpand3',
    colProps: { span: EQUIP.WIDTH_NUMBER },
    dynamicDisabled: false,
    componentProps: ({ formModel }) => {
      return {
        onBlur: (value) => {
          const target = value.target.value;
          formModel.sewageTreatmentCapacity = transformData3(target);
        },
      };
    },
  },
  {
    field: 'sbrDeviceType',
    label: 'SBR类型',
    component: 'Select',
    componentProps: () => {
      return {
        options: sbrDeviceTypeOption,
      };
    },
    colProps: { span: EQUIP.WIDTH_NUMBER },
    dynamicDisabled: false,
  },
  {
    field: 'sbrDeviceWork',
    label: '设备工作班数',
    helpMessage: 'SBR（间歇式）设备工作班数，默认为3班制。',
    component: 'InputNumberExpand',
    colProps: { span: EQUIP.WIDTH_NUMBER },
    defaultValue: 3,
    dynamicDisabled: false,
  },
  {
    field: 'sbrCycleWorkTime',
    label: '处理周期时长',
    helpMessage: 'SBR（间歇式）设备每周期工作时间（h），默认为6h。',
    component: 'InputNumberExpand1',
    colProps: { span: EQUIP.WIDTH_NUMBER },
    defaultValue: 6,
    dynamicDisabled: false,
    componentProps: ({ formModel }) => {
      return {
        onBlur: (value) => {
          const target = value.target.value;
          formModel.sbrCycleWorkTime = transformData1(target);
        },
      };
    },
  },
  {
    field: 'sbrDeviceSpecs',
    label: '设备处理能力',
    helpMessage: 'SBR（间歇式）设备需达到的处理规模Q₁(m³/h）',
    component: 'InputNumberExpand3',
    colProps: { span: EQUIP.WIDTH_NUMBER },
    dynamicDisabled: true,
  },
  {
    field: 'sbrModel',
    label: 'SBR设备选型',
    dynamicDisabled: true,
    helpMessage: '处理水量的范围间歇式SBR为 0~25 m³/h，改进型SBR为 0~40m³/h。',
    colProps: { span: EQUIP.WIDTH_TEXT_AREA },
    component: 'InputTextArea',
    labelWidth: EQUIP.WIDTH_LABEL_WIDTH,
  },
  {
    label: '污水调节井及泵组选型',
    field: 'divider70',
    component: 'Divider',
  },
  {
    label: '◆ 污水调节泵井计算',
    field: 'divider71',
    component: 'Divider',
    colProps: { span: 23 },
  },

  {
    field: 'adjustTime',
    label: '调蓄时间',
    helpMessage: '调节泵井调蓄时间t（h），MBR设备推荐采用4~6h；污水量大时取小值。',
    defaultValue: 6,
    component: 'InputNumberExpand1',
    colProps: { span: EQUIP.WIDTH_NUMBER },
    dynamicDisabled: false,
    componentProps: ({ formModel }) => {
      return {
        onBlur: (value) => {
          const target = value.target.value;
          formModel.adjustTime = transformData1(target);
        },
      };
    },
  },
  {
    field: 'mbrSewageRegulatingWellVolume',
    label: '最小有效容积',
    helpMessage: '满足调节时间的污水调节泵井最小有效容积V（m³），按停留时间4~6h计。',
    component: 'InputNumberExpand3',
    colProps: { span: EQUIP.WIDTH_NUMBER },
    dynamicDisabled: true,
  },
  {
    field: 'mbrAdjustWellDiameter',
    label: '泵井直径',
    helpMessage: '污水调节泵井直径D，院通用图“肆水（2017）7411”。',
    component: 'Select',
    componentProps: () => {
      return {
        options: diameterOption,
      };
    },
    colProps: { span: EQUIP.WIDTH_NUMBER },
    dynamicDisabled: false,
  },
  {
    field: 'mbrAdjustWellWaterDepth',
    label: '最小有效水深',
    helpMessage: '最小有效容积下的污水调节泵井有效水深（m），按V/（3.14*(D₁/2)^2）≤h1≤2.0m计。',
    component: 'InputNumberExpand3',
    colProps: { span: EQUIP.WIDTH_NUMBER },
    dynamicDisabled: true,
  },
  {
    field: 'mbrAdjustWellWaterPipeElevation',
    label: '进水管底标高',
    helpMessage: '污水调节泵井进水管底绝对标高（m）',
    component: 'InputNumberExpand3',
    colProps: { span: EQUIP.WIDTH_NUMBER },
    dynamicDisabled: false,
    componentProps: ({ formModel }) => {
      return {
        onBlur: (value) => {
          const target = value.target.value;
          formModel.mbrAdjustWellWaterPipeElevation = transformData3(target);
        },
      };
    },
  },
  {
    field: 'mbrAdjustWellStopPumpWaterLevel',
    label: '停泵水位',
    helpMessage: '开泵水位在进水管底以下0.2m',
    component: 'InputNumberExpand3',
    colProps: { span: EQUIP.WIDTH_NUMBER },
    dynamicDisabled: true,
  },
  {
    field: 'mbrDesignGroundElevationPumpWell',
    label: '泵井设计地面标高',
    helpMessage: '抽升泵井设计地面标高h₇（m）。',
    component: 'InputNumberExpand3',
    colProps: { span: EQUIP.WIDTH_NUMBER },
    dynamicDisabled: false,
    componentProps: ({ formModel }) => {
      return {
        onBlur: (value) => {
          const target = value.target.value;
          formModel.mbrDesignGroundElevationPumpWell = transformData3(target);
        },
      };
    },
  },
  {
    field: 'mbrStopPumpWaterLevelInnerHeight',
    label: '停泵水位距内底高',
    helpMessage: '按水泵参数选取，需考虑水泵基础高度0.3m，h₈',
    component: 'InputNumberExpand3',
    colProps: { span: EQUIP.WIDTH_NUMBER },
    dynamicDisabled: false,
    componentProps: ({ formModel }) => {
      return {
        onBlur: (value) => {
          const target = value.target.value;
          formModel.mbrStopPumpWaterLevelInnerHeight = transformData3(target);
        },
      };
    },
  },
  {
    field: 'mbrconcreteThickness',
    label: '调节井封底混凝土厚度h₉（m）',
    helpMessage: '',
    component: 'InputNumberExpand1',
    colProps: { span: EQUIP.WIDTH_NUMBER },
    show: false,
    dynamicDisabled: false,
  },
  {
    field: 'mbrLiftWellHeight',
    label: '泵井高度',
    helpMessage: '污水调节泵井深度H（m），院通用图“肆水（2017）7411”。按H₁≥h₇+0.3-h3+h₈+h₉计。',
    component: 'InputNumberExpand3',
    colProps: { span: EQUIP.WIDTH_NUMBER },
    dynamicDisabled: true,
  },

  {
    label: '◆ 潜污泵组计算',
    field: 'divider72',
    component: 'Divider',
    colProps: { span: 23 },
  },

  {
    field: 'mbrAdjustWellPumpFlow',
    label: '潜污泵流量',
    helpMessage: '调节泵井内潜污泵流量(m³/h），按处理设备进水流量计。',
    component: 'InputNumberExpand3',
    colProps: { span: EQUIP.WIDTH_NUMBER },
    dynamicDisabled: true,
  },
  {
    field: 'mbrDeviceInletPipeElevation',
    label: '设备进管标高',
    helpMessage: '处理设备进水管绝对标高（m），h₄。',
    component: 'InputNumberExpand3',
    colProps: { span: EQUIP.WIDTH_NUMBER },
    dynamicDisabled: false,
    componentProps: ({ formModel }) => {
      return {
        onBlur: (value) => {
          const target = value.target.value;
          formModel.mbrDeviceInletPipeElevation = transformData3(target);
        },
      };
    },
  },
  {
    field: 'mbrTotalHeadLoss',
    label: '总水头损失',
    helpMessage: '',
    component: 'InputNumberExpand3',
    colProps: { span: EQUIP.WIDTH_NUMBER_JS },
    dynamicDisabled: false,
    componentProps: ({ formModel }) => {
      return {
        onBlur: (value) => {
          const target = value.target.value;
          formModel.mbrTotalHeadLoss = transformData3(target);
        },
      };
    },
  },
  {
    field: 'js4',
    component: 'Input',
    label: '',
    colProps: { span: 1 },
    slot: 'add4',
  },
  {
    field: 'mbrDeviceOutflowHead',
    label: '流出水头',
    helpMessage: '处理设备进水管流出水头h₆（m），推荐取2~3。',
    component: 'InputNumberExpand3',
    colProps: { span: EQUIP.WIDTH_NUMBER },
    defaultValue: 3,
    dynamicDisabled: false,
    componentProps: ({ formModel }) => {
      return {
        onBlur: (value) => {
          const target = value.target.value;
          formModel.mbrDeviceOutflowHead = transformData3(target);
        },
      };
    },
  },
  {
    field: 'mbrPumpLift',
    label: '潜污泵扬程',
    helpMessage: '调节泵井内潜污泵扬程（m）。',
    component: 'InputNumberExpand3',
    colProps: { span: EQUIP.WIDTH_NUMBER },
    dynamicDisabled: true,
  },
  {
    field: 'adjustWellModel',
    label: '污水调节泵井及泵组选型',
    dynamicDisabled: true,
    helpMessage: '支持处理污水量范围为0~157 m³/d',
    colProps: { span: EQUIP.WIDTH_TEXT_AREA },
    component: 'InputTextArea',
    labelWidth: EQUIP.WIDTH_LABEL_WIDTH,
  },
  //6
  {
    label: 'MBR设备选型',
    field: 'divider60',
    component: 'Divider',
  },

  {
    field: 'mbrSewageTreatmentCapacity',
    label: '处理污水量',
    helpMessage: '需处理的污水量(m³/d）',
    component: 'InputNumberExpand3',
    colProps: { span: EQUIP.WIDTH_NUMBER },
    dynamicDisabled: false,
    componentProps: ({ formModel }) => {
      return {
        onBlur: (value) => {
          const target = value.target.value;
          formModel.mbrSewageTreatmentCapacity = transformData3(target);
        },
      };
    },
  },
  {
    field: 'mbrDeviceSpecs',
    label: '设备处理能力',
    helpMessage: 'MBR设备需达到的处理规模Q₁(m³/h），按Q₁≥W/24计。',
    component: 'InputNumberExpand3',
    colProps: { span: EQUIP.WIDTH_NUMBER },
    dynamicDisabled: true,
  },
  {
    field: 'mbrModel',
    label: 'MBR设备选型',
    dynamicDisabled: true,
    helpMessage: '设备处理能力的范围为 0~42 m³/h。',
    colProps: { span: EQUIP.WIDTH_TEXT_AREA },
    component: 'InputTextArea',
    labelWidth: EQUIP.WIDTH_LABEL_WIDTH,
  },
  //4
  {
    label: '污水抽升泵井及泵组选型',
    field: 'divider40',
    component: 'Divider',
  },
  {
    label: '◆ 污水抽升泵井计算',
    field: 'divider41',
    component: 'Divider',
    colProps: { span: 23 },
  },

  {
    field: 'pumpingWellDiameter',
    label: '泵井直径',
    helpMessage: '污水抽升泵井直径D2（m），院通用图“肆水（2017）7411”。',
    component: 'Select',
    componentProps: () => {
      return {
        options: diameterOption,
      };
    },
    colProps: { span: EQUIP.WIDTH_NUMBER },
    dynamicDisabled: false,
  },
  {
    field: 'sewageStopTime',
    label: '停留时间',
    helpMessage: '污水停留时间t（h），推荐取0.5~1h',
    defaultValue: 1,
    component: 'InputNumberExpand1',
    colProps: { span: EQUIP.WIDTH_NUMBER },
    dynamicDisabled: false,
    componentProps: ({ formModel }) => {
      return {
        onBlur: (value) => {
          const target = value.target.value;
          formModel.sewageStopTime = transformData1(target);
        },
      };
    },
  },
  {
    field: 'pumpingWellVolume',
    label: '最小有效容积',
    helpMessage: '满足停留时间的污水调节泵井最小有效容积V₂（m³），按停留时间0.5~1h计。',
    component: 'InputNumberExpand1',
    colProps: { span: EQUIP.WIDTH_NUMBER },
    dynamicDisabled: true,
  },
  {
    field: 'pumpingWellWaterDepth',
    label: '最小有效水深',
    helpMessage: '最小有效容积下的污水抽升泵井有效水深（m），按V₂/（3.14*(D2/2)^2）≤h₇计。',
    component: 'InputNumberExpand3',
    colProps: { span: EQUIP.WIDTH_NUMBER },
    dynamicDisabled: true,
  },

  {
    field: 'pumpingWellWaterPipeElevation',
    label: '进水管底标高',
    helpMessage: '污水抽升泵井进水管底绝对标高（m）',
    component: 'InputNumberExpand3',
    colProps: { span: EQUIP.WIDTH_NUMBER },
    dynamicDisabled: false,
    componentProps: ({ formModel }) => {
      return {
        onBlur: (value) => {
          const target = value.target.value;
          formModel.pumpingWellWaterPipeElevation = transformData3(target);
        },
      };
    },
  },
  {
    field: 'pumpingWellStopPumpWaterLevel',
    label: '停泵水位',
    helpMessage: '开泵水位在进水管底以下0.2m',
    component: 'InputNumberExpand3',
    colProps: { span: EQUIP.WIDTH_NUMBER },
    dynamicDisabled: true,
  },
  {
    field: 'pwDesignGroundElevationPumpWell',
    label: '泵井设计地面标高',
    helpMessage: '抽升井设计地面标高h₂₀（m）。',
    component: 'InputNumberExpand3',
    colProps: { span: EQUIP.WIDTH_NUMBER },
    dynamicDisabled: false,
    componentProps: ({ formModel }) => {
      return {
        onBlur: (value) => {
          const target = value.target.value;
          formModel.pwDesignGroundElevationPumpWell = transformData3(target);
        },
      };
    },
  },
  {
    field: 'pwStopPumpWaterLevelInnerHeight',
    label: '停泵水位距内底高',
    helpMessage: '按水泵参数选取，需考虑水泵基础高度0.3m，h₂₁',
    component: 'InputNumberExpand3',
    colProps: { span: EQUIP.WIDTH_NUMBER },
    dynamicDisabled: false,
    componentProps: ({ formModel }) => {
      return {
        onBlur: (value) => {
          const target = value.target.value;
          formModel.pwStopPumpWaterLevelInnerHeight = transformData3(target);
        },
      };
    },
  },
  {
    field: 'pwconcreteThickness',
    label: '调节井封底混凝土厚度h₁₉（m）',
    helpMessage: '',
    component: 'InputNumberExpand1',
    colProps: { span: EQUIP.WIDTH_NUMBER },
    show: false,
    dynamicDisabled: false,
  },
  {
    field: 'pwLiftWellHeight',
    label: '泵井高度',
    helpMessage: '污水调节泵井深度H（m），院通用图“肆水（2017）7411”。按H≥h₂₀+0.3-h₉+h₂₁+h₂₂计。',
    component: 'InputNumberExpand3',
    colProps: { span: EQUIP.WIDTH_NUMBER },
    dynamicDisabled: true,
  },
  //WC
  {
    label: '◆ 潜污泵组计算',
    field: 'divider42',
    component: 'Divider',
    colProps: { span: 23 },
  },
  {
    field: 'pumpingWellPumpFlow',
    label: '潜污泵流量',
    helpMessage: '抽升泵井内潜污泵流量(m³/h），按处理设备出水流量计。',
    component: 'InputNumberExpand3',
    colProps: { span: EQUIP.WIDTH_NUMBER },
    dynamicDisabled: true,
  },
  {
    field: 'filterWaterInletPressure',
    label: '过滤器进水压力',
    defaultValue: 5,
    helpMessage: '过滤器进水压力（m水头），默认为5m。',
    component: 'InputNumberExpand3',
    colProps: { span: EQUIP.WIDTH_NUMBER },
    dynamicDisabled: false,
    componentProps: ({ formModel }) => {
      return {
        onBlur: (value) => {
          const target = value.target.value;
          formModel.filterWaterInletPressure = transformData3(target);
        },
      };
    },
  },
  {
    field: 'pumpingWellTotalHeadLoss',
    label: '总水头损失',
    helpMessage: '',
    component: 'InputNumberExpand3',
    colProps: { span: EQUIP.WIDTH_NUMBER_JS },
    dynamicDisabled: false,
    componentProps: ({ formModel }) => {
      return {
        onBlur: (value) => {
          const target = value.target.value;
          formModel.pumpingWellTotalHeadLoss = transformData3(target);
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
    field: 'filterWaterInletElevation',
    label: '进水管标高',
    helpMessage: '过滤器进水管标高（m）',
    component: 'InputNumberExpand3',
    colProps: { span: EQUIP.WIDTH_NUMBER },
    dynamicDisabled: false,
    componentProps: ({ formModel }) => {
      return {
        onBlur: (value) => {
          const target = value.target.value;
          formModel.filterWaterInletElevation = transformData3(target);
        },
      };
    },
  },
  {
    field: 'sewageExcessHead',
    label: '富裕水头',
    helpMessage: '抽升泵井出水管流出水头h₁₂（m），推荐取2~3。',
    component: 'InputNumberExpand3',
    colProps: { span: EQUIP.WIDTH_NUMBER },
    defaultValue: 3,
    dynamicDisabled: false,
    componentProps: ({ formModel }) => {
      return {
        onBlur: (value) => {
          const target = value.target.value;
          formModel.sewageExcessHead = transformData3(target);
        },
      };
    },
  },
  {
    field: 'pumpingWellPumpLift',
    label: '潜污泵扬程',
    helpMessage: '抽升泵井潜污泵扬程H₂（m）。',
    component: 'InputNumberExpand3',
    colProps: { span: EQUIP.WIDTH_NUMBER },
    dynamicDisabled: true,
  },
  {
    field: 'pumpingWellModel',
    label: '污水抽升泵井及泵组选型',
    dynamicDisabled: true,
    colProps: { span: EQUIP.WIDTH_TEXT_AREA },
    component: 'InputTextArea',
    labelWidth: EQUIP.WIDTH_LABEL_WIDTH,
  },
  //3
  {
    label: '过滤器选型',
    field: 'divider30',
    component: 'Divider',
  },
  {
    field: 'filterSpecs',
    label: '过滤器规格',
    helpMessage: '过滤器规格Q₄(m³/h），按污水抽升井潜污泵流量Q3计。',
    component: 'InputNumberExpand3',
    colProps: { span: EQUIP.WIDTH_NUMBER },
    dynamicDisabled: true,
  },
  {
    field: 'filterSelection',
    label: '过滤器选型',
    dynamicDisabled: true,
    helpMessage: '处理水量的范围为 0~50 m³/h。',
    colProps: { span: EQUIP.WIDTH_TEXT_AREA },
    component: 'InputTextArea',
    labelWidth: EQUIP.WIDTH_LABEL_WIDTH,
  },
  {
    label: '回用水池、泵组及消毒设备选型',
    field: 'divider50',
    component: 'Divider',
  },
  {
    label: '◆ 回用水池计算',
    field: 'divider51',
    component: 'Divider',
    colProps: { span: 23 },
  },

  {
    field: 'makeGreenSprinklingWater',
    label: '绿化浇洒用水量',
    helpMessage: '每日绿化及浇洒用水量(m³/d），根据道路及绿化面积确定，详用水量计算',
    component: 'InputNumberExpand3',
    colProps: { span: EQUIP.WIDTH_NUMBER },
    dynamicDisabled: false,
    componentProps: ({ formModel }) => {
      return {
        onBlur: (value) => {
          const target = value.target.value;
          formModel.makeGreenSprinklingWater = transformData3(target);
        },
      };
    },
  },
  {
    field: 'pollShape',
    component: 'Select',
    label: '蓄水池形状',
    helpMessage: '蓄水池形状',
    required: true,
    colProps: { span: EQUIP.WIDTH_NUMBER },
    componentProps: {
      options: pollShapeOption,
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
      options: poolTopCoveringSoilOption,
    },
  },

  {
    field: 'reuseWaterTankVolume',
    label: '水池有效容积',
    helpMessage: '回用水池（箱）或回用井有效容积（m³），按每日浇洒2次储存',
    component: 'InputNumberExpand3',
    colProps: { span: EQUIP.WIDTH_NUMBER },
    dynamicDisabled: true,
  },
  {
    label: '◆ 回用泵组计算',
    field: 'divider52',
    component: 'Divider',
    colProps: { span: 23 },
  },

  {
    field: 'sprinklerFlowRate',
    label: '洒水栓流量',
    helpMessage: '单个洒水栓流量(L/s）：DN20水栓为0.4L/s，DN25为0.7L/s',
    defaultValue: 0.7,
    component: 'InputNumberExpand1',
    colProps: { span: EQUIP.WIDTH_NUMBER },
    dynamicDisabled: false,
    componentProps: ({ formModel }) => {
      return {
        onBlur: (value) => {
          const target = value.target.value;
          formModel.sprinklerFlowRate = transformData1(target);
        },
      };
    },
  },
  {
    field: 'reusePumpFlow',
    label: '回用泵流量',
    helpMessage: '回用泵流量Q5(m³/h），按同时开启4个栓计。',
    component: 'InputNumberExpand3',
    colProps: { span: EQUIP.WIDTH_NUMBER },
    dynamicDisabled: true,
    componentProps: ({ formModel }) => {
      return {
        onBlur: (value) => {
          const target = value.target.value;
          formModel.reusePumpFlow = transformData3(target);
        },
      };
    },
  },
  {
    field: 'makeGreenTotalHeadLoss',
    label: '总水头损失',
    helpMessage: '',
    component: 'InputNumberExpand3',
    colProps: { span: EQUIP.WIDTH_NUMBER_JS },
    dynamicDisabled: false,
    componentProps: ({ formModel }) => {
      return {
        onBlur: (value) => {
          const target = value.target.value;
          formModel.makeGreenTotalHeadLoss = transformData3(target);
        },
      };
    },
  },
  {
    field: 'js3',
    component: 'Input',
    label: '',
    colProps: { span: 1 },
    slot: 'add3',
  },
  {
    field: 'sprinklerWorkPressure',
    label: '洒水栓工作压力',
    defaultValue: 10,
    helpMessage: '洒水栓工作压力（m水头)，默认为10m。',
    component: 'InputNumberExpand3',
    colProps: { span: EQUIP.WIDTH_NUMBER },
    dynamicDisabled: false,
    componentProps: ({ formModel }) => {
      return {
        onBlur: (value) => {
          const target = value.target.value;
          formModel.sprinklerWorkPressure = transformData3(target);
        },
      };
    },
  },
  {
    field: 'dullSprinklerGroundLevel',
    label: '洒水栓地面标高',
    helpMessage: '最不利点洒水栓地面标高（m），h₁₄。',
    component: 'InputNumberExpand3',
    colProps: { span: EQUIP.WIDTH_NUMBER },
    dynamicDisabled: false,
    componentProps: ({ formModel }) => {
      return {
        onBlur: (value) => {
          const target = value.target.value;
          formModel.dullSprinklerGroundLevel = transformData3(target);
        },
      };
    },
  },
  {
    field: 'reuseWaterTankStopPumpWaterLevel',
    label: '停泵水位',
    helpMessage: '回用水池（箱）或回用井停泵水位，h15。',
    component: 'InputNumberExpand3',
    colProps: { span: EQUIP.WIDTH_NUMBER },
    dynamicDisabled: false,
    componentProps: ({ formModel }) => {
      return {
        onBlur: (value) => {
          const target = value.target.value;
          formModel.reuseWaterTankStopPumpWaterLevel = transformData3(target);
        },
      };
    },
  },
  {
    field: 'reusePumpOutflowHead',
    label: '流出水头',
    helpMessage: '最不利点洒水栓流出水头h16（m），推荐取2~3。',
    component: 'InputNumberExpand3',
    colProps: { span: EQUIP.WIDTH_NUMBER },
    dynamicDisabled: false,
    defaultValue: 3,
    componentProps: ({ formModel }) => {
      return {
        onBlur: (value) => {
          const target = value.target.value;
          formModel.reusePumpOutflowHead = transformData3(target);
        },
      };
    },
  },
  {
    field: 'reusePumpLift',
    label: '回用泵扬程',
    helpMessage: '回用泵扬程H₃（m）。',
    component: 'InputNumberExpand3',
    colProps: { span: EQUIP.WIDTH_NUMBER },
    dynamicDisabled: true,
  },
  {
    label: '◆ 消毒设备计算',
    field: 'divider53',
    component: 'Divider',
    colProps: { span: 23 },
  },
  {
    field: 'ultravioletDisinfection',
    label: '消毒设备规模',
    helpMessage: '紫外线消毒设备流量Q₆（m³/h）',
    component: 'InputNumberExpand3',
    colProps: { span: EQUIP.WIDTH_NUMBER },
    dynamicDisabled: true,
  },
  {
    field: 'reuseWaterTankModel',
    label: '回用水池、回用泵组及消毒设备选型',
    dynamicDisabled: true,
    helpMessage: '设备处理能力的范围为 0~50 m³/h。',
    colProps: { span: EQUIP.WIDTH_TEXT_AREA },
    component: 'InputTextArea',
    labelWidth: EQUIP.WIDTH_LABEL_WIDTH,
  },
  {
    label: '污水抽升泵井及泵组选型',
    field: 'divider80',
    component: 'Divider',
  },
  {
    label: '◆ 污水抽升泵井计算',
    field: 'divider81',
    component: 'Divider',
    colProps: { span: 23 },
  },
  {
    field: 'pumpWellShape',
    label: '泵井形状',
    helpMessage: '圆形、矩形',
    component: 'Select',
    componentProps: ({ formModel, formActionType }) => {
      return {
        options: pumpWellShapeOption,
        placeholder: '请选择',
        onChange: (e: any) => {
          let pumpWellSizeOptions = pumpWellShapeOptionsData[e];
          const { updateSchema } = formActionType;
          let mes = '请选择';
          if (e === undefined) {
            pumpWellSizeOptions = [];
            mes = '请先选《泵井形状》';
          }
          formModel.pumpWellSize = undefined;
          updateSchema({
            field: 'pumpWellSize',
            componentProps: () => {
              return {
                options: pumpWellSizeOptions,
                placeholder: mes,
              };
            },
          });
        },
      };
    },
    colProps: { span: EQUIP.WIDTH_NUMBER },
    dynamicDisabled: false,
  },
  {
    field: 'pumpWellSize',
    label: '泵井直径',
    helpMessage: [
      '分圆形、矩形，单位m。',
      '圆形井采用院通用图“肆水（2017）7411”；',
      '矩形井采用国标图集08S305',
    ],
    component: 'Select',
    componentProps: () => {
      return {
        options: [],
        placeholder: '请先选《泵井形状》',
      };
    },
    colProps: { span: EQUIP.WIDTH_NUMBER },
    dynamicDisabled: false,
  },
  {
    field: 'pumpingWellSewageVolume',
    label: '最小有效容积',
    helpMessage: '按地铁设计规范，单泵15~20min储水量',
    component: 'InputNumberExpand3',
    colProps: { span: EQUIP.WIDTH_NUMBER },
    dynamicDisabled: true,
  },
  {
    field: 'pumpWellWaterDepth',
    label: '最小有效水深',
    helpMessage: '污水抽升最小有效水深（m）',
    component: 'InputNumberExpand3',
    colProps: { span: EQUIP.WIDTH_NUMBER },
    dynamicDisabled: true,
  },
  {
    field: 'pumpWellWaterPipeElevation',
    label: '进水管底标高',
    helpMessage: '污水抽升泵井进水管底绝对标高（m）',
    component: 'InputNumberExpand3',
    colProps: { span: EQUIP.WIDTH_NUMBER },
    dynamicDisabled: false,
    componentProps: ({ formModel }) => {
      return {
        onBlur: (value) => {
          const target = value.target.value;
          formModel.pumpWellWaterPipeElevation = transformData3(target);
        },
      };
    },
  },
  {
    field: 'pumpWellStopPumpWaterLevel',
    label: '停泵水位',
    helpMessage: '开泵水位在进水管底以下0.2m',
    component: 'InputNumberExpand3',
    colProps: { span: EQUIP.WIDTH_NUMBER },
    dynamicDisabled: true,
  },
  {
    field: 'swpDesignGroundElevationPumpWell',
    label: '泵井设计地面标高',
    helpMessage: '抽升泵井设计地面标高h₂（m）。',
    component: 'InputNumberExpand3',
    colProps: { span: EQUIP.WIDTH_NUMBER },
    dynamicDisabled: false,
    componentProps: ({ formModel }) => {
      return {
        onBlur: (value) => {
          const target = value.target.value;
          formModel.swpDesignGroundElevationPumpWell = transformData3(target);
        },
      };
    },
  },
  {
    field: 'swpStopPumpWaterLevelInnerHeight',
    label: '停泵水位距内底高',
    helpMessage: '按水泵参数选取，需加上水泵基础高度,基础高度圆形井为0.3m，矩形井为0.1m ，h₈',
    component: 'InputNumberExpand3',
    colProps: { span: EQUIP.WIDTH_NUMBER },
    dynamicDisabled: false,
    componentProps: ({ formModel }) => {
      return {
        onBlur: (value) => {
          const target = value.target.value;
          formModel.swpStopPumpWaterLevelInnerHeight = transformData3(target);
        },
      };
    },
  },
  {
    field: 'swpconcreteThickness',
    label: '调节井封底混凝土厚度h₉（m）',
    helpMessage: '',
    component: 'InputNumberExpand1',
    colProps: { span: EQUIP.WIDTH_NUMBER },
    show: false,
    dynamicDisabled: false,
  },
  {
    field: 'swpLiftWellHeight',
    label: '泵井高度',
    helpMessage:
      '圆形井：污水调节泵井深度H₁（m），院通用图“肆水（2017）7411”。按H₁≥h₂+0.3-h5+h₈+h₉计。矩形井：污水调节泵井深度H₁（m），国标图“08S305”。按H₁≥h₂-h5+h₈计。',
    component: 'InputNumberExpand3',
    colProps: { span: EQUIP.WIDTH_NUMBER },
    dynamicDisabled: true,
  },
  {
    label: '◆ 潜污泵组计算',
    field: 'divider82',
    component: 'Divider',
    colProps: { span: 23 },
  },
  {
    field: 'pumpingWellSewageMeasure',
    label: '抽升井污水量',
    helpMessage: '抽升井污水量(m³/d）',
    component: 'InputNumberExpand3',
    colProps: { span: EQUIP.WIDTH_NUMBER },
    dynamicDisabled: false,
    componentProps: ({ formModel }) => {
      return {
        onBlur: (value) => {
          const target = value.target.value;
          formModel.pumpingWellSewageMeasure = transformData3(target);
        },
      };
    },
  },
  {
    field: 'submersibleSewagePumpFlow',
    label: '潜污泵流量',
    helpMessage: '潜污泵流量(m³/h）',
    component: 'InputNumberExpand3',
    colProps: { span: EQUIP.WIDTH_NUMBER },
    dynamicDisabled: true,
  },
  {
    field: 'pumpWellTotalHeadLoss',
    label: '总水头损失',
    helpMessage: '',
    component: 'InputNumberExpand3',
    colProps: { span: EQUIP.WIDTH_NUMBER_JS },
    dynamicDisabled: false,
    componentProps: ({ formModel }) => {
      return {
        onBlur: (value) => {
          const target = value.target.value;
          formModel.pumpWellTotalHeadLoss = transformData3(target);
        },
      };
    },
  },
  {
    field: 'js5',
    component: 'Input',
    label: '',
    colProps: { span: 1 },
    slot: 'add5',
  },
  {
    field: 'pumpWellDesignGround',
    label: '设计地面标高',
    helpMessage: '设计地面标高',
    show: false,
    component: 'InputNumberExpand3',
    colProps: { span: EQUIP.WIDTH_NUMBER },
    dynamicDisabled: false,
    componentProps: ({ formModel }) => {
      return {
        onBlur: (value) => {
          const target = value.target.value;
          formModel.pumpWellDesignGround = transformData3(target);
        },
      };
    },
  },
  {
    field: 'liftingPipeHighestPoint',
    label: '最不利点标高',
    helpMessage: '压力管终点地面标高或扬水管最高点处绝对标高（m）',
    component: 'InputNumberExpand3',
    colProps: { span: EQUIP.WIDTH_NUMBER },
    dynamicDisabled: false,
    componentProps: ({ formModel }) => {
      return {
        onBlur: (value) => {
          const target = value.target.value;
          formModel.liftingPipeHighestPoint = transformData3(target);
        },
      };
    },
  },
  {
    field: 'spwOutflowHead',
    label: '流出水头',
    helpMessage: '处理设备进水管流出水头h₇（m），推荐取2~3。',
    component: 'InputNumberExpand3',
    colProps: { span: EQUIP.WIDTH_NUMBER },
    defaultValue: 3,
    dynamicDisabled: false,
    componentProps: ({ formModel }) => {
      return {
        onBlur: (value) => {
          const target = value.target.value;
          formModel.spwOutflowHead = transformData3(target);
        },
      };
    },
  },
  {
    field: 'spwPumpLift',
    label: '潜污泵扬程',
    helpMessage: '污水抽升泵井内潜污泵扬程（m）。',
    component: 'InputNumberExpand3',
    colProps: { span: EQUIP.WIDTH_NUMBER },
    dynamicDisabled: true,
  },
  {
    field: 'spwPumpModel',
    label: '污水抽升泵井及泵组选型',
    dynamicDisabled: true,
    colProps: { span: EQUIP.WIDTH_TEXT_AREA },
    component: 'InputTextArea',
    labelWidth: EQUIP.WIDTH_LABEL_WIDTH,
  },

  {
    label: '含油污水处理（调沉池+气浮过滤）设备选型',
    field: 'divider9',
    component: 'Divider',
  },
  {
    label: '◆ 调沉池计算',
    field: 'divider91',
    component: 'Divider',
    colProps: { span: 23 },
  },
  {
    field: 'amountOilyWastewater',
    label: '处理污水量',
    helpMessage: '需处理的含油污水量(m³/d）',
    component: 'InputNumberExpand3',
    colProps: { span: EQUIP.WIDTH_NUMBER },
    dynamicDisabled: false,
    componentProps: ({ formModel }) => {
      return {
        onBlur: (value) => {
          const target = value.target.value;
          formModel.amountOilyWastewater = transformData3(target);
        },
      };
    },
  },
  {
    field: 'workTime',
    label: '设备工作小时',
    helpMessage: '设备工作时数（h），推荐按两班14h计。',
    component: 'InputNumberExpand1',
    defaultValue: 14,
    colProps: { span: EQUIP.WIDTH_NUMBER },
    dynamicDisabled: false,
    componentProps: ({ formModel }) => {
      return {
        onBlur: (value) => {
          const target = value.target.value;
          formModel.workTime = transformData1(target);
        },
      };
    },
  },
  {
    field: 'settlingTankStopTime',
    label: '调沉停留时间',
    helpMessage: 't建议取2~4h',
    defaultValue: 4,
    component: 'InputNumberExpand1',
    colProps: { span: EQUIP.WIDTH_NUMBER },
    dynamicDisabled: false,
    componentProps: ({ formModel }) => {
      return {
        onBlur: (value) => {
          const target = value.target.value;
          formModel.settlingTankStopTime = transformData1(target);
        },
      };
    },
  },
  {
    field: 'settlingTankVolume',
    label: '调沉池容积',
    helpMessage: '调沉池计算容积（m³），按V≥W*t/T计。',
    component: 'InputNumberExpand3',
    colProps: { span: EQUIP.WIDTH_NUMBER },
    dynamicDisabled: true,
  },
  {
    label: '◆ 气浮过滤设备计算',
    field: 'divider92',
    component: 'Divider',
    colProps: { span: 23 },
  },
  {
    field: 'iaffDeviceSpecs',
    label: '设备处理能力',
    helpMessage: '所需一体化气浮过滤设备处理能力Q₁（m³/h），按Q₁≥W/T计。',
    component: 'InputNumberExpand3',
    colProps: { span: EQUIP.WIDTH_NUMBER },
    dynamicDisabled: true,
  },

  {
    field: 'inletSubmersibleSewagePumpFlow',
    label: '潜污泵流量',
    helpMessage: '进水潜污泵（调沉池内）流量Q2（m³/h）',
    component: 'InputNumberExpand3',
    colProps: { span: EQUIP.WIDTH_NUMBER },
    dynamicDisabled: true,
  },
  {
    field: 'iaffTotalHeadLoss',
    label: '总水头损失',
    helpMessage: '',
    component: 'InputNumberExpand3',
    colProps: { span: EQUIP.WIDTH_NUMBER_JS },
    dynamicDisabled: false,
    componentProps: ({ formModel }) => {
      return {
        onBlur: (value) => {
          const target = value.target.value;
          formModel.iaffTotalHeadLoss = transformData3(target);
        },
      };
    },
  },
  {
    field: 'js6',
    component: 'Input',
    label: '',
    colProps: { span: 1 },
    slot: 'add6',
  },
  {
    field: 'iaffWaterPipeElevation',
    label: '设备进水管标高',
    helpMessage: '气浮过滤设备进水管标高（m）',
    component: 'InputNumberExpand3',
    colProps: { span: EQUIP.WIDTH_NUMBER },
    dynamicDisabled: false,
    componentProps: ({ formModel }) => {
      return {
        onBlur: (value) => {
          const target = value.target.value;
          formModel.iaffWaterPipeElevation = transformData3(target);
        },
      };
    },
  },
  {
    field: 'iaffWaterInletPressure',
    label: '设备进水压力',
    helpMessage: '气浮过滤设备进水压力（m水头），默认为5m。',
    defaultValue: 5,
    component: 'InputNumberExpand3',
    colProps: { span: EQUIP.WIDTH_NUMBER },
    dynamicDisabled: false,
    componentProps: ({ formModel }) => {
      return {
        onBlur: (value) => {
          const target = value.target.value;
          formModel.iaffWaterInletPressure = transformData3(target);
        },
      };
    },
  },
  {
    field: 'iaffStopPumpWaterLevel',
    label: '停泵水位',
    helpMessage: '潜污泵可设在调沉池内',
    component: 'InputNumberExpand3',
    colProps: { span: EQUIP.WIDTH_NUMBER },
    dynamicDisabled: false,
    componentProps: ({ formModel }) => {
      return {
        onBlur: (value) => {
          const target = value.target.value;
          formModel.iaffStopPumpWaterLevel = transformData3(target);
        },
      };
    },
  },
  {
    field: 'iaffExcessHead',
    label: '富裕水头',
    helpMessage: '处理设备进水管流出水头h₆（m），推荐取2~3。',
    defaultValue: 3,
    component: 'InputNumberExpand3',
    colProps: { span: EQUIP.WIDTH_NUMBER },
    dynamicDisabled: false,
    componentProps: ({ formModel }) => {
      return {
        onBlur: (value) => {
          const target = value.target.value;
          formModel.iaffExcessHead = transformData3(target);
        },
      };
    },
  },
  {
    field: 'spwInletPumpLift',
    label: '潜污泵扬程',
    helpMessage: '进水潜污泵扬程（m）',
    component: 'InputNumberExpand3',
    colProps: { span: EQUIP.WIDTH_NUMBER },
    dynamicDisabled: true,
  },
  {
    field: 'sedimentationIAFFModel',
    label: '调沉池及气浮过滤设备选型',
    helpMessage: ['调沉池设备处理水量为50m³和100m³', '气浮过滤设备处理水量的范围0~35 m³'],
    dynamicDisabled: true,
    colProps: { span: EQUIP.WIDTH_TEXT_AREA },
    component: 'InputTextArea',
    labelWidth: EQUIP.WIDTH_LABEL_WIDTH,
  },
  {
    label: '厌氧滤池+人工湿地选型',
    field: 'divider100',
    component: 'Divider',
  },
  {
    field: 'liftSewageTreatmentCapacity',
    label: '处理污水量',
    helpMessage: '需处理的污水量(m³/d）',
    component: 'InputNumberExpand3',
    colProps: { span: EQUIP.WIDTH_NUMBER },
    dynamicDisabled: false,
    componentProps: ({ formModel }) => {
      return {
        onBlur: (value) => {
          const target = value.target.value;
          formModel.liftSewageTreatmentCapacity = transformData3(target);
        },
      };
    },
  },
  {
    field: 'anaerobicFilter',
    label: '厌氧滤池处理能力',
    helpMessage: '需厌氧滤池达到的处理能力Q₁(m³/d）',
    component: 'InputNumberExpand3',
    colProps: { span: EQUIP.WIDTH_NUMBER },
    dynamicDisabled: true,
  },
  {
    field: 'constructedWetland',
    label: '人工湿地处理能力',
    helpMessage: '需人工湿地达到的处理能力Q2(m³/d）',
    component: 'InputNumberExpand3',
    colProps: { span: EQUIP.WIDTH_NUMBER },
    dynamicDisabled: true,
  },
  {
    field: 'liftWaterPointModel',
    label: '厌氧滤池及人工湿地选型',
    helpMessage: '处理水量的范围在0~30 m³/d',
    dynamicDisabled: true,
    colProps: { span: EQUIP.WIDTH_TEXT_AREA },
    component: 'InputTextArea',
    labelWidth: EQUIP.WIDTH_LABEL_WIDTH,
  },
];
