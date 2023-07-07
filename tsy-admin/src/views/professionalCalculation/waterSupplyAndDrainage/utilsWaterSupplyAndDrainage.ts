import { keepTwoDecimalFull } from '/@/utils/calculation/count';
import { cloneDeep } from 'lodash-es';
import { waterSourceStore } from '/@/store/modules/waterInfo';
import { useRouter } from 'vue-router';
import { annotationContent, calculationFormulaPrompt } from './calculationFormulaPrompt';
const store = waterSourceStore();

function judgmentType(value) {
  return Object.prototype.toString.call(value).slice(8, -1).toLocaleLowerCase();
}
function processingNumberUndefined(num) {
  if (judgmentType(num) === 'undefined') {
    return Number(!!num);
  }
  return Number(num);
}
function displayEmpty(num) {
  if (!num) {
    return undefined;
  } else {
    return processingNumberUndefined(num);
  }
}
function displayEmptyCalculate(unitWater, num) {
  if (!num) {
    return undefined;
  } else {
    return keepTwoDecimalFull(
      processingNumberUndefined(unitWater) * processingNumberUndefined(num),
      2,
    );
  }
}
function displayEmptyDigit(num, digit) {
  if (!num) {
    return undefined;
  } else {
    return keepTwoDecimalFull(processingNumberUndefined(num), digit);
  }
}
//用水数据初始化
export const waterDataInitialization = (res, key) => {
  const { stationType } = res;
  res.annotationContent = annotationContent(stationType);
  res[key].forEach((item) => {
    item.type = key;
    item.stationType = stationType;
    //数字转化
    item.unitWater = processingNumberUndefined(item.unitWater);
    item.unitWaterMin = processingNumberUndefined(item.unitWaterMin);
    item.unitWaterMan = processingNumberUndefined(item.unitWaterMan);
    // 当数量为零的时候，不显示值
    item.recentQuantity = displayEmpty(item.recentQuantity);
    item.forwardQuantity = displayEmpty(item.forwardQuantity);
    item.calculationFormulaDisplay = calculationFormulaPrompt(res.stationType, item);
    item.recentConsumption = displayEmptyCalculate(item.unitWater, item.recentQuantity);
    item.forwardConsumption = displayEmptyCalculate(item.unitWater, item.forwardQuantity);

    if (!!item.unitWaterMan) {
      item.recommendedUnitWater = item.unitWaterMin + '~' + item.unitWaterMan;
    } else {
      item.recommendedUnitWater = item.unitWaterMin;
      item.unitWaterMan = item.unitWaterMin;
    }
  });
};
//基础数据计算
export const basicWaterUse = (res, key) => {
  const recentSum = res[key]?.reduce((pre, item) => {
    return (pre = pre + processingNumberUndefined(item.recentConsumption));
  }, 0);
  const forwardSum = res[key]?.reduce((pre, item) => {
    return (pre = pre + processingNumberUndefined(item.forwardConsumption));
  }, 0);
  res[key + '_recent'] = displayEmptyDigit(recentSum, 1);
  res[key + '_forward'] = displayEmptyDigit(forwardSum, 1);
};
//service pipe network
function sumArr(arr) {
  return arr.reduce(function (total, value) {
    return total + value;
  }, 0);
}
// 服务和管道
// 'serviceDtoList', 'pipeNetworkDtoList';
export const serviceDtoList = (res, key) => {
  if (res['serviceDtoList'] && res['serviceDtoList'].length > 0) {
    const recent = [
      processingNumberUndefined(res['passengerTransportationDtoList' + '_recent']),
      processingNumberUndefined(res['produceDtoList' + '_recent']),
      processingNumberUndefined(res['lifeDtoList' + '_recent']),
      processingNumberUndefined(res['makeGreenSprinklingDtoList' + '_recent']),
    ];
    const forward = [
      processingNumberUndefined(res['passengerTransportationDtoList' + '_forward']),
      processingNumberUndefined(res['produceDtoList' + '_forward']),
      processingNumberUndefined(res['lifeDtoList' + '_forward']),
      processingNumberUndefined(res['makeGreenSprinklingDtoList' + '_forward']),
    ];
    res[key + '_recent'] = displayEmptyDigit(
      displayEmptyDigit(res[key][0]['unitWater'] * sumArr(recent), 2),
      1,
    );
    res[key + '_forward'] = displayEmptyDigit(
      displayEmptyDigit(res[key][0]['unitWater'] * sumArr(forward), 2),
      1,
    );
    res[key][0]['recentConsumption'] = displayEmptyDigit(
      res[key][0]['unitWater'] * sumArr(recent),
      2,
    );
    res[key][0]['forwardConsumption'] = displayEmptyDigit(
      res[key][0]['unitWater'] * sumArr(forward),
      2,
    );
  }
};
export const pipeNetworkDtoList = (res, key) => {
  if (res['pipeNetworkDtoList'] && res['pipeNetworkDtoList'].length > 0) {
    const recent = [
      processingNumberUndefined(res['passengerTransportationDtoList' + '_recent']),
      processingNumberUndefined(res['produceDtoList' + '_recent']),
      processingNumberUndefined(res['lifeDtoList' + '_recent']),
      processingNumberUndefined(res['makeGreenSprinklingDtoList' + '_recent']),
    ];
    const forward = [
      processingNumberUndefined(res['passengerTransportationDtoList' + '_forward']),
      processingNumberUndefined(res['produceDtoList' + '_forward']),
      processingNumberUndefined(res['lifeDtoList' + '_forward']),
      processingNumberUndefined(res['makeGreenSprinklingDtoList' + '_forward']),
    ];
    res[key + '_recent'] = displayEmptyDigit(
      displayEmptyDigit(res[key][0]['unitWater'] * sumArr(recent), 2),
      1,
    );
    res[key + '_forward'] = displayEmptyDigit(
      displayEmptyDigit(res[key][0]['unitWater'] * sumArr(forward), 2),
      1,
    );
    res[key][0]['recentConsumption'] = displayEmptyDigit(
      res[key][0]['unitWater'] * sumArr(recent),
      2,
    );
    res[key][0]['forwardConsumption'] = displayEmptyDigit(
      res[key][0]['unitWater'] * sumArr(forward),
      2,
    );
  }
};
//基建未预见
export const unforeseenInfrastructure = (res, key) => {
  if (res['capitalConstructionDtoList'] && res['capitalConstructionDtoList'].length > 0) {
    const recent = [
      processingNumberUndefined(res['passengerTransportationDtoList' + '_recent']),
      processingNumberUndefined(res['produceDtoList' + '_recent']),
      processingNumberUndefined(res['lifeDtoList' + '_recent']),
      processingNumberUndefined(res['makeGreenSprinklingDtoList' + '_recent']),
      processingNumberUndefined(res['pipeNetworkDtoList' + '_recent']),
    ];
    const forward = [
      processingNumberUndefined(res['passengerTransportationDtoList' + '_forward']),
      processingNumberUndefined(res['produceDtoList' + '_forward']),
      processingNumberUndefined(res['lifeDtoList' + '_forward']),
      processingNumberUndefined(res['makeGreenSprinklingDtoList' + '_forward']),
      processingNumberUndefined(res['pipeNetworkDtoList' + '_forward']),
    ];
    res[key + '_recent'] = displayEmptyDigit(
      displayEmptyDigit(res[key][0]['unitWater'] * sumArr(recent), 2),
      1,
    );
    res[key + '_forward'] = displayEmptyDigit(
      displayEmptyDigit(res[key][0]['unitWater'] * sumArr(forward), 2),
      1,
    );
    res[key][0]['recentConsumption'] = displayEmptyDigit(
      res[key][0]['unitWater'] * sumArr(recent),
      2,
    );
    res[key][0]['forwardConsumption'] = displayEmptyDigit(
      res[key][0]['unitWater'] * sumArr(forward),
      2,
    );
  }
};
//昼夜最大用水量
export const makeMaxWaterDtoListFun = (res, key) => {
  const recent = [
    processingNumberUndefined(res['passengerTransportationDtoList' + '_recent']),
    processingNumberUndefined(res['produceDtoList' + '_recent']),
    processingNumberUndefined(res['lifeDtoList' + '_recent']),
    processingNumberUndefined(res['makeGreenSprinklingDtoList' + '_recent']),
    processingNumberUndefined(res['serviceDtoList' + '_recent']),
    processingNumberUndefined(res['pipeNetworkDtoList' + '_recent']),
    processingNumberUndefined(res['capitalConstructionDtoList' + '_recent']),
  ];
  const forward = [
    processingNumberUndefined(res['passengerTransportationDtoList' + '_forward']),
    processingNumberUndefined(res['produceDtoList' + '_forward']),
    processingNumberUndefined(res['lifeDtoList' + '_forward']),
    processingNumberUndefined(res['makeGreenSprinklingDtoList' + '_forward']),
    processingNumberUndefined(res['serviceDtoList' + '_forward']),
    processingNumberUndefined(res['pipeNetworkDtoList' + '_forward']),
    processingNumberUndefined(res['capitalConstructionDtoList' + '_forward']),
  ];

  res[key + '_recent'] = displayEmptyDigit(sumArr(recent), 1);
  res[key + '_forward'] = displayEmptyDigit(sumArr(forward), 1);
};
//管网漏失及基建、未预见水量
// export const pipeAndCapitalConstructionDtoListFun = (res, key) => {
//   const recent = [
//     processingNumberUndefined(res['produceDtoList' + '_recent']),
//     processingNumberUndefined(res['lifeDtoList' + '_recent']),
//     processingNumberUndefined(res['makeGreenSprinklingDtoList' + '_recent']),
//   ];
//   const forward = [
//     processingNumberUndefined(res['produceDtoList' + '_forward']),
//     processingNumberUndefined(res['lifeDtoList' + '_forward']),
//     processingNumberUndefined(res['makeGreenSprinklingDtoList' + '_forward']),
//   ];
//   res[key + '_recent'] = displayEmptyDigit(sumArr(recent) * 0.15, 1);
//   res[key + '_forward'] = displayEmptyDigit(sumArr(forward) * 0.15, 1);
//   // res[key][0]['recentConsumption'] = displayEmptyDigit(displayEmptyDigit(res[key][0]['unitWater'] * sumArr(recent), 2),1);
//   // res[key][0]['forwardConsumption'] = displayEmptyDigit(displayEmptyDigit(res[key][0]['unitWater'] * sumArr(forward), 2),1);
// };

