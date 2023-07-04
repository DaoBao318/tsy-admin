// { value: '01', label: '普铁-区段站' },
// { value: '09', label: '普铁-客机折返段及客整所' },
// { value: '02', label: '普铁-中间站' },
// { value: '03', label: '普铁-会让站、越行站' },
// { value: '05', label: '高铁-中间站' },
// { value: '06', label: '高铁-动车段' },
// { value: '07', label: '高铁-大型车站' },
export function calculationFormulaPrompt(stationType, item) {
  const { waterProject } = item;
  let mes = '';
  if (waterProject.indexOf('军供站厕所') > -1) {
    mes = '（大便器个数*0.08+小便器个数*0.07+洗手盆个数*0.02）*16';
  } else if (waterProject.indexOf('军供站锅炉房') > -1) {
    mes = '蒸汽锅炉：（13~57）*台数；热水锅炉：（20~37）*台数';
  } else if (waterProject.indexOf('洗涤车间') > -1) {
    mes = '（0.04~0.08）*干衣重量（kg）';
  } else if (waterProject.indexOf('') > -1) {
    mes = '';
  } else if (waterProject.indexOf('') > -1) {
    mes = '';
  } else {
    mes = '';
  }
  if (stationType === '01') {
    if (waterProject.indexOf('通过旅客列车上水') > -1) {
      mes = '1.2*qᵢ*16*2';
    } else if (waterProject.indexOf('始发终到旅客列车上水') > -1) {
      mes = '1.2*qᵢ*16';
    } else if (waterProject.indexOf('通过旅客列车卸污量') > -1) {
      mes = 'β*qᵢ’*32*2';
    } else if (waterProject.indexOf('始发终到旅客列车卸污量') > -1) {
      mes = 'β*qᵢ’*32';
    } else if (waterProject.indexOf('站房') === 0) {
      mes = '最高聚集人数*3*0.02';
    } else if (waterProject.indexOf('') > -1) {
      mes = '';
    } else if (waterProject.indexOf('') > -1) {
      mes = '';
    } else {
      mes = '';
    }
  } else if (stationType === '02') {
    if (waterProject.indexOf('站房') === 0) {
      mes = '最高聚集人数*3*0.02';
    } else if (waterProject.indexOf('') > -1) {
      mes = '';
    } else if (waterProject.indexOf('') > -1) {
      mes = '';
    } else if (waterProject.indexOf('') > -1) {
      mes = '';
    } else if (waterProject.indexOf('') > -1) {
      mes = '';
    } else if (waterProject.indexOf('') > -1) {
      mes = '';
    } else {
      mes = '';
    }
  } else if (stationType === '03') {
    if (waterProject.indexOf('站房') === 0) {
      mes = '最高聚集人数*3*0.02';
    } else if (waterProject.indexOf('') > -1) {
      mes = '';
    } else if (waterProject.indexOf('') > -1) {
      mes = '';
    } else if (waterProject.indexOf('') > -1) {
      mes = '';
    } else if (waterProject.indexOf('') > -1) {
      mes = '';
    } else if (waterProject.indexOf('') > -1) {
      mes = '';
    } else if (waterProject.indexOf('') > -1) {
      mes = '';
    } else if (waterProject.indexOf('') > -1) {
      mes = '';
    } else {
      mes = '';
    }
  } else if (stationType === '09') {
    if (waterProject.indexOf('客车上水') > -1) {
      mes = '1.2*qᵢ*16*2';
    } else if (waterProject.indexOf('集便器污物箱冲洗用水') > -1) {
      mes = '（0.4～1.0）*32/15';
    } else if (waterProject.indexOf('旅客列车卸污量') > -1) {
      mes = 'β*qᵢ’*32';
    } else if (waterProject.indexOf('污物箱冲洗卸污量') > -1) {
      mes = '（0.4～1.0）*32/15';
    } else if (waterProject.indexOf('站房') === 0) {
      mes = '最高聚集人数*3*0.02';
    } else if (waterProject.indexOf('') > -1) {
      mes = '';
    } else if (waterProject.indexOf('') > -1) {
      mes = '';
    } else {
      mes = '';
    }
  } else if (stationType === '05') {
    if (waterProject.indexOf('站房') === 0) {
      mes = '最高聚集人数*2*0.004';
    } else if (waterProject.indexOf('') > -1) {
      mes = '';
    } else if (waterProject.indexOf('') > -1) {
      mes = '';
    } else if (waterProject.indexOf('') > -1) {
      mes = '';
    } else if (waterProject.indexOf('') > -1) {
      mes = '';
    } else if (waterProject.indexOf('') > -1) {
      mes = '';
    } else {
      mes = '';
    }
  } else if (stationType === '06') {
    if (waterProject.indexOf('客车上水') > -1) {
      mes = '1.2*qᵢ*n';
    } else if (waterProject.indexOf('人工清洗线') > -1) {
      mes = '（1.5～2.0）*n';
    } else if (waterProject.indexOf('集便器污物箱冲洗') > -1) {
      mes = '（0.4～1.0）*n/15';
    } else if (waterProject.indexOf('动车组外皮清洗装置补水') > -1) {
      mes = '1*n/8';
    } else if (waterProject.indexOf('旅客列车卸污量') > -1) {
      mes = 'β*qᵢ’*n';
    } else if (waterProject.indexOf('污物箱冲洗卸污量') > -1) {
      mes = '（0.4～1.0）*n/15';
    } else if (waterProject.indexOf('站房') === 0) {
      mes = '最高聚集人数*2*0.004';
    } else if (waterProject.indexOf('') > -1) {
      mes = '';
    } else if (waterProject.indexOf('') > -1) {
      mes = '';
    } else if (waterProject.indexOf('') > -1) {
      mes = '';
    } else {
      mes = '';
    }
  } else if (stationType === '07') {
    if (waterProject.indexOf('通过旅客列车上水') > -1) {
      mes = '1.2*qᵢ*n*2';
    } else if (waterProject.indexOf('始发终到旅客列车上水') > -1) {
      mes = '1.2*qᵢ*n';
    } else if (waterProject.indexOf('旅客列车卸污量') > -1) {
      mes = 'β**qᵢ’*n*2';
    } else if (waterProject.indexOf('污物箱冲洗卸污量') > -1) {
      mes = 'β*qᵢ’*n';
    } else if (waterProject.indexOf('站房') === 0) {
      mes = '最高聚集人数*2*0.004';
    } else if (waterProject.indexOf('') > -1) {
      mes = '';
    } else {
      mes = '';
    }
  }
  return mes;
}

