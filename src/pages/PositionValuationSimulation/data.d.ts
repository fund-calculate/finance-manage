export interface FundTypeValuation {
  key: number;
  disabled?: boolean;
  holdRatio: number,
  money: number,
  type: string,
  earningsRatio: number,
  earningsPrices: number,
  valuationGains: number,
  holdShareMoney: number,
  todayGains: number
}

export interface Aggregation {
  // 今日收益
  todayGains: number;
  // 今日收益比例
  todayEarningsRatio: number;
  // 今日收益
  holdShareMoney: number;
  // 当前市值
  holdPrices: number;
  // 分类
  fundTypeValuation: FundTypeValuation[];
}

export interface TableListPagination {
  total: number;
  pageSize: number;
  current: number;
}

export interface TableListData {
  list: TableListItem[];
  pagination: Partial<TableListPagination>;
}

export interface TableListParams {
  sorter?: string;
  status?: string;
  name?: string;
  desc?: string;
  key?: number;
  pageSize?: number;
  currentPage?: number;
}
