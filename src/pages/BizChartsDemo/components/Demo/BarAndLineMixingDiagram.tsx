// data-set 可以按需引入，除此之外不要引入别的包
import React from 'react';
import { Chart, Axis, Tooltip, Geom, Legend, View } from 'bizcharts';
import DataSet from '@antv/data-set';
import Curved from "@/pages/BizChartsDemo/components/Demo/OrdinaryLineGraph";

console.log(DataSet)

// 下面的代码会被作为 cdn script 注入 注释勿删
// CDN START
const data = [
  { label: '0.1', 蚂蚁财富: -2800, 天天基金: 2800, 招商证券: 2260, 总收益: 2 },
  { label: '0.2', 蚂蚁财富: 1800, 天天基金: 1800, 招商证券: 1300, 总收益: 3 },
  { label: '0.3', 蚂蚁财富: 950, 天天基金: 950, 招商证券: 900, 总收益: 5 },
  { label: '0.4', 蚂蚁财富: 500, 天天基金: 500, 招商证券: -390, 总收益: 1 },
  { label: '0.5', 蚂蚁财富: 170, 天天基金: 170, 招商证券: 100, 总收益: 3 },
  { label: '0.6', 蚂蚁财富: 170, 天天基金: 170, 招商证券: 100, 总收益: 3 },
  { label: '0.7', 蚂蚁财富: 170, 天天基金: -3700, 招商证券: -100, 总收益: 3 },
  { label: '0.8', 蚂蚁财富: 170, 天天基金: 170, 招商证券: 100, 总收益: 3 },
  { label: '0.9', 蚂蚁财富: 170, 天天基金: 170, 招商证券: 100, 总收益: 3 },
  { label: '1.0', 蚂蚁财富: 170, 天天基金: 170, 招商证券: 100, 总收益: 3 },
  { label: '未评分', 蚂蚁财富: 170, 天天基金: 170, 招商证券: 100, 总收益: 3 },
];
const ds = new DataSet();
ds.setState('type', '');
const dv = ds.createView().source(data);

dv.transform({
  type: 'fold',
  fields: ['蚂蚁财富', '天天基金', '招商证券'], // 展开字段集
  key: 'type', // key字段
  value: 'value', // value字段
})
  .transform({
    type: 'filter',
    callback: (d) => {
      console.log(ds.state.type);
      return d.type !== ds.state.type;
    }
  });
const scale = {
  总收益: {
    type: 'linear',
    min: -100,
    max: 100,
  },
};

let chartIns = null;

const getG2Instance = (chart) => {
  chartIns = chart;
};

const legendItems = [
  { value: '蚂蚁财富', marker: { symbol: 'square', fill: '#3182bd', radius: 5 } },
  { value: '天天基金', marker: { symbol: 'square', fill: '#41a2fc', radius: 5 } },
  { value: '招商证券', marker: { symbol: 'square', fill: '#54ca76', radius: 5 } },
  { value: '总收益', marker: { symbol: 'hyphen', stroke: '#fad248', radius: 5, lineWidth: 3 } },
];

class BarAndLineMixingDiagram extends React.Component {
  render() {
    console.log(dv)
    return (<Chart height={400} width={500} forceFit data={dv} scale={scale} padding="auto" onGetG2Instance={(c) => {
        this.chart = c;
      }}>
        <Legend
          custom
          allowAllCanceled
          items={legendItems}
          onClick={(ev) => {
            setTimeout(() => {
              const checked = ev.checked;
              const value = ev.item.value;
              if (value === '总收益') {
                if (checked) {
                  this.chart.get('views')[0].get('geoms')[0].hide()
                } else {
                  this.chart.get('views')[0].get('geoms')[0].show()
                }
              }
              const newLegend = legendItems.map((d) => {
                if (d.value === value) {
                  d.checked = checked
                }
                return d;
              })
              this.chart.filter('type', (t) => {
                const legendCfg = newLegend.find(i => i.value == t);
                return legendCfg && legendCfg.checked;
              });

              this.chart.legend({
                items: newLegend
              })
              this.chart.repaint();
              // console.log(this.view)
            },0)
          }}
        />
        <Axis name="label" />
        <Axis name="value" position={'left'} />
        <Tooltip />
        <Geom
          type="interval"
          position="label*value"
          color={['type', (value) => {
            if (value === '蚂蚁财富') {
              return '#2b6cbb';
            }
            if (value === '天天基金') {
              return '#41a2fc';
            }
            if (value === '招商证券') {
              return '#54ca76';
            }
          }]}
          adjust={[{
            type: 'dodge',
            marginRatio: 1 / 32,
          }]}
        />
        <View data={data} >
          <Axis name="总收益" position="right" />
          <Geom type="line" position="label*总收益" color="#fad248" size={3} />
        </View>
      </Chart>
    );
  }
}

// CDN END
export default BarAndLineMixingDiagram;
