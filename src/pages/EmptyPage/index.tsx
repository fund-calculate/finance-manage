import {PageHeaderWrapper} from '@ant-design/pro-layout';
import React from 'react';
import styles from './index.less';
import {TimelineChart} from "./components/Charts";


export default () => {

  // 表格
  const chartData = [];
  for (let i = 0; i < 20; i += 1) {
    chartData.push({
      // 时间轴
      x: new Date().getTime() + 1000 * 60 * 30 * i,
      y1: Math.floor(Math.random() * 100) + 1000,
      y2: Math.floor(Math.random() * 100) + 10,
    });
  }

  const chartData1 = [
    {
      x: new Date().getTime() + 1000 * 60 * 60 * 24,
      y1: 3,
      y2: 1
    }, {
      x: new Date().getTime() + 1000 * 60 * 60 * 24 * 2,
      y1: 3,
      y2: 4
    }, {
      x: new Date().getTime() + 1000 * 60 * 60 * 24 * 3,
      y1: 0,
      y2: 1
    }, {
      x: new Date().getTime() + 1000 * 60 * 60 * 24 * 4,
      y1: 3,
      y2: 2
    }
  ];

  return (
    <PageHeaderWrapper className={styles.main}>
      <TimelineChart height={400} data={chartData1} titleMap={{y1: '蚂蚁财富', y2: '天天基金'}}/>
      <TimelineChart height={400} data={chartData} titleMap={{y1: '蚂蚁财富', y2: '天天基金'}}/>
    </PageHeaderWrapper>
  );
};