//生产生活排水量
export const designSewageVolumeNewDtoListFun = (res, key) => {
  if (res['designSewageVolumeNewDtoList'] && res['designSewageVolumeNewDtoList'].length > 0) {
    const recent = [
      processingNumberUndefined(res['produceDtoList' + '_recent']),
      processingNumberUndefined(res['lifeDtoList' + '_recent']),
      processingNumberUndefined(res['serviceDtoList' + '_recent']),
    ];
    const forward = [
      processingNumberUndefined(res['lifeDtoList' + '_forward']),
      processingNumberUndefined(res['makeGreenSprinklingDtoList' + '_forward']),
      processingNumberUndefined(res['serviceDtoList' + '_forward']),
    ];
    res[key + '_recent'] = displayEmptyDigit(
      displayEmptyDigit(res[key][0]['unitWater'] * sumArr(recent), 2),
      1,
    );
    res[key + '_forward'] = displayEmptyDigit(
      displayEmptyDigit(res[key][0]['unitWater'] * sumArr(forward), 2),
      1,
    );
    res[key][0]['recentConsumption'] = displayEmptyDigit(
      res[key][0]['unitWater'] * sumArr(recent),
      2,
    );
    res[key][0]['forwardConsumption'] = displayEmptyDigit(
      res[key][0]['unitWater'] * sumArr(forward),
      2,
    );
  }
};
//昼夜最大排水量
export const makeMaxDrainageDtoListFun = (res, key) => {
  debugger;
  const { stationType } = res;
  if (['07', '06', '01', '09'].includes(stationType)) {
    const recent = [
      processingNumberUndefined(res['passengerTrainsFecalSewageDtoList' + '_recent']),
      processingNumberUndefined(res['designSewageVolumeNewDtoList' + '_recent']),
    ];
    const forward = [
      processingNumberUndefined(res['passengerTrainsFecalSewageDtoList' + '_forward']),
      processingNumberUndefined(res['designSewageVolumeNewDtoList' + '_forward']),
    ];
    res[key + '_recent'] = displayEmptyDigit(sumArr(recent), 1);
    res[key + '_forward'] = displayEmptyDigit(sumArr(forward), 1);
  } else if (['05', '03', '02'].includes(stationType)) {
    const recent = [
      processingNumberUndefined(res['produceDtoList' + '_recent']),
      processingNumberUndefined(res['lifeDtoList' + '_recent']),
      processingNumberUndefined(res['serviceDtoList' + '_recent']),
    ];
    const forward = [
      processingNumberUndefined(res['lifeDtoList' + '_forward']),
      processingNumberUndefined(res['makeGreenSprinklingDtoList' + '_forward']),
      processingNumberUndefined(res['serviceDtoList' + '_forward']),
    ];

    res[key + '_recent'] = displayEmptyDigit(
      displayEmptyDigit(res[key][0]['unitWater'] * sumArr(recent), 2),
      1,
    );
    res[key + '_forward'] = displayEmptyDigit(
      displayEmptyDigit(res[key][0]['unitWater'] * sumArr(forward), 2),
      1,
    );
    res[key][0]['recentConsumption'] = displayEmptyDigit(
      res[key][0]['unitWater'] * sumArr(recent),
      2,
    );
    res[key][0]['forwardConsumption'] = displayEmptyDigit(
      res[key][0]['unitWater'] * sumArr(forward),
      2,
    );
  }
};

