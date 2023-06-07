import { message } from 'ant-design-vue';
import { pumpWellShapeOptionsData, technologyTypeOptionsData } from './api/const';
import { EQUIP } from './equipUtil';
import { keepTwoDecimalFull } from '/@/utils/calculation/count';
import { waterSourceStore } from '/@/store/modules/waterInfo';
import { getStationDeviceSelectionDrainageEdit } from './api/http';
const store = waterSourceStore();

export const saveDisplayDrainage = (setFieldsValue, res) => {
  setFieldsValue({ ...res });
};

export const dealSaveDataDrainage = (values) => {
  const {
    sewageTreatmentCapacity,
    sbrDeviceWork,
    sbrCycleWorkTime,
    sbrDeviceSpecs,
    sbrModel,
    sbrDeviceType,
  } = values;
  const sbrModel1 = {
    sewageTreatmentCapacity,
    sbrDeviceWork,
    sbrCycleWorkTime,
    sbrDeviceSpecs,
    sbrModel,
    sbrDeviceType,
  };
  const {
    sbrAdjustTime,
    sewageRegulatingWellVolume,
    adjustWellDiameter,
    adjustWellWaterDepth,
    adjustWellWaterPipeElevation,
    adjustWellStopPumpWaterLevel,
    sbrDesignGroundElevationPumpWell,
    sbrStopPumpWaterLevelInnerHeight,
    sbrConcreteThickness,
    adjustWellDepth,
    adjustWellPumpFlow,
    sbrDeviceInletPipeElevation,
    adjustWellTotalHeadLoss,
    sewageTreatmentOutflowHead,
    adjustWellPumpLift,
    adjustPumpModel,
  } = values;
  const adjustPumpModel2 = {
    sbrAdjustTime,
    sewageRegulatingWellVolume,
    adjustWellDiameter,
    adjustWellWaterDepth,
    adjustWellWaterPipeElevation,
    adjustWellStopPumpWaterLevel,
    sbrDesignGroundElevationPumpWell,
    sbrStopPumpWaterLevelInnerHeight,
    sbrConcreteThickness,
    adjustWellDepth,
    adjustWellPumpFlow,
    sbrDeviceInletPipeElevation,
    adjustWellTotalHeadLoss,
    sewageTreatmentOutflowHead,
    adjustWellPumpLift,
    adjustPumpModel,
  };
  const { filterSpecs } = values;
  const filterSpecsModel3 = {
    filterSpecs,
  };
  const {
    pumpingWellDiameter,
    sewageStopTime,
    pumpingWellVolume,
    pumpingWellWaterDepth,
    pumpingWellWaterPipeElevation,
    pumpingWellStopPumpWaterLevel,
    pwDesignGroundElevationPumpWell,
    pwStopPumpWaterLevelInnerHeight,
    pwConcreteThickness,
    pwLiftWellHeight,
    pumpingWellPumpFlow,
    filterWaterInletPressure,
    filterWaterInletElevation,
    pumpingWellTotalHeadLoss,
    sewageExcessHead,
    pumpingWellPumpLift,
    pumpingWellModel,
  } = values;
  const pumpingWellModel4 = {
    pumpingWellDiameter,
    sewageStopTime,
    pumpingWellVolume,
    pumpingWellWaterDepth,
    pumpingWellWaterPipeElevation,
    pumpingWellStopPumpWaterLevel,
    pwDesignGroundElevationPumpWell,
    pwStopPumpWaterLevelInnerHeight,
    pwConcreteThickness,
    pwLiftWellHeight,
    pumpingWellPumpFlow,
    filterWaterInletPressure,
    filterWaterInletElevation,
    pumpingWellTotalHeadLoss,
    sewageExcessHead,
    pumpingWellPumpLift,
    pumpingWellModel,
  };
  const {
    makeGreenSprinklingWater,
    reuseWaterTankVolume,
    sprinklerFlowRate,
    reusePumpFlow,
    sprinklerWorkPressure,
    makeGreenTotalHeadLoss,
    dullSprinklerGroundLevel,
    reuseWaterTankStopPumpWaterLevel,
    reusePumpOutflowHead,
    reusePumpLift,
    ultravioletDisinfection,
    reuseWaterTankModel,
  } = values;
  const reuseWaterTankModel5 = {
    makeGreenSprinklingWater,
    reuseWaterTankVolume,
    sprinklerFlowRate,
    reusePumpFlow,
    sprinklerWorkPressure,
    makeGreenTotalHeadLoss,
    dullSprinklerGroundLevel,
    reuseWaterTankStopPumpWaterLevel,
    reusePumpOutflowHead,
    reusePumpLift,
    ultravioletDisinfection,
    reuseWaterTankModel,
  };
  const { mbrSewageTreatmentCapacity, mbrDeviceSpecs, mbrModel } = values;
  const mbrModel6 = {
    mbrSewageTreatmentCapacity,
    mbrDeviceSpecs,
    mbrModel,
  };
  const {
    adjustTime,
    mbrSewageRegulatingWellVolume,
    mbrAdjustWellDiameter,
    mbrAdjustWellWaterDepth,
    mbrAdjustWellWaterPipeElevation,
    mbrAdjustWellStopPumpWaterLevel,
    mbrDesignGroundElevationPumpWell,
    mbrStopPumpWaterLevelInnerHeight,
    mbrConcreteThickness,
    mbrLiftWellHeight,
    mbrAdjustWellPumpFlow,
    mbrDeviceInletPipeElevation,
    mbrTotalHeadLoss,
    mbrDeviceOutflowHead,
    mbrPumpLift,
    adjustWellModel,
  } = values;
  const adjustWellModel7 = {
    adjustTime,
    mbrSewageRegulatingWellVolume,
    mbrAdjustWellDiameter,
    mbrAdjustWellWaterDepth,
    mbrAdjustWellWaterPipeElevation,
    mbrAdjustWellStopPumpWaterLevel,
    mbrDesignGroundElevationPumpWell,
    mbrStopPumpWaterLevelInnerHeight,
    mbrConcreteThickness,
    mbrLiftWellHeight,
    mbrAdjustWellPumpFlow,
    mbrDeviceInletPipeElevation,
    mbrTotalHeadLoss,
    mbrDeviceOutflowHead,
    mbrPumpLift,
    adjustWellModel,
  };
  const {
    pumpWellShape,
    pumpWellSize,
    pumpingWellSewageVolume,
    pumpWellWaterDepth,
    pumpWellWaterPipeElevation,
    pumpWellStopPumpWaterLevel,
    swpDesignGroundElevationPumpWell,
    swpStopPumpWaterLevelInnerHeight,
    swpConcreteThickness,
    swpLiftWellHeight,
    pumpingWellSewageMeasure,
    submersibleSewagePumpFlow,
    pumpWellTotalHeadLoss,
    pumpWellDesignGround,
    liftingPipeHighestPoint,
    spwOutflowHead,
    spwPumpLift,
    spwPumpModel,
  } = values;
  const sewagePumpWell8 = {
    pumpWellShape,
    pumpWellSize,
    pumpingWellSewageVolume,
    pumpWellWaterDepth,
    pumpWellWaterPipeElevation,
    pumpWellStopPumpWaterLevel,
    swpDesignGroundElevationPumpWell,
    swpStopPumpWaterLevelInnerHeight,
    swpConcreteThickness,
    swpLiftWellHeight,
    pumpingWellSewageMeasure,
    submersibleSewagePumpFlow,
    pumpWellTotalHeadLoss,
    pumpWellDesignGround,
    liftingPipeHighestPoint,
    spwOutflowHead,
    spwPumpLift,
    spwPumpModel,
  };
  const {
    amountOilyWastewater,
    workTime,
    settlingTankStopTime,
    settlingTankVolume,
    iaffDeviceSpecs,
    inletSubmersibleSewagePumpFlow,
    iaffWaterPipeElevation,
    iaffWaterInletPressure,
    iaffStopPumpWaterLevel,
    iaffTotalHeadLoss,
    iaffExcessHead,
    spwInletPumpLift,
    sedimentationIAFFModel,
  } = values;
  const sedimentationIAFF9 = {
    amountOilyWastewater,
    workTime,
    settlingTankStopTime,
    settlingTankVolume,
    iaffDeviceSpecs,
    inletSubmersibleSewagePumpFlow,
    iaffWaterPipeElevation,
    iaffWaterInletPressure,
    iaffStopPumpWaterLevel,
    iaffTotalHeadLoss,
    iaffExcessHead,
    spwInletPumpLift,
    sedimentationIAFFModel,
  };
  const { liftSewageTreatmentCapacity, anaerobicFilter, constructedWetland, liftWaterPointModel } =
    values;
  const liftWaterPoint10 = {
    liftSewageTreatmentCapacity,
    anaerobicFilter,
    constructedWetland,
    liftWaterPointModel,
  };
  const { projectID, stationID, outType, technologyType } = values;
  const params = {
    projectID,
    stationID,
    outType,
    technologyType,
    sbrModel: sbrModel1,
    adjustPumpModel: adjustPumpModel2,
    filterSpecsModel: filterSpecsModel3,
    pumpingWellModel: pumpingWellModel4,
    reuseWaterTankModel: reuseWaterTankModel5,
    mbrModel: mbrModel6,
    adjustWellModel: adjustWellModel7,
    sewagePumpWell: sewagePumpWell8,
    sedimentationIAFF: sedimentationIAFF9,
    liftWaterPoint: liftWaterPoint10,
  };
  return params;
};

