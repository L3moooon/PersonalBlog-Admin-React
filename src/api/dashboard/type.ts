import type { CommonResponse } from '@/types/common';

export interface NumDataResponse extends CommonResponse {
  data: {
    visit: { total: number; today: number };
    article: { total: number; today: number };
    comment: { total: number; today: number };
    like: { total: number; today: number };
  };
}
// 访客地图数据
export interface GeoDataItem {
  name: string;
  value: number;
}
export interface GeoDataResponse extends CommonResponse {
  data: Array<GeoDataItem>;
}

export type EchartsTimeData = Array<[string, number]>;
//折线图数据
export interface LineDataResponse extends CommonResponse {
  data: {
    day: EchartsTimeData;
    week: EchartsTimeData;
  };
}

//柱状图数据
export interface BarDataResponse extends CommonResponse {
  data: EchartsTimeData;
}