//初始化用水量
export const processingStationDetails = (res) => {
  store.originalStationTemplateAction(cloneDeep(res));
  try {
    for (const key in res) {
      if (judgmentType(res[key]) === 'array') {
        waterDataInitialization(res, key);
        if (
          [
            'passengerTransportationDtoList',
            'produceDtoList',
            'lifeDtoList',
            'makeGreenSprinklingDtoList',
            'passengerTrainsFecalSewageDtoList',
          ].includes(key)
        ) {
          basicWaterUse(res, key);
        }
        if (['serviceDtoList'].includes(key)) {
          serviceDtoList(res, key);
        }
        if (['pipeNetworkDtoList'].includes(key)) {
          pipeNetworkDtoList(res, key);
        }
        if (['capitalConstructionDtoList'].includes(key)) {
          unforeseenInfrastructure(res, key);
        }
        if (['makeMaxWaterDtoList'].includes(key)) {
          makeMaxWaterDtoListFun(res, key);
        }
        // if (['pipeAndCapitalConstructionDtoList'].includes(key)) {
        //   pipeAndCapitalConstructionDtoListFun(res, key);
        // }
        if (['designSewageVolumeNewDtoList'].includes(key)) {
          designSewageVolumeNewDtoListFun(res, key);
        }
        if (['makeMaxDrainageDtoList'].includes(key)) {
          makeMaxDrainageDtoListFun(res, key);
        }
      }
    }
  } catch (e) {
    store.waterSupplyAndDrainageDetailsLoadingAction(false);
  }
  return res;
};
function getTraverPersionValue(formModel): number {
  const { stationType, waterProject } = formModel;
  let num = 1;
  // formModel.recentQuantity = 10; 用于测试数量
  //计算公式来自于模板 后端计算
  if (formModel.type === 'passengerTrainsFecalSewageDtoList_back_calulation') {
    if (['01'].includes(stationType) && waterProject.indexOf('通过') > -1) {
      num = 0.55 * 16 * 4;
      return num;
    } else if (['01'].includes(stationType) && waterProject.indexOf('始发') > -1) {
      num = 0.55 * 16 * 2;
      return num;
    } else if (['06'].includes(stationType) && waterProject.indexOf('旅客列车卸污量') > -1) {
      num = 0.6 * 16;
      return num;
    } else if (['06'].includes(stationType) && waterProject.indexOf('污物箱') > -1) {
      return num;
    } else if (['07'].includes(stationType) && waterProject.indexOf('通过') > -1) {
      num = 0.6 * 16 * 2;
      return num;
    } else if (['07'].includes(stationType) && waterProject.indexOf('始发') > -1) {
      num = 0.6 * 16;
      return num;
    } else {
      return num;
    }
  } else {
    return num;
  }
}
//联动数据变化 Linkage
// 必须要添加id，否则多套数据，就会发生紊乱
//    const { stationType } = res;
// const fixedCoefficient = 1;
export function basicWaterUseLinkage(formModel, allFormList) {
  const unitWater = formModel.unitWater;
  if (!!unitWater || unitWater === 0) {
    const fixedCoefficient = getTraverPersionValue(formModel);
    formModel.recentConsumption = displayEmptyDigit(
      formModel.recentQuantity * fixedCoefficient * unitWater,
      2,
    );
    formModel.forwardConsumption = displayEmptyDigit(
      formModel.forwardQuantity * fixedCoefficient * unitWater,
      2,
    );
    getRencetSum(formModel.type, formModel.stationID, allFormList);
    getForwardSum(formModel.type, formModel.stationID, allFormList);
  }
}

