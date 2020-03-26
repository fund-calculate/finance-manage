import moment from 'moment';
import { AnalysisData, RadarData, VisitDataType } from './data.d';

// mock data
const visitData: VisitDataType[] = [];
const beginDay = new Date().getTime();

const fakeY = [10270.55, 7937.17, 10049.84, 10206.99, 8496.63, 8837.71, 10654.20, 14654.20, 16282.17, 18117.95, 23447.29, 27315.49, 40753.94, 38628.58, 39024.14, 39240.60, 40399.86];

for (let i = 0; i < fakeY.length; i += 1) {
  visitData.push({
    x: moment(new Date(beginDay + 1000 * 60 * 60 * 24 * i)).format('YYYY-MM-DD'),
    y: fakeY[i],
  });
}

const visitData2 = [];
const fakeY2 = [1, 6, 4, 8, 3, 7, 2];
for (let i = 0; i < fakeY2.length; i += 1) {
  visitData2.push({
    x: moment(new Date(beginDay + 1000 * 60 * 60 * 24 * i)).format('YYYY-MM-DD'),
    y: fakeY2[i],
  });
}

const salesData = [];
for (let i = 0; i < 12; i += 1) {
  salesData.push({
    x: `${i + 1}月`,
    y: Math.floor(Math.random() * 1000) + 200,
  });
}
const searchData = [];
for (let i = 0; i < 50; i += 1) {
  searchData.push({
    index: i + 1,
    keyword: `搜索关键词-${i}`,
    count: Math.floor(Math.random() * 1000),
    range: Math.floor(Math.random() * 100),
    status: Math.floor((Math.random() * 10) % 2),
  });
}
const salesTypeData = [
  {
    x: '5G通信',
    y: 500,
  },
  {
    x: '5G芯片',
    y: 7000,
  },
  {
    x: '半导体芯片',
    y: 0,
  },
  {
    x: '人工智能半导体',
    y: 2000,
  },
  {
    x: '新能源汽车',
    y: 8000,
  },
  {
    x: '科技',
    y: 4000,
  },
  {
    x: '沪深300',
    y: 6000,
  },
  {
    x: '中证500',
    y: 3000,
  },
  {
    x: '中证银行',
    y: 1500,
  },
  {
    x: '创业板',
    y: 150,
  },
  // {
  //   x: '金融证券',
  //   y: 500,
  // },
  // {
  //   x: '医疗',
  //   y: 1500,
  // },
  // {
  //   x: '军工',
  //   y: 0,
  // },
  // {
  //   x: '白酒',
  //   y: 1000,
  // },
  // {
  //   x: '基建',
  //   y: 2000,
  // },
  // {
  //   x: '保险',
  //   y: 2500,
  // },
  // {
  //   x: '债券',
  //   y: 0,
  // },
  // {
  //   x: '美股',
  //   y: 2800,
  // },
  // {
  //   x: '其他',
  //   y: 1000,
  // },
];

const salesTypeDataOffline = [
  {
    x: '海富通股票混合',
    y: 3000,
  },
  {
    x: '诺安成长混合',
    y: 3000,
  },
  {
    x: '广发双擎升级混合',
    y: 1000,
  },
];

const salesTypeDataOnline = [
  {
    x: '易方达沪深300ETF联接A',
    y: 6000,
  },
];

const offlineData = [];
for (let i = 0; i < 10; i += 1) {
  offlineData.push({
    name: `Stores ${i}`,
    cvr: Math.ceil(Math.random() * 9) / 10,
  });
}
const offlineChartData = [];
for (let i = 0; i < 20; i += 1) {
  offlineChartData.push({
    x: new Date().getTime() + 1000 * 60 * 30 * i,
    y1: Math.floor(Math.random() * 100) + 10,
    y2: Math.floor(Math.random() * 100) + 10,
  });
}

const radarOriginData = [
  {
    name: '个人',
    ref: 10,
    koubei: 8,
    output: 4,
    contribute: 5,
    hot: 7,
  },
  {
    name: '团队',
    ref: 3,
    koubei: 9,
    output: 6,
    contribute: 3,
    hot: 1,
  },
  {
    name: '部门',
    ref: 4,
    koubei: 1,
    output: 6,
    contribute: 5,
    hot: 7,
  },
];

const radarData: RadarData[] = [];
const radarTitleMap = {
  ref: '引用',
  koubei: '口碑',
  output: '产量',
  contribute: '贡献',
  hot: '热度',
};
radarOriginData.forEach(item => {
  Object.keys(item).forEach(key => {
    if (key !== 'name') {
      radarData.push({
        name: item.name,
        label: radarTitleMap[key],
        value: item[key],
      });
    }
  });
});

const getFakeChartData: AnalysisData = {
  visitData,
  visitData2,
  salesData,
  searchData,
  offlineData,
  offlineChartData,
  salesTypeData,
  salesTypeDataOnline,
  salesTypeDataOffline,
  radarData,
};

export default {
  'GET  /api/fake_chart_data': getFakeChartData,
};
