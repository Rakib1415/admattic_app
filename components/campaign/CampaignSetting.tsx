import { useAppDispatch, useAppSelector } from '@/app/redux-hooks';
import {
    useAddCampaignMutation,
    useEditCampaignMutation,
} from '@/features/campaign/campaignApi';
import { createCampaign } from '@/features/campaign/campaignSlice';
import { Token } from '@/utils';
import {
    Button,
    Checkbox,
    Input,
    Modal,
    Select,
    Skeleton,
    Space,
    notification,
} from 'antd';
import type { CheckboxValueType } from 'antd/es/checkbox/Group';
import { SearchIcon } from 'constants/icons';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import app from '../../public/app1.png';
import AdjustComponent from './AdjustComponent';
import AppMetricaComponent from './AppMetricaComponent';
import AppsFlyerComponent from './AppsFlyerComponent';
import BranchComponent from './BranchComponent';
const { Option } = Select;

type InputOption = {
    label: string;
    value: string;
};

const options: InputOption[] = [
    { value: 'Adjust', label: 'Adjust' },
    { value: 'AppMetrica', label: 'AppMetrica' },
    { value: 'AppsFlyer', label: 'AppsFlyer' },
    { value: 'Branch', label: 'Branch' },
];

const locationOptions: InputOption[] = [
    { value: 'All countries', label: 'All countries and territories' },
    { value: 'India', label: 'India' },
    { value: 'Another countries', label: 'Enter another location' },
];

const initailState = [
    { id: 1, token: '', event: '' },
    { id: 2, token: '', event: '' },
];

