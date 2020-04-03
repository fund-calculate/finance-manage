export interface TableListItem {
  key: number;
  disabled?: boolean;
  fundCode: string;
  fundName: string;
  worth: string;
  valuation: string;
  valuationGains: number;
  valuationDate: Date;
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
