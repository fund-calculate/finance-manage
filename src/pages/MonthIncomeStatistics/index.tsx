import {PageHeaderWrapper} from '@ant-design/pro-layout';
import React, {Component} from 'react';
import {Card} from 'antd';
import {Line} from '@antv/g2plot'
import ReactG2Plot from 'react-g2plot';
import {Dispatch} from "redux";
import {connect} from "dva";
import {Earnings, BasicProfileDataType} from "./data.d";

// const data = [
//   {
//     date: '2018/8',
//     type: 'download',
//     name: '蚂蚁财富',
//     value: 4623,
//   },
//   {
//     date: '2018/7',
//     type: 'register',
//     name: '天天基金',
//     value: 2208,
//   },
//   {
//     date: '2018/8',
//     type: 'bill',
//     name: '招商证券',
//     value: 182,
//   },
// ];

interface ProfileBasicProps {
  loading: boolean;
  dispatch: Dispatch<any>;
  earningsModel: BasicProfileDataType;
}

interface ProfileBasicState {
  visible: boolean;
}

class ProfileBasic extends Component<ProfileBasicProps, ProfileBasicState> {
  componentDidMount() {
    const {dispatch} = this.props;
    dispatch({
      type: 'earningsModel/fetchBasic',
    });
  }

  render() {

    const {earningsModel, loading} = this.props;
    const {data} = earningsModel;

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
      xField: 'earningsTime',
      yField: 'earningsPrices',
      yAxis: {
        label: {
          // 数值格式化为千分位
          formatter: (v) => `${v}`.replace(/\d{1,3}(?=(\d{3})+$)/g, (s) => `${s},`),
        },
      },
      legend: {
        position: 'right-top',
      },
      seriesField: 'type',
      responsive: true,
    };

    return (
      <PageHeaderWrapper>
        <Card bordered={false}>
          <ReactG2Plot
            className="your-classname"
            Ctor={Line}
            config={config}
          />
        </Card>
      </PageHeaderWrapper>
    );
  }
}

export default connect(
  ({
     earningsModel,
     loading,
   }: {
    earningsModel: BasicProfileDataType;
    loading: {
      effects: { [key: string]: boolean };
    };
  }) => ({
    earningsModel,
    loading: loading.effects['earningsModel/fetchBasic'],
  }),
)(ProfileBasic);

