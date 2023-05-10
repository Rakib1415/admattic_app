import { Button, Checkbox, Form, Input, Modal, Skeleton } from 'antd';
// import { CheckboxValueType } from 'antd/lib/checkbox/Group';
import { useAppDispatch, useAppSelector } from '@/app/redux-hooks';
import { createCampaignInfo } from '@/features/campaign/campaignSlice';
import type { CheckboxValueType } from 'antd/es/checkbox/Group';
import { SearchIcon } from 'constants/icons';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

const CheckboxGroup = Checkbox.Group;

type Option = {
    label: string;
    value: string;
};

const options: Option[] = [
    { label: 'Get new people to install your app', value: 'App Install' },
    {
        label: 'Get existing users to take action in your app. Minimum 250 k install to run',
        value: 'App Engagement',
    },
    {
        label: 'Get existing users to take action in your app. Minimum 250 k install to run',
        value: 'App Pre-registration (Android only)',
    },
];

export default function CreateCampaigns({
    setCurrent,
    current,
    editMode = false,
    onTabChange,
}: {
    setCurrent?: any;
    current?: any;
    editMode?: boolean;
    onTabChange?: any;
}) {
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
    const [campaignType, setCampaignType] = useState<string>('');
    const [campaignName, setCampaignName] = useState<string>('');
    const [platforms, SetPlatforms] = useState<string[]>([]);
    const [appName, setAppName] = useState<string>('');
    const dispatch: any = useAppDispatch();
    const { campaign } = useAppSelector((state) => state.campaign);
    const router = useRouter();
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        setTimeout(() => {
            setLoading(false);
        }, 2000);
    }, []);

    useEffect(() => {
        if (editMode) {
            const { type, platforms, appName, name } = campaign;
            setCampaignType(type);
            setCampaignName(name);
            setAppName(appName);
            SetPlatforms(platforms);
        }
    }, [editMode, campaign]);

    const handleSelectCampaignType = (checkedValue: CheckboxValueType) => {
        setCampaignType(checkedValue as string);
    };
    // console.log(campaignName);

    const handleChangeCampaignName = (
        event: React.ChangeEvent<HTMLInputElement>
    ) => {
        setCampaignName(event.target.value);
    };

    const handleSelectPlatform = (checkedValues: CheckboxValueType[]) => {
        SetPlatforms(checkedValues as string[]);
    };

    const handleCancel = () => {
        setIsModalOpen(false);
    };
    return (
        <div className="space-y-8 mt-10">
            <div className="bg-white w-full px-5 py-7 billing-box-border ">
                <div className="text-gray-450 opacity-[0.8] text-sm font-bold">
                    Select a Campaign Subtype
                </div>
                <div>
                    <CheckboxGroup value={[campaignType]}>
                        <div className="mt-4">
                            {options.map(({ value, label }) => (
                                <>
                                    <Checkbox
                                        className="flex "
                                        value={value}
                                        key={value}
                                        checked={value === campaignType}
                                        onChange={() =>
                                            handleSelectCampaignType(value)
                                        }
                                    >
                                        <div className=" text-lg font-semibold  text-black  ">
                                            {loading ? (
                                                <Skeleton.Input
                                                    active
                                                    size="small"
                                                    style={{
                                                        minWidth:
                                                            value.length * 10,
                                                    }}
                                                />
                                            ) : (
                                                value
                                            )}
                                        </div>
                                        <div className=" text-sm font-semibold  text-gray-450 opacity-[0.8]  ">
                                            {loading ? (
                                                <Skeleton.Input
                                                    active
                                                    size="small"
                                                    style={{
                                                        minWidth:
                                                            label.length * 10,
                                                    }}
                                                />
                                            ) : (
                                                label
                                            )}
                                        </div>
                                    </Checkbox>
                                    <br />
                                </>
                            ))}
                        </div>
                    </CheckboxGroup>
                </div>
            </div>

            <div className="bg-white w-full px-5 py-7  billing-box-border ">
                <div className="text-gray-450 opacity-[0.8] text-sm font-bold">
                    Select your mobile app’s platform{' '}
                </div>
                <div>
                    <CheckboxGroup
                        value={platforms}
                        onChange={handleSelectPlatform}
                    >
                        <div className="mt-4">
                            <Checkbox
                                className="flex item-center"
                                value="Android"
                                name="Stripe"
                            >
                                <div className=" text-lg font-semibold  text-black  ">
                                    {loading ? (
                                        <Skeleton.Input
                                            active
                                            style={{
                                                minWidth: '120px',
                                            }}
                                        />
                                    ) : (
                                        'Android'
                                    )}
                                </div>
                            </Checkbox>
                            <br />
                            <Checkbox
                                className="flex "
                                value="iOS"
                                name="Stripe"
                            >
                                <div className=" text-lg font-semibold  text-black  ">
                                    {loading ? (
                                        <Skeleton.Input
                                            active
                                            size="small"
                                            style={{
                                                minWidth: '50px',
                                            }}
                                        />
                                    ) : (
                                        'iOS'
                                    )}
                                </div>
                            </Checkbox>
                        </div>
                    </CheckboxGroup>
                </div>
                <div className="text-2lg text-[#6900B8] mt-5">
                    {loading ? (
                        <Skeleton.Input
                            active
                            size="small"
                            style={{
                                minWidth: '200px',
                            }}
                        />
                    ) : (
                        'Search for your app'
                    )}
                </div>
                <div className="search-wrapper app-search flex items-center bg-white h-[46px] w-[700px] rounded-[3px] p-2 mt-5">
                    {loading ? (
                        <Skeleton.Avatar
                            active
                            size="small"
                            shape="square"
                            style={{ minWidth: '20px', marginRight: '15px' }}
                        />
                    ) : (
                        <SearchIcon />
                    )}
                    {loading ? (
                        <Skeleton.Input
                            active
                            size="small"
                            style={{ minWidth: '250px' }}
                        />
                    ) : (
                        <Input
                            onChange={(e) => setAppName(e.target.value)}
                            value={appName}
                            className="bg-white"
                            placeholder="Search Apps"
                            style={{ width: 700 }}
                            bordered={false}
                        />
                    )}
                </div>
            </div>
            <div className="bg-white w-full px-5 py-7  billing-box-border ">
                <div className="text-gray-450 opacity-[0.8] text-sm font-bold">
                    Campaign Name{' '}
                </div>
                <div>
                    <div className="mt-4">
                        <div className="w-[454px]">
                            <Form.Item
                                className="float-container"
                                name={'campaignName'}
                                rules={[{ required: true }]}
                            >
                                {loading ? (
                                    <Skeleton
                                        active
                                        avatar={false}
                                        title={false}
                                        paragraph={{
                                            rows: 2,
                                            width: [100, 200],
                                        }}
                                    />
                                ) : (
                                    <>
                                        <label className="ml-2 text-gray-450 opacity-[0.7] text-sm font-bold">
                                            Enter Campaign Name{' '}
                                        </label>
                                        <Input
                                            type="name"
                                            value={campaignName}
                                            onChange={handleChangeCampaignName}
                                            style={{
                                                border: 'none',
                                            }}
                                        />
                                    </>
                                )}
                            </Form.Item>
                        </div>
                    </div>
                </div>
            </div>
            {editMode && (
                <div className="flex justify-between">
                    <Button
                        onClick={() =>
                            router.push(`/campaign/${campaign?._id}`)
                        }
                        className="bg-white text-purple text-sm text-bold w-[135px] h-[49px]"
                    >
                        Cancel
                    </Button>
                    <Button
                        onClick={() => {
                            onTabChange('2');
                            dispatch(
                                createCampaignInfo({
                                    name: campaignName,
                                    type: campaignType,
                                    platforms,
                                    appName,
                                })
                            );
                        }}
                        className="bg-purple text-white text-sm text-bold w-[135px] h-[49px] "
                    >
                        Done
                    </Button>
                </div>
            )}
            {!editMode && (
                <div className="flex justify-between">
                    <Button
                        className="bg-white text-purple text-sm text-bold w-[135px] h-[49px]"
                        onClick={() => setIsModalOpen(true)}
                    >
                        Cancel
                    </Button>
                    {campaignName && (
                        <Button
                            className="bg-purple text-white text-sm text-bold w-[135px] h-[49px] "
                            onClick={() => {
                                setCurrent(current + 1);
                                dispatch(
                                    createCampaignInfo({
                                        name: campaignName,
                                        type: campaignType,
                                        platforms,
                                        appName,
                                    })
                                );
                            }}
                        >
                            Next
                        </Button>
                    )}
                </div>
            )}
            <Modal
                title="Discard Changes"
                open={isModalOpen}
                width={424}
                onCancel={handleCancel}
                footer={[]}
            >
                <div className="text-gray-450 opacity-0.5 text-2sm">
                    Are you sure you want to discard all changes
                </div>
                <div className="flex justify-between mt-4">
                    <div
                        onClick={() => {
                            setIsModalOpen(false);
                        }}
                        className="bg-purple text-white text-2lg w-[135px] h-[49px] rounded-sm flex justify-center items-center cursor-pointer"
                    >
                        Cancel
                    </div>
                    <Link
                        href="/campaign"
                        className="bg-white  text-purple border-purple border-2 text-2lg w-[135px] h-[49px] rounded-[3px] flex justify-center items-center cursor-pointer"
                    >
                        Discard
                    </Link>
                </div>
            </Modal>
        </div>
    );
}
