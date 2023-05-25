export const technologyTypeOptionsData = {
  reuse: [
    {
      label: 'SBR处理',
      value: 'GreenReuseSBR',
      key: '1',
    },
    {
      label: 'MBR处理',
      value: 'GreenReuseMBR',
      key: '2',
    },
  ],
  nearbyDischarge: [
    {
      label: 'SBR处理',
      value: 'NearbyDischargeSBR',
      key: '1',
    },
    {
      label: 'MBR处理',
      value: 'NearbyDischargeMBR',
      key: '2',
    },
    {
      label: '人工湿地处理',
      value: 'ConstructedWetlands',
      key: '3',
    },
  ],
  municipalPipeNetwork: [
    {
      label: '气浮过滤',
      value: 'AFE',
      key: '1',
    },
    {
      label: '抽升直排',
      value: 'ExtractionDirectDischarge',
      key: '2',
    },
  ],
};
export const provincesOptions = [
  {
    id: 'reuse',
    label: '绿化回用',
    value: 'reuse',
    key: '1',
  },
  {
    id: 'nearbyDischarge',
    label: '就近排放',
    value: 'nearbyDischarge',
    key: '2',
  },
  {
    id: 'municipalPipeNetwork',
    label: '排市政管网',
    value: 'municipalPipeNetwork',
    key: '3',
  },
];
