export interface ColorPalettes {
  primary: string[];
  success: string[];
  warning: string[];
  error: string[];
  info: string[];
  [key: string]: string[];
}

/**
 * 浅色模式下的颜色生成算法（示例数据，生产环境建议使用 @ant-design/colors）
 */
export const genMapTokenAlgorithm = () => {
  const primary = [
    '#e6f4ff', // 1
    '#bae0ff', // 2
    '#91caff', // 3
    '#69b1ff', // 4
    '#4096ff', // 5
    '#1677ff', // 6 - Primary
    '#0958d9', // 7
    '#003eb3', // 8
    '#002c8c', // 9
    '#001d66', // 10
  ];

  return {
    palettes: {
      primary,
      success: [
        '#f6ffed',
        '#d9f7be',
        '#b7eb8f',
        '#95de64',
        '#73d13d',
        '#52c41a',
        '#389e0d',
        '#237804',
        '#135200',
        '#092b00',
      ],
      warning: [
        '#fffbe6',
        '#fff1b8',
        '#ffe58f',
        '#ffd666',
        '#ffc53d',
        '#faad14',
        '#d48806',
        '#ad6800',
        '#874d00',
        '#613400',
      ],
      error: [
        '#fff1f0',
        '#ffccc7',
        '#ffa39e',
        '#ff7875',
        '#ff4d4f',
        '#f5222d',
        '#cf1322',
        '#a8071a',
        '#820014',
        '#5c0011',
      ],
      info: primary,
    } as ColorPalettes,
    tokens: {
      // 在这里可以定义一些通用的 token 覆盖
    },
  };
};

/**
 * 深色模式下的颜色生成算法
 */
export const genDarkMapTokenAlgorithm = () => {
  const primary = [
    '#111a2c',
    '#112340',
    '#153450',
    '#164c7e',
    '#1664ab',
    '#1677ff',
    '#318afe',
    '#4d9dfe',
    '#69b1fe',
    '#85c4fe',
  ];

  return {
    palettes: {
      primary,
      success: [
        '#121b14',
        '#142a1b',
        '#193b21',
        '#1d4d29',
        '#245f2f',
        '#2a7136',
        '#3f8d49',
        '#58aa5f',
        '#73c778',
        '#90e493',
      ],
      warning: [
        '#1b1611',
        '#302111',
        '#493111',
        '#644211',
        '#825611',
        '#a16b11',
        '#c18329',
        '#e19d45',
        '#ffb865',
        '#ffd488',
      ],
      error: [
        '#1c1212',
        '#331616',
        '#4f1a1a',
        '#6d1f1f',
        '#8d2626',
        '#ae2e2e',
        '#cf4a4a',
        '#e86e6e',
        '#f99494',
        '#ffbcbc',
      ],
      info: primary,
    } as ColorPalettes,
    tokens: {
      // 深色模式下的特殊 token 挂载
    },
  };
};
