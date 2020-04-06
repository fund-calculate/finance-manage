import {GridContent, PageHeaderWrapper} from '@ant-design/pro-layout';
import React, {Component, Suspense} from 'react';
import {Card, Col, Row} from 'antd';
import {Line, GroupedColumn} from '@antv/g2plot'
import ReactG2Plot from 'react-g2plot';
import {Dispatch} from "redux";
import {connect} from "dva";
import {BasicProfileDataType} from "./data.d";

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
    dispatch({
      type: 'earningsModel/fetchCurrent',
    });
  }


  render() {
    const {earningsModel, loading} = this.props;
    const {data = [], montyEarningsList = []} = earningsModel;
    // const {data = []} = earningsModel;
    // const data = [];
    // const montyEarningsList = [];
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


    const config1 = {
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


    const config2 = {
      title: {
        visible: true,
        text: '分组柱状图-缩略轴',
      },
      description: {
        visible: true,
        text: '缩略轴 (slider) 交互适用于数据较多，用户希望关注数据集中某个特殊区间的场景。',
      },
      forceFit: true,
      montyEarningsList,
      xField: 'earningsTime',
      yField: 'earningsPrices',
      groupField: 'type',
      // color: ['#1ca9e6', '#f88c24','#517CF3','#44A97B','#536286'],
      color: ['#1ca9e6', '#f88c24', '#517CF3'],
      xAxis: {
        visible: true,
        label: {
          visible: true,
          autoHide: true,
        },
      },
      interactions: [
        {
          type: 'slider',
          cfg: {
            start: 0.4,
            end: 0.42,
          },
        },
      ],
    };

    return (
      <GridContent>
        <React.Fragment>

          <Suspense fallback={null}>
            <Card bordered={false}>
              <ReactG2Plot className="your-classname" Ctor={Line} config={config}/>
            </Card>
          </Suspense>

          <Row gutter={24} type="flex" style={{marginTop: 24,}}>
            <Col xl={12} lg={24} md={24} sm={24} xs={24}>
              <Suspense fallback={null}>
                <Card bordered={false}>
                  <ReactG2Plot className="your-classname1" Ctor={GroupedColumn} config={config2}/>
                </Card>
              </Suspense>
            </Col>
            <Col xl={12} lg={24} md={24} sm={24} xs={24}>
              <Suspense fallback={null}>
                <Card bordered={false}>
                  <ReactG2Plot className="your-classname" Ctor={Line} config={config1}/>
                </Card>
              </Suspense>
            </Col>
          </Row>

        </React.Fragment>
      </GridContent>
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

