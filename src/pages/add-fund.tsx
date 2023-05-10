import { Checkbox } from 'antd';
import BankTransfer from 'components/AddFund/BankTransfer';
import Stripe from 'components/AddFund/Stripe';
import Image from 'next/image';
import { useEffect, useState } from 'react';

export default function AddFund() {
    const [checkedOption, setCheckedOption] = useState<checkedStatus>({
        name: '',
        checked: false,
        value: '',
    });
    const onBankClick = (value: any) => {
        setCheckedOption({
            name: value.target.name,
            checked: value.target.checked,
            value: value.target.value,
        });
    };

    const onStripeClick = (value: any) => {
        setCheckedOption({
            name: value.target.name,
            checked: value.target.checked,
            value: value.target.value,
        });
    };

    useEffect(() => {
        console.log(checkedOption, 'this is chekd options');
    }, [checkedOption]);
    return (
        <div>
            <div className="space-y-4">
                <div className="flex justify-start">
                    <Image
                        src="/addfundIcon.svg"
                        alt="add icon"
                        width={15}
                        height={15}
                    />
                    <div className="ml-2 font-[600] text-2sm text-gray-450 opacity-[0.6]">
                        Add Funds
                    </div>
                </div>
                <div className="bordered bg-white w-full min-h-[474px] flex  p-3">
                    <div className="w-1/3 border-r-2">
                        <div className=" font-[600] text-2sm text-gray-450 opacity-[0.6]">
                            Select Payment Method
                        </div>
                        <div className="mt-4">
                            <Checkbox
                                checked={
                                    checkedOption.value === 'stripe'
                                        ? true
                                        : false
                                }
                                onChange={onStripeClick}
                                className="flex items-center"
                                value="stripe"
                                name="Stripe"
                            >
                                <div className="bg-[#635BFF]  rounded-[3px] text-white w-[159px] h-[50px] flex justify-center">
                                    <Image
                                        src="/stripe.svg"
                                        alt="stripe"
                                        width={87}
                                        height={30}
                                    />
                                </div>
                            </Checkbox>
                            <br />
                            <Checkbox
                                checked={
                                    checkedOption.value === 'bank'
                                        ? true
                                        : false
                                }
                                onChange={onBankClick}
                                className="flex items-center"
                                value="bank"
                                name="Bank Transfer"
                            >
                                <div className="bg-purple text-2sm rounded-[3px] font-lg text-white w-[159px] h-[50px] flex justify-center items-center">
                                    Bank Transfer
                                </div>
                            </Checkbox>
                        </div>
                    </div>
                    <div className="w-2/3">
                        {!checkedOption.value && (
                            <div className="flex items-center justify-center">
                                <div className=" font-[600] text-2sm opacity-[0.3]">
                                    Select at least one Payment Method{' '}
                                </div>
                            </div>
                        )}
                        {checkedOption.value === 'stripe' && (
                            <div className="px-8 py-1">
                                <Stripe />
                            </div>
                        )}
                        {checkedOption.value === 'bank' && (
                            <div className="px-8 py-1">
                                <BankTransfer />
                            </div>
                        )}
                    </div>
                </div>
            </div>
            <div className="flex justify-end">
                <div className="bg-purple cursor-pointer flex items-center justify-around w-[198px] h-[52px] rounded-sm mt-4">
                    <div className="text-white text-lg ">Make Payments</div>
                </div>
            </div>
        </div>
    );
}

export interface checkedStatus {
    name: string;
    checked: boolean;
    value: string;
}
