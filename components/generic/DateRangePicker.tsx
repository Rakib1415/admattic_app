import React from 'react';

import { DatePicker } from 'antd';
const { RangePicker } = DatePicker;

export default function DateRangePicker() {
    return (
        <div>
            <RangePicker
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
    );
}
