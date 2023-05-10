import { Skeleton, Table } from 'antd';
import { ColumnsType } from 'antd/es/table';

interface DataType {
    key: string;
    campaign: string;
    clicks: number;
    impressions: number;
    ctr: number;
    cpc: number;
    cpi: number;
    ipm: number;
}
const loadingStateData = [
    {
        key: '1',
        campaign: <Skeleton.Input active style={{ minWidth: '100px' }} />,
        clicks: (
            <Skeleton.Input size="small" active style={{ minWidth: '50px' }} />
        ),
        impressions: <Skeleton.Input active style={{ minWidth: '50px' }} />,
        ctr: (
            <Skeleton.Input size="small" active style={{ minWidth: '50px' }} />
        ),
        cpc: (
            <Skeleton.Input size="small" active style={{ minWidth: '50px' }} />
        ),
        cpi: (
            <Skeleton.Input size="small" active style={{ minWidth: '50px' }} />
        ),
        ipm: (
            <Skeleton.Input size="small" active style={{ minWidth: '50px' }} />
        ),
    },
    {
        key: '2',
        campaign: <Skeleton.Input active style={{ minWidth: '100px' }} />,
        clicks: (
            <Skeleton.Input size="small" active style={{ minWidth: '50px' }} />
        ),
        impressions: <Skeleton.Input active style={{ minWidth: '50px' }} />,
        ctr: (
            <Skeleton.Input size="small" active style={{ minWidth: '50px' }} />
        ),
        cpc: (
            <Skeleton.Input size="small" active style={{ minWidth: '50px' }} />
        ),
        cpi: (
            <Skeleton.Input size="small" active style={{ minWidth: '50px' }} />
        ),
        ipm: (
            <Skeleton.Input size="small" active style={{ minWidth: '50px' }} />
        ),
    },
    {
        key: '3',
        campaign: <Skeleton.Input active style={{ minWidth: '100px' }} />,
        clicks: (
            <Skeleton.Input size="small" active style={{ minWidth: '50px' }} />
        ),
        impressions: <Skeleton.Input active style={{ minWidth: '50px' }} />,
        ctr: (
            <Skeleton.Input size="small" active style={{ minWidth: '50px' }} />
        ),
        cpc: (
            <Skeleton.Input size="small" active style={{ minWidth: '50px' }} />
        ),
        cpi: (
            <Skeleton.Input size="small" active style={{ minWidth: '50px' }} />
        ),
        ipm: (
            <Skeleton.Input size="small" active style={{ minWidth: '50px' }} />
        ),
    },
];

const columns: ColumnsType<DataType> = [
    {
        title: 'Campaign',
        dataIndex: 'campaign',
        render: (text: any) => (
            <div className="flex items-center">
                {/* <Image src={appIcon} alt={'appicon'} width={34} height={34} /> */}
                <div style={{ marginLeft: 8 }}>{text}</div>
            </div>
        ),
        // fixed: 'left',
        className: 'border-r-2',
    },
    {
        title: 'Clicks',
        dataIndex: 'clicks',
    },
    {
        title: 'Impressions',
        dataIndex: 'impressions',
    },
    {
        title: 'CTR',
        dataIndex: 'ctr',
    },
    {
        title: 'CPC',
        dataIndex: 'cpc',
    },
    {
        title: 'CPI',
        dataIndex: 'cpi',
    },
    {
        title: 'IPM',
        dataIndex: 'ipm',
    },
];

const loadingStateColumns: ColumnsType<DataType> = [
    {
        title: <Skeleton.Input active style={{ minWidth: '150px' }} />,
        dataIndex: 'campaign',
        // fixed: 'left',
        className: 'border-r-2',
    },
    {
        title: (
            <Skeleton.Input size="small" active style={{ minWidth: '100px' }} />
        ),
        dataIndex: 'clicks',
    },
    {
        title: <Skeleton.Input active style={{ minWidth: '150px' }} />,
        dataIndex: 'impressions',
    },
    {
        title: (
            <Skeleton.Input size="small" active style={{ minWidth: '100px' }} />
        ),
        dataIndex: 'ctr',
    },
    {
        title: (
            <Skeleton.Input size="small" active style={{ minWidth: '100px' }} />
        ),
        dataIndex: 'cpc',
    },
    {
        title: (
            <Skeleton.Input size="small" active style={{ minWidth: '100px' }} />
        ),
        dataIndex: 'cpi',
    },
    {
        title: (
            <Skeleton.Input size="small" active style={{ minWidth: '100px' }} />
        ),
        dataIndex: 'ipm',
    },
];

export default function ReportTable({
    data,
    loading,
}: {
    data: any[];
    loading: boolean;
}) {
    // loading = true;
    // const [selectedRowKeys, setSelectedRowKeys] = useState([]);

    // const rowSelection = {
    //     selectedRowKeys,
    //     onChange: (selectedRowKeys: any) => {
    //         setSelectedRowKeys(selectedRowKeys);
    //     },
    // };

    return (
        <Table
            className="bordered-table"
            columns={loading ? loadingStateColumns : columns}
            dataSource={loading ? loadingStateData : data}
            // scroll={{ x: 1700 }}
            pagination={false}
        />
    );
}
