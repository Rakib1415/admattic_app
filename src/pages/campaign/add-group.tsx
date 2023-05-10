import { Checkbox } from 'antd';
import AdGroup from 'components/campaign/AdGroup';
import Budget from 'components/campaign/Budget';
import Review from 'components/campaign/Review';
import { useState } from 'react';

export default function AddGroup() {
    const [current, setCurrent] = useState<number>(0);

    const renderComponent = (current: number) => {
        switch (current) {
            case 0:
                return <Budget setCurrent={setCurrent} current={current} />;
            case 1:
                return <AdGroup current={current} setCurrent={setCurrent} />;
            case 2:
                return <Review current={current} setCurrent={setCurrent} />;
            default:
                return <Budget setCurrent={setCurrent} current={current} />;
        }
    };
    return (
        <div>
            <div className="flex justify-center">
                <div className="w-[600px] flex items-center">
                    <div className="flex items-center flex-col w-48">
                        <Checkbox
                            checked={current > 0}
                            className="flex "
                            value="stripe"
                            name="Stripe"
                        ></Checkbox>
                        <div className="text-2sm mt-1 text-purple whitespace-nowrap">
                            Budget & Bidding
                        </div>
                    </div>
                    <div className="bg-[#999999] w-72 h-[2px] mb-6"></div>
                    <div className="flex flex-col items-center w-48">
                        <Checkbox
                            checked={current > 1}
                            className="flex "
                            value="stripe"
                            name="Stripe"
                        ></Checkbox>
                        <div className="text-2sm mt-1 text-purple">
                            AD Group
                        </div>
                    </div>
                    <div className="bg-[#999999] w-72 h-[2px] mb-6"></div>
                    <div className="flex flex-col items-center w-48">
                        <Checkbox
                            checked={current > 2}
                            className="flex "
                            value="stripe"
                            name="Stripe"
                        ></Checkbox>
                        <div className="text-2sm mt-1 text-purple">Review</div>
                    </div>
                </div>
            </div>

            {renderComponent(current)}
        </div>
    );
}
