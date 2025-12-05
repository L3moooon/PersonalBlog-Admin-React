//通用列表请求类型断言
export interface SimpleCommonListRequest {
	pageNo: number;
	pageSize: number;
}

//带搜索的通用列表请求类型断言
export interface CommonListRequest extends SimpleCommonListRequest {
	searchKey: string;
	dateRange: Array<Date>;
}

//通用响应断言
export interface CommonResponse {
	code: number;
	msg: string;
}

//带分页的通用响应类型断言
export interface CommonListResponse extends CommonResponse {
	pagination: {
		pageNo: number;
		pageSize: number;
		total: number;
	};
}
