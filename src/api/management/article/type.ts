import type { CommonResponse, CommonListResponse } from '@/types/common';

export interface ArticleItem {
  id: number;
  title: string;
  cover_img: string;
  abstract: string;
  content: string;
  publish_date: string;
  last_edit_date: string;
  author_name: string;
  view: number;
  like: number;
  status: boolean; // 1: 公开, 0: 隐藏
  tag: Array<number>;
  top: boolean; // 1: 置顶, 0: 不置顶
  comment_count?: number;
}
// 文章列表模相应
export interface ArticleListResponse extends CommonListResponse {
  data: Array<ArticleItem>;
}
//新增文章请求
export interface AddArticleRequest {
  title: string;
  cover_img: string;
  abstract: string;
  content: string;
  // author_name: string;
  tag: Array<number>;
}
//修改文章请求
export interface UpgradeArticleRequest {
  id: number;
  title?: string;
  cover_img?: string;
  abstract?: string;
  content?: string;
  // author_name: string;
  tag?: Array<number>;
  top?: number;
  status?: number; // 1: 公开, 0: 隐藏
}

export interface TagItem {
  id: number;
  tag_name: string;
}
// 获取标签列表响应
export interface TagListResponse extends CommonResponse {
  data: Array<TagItem>;
}
//添加标签请求
export interface AddTagRequest {
  name: string;
}
