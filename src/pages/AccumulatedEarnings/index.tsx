import {GridContent} from '@ant-design/pro-layout';
import React, {Component, Suspense} from 'react';
import {Card} from 'antd';
import {Line} from '@antv/g2plot'
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
  }

  render() {

    const {earningsModel, loading} = this.props;
    const {data} = earningsModel;

    const config = {
      title: {
        visible: true,
        text: '累计收益',
      },
      description: {
        visible: true,
        text: '历史全部类型收益总和走势。',
      },
      forceFit: true,
      padding: 'auto',
      data,
      xField: 'earningsTime',
      yField: 'accumulatedEarnings',
      point: {
        visible: true,
      },
      label: {
        visible: true,
        type: 'point',
      },
    };

    const config2 = {
      title: {
        visible: true,
        text: '月收益',
      },
      description: {
        visible: true,
        text: '每月各类收益总和。',
      },
      forceFit: true,
      padding: 'auto',
      data,
      xField: 'earningsTime',
      yField: 'earningsPrices',
      point: {
        visible: true,
      },
      label: {
        visible: true,
        type: 'point',
      },
    };
    return (
      <GridContent>
        <React.Fragment>

          <Suspense fallback={null}>
            <Card bordered={false}>
              <ReactG2Plot className="your-classnametest" Ctor={Line} config={config}/>
            </Card>
          </Suspense>

          <Suspense fallback={null} >
            <Card bordered={false} style={{marginTop: 24}}>
              <ReactG2Plot className="your-classnametest1" Ctor={Line} config={config2}/>
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
    earningsModel: BasicProfileDataType;
    loading: {
      effects: { [key: string]: boolean };
    };
  }) => ({
    earningsModel,
    loading: loading.effects['earningsModel/fetchBasic'],
  }),
)(ProfileBasic);
