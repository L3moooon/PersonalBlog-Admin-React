import request from '@/api/index';
import type { CommonResponse, CommonListRequest } from '@/types/common';
import type {
  ArticleListResponse,
  AddArticleRequest,
  UpgradeArticleRequest,
  TagListResponse,
  AddTagRequest,
} from '@/api/content/article/type';

enum API {
  GET_ARTICLE_LIST = '/admin/article/getArticleList', //获取文章列表
  ADD_ARTICLE = '/admin/article/addArticle', //新增文章
  UPDATE_ARTICLE = '/admin/article/updateArticle', //修改文章
  DELETE_ARTICLE = '/admin/article/deleteArticle', //删除文章
  GET_TAG = '/admin/article/getTagList', //获取标签列表
  ADD_TAG_LIST = '/admin/article/addTag', //新增标签
  UPDATE_TAG = '/admin/article/updateTag', //修改标签
  DELETE_TAG = '/admin/article/deleteTag', //删除标签
}

export const getArticleList = (
  params: CommonListRequest
): Promise<ArticleListResponse> =>
  request.get(API.GET_ARTICLE_LIST, { params });

export const addArticle = (data: AddArticleRequest): Promise<CommonResponse> =>
  request.post(API.ADD_ARTICLE, data);

export const updateArticle = (
  data: Partial<UpgradeArticleRequest>
): Promise<CommonResponse> => request.patch(API.UPDATE_ARTICLE, data);

export const deleteArticle = (id: number): Promise<CommonResponse> =>
  request.delete(`${API.DELETE_ARTICLE}/${id}`);

export const getTagList = (): Promise<TagListResponse> =>
  request.get(API.GET_TAG);

export const addTag = (data: AddTagRequest): Promise<CommonResponse> =>
  request.post(API.ADD_TAG_LIST, data);

export const delTag = (id: number): Promise<CommonResponse> =>
  request.delete(`${API.DELETE_TAG}/${id}`);
