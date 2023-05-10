const { Option } = Select;
import { useGetAllCampaignQuery } from '@/features/campaign/campaignApi';
import { Select, Skeleton, Space } from 'antd';
import ReportTable from 'components/report/ReportTable';
import Image from 'next/image';
import { useEffect, useState } from 'react';

export const data = [
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

export default function Report() {
    const [selcetedApp, setSelectedApp] = useState<string[]>([]);
    const [campaignTableData, setCampaignTableData] = useState([]);
    const { data: campaigns, isLoading, isError } = useGetAllCampaignQuery();

    let options: any = [];
    let campaignData: any = {};
    if (!isLoading && !isError && campaigns?.data?.length > 0) {
        campaignData = campaigns?.data?.reduce((acc: any, curr: any) => {
            if (!acc[curr.appName]) {
                acc[curr.appName] = {
                    campaigns: campaigns?.data?.filter(
                        (camp: any) => camp.appName === curr.appName
                    ),
                };
                return acc;
            }
            return acc;
        }, {});

        options = Object.keys(campaignData).map((item) => ({
            value: item,
            label: item,
        }));
    }

    const campaignOptions = campaignData[selcetedApp[0]]?.campaigns?.map(
        (camp: any) => ({
            value: camp.name,
            label: camp.name,
        })
    );

    const handleChange = (value: string[]) => {
        setSelectedApp(value);
    };
    useEffect(() => {
        const tableCampData = campaignData[selcetedApp[0]]?.campaigns?.map(
            (camp: any) => ({
                key: camp?._id,
                campaign: camp?.name,
                clicks: 500,
                impressions: 2500,
                ctr: 0.4,
                cpc: 0.24,
                cpi: 2.24,
                ipm: 0.5,
            })
        );
        setCampaignTableData(tableCampData);
    }, [selcetedApp, campaignData]);

    return (
        <>
            <div className="text-black space-y-8">
                <div className="bg-white w-full flex justify-between p-5 report-box-border report-section-1">
                    <div className="w-[250]">
                        <div className=" font-[600] text-2sm text-gray-450 opacity-[0.6]">
                            Select Application
                        </div>
                        <Select
                            size="large"
                            mode="multiple"
                            className="mt-3"
                            style={{ minWidth: '350px' }}
                            placeholder={
                                isLoading ? (
                                    <Skeleton.Input
                                        active
                                        style={{ minWidth: '350px' }}
                                    />
                                ) : (
                                    'select App'
                                )
                            }
                            onChange={handleChange}
                            value={selcetedApp}
                            optionLabelProp="label"
                        >
                            {options?.map((option: any) => (
                                <Option
                                    key={option.value}
                                    value={option.value}
                                    option={option}
                                    label={option.label}
                                >
                                    <Space>{option.label}</Space>
                                </Option>
                            ))}
                        </Select>
                    </div>
                    <div className="w-[383]">
                        <div className=" font-[600] text-2sm text-gray-450 opacity-[0.6]">
                            Select Campaign
                        </div>
                        <Select
                            size="large"
                            mode="multiple"
                            className="mt-3"
                            style={{ minWidth: '350px' }}
                            placeholder={
                                isLoading ? (
                                    <Skeleton.Input
                                        active
                                        style={{ minWidth: '350px' }}
                                    />
                                ) : (
                                    'select Campaign'
                                )
                            }
                            // defaultValue={['china']}
                            optionLabelProp="label"
                        >
                            {campaignOptions?.map((option: any) => (
                                <Option
                                    key={option.value}
                                    value={option.value}
                                    option={option}
                                    label={option.label}
                                >
                                    <Space>{option.label}</Space>
                                </Option>
                            ))}
                        </Select>
                    </div>
                    <div className="">
                        <div className=" font-[600] text-2sm text-gray-450 opacity-[0.6]">
                            Select AD
                        </div>
                        <Select
                            size="large"
                            mode="multiple"
                            className="mt-3"
                            style={{ minWidth: '350px' }}
                            placeholder={
                                isLoading ? (
                                    <Skeleton.Input
                                        active
                                        style={{ minWidth: '350px' }}
                                    />
                                ) : (
                                    'select Ad'
                                )
                            }
                            // defaultValue={['china']}
                            optionLabelProp="label"
                        >
                            {options.map((option: any) => (
                                <Option
                                    key={option.value}
                                    value={option.value}
                                    option={option}
                                    label={option.label}
                                >
                                    <Space>{option.label}</Space>
                                </Option>
                            ))}
                        </Select>
                    </div>
                </div>

                <div className="bg-white w-full flex justify-between p-5 report-box-border">
                    <div className="w-3/4">
                        <div className="dynamic-filter-section flex justify-between flex-wrap">
                            <div>
                                <div className=" font-[600] text-2sm text-gray-450 opacity-[0.6]">
                                    Filter 1
                                </div>
                                <Select
                                    size="large"
                                    mode="multiple"
                                    className="mt-3"
                                    style={{ minWidth: '287px' }}
                                    placeholder={
                                        isLoading ? (
                                            <Skeleton.Input
                                                active
                                                style={{ minWidth: '350px' }}
                                            />
                                        ) : (
                                            'select Filter'
                                        )
                                    }
                                    // defaultValue={['china']}
                                    optionLabelProp="label"
                                >
                                    {options.map((option: any) => (
                                        <Option
                                            key={option.value}
                                            value={option.value}
                                            option={option}
                                            label={option.label}
                                        >
                                            <Space>{option.label}</Space>
                                        </Option>
                                    ))}
                                </Select>
                            </div>
                        </div>
                        <div className="bg-purple flex items-center justify-center p-1 w-[133px] h-[44px] rounded-[3px] mt-5">
                            <div className="text-purple bg-white rounded-[3px] h-5 w-5 flex items-center p-3 justify-center text-2xl font-bold">
                                +
                            </div>
                            <div className="text-white text-2sm font-bold ml-4">
                                Add Filters
                            </div>
                        </div>
                    </div>
                    <div className="w-1/4 flex justify-center items-center border-l-2">
                        <div>
                            <div className=" font-[600] text-2sm text-gray-450 opacity-[0.6]">
                                Group By
                            </div>
                            <Select
                                size="large"
                                mode="multiple"
                                className="mt-3"
                                style={{ minWidth: '250px' }}
                                placeholder={
                                    isLoading ? (
                                        <Skeleton.Input
                                            active
                                            style={{ minWidth: '350px' }}
                                        />
                                    ) : (
                                        'select Groups'
                                    )
                                }
                                // defaultValue={['china']}
                                optionLabelProp="label"
                            >
                                {options.map((option: any) => (
                                    <Option
                                        key={option.value}
                                        value={option.value}
                                        option={option}
                                        label={option.label}
                                    >
                                        <Space>{option.label}</Space>
                                    </Option>
                                ))}
                            </Select>

                            <div className="flex justify-end">
                                <div className="bg-gray-450 flex items-center justify-around w-[174px] h-[44px] rounded-[3px] mt-4">
                                    <Image
                                        src="/whiteReport.svg"
                                        width={15}
                                        height={15}
                                        alt="white report"
                                    />
                                    <div className="text-white text-lg ">
                                        Create Report
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="dashboard-billing">
                    <ReportTable loading={isLoading} data={campaignTableData} />
                </div>

                <div className="flex justify-end">
                    <div className="bg-purple flex items-center justify-center w-[198px] h-[52px] rounded-[3px] mt-1">
                        <Image
                            src="/downloads.svg"
                            width={15}
                            height={15}
                            alt="white report"
                        />
                        <div className="text-white text-2sm font-bold ml-4">
                            Download Report
                        </div>
                    </div>
                    <div className="bg-[#999999] flex items-center justify-center w-[198px] h-[52px] rounded-[3px] mt-1 ml-2">
                        <Image
                            src="/refresh.svg"
                            width={15}
                            height={15}
                            alt="white report"
                        />
                        <div className="text-purple text-2sm font-bold ml-4">
                            Refresh
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
