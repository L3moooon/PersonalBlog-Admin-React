import request from '@/api/index';
import type { CommonResponse } from '@/types/common';
import type { GetNumDataResponse, GetGeoDataResponse } from './type';
enum API {
  GET_NUM_DATA = '/admin/analysis/getNumData', //滚动数字数据 总访问量/总文章量/总评论量/总点赞量
  GET_GEO_DATA = '/admin/analysis/getGeoData', //访客地图数据
  GET_LINE_DATA = '/admin/analysis/getLineData',
  GET_BAR_DATA = '/admin/analysis/getBarData',
  GET_PIE_DATA = '/admin/analysis/getPieData',
}
export const getNumData = (): Promise<GetNumDataResponse> =>
  request.get(API.GET_NUM_DATA);

export const getGeoData = (): Promise<GetGeoDataResponse> =>
  request.get(API.GET_GEO_DATA);

export const getLineData = (): Promise<CommonResponse> =>
  request.get(API.GET_LINE_DATA);

export const getBarData = (): Promise<CommonResponse> =>
  request.get(API.GET_BAR_DATA);

export const getPieData = (): Promise<CommonResponse> =>
  request.get(API.GET_PIE_DATA);
