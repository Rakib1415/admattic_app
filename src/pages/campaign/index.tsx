import { useGetAllCampaignQuery } from '@/features/campaign/campaignApi';
import { DatePicker, Dropdown, Menu, MenuProps, Skeleton } from 'antd';
import { ColumnsType } from 'antd/es/table';
import DashBoardTable from 'components/dashboard/DashBoardTable';
import DateRangePicker from 'components/generic/DateRangePicker';
import { CampaignIconPurpple } from 'constants/icons';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import appIcon from '../../../public/app1.png';
const { RangePicker } = DatePicker;

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

export const loadingData = [
    {
        key: '1',
        applicationName: 'App 1',
        applicationImage: '/images/app1.png',
        status: 'Active',
        campaigns: 10,
        clicks: 1000,
        impressions: 5000,
        goal: 10000,
        dailyTargets: 200,
        installs: 800,
    },
    {
        key: '2',
        applicationName: 'App 2',
        applicationImage: '/images/app2.png',
        status: 'Paused',
        campaigns: 5,
        clicks: 500,
        impressions: 2500,
        goal: 5000,
        dailyTargets: 100,
        installs: 400,
    },
    {
        key: '3',
        applicationName: 'App 3',
        applicationImage: '/images/app2.png',
        status: 'Stopped',
        campaigns: 5,
        clicks: 500,
        impressions: 2500,
        goal: 5000,
        dailyTargets: 100,
        installs: 400,
    },
    {
        key: '4',
        applicationName: 'App 4',
        applicationImage: '/images/app2.png',
        status: 'Active',
        campaigns: 5,
        clicks: 500,
        impressions: 2500,
        goal: 5000,
        dailyTargets: 100,
        installs: 400,
    },
    {
        key: '5',
        applicationName: 'App 5',
        applicationImage: '/images/app2.png',
        status: 'Paused',
        campaigns: 5,
        clicks: 500,
        impressions: 2500,
        goal: 5000,
        dailyTargets: 100,
        installs: 400,
    },
    {
        key: '5',
        applicationName: 'App 5',
        applicationImage: '/images/app2.png',
        status: 'Active',
        campaigns: 5,
        clicks: 500,
        impressions: 2500,
        goal: 5000,
        dailyTargets: 100,
        installs: 400,
    },
    {
        key: '5',
        applicationName: 'App 5',
        applicationImage: '/images/app2.png',
        status: 'Paused',
        campaigns: 5,
        clicks: 500,
        impressions: 2500,
        goal: 5000,
        dailyTargets: 100,
        installs: 400,
    },
    {
        key: '5',
        applicationName: 'App 5',
        applicationImage: '/images/app2.png',
        status: 'Stopped',
        campaigns: 5,
        clicks: 500,
        impressions: 2500,
        goal: 5000,
        dailyTargets: 100,
        installs: 400,
    },
    {
        key: '5',
        applicationName: 'App 5',
        applicationImage: '/images/app2.png',
        status: 'Paused',
        campaigns: 5,
        clicks: 500,
        impressions: 2500,
        goal: 5000,
        dailyTargets: 100,
        installs: 400,
    },
    // add more data objects as needed
];

