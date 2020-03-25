import {PageHeaderWrapper} from '@ant-design/pro-layout';
import React, {useState, useEffect} from 'react';
import {Chart, Geom, Axis, Tooltip, Legend} from 'bizcharts';
import {Spin} from 'antd';
import styles from './index.less';
import Curved from "./components/Demo/OrdinaryLineGraph";
import BarAndLineMixingDiagram from "@/pages/BizChartsDemo/components/Demo/BarAndLineMixingDiagram";
import StockFigure from "@/pages/BizChartsDemo/components/Demo/StockFigure";

// 数据源
const data = [
  {genre: 'Sports', sold: 275, income: 2300},
  {genre: 'Strategy', sold: 115, income: 667},
  {genre: 'Action', sold: 120, income: 982},
  {genre: 'Shooter', sold: 350, income: 5271},
  {genre: 'Other', sold: 150, income: 3710}
];

// 定义度量
const cols = {
  sold: {alias: '销售量'},
  genre: {alias: '游戏种类'}
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
      <div style={{paddingTop: 100, textAlign: 'center'}}>
        <Spin spinning={loading} size="large"/>
      </div>

      <Curved/>
      <BarAndLineMixingDiagram/>
      <StockFigure/>

      <div id="mountNode">
        <Chart width={600} height={400} data={data} scale={cols}>
          <Axis name="genre" title/>
          <Axis name="sold" title/>
          <Legend position="top" dy={-20}/>
          <Tooltip/>
          <Geom type="interval" position="genre*sold" color="genre"/>
        </Chart>
      </div>
    </PageHeaderWrapper>
  );
};
