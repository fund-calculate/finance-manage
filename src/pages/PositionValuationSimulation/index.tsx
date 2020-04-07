import {DownOutlined, PlusOutlined} from '@ant-design/icons';
import {Form} from '@ant-design/compatible';
import '@ant-design/compatible/assets/index.css';
import {Button, Divider, Dropdown, Menu, message, Card, Row, Col} from 'antd';
import React, {useState, useRef, Suspense, Component} from 'react';
import {FormComponentProps} from '@ant-design/compatible/es/form';
import {GridContent} from '@ant-design/pro-layout';
import ProTable, {ProColumns, ActionType} from '@ant-design/pro-table';
import CreateForm from './components/CreateForm';
import UpdateForm, {FormValueType} from './components/UpdateForm';
import {TableListItem} from './data.d';
import {queryRule, updateRule, addRule, removeRule} from './service';
import Trend from "@/pages/DashboardAnalysis/components/Trend";
import PageLoading from "@/pages/DashboardAnalysis/components/PageLoading";
import {Dispatch} from "redux";
import {BasicProfileDataType} from "@/pages/MonthIncomeStatistics/data";

interface TableListProps extends FormComponentProps {
}

/**
 * 添加节点
 * @param fields
 */
const handleAdd = async (fields: FormValueType) => {
  const hide = message.loading('正在添加');
  try {
    await addRule({
      desc: fields.desc,
    });
    hide();
    message.success('添加成功');
    return true;
  } catch (error) {
    hide();
    message.error('添加失败请重试！');
    return false;
  }
};

/**
 * 更新节点
 * @param fields
 */
const handleUpdate = async (fields: FormValueType) => {
  const hide = message.loading('正在配置');
  try {
    await updateRule({
      name: fields.name,
      desc: fields.desc,
      key: fields.key,
    });
    hide();

    message.success('配置成功');
    return true;
  } catch (error) {
    hide();
    message.error('配置失败请重试！');
    return false;
  }
};

/**
 *  删除节点
 * @param selectedRows
 */
const handleRemove = async (selectedRows: TableListItem[]) => {
  const hide = message.loading('正在删除');
  if (!selectedRows) return true;
  try {
    await removeRule({
      key: selectedRows.map(row => row.key),
    });
    hide();
    message.success('删除成功，即将刷新');
    return true;
  } catch (error) {
    hide();
    message.error('删除失败，请重试');
    return false;
  }
};

const TableList: React.FC<TableListProps> = () => {
  const [createModalVisible, handleModalVisible] = useState<boolean>(false);
  const [updateModalVisible, handleUpdateModalVisible] = useState<boolean>(false);
  const [stepFormValues, setStepFormValues] = useState({});
  const actionRef = useRef<ActionType>();
  const columns: ProColumns<TableListItem>[] = [
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
          <a
            onClick={() => {
              handleUpdateModalVisible(true);
              setStepFormValues(record);
            }}
          >
            配置
          </a>
          <Divider type="vertical"/>
          <a href="">订阅警报</a>
        </>
      ),
    },
  ];

  return (
    <GridContent>
      <React.Fragment>

        <Suspense fallback={<PageLoading />}>
          <Row gutter={16}>
            <Col span={8}>
              <Card title="今日收益" bordered={false}>
                Card content
              </Card>
            </Col>
            <Col span={8}>
              <Card title="市值" bordered={false}>
                Card content
              </Card>
            </Col>
            <Col span={8}>
              <Card title="持仓金额" bordered={false}>
                Card content
              </Card>
            </Col>
          </Row>
        </Suspense>

        <ProTable<TableListItem>
          headerTitle="类型估值模拟收益"
          size="small"
          actionRef={actionRef}
          rowKey="key"
          style={{marginTop: 24,}}
          toolBarRender={(action, {selectedRows}) => [
            <Button icon={<PlusOutlined/>} type="primary" onClick={() => handleModalVisible(true)}>添加</Button>,
            selectedRows && selectedRows.length > 0 && (
              <Dropdown
                overlay={
                  <Menu
                    onClick={async e => {
                      if (e.key === 'remove') {
                        await handleRemove(selectedRows);
                        action.reload();
                      }
                    }}
                    selectedKeys={[]}
                  >
                    <Menu.Item key="remove">批量删除</Menu.Item>
                    <Menu.Item key="approval">批量审批</Menu.Item>
                  </Menu>
                }
              >
                <Button>
                  批量操作 <DownOutlined/>
                </Button>
              </Dropdown>
            ),
          ]}
          tableAlertRender={(selectedRowKeys, selectedRows) => (
            <div>
              已选择 <a style={{fontWeight: 600}}>{selectedRowKeys.length}</a> 项&nbsp;&nbsp;
              <span>
              估值总收益 {selectedRows.reduce((pre, item) => pre + item.todayGains, 0)} 元
            </span>
            </div>
          )}
          request={params => queryRule(params)}
          columns={columns}
          // dataSource={a}
          rowSelection={{}}
          pagination={{pageSize: 50}}
        />
        <CreateForm
          onSubmit={async value => {
            const success = await handleAdd(value);
            if (success) {
              handleModalVisible(false);
              if (actionRef.current) {
                actionRef.current.reload();
              }
            }
          }}
          onCancel={() => handleModalVisible(false)}
          modalVisible={createModalVisible}
        />
        {stepFormValues && Object.keys(stepFormValues).length ? (
          <UpdateForm
            onSubmit={async value => {
              const success = await handleUpdate(value);
              if (success) {
                handleModalVisible(false);
                setStepFormValues({});
                if (actionRef.current) {
                  actionRef.current.reload();
                }
              }
            }}
            onCancel={() => {
              handleUpdateModalVisible(false);
              setStepFormValues({});
            }}
            updateModalVisible={updateModalVisible}
            values={stepFormValues}
          />
        ) : null}
      </React.Fragment>
    </GridContent>
  );
};

export default Form.create<TableListProps>()(TableList);
