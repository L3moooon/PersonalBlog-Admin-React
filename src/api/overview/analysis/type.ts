import type { CommonResponse } from '@/types/common';

export interface GetNumDataResponse extends CommonResponse {
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
export interface GetGeoDataResponse extends CommonResponse {
  data: Array<GeoDataItem>;
}
