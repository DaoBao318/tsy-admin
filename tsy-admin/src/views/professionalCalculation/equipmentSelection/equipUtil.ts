import { keepTwoDecimalFull } from '/@/utils/calculation/count';
import { useRouter } from 'vue-router';
import { message } from 'ant-design-vue';

export const EQUIP = {
  WIDTH_NUMBER: 6,
  WIDTH_TEXT_AREA: 19,
  WIDTH_LABEL_WIDTH: 250,
  WIDTH_NUMBER_JS: 5,
  DURATION: 3,
};
export const EQUIP_TYPE = {
  LARGE_STATION: ['01', '07'],
  INTERMEDIATE_STATION: ['02', '03', '05'],
  HIGH_SPEED_TRAIN_STATION: ['06', '09'],
};
export const initializeAssignmentStructure = (setFieldsValue, updateSchema, record) => {
  // record.excessHeadHSix = 3; // 2-3
  // record.excessHeadHTwelve = 3; // 2-3
  record.workConditionBadPressure = record.workConditionBadPressure
    ? record.workConditionBadPressure
    : 0.15; // >=0.15
  record.vfpBadWayHeadLoss = record.vfpBadWayHeadLoss ? record.vfpBadWayHeadLoss : undefined; //没有值默认给0
  record.firePumpBadWayHeadLoss = record.firePumpBadWayHeadLoss
    ? record.firePumpBadWayHeadLoss
    : undefined; //没有值默认给0
  if (EQUIP_TYPE.LARGE_STATION.includes(record.stationType)) {
    record.busWaterSingle = 2.5;
    record.stabilivoltPumpDesignFlow = '2';
    updateSchema([
      {
        field: 'modelSelectType',
        label: '管网布设形式',
        dynamicDisabled: false,
      },
      {
        field: 'waterSameRatio',
        label: '时变化系数',
        helpMessage: '指生产生活房屋（含站房）用水时变化系数，为经验值k₁=2.5~3。',
      },
      {
        field: 'waterStorageCoefficient',
        label: '水池贮水系数',
        helpMessage: '生产生活用水水池贮水系数β=1/2~1/3',
      },
      {
        field: 'busWaterRows',
        label: '同时上水排数',
        required: true,
        show: true,
      },
      {
        field: 'busWaterSupply',
        label: '客车上水量',
        required: true,
        show: true,
      },
      {
        field: 'groupsNumber',
        label: '列车最大编组',
        required: true,
        show: true,
      },
      {
        field: 'busWaterSingle',
        required: true,
        label: '上水栓流量',
        show: true,
      },
      {
        field: 'busWaterTotalFlow',
        label: '上水总流量',
        show: true,
      },
    ]);
  } else if (EQUIP_TYPE.INTERMEDIATE_STATION.includes(record.stationType)) {
    record.busWaterRows = 0; //没有
    record.groupsNumber = 1; //没有
    record.busWaterSingle = 0; //没有
    record.stabilivoltPumpDesignFlow = '2';
    record.modelSelectType = 'Division';
    updateSchema([
      {
        field: 'modelSelectType',
        label: '管网布设形式',
        dynamicDisabled: true,
      },
      {
        field: 'waterSameRatio',
        label: '时变化系数',
        helpMessage: '指生产生活房屋（含站房）用水时变化系数，为经验值k₁=5~6。',
      },
      {
        field: 'waterStorageCoefficient',
        label: '水池贮水系数',
        helpMessage: ['市政管径 >DN100且供水可靠时，1/3≥β≥1/4；', '接管水源不可靠时，β=1'],
      },
      {
        field: 'busWaterRows',
        label: '同时上水排数',
        required: false,
        show: false,
      },
      {
        field: 'busWaterSupply',
        label: '客车上水量',
        required: false,
        show: false,
      },
      {
        field: 'groupsNumber',
        label: '列车最大编组',
        required: false,
        show: false,
      },
      {
        field: 'busWaterSingle',
        required: false,
        label: '上水栓流量',
        show: false,
      },
      {
        field: 'busWaterTotalFlow',
        label: '上水总流量',
        show: false,
      },
      {
        field: 'cleanPoolEffectiveVolume',
        label: '水池合设容积',
        show: false,
      },
    ]);
  } else if (EQUIP_TYPE.HIGH_SPEED_TRAIN_STATION.includes(record.stationType)) {
    record.busWaterSingle = 1.5;
    record.stabilivoltPumpDesignFlow = '2';
    record.modelSelectType = 'JointDesign';
    updateSchema([
      {
        field: 'modelSelectType',
        label: '管网布设形式',
        dynamicDisabled: true,
      },
      {
        field: 'waterSameRatio',
        label: '时变化系数',
        helpMessage: '指生产生活房屋（含站房）用水时变化系数，为经验值k₁=2.5~3。',
      },
      {
        field: 'waterStorageCoefficient',
        label: '水池贮水系数',
        helpMessage: '生产生活用水水池贮水系数β=1/2~1/3',
      },
      {
        field: 'busWaterSupply',
        label: '客车上水量',
        required: true,
        show: true,
      },
      {
        field: 'busWaterRows',
        label: '同时上水排数',
        required: true,
        show: true,
      },
      {
        field: 'groupsNumber',
        label: '列车最大编组',
        required: true,
        show: true,
      },
      {
        field: 'busWaterSingle',
        required: true,
        label: '上水栓流量',
        show: true,
      },
      {
        field: 'busWaterTotalFlow',
        label: '上水总流量',
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
  }
  if (record.activeChlorine && record.activeChlorineMax) {
    record.activeChlorineMes = record.activeChlorine + '~' + record.activeChlorineMax;
  } else {
    record.activeChlorineMes = '';
  }
  if (record.modelSelectType === 'JointDesign') {
    record.modelSelectType1 = '生活泵、消防泵分设';
    record.modelSelectType2 = '生活、消防水池合设';
    updateSchema([
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
  } else {
    updateSchema([
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
    record.modelSelectType1 = '生活泵、消防泵分设';
    record.modelSelectType2 = '生活水池、消防水池分设';
  }
  setFieldsValue({ ...record });
};
// y = y1 + ((y2 - y1) * (x - x1)) / (x2 - x1); 内插计算公式
export const nc = (x) => {
  let num = 0;
  if (x <= 500) {
    num = 1 / 2 + ((1 / 4 - 1 / 2) * (x - 0)) / (500 - 0);
  } else if (x <= 1000) {
    num = 1 / 4 + ((1 / 6 - 1 / 4) * (x - 500)) / (1000 - 500);
  } else if (x <= 2000) {
    num = 1 / 6 + ((1 / 8 - 1 / 6) * (x - 1000)) / (2000 - 1000);
  } else if (x <= 3000) {
    num = 1 / 8 + ((1 / 10 - 1 / 8) * (x - 2000)) / (3000 - 2000);
  } else {
    num = 1 / 10;
  }
  return keepTwoDecimalFull(num, 3);
};
export const roundUp = (num) => {
  let index = 0;
  if (num <= 200) {
    index = Math.floor(num / 50);
    return num % 50 > 0 ? 50 * (index + 1) : 50 * index;
  } else {
    index = Math.floor(num / 100);
    return num % 100 > 0 ? 100 * (index + 1) : 100 * index;
  }
};

export const calculateEquip = (value, setFieldsValue) => {
  const {
    busWaterRows,
    groupsNumber,
    busWaterSingle,
    outdoorFireMaxStrength,
    fireContinueTime,
    dnMwoMax,
    busWaterSupply,
    waterSameRatio,
    pooLowWaterElevation,
    dullDesignGroundElevation,
    dullAskWaterPressure,
    vfpBadWayHeadLoss,
    excessHeadHSix,

    sffPoolLowestWaterLevel,
    sffBadDesignGroundElevation,
    ffBadHydrantPressure,
    firePumpBadWayHeadLoss,
    excessHeadHTwelve,
    workConditionBadPressure,
    waterStorageCoefficient, //生产生活用水贮水系数β
  } = value;

  // 客车上水总流量q1(L/s)
  const busWaterTotalFlow = keepTwoDecimalFull(
    busWaterRows * groupsNumber * busWaterSingle * 3.6,
    1,
  );
  //室外消防最大用水量YX(m3/d)
  const outdoorFireMaxMwoMax = keepTwoDecimalFull(
    3.6 * outdoorFireMaxStrength * fireContinueTime,
    3,
  );
  // 清水池(与消防水池合设)有效容积V1
  let cleanPoolEffectiveVolume = 0;
  //生活水池(水箱)有效容积V2
  let producePoolEffectiveVolume = 0;
  //消防水池有效容积V3
  let ffPoolEffectiveVolume = 0;
  //变频供水设备设计流量Q(L/s)
  let waterSupplyDesignFlow = 0;
  //变频供水设备设计流量Q(m³/h)
  let produceLifeTotalFlow = 0;
  let divisionCoefficient = 16;
  if (EQUIP_TYPE.INTERMEDIATE_STATION.includes(value.stationType)) {
    divisionCoefficient = 12;
  }
  produceLifeTotalFlow = keepTwoDecimalFull((dnMwoMax * waterSameRatio) / divisionCoefficient, 3);

  if (value.modelSelectType === 'JointDesign') {
    cleanPoolEffectiveVolume = keepTwoDecimalFull(
      (dnMwoMax + busWaterSupply) * waterStorageCoefficient + outdoorFireMaxMwoMax,
      2,
    );
    cleanPoolEffectiveVolume = roundUp(cleanPoolEffectiveVolume);
  } else {
    if (EQUIP_TYPE.INTERMEDIATE_STATION.includes(value.stationType)) {
      producePoolEffectiveVolume = keepTwoDecimalFull(dnMwoMax * waterStorageCoefficient, 3);
    } else {
      producePoolEffectiveVolume = keepTwoDecimalFull(
        (dnMwoMax + busWaterSupply) * waterStorageCoefficient,
        3,
      );
    }
    producePoolEffectiveVolume = roundUp(producePoolEffectiveVolume);
    ffPoolEffectiveVolume = keepTwoDecimalFull(outdoorFireMaxMwoMax, 3);
    ffPoolEffectiveVolume = roundUp(ffPoolEffectiveVolume);
  }

  if (EQUIP_TYPE.LARGE_STATION.includes(value.stationType)) {
    const temp = busWaterTotalFlow + produceLifeTotalFlow;
    waterSupplyDesignFlow = keepTwoDecimalFull(temp, 3);
  } else if (EQUIP_TYPE.INTERMEDIATE_STATION.includes(value.stationType)) {
    const temp = produceLifeTotalFlow;
    waterSupplyDesignFlow = keepTwoDecimalFull(temp, 3);
  } else if (EQUIP_TYPE.HIGH_SPEED_TRAIN_STATION.includes(value.stationType)) {
    const temp = 0.5 * busWaterTotalFlow + produceLifeTotalFlow;
    waterSupplyDesignFlow = keepTwoDecimalFull(temp, 3);
  }

  //变频供水设备设计扬程H1(m)
  const waterSupplyDesignLiftTemp =
    dullDesignGroundElevation -
    pooLowWaterElevation +
    dullAskWaterPressure +
    vfpBadWayHeadLoss +
    excessHeadHSix;
  const waterSupplyDesignLift = keepTwoDecimalFull(waterSupplyDesignLiftTemp, 3);

  // 消防主泵设计扬程H2（m）
  const firePumpDesignLiftTemp =
    sffBadDesignGroundElevation -
    sffPoolLowestWaterLevel +
    ffBadHydrantPressure +
    firePumpBadWayHeadLoss +
    excessHeadHTwelve;
  const firePumpDesignLift = keepTwoDecimalFull(firePumpDesignLiftTemp, 3);

  //稳压泵最低工作压力P0(MPa)
  let stabilivoltPumpMinWorkingPressure =
    workConditionBadPressure +
    0.01 * (sffBadDesignGroundElevation - sffPoolLowestWaterLevel) +
    0.07;
  stabilivoltPumpMinWorkingPressure = keepTwoDecimalFull(stabilivoltPumpMinWorkingPressure, 2);
  stabilivoltPumpMinWorkingPressure = takeTheClosestValue(stabilivoltPumpMinWorkingPressure);
  if (stabilivoltPumpMinWorkingPressure > 0.66) {
    message.warning('《气压罐充气压力》的最大值不能超过0.66，请调整之后重新计算。');
    setFieldsValue({ stabilivoltPumpMinWorkingPressure });
    return true;
  }
  //稳压泵启泵压力：PS1(MPa)
  const firePumpStartPumpPressure = keepTwoDecimalFull(
    stabilivoltPumpMinWorkingPressure + 0.025,
    2,
  );

  //稳压泵启泵压力：PS2(MPa)
  const firePumpStopPumpPressure = keepTwoDecimalFull(
    (firePumpStartPumpPressure + 0.1) / 0.8 - 0.1,
    2,
  );
  const firePumpStartPressure = keepTwoDecimalFull(firePumpStartPumpPressure - 0.07, 2);

  //稳压泵扬程P(MPa)
  const stabilivoltPumpDesignLift = keepTwoDecimalFull(
    (firePumpStartPumpPressure + firePumpStopPumpPressure) / 2,
    2,
  );
  // 有效氯(g/h)最小值
  const activeChlorine = keepTwoDecimalFull(waterSupplyDesignFlow * 0.5, 1);
  //有效氯(g/h)最大值
  const activeChlorineMax = keepTwoDecimalFull(waterSupplyDesignFlow * 1, 1);
  const activeChlorineMes = activeChlorine + '~' + activeChlorineMax;
  setFieldsValue({
    busWaterTotalFlow,
    outdoorFireMaxMwoMax,
    cleanPoolEffectiveVolume,
    producePoolEffectiveVolume,
    ffPoolEffectiveVolume,
    produceLifeTotalFlow,
    waterSupplyDesignFlow,
    waterStorageCoefficient, //β系数
    waterSupplyDesignLift,
    firePumpDesignLift,
    stabilivoltPumpMinWorkingPressure,
    firePumpStartPressure,
    firePumpStartPumpPressure,
    firePumpStopPumpPressure,
    stabilivoltPumpDesignLift,
    disinfectWaterSupplyDesignFlow: waterSupplyDesignFlow,
    activeChlorineMes,
    activeChlorine,
    activeChlorineMax,
  });
  return false;
};
const takeTheClosestValue = (num) => {
  let value = 0.16;
  if (num <= 0.16) {
    value = 0.16;
  } else if (num <= 0.24) {
    value = 0.24;
  } else if (num <= 0.32) {
    value = 0.32;
  } else if (num <= 0.38) {
    value = 0.38;
  } else if (num <= 0.45) {
    value = 0.45;
  } else if (num <= 0.55) {
    value = 0.55;
  } else if (num <= 0.66) {
    value = 0.66;
  } else {
    value = num;
  }
  return value;
};

export const saveEquip = (value) => {
  if (EQUIP_TYPE.LARGE_STATION.includes(value.stationType)) {
  } else if (EQUIP_TYPE.INTERMEDIATE_STATION.includes(value.stationType)) {
  } else if (EQUIP_TYPE.HIGH_SPEED_TRAIN_STATION.includes(value.stationType)) {
  } else {
  }
  return value;
};

export const saveDisplay = (setFieldsValue, res) => {
  setFieldsValue({ ...res });
};

export const transformData1 = (rawValue) => {
  if (rawValue === '') {
    return null;
  }
  return keepTwoDecimalFull(rawValue, 1);
};
export const transformData2 = (rawValue) => {
  if (rawValue === '') {
    return null;
  }
  return keepTwoDecimalFull(rawValue, 2);
};
export const transformData3 = (rawValue) => {
  if (rawValue === '') {
    return null;
  }
  return keepTwoDecimalFull(rawValue, 3);
};
export function getRouterQueryEquip() {
  const router = useRouter();
  return router.currentRoute.value.query;
}
export function judgmentType(value) {
  return Object.prototype.toString.call(value).slice(8, -1).toLocaleLowerCase();
}
