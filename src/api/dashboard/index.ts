import request from '@/api/index';
import type { CommonResponse } from '@/types/common';
import type {
  NumDataResponse,
  GeoDataResponse,
  LineDataResponse,
  BarDataResponse,
} from './type';
enum API {
  GET_NUM_DATA = '/admin/analysis/getNumData', //滚动数字数据 总访问量/总文章量/总评论量/总点赞量
  GET_GEO_DATA = '/admin/analysis/getGeoData', //访客地图数据
  GET_LINE_DATA = '/admin/analysis/getLineData',
  GET_BAR_DATA = '/admin/analysis/getBarData',
  GET_PIE_DATA = '/admin/analysis/getPieData',
}
export const getNumData = (): Promise<NumDataResponse> =>
  request.get(API.GET_NUM_DATA);

export const getGeoData = (): Promise<GeoDataResponse> =>
  request.get(API.GET_GEO_DATA);

export const getLineData = (): Promise<LineDataResponse> =>
  request.get(API.GET_LINE_DATA);

export const getBarData = (): Promise<BarDataResponse> =>
  request.get(API.GET_BAR_DATA);

export const getPieData = (): Promise<CommonResponse> =>
  request.get(API.GET_PIE_DATA);
