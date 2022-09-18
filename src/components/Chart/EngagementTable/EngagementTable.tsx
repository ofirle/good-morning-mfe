import { Table } from 'antd';
import React from 'react';
import { columns } from './EngagementTableOptions';

export const EngagementTable = ({ dataSource, legends }) => (
  <Table
    className="ScrollableTable"
    rowClassName="super-table-row"
    size="small"
    dataSource={dataSource}
    pagination={false}
    columns={columns(legends)}
  />
);
