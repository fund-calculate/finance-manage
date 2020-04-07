import '@ant-design/compatible/assets/index.css';
import {Divider, Card, Row, Col, Table} from 'antd';
import React, {Suspense, Component} from 'react';
import {GridContent} from '@ant-design/pro-layout';
import Trend from "@/pages/DashboardAnalysis/components/Trend";
import {Dispatch} from "redux";
import {TableListItem} from "./data";
import {connect} from "dva";


interface ProfileBasicProps {
  loading: boolean;
  dispatch: Dispatch<any>;
  earningsModel: TableListItem;
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
    const {data = []} = earningsModel;

    var todayGains = 0, holdShareMoney = 0, money = 0;
    for (var i in data) {
      todayGains = todayGains + data[i].todayGains;
      holdShareMoney = holdShareMoney + data[i].holdShareMoney;
      money = money + data[i].money;
    }

    const columns = [
      {
        title: '基金类型',
        dataIndex: 'type',
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
          <span>{text}元</span>
        ),
      },
      {
        title: '收益比例',
        dataIndex: 'earningsRatio',
        sorter: (a, b) => a.earningsRatio - b.earningsRatio,
        render: (text: React.ReactNode) => (
          <span>{text}%</span>
        ),
      },
      {
        title: '当前估值涨幅',
        dataIndex: 'valuationGains',
        sorter: (a, b) => a.valuationGains - b.valuationGains,
        render: (text: React.ReactNode, record: { valuationGains: number }) => (
          <Trend flag={record.valuationGains < 0 ? 'down' : 'up'}>
            <span style={{marginRight: 4}}>{text}%</span>
          </Trend>
        ),
      },
      {
        title: '今日收益',
        dataIndex: 'todayGains',
        sorter: (a, b) => a.todayGains - b.todayGains,
        render: (text: React.ReactNode, record: { todayGains: number }) => (
          <Trend flag={record.todayGains < 0 ? 'down' : 'up'}>
            <span style={{marginRight: 4}}>{text}元</span>
          </Trend>
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

          <Row gutter={16}>
            <Col span={8}>
              <Card title="今日收益" bordered={false}>
                <Trend flag={todayGains < 0 ? 'down' : 'up'}>
                  <span style={{marginRight: 4}}>{todayGains.toFixed(2)}元</span>
                </Trend>
              </Card>
            </Col>
            <Col span={8}>
              <Card title="市值" bordered={false}>
                <Trend flag={holdShareMoney < money ? 'down' : 'up'}>
                  <span style={{marginRight: 4}}>{holdShareMoney.toFixed(2)}元</span>
                </Trend>
              </Card>
            </Col>
            <Col span={8}>
              <Card title="持仓金额" bordered={false}>
                {money.toFixed(2)}元
              </Card>
            </Col>
          </Row>

          <Suspense fallback={null}>
            <Card bordered={false} style={{marginTop: 24,}}>
              <Table columns={columns} dataSource={data} pagination={{pageSize: 50}}/>
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
    earningsModel: TableListItem;
    loading: {
      effects: { [key: string]: boolean };
    };
  }) => ({
    earningsModel,
    loading: loading.effects['earningsModel/fetchBasic'],
  }),
)(ProfileBasic);