export const columns: ColumnsType<DataType> = [
    {
        title: 'Application Name',
        dataIndex: 'applicationName',
        render: (text: any, record: any) => (
            <div className="flex items-center">
                <Image src={appIcon} alt={'appicon'} width={34} height={34} />
                {/* <Link style={{ marginLeft: 8 }}>{text}</div> */}
                <Link
                    style={{ marginLeft: 8 }}
                    href={`/campaign/${record?.key}`}
                >
                    {text}
                </Link>
            </div>
        ),
        fixed: 'left',
        className: 'border-r-2',
    },
    {
        title: 'Status',
        dataIndex: 'status',
        render: (text: any) => (
            <div className="flex items-center">
                {text === 'Active' && (
                    <div className="text-[#0B8043] flex items-center">
                        <div className="rounded-lg w-3 h-3 bg-[#0B8043] mr-2"></div>{' '}
                        {text}
                    </div>
                )}
                {text === 'Paused' && (
                    <div className="text-[#B07F00] flex items-center">
                        <Image
                            className="mr-1"
                            src="/paused.svg"
                            alt="paused"
                            width={15}
                            height={15}
                        />
                        {text}
                    </div>
                )}
                {text === 'Stopped' && (
                    <div className="text-[#C53929] flex items-center">
                        <div className="circle w-4 h-4 bg-[#C53929] text-white mr-1">
                            x
                        </div>{' '}
                        {text}
                    </div>
                )}
            </div>
        ),
    },
    {
        title: 'Campaigns',
        dataIndex: 'campaigns',
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
        title: 'Goal',
        dataIndex: 'goal',
    },
    {
        title: 'Daily Targets',
        dataIndex: 'dailyTargets',
    },
    {
        title: 'Installs',
        dataIndex: 'installs',
    },
];

export const loadingStateColumns: ColumnsType<DataType> = [
    {
        title: 'Application Name',
        dataIndex: 'applicationName',
        render: (text: any, record: any) => (
            <div className="flex items-center">
                <Skeleton.Avatar
                    active
                    shape="square"
                    size="small"
                    style={{ marginRight: '10px' }}
                />
                <Skeleton.Input
                    size="small"
                    active
                    style={{ minWidth: '150px' }}
                />
            </div>
        ),
        fixed: 'left',
        className: 'border-r-2',
    },
    {
        title: 'Status',
        dataIndex: 'status',
        render: (text: any) => (
            <div className="flex items-center">
                {text === 'Active' && (
                    <div className="text-[#0B8043] flex items-center">
                        <Skeleton.Input
                            size="small"
                            active
                            style={{ minWidth: '50px' }}
                        />
                    </div>
                )}
                {text === 'Paused' && (
                    <div className="text-[#B07F00] flex items-center">
                        <Skeleton.Input
                            size="small"
                            active
                            style={{ minWidth: '50px' }}
                        />
                    </div>
                )}
                {text === 'Stopped' && (
                    <div className="text-[#C53929] flex items-center">
                        <Skeleton.Input
                            size="small"
                            active
                            style={{ minWidth: '50px' }}
                        />
                    </div>
                )}
            </div>
        ),
    },
    {
        title: 'Campaigns',
        dataIndex: 'campaigns',
        render: () => (
            <Skeleton.Input size="small" active style={{ minWidth: '50px' }} />
        ),
    },
    {
        title: 'Clicks',
        dataIndex: 'clicks',
        render: () => (
            <Skeleton.Input size="small" active style={{ minWidth: '50px' }} />
        ),
    },
    {
        title: 'Impressions',
        dataIndex: 'impressions',
        render: () => (
            <Skeleton.Input size="small" active style={{ minWidth: '50px' }} />
        ),
    },
    {
        title: 'Goal',
        dataIndex: 'goal',
        render: () => (
            <Skeleton.Input size="small" active style={{ minWidth: '50px' }} />
        ),
    },
    {
        title: 'Daily Targets',
        dataIndex: 'dailyTargets',
        render: () => (
            <Skeleton.Input size="small" active style={{ minWidth: '50px' }} />
        ),
    },
    {
        title: 'Installs',
        dataIndex: 'installs',
        render: () => (
            <Skeleton.Input size="small" active style={{ minWidth: '50px' }} />
        ),
    },
];

export const items: MenuProps['items'] = [
    {
        label: <div>Document (.csv) File</div>,
        key: '0',
    },
    {
        label: <div>Excel (.xlsx) File</div>,
        key: '1',
    },
];

