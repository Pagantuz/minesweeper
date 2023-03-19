import Table, { ColumnsType } from 'antd/es/table';
import { TBoardData } from 'modules/LeaderListModule/types/BoardData';
import React from 'react';

type DataListProps = {
  data: TBoardData[];
};

const columns: ColumnsType<TBoardData> = [
  {
    title: 'Место',
    dataIndex: 'place',
    key: 'place',
    render: (_, __, index) => index + 1
  },
  {
    title: 'Игрок',
    dataIndex: 'username',
    key: 'username'
  },
  {
    title: 'Время',
    dataIndex: 'time',
    key: 'time'
  }
];

const DataTable: React.FC<DataListProps> = ({ data }) => {
  return (
    <Table
      rowKey={({ time, username }) => `${username}/${time}`}
      columns={columns}
      dataSource={data}
    />
  );
};

export { DataTable };
