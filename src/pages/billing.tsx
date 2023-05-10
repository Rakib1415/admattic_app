import BillingCard from 'components/billing/BillingCard';
import BillingTable from 'components/billing/Billingtable';
import DateRangePicker from 'components/generic/DateRangePicker';
import Image from 'next/image';
import { useEffect, useState } from 'react';

export default function Billing() {
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        setTimeout(() => {
            setLoading(false);
        }, 2000);
    }, []);
    return (
        <>
            <div className="flex justify-between items-center space-x-9">
                <div className="flex justify-start space-x-9">
                    <div className="">
                        <div className="flex items-center">
                            <div>
                                <Image
                                    src="/addfundIcon.svg"
                                    alt="fund"
                                    width={16}
                                    height={16}
                                />
                            </div>
                            <div className="text-[#000000] opacity-[0.6] text-2sm font-[600] ml-2">
                                {' '}
                                Account Balance
                            </div>
                        </div>

                        <div className="flex justify-between space-x-4 mt-3">
                            <div className=" w-[234px] h-[103px] bg-white p-5 billing-box-border">
                                <BillingCard
                                    loading={loading}
                                    title="Agency"
                                    amount="0"
                                />
                            </div>
                        </div>
                    </div>
                    <div className="">
                        <div className="flex justify-start pl-8 items-center">
                            <div className="italic bg-purple w-4 rounded-sm h-4 font-extrabold flex justify-center items-center text-white">
                                i
                            </div>
                            <div className="text-[#000000] opacity-[0.6] text-2sm font-[600] ml-2">
                                {' '}
                                Additional Information
                            </div>
                        </div>

                        <div className="flex space-x-6 mt-3 pl-8 border-l-2">
                            <div className="w-[234px] h-[103px] bg-white p-5 billing-box-border ">
                                <BillingCard
                                    title="Last Billed Amount"
                                    amount="100"
                                    loading={loading}
                                />
                            </div>
                            <div className="w-[234px] h-[103px] bg-white p-5 billing-box-border">
                                <BillingCard
                                    title="Credit Limit"
                                    amount="3000"
                                    loading={loading}
                                />
                            </div>
                        </div>
                    </div>
                </div>
                <DateRangePicker />
            </div>

            <div className="mt-6 billing-box-border">
                <BillingTable loading={loading} />
            </div>
        </>
    );
}