export function getRencetSum(type, stationID, allFormList) {
  const recentSum = allFormList[stationID][type]?.reduce((pre, item) => {
    return (pre = pre + processingNumberUndefined(item.recentConsumption));
  }, 0);
  allFormList[stationID][type + '_recent'] = displayEmptyDigit(recentSum, 1);
}
export function getForwardSum(type, stationID, allFormList) {
  const forwardSum = allFormList[stationID][type]?.reduce((pre, item) => {
    return (pre = pre + processingNumberUndefined(item.forwardConsumption));
  }, 0);

  allFormList[stationID][type + '_forward'] = displayEmptyDigit(forwardSum, 1);
}
// 联动计算
export const subtotalOfWaterConsumption = (formModel, allFormList) => {
  const res = allFormList[formModel.stationID];
  const key = formModel.type;
  if (judgmentType(res[key]) === 'array') {
    if (
      [
        'passengerTransportationDtoList',
        'produceDtoList',
        'lifeDtoList',
        'makeGreenSprinklingDtoList',
        'passengerTrainsFecalSewageDtoList',
      ].includes(key)
    ) {
      basicWaterUseLinkage(formModel, allFormList);
    }
    serviceDtoList(res, 'serviceDtoList');
    pipeNetworkDtoList(res, 'pipeNetworkDtoList');
    unforeseenInfrastructure(res, 'capitalConstructionDtoList');
    makeMaxWaterDtoListFun(res, 'makeMaxWaterDtoList');
    // pipeAndCapitalConstructionDtoListFun(res, 'pipeAndCapitalConstructionDtoList');
    designSewageVolumeNewDtoListFun(res, 'designSewageVolumeNewDtoList');
    makeMaxDrainageDtoListFun(res, 'makeMaxDrainageDtoList');
  }
};

