// 运算的封装，解决js精确度丢失问题
// 参考 https://www.cnblogs.com/snandy/p/4943138.html

/**
 * $operator 包含加减乘除以及toFixed五个方法，能确保浮点数运算不丢失精度
 *
 * 我们知道计算机编程语言里浮点数计算会存在精度丢失问题（或称舍入误差），其根本原因是二进制和实现位数限制有些数无法有限表示
 * 以下是十进制小数对应的二进制表示
 *      0.1 >> 0.0001 1001 1001 1001…（1001无限循环）
 *      0.2 >> 0.0011 0011 0011 0011…（0011无限循环）
 * 计算机里每种数据类型的存储是一个有限宽度，比如 JavaScript 使用 64 位存储数字类型，因此超出的会舍去。舍去的部分就是精度丢失的部分。
 *
 * ** method **
 *  add / subtract / multiply /divide / toFixed
 *
 * ** explame **
 *  0.1 + 0.2 == 0.30000000000000004 （多了 0.00000000000004）
 *  0.2 + 0.4 == 0.6000000000000001  （多了 0.0000000000001）
 *  19.9 * 100 == 1989.9999999999998 （少了 0.0000000000002）
 *  1.335.toFixed(2) // 1.33 不是1.34
 *
 * $operator.add(0.1, 0.2) >> 0.3
 * $operator.multiply(19.9, 100) >> 1990
 * $operator.toFixed(1.335, 2) >> 1.34
 *
 */
const METHODS = {
  ADD: 'add',
  REDUCE: 'subtract',
  MUL: 'multiply',
  DIVIDE: 'divide',
};

export const MathHandler = {
  add(a, b, digits) {
    return operation(a, b, digits, METHODS.ADD);
  },
  reduce(a, b, digits) {
    return operation(a, b, digits, METHODS.REDUCE);
  },
  multiply(a, b, digits) {
    return operation(a, b, digits, METHODS.MUL);
  },
  divide(a, b, digits) {
    return operation(a, b, digits, METHODS.DIVIDE);
  },
  toFixed(num, digits) {
    return toFixed(num, digits);
  },
};
/*
 * 判断num是否为一个整数
 */
const isInteger = (num) => Math.floor(num) === num;

/*
 * 将一个浮点数转成整数，返回整数和倍数。如 3.14 >> 314，倍数是 100
 * @param floatNum {number} 小数
 * @return {object}
 *   {times:100, num: 314}
 */
const toInteger = (floatNum: number) => {
  const res: any = { times: 1, num: 0 };
  const isNegative = floatNum < 0;
  if (isInteger(floatNum)) {
    res.num = floatNum;
    return res;
  }
  const strfi = floatNum + '';
  const dotPos = strfi.indexOf('.');
  const len = strfi.substr(dotPos + 1).length;
  const times = Math.pow(10, len);
  let intNum = parseInt(Math.abs(floatNum) * times + 0.5, 10);
  res.times = times;
  if (isNegative) {
    intNum = -intNum;
  }
  res.num = intNum;
  return res;
};
/*
 * 核心方法，实现加减乘除运算，确保不丢失精度
 * 思路：把小数放大为整数（乘），进行算术运算，再缩小为小数（除）
 *
 * @param a {number} 运算数1
 * @param b {number} 运算数2
 * @param digits {number} 精度，保留的小数点数，比如 2, 即保留为两位小数
 * @param op {string} 运算类型，有加减乘除（add/subtract/multiply/divide）
 *
 */
function operation(numberA, numberB, digits = -1, op) {
  const { num: numA, times: timesA } = toInteger(numberA);
  const { num: numB, times: timesB } = toInteger(numberB);

  const maxTimes = Math.max(timesA, timesB);
  let result: any = 0;
  switch (op) {
    // 加法
    case METHODS.ADD:
      if (timesA === timesB) {
        // 两个小数位数相同
        result = numA + numB;
      } else if (timesA > timesB) {
        // numberA 小数位 大于 numberA
        result = numA + numB * (timesA / timesB);
      } else {
        // o1 小数位 小于 o2
        result = numA * (timesB / timesA) + numB;
      }
      result = result / maxTimes;
      break;
    // 减法
    case METHODS.REDUCE:
      if (timesA === timesB) {
        result = numA - numB;
      } else if (timesA > timesB) {
        result = numA - numB * (timesA / timesB);
      } else {
        result = numA * (timesB / timesA) - numB;
      }
      result = result / maxTimes;
      break;
    case METHODS.MUL:
      result = (numA * numB) / (timesA * timesB);
      break;
    case METHODS.DIVIDE:
      result(numA / numB) * (timesB / timesA);
      break;
    default:
      break;
  }
  if (digits != -1) {
    result = toFixed(result, digits);
  }
  return result;
}

function toFixed(num: number, digits: number) {
  const times = Math.pow(10, digits);
  let des = num * times + 0.5;
  des = parseInt(des, 10) / times;
  return des;
}
