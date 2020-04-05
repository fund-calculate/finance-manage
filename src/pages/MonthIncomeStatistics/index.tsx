import {PageHeaderWrapper} from '@ant-design/pro-layout';
import React, {useState, useEffect} from 'react';
import {Spin, Row, Col} from 'antd';
import {Line} from '@antv/g2plot'
import ReactG2Plot from 'react-g2plot';
import styles from './index.less';

const data = [
  {
    date: '2018/8',
    type: 'download',
    name: '蚂蚁财富',
    value: 4623,
  },
  {
    date: '2018/7',
    type: 'register',
    name: '天天基金',
    value: 2208,
  },
  {
    date: '2018/8',
    type: 'bill',
    name: '招商证券',
    value: 182,
  },
];

const config = {
  title: {
    visible: true,
    text: '月收益统计',
  },
  description: {
    visible: true,
    text: '按照不同收益分类显示统计，用于比对不同类型收益的趋势。',
  },
  padding: 'auto',
  forceFit: true,
  data,
  xField: 'date',
  yField: 'value',
  yAxis: {
    label: {
      // 数值格式化为千分位
      formatter: (v) => `${v}`.replace(/\d{1,3}(?=(\d{3})+$)/g, (s) => `${s},`),
    },
  },
  legend: {
    position: 'right-top',
  },
  seriesField: 'name',
  responsive: true,
};

export default () => {

  const [loading, setLoading] = useState<boolean>(true);
  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 3000);
  }, []);

  return (
    <PageHeaderWrapper className={styles.main}>

      <Row>
        <Col
          span={12}
          style={{
            minHeight: 400,
            padding: 16,
            borderRight: '1px solid #DDD',
          }}
        >
          INSERT_BLOCK_PLACEHOLDER:
          <ReactG2Plot
            className="your-classname"
            Ctor={Line}
            config={config}
          />
        </Col>
        <Col
          span={12}
          style={{
            minHeight: 400,
            padding: 16,
          }}
        >
          INSERT_BLOCK_PLACEHOLDER:Col 12
        </Col>
      </Row>

      <div style={{paddingTop: 100, textAlign: 'center'}}>
        <Spin spinning={loading} size="large"/>
      </div>
    </PageHeaderWrapper>
  );
};
