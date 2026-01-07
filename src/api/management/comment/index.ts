import request from '@/api/index';
import type {
  CommonResponse,
  CommonListResponse,
  CommonListRequest,
} from '@/types/common';

enum API {
  GET_COMMENT_LIST = '/admin/comment/getComments', //获取评论列表
  CHANGE_COMMENT_STATUS = '/admin/comment/changeCommentStatus', //修改评论显示状态
  DELETE_COMMENT = '/admin/comment/delComment', //删除评论
}

export const getCommentList = (
  params: CommonListRequest
): Promise<CommonListResponse> => request.get(API.GET_COMMENT_LIST, { params });

export const changeCommentStatus = (data): Promise<CommonResponse> =>
  request.patch(API.CHANGE_COMMENT_STATUS, data);

export const deleteComment = (id: number): Promise<CommonResponse> =>
  request.delete(`${API.DELETE_COMMENT}/${id}`);