export const caculateDrainage = (values, setFieldsValueDrainage) => {
  const {
    sewageTreatmentCapacity,
    sbrAdjustTime,
    adjustWellDiameter,
    adjustWellWaterPipeElevation,
    sbrDesignGroundElevationPumpWell,
    sbrStopPumpWaterLevelInnerHeight,
    sbrDeviceInletPipeElevation,
    adjustWellTotalHeadLoss,
    sewageTreatmentOutflowHead,
    sewageStopTime,
    pumpingWellDiameter,
    pumpingWellWaterPipeElevation,
    pwDesignGroundElevationPumpWell,
    pwStopPumpWaterLevelInnerHeight,
    filterWaterInletElevation,
    filterWaterInletPressure,
    pumpingWellTotalHeadLoss,
    sewageExcessHead,
    makeGreenSprinklingWater,
    sprinklerFlowRate,
    dullSprinklerGroundLevel,
    sprinklerWorkPressure,
    reuseWaterTankStopPumpWaterLevel,
    makeGreenTotalHeadLoss,
    reusePumpOutflowHead,
    mbrSewageTreatmentCapacity,
    adjustTime,
    mbrAdjustWellDiameter,
    mbrAdjustWellWaterPipeElevation,
    mbrDesignGroundElevationPumpWell,
    mbrStopPumpWaterLevelInnerHeight,
    mbrDeviceInletPipeElevation,
    mbrTotalHeadLoss,
    mbrDeviceOutflowHead,
    pumpingWellSewageMeasure,
    pumpWellShape,
    pumpWellSize,
    pumpWellWaterPipeElevation,
    swpDesignGroundElevationPumpWell,
    swpStopPumpWaterLevelInnerHeight,
    liftingPipeHighestPoint,
    pumpWellTotalHeadLoss,
    spwOutflowHead,
    amountOilyWastewater,
    settlingTankStopTime,
    workTime,
    iaffWaterPipeElevation,
    iaffWaterInletPressure,
    iaffStopPumpWaterLevel,
    iaffTotalHeadLoss,
    iaffExcessHead,
    liftSewageTreatmentCapacity,
  } = values;
  const sbrDeviceSpecs = keepTwoDecimalFull(sewageTreatmentCapacity / 18, 3);
  const sewageRegulatingWellVolume = keepTwoDecimalFull((sbrDeviceSpecs * sbrAdjustTime) / 24, 3);
  let adjustWellWaterDepth =
    sewageRegulatingWellVolume / (3.14 * Math.pow(Number(adjustWellDiameter) / 2, 2));
  adjustWellWaterDepth = keepTwoDecimalFull(adjustWellWaterDepth, 3);
  //泵井水深不超过2m adjustWellWaterDepth
  if (adjustWellWaterDepth > 2) {
    message.warn('污水调节泵井《泵井有效水深》不能超过2m，请重新选择《泵井直径》', EQUIP.DURATION);
    setFieldsValueDrainage({ adjustWellDiameter: undefined, adjustWellWaterDepth: undefined });
    return;
  }
  let adjustWellStopPumpWaterLevel = keepTwoDecimalFull(
    adjustWellWaterPipeElevation - 0.2 - adjustWellWaterDepth,
    1,
  );

  let adjustWellDepth =
    sbrDesignGroundElevationPumpWell +
    0.3 -
    adjustWellStopPumpWaterLevel +
    sbrStopPumpWaterLevelInnerHeight +
    h19(adjustWellDiameter);
  adjustWellDepth = keepTwoDecimalFull(adjustWellDepth, 1);
  const obj17 = {
    adjustWellDiameter: undefined,
  };
  judgmentC(adjustWellDiameter, adjustWellDepth, setFieldsValueDrainage, obj17);
  adjustWellDepth = getDealData(adjustWellDiameter, adjustWellDepth);
  adjustWellStopPumpWaterLevel =
    sbrDesignGroundElevationPumpWell +
    0.3 -
    adjustWellDepth +
    sbrStopPumpWaterLevelInnerHeight +
    h19(adjustWellDiameter);
  adjustWellStopPumpWaterLevel = keepTwoDecimalFull(adjustWellStopPumpWaterLevel, 1);
  const adjustWellPumpFlow = keepTwoDecimalFull(sbrDeviceSpecs * 4, 3);

  const adjustWellPumpLift = keepTwoDecimalFull(
    sbrDeviceInletPipeElevation +
      adjustWellTotalHeadLoss +
      sewageTreatmentOutflowHead -
      adjustWellStopPumpWaterLevel,
    1,
  );

  const pumpingWellVolume = keepTwoDecimalFull(sbrDeviceSpecs * sewageStopTime, 3);

  let pumpingWellWaterDepth =
    pumpingWellVolume / (3.14 * Math.pow(Number(pumpingWellDiameter) / 2, 2));
  pumpingWellWaterDepth = keepTwoDecimalFull(pumpingWellWaterDepth, 1);
  if (pumpingWellWaterDepth > 2) {
    message.warn('污水抽升泵井《泵井有效水深》不能超过2m，请重新选择《泵井直径》', EQUIP.DURATION);
    setFieldsValueDrainage({ pumpingWellDiameter: undefined, pumpingWellWaterDepth: undefined });
    return;
  }
  let pumpingWellStopPumpWaterLevel = keepTwoDecimalFull(
    pumpingWellWaterPipeElevation - 0.2 - pumpingWellWaterDepth,
    1,
  );
  let pwLiftWellHeight =
    pwDesignGroundElevationPumpWell +
    0.3 -
    pumpingWellStopPumpWaterLevel +
    pwStopPumpWaterLevelInnerHeight +
    h19(pumpingWellDiameter);
  pwLiftWellHeight = keepTwoDecimalFull(pwLiftWellHeight, 1);
  const obj20 = {
    pumpingWellDiameter: undefined,
  };
  judgmentC(pumpingWellDiameter, pwLiftWellHeight, setFieldsValueDrainage, obj20);
  pwLiftWellHeight = getDealData(pumpingWellDiameter, pwLiftWellHeight);
  pumpingWellStopPumpWaterLevel =
    pwDesignGroundElevationPumpWell +
    0.3 -
    pwLiftWellHeight +
    pwStopPumpWaterLevelInnerHeight +
    h19(pumpingWellDiameter);
  pumpingWellStopPumpWaterLevel = keepTwoDecimalFull(pumpingWellStopPumpWaterLevel, 3);
  const pumpingWellPumpLift = keepTwoDecimalFull(
    filterWaterInletElevation +
      filterWaterInletPressure -
      pumpingWellStopPumpWaterLevel +
      pumpingWellTotalHeadLoss +
      sewageExcessHead,
    1,
  );
  const reuseWaterTankVolume = keepTwoDecimalFull(makeGreenSprinklingWater / 2, 3);
  const reusePumpFlow = keepTwoDecimalFull(sprinklerFlowRate * 4 * 3.6);

  const reusePumpLift = keepTwoDecimalFull(
    dullSprinklerGroundLevel +
      sprinklerWorkPressure -
      reuseWaterTankStopPumpWaterLevel +
      makeGreenTotalHeadLoss +
      reusePumpOutflowHead,
    1,
  );

  const mbrDeviceSpecs = keepTwoDecimalFull(mbrSewageTreatmentCapacity / 24, 3);
  const mbrSewageRegulatingWellVolume = keepTwoDecimalFull(
    (mbrSewageTreatmentCapacity * adjustTime) / 24,
    3,
  );
  let mbrAdjustWellWaterDepth =
    mbrSewageRegulatingWellVolume / (3.14 * Math.pow(Number(mbrAdjustWellDiameter) / 2, 2));
  mbrAdjustWellWaterDepth = keepTwoDecimalFull(mbrAdjustWellWaterDepth, 1);
  if (mbrAdjustWellWaterDepth > 2) {
    message.warn('污水调节泵井《泵井有效水深》不能超过2m，请重新选择《泵井直径》', EQUIP.DURATION);
    setFieldsValueDrainage({
      mbrAdjustWellDiameter: undefined,
      mbrAdjustWellWaterDepth: undefined,
    });
    return;
  }
  let mbrAdjustWellStopPumpWaterLevel = keepTwoDecimalFull(
    mbrAdjustWellWaterPipeElevation - 0.2 - mbrAdjustWellWaterDepth,
    1,
  );
  let mbrLiftWellHeight = keepTwoDecimalFull(
    mbrDesignGroundElevationPumpWell +
      0.3 -
      mbrAdjustWellStopPumpWaterLevel +
      mbrStopPumpWaterLevelInnerHeight +
      h19(mbrAdjustWellDiameter),
    1,
  );
  const obj7 = {
    mbrAdjustWellDiameter: undefined,
  };
  judgmentC(mbrAdjustWellDiameter, mbrLiftWellHeight, setFieldsValueDrainage, obj7);
  mbrLiftWellHeight = getDealData(pumpingWellDiameter, mbrLiftWellHeight);
  mbrAdjustWellStopPumpWaterLevel = keepTwoDecimalFull(
    mbrDesignGroundElevationPumpWell +
      0.3 -
      mbrLiftWellHeight +
      mbrStopPumpWaterLevelInnerHeight +
      h19(mbrAdjustWellDiameter),
    1,
  );

  const mbrPumpLift = keepTwoDecimalFull(
    mbrDeviceInletPipeElevation +
      mbrAdjustWellStopPumpWaterLevel +
      mbrTotalHeadLoss +
      mbrDeviceOutflowHead,
    1,
  );

  const coefficientOfVariation = nc(keepTwoDecimalFull(pumpingWellSewageMeasure / 24 / 3.6, 1)); // 变化系数
  const submersibleSewagePumpFlow = keepTwoDecimalFull(
    (pumpingWellSewageMeasure * coefficientOfVariation) / 24,
    3,
  ); // Q
  const pumpingWellSewageVolume = keepTwoDecimalFull((1 / 3) * submersibleSewagePumpFlow, 3);
  let pumpWellWaterDepth = 0;
  if (pumpWellShape === 'circle') {
    pumpWellWaterDepth = keepTwoDecimalFull(
      pumpingWellSewageVolume / (3.14 * Math.pow(Number(pumpWellSize) / 2, 2)),
      1,
    );
  } else {
    pumpWellWaterDepth = keepTwoDecimalFull(pumpingWellSewageVolume / Number(pumpWellSize), 1);
  }
  if (pumpWellWaterDepth > 2) {
    message.warn('污水抽升泵《泵井有效水深》不能超过2m，请重新选择《泵井直径》', EQUIP.DURATION);
    setFieldsValueDrainage({
      pumpWellSize: undefined,
      pumpWellWaterDepth: undefined,
    });
    return;
  }
  let pumpWellStopPumpWaterLevel = keepTwoDecimalFull(
    pumpWellWaterPipeElevation - 0.2 - pumpWellWaterDepth,
    1,
  );
  let swpLiftWellHeight = 0;
  if (pumpWellShape === 'circle') {
    swpLiftWellHeight = keepTwoDecimalFull(
      swpDesignGroundElevationPumpWell +
        0.3 -
        pumpWellStopPumpWaterLevel +
        swpStopPumpWaterLevelInnerHeight +
        h19(pumpWellSize),
      1,
    );
  } else {
    swpLiftWellHeight = keepTwoDecimalFull(
      swpDesignGroundElevationPumpWell -
        pumpWellStopPumpWaterLevel +
        swpStopPumpWaterLevelInnerHeight,
      1,
    );
  }
  const obj2 = {
    pumpWellSize: undefined,
  };
  if (pumpWellShape === 'circle') {
    judgmentC(pumpWellSize, swpLiftWellHeight, setFieldsValueDrainage, obj2);
    swpLiftWellHeight = getDealData(pumpWellSize, swpLiftWellHeight);
  } else {
    judgmentR(swpLiftWellHeight, setFieldsValueDrainage, obj2);
    swpLiftWellHeight = getDealDataR(swpLiftWellHeight);
  }
  if (pumpWellShape === 'circle') {
    pumpWellStopPumpWaterLevel = keepTwoDecimalFull(
      swpDesignGroundElevationPumpWell +
        0.3 -
        swpLiftWellHeight +
        swpStopPumpWaterLevelInnerHeight +
        h19(pumpWellSize),
      1,
    );
  } else {
    pumpWellStopPumpWaterLevel = keepTwoDecimalFull(
      swpDesignGroundElevationPumpWell - swpLiftWellHeight + swpStopPumpWaterLevelInnerHeight,
      1,
    );
  }

  const spwPumpLift = keepTwoDecimalFull(
    liftingPipeHighestPoint - pumpWellStopPumpWaterLevel + pumpWellTotalHeadLoss + spwOutflowHead,
    1,
  );

  const settlingTankVolume = keepTwoDecimalFull(
    (amountOilyWastewater * settlingTankStopTime) / workTime,
    3,
  );
  const iaffDeviceSpecs = keepTwoDecimalFull(amountOilyWastewater / workTime, 3);
  const spwInletPumpLift = keepTwoDecimalFull(
    iaffWaterPipeElevation +
      iaffWaterInletPressure -
      iaffStopPumpWaterLevel +
      iaffTotalHeadLoss +
      iaffExcessHead,
    1,
  );

  setFieldsValueDrainage({
    sbrDeviceSpecs,
    sewageRegulatingWellVolume,
    adjustWellWaterDepth,
    adjustWellStopPumpWaterLevel,
    adjustWellDepth,
    adjustWellPumpFlow,
    adjustWellPumpLift,
    filterSpecs: sbrDeviceSpecs,
    pumpingWellVolume,
    pumpingWellWaterDepth,
    pumpingWellStopPumpWaterLevel,
    pwLiftWellHeight,
    pumpingWellPumpFlow: sbrDeviceSpecs,
    pumpingWellPumpLift,
    reuseWaterTankVolume,
    reusePumpFlow,
    reusePumpLift,
    ultravioletDisinfection: reusePumpFlow,
    mbrDeviceSpecs,
    mbrSewageRegulatingWellVolume,
    mbrAdjustWellStopPumpWaterLevel,
    mbrLiftWellHeight,
    mbrAdjustWellPumpFlow: mbrDeviceSpecs,
    mbrPumpLift,
    submersibleSewagePumpFlow,
    pumpingWellSewageVolume,
    pumpWellWaterDepth,
    swpLiftWellHeight,
    spwPumpLift,
    settlingTankVolume,
    iaffDeviceSpecs,
    spwInletPumpLift,
    inletSubmersibleSewagePumpFlow: iaffDeviceSpecs,
    anaerobicFilter: liftSewageTreatmentCapacity,
    constructedWetland: liftSewageTreatmentCapacity,
  });
};
export const nc = (x) => {
  let num = 0;
  if (x <= 5) {
    num = 2.7;
  } else if (x <= 15) {
    num = 2.7 + ((2.4 - 2.7) / (15 - 5)) * (x - 5);
  } else if (x <= 40) {
    num = 2.4 + ((2.1 - 2.4) / (40 - 15)) * (x - 15);
  } else if (x <= 70) {
    num = 2.1 + ((2.0 - 2.1) / (70 - 40)) * (x - 40);
  } else if (x <= 100) {
    num = 2.0 + ((1.9 - 2.0) / (100 - 70)) * (x - 70);
  } else if (x <= 200) {
    num = 1.9 + ((1.8 - 1.9) / (200 - 100)) * (x - 100);
  } else if (x <= 500) {
    num = 1.8 + ((1.6 - 1.8) / (500 - 200)) * (x - 200);
  } else if (x <= 1000) {
    num = 1.6 + ((1.5 - 1.6) / (1000 - 500)) * (x - 500);
  } else {
    num = 1.5;
  }
  return keepTwoDecimalFull(num, 3);
};
const h19 = (adjustWellDiameter) => {
  const obj = { 2: 0.65, 3: 0.8, 4: 1.05, 5: 1.05 };
  return obj[adjustWellDiameter];
};
const judgmentC = (d, h, setFieldsValueDrainage, obj) => {
  if (d == 2 && h > 6.5) {
    message.warn('《泵井直径》为2m时，《泵井高度》不能超过6.5m', EQUIP.DURATION);
    setFieldsValueDrainage(obj);
    return;
  } else if (d == 3 && h > 7) {
    message.warn('《泵井直径》为3m时，《泵井高度》不能超过7m', EQUIP.DURATION);
    setFieldsValueDrainage(obj);
    return;
  } else if (d == 4 && h > 7.5) {
    message.warn('《泵井直径》为4m时，《泵井高度》不能超过7.5m', EQUIP.DURATION);
    setFieldsValueDrainage(obj);
    return;
  } else if (d == 5 && h > 8) {
    message.warn('《泵井直径》为5m时，《泵井高度》不能超过8m', EQUIP.DURATION);
    setFieldsValueDrainage(obj);
    return;
  }
};
const judgmentR = (h, setFieldsValueDrainage, obj) => {
  if (h > 6) {
    message.warn('《泵井高度》不能超过6m', EQUIP.DURATION);
    setFieldsValueDrainage(obj);
    return;
  }
};
const getDealDataR = (h) => {
  let dealData = 0;
  if (h < 3.5) {
    dealData = 3.5;
  } else if (h < 4) {
    dealData = 4;
  } else if (h < 4.5) {
    dealData = 4.5;
  } else if (h < 5) {
    dealData = 5;
  } else if (h < 5.5) {
    dealData = 5.5;
  } else {
    dealData = 6;
  }
  return dealData;
};

