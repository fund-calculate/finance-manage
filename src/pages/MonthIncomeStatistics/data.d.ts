export interface Earnings {
  type: string;
  earningsTime: string;
  earningsPrices: number;
  createTime: string;
}

export interface BasicProfileDataType {
  data: Earnings[];
}
