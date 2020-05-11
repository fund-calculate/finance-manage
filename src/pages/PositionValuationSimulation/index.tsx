import '@ant-design/compatible/assets/index.css';
import {Divider, Card, Row, Col, Table, Tag, Statistic, Badge, Dropdown} from 'antd';
import React, {Suspense, Component} from 'react';
import {GridContent} from '@ant-design/pro-layout';
import Trend from "@/pages/DashboardAnalysis/components/Trend";
import {Dispatch} from "redux";
import {connect} from "dva";
import {Aggregation} from "./data";
import {
  ArrowDownOutlined,
  ArrowUpOutlined,
  FrownTwoTone,
  LikeTwoTone,
  SmileTwoTone,
  DislikeTwoTone, MehTwoTone, PropertySafetyTwoTone
} from "@ant-design/icons/lib";

interface ProfileBasicProps {
  loading: boolean;
  dispatch: Dispatch<any>;
  earningsModel: Partial<Aggregation>;
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
      type: 'earningsModel/setup',
    });
  }

  render() {
    const {earningsModel, loading} = this.props;
    const {aggregation = {}} = earningsModel;
    const {fundTypeValuation = [], todayGains = 0, todayEarningsRatio = 0, holdShareMoney = 0, holdPrices = 0} = aggregation;

    var earningsPrices = (holdShareMoney - holdPrices).toFixed(2);
    var earningsRatio = (earningsPrices / holdPrices * 100).toFixed(2);

    const columns = [
      {
        title: '基金类型',
        dataIndex: 'type',
      },
      {
        title: '当前估值涨幅',
        dataIndex: 'valuationGains',
        sorter: (a, b) => a.valuationGains - b.valuationGains,
        render: (text: React.ReactNode, record: { valuationGains: number }) => (
          <Trend flag={record.valuationGains < 0 ? 'down' : 'up'}>
            <Tag style={{marginRight: 4}} color={record.valuationGains < 0 ? "green" : "red"}>{text}%</Tag>
          </Trend>
        ),
      },
      {
        title: '今日收益',
        dataIndex: 'todayGains',
        sorter: (a, b) => a.todayGains - b.todayGains,
        render: (text: React.ReactNode, record: { todayGains: number }) => (
          <Trend flag={record.todayGains < 0 ? 'down' : 'up'}>
            <Tag style={{marginRight: 4}} color={record.todayGains < 0 ? "green" : "red"}>{text}元</Tag>
          </Trend>
        ),
      },
      {
        title: '总持仓成本',
        dataIndex: 'money',
        sorter: (a, b) => a.money - b.money,
        render: (text: React.ReactNode) => (
          <span>{text}元</span>
        ),
      },
      {
        title: '当前市值(昨天)',
        dataIndex: 'holdShareMoney',
        sorter: (a, b) => a.holdShareMoney - b.holdShareMoney,
        render: (text: React.ReactNode) => (
          <span>{text}元</span>
        ),
      },
      {
        title: '持仓比例',
        dataIndex: 'holdRatio',
        sorter: (a, b) => a.holdRatio - b.holdRatio,
        render: (text: React.ReactNode) => (
          <span>{text}%</span>
        ),
      },
      {
        title: '收益金额',
        dataIndex: 'earningsPrices',
        sorter: (a, b) => a.earningsPrices - b.earningsPrices,
        render: (text: React.ReactNode) => (
          <span style={{color: text < 0 ? '#52c41a' : '#f5222d'}}>{text}元</span>
        ),
      },
      {
        title: '收益比例',
        dataIndex: 'earningsRatio',
        sorter: (a, b) => a.earningsRatio - b.earningsRatio,
        render: (text: React.ReactNode) => (
          <span style={{color: text < 0 ? '#52c41a' : '#f5222d'}}>{text}%</span>
        ),
      },
      {
        title: '操作',
        dataIndex: 'option',
        valueType: 'option',
        render: (_, record) => (
          <>
            <a onClick={() => {
              handleUpdateModalVisible(true);
              setStepFormValues(record);
            }}>配置</a>
            <Divider type="vertical"/>
            <a href="">买入提醒</a>
          </>
        ),
      },
    ];

    return (
      <GridContent>
        <React.Fragment>
          <Row gutter={16} style={{marginTop: -24,}}>
            <Col xl={8} lg={24} md={24} sm={24} xs={24} style={{marginTop: 24,}}>
              <Card title="今日收益" bordered={false}>
                <Row gutter={24}>
                  <Col xl={12} lg={24} md={24} sm={24} xs={24}>
                    <Statistic
                      title="今日收益(更新时间:9:30)"
                      value={todayGains}
                      precision={2}
                      valueStyle={{color: todayGains < 0 ? '#3f8600' : '#cf1322'}}
                      prefix={todayGains < 0 ? <ArrowDownOutlined/> : <ArrowUpOutlined/>}
                      suffix="元"
                    />
                  </Col>
                  <Col xl={12} lg={24} md={24} sm={24} xs={24}>
                    <Statistic
                      title="收益比例"
                      value={todayEarningsRatio}
                      precision={2}
                      valueStyle={{color: todayEarningsRatio < 0 ? '#3f8600' : '#cf1322'}}
                      prefix={todayEarningsRatio < 0 ? <ArrowDownOutlined/> : <ArrowUpOutlined/>}
                      suffix="%"
                    />
                  </Col>
                </Row>
              </Card>
            </Col>
            <Col xl={8} lg={24} md={24} sm={24} xs={24} style={{marginTop: 24,}}>
              <Card title="总收益" bordered={false}>
                <Row gutter={24}>
                  <Col xl={12} lg={24} md={24} sm={24} xs={24}>
                    <Statistic
                      title="总收益"
                      value={earningsPrices}
                      prefix={earningsPrices < 0 ? <DislikeTwoTone twoToneColor='#52c41a'/> :
                        <LikeTwoTone twoToneColor='#eb2f96'/>}
                      suffix="元"
                    />
                  </Col>
                  <Col xl={12} lg={24} md={24} sm={24} xs={24}>
                    <Statistic
                      title="总收益率"
                      value={earningsRatio}
                      prefix={earningsRatio < 0 ? <FrownTwoTone twoToneColor='#52c41a'/> :
                        <SmileTwoTone twoToneColor='#eb2f96'/>}
                      suffix="%"
                    />
                  </Col>
                </Row>
              </Card>
            </Col>
            <Col xl={8} lg={24} md={24} sm={24} xs={24} style={{marginTop: 24,}}>
              <Card title="持仓金额" bordered={false}>
                <Row gutter={24}>
                  <Col xl={12} lg={24} md={24} sm={24} xs={24}>
                    <Statistic title="市值" value={holdShareMoney}
                               prefix={holdShareMoney < holdPrices ? <FrownTwoTone twoToneColor='#52c41a'/> :
                                 <SmileTwoTone twoToneColor='#eb2f96'/>} suffix="元"/>
                  </Col>
                  <Col xl={12} lg={24} md={24} sm={24} xs={24}>
                    <Statistic title="持仓金额" value={holdPrices} prefix={<PropertySafetyTwoTone/>} suffix="元"/>
                  </Col>
                </Row>
              </Card>
            </Col>
          </Row>

          <Suspense fallback={null}>
            <Card bordered={false} style={{marginTop: 24,}}>
              <Table columns={columns} dataSource={fundTypeValuation} pagination={{pageSize: 50}}/>
            </Card>
          </Suspense>
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
    earningsModel: Partial<Aggregation>;
    loading: { effects: { [key: string]: boolean } };
  }) => ({
    earningsModel,
    loading: loading.effects['earningsModel/fetchBasic'],
  }),
)(ProfileBasic);
