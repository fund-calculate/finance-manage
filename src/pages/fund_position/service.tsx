import request from '@/utils/request';

export async function fakeChartData() {
  const response = request('/fund-position/proportionOfStatistical');
  // const response = request('/test/test');
  return response;
}
