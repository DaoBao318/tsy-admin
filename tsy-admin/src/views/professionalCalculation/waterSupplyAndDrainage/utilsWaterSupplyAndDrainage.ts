import { keepTwoDecimalFull } from '/@/utils/calculation/count';
import { cloneDeep } from 'lodash-es';
import { waterSourceStore } from '/@/store/modules/waterInfo';
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
    res[key + '_recent'] = keepTwoDecimalFull(res[key][0]['unitWater'] * sumArr(recent), 3);
    res[key + '_forward'] = keepTwoDecimalFull(res[key][0]['unitWater'] * sumArr(forward), 3);
    res[key][0]['recentConsumption'] = res[key + '_recent'];
    res[key][0]['forwardConsumption'] = res[key + '_forward'];
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
    res[key + '_recent'] = keepTwoDecimalFull(res[key][0]['unitWater'] * sumArr(recent), 3);
    res[key + '_forward'] = keepTwoDecimalFull(res[key][0]['unitWater'] * sumArr(forward), 3);
    res[key][0]['recentConsumption'] = res[key + '_recent'];
    res[key][0]['forwardConsumption'] = res[key + '_forward'];
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
    res[key + '_recent'] = keepTwoDecimalFull(res[key][0]['unitWater'] * sumArr(recent), 3);
    res[key + '_forward'] = keepTwoDecimalFull(res[key][0]['unitWater'] * sumArr(forward), 3);
    res[key][0]['recentConsumption'] = res[key + '_recent'];
    res[key][0]['forwardConsumption'] = res[key + '_forward'];
  }
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
//运输污水
export const passengerTrainsFecalSewageDtoList = (res, key) => {
  if (
    res['passengerTrainsFecalSewageDtoList'] &&
    res['passengerTrainsFecalSewageDtoList'].length > 0
  ) {
    const recent = processingNumberUndefined(res['passengerTransportationDtoList' + '_recent']);
    const forward = processingNumberUndefined(res['passengerTransportationDtoList' + '_forward']);
    res[key + '_recent'] = keepTwoDecimalFull(res[key][0]['unitWater'] * recent, 3);
    res[key + '_forward'] = keepTwoDecimalFull(res[key][0]['unitWater'] * forward, 3);
    res[key][0]['recentConsumption'] = res[key + '_recent'];
    res[key][0]['forwardConsumption'] = res[key + '_forward'];
  }
};
//生产污水
export const producedrainMaxWaterDtoList = (res, key) => {
  if (res['producedrainMaxWaterDtoList'] && res['producedrainMaxWaterDtoList'].length > 0) {
    const recent = processingNumberUndefined(res['produceDtoList' + '_recent']);
    const forward = processingNumberUndefined(res['produceDtoList' + '_forward']);
    res[key + '_recent'] = keepTwoDecimalFull(res[key][0]['unitWater'] * recent, 3);
    res[key + '_forward'] = keepTwoDecimalFull(res[key][0]['unitWater'] * forward, 3);
    res[key][0]['recentConsumption'] = res[key + '_recent'];
    res[key][0]['forwardConsumption'] = res[key + '_forward'];
  }
};
//生活污水
export const lifedrainMaxWaterDtoList = (res, key) => {
  if (res['lifedrainMaxWaterDtoList'] && res['lifedrainMaxWaterDtoList'].length > 0) {
    const recent = processingNumberUndefined(res['lifeDtoList' + '_recent']);
    const forward = processingNumberUndefined(res['lifeDtoList' + '_forward']);
    res[key + '_recent'] = keepTwoDecimalFull(res[key][0]['unitWater'] * recent, 3);
    res[key + '_forward'] = keepTwoDecimalFull(res[key][0]['unitWater'] * forward, 3);
    res[key][0]['recentConsumption'] = res[key + '_recent'];
    res[key][0]['forwardConsumption'] = res[key + '_forward'];
  }
};
//总设计污水
export const designSewageVolumeDtoList = (res, key) => {
  const recent = [
    processingNumberUndefined(res['producedrainMaxWaterDtoList' + '_recent']),
    processingNumberUndefined(res['lifedrainMaxWaterDtoList' + '_recent']),
    processingNumberUndefined(res['passengerTrainsFecalSewageDtoList' + '_recent']),
  ];
  const forward = [
    processingNumberUndefined(res['producedrainMaxWaterDtoList' + '_forward']),
    processingNumberUndefined(res['lifedrainMaxWaterDtoList' + '_forward']),
    processingNumberUndefined(res['passengerTrainsFecalSewageDtoList' + '_forward']),
  ];
  res[key + '_recent'] = keepTwoDecimalFull(sumArr(recent), 3);
  res[key + '_forward'] = keepTwoDecimalFull(sumArr(forward), 3);
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
          makeMaxWaterDtoList(res, key);
        }
        if (['designSewageVolumeDtoList'].includes(key)) {
          designSewageVolumeDtoList(res, key);
        }
        if (['producedrainMaxWaterDtoList'].includes(key)) {
          producedrainMaxWaterDtoList(res, key);
        }
        if (['lifedrainMaxWaterDtoList'].includes(key)) {
          lifedrainMaxWaterDtoList(res, key);
        }
        if (['passengerTrainsFecalSewageDtoList'].includes(key)) {
          passengerTrainsFecalSewageDtoList(res, key);
        }
      }
    }
  } catch (e) {
    store.waterSupplyAndDrainageDetailsLoadingAction(false);
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
    serviceDtoList(res, 'serviceDtoList');
    pipeNetworkDtoList(res, 'pipeNetworkDtoList');
    producedrainMaxWaterDtoList(res, 'producedrainMaxWaterDtoList');
    lifedrainMaxWaterDtoList(res, 'lifedrainMaxWaterDtoList');
    passengerTrainsFecalSewageDtoList(res, 'passengerTrainsFecalSewageDtoList');
    unforeseenInfrastructure(res, 'capitalConstructionDtoList');
    makeMaxWaterDtoList(res, 'makeMaxWaterDtoList');
    designSewageVolumeDtoList(res, 'designSewageVolumeDtoList');
  }
};

function getTotalDate(res, raw): any[] {
  raw['makeMaxWaterDtoList'][0].recentConsumption = res['makeMaxWaterDtoList_recent'];
  raw['makeMaxWaterDtoList'][0].forwardConsumption = res['makeMaxWaterDtoList_forward'];
  raw['designSewageVolumeDtoList'][0].recentConsumption = res['designSewageVolumeDtoList_recent'];
  raw['designSewageVolumeDtoList'][0].forwardConsumption = res['designSewageVolumeDtoList_forward'];

  return [raw['makeMaxWaterDtoList'][0], raw['designSewageVolumeDtoList'][0]];
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
    delete item['recommendedUnitWater'];
    delete item['type'];
  });
  const totalArray = getTotalDate(res, raw);
  waterComputeDtos = waterComputeDtos.concat(totalArray);
  result['waterComputeDtos'] = waterComputeDtos;
  return result;
}

export function getForwardAll(formModel) {
  return formModel;
}
