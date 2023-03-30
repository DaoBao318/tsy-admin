import { keepTwoDecimalFull } from '/@/utils/calculation/count';

function judgmentType(value) {
  return Object.prototype.toString.call(value).slice(8, -1).toLocaleLowerCase();
}
function processingNumberUndefined(num) {
  if (judgmentType(num) === 'undefined') {
    return Number(!!num);
  }
  return Number(num);
}
//用水数据初始化
export const waterDataInitialization = (res, key) => {
  res[key].forEach((item) => {
    item.type = key;
    //数字转化
    item.unitWater = processingNumberUndefined(item.unitWater);
    item.unitWaterMin = processingNumberUndefined(item.unitWaterMin);
    item.unitWaterMan = processingNumberUndefined(item.unitWaterMan);
    item.recentQuantity = processingNumberUndefined(item.recentQuantity);
    item.forwardQuantity = processingNumberUndefined(item.forwardQuantity);
    item.recentConsumption = keepTwoDecimalFull(
      processingNumberUndefined(item.unitWater) * processingNumberUndefined(item.recentQuantity),
      3,
    );
    item.forwardConsumption = keepTwoDecimalFull(
      processingNumberUndefined(item.unitWater) * processingNumberUndefined(item.forwardQuantity),
      3,
    );

    if (!!item.unitWaterMan) {
      item.recommendedUnitWater = item.unitWaterMin + '~' + item.unitWaterMan;
    } else {
      item.recommendedUnitWater = item.unitWaterMin;
    }
  });
};
//基础数据计算
export const basicWaterUse = (res, key) => {
  const recentSum = res[key]?.reduce((pre, item) => {
    return (pre = pre + item.recentConsumption);
  }, 0);
  const forwardSum = res[key]?.reduce((pre, item) => {
    return (pre = pre + item.forwardConsumption);
  }, 0);
  res[key + '_recent'] = keepTwoDecimalFull(recentSum, 3);
  res[key + '_forward'] = keepTwoDecimalFull(forwardSum, 3);
};
//service pipe network
function sumArr(arr) {
  return arr.reduce(function (total, value) {
    return total + value;
  }, 0);
}
// 服务和管道
export const servicePipeNetwork = (res, key) => {
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
  debugger;
  res[key + '_recent'] = keepTwoDecimalFull(res[key][0]['unitWater'] * sumArr(recent), 3);
  res[key + '_forward'] = keepTwoDecimalFull(res[key][0]['unitWater'] * sumArr(forward), 3);
};
//基建未预见
export const unforeseenInfrastructure = (res, key) => {
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
  res[key + '_recent'] = keepTwoDecimalFull(res[key][0]['unitWater'] * sumArr(recent), 3);
  res[key + '_forward'] = keepTwoDecimalFull(res[key][0]['unitWater'] * sumArr(forward), 3);
};
//昼夜最大用水量
export const makeMaxWaterDtoList = (res, key) => {
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
  res[key + '_recent'] = keepTwoDecimalFull(sumArr(recent), 3);
  res[key + '_forward'] = keepTwoDecimalFull(sumArr(forward), 3);
};
export const processingStationDetails3 = (res) => {};

//初始化用水量
export const processingStationDetails = (res) => {
  for (const key in res) {
    if (judgmentType(res[key]) === 'array') {
      waterDataInitialization(res, key);
      if (
        [
          'passengerTransportationDtoList',
          'produceDtoList',
          'lifeDtoList',
          'makeGreenSprinklingDtoList',
        ].includes(key)
      ) {
        basicWaterUse(res, key);
      }
      if (['serviceDtoList', 'pipeNetworkDtoList'].includes(key)) {
        servicePipeNetwork(res, key);
      }
      if (['capitalConstructionDtoList'].includes(key)) {
        unforeseenInfrastructure(res, key);
      }
      if (['makeMaxWaterDtoList'].includes(key)) {
        makeMaxWaterDtoList(res, key);
      }
    }
  }
  return res;
};

//联动数据变化 Linkage
// 必须要添加id，否则多套数据，就会发生紊乱
export function basicWaterUseLinkage(formModel, allFormList) {
  const unitWater = formModel.unitWater;
  if (!!unitWater || unitWater === 0) {
    formModel.recentConsumption = keepTwoDecimalFull(formModel.recentQuantity * unitWater, 3);
    formModel.forwardConsumption = keepTwoDecimalFull(formModel.forwardQuantity * unitWater, 3);
    getRencetSum(formModel.type, formModel.stationID, allFormList);
    getForwardSum(formModel.type, formModel.stationID, allFormList);
  }
}

export function getRencetSum(type, stationID, allFormList) {
  const recentSum = allFormList[stationID][type]?.reduce((pre, item) => {
    return (pre = pre + item.recentConsumption);
  }, 0);
  allFormList[stationID][type + '_recent'] = keepTwoDecimalFull(recentSum, 3) || 0;
}
export function getForwardSum(type, stationID, allFormList) {
  const forwardSum = allFormList[stationID][type]?.reduce((pre, item) => {
    return (pre = pre + item.forwardConsumption);
  }, 0);

  allFormList[stationID][type + '_forward'] = keepTwoDecimalFull(forwardSum, 3) || 0;
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
      ].includes(key)
    ) {
      basicWaterUseLinkage(formModel, allFormList);
    }
    // if (['serviceDtoList', 'pipeNetworkDtoList'].includes(key)) {
    //   servicePipeNetwork(res, key);
    // }
    // if (['capitalConstructionDtoList'].includes(key)) {
    //   unforeseenInfrastructure(res, key);
    // }
    servicePipeNetwork(res, 'serviceDtoList');
    servicePipeNetwork(res, 'pipeNetworkDtoList');
    unforeseenInfrastructure(res, 'capitalConstructionDtoList');
    makeMaxWaterDtoList(res, 'makeMaxWaterDtoList');
  }
};
//结构
export function xx(formModel) {
  return formModel;
}
export function getForwardAll(formModel) {
  return formModel;
}
