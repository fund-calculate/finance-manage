import { PageHeaderWrapper } from '@ant-design/pro-layout';
import React, { useState, useEffect } from 'react';
import { Spin, Row, Col } from 'antd';
import styles from './index.less';
export default () => {
  const [loading, setLoading] = useState<boolean>(true);
  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 3000);
  }, []);
  return (
    <PageHeaderWrapper content="这是一个新页面，从这里进行开发！" className={styles.main}>
      <Row>
        <Col
          span={12}
          style={{
            minHeight: 400,
            padding: 16,
            borderRight: '1px solid #DDD',
          }}
        >
          INSERT_BLOCK_PLACEHOLDER:Col 12
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
      <div
        style={{
          paddingTop: 100,
          textAlign: 'center',
        }}
      >
        <Spin spinning={loading} size="large" />
      </div>
    </PageHeaderWrapper>
  );
};