const menu = (
    <Menu>
        <Menu.Item key="1">
            {' '}
            <div className="text-[#0B8043] text-2sm flex items-center">
                <div className="rounded-lg w-3 h-3 bg-[#0B8043] mr-2"></div>{' '}
                Active
            </div>
        </Menu.Item>
        <Menu.Item key="2">
            <div className="text-[#B07F00] text-2sm flex items-center">
                <Image
                    className="mr-1"
                    src="/paused.svg"
                    alt="paused"
                    width={15}
                    height={15}
                />
                Paused
            </div>
        </Menu.Item>
        <Menu.Item key="3">
            <div className="text-[#C53929] text-2sm flex items-center">
                <div className="circle w-4 h-4 bg-[#C53929] text-white mr-1">
                    x
                </div>{' '}
                Stopped
            </div>
        </Menu.Item>
        <Menu.Item key="4">
            <div className="text-[#999999] text-2sm flex items-center">
                <Image
                    className="mr-1"
                    src="/delete.svg"
                    alt="delete"
                    width={15}
                    height={15}
                />
                Delete
            </div>
        </Menu.Item>
    </Menu>
);

export const status: MenuProps['items'] = [
    {
        label: <div>Document (.csv) File</div>,
        key: '0',
    },
    {
        label: <div>Excel (.xlsx) File</div>,
        key: '1',
    },
];

export default function Campaign() {
    const { data: campaigns, isLoading, isError } = useGetAllCampaignQuery();
    const [campaignData, setCampaignData] = useState({});

    useEffect(() => {
        if (!isLoading && !isError && campaigns?.data?.length > 0) {
            const campaignData = campaigns?.data?.reduce(
                (acc: any, curr: any) => {
                    if (!acc[curr.appName]) {
                        acc[curr.appName] = {
                            key: curr._id,
                            applicationName: curr.appName,
                            applicationImage: '/images/app2.png',
                            status: curr.status,
                            campaigns: campaigns?.data?.filter(
                                (camp: any) => camp.appName === curr.appName
                            ).length,
                            clicks: 500,
                            impressions: 2500,
                            goal: 5000,
                            dailyTargets: 100,
                            installs: 400,
                        };
                        return acc;
                    }
                    return acc;
                },
                {}
            );
            setCampaignData(campaignData);
        }
    }, [isLoading, campaigns, isError]);

    return (
        <div className="font-bold text-black text-2xl space-y-8">
            <div className="flex justify-between items-center">
                <Link
                    href="/campaign/new-campaign"
                    className="bg-purple flex items-center justify-center w-[198px] h-[52px] rounded-sm"
                >
                    <div className="text-purple bg-white rounded-sm h-[26px] w-[26px] flex items-center p-3 justify-center text-lg">
                        +
                    </div>
                    <div className="text-white text-2sm font-bold ml-[14px]">
                        New Campaign
                    </div>
                </Link>
                <div>
                    <DateRangePicker />
                </div>
            </div>
            <div className="space-y-4">
                <div className="flex justify-between text-base text-[#333333]">
                    <div className="flex items-center">
                        <CampaignIconPurpple />{' '}
                        <div className="ml-2 text-2sm">All Campaign</div>
                    </div>
                    <div className="flex items-center justify-between space-x-6">
                        <Dropdown overlay={menu}>
                            <div className="bg-[#E5E5E5] p-1.5 rounded-[3px] w-[63px] h-[32px] cursor-pointer">
                                <div className="flex justify-around">
                                    Edit{' '}
                                    <Image
                                        className="ml-2"
                                        src="/edit.svg"
                                        alt="Logo"
                                        width={12}
                                        height={12}
                                    />
                                </div>
                            </div>
                        </Dropdown>

                        <Dropdown menu={{ items }}>
                            <div className="flex justify-around cursor-pointer">
                                Download{' '}
                                <Image
                                    className="ml-2"
                                    src="/Download.svg"
                                    alt="Logo"
                                    width={12}
                                    height={12}
                                />
                            </div>
                        </Dropdown>
                    </div>
                </div>
                <div className="bg-white w-full dashboard-billing">
                    {isLoading ? (
                        <DashBoardTable
                            data={loadingData}
                            columns={loadingStateColumns}
                        />
                    ) : (
                        <DashBoardTable
                            data={Object?.values(campaignData)}
                            columns={columns}
                        />
                    )}
                </div>
            </div>
        </div>
    );
}
