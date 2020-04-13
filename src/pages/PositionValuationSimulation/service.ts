import request from '@/utils/request';

// 持仓估值(聚合)
export async function queryAggregation() {
  return request('/fund-valution/aggregation');
}
