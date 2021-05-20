import { ModalForm, ProFormDigit } from '@ant-design/pro-form';
import { EditableProTable, ProColumns } from '@ant-design/pro-table';
import { Space } from 'antd';
import { Rule } from 'antd/lib/form';
import React, { useCallback, useMemo, useState } from 'react';
import styles from './index.css';
import { PlusCircleFilled } from '@ant-design/icons';

const req: Rule = { required: true };

const defaultDataSource = [
  {
    id: 0,
    price_cost: 1,
    price_sale: 2,
    origin_sku: 3,
  },
  {
    id: 1,
    price_cost: 3,
    price_sale: 4,
    origin_sku: 5,
  },
  {
    id: 2,
    price_cost: 6,
    price_sale: 7,
    origin_sku: 8,
  },
];

export default function() {
  const [dataSource, setDataSource] = useState(defaultDataSource);
  const handleBatchSet = useCallback((field: string, value: number) => {
    console.log(field, value);

    const source = dataSource.map(item => Object.assign(item, { [field]: value }));
    setDataSource(source);
    return true;
  }, []);

  const setRequired = useMemo(() => {
    return (text: React.ReactNode, field: string) => {
      return (
        <Space>
          <span style={{ fontSize: 14, color: '#ff4d4f' }}>*</span>
          {text}
          <ModalForm<{ value: number }>
            width={250}
            layout="horizontal"
            title={`批量设置${text}`}
            trigger={<PlusCircleFilled style={{ color: '#00c17b' }} />}
            onFinish={async ({ value }) => handleBatchSet(field, value)}
          >
            <ProFormDigit label="值" name="value" required rules={[req]} />
          </ModalForm>
        </Space>
      );
    };
  }, [handleBatchSet]);
  const skuColumns: ProColumns[] = useMemo(
    () => [
      {
        title: 'id',
        dataIndex: 'id',
        hideInTable: true,
      },
      {
        title: setRequired('样品价(元)', 'price_cost'),
        dataIndex: 'price_cost',
        valueType: 'money',
      },
      {
        title: setRequired('直播价(元)', 'price_sale'),
        dataIndex: 'price_sale',
        valueType: 'money',
      },
      {
        title: setRequired('实际库存', 'stock_num'),
        dataIndex: 'stock_num',
        valueType: 'digit',
      },
      {
        title: setRequired('供应商规格编码', 'origin_sku'),
        dataIndex: 'origin_sku',
      },
    ],
    [setRequired],
  );
  return (
    <div className={styles.normal}>
      <EditableProTable
        rowKey="id"
        columns={skuColumns}
        value={dataSource}
        pagination={false}
        recordCreatorProps={false}
      />
    </div>
  );
}
