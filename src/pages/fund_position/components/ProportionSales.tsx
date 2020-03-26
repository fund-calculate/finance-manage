import { Card, Radio } from 'antd';

import { FormattedMessage } from 'umi-plugin-react/locale';
import { RadioChangeEvent } from 'antd/es/radio';
import React from 'react';
import { VisitDataType } from '../data.d';
import { Pie } from './Charts';
import Yuan from '../utils/Yuan';
import styles from '../style.less';

const ProportionSales = ({
  dropdownGroup,
  salesType,
  loading,
  salesPieData,
  handleChangeSalesType,
}: {
  loading: boolean;
  dropdownGroup: React.ReactNode;
  salesType: 'all' | 'online' | 'stores';
  salesPieData: VisitDataType[];
  handleChangeSalesType?: (e: RadioChangeEvent) => void;
}) => (
  <Card
    loading={loading}
    className={styles.salesCard}
    bordered={false}
    title={
      <FormattedMessage
        id="dashboardanalysis.analysis.the-proportion-of-sales"
        defaultMessage="The Proportion of Sales"
      />
    }
    style={{
      height: '100%',
    }}
    extra={
      <div className={styles.salesCardExtra}>
        {dropdownGroup}
        <div className={styles.salesTypeRadio}>
          <Radio.Group value={salesType} onChange={handleChangeSalesType}>
            <Radio.Button value="all">
              {/*<FormattedMessage id="dashboardanalysis.channel.all" defaultMessage="ALL" />*/}
              全部类别
            </Radio.Button>
            <Radio.Button value="stores">
              {/*<FormattedMessage id="dashboardanalysis.channel.stores" defaultMessage="Stores" />*/}
              5G芯片
            </Radio.Button>
            <Radio.Button value="online">
              {/*<FormattedMessage id="dashboardanalysis.channel.online" defaultMessage="Online" />*/}
              沪深300
            </Radio.Button>
          </Radio.Group>
        </div>
      </div>
    }
  >
    <div>
      <h4 style={{ marginTop: 8, marginBottom: 32 }}>
        {/*<FormattedMessage id="dashboardanalysis.analysis.sales" defaultMessage="Sales" />*/}
        基金持仓类别占比
      </h4>
      <Pie
        hasLegend
        // subTitle={<FormattedMessage id="dashboardanalysis.analysis.sales" defaultMessage="Sales" />}
        subTitle="总金额"
        total={() => <Yuan>{salesPieData.reduce((pre, now) => now.y + pre, 0)}</Yuan>}
        data={salesPieData}
        valueFormat={value => <Yuan>{value}</Yuan>}
        height={248}
        lineWidth={4}
      />
    </div>
  </Card>
);

export default ProportionSales;
