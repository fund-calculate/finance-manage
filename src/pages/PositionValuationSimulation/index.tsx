import '@ant-design/compatible/assets/index.css';
import {Divider, Card, Row, Col, Table, Tag} from 'antd';
import React, {Suspense, Component} from 'react';
import {GridContent} from '@ant-design/pro-layout';
import Trend from "@/pages/DashboardAnalysis/components/Trend";
import {Dispatch} from "redux";
import {connect} from "dva";
import {Line, StackedBar} from "@antv/g2plot";
import ReactG2Plot from 'react-g2plot';
import {TableListItem} from "./data";

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

    // const data1 = [
    //   { year: '1991', value: 3 },
    //   { year: '1992', value: 4 },
    //   { year: '1993', value: 3.5 },
    //   { year: '1994', value: 5 },
    //   { year: '1995', value: 4.9 },
    //   { year: '1996', value: 6 },
    //   { year: '1997', value: 7 },
    //   { year: '1998', value: 9 },
    //   { year: '1999', value: 13 },
    // ];
    //
    // const config1 = {
    //   title: {
    //     visible: true,
    //     text: '带数据点的折线图',
    //   },
    //   description: {
    //     visible: true,
    //     text: '将折线图上的每一个数据点显示出来，作为辅助阅读。',
    //   },
    //   forceFit: true,
    //   padding: 'auto',
    //   data1,
    //   xField: 'year',
    //   yField: 'value',
    //   point: {
    //     visible: true,
    //   },
    //   label: {
    //     visible: true,
    //     type: 'point',
    //   },
    // };

    return (
      <GridContent>
        <React.Fragment>
          {/*<ReactG2Plot className="test" Ctor={Line} config={config1}/>*/}
          <Row gutter={16}>
            <Col span={8}>
              <Card title="今日收益" bordered={false}>
                <Trend flag={todayGains < 0 ? 'down' : 'up'}>
                  <Tag style={{marginRight: 4}} color={todayGains < 0 ? "green" : "red"}>
                    {todayGains.toFixed(2)}元
                  </Tag>
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
