import { useGetAdGroupByIdQuery } from '@/features/ad-group/adGroupApi';
import { Breadcrumb, DatePicker, Dropdown, MenuProps } from 'antd';
import { ColumnsType } from 'antd/es/table';
import Goback from 'components/campaign/Goback';
import CustomSelect from 'components/campaign/StatusDropDown';
import DashBoardTable from 'components/dashboard/DashBoardTable';
import DateRangePicker from 'components/generic/DateRangePicker';
import { BASE_URL } from 'constants/api-endpoints';
import { CampaignIconPurpple } from 'constants/icons';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import appIcon from '../../../../../public/app1.png';
const { RangePicker } = DatePicker;

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

export const data = [
    {
        key: '1',
        applicationName: 'Sample group 1',
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
        applicationName: 'Sample group 2',
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
        applicationName: 'Sample group 3',
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
        applicationName: 'Sample group 4',
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
        applicationName: 'Sample group',
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
        applicationName: 'Sample group',
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
        applicationName: 'Sample group',
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
        applicationName: 'Sample group',
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
        applicationName: 'Sample group',
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

const columns: ColumnsType<DataType> = [
    {
        title: 'Creative',
        dataIndex: 'applicationName',
        render: (text: any, record: any) => (
            <div className="flex items-center">
                {record?.applicationImage.split('.')[1] === 'png' ||
                record?.applicationImage.split('.')[1] === 'jpg' ||
                record?.applicationImage.split('.')[1] === 'jpeg' ||
                record?.applicationImage.split('.')[1] === 'webp' ? (
                    <>
                        <Image
                            loader={({ src, width, quality }) =>
                                `${BASE_URL}/${src}?w=${width}&q=${
                                    quality || 75
                                }`
                            }
                            src={record?.applicationImage}
                            alt={'appicon'}
                            width={34}
                            height={34}
                        />
                        <div style={{ marginLeft: 8 }}>{text}</div>
                    </>
                ) : (
                    <>
                        <Image
                            src={appIcon}
                            alt={'appicon'}
                            width={34}
                            height={34}
                        />
                        <div style={{ marginLeft: 8 }}>{text}</div>
                    </>
                )}
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

export default function AddGroupDetail() {
    const router: any = useRouter();
    const {
        isLoading,
        isError,
        isSuccess,
        data: newAdd,
        refetch,
    } = useGetAdGroupByIdQuery(router?.query?.addId);
    let tableData: any = [];
    if (isSuccess) {
        newAdd?.data?.images?.forEach((img: any) => {
            tableData.push({
                key: img?._id,
                applicationName: img?.name,
                applicationImage: `/images/${img?.src}`,
                status: img?.status,
                campaigns: 5,
                clicks: 500,
                impressions: 2500,
                goal: 5000,
                dailyTargets: 100,
                installs: 400,
            });
        });
        newAdd?.data?.videos?.forEach((video: any) => {
            tableData.push({
                key: video?._id,
                applicationName: video?.name,
                applicationImage: `/videos/${video?.src}`,
                status: video?.status,
                campaigns: 5,
                clicks: 500,
                impressions: 2500,
                goal: 5000,
                dailyTargets: 100,
                installs: 400,
            });
        });
        newAdd?.data?.htmlFiles?.forEach((htmlFile: any) => {
            tableData.push({
                key: htmlFile?._id,
                applicationName: htmlFile?.name,
                applicationImage: `/htmlFiles/${htmlFile?.src}`,
                status: htmlFile?.status,
                campaigns: 5,
                clicks: 500,
                impressions: 2500,
                goal: 5000,
                dailyTargets: 100,
                installs: 400,
            });
        });
    }

    useEffect(() => {
        refetch();
    }, [refetch]);

    return (
        <div>
            <div className="flex justify-between items-center">
                <div>
                    <Goback />
                    <div className="mt-[16px]">
                        <Breadcrumb separator=">">
                            <Breadcrumb.Item>Campaign</Breadcrumb.Item>
                            <Breadcrumb.Item>Your Campaign</Breadcrumb.Item>
                            <Breadcrumb.Item>Video</Breadcrumb.Item>
                        </Breadcrumb>
                    </div>
                </div>
                <div>
                    <DateRangePicker />
                </div>
            </div>
            <div className="bg-white p-4 bordered-table mt-5">
                <div className="flex justify-between items-center mb-3">
                    <div className="w-1/2 flex justify-between">
                        <div className="flex ">
                            <div className="w=[69px] h-[69px]">
                                <Image
                                    src={appIcon}
                                    className=""
                                    alt="app"
                                    width={69}
                                    height={69}
                                />
                            </div>
                            <div className="flex flex-col justify-around ml-5">
                                <div className="text-purple font-bold text-2sm">
                                    AD Group Name::
                                </div>
                                <div className="text-2xl font-bold text-gray-450">
                                    {isSuccess && newAdd?.data?.name}
                                </div>
                            </div>
                        </div>
                        <div className="flex flex-col justify-around mr-28 ">
                            <div className="text-purple font-bold text-2sm">
                                status:
                            </div>
                            <CustomSelect
                                id={newAdd?.data?._id}
                                status={newAdd?.data?.status}
                                isAds
                            />
                        </div>
                    </div>
                    <div className="w-1/2 flex justify-around">
                        <div className="flex flex-col justify-around ml-5 w=[69px] h-[69px]">
                            <div className="text-purple font-bold text-2sm">
                                Revenue:
                            </div>
                            <div className="text-3xl font-black text-gray-450">
                                $ 99.25
                            </div>
                        </div>
                        <div className="flex flex-col justify-around ml-5">
                            <div className="text-purple font-bold text-2sm">
                                Installs:
                            </div>
                            <div className="text-3xl font-base text-gray-450">
                                2500
                            </div>
                        </div>
                        <div className="flex flex-col justify-around ml-5">
                            <div className="text-purple font-bold text-2sm">
                                Total Cost:
                            </div>
                            <div className="text-3xl font-base text-gray-450">
                                $ 33089.78
                            </div>
                        </div>
                    </div>
                </div>
                <div className="flex justify-between border-t-2 pt-5">
                    <div className="flex flex-col justify-around ml-5 h-[69px]">
                        <div className="text-purple font-bold text-2sm">
                            Clicks:
                        </div>
                        <div className="text-2xl font-semibold text-gray-450">
                            33089.78
                        </div>
                    </div>
                    <div className="flex flex-col justify-around ml-5">
                        <div className="text-purple font-bold text-2sm">
                            Impressions:
                        </div>
                        <div className="text-2xl font-semibold text-gray-450">
                            330
                        </div>
                    </div>
                    <div className="flex flex-col justify-around ml-5">
                        <div className="text-purple font-bold text-2sm">
                            CPN:
                        </div>
                        <div className="text-2xl font-semibold text-gray-450">
                            330
                        </div>
                    </div>
                    <div className="flex flex-col justify-around ml-5">
                        <div className="text-purple font-bold text-2sm">
                            CPC:
                        </div>
                        <div className="text-2xl font-semibold text-gray-450">
                            330
                        </div>
                    </div>
                    <div className="flex flex-col justify-around ml-5">
                        <div className="text-purple font-bold text-2sm">
                            Reach:
                        </div>
                        <div className="text-2xl font-semibold text-gray-450">
                            330
                        </div>
                    </div>
                    <div className="flex flex-col justify-around ml-5">
                        <div className="text-purple font-bold text-2sm">
                            Media Cost:
                        </div>
                        <div className="text-2xl font-semibold text-gray-450">
                            330
                        </div>
                    </div>
                </div>
            </div>
            <div className="flex justify-end mt-2">
                <Link
                    href="/campaign/edit-campaign"
                    className="text-purple flex items-center  font-bold text-2sm"
                >
                    <Image
                        className="mr-2"
                        src="/editPurple.svg"
                        alt="edit"
                        width={15}
                        height={15}
                    />
                    Edit Campaign
                </Link>
            </div>

            <div className="space-y-4 mt-8">
                <div className="flex justify-between text-450">
                    <div className="flex items-center">
                        <CampaignIconPurpple />{' '}
                        <div className="ml-2 font-bold text-lg">ADS</div>
                    </div>
                    <Dropdown menu={{ items }}>
                        <div className="flex justify-around text-gray-450  p-2 font-bold text-lg rounded-[3px]">
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
                <div className="bg-white w-full dashboard-billing">
                    <DashBoardTable data={tableData} columns={columns} />
                </div>
            </div>
        </div>
    );
}
