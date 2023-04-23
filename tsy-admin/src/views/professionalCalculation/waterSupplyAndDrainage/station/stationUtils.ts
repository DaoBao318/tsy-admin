/**
 * 获取用水列表项的id
 * @param getDataSource 获取用水列表项
 * @returns 用水列表项的[id]
 */
export const getSeletcted = function (getDataSource) {
  const data = getDataSource();
  const key = [];
  data.forEach((item) => {
    if (!!item.id) {
      key.push(String(item.id));
    }
  });
  return key;
};
/**
 * 将勾选的key值，转化为用水项
 * @param targetKeys 勾选用水项
 * @param dataRaw 用水项原始数据
 * @returns 选择的用水项list
 */

export const transformToTableRaw = function (targetKeys, dataRaw): any[] {
  const arr = dataRaw.filter((item) => {
    return targetKeys.includes(String(item.id));
  });
  return arr;
};
//所有的用水列表项
// {
//   "id": 108,
//   "waterSupplyTypeID": 2,
//   "classification": "Produce",
//   "classificationName": "生产用水",
//   "waterProjectId": 108,
//   "waterProject": "10kV配电所",
//   "unit": "处",
//   "unitWater": 1,
//   "unitWaterMin": 1,
//   "unitWaterMan": 0
// },
// 选择之后的列表项
// {
//   "id": 12,
//   "projectID": 1,
//   "stationID": 1,
//   "waterSupplyTypeID": 1,
//   "classification": "PassengerTransportation",
//   "classificationName": "旅客运输用水",
//   "waterProjectId": 12,
//   "waterProject": "客车上水（设编组辆数为16辆，每辆车水箱容积qi）",
//   "unit": "辆",
//   "recentQuantity": 10
// },
/**
 * 将用水项目转化为列表项
 * @param queryWater
 * @param selectData
 * @param recentQuantityRaw
 * @returns 列表项
 */
export const transformToTable = function (queryWater, selectData, recentQuantityRaw): any[] {
  const recentQuantityObj = {};
  recentQuantityRaw.forEach((item) => {
    recentQuantityObj[item.id] = item.recentQuantity;
  });
  const { projectID, stationID } = queryWater;
  let arr = [];
  arr = selectData.map((item) => {
    const obj = {
      id: item.id,
      projectID,
      stationID,
      waterSupplyTypeID: item.waterSupplyTypeID,
      classification: item.classification,
      classificationName: item.classificationName,
      waterProjectId: item.waterProjectId,
      waterProject: item.waterProject,
      unit: item.unit,
      recentQuantity: recentQuantityObj[item.id],
      // recentQuantity: 0,
    };
    return obj;
  });
  return arr;
};

export const stationSave = function (getDataSource) {
  let saveData = [];
  saveData = getDataSource().map((item) => {
    const obj = {
      id: item.id,
      projectID: item.projectID,
      stationID: item.stationID,
      waterSupplyTypeID: item.waterSupplyTypeID,
      classification: item.classification,
      classificationName: item.classificationName,
      waterProjectId: item.waterProjectId,
      waterProject: item.waterProject,
      unit: item.unit,
      recentQuantity: Number(item.recentQuantity),
    };
    return obj;
  });
  return saveData;
};

export const validateNum = function (list) {
  let mes = '';
  list.forEach((item) => {
    if (item.recentQuantity === 0) {
      mes = mes + '《' + item.waterProject + '》；';
    }
  });
  return mes;
};

export interface QueryModel {
  stationID?: number;
  stationType?: number;
  projectID?: number;
}

export function arrToTwoDim0(arr, num = 2) {
  const newArr = [];
  for (let i = 0; i < arr.length; i = i + num) {
    newArr.push(arr.slice(i, i + num));
  }
  return newArr;
}

export function arrToTwoDim1(arr, num = 2) {
  const newArr = [];
  const len = arr.length;
  const loop = len % num === 0 ? len / num : Math.ceil(len / num);
  for (let i = 0; i < loop; i++) {
    newArr.push(arr.slice(i * num, i * num + num));
  }
  return newArr;
}

export function arrToTwoDim2(arr, num = 2) {
  const newArr = [];
  const len = arr.length;
  const loop = len % num === 0 ? len / num : Math.ceil(len / num);
  for (let i = 0; i < loop; i++) {
    newArr.push(arr.splice(0, num));
  }
  return newArr;
}

export function uniq(arr) {
  const obj = {};
  const arrNew = [];
  for (let i = 0; i < arr.length; i++) {
    const type = Object.prototype.toString.call(arr[i]).slice(8, -1).toLocaleLowerCase();
    if (type === 'undefined') continue;
    if (!obj[arr[i]]) {
      arrNew.push(arr[i]);
      obj[arr[i]] = true;
    }
  }
  return arrNew;
}

export function flatten(arr) {
  let result = [];
  for (let i = 0; i < arr.length; i++) {
    if (Array.isArray(arr[i])) {
      result = result.concat(flatten(arr[i]));
    } else {
      result.push(arr[i]);
    }
  }
  return result;
}

export function deepClone(obj) {
  const copy = Array.isArray(obj) ? [] : {};
  for (const key in obj) {
    if (obj.hasOwnProperty(key)) {
      copy[key] = typeof obj[key] === 'object' ? deepClone(obj[key]) : obj[key];
    }
  }
  return copy;
}

export function deepClone1(obj) {
  const copy = obj instanceof Array ? [] : {};
  for (const i in obj) {
    if (obj.hasOwnProperty(i)) {
      copy[i] = typeof obj[i] === 'object' ? deepClone1(obj[i]) : obj[i];
    }
  }
  return copy;
}

export function deepClone2(obj) {
  const copy = Array.isArray(obj) ? [] : {};
  for (const key in obj) {
    if (obj.hasOwnProperty(key)) {
      const type = Object.prototype.toString.call(obj[key]).slice(8, -1).toLocaleUpperCase();
      copy[key] = type === 'object' || type === 'array' ? deepClone2(obj[key]) : obj[key];
    }
  }
  return copy;
}

export function toTree(arr = []) {
  const arrNew: [] = deepClone2(arr);
  arrNew.filter((p) => {
    const c = arrNew.filter((item) => (item.id = p.pid));
    c.length && (p.children = c);
    return p.pid === null;
  });
}

export function toTree2(arr) {
  const newArr = JSON.parse(JSON.stringify(arr));
  return newArr.filter((p) => {
    const c = newArr.filter((item) => item.pid === p.id);
    c.length && (p.children = c);

    return p.pid == null;
  });
}
/**
 * 将筛选的值进行排序输出
 * @param keys 选择的key值
 * @param arrList 原始的数组
 * @returns 排序后的keys
 */
export function sortKeys(keys, arrList) {
  const obj = {};
  arrList.forEach((item) => {
    obj[item.id + ''] = item.waterSupplyTypeID;
  });
  let arr = [];
  const newObj = deepClone2(obj);

  for (const key in obj) {
    if (!keys.includes(key)) {
      delete newObj[key];
    }
  }
  const objLast = {};
  for (const key in newObj) {
    if (!objLast[newObj[key]]) {
      objLast[newObj[key]] = [];
    }
    if (objLast[newObj[key]]) {
      objLast[newObj[key]].push(key);
    }
  }
  for (const key in objLast) {
    arr = arr.concat(objLast[key]);
  }
  return arr;
}

export function dealParams(values) {
  const i = Object.keys(values).length;
  const n = (i - 2) / 3;
  const arr = [];
  for (let i = 1; i < n; i++) {
    arr.push({ stationName: values['stationName' + i], stationType: values['stationType' + i] });
  }
  return arr;
}
