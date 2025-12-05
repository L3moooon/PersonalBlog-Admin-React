import {
	CommonResponse,
	CommonListResponse,
	CommonListRequest,
} from "@/types/common";

export interface CommentItem {
	id: number;
	article_id: number;
	user_id: number;
	parent_id: number | null;
	content: string;
	comment_date: string;
	edit_date: string;
	status: boolean;
	like_count: number;
}
export interface CommentListResponse extends CommonListResponse {
	data: Array<CommentItem>;
}
