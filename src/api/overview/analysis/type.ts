import type { CommonResponse } from '@/types/common';

export interface GetNumDataResponse extends CommonResponse {
  data: {
    total_visits: number;
    article_count: number;
    comment_count: number;
    star_count: number;
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
