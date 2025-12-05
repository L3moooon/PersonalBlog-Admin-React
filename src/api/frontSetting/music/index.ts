import request from '@/utils/request';
import type { CommonListRequest, CommonListResponse } from '@/types/common';

enum API {
  GET_MUSIC_LIST = '/admin/music/getMusicList', //获取音乐列表
  DELETE_MUSIC = '/admin/music/deleteMusic', //删除音乐
}
//获取访客列表
export const getMusicList = (
  params: CommonListRequest
): Promise<CommonListResponse> => request.get(API.GET_MUSIC_LIST, { params });

export const deleteMusic = (id: number): Promise<CommonListResponse> =>
  request.delete(`${API.DELETE_MUSIC}/${id}`);
