import { Table } from 'antd';
import { useState } from 'react';

interface DataType {
    key: string;
    applicationName: string;
    applicationImage: string;
    status: string;
    campaigns: number;
    clicks: number;
    impressions: number;
    goal: number;
    dailyTargets: number;
    installs: number;
}

export default function DashBoardTable({
    data,
    columns,
}: {
    data: any[];
    columns: any;
}) {
    const [selectedRowKeys, setSelectedRowKeys] = useState([]);

    const rowSelection = {
        selectedRowKeys,
        onChange: (selectedRowKeys: any) => {
            setSelectedRowKeys(selectedRowKeys);
        },
    };

    return (
        <Table
            className="bordered-table"
            columns={columns}
            dataSource={data}
            rowSelection={rowSelection}
            scroll={{ x: 1700 }}
            pagination={false}
        />
    );
}