export default function CampaignSetting({
    setCurrent,
    current,
    editMode = false,
}: {
    setCurrent?: any;
    current?: any;
    editMode?: boolean;
}) {
    const [selectedOption, setSelectedOption] = useState<string>('');
    const [location, setLocation] = useState<string>('');
    const [country, setCountry] = useState<string>('');
    const [language, setLanguage] = useState<string>('');
    const [tokenItems, setTokenItems] = useState<Token[]>(initailState);
    const [trackingUrl, setTrackingUrl] = useState<string>('');
    const [impressionUrl, setImpressionUrl] = useState<string>('');
    const [finalClickUrl, setFinalClickUrl] = useState<string>('');
    const [finalClickUrlTwo, setFinalClickUrlTwo] = useState<string>('');
    const [loading, setLoading] = useState<boolean>(true);

    const router = useRouter();
    const { campaignInfo, campaign } = useAppSelector(
        (state) => state.campaign
    );
    const dispatch = useAppDispatch();
    const [addCampaign, { isSuccess, data }] = useAddCampaignMutation();
    const [editCampaign, { isSuccess: editSuccess, data: editData }] =
        useEditCampaignMutation();

    useEffect(() => {
        setTimeout(() => {
            setLoading(false);
        }, 2000);
    }, []);

    useEffect(() => {
        if (editMode) {
            const { language, location, conversionTracking } = campaign;
            const {
                typeName,
                trackingUrl,
                impressionUrl,
                finalClickUrl,
                finalClickUrlTwo,
                tokenEvents,
            } = conversionTracking || {};
            setSelectedOption(typeName);
            setLocation(location as string);
            setLanguage(language as string);
            setTrackingUrl(trackingUrl);
            setImpressionUrl(impressionUrl);
            setFinalClickUrl(finalClickUrl);
            setFinalClickUrlTwo(finalClickUrlTwo);
            setTokenItems(tokenEvents);
        }
    }, [editMode, campaign]);

    const createCampaignSettings = (typeName: string) => {
        let campaignSettigns = {};
        switch (typeName) {
            case 'Adjust':
                campaignSettigns = {
                    location: location || country,
                    language,
                    conversionTracking: {
                        typeName,
                        trackingUrl,
                        impressionUrl,
                        finalClickUrl,
                        finalClickUrlTwo,
                        tokenEvents: tokenItems,
                    },
                };
                return campaignSettigns;
            case 'AppMetrica':
                campaignSettigns = {
                    location: location || country,
                    language,
                    conversionTracking: {
                        typeName,
                        trackingUrl,
                        impressionUrl,
                    },
                };
                return campaignSettigns;
            case 'AppsFlyer':
                campaignSettigns = {
                    location: location || country,
                    language,
                    conversionTracking: {
                        typeName,
                        trackingUrl,
                        impressionUrl,
                    },
                };
                return campaignSettigns;
            case 'Branch':
                campaignSettigns = {
                    location: location || country,
                    language,
                    conversionTracking: {
                        typeName,
                        trackingUrl,
                        impressionUrl,
                    },
                };
                return campaignSettigns;
            default:
                return campaignSettigns;
        }
    };

    const handleSubmit = async (campaignSettings: object) => {
        const campaign = {
            ...campaignInfo,
            ...campaignSettings,
        };
        await addCampaign(campaign);
    };

    useEffect(() => {
        if (isSuccess) {
            const { campaign, message } = data || {};
            dispatch(createCampaign(campaign));
            notification.open({
                message: 'Success',
                description: message,
            });
            router.push({
                pathname: `/campaign/${campaign?._id}`,
            });
        }
    }, [isSuccess, data, dispatch, router]);

    const handleCampaignUpdate = async (campaignSettings: object) => {
        const campaignData = {
            campaignId: campaign?._id,
            ...campaignInfo,
            ...campaignSettings,
        };
        await editCampaign(campaignData);
    };

    useEffect(() => {
        if (editSuccess) {
            const { message } = editData || {};
            // console.log(editData);
            // dispatch(createCampaign(campaign));
            notification.open({
                message: 'Success',
                description: message,
            });
            router.push({
                pathname: `/campaign/${campaign?._id}`,
            });
        }
    }, [editSuccess, campaign, editData, router]);

    const handleSelectLocation = (checkedValue: CheckboxValueType) => {
        setLocation(checkedValue as string);
    };

    const handleChangeLanguage = (
        event: React.ChangeEvent<HTMLInputElement>
    ) => {
        setLanguage(event.target.value);
    };
    // console.log(language);

    const handleChangeTrackingUrl = (
        event: React.ChangeEvent<HTMLTextAreaElement>
    ) => {
        setTrackingUrl(event.target.value);
    };

    const handleChangeImpressionUrl = (
        event: React.ChangeEvent<HTMLTextAreaElement>
    ) => {
        setImpressionUrl(event.target.value);
    };

    const handleChangeCountry = (
        event: React.ChangeEvent<HTMLInputElement>
    ) => {
        const validCountryRegex = /^([A-Za-z]{2}|[A-Za-z ]+)$/;
        if (
            validCountryRegex.test(event.target.value) ||
            event.target.value === ''
        ) {
            setCountry(event.target.value);
        }
    };

    // console.log(country);
    const handleChange = (value: string) => {
        setSelectedOption(value);
    };

    // console.log({
    //     tokenItems,
    //     trackingUrl,
    //     impressionUrl,
    //     finalClickUrl,
    //     finalClickUrlTwo,
    // });

    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

    const handleCancel = () => {
        setIsModalOpen(false);
    };
    return (
        <div className="space-y-8 mt-10">
            <div>
                <div className="text-[#333333 ] text-sm font-bold">
                    Campaign settings
                </div>
                <div className="text-gray-450 opacit-[0.4] mt-3">
                    To reach the right people, start by defining key settings
                    for your campaign
                </div>
            </div>
            <div className="bg-white w-full px-4 py-4 billing-box-border ">
                <div className="text-gray-450 opacity-[0.8] text-sm font-bold">
                    Mobile app
                </div>
                <div>
                    <div className="mt-4 flex items-center">
                        {loading ? (
                            <Skeleton.Avatar
                                active
                                shape="square"
                                size="large"
                            />
                        ) : (
                            <Image
                                src={app}
                                alt="app imahe"
                                width={48}
                                height={48}
                            />
                        )}
                        <div className="text-gray-450 text-lg font-[500] ml-5">
                            <div>
                                {loading ? (
                                    <Skeleton.Input active size="small" />
                                ) : (
                                    'Swoop News'
                                )}
                            </div>
                            <div>
                                <span className="text-[#6900B8]">
                                    {loading ? (
                                        <Skeleton.Input active size="small" />
                                    ) : (
                                        'app.swoop.news'
                                    )}
                                </span>
                                -
                                <span>
                                    {' '}
                                    {loading ? (
                                        <Skeleton.Input active size="small" />
                                    ) : (
                                        'Gyrodile Network'
                                    )}
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="bg-white w-full px-4 py-4  billing-box-border ">
                <div className="text-gray-450 opacity-[0.8] text-sm font-bold">
                    Location{' '}
                </div>
                <Checkbox.Group value={[location]}>
                    <div className="mt-4">
                        {locationOptions.map(({ value, label }) => (
                            <>
                                <Checkbox
                                    className="flex item-center"
                                    value={value}
                                    key={value}
                                    checked={location === value}
                                    onChange={() => handleSelectLocation(value)}
                                >
                                    <div className=" text-lg font-semibold  text-black  ">
                                        {loading ? (
                                            <Skeleton.Input
                                                active
                                                size="small"
                                                style={{
                                                    minWidth: label.length * 10,
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
                        {/* <Checkbox
                            className="flex item-center"
                            value="All countries and territories"
                            key="All countries and territories"
                            checked={
                                location === 'All countries and territories'
                            }
                            onChange={() =>
                                handleSelectLocation(
                                    'All countries and territories'
                                )
                            }
                        >
                            <div className=" text-lg font-semibold  text-black  ">
                                All countries and territories
                            </div>
                        </Checkbox>
                        <br />
                        <Checkbox
                            className="flex "
                            value="India"
                            key="India"
                            checked={location === 'India'}
                            onChange={() => handleSelectLocation('India')}
                        >
                            <div className=" text-lg font-semibold  text-black  ">
                                India
                            </div>
                        </Checkbox>
                        <br />
                        <Checkbox
                            className="flex item-center"
                            value="otherCountries"
                            name="otherCoutries"
                            checked={location === 'Enter another location'}
                            onChange={() =>
                                handleSelectLocation('Enter another location')
                            }
                        >
                            <div className=" text-lg font-semibold  text-black  ">
                                Enter another location
                            </div>
                        </Checkbox> */}
                    </div>
                </Checkbox.Group>
                <div className="search-wrapper country-search flex items-center bg-white h-[46px] w-[597px] rounded-[3px] p-2 mt-5">
                    <SearchIcon />
                    <Input
                        disabled={location !== 'Another countries'}
                        value={country}
                        onChange={handleChangeCountry}
                        className="bg-white"
                        placeholder="Search And Select your country"
                        style={{ width: 597 }}
                        bordered={false}
                    />
                </div>
            </div>
            <div className="bg-white w-full px-5 py-7  billing-box-border ">
                <div className="text-gray-450 opacity-[0.8] text-sm font-bold">
                    Language
                </div>
                <div className="text-gray-450  text-lg font-bold mt-2">
                    {loading ? (
                        <Skeleton.Input
                            active
                            size="small"
                            style={{
                                minWidth: '350px',
                            }}
                        />
                    ) : (
                        'Select the language your customers speak.'
                    )}
                </div>
                <div className="search-wrapper country-search flex items-center bg-white h-[46px] w-[597px] rounded-[3px] p-2 mt-5">
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
                            style={{ minWidth: '350px' }}
                        />
                    ) : (
                        <Input
                            className="bg-white"
                            placeholder="Start typing or select a language"
                            style={{ width: 597 }}
                            bordered={false}
                            value={language}
                            onChange={handleChangeLanguage}
                        />
                    )}
                </div>
            </div>
            <div className="bg-white w-full py-7 pl-7 pr-28  billing-box-border ">
                <div className="text-gray-450 opacity-[0.8] text-sm font-bold">
                    Tracking
                </div>
                <div className="text-gray-450  text-lg font-bold mt-2">
                    Conversion Tracking
                </div>
                <div>
                    <div className="mt-4">
                        {loading ? (
                            <Skeleton.Input
                                active
                                size="small"
                                style={{ minWidth: '350px' }}
                            />
                        ) : (
                            <Select
                                size="large"
                                className="mt-3"
                                style={{ minWidth: '450px' }}
                                placeholder="Select Tracking Partner"
                                // defaultValue=""
                                optionLabelProp="label"
                                onChange={handleChange}
                                value={selectedOption}
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
                        )}
                    </div>
                </div>
                {selectedOption === 'Adjust' && (
                    <AdjustComponent
                        tokenItems={tokenItems}
                        setTokenItems={setTokenItems}
                        trackingUrl={trackingUrl}
                        handleChangeTrackingUrl={handleChangeTrackingUrl}
                        impressionUrl={impressionUrl}
                        handleChangeImpressionUrl={handleChangeImpressionUrl}
                        finalClickUrl={finalClickUrl}
                        setFinalClickUrl={setFinalClickUrl}
                        finalClickUrlTwo={finalClickUrlTwo}
                        setFinalClickUrlTwo={setFinalClickUrlTwo}
                    />
                )}
                {selectedOption === 'AppMetrica' && (
                    <AppMetricaComponent
                        trackingUrl={trackingUrl}
                        handleChangeTrackingUrl={handleChangeTrackingUrl}
                        impressionUrl={impressionUrl}
                        handleChangeImpressionUrl={handleChangeImpressionUrl}
                    />
                )}
                {selectedOption === 'AppsFlyer' && (
                    <AppsFlyerComponent
                        trackingUrl={trackingUrl}
                        handleChangeTrackingUrl={handleChangeTrackingUrl}
                        impressionUrl={impressionUrl}
                        handleChangeImpressionUrl={handleChangeImpressionUrl}
                    />
                )}
                {selectedOption === 'Branch' && (
                    <BranchComponent
                        trackingUrl={trackingUrl}
                        handleChangeTrackingUrl={handleChangeTrackingUrl}
                        impressionUrl={impressionUrl}
                        handleChangeImpressionUrl={handleChangeImpressionUrl}
                    />
                )}
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
                        onClick={() =>
                            handleCampaignUpdate(
                                createCampaignSettings(selectedOption)
                            )
                        }
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
                        onClick={() => setCurrent(current - 1)}
                    >
                        Back
                    </Button>
                    {selectedOption && (
                        <Button
                            className="bg-purple text-white text-sm text-bold w-[135px] h-[49px] "
                            onClick={() => {
                                // setCurrent(current + 1);
                                setIsModalOpen(true);
                            }}
                        >
                            Done
                        </Button>
                    )}
                </div>
            )}

            <Modal
                title="Save Changes"
                open={isModalOpen}
                width={424}
                onCancel={handleCancel}
                footer={[]}
            >
                <div className="text-gray-450 opacity-0.5 text-2sm">
                    Are you sure you want to save all changes{' '}
                </div>
                <div className="flex justify-between mt-4">
                    <button
                        onClick={() => {
                            handleSubmit(
                                createCampaignSettings(selectedOption)
                            );
                        }}
                        // href={`/campaign/${campaign?._id}`}
                        className="bg-purple text-white text-2lg w-[135px] h-[49px] rounded-sm flex justify-center items-center cursor-pointer"
                    >
                        save
                    </button>
                    <div
                        className="bg-white  text-purple border-purple border-2 text-2lg w-[135px] h-[49px] rounded-[3px] flex justify-center items-center cursor-pointer"
                        onClick={() => {
                            setIsModalOpen(false);
                        }}
                    >
                        Cancel
                    </div>
                </div>
            </Modal>
        </div>
    );
}
