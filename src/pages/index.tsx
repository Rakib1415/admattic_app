import { useGetCampaignByDatesMutation } from '@/features/campaign/campaignApi';
import { Campaign } from '@/features/campaign/campaignSlice';
import { DatePicker, Dropdown, MenuProps, Skeleton } from 'antd';
import BillingCard from 'components/billing/BillingCard';
import BillingTable from 'components/billing/Billingtable';
import DashBoardTable from 'components/dashboard/DashBoardTable';
import CustomLineChart from 'components/generic/CustomLineChart';
import PerformanceCard from 'components/generic/PerformenceCard';
import { BillingIconPurple, CampaignIconPurpple } from 'constants/icons';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { columns } from './campaign';
const { RangePicker } = DatePicker;

const data = [
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
    // add more data objects as needed
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

export default function Home() {
    // const { data: campaigns, isLoading, isError } = useGetAllCampaignQuery();
    const [getCampaignByDates, { isLoading, isError }] =
        useGetCampaignByDatesMutation();
    const [campaigns, setCampaigns] = useState<Campaign[]>([]);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        setTimeout(() => {
            setLoading(false);
        }, 2000);
    }, []);

    let content = null;
    if (isLoading) {
        content = <div>Loading....</div>;
    }
    if (!isLoading && isError) {
        content = <div>There was an error</div>;
    }
    if (!isLoading && !isError && campaigns?.length > 0) {
        const campaignData = campaigns?.reduce((acc: any, curr: Campaign) => {
            if (!acc[curr?.appName]) {
                acc[curr?.appName] = {
                    key: curr?._id,
                    applicationName: curr?.appName,
                    applicationImage: '/images/app2.png',
                    status: curr?.status,
                    campaigns: campaigns?.filter(
                        (camp: any) => camp.appName === curr?.appName
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
        }, {});

        content = (
            <DashBoardTable
                data={Object.values(campaignData)}
                columns={columns}
            />
        );
    }
    const handleChange = async (dates: any, dateStrings: any) => {
        try {
            const res: any = await getCampaignByDates({
                startDate: dateStrings[0],
                endDate: dateStrings[1],
            });
            setCampaigns(res?.data?.campaigns);
        } catch (err) {
            console.log(err);
        }
    };
    return (
        <>
            <Head>
                <title>Admettic</title>
                <meta
                    name="description"
                    content="Generated by create next app"
                />
                <meta
                    name="viewport"
                    content="width=device-width, initial-scale=1"
                />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <div className="font-bold text-black text-2xl space-y-7">
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
                        <RangePicker
                            onChange={handleChange}
                            renderExtraFooter={() => (
                                <div className="ml-5 text-purple mb-5 mr-3">
                                    <div className="">Quick Selecte</div>
                                    <div className="flex justify-around">
                                        <div className="bg-[#F0E5F8] px-2 rounded-sm">
                                            Today
                                        </div>
                                        <div className="bg-[#F0E5F8]  px-2 rounded-sm">
                                            Yesterday
                                        </div>
                                        <div className="bg-[#F0E5F8]  px-2 rounded-sm">
                                            This week
                                        </div>
                                        <div className="bg-[#F0E5F8]  px-2 rounded-sm">
                                            This Month
                                        </div>
                                        <div className="bg-[#F0E5F8]  px-2 rounded-sm">
                                            Last Month
                                        </div>
                                        <div className="bg-[#F0E5F8]  px-2 rounded-sm">
                                            Last 30 Days
                                        </div>
                                    </div>
                                </div>
                            )}
                            size="large"
                        />
                    </div>
                </div>
                <div className="flex justify-between space-x-4">
                    <div className="bg-white w-2/3 performance-card">
                        {loading ? (
                            <Skeleton
                                avatar={false}
                                title={false}
                                paragraph={{
                                    rows: 4,
                                    width: [500, 500, 500, 500],
                                    style: {
                                        margin: '100px 50px 0px 50px',
                                        height: '200px',
                                    },
                                }}
                            />
                        ) : (
                            <CustomLineChart />
                        )}
                    </div>
                    <div className="bg-white w-1/3">
                        {loading ? (
                            <Skeleton
                                avatar={false}
                                title={false}
                                paragraph={{
                                    rows: 4,
                                    width: [300, 300, 300, 300],
                                    style: {
                                        margin: '100px 50px 0px 50px',
                                        height: '200px',
                                    },
                                }}
                            />
                        ) : (
                            <PerformanceCard />
                        )}
                    </div>
                </div>

                {/*campaign part*/}
                <div className="space-y-4">
                    <div className="flex justify-between text-base text-gray-450">
                        <div className="flex items-center">
                            {loading ? (
                                <Skeleton.Input
                                    active
                                    size="small"
                                    style={{ width: '100px' }}
                                />
                            ) : (
                                <>
                                    <CampaignIconPurpple />
                                    <div className="ml-2 text-2lg">
                                        Top Campaigns
                                    </div>
                                </>
                            )}
                        </div>
                        <div className="flex justify-between items-center space-x-6">
                            {loading ? (
                                <Skeleton.Input
                                    active
                                    size="small"
                                    style={{
                                        width: '100px',
                                        marginLeft: '10px',
                                    }}
                                />
                            ) : (
                                <Link
                                    href="/campaign"
                                    className="font-bold text-sm text-gray-450"
                                >
                                    All Campaign
                                </Link>
                            )}

                            {loading ? (
                                <Skeleton.Input
                                    active
                                    size="small"
                                    style={{ width: '100px' }}
                                />
                            ) : (
                                <Dropdown menu={{ items }}>
                                    <div className="flex justify-around items-center cursor-pointer font-bold text-gray-450 text-sm">
                                        Download{' '}
                                        <Image
                                            className="ml-1"
                                            src="/Download.svg"
                                            alt="Logo"
                                            width={12}
                                            height={12}
                                        />
                                    </div>
                                </Dropdown>
                            )}
                        </div>
                    </div>
                    <div className="bg-white w-full dashboard-billing">
                        {/* <DashBoardTable data={data} columns={columns} /> */}
                        {content}
                    </div>
                </div>

                {/* transection part */}
                <div className="space-y-4">
                    <div className="flex text-2sm justify-between  text-purple">
                        <div className="flex items-center">
                            {loading ? (
                                <Skeleton.Input
                                    active
                                    size="small"
                                    style={{ width: '100px' }}
                                />
                            ) : (
                                <>
                                    <BillingIconPurple />{' '}
                                    <div className="ml-2">Billing</div>
                                </>
                            )}
                        </div>
                        {loading ? (
                            <Skeleton.Input
                                active
                                size="small"
                                style={{
                                    width: '100px',
                                    marginLeft: '10px',
                                }}
                            />
                        ) : (
                            <Link
                                href="/billing"
                                className="flex  justify-between space-x-6"
                            >
                                View All Transections
                            </Link>
                        )}
                    </div>
                    <div className="bg-white w-full performance-card">
                        <div className="flex space-x-12 px-8 py-10">
                            <div className=" w-[280px] h-[89px] bg-white py-3 pl-3 performance-card">
                                <BillingCard
                                    title="Total"
                                    amount="7000"
                                    loading={loading}
                                />
                            </div>
                            <div className="  w-[280px] h-[89px] bg-white py-3 pl-3 performance-card">
                                <BillingCard
                                    title="Last Billed Amount"
                                    amount="200"
                                    loading={loading}
                                />
                            </div>
                            <div className=" w-[280px] h-[89px] bg-white py-3 pl-3 performance-card">
                                <BillingCard
                                    title="Credit Limit"
                                    amount="5000"
                                    loading={loading}
                                />
                            </div>
                        </div>
                        <div className="px-10 dashboard-billing ">
                            <div className="border-b-2 ml-2 pb-[9px] text-2lg text-gray-500">
                                {loading ? (
                                    <Skeleton.Input
                                        active
                                        size="small"
                                        style={{
                                            width: '100px',
                                            marginLeft: '10px',
                                        }}
                                    />
                                ) : (
                                    'Recent Transection'
                                )}
                            </div>
                            <BillingTable loading={loading} />
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