const getDealData = (d, h) => {
  let dealData = 0;
  if (d == 2) {
    if (h < 5.5) {
      dealData = 5.5;
    } else if (h < 6) {
      dealData = 5.5;
    } else if (h < 6.5) {
      dealData = 6.5;
    } else {
      dealData = h;
    }
  } else if (d == 3) {
    if (h < 6) {
      dealData = 6;
    } else if (h < 6.5) {
      dealData = 6.5;
    } else if (h < 6.5) {
      dealData = 7;
    } else {
      dealData = h;
    }
  } else if (d == 4) {
    if (h < 6.5) {
      dealData = 6.5;
    } else if (h < 7) {
      dealData = 7;
    } else if (h < 7.5) {
      dealData = 7.5;
    } else {
      dealData = h;
    }
  } else if (d == 5) {
    if (h < 7) {
      dealData = 7;
    } else if (h < 7.5) {
      dealData = 7.5;
    } else if (h < 8) {
      dealData = 8;
    } else {
      dealData = h;
    }
  }
  return dealData;
};

export const displayProcess = (e, updateSchema) => {
  let label = '';
  let show = true;
  if (e === 'GreenReuseSBR') {
    label =
      '处理流程: 进水 → 调节泵井及泵组 → SBR设备 → 抽升泵井及泵组 → 过滤器 → 回用水池、泵组及消毒 → 回用';
    show = true;
  } else if (e === 'GreenReuseMBR') {
    label =
      '处理流程: 进水 → 调节井及泵组 → MBR设备 → 抽升泵井及泵组 → 回用水池、泵组及消毒 → 回用';
    show = true;
  } else if (e === 'NearbyDischargeSBR') {
    label = '处理流程: 进水 → 调节泵井及泵组 → SBR设备 → 抽升泵井及泵组 → 过滤器 → 排放';
    show = true;
  } else if (e === 'NearbyDischargeMBR') {
    label = '处理流程: 进水 → 调节井及泵组 → MBR设备 → 抽升泵井及泵组 → 排放';
    show = true;
  } else if (e === 'ConstructedWetlands') {
    label = '处理流程: 进水 → 厌氧滤池+人工湿地 → 排放';
    show = true;
  } else if (e === 'AFF') {
    label = '处理流程: 进水 → 调沉+气浮过滤 → 管网';
    show = true;
  } else if (e === 'ExtractionDirectDischarge') {
    label = '处理流程: 进水 → 抽升泵井及泵组 → 管网';
    show = true;
  } else {
    show = false;
  }
  updateSchema({
    field: 'divider101',
    label,
    show,
  });
};

const initChange = (e, formModel, formActionType) => {
  const { projectID, stationID } = formModel;
  const { setFieldsValue: setFieldsValueDrainage, clearValidate } = formActionType;
  let dealValue = e;
  if (e === store.technologyTypeFromSaveGetter) {
    dealValue = null;
  }
  getStationDeviceSelectionDrainageEdit({
    projectID,
    stationID,
    technologyType: dealValue,
  }).then((res) => {
    initDrainageChangeValue(setFieldsValueDrainage, { res }, clearValidate);
  });
};
const dealAssign = (...record) => {
  const newArr = record.filter((item) => !!item);
  const obj = newArr.reduce((pre, item) => {
    return Object.assign(pre, item);
  }, {});
  return obj;
};
export const initDrainage = (updateSchemaDrainage, setFieldsValueDrainage, record) => {
  const {
    projectID,
    stationID,

    sbrModel,
    adjustPumpModel,
    filterSpecsMode,
    pumpingWellModel,
    reuseWaterTankModel,
    mbrModel,
    adjustWellModel,
    sewagePumpWell,
    sedimentationIAFF,
    liftWaterPoint,
  } = record.res;
  const pumpWellShape = record.res.sewagePumpWell
    ? record.res.sewagePumpWell.pumpWellShape
    : undefined;
  let { outType, technologyType } = record.res;
  if (!outType) {
    outType = 'GreenReuse';
  }
  if (!technologyType) {
    technologyType = 'GreenReuseSBR';
  }
  const values = dealAssign(
    { projectID },
    { stationID },
    { outType },
    { technologyType },
    sbrModel,
    adjustPumpModel,
    filterSpecsMode,
    pumpingWellModel,
    reuseWaterTankModel,
    mbrModel,
    adjustWellModel,
    sewagePumpWell,
    sedimentationIAFF,
    liftWaterPoint,
  );

  if (outType === 'GreenReuse') {
    updateSchemaDrainage({
      field: 'technologyType',
      componentProps: ({ formModel, formActionType }) => {
        return {
          options: technologyTypeOptionsData[outType],
          onChange: (e: any) => {
            displayProcess(e, updateSchemaDrainage);
            chonseTypeEquip(e, updateSchemaDrainage);
            initChange(e, formModel, formActionType);
          },
        };
      },
    });
  } else if (outType === 'NearbyDischarge') {
    updateSchemaDrainage({
      field: 'technologyType',
      componentProps: ({ formModel, formActionType }) => {
        return {
          options: technologyTypeOptionsData[outType],
          onChange: (e: any) => {
            displayProcess(e, updateSchemaDrainage);
            chonseTypeEquip(e, updateSchemaDrainage);
            initChange(e, formModel, formActionType);
          },
        };
      },
    });
  } else {
    updateSchemaDrainage({
      field: 'technologyType',
      componentProps: ({ formModel, formActionType }) => {
        return {
          options: technologyTypeOptionsData[outType],
          onChange: (e: any) => {
            displayProcess(e, updateSchemaDrainage);
            chonseTypeEquip(e, updateSchemaDrainage);
            initChange(e, formModel, formActionType);
          },
        };
      },
    });
  }
  if (!!pumpWellShape) {
    updateSchemaDrainage({
      field: 'pumpWellSize',
      componentProps: () => {
        return {
          options: pumpWellShapeOptionsData[pumpWellShape],
        };
      },
    });
  }
  //将数字类型转化为字符串
  values.pumpWellSize = values.pumpWellSize ? values.pumpWellSize + '' : values.pumpWellSize;
  values.sewageTreatmentCapacity = values.sewageTreatmentCapacity
    ? values.sewageTreatmentCapacity
    : undefined;
  //默认值初始化
  values.sbrAdjustTime = 6;
  values.sewageTreatmentOutflowHead = 3;
  values.sbrDeviceWork = 3;
  values.defaultValue = 6;
  values.adjustTime = 6;
  values.mbrDeviceOutflowHead = 3;
  values.sewageStopTime = 1;
  values.filterWaterInletPressure = 5;
  values.sewageExcessHead = 3;
  values.sprinklerFlowRate = 0.7;
  values.sprinklerWorkPressure = 10;
  values.reusePumpOutflowHead = 3;
  values.spwOutflowHead = 3;
  values.workTime = 14;
  values.settlingTankStopTime = 4;
  values.iaffWaterInletPressure = 5;
  values.iaffExcessHead = 3;

  setFieldsValueDrainage({ ...values });
};
//切换初始化
export const initDrainageChangeValue = (setFieldsValueDrainage, record, clearValidate) => {
  const {
    sbrModel,
    adjustPumpModel,
    filterSpecsMode,
    pumpingWellModel,
    reuseWaterTankModel,
    mbrModel,
    adjustWellModel,
    sewagePumpWell,
    sedimentationIAFF,
    liftWaterPoint,
  } = record.res;
  const values = dealAssign(
    sbrModel,
    adjustPumpModel,
    filterSpecsMode,
    pumpingWellModel,
    reuseWaterTankModel,
    mbrModel,
    adjustWellModel,
    sewagePumpWell,
    sedimentationIAFF,
    liftWaterPoint,
  );

  //将数字类型转化为字符串
  values.pumpWellSize = values.pumpWellSize ? values.pumpWellSize + '' : values.pumpWellSize;
  values.sewageTreatmentCapacity = values.sewageTreatmentCapacity
    ? values.sewageTreatmentCapacity
    : undefined;
  //默认值初始化
  values.sbrAdjustTime = 6;
  values.sewageTreatmentOutflowHead = 3;
  values.sbrDeviceWork = 3;
  values.defaultValue = 6;
  values.adjustTime = 6;
  values.mbrDeviceOutflowHead = 3;
  values.sewageStopTime = 1;
  values.filterWaterInletPressure = 5;
  values.sewageExcessHead = 3;
  values.sprinklerFlowRate = 0.7;
  values.sprinklerWorkPressure = 10;
  values.reusePumpOutflowHead = 3;
  values.spwOutflowHead = 3;
  values.workTime = 14;
  values.settlingTankStopTime = 4;
  values.iaffWaterInletPressure = 5;
  values.iaffExcessHead = 3;

  setFieldsValueDrainage({ ...values });
  clearValidate();
};