function getTotalDate(res, raw): any[] {
  raw['makeMaxWaterDtoList'][0].recentConsumption = res['makeMaxWaterDtoList_recent'];
  raw['makeMaxWaterDtoList'][0].forwardConsumption = res['makeMaxWaterDtoList_forward'];
  raw['makeMaxDrainageDtoList'][0].recentConsumption = res['makeMaxDrainageDtoList_recent'];
  raw['makeMaxDrainageDtoList'][0].forwardConsumption = res['makeMaxDrainageDtoList_forward'];
  //管网漏失及基建未预见
  // if (
  //   raw['pipeAndCapitalConstructionDtoList'] &&
  //   raw['pipeAndCapitalConstructionDtoList'].length > 0
  // ) {
  //   raw['pipeAndCapitalConstructionDtoList'][0].recentConsumption =
  //     res['pipeAndCapitalConstructionDtoList_recent'];
  //   raw['pipeAndCapitalConstructionDtoList'][0].forwardConsumption =
  //     res['pipeAndCapitalConstructionDtoList_forward'];
  //   return [
  //     raw['makeMaxWaterDtoList'][0],
  //     raw['makeMaxDrainageDtoList'][0],
  //     raw['pipeAndCapitalConstructionDtoList'][0],
  //   ];
  // }

  return [raw['makeMaxWaterDtoList'][0], raw['makeMaxDrainageDtoList'][0]];
}

//保存数据
export function dealSaveData(record) {
  const raw = store.originalStationTemplateGetter;
  const res = cloneDeep(record);

  let waterComputeDtos = [];
  const result = {};
  for (const key in res) {
    if (judgmentType(res[key]) === 'array') {
      waterComputeDtos = waterComputeDtos.concat(res[key]);
    }
    if (key === 'projectID' || key === 'stationID' || key === 'computeID') {
      result[key] = res[key];
    }
  }
  waterComputeDtos.forEach((item) => {
    //如果传递给后端的是undefined null 会被自动过滤
    delete item['recommendedUnitWater'];
    delete item['type'];
    delete item['stationType'];
    delete item['calculationFormulaDisplay'];
  });
  let unitWater = 0;
  waterComputeDtos = waterComputeDtos.filter((item) => {
    if (item.classification === 'MakeMaxDrainage') {
      unitWater = item.unitWater;
    }
    return item.classification !== 'MakeMaxDrainage';
  });
  const totalArray = getTotalDate(res, raw);
  waterComputeDtos = waterComputeDtos.concat(totalArray);
  waterComputeDtos.forEach((item) => {
    if (item.classification === 'MakeMaxDrainage') {
      item.unitWater = unitWater;
    }
  });
  result['waterComputeDtos'] = waterComputeDtos;
  return result;
}

export function getForwardAll(formModel) {
  return formModel;
}

export function getRouterQuery() {
  const router = useRouter();
  return router.currentRoute.value.query;
}
