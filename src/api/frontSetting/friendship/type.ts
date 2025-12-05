import { CommonListResponse } from "@/types/common";

export interface Friend {
	id: number;
	name: string;
	url: string;
	introduce: string;
	cover: string;
	email: string;
	status: number;
	apply_time: string;
	pass_time: string;
}
export interface FriendshipListResponse extends CommonListResponse {
	data: Array<Friend>;
}