export const chonseTypeEquip = (e, updateSchema) => {
  let ifShowObj = {
    divider10: false,
    sewageTreatmentCapacity: false,
    sbrDeviceWork: false,
    sbrDeviceType: false,
    sbrCycleWorkTime: false,
    sbrDeviceSpecs: false,
    sbrModel: false,

    divider20: false,
    divider21: false,
    sewageRegulatingWellVolume: false,
    sbrAdjustTime: false,
    adjustWellDiameter: false,
    adjustWellWaterDepth: false,
    adjustWellWaterPipeElevation: false,
    adjustWellStopPumpWaterLevel: false,
    divider22: false,
    adjustWellPumpFlow: false,
    sbrDeviceInletPipeElevation: false,
    adjustWellTotalHeadLoss: false,
    js1: false,
    sewageTreatmentOutflowHead: false,
    adjustWellPumpLift: false,
    adjustPumpModel: false,
    sbrDesignGroundElevationPumpWell: false,
    sbrStopPumpWaterLevelInnerHeight: false,
    adjustWellDepth: false,

    divider30: false,
    filterSpecs: false,
    filterSelection: false,

    divider60: false,
    mbrSewageTreatmentCapacity: false,
    mbrDeviceSpecs: false,
    mbrModel: false,

    divider70: false,
    divider71: false,
    adjustTime: false,
    mbrSewageRegulatingWellVolume: false,
    mbrAdjustWellDiameter: false,
    mbrAdjustWellWaterDepth: false,
    mbrAdjustWellWaterPipeElevation: false,
    mbrAdjustWellStopPumpWaterLevel: false,
    divider72: false,
    mbrAdjustWellPumpFlow: false,
    mbrDeviceInletPipeElevation: false,
    mbrTotalHeadLoss: false,
    js4: false,
    mbrDeviceOutflowHead: false,
    mbrPumpLift: false,
    adjustWellModel: false,
    mbrDesignGroundElevationPumpWell: false,
    mbrStopPumpWaterLevelInnerHeight: false,
    mbrLiftWellHeight: false,

    divider40: false,
    divider41: false,
    pumpingWellDiameter: false,
    sewageStopTime: false,
    pumpingWellVolume: false,
    pumpingWellWaterDepth: false,
    pumpingWellWaterPipeElevation: false,
    pumpingWellStopPumpWaterLevel: false,
    divider42: false,
    pumpingWellPumpFlow: false,
    filterWaterInletPressure: false,
    pumpingWellTotalHeadLoss: false,
    js2: false,
    filterWaterInletElevation: false,
    sewageExcessHead: false,
    pumpingWellPumpLift: false,
    pumpingWellModel: false,
    pwDesignGroundElevationPumpWell: false,
    pwStopPumpWaterLevelInnerHeight: false,
    pwLiftWellHeight: false,
    divider50: false,
    divider51: false,
    reuseWaterTankVolume: false,
    divider52: false,
    sprinklerFlowRate: false,
    makeGreenSprinklingWater: false,
    reusePumpFlow: false,
    makeGreenTotalHeadLoss: false,
    js3: false,
    sprinklerWorkPressure: false,
    dullSprinklerGroundLevel: false,
    reuseWaterTankStopPumpWaterLevel: false,
    reusePumpOutflowHead: false,
    reusePumpLift: false,
    divider53: false,
    ultravioletDisinfection: false,
    reuseWaterTankModel: false,

    divider80: false,
    divider81: false,
    pumpWellSize: false,
    pumpWellShape: false,
    pumpingWellSewageVolume: false,
    pumpWellWaterDepth: false,
    pumpWellWaterPipeElevation: false,
    pumpWellStopPumpWaterLevel: false,
    divider82: false,
    pumpingWellSewageMeasure: false,
    submersibleSewagePumpFlow: false,
    pumpWellTotalHeadLoss: false,
    js5: false,
    pumpWellDesignGround: false,
    liftingPipeHighestPoint: false,
    spwOutflowHead: false,
    spwPumpLift: false,
    spwPumpModel: false,
    swpDesignGroundElevationPumpWell: false,
    swpStopPumpWaterLevelInnerHeight: false,
    swpLiftWellHeight: false,

    divider9: false,
    divider91: false,
    amountOilyWastewater: false,
    workTime: false,
    settlingTankStopTime: false,
    settlingTankVolume: false,
    divider92: false,
    iaffDeviceSpecs: false,
    inletSubmersibleSewagePumpFlow: false,
    iaffTotalHeadLoss: false,
    js6: false,
    iaffWaterPipeElevation: false,
    iaffWaterInletPressure: false,
    iaffStopPumpWaterLevel: false,
    iaffExcessHead: false,
    spwInletPumpLift: false,
    sedimentationIAFFModel: false,

    divider100: false,
    liftSewageTreatmentCapacity: false,
    anaerobicFilter: false,
    constructedWetland: false,
    liftWaterPointModel: false,
  };
  if (e === 'GreenReuseSBR') {
    //1 2 3 4 5
    ifShowObj = {
      divider10: true,
      sewageTreatmentCapacity: true,
      sbrDeviceWork: true,
      sbrDeviceType: true,
      sbrCycleWorkTime: true,
      sbrDeviceSpecs: true,
      sbrModel: true,

      divider20: true,
      divider21: true,
      sewageRegulatingWellVolume: true,
      sbrAdjustTime: true,
      adjustWellDiameter: true,
      adjustWellWaterDepth: true,
      adjustWellWaterPipeElevation: true,
      adjustWellStopPumpWaterLevel: true,
      divider22: true,
      adjustWellPumpFlow: true,
      sbrDeviceInletPipeElevation: true,
      adjustWellTotalHeadLoss: true,
      js1: true,
      sewageTreatmentOutflowHead: true,
      adjustWellPumpLift: true,
      adjustPumpModel: true,
      sbrDesignGroundElevationPumpWell: true,
      sbrStopPumpWaterLevelInnerHeight: true,
      adjustWellDepth: true,
      divider30: true,
      filterSpecs: true,
      filterSelection: true,

      divider60: false,
      mbrSewageTreatmentCapacity: false,
      mbrDeviceSpecs: false,
      mbrModel: false,
      divider70: false,
      divider71: false,
      adjustTime: false,
      mbrSewageRegulatingWellVolume: false,
      mbrAdjustWellDiameter: false,
      mbrAdjustWellWaterDepth: false,
      mbrAdjustWellWaterPipeElevation: false,
      mbrAdjustWellStopPumpWaterLevel: false,

      divider72: false,
      mbrAdjustWellPumpFlow: false,
      mbrDeviceInletPipeElevation: false,
      mbrTotalHeadLoss: false,
      js4: false,
      mbrDeviceOutflowHead: false,
      mbrPumpLift: false,
      adjustWellModel: false,
      mbrDesignGroundElevationPumpWell: false,
      mbrStopPumpWaterLevelInnerHeight: false,
      mbrLiftWellHeight: false,
      divider40: true,
      divider41: true,
      pumpingWellDiameter: true,
      sewageStopTime: true,
      pumpingWellVolume: true,
      pumpingWellWaterDepth: true,
      pumpingWellWaterPipeElevation: true,
      pumpingWellStopPumpWaterLevel: true,
      divider42: true,
      pumpingWellPumpFlow: true,
      filterWaterInletPressure: true,
      pumpingWellTotalHeadLoss: true,
      js2: true,
      filterWaterInletElevation: true,
      sewageExcessHead: true,
      pumpingWellPumpLift: true,
      pumpingWellModel: true,
      pwDesignGroundElevationPumpWell: true,
      pwStopPumpWaterLevelInnerHeight: true,
      pwLiftWellHeight: true,

      divider50: true,
      divider51: true,
      reuseWaterTankVolume: true,
      divider52: true,
      sprinklerFlowRate: true,
      makeGreenSprinklingWater: true,
      reusePumpFlow: true,
      makeGreenTotalHeadLoss: true,
      js3: true,
      sprinklerWorkPressure: true,
      dullSprinklerGroundLevel: true,
      reuseWaterTankStopPumpWaterLevel: true,
      reusePumpOutflowHead: true,
      reusePumpLift: true,
      divider53: true,
      ultravioletDisinfection: true,
      reuseWaterTankModel: true,

      divider80: false,
      divider81: false,
      pumpWellSize: false,
      pumpWellShape: false,
      pumpingWellSewageVolume: false,
      pumpWellWaterDepth: false,
      pumpWellWaterPipeElevation: false,
      pumpWellStopPumpWaterLevel: false,
      divider82: false,
      pumpingWellSewageMeasure: false,
      submersibleSewagePumpFlow: false,
      pumpWellTotalHeadLoss: false,
      js5: false,
      pumpWellDesignGround: false,
      liftingPipeHighestPoint: false,
      spwOutflowHead: false,
      spwPumpLift: false,
      spwPumpModel: false,
      swpDesignGroundElevationPumpWell: false,
      swpStopPumpWaterLevelInnerHeight: false,
      swpLiftWellHeight: false,

      divider9: false,
      divider91: false,
      amountOilyWastewater: false,
      workTime: false,
      settlingTankStopTime: false,
      settlingTankVolume: false,
      divider92: false,
      iaffDeviceSpecs: false,
      inletSubmersibleSewagePumpFlow: false,
      iaffTotalHeadLoss: false,
      js6: false,
      iaffWaterPipeElevation: false,
      iaffWaterInletPressure: false,
      iaffStopPumpWaterLevel: false,
      iaffExcessHead: false,
      spwInletPumpLift: false,
      sedimentationIAFFModel: false,

      divider100: false,
      liftSewageTreatmentCapacity: false,
      anaerobicFilter: false,
      constructedWetland: false,
      liftWaterPointModel: false,
    };
  } else if (e === 'GreenReuseMBR') {
    //6 7 4 5
    ifShowObj = {
      divider10: false,
      sewageTreatmentCapacity: false,
      sbrDeviceWork: false,
      sbrDeviceType: false,
      sbrCycleWorkTime: false,
      sbrDeviceSpecs: false,
      sbrModel: false,
      divider20: false,
      divider21: false,
      sewageRegulatingWellVolume: false,
      sbrAdjustTime: false,
      adjustWellDiameter: false,
      adjustWellWaterDepth: false,
      adjustWellWaterPipeElevation: false,
      adjustWellStopPumpWaterLevel: false,
      divider22: false,
      adjustWellPumpFlow: false,
      sbrDeviceInletPipeElevation: false,
      adjustWellTotalHeadLoss: false,
      js1: false,
      sewageTreatmentOutflowHead: false,
      adjustWellPumpLift: false,
      adjustPumpModel: false,
      sbrDesignGroundElevationPumpWell: false,
      sbrStopPumpWaterLevelInnerHeight: false,
      adjustWellDepth: false,
      divider30: false,
      filterSpecs: false,
      filterSelection: false,

      divider60: true,
      mbrSewageTreatmentCapacity: true,
      mbrDeviceSpecs: true,
      mbrModel: true,
      divider70: true,
      divider71: true,
      adjustTime: true,
      mbrSewageRegulatingWellVolume: true,
      mbrAdjustWellDiameter: true,
      mbrAdjustWellWaterDepth: true,
      mbrAdjustWellWaterPipeElevation: true,
      mbrAdjustWellStopPumpWaterLevel: true,

      divider72: true,
      mbrAdjustWellPumpFlow: true,
      mbrDeviceInletPipeElevation: true,
      mbrTotalHeadLoss: true,
      js4: true,
      mbrDeviceOutflowHead: true,
      mbrPumpLift: true,
      adjustWellModel: true,
      mbrDesignGroundElevationPumpWell: true,
      mbrStopPumpWaterLevelInnerHeight: true,
      mbrLiftWellHeight: true,

      divider40: true,
      divider41: true,
      pumpingWellDiameter: true,
      sewageStopTime: true,
      pumpingWellVolume: true,
      pumpingWellWaterDepth: true,
      pumpingWellWaterPipeElevation: true,
      pumpingWellStopPumpWaterLevel: true,
      divider42: true,
      pumpingWellPumpFlow: true,
      filterWaterInletPressure: true,
      pumpingWellTotalHeadLoss: true,
      js2: true,
      filterWaterInletElevation: true,
      sewageExcessHead: true,
      pumpingWellPumpLift: true,
      pumpingWellModel: true,
      pwDesignGroundElevationPumpWell: true,
      pwStopPumpWaterLevelInnerHeight: true,
      pwLiftWellHeight: true,

      divider50: true,
      divider51: true,
      reuseWaterTankVolume: true,
      divider52: true,
      sprinklerFlowRate: true,
      makeGreenSprinklingWater: true,
      reusePumpFlow: true,
      makeGreenTotalHeadLoss: true,
      js3: true,
      sprinklerWorkPressure: true,
      dullSprinklerGroundLevel: true,
      reuseWaterTankStopPumpWaterLevel: true,
      reusePumpOutflowHead: true,
      reusePumpLift: true,
      divider53: true,
      ultravioletDisinfection: true,
      reuseWaterTankModel: true,

      divider80: false,
      divider81: false,
      pumpWellSize: false,
      pumpWellShape: false,
      pumpingWellSewageVolume: false,
      pumpWellWaterDepth: false,
      pumpWellWaterPipeElevation: false,
      pumpWellStopPumpWaterLevel: false,
      divider82: false,
      pumpingWellSewageMeasure: false,
      submersibleSewagePumpFlow: false,
      pumpWellTotalHeadLoss: false,
      js5: false,
      pumpWellDesignGround: false,
      liftingPipeHighestPoint: false,
      spwOutflowHead: false,
      spwPumpLift: false,
      spwPumpModel: false,
      swpDesignGroundElevationPumpWell: false,
      swpStopPumpWaterLevelInnerHeight: false,
      swpLiftWellHeight: false,

      divider9: false,
      divider91: false,
      amountOilyWastewater: false,
      workTime: false,
      settlingTankStopTime: false,
      settlingTankVolume: false,
      divider92: false,
      iaffDeviceSpecs: false,
      inletSubmersibleSewagePumpFlow: false,
      iaffTotalHeadLoss: false,
      js6: false,
      iaffWaterPipeElevation: false,
      iaffWaterInletPressure: false,
      iaffStopPumpWaterLevel: false,
      iaffExcessHead: false,
      spwInletPumpLift: false,
      sedimentationIAFFModel: false,

      divider100: false,
      liftSewageTreatmentCapacity: false,
      anaerobicFilter: false,
      constructedWetland: false,
      liftWaterPointModel: false,
    };
  } else if (e === 'NearbyDischargeSBR') {
    //1 2 3 4
    ifShowObj = {
      divider10: true,
      sewageTreatmentCapacity: true,
      sbrDeviceWork: true,
      sbrDeviceType: true,
      sbrCycleWorkTime: true,
      sbrDeviceSpecs: true,
      sbrModel: true,
      divider20: true,
      divider21: true,
      sewageRegulatingWellVolume: true,
      sbrAdjustTime: true,
      adjustWellDiameter: true,
      adjustWellWaterDepth: true,
      adjustWellWaterPipeElevation: true,
      adjustWellStopPumpWaterLevel: true,
      divider22: true,
      adjustWellPumpFlow: true,
      sbrDeviceInletPipeElevation: true,
      adjustWellTotalHeadLoss: true,
      js1: true,
      sewageTreatmentOutflowHead: true,
      adjustWellPumpLift: true,
      adjustPumpModel: true,
      sbrDesignGroundElevationPumpWell: true,
      sbrStopPumpWaterLevelInnerHeight: true,
      adjustWellDepth: true,
      divider30: true,
      filterSpecs: true,
      filterSelection: true,

      divider60: false,
      mbrSewageTreatmentCapacity: false,
      mbrDeviceSpecs: false,
      mbrModel: false,
      divider70: false,
      divider71: false,
      adjustTime: false,
      mbrSewageRegulatingWellVolume: false,
      mbrAdjustWellDiameter: false,
      mbrAdjustWellWaterDepth: false,
      mbrAdjustWellWaterPipeElevation: false,
      mbrAdjustWellStopPumpWaterLevel: false,

      divider72: false,
      mbrAdjustWellPumpFlow: false,
      mbrDeviceInletPipeElevation: false,
      mbrTotalHeadLoss: false,
      js4: false,
      mbrDeviceOutflowHead: false,
      mbrPumpLift: false,
      adjustWellModel: false,
      mbrDesignGroundElevationPumpWell: false,
      mbrStopPumpWaterLevelInnerHeight: false,
      mbrLiftWellHeight: false,

      divider40: true,
      divider41: true,
      pumpingWellDiameter: true,
      sewageStopTime: true,
      pumpingWellVolume: true,
      pumpingWellWaterDepth: true,
      pumpingWellWaterPipeElevation: true,
      pumpingWellStopPumpWaterLevel: true,
      divider42: true,
      pumpingWellPumpFlow: true,
      filterWaterInletPressure: true,
      pumpingWellTotalHeadLoss: true,
      js2: true,
      filterWaterInletElevation: true,
      sewageExcessHead: true,
      pumpingWellPumpLift: true,
      pumpingWellModel: true,
      pwDesignGroundElevationPumpWell: true,
      pwStopPumpWaterLevelInnerHeight: true,
      pwLiftWellHeight: true,

      divider50: false,
      divider51: false,
      reuseWaterTankVolume: false,
      divider52: false,
      sprinklerFlowRate: false,
      makeGreenSprinklingWater: false,
      reusePumpFlow: false,
      makeGreenTotalHeadLoss: false,
      js3: false,
      sprinklerWorkPressure: false,
      dullSprinklerGroundLevel: false,
      reuseWaterTankStopPumpWaterLevel: false,
      reusePumpOutflowHead: false,
      reusePumpLift: false,
      divider53: false,
      ultravioletDisinfection: false,
      reuseWaterTankModel: false,

      divider80: false,
      divider81: false,
      pumpWellSize: false,
      pumpWellShape: false,
      pumpingWellSewageVolume: false,
      pumpWellWaterDepth: false,
      pumpWellWaterPipeElevation: false,
      pumpWellStopPumpWaterLevel: false,
      divider82: false,
      pumpingWellSewageMeasure: false,
      submersibleSewagePumpFlow: false,
      pumpWellTotalHeadLoss: false,
      js5: false,
      pumpWellDesignGround: false,
      liftingPipeHighestPoint: false,
      spwOutflowHead: false,
      spwPumpLift: false,
      spwPumpModel: false,
      swpDesignGroundElevationPumpWell: false,
      swpStopPumpWaterLevelInnerHeight: false,
      swpLiftWellHeight: false,

      divider9: false,
      divider91: false,
      amountOilyWastewater: false,
      workTime: false,
      settlingTankStopTime: false,
      settlingTankVolume: false,
      divider92: false,
      iaffDeviceSpecs: false,
      inletSubmersibleSewagePumpFlow: false,
      iaffTotalHeadLoss: false,
      js6: false,
      iaffWaterPipeElevation: false,
      iaffWaterInletPressure: false,
      iaffStopPumpWaterLevel: false,
      iaffExcessHead: false,
      spwInletPumpLift: false,
      sedimentationIAFFModel: false,

      divider100: false,
      liftSewageTreatmentCapacity: false,
      anaerobicFilter: false,
      constructedWetland: false,
      liftWaterPointModel: false,
    };
  } else if (e === 'NearbyDischargeMBR') {
    // 6 7 4
    ifShowObj = {
      divider10: false,
      sewageTreatmentCapacity: false,
      sbrDeviceWork: false,
      sbrDeviceType: false,
      sbrCycleWorkTime: false,
      sbrDeviceSpecs: false,
      sbrModel: false,
      divider20: false,
      divider21: false,
      sewageRegulatingWellVolume: false,
      sbrAdjustTime: false,
      adjustWellDiameter: false,
      adjustWellWaterDepth: false,
      adjustWellWaterPipeElevation: false,
      adjustWellStopPumpWaterLevel: false,
      divider22: false,
      adjustWellPumpFlow: false,
      sbrDeviceInletPipeElevation: false,
      adjustWellTotalHeadLoss: false,
      js1: false,
      sewageTreatmentOutflowHead: false,
      adjustWellPumpLift: false,
      adjustPumpModel: false,
      sbrDesignGroundElevationPumpWell: false,
      sbrStopPumpWaterLevelInnerHeight: false,
      adjustWellDepth: false,
      divider30: false,
      filterSpecs: false,
      filterSelection: false,

      divider60: true,
      mbrSewageTreatmentCapacity: true,
      mbrDeviceSpecs: true,
      mbrModel: true,
      divider70: true,
      divider71: true,
      adjustTime: true,
      mbrSewageRegulatingWellVolume: true,
      mbrAdjustWellDiameter: true,
      mbrAdjustWellWaterDepth: true,
      mbrAdjustWellWaterPipeElevation: true,
      mbrAdjustWellStopPumpWaterLevel: true,

      divider72: true,
      mbrAdjustWellPumpFlow: true,
      mbrDeviceInletPipeElevation: true,
      mbrTotalHeadLoss: true,
      js4: true,
      mbrDeviceOutflowHead: true,
      mbrPumpLift: true,
      adjustWellModel: true,
      mbrDesignGroundElevationPumpWell: true,
      mbrStopPumpWaterLevelInnerHeight: true,
      mbrLiftWellHeight: true,

      divider40: true,
      divider41: true,
      pumpingWellDiameter: true,
      sewageStopTime: true,
      pumpingWellVolume: true,
      pumpingWellWaterDepth: true,
      pumpingWellWaterPipeElevation: true,
      pumpingWellStopPumpWaterLevel: true,
      divider42: true,
      pumpingWellPumpFlow: true,
      filterWaterInletPressure: true,
      pumpingWellTotalHeadLoss: true,
      js2: true,
      filterWaterInletElevation: true,
      sewageExcessHead: true,
      pumpingWellPumpLift: true,
      pumpingWellModel: true,
      pwDesignGroundElevationPumpWell: true,
      pwStopPumpWaterLevelInnerHeight: true,
      pwLiftWellHeight: true,

      divider50: false,
      divider51: false,
      reuseWaterTankVolume: false,
      divider52: false,
      sprinklerFlowRate: false,
      makeGreenSprinklingWater: false,
      reusePumpFlow: false,
      makeGreenTotalHeadLoss: false,
      js3: false,
      sprinklerWorkPressure: false,
      dullSprinklerGroundLevel: false,
      reuseWaterTankStopPumpWaterLevel: false,
      reusePumpOutflowHead: false,
      reusePumpLift: false,
      divider53: false,
      ultravioletDisinfection: false,
      reuseWaterTankModel: false,

      divider80: false,
      divider81: false,
      pumpWellSize: false,
      pumpWellShape: false,
      pumpingWellSewageVolume: false,
      pumpWellWaterDepth: false,
      pumpWellWaterPipeElevation: false,
      pumpWellStopPumpWaterLevel: false,
      divider82: false,
      pumpingWellSewageMeasure: false,
      submersibleSewagePumpFlow: false,
      pumpWellTotalHeadLoss: false,
      js5: false,
      pumpWellDesignGround: false,
      liftingPipeHighestPoint: false,
      spwOutflowHead: false,
      spwPumpLift: false,
      spwPumpModel: false,
      swpDesignGroundElevationPumpWell: false,
      swpStopPumpWaterLevelInnerHeight: false,
      swpLiftWellHeight: false,

      divider9: false,
      divider91: false,
      amountOilyWastewater: false,
      workTime: false,
      settlingTankStopTime: false,
      settlingTankVolume: false,
      divider92: false,
      iaffDeviceSpecs: false,
      inletSubmersibleSewagePumpFlow: false,
      iaffTotalHeadLoss: false,
      js6: false,
      iaffWaterPipeElevation: false,
      iaffWaterInletPressure: false,
      iaffStopPumpWaterLevel: false,
      iaffExcessHead: false,
      spwInletPumpLift: false,
      sedimentationIAFFModel: false,

      divider100: false,
      liftSewageTreatmentCapacity: false,
      anaerobicFilter: false,
      constructedWetland: false,
      liftWaterPointModel: false,
    };
  } else if (e === 'ConstructedWetlands') {
    // 10
    ifShowObj = {
      divider10: false,
      sewageTreatmentCapacity: false,
      sbrDeviceWork: false,
      sbrDeviceType: false,
      sbrCycleWorkTime: false,
      sbrDeviceSpecs: false,
      sbrModel: false,

      divider20: false,
      divider21: false,
      sewageRegulatingWellVolume: false,
      sbrAdjustTime: false,
      adjustWellDiameter: false,
      adjustWellWaterDepth: false,
      adjustWellWaterPipeElevation: false,
      adjustWellStopPumpWaterLevel: false,
      divider22: false,
      adjustWellPumpFlow: false,
      sbrDeviceInletPipeElevation: false,
      adjustWellTotalHeadLoss: false,
      js1: false,
      sewageTreatmentOutflowHead: false,
      adjustWellPumpLift: false,
      adjustPumpModel: false,
      sbrDesignGroundElevationPumpWell: false,
      sbrStopPumpWaterLevelInnerHeight: false,
      adjustWellDepth: false,

      divider30: false,
      filterSpecs: false,
      filterSelection: false,

      divider60: false,
      mbrSewageTreatmentCapacity: false,
      mbrDeviceSpecs: false,
      mbrModel: false,

      divider70: false,
      divider71: false,
      adjustTime: false,
      mbrSewageRegulatingWellVolume: false,
      mbrAdjustWellDiameter: false,
      mbrAdjustWellWaterDepth: false,
      mbrAdjustWellWaterPipeElevation: false,
      mbrAdjustWellStopPumpWaterLevel: false,
      divider72: false,
      mbrAdjustWellPumpFlow: false,
      mbrDeviceInletPipeElevation: false,
      mbrTotalHeadLoss: false,
      js4: false,
      mbrDeviceOutflowHead: false,
      mbrPumpLift: false,
      adjustWellModel: false,
      mbrDesignGroundElevationPumpWell: false,
      mbrStopPumpWaterLevelInnerHeight: false,
      mbrLiftWellHeight: false,

      divider40: false,
      divider41: false,
      pumpingWellDiameter: false,
      sewageStopTime: false,
      pumpingWellVolume: false,
      pumpingWellWaterDepth: false,
      pumpingWellWaterPipeElevation: false,
      pumpingWellStopPumpWaterLevel: false,
      divider42: false,
      pumpingWellPumpFlow: false,
      filterWaterInletPressure: false,
      pumpingWellTotalHeadLoss: false,
      js2: false,
      filterWaterInletElevation: false,
      sewageExcessHead: false,
      pumpingWellPumpLift: false,
      pumpingWellModel: false,
      pwDesignGroundElevationPumpWell: false,
      pwStopPumpWaterLevelInnerHeight: false,
      pwLiftWellHeight: false,
      divider50: false,
      divider51: false,
      reuseWaterTankVolume: false,
      divider52: false,
      sprinklerFlowRate: false,
      makeGreenSprinklingWater: false,
      reusePumpFlow: false,
      makeGreenTotalHeadLoss: false,
      js3: false,
      sprinklerWorkPressure: false,
      dullSprinklerGroundLevel: false,
      reuseWaterTankStopPumpWaterLevel: false,
      reusePumpOutflowHead: false,
      reusePumpLift: false,
      divider53: false,
      ultravioletDisinfection: false,
      reuseWaterTankModel: false,

      divider80: false,
      divider81: false,
      pumpWellSize: false,
      pumpWellShape: false,
      pumpingWellSewageVolume: false,
      pumpWellWaterDepth: false,
      pumpWellWaterPipeElevation: false,
      pumpWellStopPumpWaterLevel: false,
      divider82: false,
      pumpingWellSewageMeasure: false,
      submersibleSewagePumpFlow: false,
      pumpWellTotalHeadLoss: false,
      js5: false,
      pumpWellDesignGround: false,
      liftingPipeHighestPoint: false,
      spwOutflowHead: false,
      spwPumpLift: false,
      spwPumpModel: false,
      swpDesignGroundElevationPumpWell: false,
      swpStopPumpWaterLevelInnerHeight: false,
      swpLiftWellHeight: false,

      divider9: false,
      divider91: false,
      amountOilyWastewater: false,
      workTime: false,
      settlingTankStopTime: false,
      settlingTankVolume: false,
      divider92: false,
      iaffDeviceSpecs: false,
      inletSubmersibleSewagePumpFlow: false,
      iaffTotalHeadLoss: false,
      js6: false,
      iaffWaterPipeElevation: false,
      iaffWaterInletPressure: false,
      iaffStopPumpWaterLevel: false,
      iaffExcessHead: false,
      spwInletPumpLift: false,
      sedimentationIAFFModel: false,

      divider100: true,
      liftSewageTreatmentCapacity: true,
      anaerobicFilter: true,
      constructedWetland: true,
      liftWaterPointModel: true,
    };
  } else if (e === 'AFF') {
    // 9
    ifShowObj = {
      divider10: false,
      sewageTreatmentCapacity: false,
      sbrDeviceWork: false,
      sbrDeviceType: false,
      sbrCycleWorkTime: false,
      sbrDeviceSpecs: false,
      sbrModel: false,

      divider20: false,
      divider21: false,
      sewageRegulatingWellVolume: false,
      sbrAdjustTime: false,
      adjustWellDiameter: false,
      adjustWellWaterDepth: false,
      adjustWellWaterPipeElevation: false,
      adjustWellStopPumpWaterLevel: false,
      divider22: false,
      adjustWellPumpFlow: false,
      sbrDeviceInletPipeElevation: false,
      adjustWellTotalHeadLoss: false,
      js1: false,
      sewageTreatmentOutflowHead: false,
      adjustWellPumpLift: false,
      adjustPumpModel: false,
      sbrDesignGroundElevationPumpWell: false,
      sbrStopPumpWaterLevelInnerHeight: false,
      adjustWellDepth: false,

      divider30: false,
      filterSpecs: false,
      filterSelection: false,

      divider60: false,
      mbrSewageTreatmentCapacity: false,
      mbrDeviceSpecs: false,
      mbrModel: false,

      divider70: false,
      divider71: false,
      adjustTime: false,
      mbrSewageRegulatingWellVolume: false,
      mbrAdjustWellDiameter: false,
      mbrAdjustWellWaterDepth: false,
      mbrAdjustWellWaterPipeElevation: false,
      mbrAdjustWellStopPumpWaterLevel: false,
      divider72: false,
      mbrAdjustWellPumpFlow: false,
      mbrDeviceInletPipeElevation: false,
      mbrTotalHeadLoss: false,
      js4: false,
      mbrDeviceOutflowHead: false,
      mbrPumpLift: false,
      adjustWellModel: false,
      mbrDesignGroundElevationPumpWell: false,
      mbrStopPumpWaterLevelInnerHeight: false,
      mbrLiftWellHeight: false,

      divider40: false,
      divider41: false,
      pumpingWellDiameter: false,
      sewageStopTime: false,
      pumpingWellVolume: false,
      pumpingWellWaterDepth: false,
      pumpingWellWaterPipeElevation: false,
      pumpingWellStopPumpWaterLevel: false,
      divider42: false,
      pumpingWellPumpFlow: false,
      filterWaterInletPressure: false,
      pumpingWellTotalHeadLoss: false,
      js2: false,
      filterWaterInletElevation: false,
      sewageExcessHead: false,
      pumpingWellPumpLift: false,
      pumpingWellModel: false,
      pwDesignGroundElevationPumpWell: false,
      pwStopPumpWaterLevelInnerHeight: false,
      pwLiftWellHeight: false,
      divider50: false,
      divider51: false,
      reuseWaterTankVolume: false,
      divider52: false,
      sprinklerFlowRate: false,
      makeGreenSprinklingWater: false,
      reusePumpFlow: false,
      makeGreenTotalHeadLoss: false,
      js3: false,
      sprinklerWorkPressure: false,
      dullSprinklerGroundLevel: false,
      reuseWaterTankStopPumpWaterLevel: false,
      reusePumpOutflowHead: false,
      reusePumpLift: false,
      divider53: false,
      ultravioletDisinfection: false,
      reuseWaterTankModel: false,

      divider80: false,
      divider81: false,
      pumpWellSize: false,
      pumpWellShape: false,
      pumpingWellSewageVolume: false,
      pumpWellWaterDepth: false,
      pumpWellWaterPipeElevation: false,
      pumpWellStopPumpWaterLevel: false,
      divider82: false,
      pumpingWellSewageMeasure: false,
      submersibleSewagePumpFlow: false,
      pumpWellTotalHeadLoss: false,
      js5: false,
      pumpWellDesignGround: false,
      liftingPipeHighestPoint: false,
      spwOutflowHead: false,
      spwPumpLift: false,
      spwPumpModel: false,
      swpDesignGroundElevationPumpWell: false,
      swpStopPumpWaterLevelInnerHeight: false,
      swpLiftWellHeight: false,

      divider9: true,
      divider91: true,
      amountOilyWastewater: true,
      workTime: true,
      settlingTankStopTime: true,
      settlingTankVolume: true,
      divider92: true,
      iaffDeviceSpecs: true,
      inletSubmersibleSewagePumpFlow: true,
      iaffTotalHeadLoss: true,
      js6: true,
      iaffWaterPipeElevation: true,
      iaffWaterInletPressure: true,
      iaffStopPumpWaterLevel: true,
      iaffExcessHead: true,
      spwInletPumpLift: true,
      sedimentationIAFFModel: true,

      divider100: false,
      liftSewageTreatmentCapacity: false,
      anaerobicFilter: false,
      constructedWetland: false,
      liftWaterPointModel: false,
    };
  } else if (e === 'ExtractionDirectDischarge') {
    // 8
    ifShowObj = {
      divider10: false,
      sewageTreatmentCapacity: false,
      sbrDeviceWork: false,
      sbrDeviceType: false,
      sbrCycleWorkTime: false,
      sbrDeviceSpecs: false,
      sbrModel: false,

      divider20: false,
      divider21: false,
      sewageRegulatingWellVolume: false,
      sbrAdjustTime: false,
      adjustWellDiameter: false,
      adjustWellWaterDepth: false,
      adjustWellWaterPipeElevation: false,
      adjustWellStopPumpWaterLevel: false,
      divider22: false,
      adjustWellPumpFlow: false,
      sbrDeviceInletPipeElevation: false,
      adjustWellTotalHeadLoss: false,
      js1: false,
      sewageTreatmentOutflowHead: false,
      adjustWellPumpLift: false,
      adjustPumpModel: false,
      sbrDesignGroundElevationPumpWell: false,
      sbrStopPumpWaterLevelInnerHeight: false,
      adjustWellDepth: false,

      divider30: false,
      filterSpecs: false,
      filterSelection: false,

      divider60: false,
      mbrSewageTreatmentCapacity: false,
      mbrDeviceSpecs: false,
      mbrModel: false,

      divider70: false,
      divider71: false,
      adjustTime: false,
      mbrSewageRegulatingWellVolume: false,
      mbrAdjustWellDiameter: false,
      mbrAdjustWellWaterDepth: false,
      mbrAdjustWellWaterPipeElevation: false,
      mbrAdjustWellStopPumpWaterLevel: false,
      divider72: false,
      mbrAdjustWellPumpFlow: false,
      mbrDeviceInletPipeElevation: false,
      mbrTotalHeadLoss: false,
      js4: false,
      mbrDeviceOutflowHead: false,
      mbrPumpLift: false,
      adjustWellModel: false,
      mbrDesignGroundElevationPumpWell: false,
      mbrStopPumpWaterLevelInnerHeight: false,
      mbrLiftWellHeight: false,

      divider40: false,
      divider41: false,
      pumpingWellDiameter: false,
      sewageStopTime: false,
      pumpingWellVolume: false,
      pumpingWellWaterDepth: false,
      pumpingWellWaterPipeElevation: false,
      pumpingWellStopPumpWaterLevel: false,
      divider42: false,
      pumpingWellPumpFlow: false,
      filterWaterInletPressure: false,
      pumpingWellTotalHeadLoss: false,
      js2: false,
      filterWaterInletElevation: false,
      sewageExcessHead: false,
      pumpingWellPumpLift: false,
      pumpingWellModel: false,
      pwDesignGroundElevationPumpWell: false,
      pwStopPumpWaterLevelInnerHeight: false,
      pwLiftWellHeight: false,
      divider50: false,
      divider51: false,
      reuseWaterTankVolume: false,
      divider52: false,
      sprinklerFlowRate: false,
      makeGreenSprinklingWater: false,
      reusePumpFlow: false,
      makeGreenTotalHeadLoss: false,
      js3: false,
      sprinklerWorkPressure: false,
      dullSprinklerGroundLevel: false,
      reuseWaterTankStopPumpWaterLevel: false,
      reusePumpOutflowHead: false,
      reusePumpLift: false,
      divider53: false,
      ultravioletDisinfection: false,
      reuseWaterTankModel: false,

      divider80: true,
      divider81: true,
      pumpWellSize: true,
      pumpWellShape: true,
      pumpingWellSewageVolume: true,
      pumpWellWaterDepth: true,
      pumpWellWaterPipeElevation: true,
      pumpWellStopPumpWaterLevel: true,
      divider82: true,
      pumpingWellSewageMeasure: true,
      submersibleSewagePumpFlow: true,
      pumpWellTotalHeadLoss: true,
      js5: true,
      pumpWellDesignGround: true,
      liftingPipeHighestPoint: true,
      spwOutflowHead: true,
      spwPumpLift: true,
      spwPumpModel: true,
      swpDesignGroundElevationPumpWell: true,
      swpStopPumpWaterLevelInnerHeight: true,
      swpLiftWellHeight: true,

      divider9: false,
      divider91: false,
      amountOilyWastewater: false,
      workTime: false,
      settlingTankStopTime: false,
      settlingTankVolume: false,
      divider92: false,
      iaffDeviceSpecs: false,
      inletSubmersibleSewagePumpFlow: false,
      iaffTotalHeadLoss: false,
      js6: false,
      iaffWaterPipeElevation: false,
      iaffWaterInletPressure: false,
      iaffStopPumpWaterLevel: false,
      iaffExcessHead: false,
      spwInletPumpLift: false,
      sedimentationIAFFModel: false,

      divider100: false,
      liftSewageTreatmentCapacity: false,
      anaerobicFilter: false,
      constructedWetland: false,
      liftWaterPointModel: false,
    };
  }
  updateSchema([
    {
      field: 'divider10',
      show: ifShowObj.divider10,
    },
    {
      field: 'sewageTreatmentCapacity',
      show: ifShowObj.sewageTreatmentCapacity,
      required: ifShowObj.sewageTreatmentCapacity,
    },
    {
      field: 'sbrDeviceWork',
      show: ifShowObj.sbrDeviceWork,
      required: ifShowObj.sbrDeviceWork,
    },
    {
      field: 'sbrDeviceType',
      show: ifShowObj.sbrDeviceType,
      required: ifShowObj.sbrDeviceType,
    },
    {
      field: 'sbrCycleWorkTime',
      show: ifShowObj.sbrCycleWorkTime,
      required: ifShowObj.sbrCycleWorkTime,
    },
    {
      field: 'sbrDeviceSpecs',
      show: ifShowObj.sbrDeviceSpecs,
    },
    {
      field: 'sbrModel',
      show: ifShowObj.sbrModel,
    },
    {
      field: 'divider20',
      show: ifShowObj.divider20,
    },
    {
      field: 'divider21',
      show: ifShowObj.divider21,
    },
    {
      field: 'sewageRegulatingWellVolume',
      show: ifShowObj.sewageRegulatingWellVolume,
    },
    {
      field: 'sbrAdjustTime',
      show: ifShowObj.sbrAdjustTime,
      required: ifShowObj.sbrAdjustTime,
    },
    {
      field: 'adjustWellDiameter',
      show: ifShowObj.adjustWellDiameter,
      required: ifShowObj.adjustWellDiameter,
    },
    {
      field: 'adjustWellWaterDepth',
      show: ifShowObj.adjustWellWaterDepth,
    },
    {
      field: 'adjustWellWaterPipeElevation',
      show: ifShowObj.adjustWellWaterPipeElevation,
      required: ifShowObj.adjustWellWaterPipeElevation,
    },
    {
      field: 'adjustWellStopPumpWaterLevel',
      show: ifShowObj.adjustWellStopPumpWaterLevel,
    },
    {
      field: 'divider22',
      show: ifShowObj.divider22,
    },
    {
      field: 'adjustWellPumpFlow',
      show: ifShowObj.adjustWellPumpFlow,
    },
    {
      field: 'sbrDeviceInletPipeElevation',
      show: ifShowObj.sbrDeviceInletPipeElevation,
      required: ifShowObj.sbrDeviceInletPipeElevation,
    },
    {
      field: 'adjustWellTotalHeadLoss',
      show: ifShowObj.adjustWellTotalHeadLoss,
      required: ifShowObj.adjustWellTotalHeadLoss,
    },
    {
      field: 'sbrDesignGroundElevationPumpWell',
      show: ifShowObj.sbrDesignGroundElevationPumpWell,
      required: ifShowObj.sbrDesignGroundElevationPumpWell,
    },
    {
      field: 'sbrStopPumpWaterLevelInnerHeight',
      show: ifShowObj.sbrStopPumpWaterLevelInnerHeight,
      required: ifShowObj.sbrStopPumpWaterLevelInnerHeight,
    },
    {
      field: 'adjustWellDepth',
      show: ifShowObj.adjustWellDepth,
    },
    {
      field: 'js1',
      show: ifShowObj.js1,
    },
    {
      field: 'sewageTreatmentOutflowHead',
      show: ifShowObj.sewageTreatmentOutflowHead,
      required: ifShowObj.sewageTreatmentOutflowHead,
    },
    {
      field: 'adjustWellPumpLift',
      show: ifShowObj.adjustWellPumpLift,
    },
    {
      field: 'adjustPumpModel',
      show: ifShowObj.adjustPumpModel,
    },
    {
      field: 'divider30',
      show: ifShowObj.divider30,
    },
    {
      field: 'filterSpecs',
      show: ifShowObj.filterSpecs,
    },
    {
      field: 'filterSelection',
      show: ifShowObj.filterSelection,
    },
    {
      field: 'divider60',
      show: ifShowObj.divider60,
    },
    {
      field: 'mbrSewageTreatmentCapacity',
      show: ifShowObj.mbrSewageTreatmentCapacity,
      required: ifShowObj.mbrSewageTreatmentCapacity,
    },
    {
      field: 'mbrDeviceSpecs',
      show: ifShowObj.mbrDeviceSpecs,
    },
    {
      field: 'mbrModel',
      show: ifShowObj.mbrModel,
    },
    {
      field: 'divider70',
      show: ifShowObj.divider70,
    },
    {
      field: 'divider71',
      show: ifShowObj.divider71,
    },
    {
      field: 'adjustTime',
      show: ifShowObj.adjustTime,
      required: ifShowObj.adjustTime,
    },
    {
      field: 'mbrSewageRegulatingWellVolume',
      show: ifShowObj.mbrSewageRegulatingWellVolume,
    },
    {
      field: 'mbrAdjustWellDiameter',
      show: ifShowObj.mbrAdjustWellDiameter,
      required: ifShowObj.mbrAdjustWellDiameter,
    },
    {
      field: 'mbrAdjustWellWaterDepth',
      show: ifShowObj.mbrAdjustWellWaterDepth,
    },
    {
      field: 'mbrAdjustWellWaterPipeElevation',
      show: ifShowObj.mbrAdjustWellWaterPipeElevation,
      required: ifShowObj.mbrAdjustWellWaterPipeElevation,
    },
    {
      field: 'mbrAdjustWellStopPumpWaterLevel',
      show: ifShowObj.mbrAdjustWellStopPumpWaterLevel,
    },
    {
      field: 'divider72',
      show: ifShowObj.divider72,
    },
    {
      field: 'mbrAdjustWellPumpFlow',
      show: ifShowObj.mbrAdjustWellPumpFlow,
    },
    {
      field: 'mbrDeviceInletPipeElevation',
      show: ifShowObj.mbrDeviceInletPipeElevation,
      required: ifShowObj.mbrDeviceInletPipeElevation,
    },
    {
      field: 'mbrTotalHeadLoss',
      show: ifShowObj.mbrTotalHeadLoss,
      required: ifShowObj.mbrTotalHeadLoss,
    },
    {
      field: 'js4',
      show: ifShowObj.js4,
    },
    {
      field: 'mbrDeviceOutflowHead',
      show: ifShowObj.mbrDeviceOutflowHead,
      required: ifShowObj.mbrDeviceOutflowHead,
    },
    {
      field: 'mbrPumpLift',
      show: ifShowObj.mbrPumpLift,
    },
    {
      field: 'adjustWellModel',
      show: ifShowObj.adjustWellModel,
    },
    {
      field: 'mbrDesignGroundElevationPumpWell',
      show: ifShowObj.mbrDesignGroundElevationPumpWell,
      required: ifShowObj.mbrDesignGroundElevationPumpWell,
    },
    {
      field: 'mbrStopPumpWaterLevelInnerHeight',
      show: ifShowObj.mbrStopPumpWaterLevelInnerHeight,
      required: ifShowObj.mbrStopPumpWaterLevelInnerHeight,
    },
    {
      field: 'mbrLiftWellHeight',
      show: ifShowObj.mbrLiftWellHeight,
    },
    {
      field: 'divider40',
      show: ifShowObj.divider40,
    },
    {
      field: 'divider41',
      show: ifShowObj.divider41,
    },
    {
      field: 'pumpingWellDiameter',
      show: ifShowObj.pumpingWellDiameter,
      required: ifShowObj.pumpingWellDiameter,
    },
    {
      field: 'sewageStopTime',
      show: ifShowObj.sewageStopTime,
      required: ifShowObj.sewageStopTime,
    },
    {
      field: 'pumpingWellVolume',
      show: ifShowObj.pumpingWellVolume,
    },
    {
      field: 'pumpingWellWaterDepth',
      show: ifShowObj.pumpingWellWaterDepth,
    },
    {
      field: 'pumpingWellWaterPipeElevation',
      show: ifShowObj.pumpingWellWaterPipeElevation,
      required: ifShowObj.pumpingWellWaterPipeElevation,
    },
    {
      field: 'pumpingWellStopPumpWaterLevel',
      show: ifShowObj.pumpingWellStopPumpWaterLevel,
    },
    {
      field: 'divider42',
      show: ifShowObj.divider42,
    },
    {
      field: 'pumpingWellPumpFlow',
      show: ifShowObj.pumpingWellPumpFlow,
    },
    {
      field: 'filterWaterInletPressure',
      show: ifShowObj.filterWaterInletPressure,
      required: ifShowObj.filterWaterInletPressure,
    },
    {
      field: 'pumpingWellTotalHeadLoss',
      show: ifShowObj.pumpingWellTotalHeadLoss,
      required: ifShowObj.pumpingWellTotalHeadLoss,
    },
    {
      field: 'js2',
      show: ifShowObj.js2,
    },
    {
      field: 'filterWaterInletElevation',
      show: ifShowObj.filterWaterInletElevation,
      required: ifShowObj.filterWaterInletElevation,
    },
    {
      field: 'sewageExcessHead',
      show: ifShowObj.sewageExcessHead,
      required: ifShowObj.sewageExcessHead,
    },
    {
      field: 'pumpingWellPumpLift',
      show: ifShowObj.pumpingWellPumpLift,
    },
    {
      field: 'pumpingWellModel',
      show: ifShowObj.pumpingWellModel,
    },
    {
      field: 'pwDesignGroundElevationPumpWell',
      show: ifShowObj.pwDesignGroundElevationPumpWell,
      required: ifShowObj.pwDesignGroundElevationPumpWell,
    },
    {
      field: 'pwStopPumpWaterLevelInnerHeight',
      show: ifShowObj.pwStopPumpWaterLevelInnerHeight,
      required: ifShowObj.pwStopPumpWaterLevelInnerHeight,
    },
    {
      field: 'pwLiftWellHeight',
      show: ifShowObj.pwLiftWellHeight,
    },
    {
      field: 'divider50',
      show: ifShowObj.divider50,
    },
    {
      field: 'divider51',
      show: ifShowObj.divider51,
    },
    {
      field: 'reuseWaterTankVolume',
      show: ifShowObj.reuseWaterTankVolume,
    },
    {
      field: 'divider52',
      show: ifShowObj.divider52,
    },
    {
      field: 'sprinklerFlowRate',
      show: ifShowObj.sprinklerFlowRate,
      required: ifShowObj.sprinklerFlowRate,
    },
    {
      field: 'makeGreenSprinklingWater',
      show: ifShowObj.makeGreenSprinklingWater,
      required: ifShowObj.makeGreenSprinklingWater,
    },
    {
      field: 'reusePumpFlow',
      show: ifShowObj.reusePumpFlow,
    },
    {
      field: 'makeGreenTotalHeadLoss',
      show: ifShowObj.makeGreenTotalHeadLoss,
      required: ifShowObj.makeGreenTotalHeadLoss,
    },
    {
      field: 'js3',
      show: ifShowObj.js3,
    },
    {
      field: 'sprinklerWorkPressure',
      show: ifShowObj.sprinklerWorkPressure,
      required: ifShowObj.sprinklerWorkPressure,
    },
    {
      field: 'dullSprinklerGroundLevel',
      show: ifShowObj.dullSprinklerGroundLevel,
      required: ifShowObj.dullSprinklerGroundLevel,
    },
    {
      field: 'reuseWaterTankStopPumpWaterLevel',
      show: ifShowObj.reuseWaterTankStopPumpWaterLevel,
      required: ifShowObj.reuseWaterTankStopPumpWaterLevel,
    },
    {
      field: 'reusePumpOutflowHead',
      show: ifShowObj.reusePumpOutflowHead,
      required: ifShowObj.reusePumpOutflowHead,
    },
    {
      field: 'reusePumpLift',
      show: ifShowObj.reusePumpLift,
    },
    {
      field: 'divider53',
      show: ifShowObj.divider53,
    },
    {
      field: 'ultravioletDisinfection',
      show: ifShowObj.ultravioletDisinfection,
    },
    {
      field: 'reuseWaterTankModel',
      show: ifShowObj.reuseWaterTankModel,
    },
    {
      field: 'divider80',
      show: ifShowObj.divider80,
    },
    {
      field: 'divider81',
      show: ifShowObj.divider81,
    },
    {
      field: 'pumpWellSize',
      show: ifShowObj.pumpWellSize,
      required: ifShowObj.pumpWellSize,
    },
    {
      field: 'pumpWellShape',
      show: ifShowObj.pumpWellShape,
      required: ifShowObj.pumpWellShape,
    },
    {
      field: 'pumpingWellSewageVolume',
      show: ifShowObj.pumpingWellSewageVolume,
    },
    {
      field: 'pumpWellWaterDepth',
      show: ifShowObj.pumpWellWaterDepth,
    },
    {
      field: 'pumpWellWaterPipeElevation',
      show: ifShowObj.pumpWellWaterPipeElevation,
      required: ifShowObj.pumpWellWaterPipeElevation,
    },
    {
      field: 'pumpWellStopPumpWaterLevel',
      show: ifShowObj.pumpWellStopPumpWaterLevel,
    },
    {
      field: 'divider82',
      show: ifShowObj.divider82,
    },
    {
      field: 'pumpingWellSewageMeasure',
      show: ifShowObj.pumpingWellSewageMeasure,
      required: ifShowObj.pumpingWellSewageMeasure,
    },
    {
      field: 'submersibleSewagePumpFlow',
      show: ifShowObj.submersibleSewagePumpFlow,
    },
    {
      field: 'pumpWellTotalHeadLoss',
      show: ifShowObj.pumpWellTotalHeadLoss,
      required: ifShowObj.pumpWellTotalHeadLoss,
    },
    {
      field: 'swpDesignGroundElevationPumpWell',
      show: ifShowObj.swpDesignGroundElevationPumpWell,
      required: ifShowObj.swpDesignGroundElevationPumpWell,
    },
    {
      field: 'swpStopPumpWaterLevelInnerHeight',
      show: ifShowObj.swpStopPumpWaterLevelInnerHeight,
      required: ifShowObj.swpStopPumpWaterLevelInnerHeight,
    },
    {
      field: 'swpLiftWellHeight',
      show: ifShowObj.swpLiftWellHeight,
    },
    {
      field: 'js5',
      show: ifShowObj.js5,
    },
    {
      field: 'liftingPipeHighestPoint',
      show: ifShowObj.liftingPipeHighestPoint,
      required: ifShowObj.liftingPipeHighestPoint,
    },
    {
      field: 'spwOutflowHead',
      show: ifShowObj.spwOutflowHead,
      required: ifShowObj.spwOutflowHead,
    },
    {
      field: 'spwPumpLift',
      show: ifShowObj.spwPumpLift,
    },
    {
      field: 'spwPumpModel',
      show: ifShowObj.spwPumpModel,
    },
    {
      field: 'divider9',
      show: ifShowObj.divider9,
    },
    {
      field: 'divider9',
      show: ifShowObj.divider9,
    },
    {
      field: 'divider91',
      show: ifShowObj.divider91,
    },
    {
      field: 'amountOilyWastewater',
      show: ifShowObj.amountOilyWastewater,
      required: ifShowObj.amountOilyWastewater,
    },
    {
      field: 'workTime',
      show: ifShowObj.workTime,
      required: ifShowObj.workTime,
    },
    {
      field: 'settlingTankStopTime',
      show: ifShowObj.settlingTankStopTime,
      required: ifShowObj.settlingTankStopTime,
    },
    {
      field: 'settlingTankVolume',
      show: ifShowObj.settlingTankVolume,
    },
    {
      field: 'divider92',
      show: ifShowObj.divider92,
    },
    {
      field: 'iaffDeviceSpecs',
      show: ifShowObj.iaffDeviceSpecs,
    },
    {
      field: 'inletSubmersibleSewagePumpFlow',
      show: ifShowObj.inletSubmersibleSewagePumpFlow,
    },
    {
      field: 'iaffTotalHeadLoss',
      show: ifShowObj.iaffTotalHeadLoss,
      required: ifShowObj.iaffTotalHeadLoss,
    },
    {
      field: 'js6',
      show: ifShowObj.js6,
    },
    {
      field: 'iaffStopPumpWaterLevel',
      show: ifShowObj.iaffStopPumpWaterLevel,
      required: ifShowObj.iaffStopPumpWaterLevel,
    },
    {
      field: 'iaffExcessHead',
      show: ifShowObj.iaffExcessHead,
      required: ifShowObj.iaffExcessHead,
    },
    {
      field: 'spwInletPumpLift',
      show: ifShowObj.spwInletPumpLift,
    },
    {
      field: 'sedimentationIAFFModel',
      show: ifShowObj.sedimentationIAFFModel,
    },
    {
      field: 'iaffWaterInletPressure',
      show: ifShowObj.iaffWaterInletPressure,
      required: ifShowObj.iaffWaterInletPressure,
    },
    {
      field: 'iaffWaterPipeElevation',
      show: ifShowObj.iaffWaterPipeElevation,
      required: ifShowObj.iaffWaterPipeElevation,
    },
    {
      field: 'divider100',
      show: ifShowObj.divider100,
    },
    {
      field: 'liftSewageTreatmentCapacity',
      show: ifShowObj.liftSewageTreatmentCapacity,
      required: ifShowObj.liftSewageTreatmentCapacity,
    },
    {
      field: 'liftSewageTreatmentCapacity',
      show: ifShowObj.liftSewageTreatmentCapacity,
      required: ifShowObj.liftSewageTreatmentCapacity,
    },
    {
      field: 'anaerobicFilter',
      show: ifShowObj.anaerobicFilter,
    },
    {
      field: 'constructedWetland',
      show: ifShowObj.constructedWetland,
    },
    {
      field: 'liftWaterPointModel',
      show: ifShowObj.liftWaterPointModel,
    },
  ]);
};
