import request from '@/utils/request';

export async function queryEarnings() {
  return request('/earnings-statistical/accumulatedEarnings');
}
