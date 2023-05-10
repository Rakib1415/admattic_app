import { useAppDispatch } from '@/app/redux-hooks';
import { addBudgetAndBidding } from '@/features/ad-group/adGroupSlice';
import { Button, Checkbox, Select, Skeleton, Space } from 'antd';
import React, { useEffect, useState } from 'react';
const { Option } = Select;

const focusOptions = [
    { value: 'Install volume', label: 'Install volume' },
    { value: 'In-app actions', label: 'In-app actions' },
    { value: 'In-app actions value', label: 'In-app actions value' },
];

const userOptions = [
    { value: 'All user', label: 'All user' },
    {
        value: 'User likely to perform an in-app action',
        label: 'User likely to perform an in-app action',
    },
];

export default function Budget({
    setCurrent,
    current,
}: {
    setCurrent: (e: number) => void;
    current: number;
}) {
    const [dailyBudget, setDailyBudget] = useState<string>('');
    const [focus, setFocus] = useState<string>('');
    const [targetUsers, setTargetUsers] = useState<string>('');
    const [targetCost, setTargetCost] = useState<string>('');
    const dispatch = useAppDispatch();
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        setTimeout(() => {
            setLoading(false);
        }, 2000);
    }, []);

    const handleBudgetChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setDailyBudget(event.target.value);
    };

    const handleFocusChange = (value: string) => {
        setFocus(value);
    };

    const handleTargetUsersChange = (value: string) => {
        setTargetUsers(value);
    };

    const handleTargetCostChange = (
        event: React.ChangeEvent<HTMLInputElement>
    ) => {
        setTargetCost(event.target.value);
    };

    return (
        <div className="space-y-8 mt-10">
            <div>
                <div className="text-[#333333 ] text-sm font-bold">
                    Budget and bidding
                </div>
                <div className="text-gray-450 opacit-[0.4] mt-3">
                    Select the budget and bidding options that work best for
                    your goals
                </div>
            </div>
            <div className="bg-white w-full px-4 py-4 billing-box-border ">
                <div className="text-gray-450 opacity-[0.8] text-sm font-bold">
                    Budget
                </div>
                <div className="mt-4 text-[#000000] text-2sm font-[600]">
                    {loading ? (
                        <Skeleton.Input
                            active
                            size="small"
                            style={{ minWidth: '300px' }}
                        />
                    ) : (
                        'Select your average daily budget for this campaign'
                    )}
                </div>
                <div className="input-wrapper mt-4">
                    <span className="currency">$</span>
                    {loading ? (
                        <Skeleton.Input
                            active
                            size="small"
                            style={{ minWidth: '100px' }}
                        />
                    ) : (
                        <input
                            onChange={handleBudgetChange}
                            value={dailyBudget}
                            type="number"
                            name="price"
                        />
                    )}
                </div>
                <div className="text-gray-450 text-xs opacit-[0.4] mt-3">
                    {loading ? (
                        <Skeleton
                            active
                            avatar={false}
                            paragraph={false}
                            title={{ width: '200px' }}
                        />
                    ) : (
                        'Minimum daily budget $ 100'
                    )}
                </div>
            </div>

            {/* <div className="bg-white w-full px-4 py-4  billing-box-border ">
                <div className="text-gray-450 opacity-[0.8] text-sm font-bold">
                    Location{' '}
                </div>
                <div>
                    <div className="mt-4">
                        <Checkbox
                            className="flex item-center"
                            value="stripe"
                            name="Stripe"
                        >
                            <div className=" text-lg font-semibold  text-black  ">
                                All countries and territories
                            </div>
                        </Checkbox>
                        <br />
                        <Checkbox
                            className="flex "
                            value="stripe"
                            name="Stripe"
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
                        >
                            <div className=" text-lg font-semibold  text-black  ">
                                Enter another location
                            </div>
                        </Checkbox>
                    </div>
                </div>
                <Input
                    placeholder="Search and select your countries"
                    size="large"
                    className="mt-5 rounded-lg"
                    style={{ width: 600 }}
                    type="name"
                    addonBefore={<SearchIcon />}
                />
            </div> */}

            <div className="bg-white w-full py-7 pl-7 pr-28  billing-box-border ">
                <div className="text-gray-450 opacity-[0.8] text-sm font-bold">
                    Bidding
                </div>
                <div className="text-gray-450  text-lg font-bold mt-2">
                    {loading ? (
                        <Skeleton.Input
                            active
                            size="small"
                            style={{ minWidth: '300px' }}
                        />
                    ) : (
                        'What do you want to focus on ?'
                    )}
                </div>
                <div>
                    <div className="mt-4">
                        <Select
                            size="large"
                            className=""
                            style={{ minWidth: '450px' }}
                            placeholder={
                                loading ? (
                                    <Skeleton.Input
                                        active
                                        size="small"
                                        style={{ minWidth: '300px' }}
                                    />
                                ) : (
                                    'Select'
                                )
                            }
                            // defaultValue={['china']}
                            optionLabelProp="label"
                            onChange={handleFocusChange}
                        >
                            {focusOptions.map((option: any) => (
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

                <div className="text-gray-450  text-lg font-bold mt-4">
                    {loading ? (
                        <Skeleton.Input
                            active
                            size="small"
                            style={{ minWidth: '300px' }}
                        />
                    ) : (
                        'What kind of users do you want to target?'
                    )}
                </div>
                <div>
                    <div className="mt-2">
                        <Select
                            size="large"
                            className=""
                            style={{ minWidth: '450px' }}
                            placeholder={
                                loading ? (
                                    <Skeleton.Input
                                        active
                                        size="small"
                                        style={{ minWidth: '300px' }}
                                    />
                                ) : (
                                    'Select'
                                )
                            }
                            // defaultValue={['china']}
                            optionLabelProp="label"
                            onChange={handleTargetUsersChange}
                        >
                            {userOptions.map((option: any) => (
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
                <Checkbox
                    className="flex item-center mt-4"
                    value="setPerInstallValue"
                    name="setPerInstallValue"
                >
                    <div className=" text-[#6900B8] text-2sm font-600 ">
                        {loading ? (
                            <Skeleton
                                active
                                avatar={false}
                                paragraph={false}
                                title={{ width: '200px' }}
                            />
                        ) : (
                            'Set a target coat per install (optional)'
                        )}
                    </div>
                </Checkbox>

                <div className="mt-4 text-gray-450 text-2sm font-[600]">
                    Target cost per install
                </div>
                <div className="flex items-center mt-4">
                    <div className="input-wrapper ">
                        <span className="currency">$</span>
                        {loading ? (
                            <Skeleton.Input
                                active
                                size="small"
                                style={{ minWidth: '100px' }}
                            />
                        ) : (
                            <input
                                onChange={handleTargetCostChange}
                                value={targetCost}
                                type="number"
                                name="price"
                            />
                        )}
                    </div>
                    {loading ? (
                        <Skeleton.Input
                            active
                            size="large"
                            style={{ minWidth: '350px' }}
                        />
                    ) : (
                        <>
                            <div className="ml-3 bg-[#F7F2FB] px-4  h-[49px] flex items-center text-lg text-[#000000] font-[600]">
                                <div className="  w-4 italic rounded-sm h-4 font-extrabold flex justify-center items-center text-purple mr-2">
                                    i
                                </div>
                                A typical cost per install for other apps is
                                $21.09{' '}
                                <span className="text-purple ml-4">Apply</span>
                            </div>
                        </>
                    )}
                </div>

                <div className="flex items-center mt-4">
                    {loading ? (
                        <Skeleton.Input
                            active
                            size="large"
                            style={{ minWidth: '400px' }}
                        />
                    ) : (
                        <>
                            <div className=" bg-[#F7F2FB] px-4  h-[49px] flex items-center text-lg text-[#000000] font-[600]">
                                <div className="  w-4 italic rounded-sm h-4 font-extrabold flex justify-center items-center text-purple mr-2">
                                    i
                                </div>
                                This campaign will use the Target CPA bid
                                strategy to help you get the most conversions at
                                or below your budget.
                            </div>
                        </>
                    )}
                </div>
            </div>

            <div className="flex justify-end">
                <Button
                    className="bg-purple text-white text-sm text-bold w-[135px] h-[49px] "
                    onClick={() => {
                        setCurrent(current + 1);
                        dispatch(
                            addBudgetAndBidding({
                                dailyBudget: Number(dailyBudget),
                                focus,
                                targetUsers,
                                targetCost,
                            })
                        );
                    }}
                >
                    Next
                </Button>
            </div>
        </div>
    );
}
