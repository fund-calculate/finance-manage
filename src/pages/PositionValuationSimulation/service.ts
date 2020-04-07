import request from '@/utils/request';
import { TableListParams } from './data.d';

export async function queryRule(params?: TableListParams) {
  return request('/fund-position/valuationEarnings', {
    params,
  });
}

export async function queryEarnings() {
  return request('/fund-position/valuationEarnings');
}

export async function removeRule(params: { key: number[] }) {
  return request('/fund-position/valuation', {
    method: 'POST',
    data: {
      ...params,
      method: 'delete',
    },
  });
}

export async function addRule(params: TableListParams) {
  return request('/fund-position/valuation', {
    method: 'POST',
    data: {
      ...params,
      method: 'post',
    },
  });
}

export async function updateRule(params: TableListParams) {
  return request('/fund-position/valuation', {
    method: 'POST',
    data: {
      ...params,
      method: 'update',
    },
  });
}
