import request from '@/utils/request';

export async function queryEarnings() {
  return request('/earnings-statistical/list');
}

export async function montyEarningsList() {
  return request('/earnings-statistical/montyEarningsList');
}