export const annotationContent = (stationType) => {
  let mes = '';
  if (stationType === '01') {
    mes =
      '注：1、因职工在车站住宿，生活用水量标准按《室外给水设计标准》（GB50013）表 4.0.3-2 综合生活用水定额进行取值。以下表格同； 2、生产用水可根据车站生产房屋实际设置情况调整。以下同。' +
      '3、β为普车集便器污物箱充满度，β=0.7~0.8； 4、普车每辆车水箱容积qᵢ=1.2m³，18编组车共32个污物箱，单个污物箱容积qᵢ’=0.55m³。5、办公用水项目中包括各综合楼及站房等工点总办公定员的生产用水。';
  } else if (stationType === '02') {
    mes = '注：办公用水项目中包括各综合楼及站房等工点总办公定员的生产用水。';
  } else if (stationType === '03') {
    mes = '注：办公用水项目中包括各综合楼及站房等工点总办公定员的生产用水。';
  } else if (stationType === '09') {
    mes =
      '注：1、β为普车集便器污物箱充满度，β=0.7~0.8； 2、普车每辆车水箱容积qᵢ=1.2m³，18编组车共32个污物箱，单个污物箱容积qᵢ’=0.55m³。3、办公用水项目中包括各综合楼及站房等工点总办公定员的生产用水。';
  } else if (stationType === '05') {
    mes = '注：办公用水项目中包括各综合楼及站房等工点总办公定员的生产用水。';
  } else if (stationType === '06') {
    mes =
      '注：1、β为动车组集便器污物箱充满度，β=0.7~0.8； 2、动车组编组辆数一般为n=8、16，动车组每辆车水箱容积qᵢ=0.7m³，每辆车污物箱容积qᵢ’=0.6m³，污物箱冲洗周期为15天。';
  } else if (stationType === '07') {
    mes =
      '注：1、β为动车组集便器污物箱充满度，β=0.7~0.8； 2、动车组编组辆数一般为n=8、16，动车组每辆车水箱容积qᵢ=0.7m³，车站污物箱不考虑冲洗。';
  }
  return mes;
};
