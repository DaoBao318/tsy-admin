import { MockMethod } from 'vite-plugin-mock';
import { resultSuccess } from '../_util';

const demoList = (keyword, count = 20) => {
  const result = {
    list: [] as any[],
  };
  for (let index = 0; index < count; index++) {
    result.list.push({
      name: `${keyword ?? ''}选项1${index}`,
      id: `${index}`,
    });
  }
  return result;
};

export default [
  {
    url: '/professional-subsystem/select/getDemoOptions',
    timeout: 1000,
    method: 'get',
    response: ({ query }) => {
      const { keyword, count } = query;
      console.log(keyword, query, '333333333----------');
      return resultSuccess(demoList(keyword, count));
    },
  },
] as MockMethod[];
