import { defHttp } from '/@/utils/http/axios';

class ItemCache<T> {
  data: T;
  timeout: number;
  cacheTime: number;

  constructor(data: T, timeout: number) {
    this.data = data;
    this.timeout = timeout;
    this.cacheTime = new Date().getTime();
  }
}
export class ExpriesCache {
  // 定义静态数据map来作为缓存池
  static cacheMap = new Map();

  // 数据是否超时
  static isOverTime(name) {
    const data = ExpriesCache.cacheMap.get(name);

    // 没有数据 一定超时
    if (!data) return true;

    // 获取系统当前时间戳
    const currentTime = new Date().getTime();

    // 获取当前时间与存储时间的过去的秒数
    const overTime = (currentTime - data.cacheTime) / 1000;

    // 如果过去的秒数大于当前的超时时间，也返回null让其去服务端取数据
    if (Math.abs(overTime) > data.timeout) {
      // 如果过期，就删除当前缓存。
      ExpriesCache.cacheMap.delete(name);
      return true;
    }

    // 不超时
    return false;
  }

  // 当前data在 cache 中是否超时
  static has(name) {
    return !ExpriesCache.isOverTime(name);
  }

  // 删除 cache 中的 data
  static delete(name) {
    return ExpriesCache.cacheMap.delete(name);
  }

  // 获取
  static get(name) {
    const isDataOverTiem = ExpriesCache.isOverTime(name);
    //如果 数据超时，返回null，但是没有超时，返回数据，而不是 ItemCache 对象
    return isDataOverTiem ? null : ExpriesCache.cacheMap.get(name).data;
  }

  // 默认存储10秒
  static set(name, data, timeout = 10) {
    // 设置 itemCache
    const itemCache = new ItemCache(data, timeout);
    //缓存
    ExpriesCache.cacheMap.set(name, itemCache);
  }
}

// 生成key值错误
const generateKeyError = new Error("Can't generate key from name and argument");

// 生成key值
function generateKey(name, argument) {
  // 从arguments 中取得数据然后变为数组
  const params = Array.from(argument).join(',');

  try {
    // 返回 字符串，函数名 + 函数参数
    return `${name}-${params}`;
  } catch (_) {
    // 返回生成key错误
    return generateKeyError;
  }
}

enum Api {
  getProjectInformation = '/api/Project/GetProjectList', //获取项目信息
}
export const getProjectInformationCatch = async (params) => {
  // 生成key
  const key = generateKey('GetProjectList', [params.likeQuery, params.pageIndex]);
  // 获得数据
  let data = ExpriesCache.get(key);
  if (!data) {
    const res = await defHttp.post({ url: Api.getProjectInformation, params });
    // 使用 10s 缓存，10s之后再次get就会 获取null 而从服务端继续请求
    ExpriesCache.set(key, res, 10);
    data = ExpriesCache.get(key);
  }
  return data;
};
