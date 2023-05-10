import { useAppDispatch } from '@/app/redux-hooks';
import { useUpdateAdGroupByNameMutation } from '@/features/ad-group/adGroupApi';
import { useGetCampaignByIdQuery } from '@/features/campaign/campaignApi';
import { Campaign, createCampaign } from '@/features/campaign/campaignSlice';
import { Breadcrumb, DatePicker, Dropdown, Skeleton } from 'antd';
import { ColumnsType } from 'antd/es/table';
import Goback from 'components/campaign/Goback';
import CustomSelect from 'components/campaign/StatusDropDown';
import DateRangePicker from 'components/generic/DateRangePicker';
import { CampaignIconPurpple } from 'constants/icons';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { items } from '..';
import appIcon from '../../../../public/app1.png';
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
        applicationName: 'Video',
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
        applicationName: 'WL_KYC_OLD',
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
        applicationName: 'WL_Parser',
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
        applicationName: 'WL_thebestappcss',
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
        applicationName: 'WL_thebestappcss',
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
        applicationName: 'WL_thebestappcss',
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
        applicationName: 'WL_thebestappcss',
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
        applicationName: 'WL_thebestappcss',
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

// const columns: ColumnsType<DataType> = [
//     {
//         title: 'Group Name',
//         dataIndex: 'applicationName',
//         render: (text: any, record: object) => (
//             <div className="flex items-center group">
//                 {/* <Image src={appIcon} alt={'appicon'} width={34} height={34} /> */}
//                 <Link
//                     style={{ marginLeft: 8, marginRight: 20 }}
//                     href={`/campaign/${record?.campaignId}/ad/${record?.key}`}
//                 >
//                     {text}
//                 </Link>
//                 <Image
//                     className="mr-2 hidden group-hover:block cursor-pointer"
//                     src="/editPurple.svg"
//                     alt="edit"
//                     width={15}
//                     height={15}
//                 />
//             </div>
//         ),
//         fixed: 'left',
//         className: 'border-r-2',
//     },
//     {
//         title: 'Status',
//         dataIndex: 'status',
//         render: (text: any) => (
//             <div className="flex items-center">
//                 {text === 'Active' && (
//                     <div className="text-[#0B8043] flex items-center">
//                         <div className="rounded-lg w-3 h-3 bg-[#0B8043] mr-2"></div>{' '}
//                         {text}
//                     </div>
//                 )}
//                 {text === 'Paused' && (
//                     <div className="text-[#B07F00] flex items-center">
//                         <Image
//                             className="mr-1"
//                             src="/paused.svg"
//                             alt="paused"
//                             width={15}
//                             height={15}
//                         />
//                         {text}
//                     </div>
//                 )}
//                 {text === 'Stopped' && (
//                     <div className="text-[#C53929] flex items-center">
//                         <div className="circle w-4 h-4 bg-[#C53929] text-white mr-1">
//                             <span>x</span>
//                         </div>{' '}
//                         {text}
//                     </div>
//                 )}
//             </div>
//         ),
//     },
//     {
//         title: 'Campaigns',
//         dataIndex: 'campaigns',
//     },
//     {
//         title: 'Clicks',
//         dataIndex: 'clicks',
//     },
//     {
//         title: 'Impressions',
//         dataIndex: 'impressions',
//     },
//     {
//         title: 'Goal',
//         dataIndex: 'goal',
//     },
//     {
//         title: 'Daily Targets',
//         dataIndex: 'dailyTargets',
//     },
//     {
//         title: 'Installs',
//         dataIndex: 'installs',
//     },
// ];

import type { InputRef } from 'antd';
import { Form, Input, Table } from 'antd';
import type { FormInstance } from 'antd/es/form';
import React, { useContext, useRef } from 'react';

const EditableContext = React.createContext<FormInstance<any> | null>(null);

