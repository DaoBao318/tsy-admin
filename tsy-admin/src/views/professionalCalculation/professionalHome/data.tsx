export const cardList = (() => {
  const result: any[] = [];
  result.push({
    title: '站点昼夜最大用水量排水量计算',
    color: '#1890ff',
    active: '100',
    new: '1,799',
    icon: 'ion:water-outline',
    content:
      '站点昼夜最大用水量与排水量计算功能接收国铁（普铁和高铁）各站点（各车站和段所）上游专业提资数据（支持本专业录入），用户设定（修改）各项房屋、床位、人数、定员等单位用水量（默认值）、列车清洗单位用水量、车辆水箱容积、道路和绿化面积单位用水量（默认值）等，选取（修改）服务行业、管网漏失、基建未预见用水以及排水量计算定额百分率（默认值）。计算铁路车站用水量与排水量，生成设计项目各站点昼夜用水量与排水量计算成果表（Excel表格）。',
    page: 'WaterSupplyAndDrainage',
  });
  result.push({
    title: '压力管道水力计算',
    color: '#1890ff',
    active: '100',
    new: '1,799',
    icon: 'ant-design:hourglass-filled',
    content:
      '压力管道水力计算功能支持《海曾-威廉公式》和《给水排水设计手册》的管道水力计算公式，可以选择球墨铸铁管钢管、镀锌钢管、不锈钢管、无缝钢管、聚乙烯PE100管（0.6MPa） 、聚乙烯PE100管（1.0MPa）、聚乙烯PE100管（1.6MPa）等管材进行水力计算。能够实现铁路给排水设计过程中常用管材的管道流量q、流速v、水力坡降i、水头损失hz等的计算，为用户提供管道水力计算工具以及设计管道的试算、修改决策等。',
    page: 'WaterConsumption',
  });
  result.push({
    title: '设施设备选型计算',
    color: '#1890ff',
    active: '100',
    new: '1,799',
    icon: 'ant-design:carry-out-outlined',
    content:
      '设施设备选型计算功能根据铁路项目各站点给水及排水设计主要原则，用户可分别进行各站点给水和排水的设施设备选型计算。能够实现普速和高速铁路项目大型站（特大型站）、中间站、会让站、动车所、客整所等蓄水设施（水池、水箱）、生活供水设备、消防供水设备、消毒设备、污水抽升/调节泵井、污水处理设备等选型计算，生成设计项目各站点设施设备选型计算成果表（Excel表格）。',
    page: 'EquipmentSelection',
  });
  return result;
})();
