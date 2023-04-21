function deepClone2(obj) {
  const copy = Array.isArray(obj) ? [] : {};
  for (const key in obj) {
    if (obj.hasOwnProperty(key)) {
      const type = Object.prototype.toString.call(obj[key]).slice(8, -1).toLocaleLowerCase();
      copy[key] = type === 'object' || type === 'array' ? deepClone2(obj[key]) : obj[key];
    }
  }
  return copy;
}

function toTree(arr) {
  const arrNew = deepClone2(arr);
  return arrNew.filter((p) => {
    const c = arrNew.filter((item) => item.pid === p.id);
    if (c.length) {
      p.children = c;
    }
    return p.pid == null;
  });
}

// 方法一 常规思路 递归
function toTree1(arr) {
  // 这个就是一级数组 最后上面的数组只有三个是一级的
  const parentA = arr.filter((item) => !item.pid);
  const childA = arr.filter((item) => item.pid);
  /** 这个就是小蝌蚪找妈妈的具体实现,其实可以写在一个函数里面,
             但是为了易懂,就麻烦点儿摘出来一个函数 **/
  tree1(parentA, childA);

  return parentA;
}
function tree1(parentA, childA) {
  for (const item of parentA) {
    item.children = [];

    for (const i in childA) {
      const v = childA[i];
      if (item.id === v.pid) {
        item.children.push(v);

        // 这一步递归 如果没有下面三行代码 只能找到第一级对应的children第二级目录
        const c = JSON.parse(JSON.stringify(childA)); // 简单深拷贝一下
        // 能走到这儿，说明这个娃 已经找到父亲了 不需要在遍历了 所以删了 你要是非的不删也可以
        // 注意这里是具体根据业务的，如果不同父目录下面可能有相同的子目录，这里就不能删除了
        c.splice(i, 1);
        // 这里需要把当前儿子 加上【】转为数组因为tree1接受的是父，子数组
        tree1([v], c);
      }
    }
  }
}
const arr1 = [
  {
    id: 1,
    name: '系统管理1',
    pid: null,
  },
  {
    id: 2,
    name: '系统管理2',
    pid: null,
  },
  {
    id: 3,
    name: '系统管理1_0',
    pid: 1,
  },
  {
    id: 4,
    name: '系统管理1_1',
    pid: 1,
  },
  {
    id: 5,
    name: '系统管理2_0',
    pid: 2,
  },
  {
    id: 6,
    name: '系统管理2_2_0',
    pid: 5,
  },
  {
    id: 7,
    name: '系统管理3',
    pid: null,
  },
  {
    id: 8,
    name: '系统管理1-1-2',
    pid: 4,
  },
];
function toTree2(arr) {
  const newArr = JSON.parse(JSON.stringify(arr));
  return newArr.filter((p) => {
    const c = newArr.filter((item) => item.pid === p.id);
    c.length && (p.children = c);

    return p.pid == null;
  });
}
console.log(toTree2(arr1));
// console.log(deepClone2(arr1));
// console.log('ceshi');