interface Item {
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

interface EditableRowProps {
    index: number;
}

const EditableRow: React.FC<EditableRowProps> = ({ index, ...props }) => {
    const [form] = Form.useForm();
    return (
        <Form form={form} component={false}>
            <EditableContext.Provider value={form}>
                <tr {...props} />
            </EditableContext.Provider>
        </Form>
    );
};

interface EditableCellProps {
    title: React.ReactNode;
    editable: boolean;
    children: React.ReactNode;
    dataIndex: keyof Item;
    record: Item;
    handleSave: (record: Item) => void;
}

const EditableCell: React.FC<EditableCellProps> = ({
    title,
    editable,
    children,
    dataIndex,
    record,
    handleSave,
    ...restProps
}) => {
    const [editing, setEditing] = useState(false);
    const inputRef = useRef<InputRef>(null);
    const form = useContext(EditableContext)!;
    const [updateAdGroupByName, { isSuccess }] =
        useUpdateAdGroupByNameMutation();

    useEffect(() => {
        if (editing) {
            inputRef.current!.focus();
        }
    }, [editing]);

    const toggleEdit = () => {
        setEditing(!editing);
        form.setFieldsValue({ [dataIndex]: record[dataIndex] });
    };

    const save = async () => {
        try {
            const values = await form.validateFields();
            const res = await updateAdGroupByName({
                name: values?.applicationName,
                adsId: record?.key,
            });
            console.log(res);
            toggleEdit();
            handleSave({ ...record, ...values });
        } catch (errInfo) {
            console.log('Save failed:', errInfo);
        }
    };

    let childNode = children;

    if (editable) {
        childNode = editing ? (
            <Form.Item
                style={{ margin: 0 }}
                name={dataIndex}
                rules={[
                    {
                        required: true,
                        message: `${title} is required.`,
                    },
                ]}
            >
                <Input ref={inputRef} onPressEnter={save} onBlur={save} />
            </Form.Item>
        ) : (
            <div
                className="editable-cell-value-wrap"
                style={{ paddingRight: 24 }}
                onClick={toggleEdit}
            >
                {children}
            </div>
        );
    }

    return <td {...restProps}>{childNode}</td>;
};

type EditableTableProps = Parameters<typeof Table>[0];

// interface DataType {
//     key: string;
//     applicationName: string;
//     applicationImage: string;
//     status: string;
//     campaigns: number;
//     clicks: number;
//     impressions: number;
//     goal: number;
//     dailyTargets: number;
//     installs: number;
// }

type ColumnTypes = Exclude<EditableTableProps['columns'], undefined>;

export default function CampaignDetails() {
    const [selectedRowKeys, setSelectedRowKeys] = useState([]);

    const rowSelection = {
        selectedRowKeys,
        onChange: (selectedRowKeys: any) => {
            setSelectedRowKeys(selectedRowKeys);
        },
    };
    const dispatch = useAppDispatch();
    const [campaign, setCampaign] = useState<Campaign>();
    const [tableData, setTableData] = useState([]);
    const router: any = useRouter();
    const { campaignId } = router.query;
    const {
        data: newCampaign,
        isLoading,
        isError,
        refetch,
    } = useGetCampaignByIdQuery(campaignId);
    const defaultColumns: (ColumnTypes[number] & {
        editable?: boolean;
        dataIndex: string;
    })[] = [
        {
            title: 'Group Name',
            dataIndex: 'applicationName',
            editable: true,
            render: (text: any, record: any) => (
                <div className="flex items-center group">
                    {/* <Image src={appIcon} alt={'appicon'} width={34} height={34} /> */}
                    <Link
                        style={{ marginLeft: 8, marginRight: 20 }}
                        href={`/campaign/${record?.campaignId}/ad/${record?.key}`}
                    >
                        {text}
                    </Link>
                    <Image
                        className="mr-2 hidden group-hover:block cursor-pointer"
                        src="/editPurple.svg"
                        alt="edit"
                        width={15}
                        height={15}
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
                                <span>x</span>
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

    const handleSave = (row: DataType) => {
        refetch();
    };

    const components = {
        body: {
            row: EditableRow,
            cell: EditableCell,
        },
    };

    const columns = defaultColumns.map((col) => {
        if (!col.editable) {
            return col;
        }
        return {
            ...col,
            onCell: (record: DataType) => ({
                record,
                editable: col.editable,
                dataIndex: col.dataIndex,
                title: col.title,
                handleSave,
            }),
        };
    });

    if (!isLoading && !isError) {
        dispatch(createCampaign(newCampaign?.data));
    }
    useEffect(() => {
        if (campaignId) {
            refetch();
        }
        setCampaign(newCampaign?.data);
    }, [newCampaign, refetch, campaignId]);

    useEffect(() => {
        if (!isLoading && !isError && newCampaign?.data?._id) {
            const tableData = newCampaign?.data?.ads.map((ad: any) => {
                return {
                    key: ad?._id,
                    campaignId: newCampaign?.data?._id,
                    applicationName: ad?.name,
                    applicationImage: '/images/app2.png',
                    status: ad?.status,
                    campaigns: 5,
                    clicks: 500,
                    impressions: 2500,
                    goal: 5000,
                    dailyTargets: 100,
                    installs: 400,
                };
            });
            // content = <DashBoardTable data={tableData} columns={columns} />;
            setTableData(tableData);
        }
    }, [isLoading, isError, newCampaign]);

    return (
        <div>
            <div className="flex justify-between items-center">
                <div>
                    <Goback />
                    <div className="mt-[16px]">
                        <Breadcrumb separator=">">
                            <Breadcrumb.Item>Campaign</Breadcrumb.Item>
                            <Breadcrumb.Item>Your Campaign</Breadcrumb.Item>
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
                                {isLoading ? (
                                    <Skeleton.Avatar
                                        active
                                        size="large"
                                        shape="square"
                                    />
                                ) : (
                                    <Image
                                        src={appIcon}
                                        className=""
                                        alt="app"
                                        width={69}
                                        height={69}
                                    />
                                )}
                            </div>
                            <div className="flex flex-col justify-around ml-5">
                                <div className="text-purple font-bold text-2sm">
                                    {isLoading ? (
                                        <Skeleton.Input
                                            active
                                            size="small"
                                            style={{ minWidth: '100px' }}
                                        />
                                    ) : (
                                        'Application name:'
                                    )}
                                </div>
                                <div className="text-2xl font-bold text-gray-450">
                                    {isLoading ? (
                                        <Skeleton.Input
                                            active
                                            size="large"
                                            style={{ minWidth: '200px' }}
                                        />
                                    ) : (
                                        campaign?.appName
                                    )}
                                </div>
                            </div>
                        </div>
                        <div className="flex flex-col justify-around mr-28 ">
                            <div className="text-purple font-bold text-2sm">
                                {isLoading ? (
                                    <Skeleton.Input
                                        active
                                        size="small"
                                        style={{ minWidth: '50px' }}
                                    />
                                ) : (
                                    'status:'
                                )}
                            </div>
                            {isLoading ? (
                                <Skeleton.Input
                                    active
                                    size="small"
                                    style={{ minWidth: '50px' }}
                                />
                            ) : (
                                <CustomSelect
                                    id={campaign?._id as string}
                                    status={campaign?.status}
                                />
                            )}
                        </div>
                    </div>
                    <div className="w-1/2 flex justify-around">
                        <div className="flex flex-col justify-around ml-5 w=[69px] h-[69px]">
                            <div className="text-purple font-bold text-2sm">
                                {isLoading ? (
                                    <Skeleton.Input
                                        active
                                        size="small"
                                        style={{ minWidth: '50px' }}
                                    />
                                ) : (
                                    'Revenue:'
                                )}
                            </div>
                            <div className="text-3xl font-[800] text-gray-450">
                                {isLoading ? (
                                    <Skeleton.Input
                                        active
                                        size="small"
                                        style={{ minWidth: '50px' }}
                                    />
                                ) : (
                                    '$ 99.25'
                                )}
                            </div>
                        </div>
                        <div className="flex flex-col justify-around ml-5">
                            <div className="text-purple font-bold text-2sm">
                                {isLoading ? (
                                    <Skeleton.Input
                                        active
                                        size="small"
                                        style={{ minWidth: '50px' }}
                                    />
                                ) : (
                                    'Installs:'
                                )}
                            </div>
                            <div className="text-3xl font-base text-gray-450">
                                {isLoading ? (
                                    <Skeleton.Input
                                        active
                                        size="small"
                                        style={{ minWidth: '50px' }}
                                    />
                                ) : (
                                    '2500'
                                )}
                            </div>
                        </div>
                        <div className="flex flex-col justify-around ml-5">
                            <div className="text-purple font-bold text-2sm">
                                {isLoading ? (
                                    <Skeleton.Input
                                        active
                                        size="small"
                                        style={{ minWidth: '50px' }}
                                    />
                                ) : (
                                    'Total Cost:'
                                )}
                            </div>
                            <div className="text-3xl font-base text-gray-450">
                                {isLoading ? (
                                    <Skeleton.Input
                                        active
                                        size="small"
                                        style={{ minWidth: '50px' }}
                                    />
                                ) : (
                                    '$ 33089.78'
                                )}
                            </div>
                        </div>
                    </div>
                </div>
                <div className="flex justify-between border-t-2 pt-5">
                    <div className="flex flex-col justify-around ml-5 h-[69px]">
                        <div className="text-purple font-bold text-2sm">
                            {isLoading ? (
                                <Skeleton.Input
                                    active
                                    size="small"
                                    style={{ minWidth: '50px' }}
                                />
                            ) : (
                                'Clicks:'
                            )}
                        </div>
                        <div className="text-2xl font-semibold text-gray-450">
                            {isLoading ? (
                                <Skeleton.Input
                                    active
                                    size="small"
                                    style={{ minWidth: '50px' }}
                                />
                            ) : (
                                '33089.78'
                            )}
                        </div>
                    </div>
                    <div className="flex flex-col justify-around ml-5">
                        <div className="text-purple font-bold text-2sm">
                            {isLoading ? (
                                <Skeleton.Input
                                    active
                                    size="small"
                                    style={{ minWidth: '50px' }}
                                />
                            ) : (
                                'Impressions:'
                            )}
                        </div>
                        <div className="text-2xl font-semibold text-gray-450">
                            {isLoading ? (
                                <Skeleton.Input
                                    active
                                    size="small"
                                    style={{ minWidth: '50px' }}
                                />
                            ) : (
                                '330'
                            )}
                        </div>
                    </div>
                    <div className="flex flex-col justify-around ml-5">
                        <div className="text-purple font-bold text-2sm">
                            {isLoading ? (
                                <Skeleton.Input
                                    active
                                    size="small"
                                    style={{ minWidth: '50px' }}
                                />
                            ) : (
                                'CPN:'
                            )}
                        </div>
                        <div className="text-2xl font-semibold text-gray-450">
                            {isLoading ? (
                                <Skeleton.Input
                                    active
                                    size="small"
                                    style={{ minWidth: '50px' }}
                                />
                            ) : (
                                '330'
                            )}
                        </div>
                    </div>
                    <div className="flex flex-col justify-around ml-5">
                        <div className="text-purple font-bold text-2sm">
                            {isLoading ? (
                                <Skeleton.Input
                                    active
                                    size="small"
                                    style={{ minWidth: '50px' }}
                                />
                            ) : (
                                'CPC:'
                            )}
                        </div>
                        <div className="text-2xl font-semibold text-gray-450">
                            {isLoading ? (
                                <Skeleton.Input
                                    active
                                    size="small"
                                    style={{ minWidth: '50px' }}
                                />
                            ) : (
                                '330'
                            )}
                        </div>
                    </div>
                    <div className="flex flex-col justify-around ml-5">
                        <div className="text-purple font-bold text-2sm">
                            {isLoading ? (
                                <Skeleton.Input
                                    active
                                    size="small"
                                    style={{ minWidth: '50px' }}
                                />
                            ) : (
                                'Reach:'
                            )}
                        </div>
                        <div className="text-2xl font-semibold text-gray-450">
                            {isLoading ? (
                                <Skeleton.Input
                                    active
                                    size="small"
                                    style={{ minWidth: '50px' }}
                                />
                            ) : (
                                '330'
                            )}
                        </div>
                    </div>
                    <div className="flex flex-col justify-around ml-5">
                        <div className="text-purple font-bold text-2sm">
                            {isLoading ? (
                                <Skeleton.Input
                                    active
                                    size="small"
                                    style={{ minWidth: '50px' }}
                                />
                            ) : (
                                'Daily Target:'
                            )}
                        </div>
                        <div className="text-2xl font-semibold text-gray-450">
                            {isLoading ? (
                                <Skeleton.Input
                                    active
                                    size="small"
                                    style={{ minWidth: '50px' }}
                                />
                            ) : (
                                '330'
                            )}
                        </div>
                    </div>
                    <div className="flex flex-col justify-around ml-5">
                        <div className="text-purple font-bold text-2sm">
                            {isLoading ? (
                                <Skeleton.Input
                                    active
                                    size="small"
                                    style={{ minWidth: '50px' }}
                                />
                            ) : (
                                'Event:'
                            )}
                        </div>
                        <div className="text-2xl font-semibold text-gray-450">
                            {isLoading ? (
                                <Skeleton.Input
                                    active
                                    size="small"
                                    style={{ minWidth: '50px' }}
                                />
                            ) : (
                                '330'
                            )}
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
            <Link
                href="/campaign/add-group"
                className="bg-purple flex items-center justify-center w-[164px] h-[52px] rounded-[3px] mt-1"
            >
                <div className="text-purple  bg-white rounded-[3px]  w-[26px] h-[26px] flex items-center p-3 justify-center text-2xl font-bold">
                    +
                </div>
                <div className="text-white text-2sm font-bold ml-[14px]">
                    New Group
                </div>
            </Link>
            <div className="space-y-4 mt-8">
                <div className="flex justify-between text-450">
                    <div className="flex items-center">
                        <CampaignIconPurpple />{' '}
                        <div className="ml-2 font-bold text-lg">AD Groups</div>
                    </div>
                    <Dropdown menu={{ items }}>
                        <div className="flex justify-around bg-[#E5E5E5] p-2 font-bold text-lg rounded-[3px] cursor-pointer">
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
                    {isLoading ? (
                        <Table
                            components={components}
                            rowClassName={() => 'editable-row'}
                            bordered
                            dataSource={loadingData}
                            columns={loadingStateColumns as ColumnTypes}
                            rowSelection={rowSelection}
                            scroll={{ x: 1700 }}
                            pagination={false}
                        />
                    ) : (
                        <Table
                            components={components}
                            rowClassName={() => 'editable-row'}
                            bordered
                            dataSource={tableData}
                            columns={columns as ColumnTypes}
                            rowSelection={rowSelection}
                            scroll={{ x: 1700 }}
                            pagination={false}
                        />
                    )}
                </div>
            </div>
        </div>
    );
}
