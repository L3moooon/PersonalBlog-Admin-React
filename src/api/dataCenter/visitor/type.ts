import type { CommonListResponse } from '@/types/common';

export interface Visitor {
  id: number;
  identify: string;
  name: string;
  portrait: string;
  ip: string;
  address: {
    city: string;
    country: string;
    province: string;
    isp: string;
  };
  agent: string;
  create_time: string;
  last_login_time: string;
  visited_count: number;
}

export interface VisitorListResponse extends CommonListResponse {
  data: Array<Visitor>;
}
