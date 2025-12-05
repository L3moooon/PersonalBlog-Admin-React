import request from "@/utils/request";
import type {
	SimpleCommonListRequest,
	CommonListResponse,
} from "@/types/common";
import type { FriendshipListResponse } from "./type";
enum API {
	GET_FRIENDSHIP_LIST = "/admin/friendship/getFriendshipList", //获取友链列表
}
//获取友链列表
export const getFriendshipList = (
	params: SimpleCommonListRequest
): Promise<FriendshipListResponse> =>
	request.get(API.GET_FRIENDSHIP_LIST, { params });
