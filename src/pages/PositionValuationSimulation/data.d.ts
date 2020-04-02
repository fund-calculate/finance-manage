export interface TableListItem {
  key: number;
  disabled?: boolean;
  // fundCode: string;
  // fundName: string;
  // earningsRatio: string;
  // earningsPrices: string;
  // holdShareMoney: string;
  // valuationGains: string;
  // todayGains: string;
  holdRatio: string,
  money: string,
  type: string,
  // funds: [
  //   {
  //     fundCode: string,
  //     fundName: string,
  //     holdPrices: string,
  //     holdRatio: string,
  //     type: string,
  //     earningsRatio: string,
  //     earningsPrices: string,
  //     holdShareMoney: string,
  //     valuationGains: string,
  //     todayGains: string
  //   }
  // ],
  earningsRatio: string,
  earningsPrices: string,
  valuationGains: string,
  holdShareMoney: string,
  todayGains: number
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
