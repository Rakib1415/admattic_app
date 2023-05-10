import { Checkbox } from 'antd';
import CampaignSetting from 'components/campaign/CampaignSetting';
import CreateCampaigns from 'components/campaign/CreateCampaigns';
import { useState } from 'react';

export default function NewCampaign() {
    const [current, setCurrent] = useState<number>(0);

    const renderComponent = (current: number) => {
        switch (current) {
            case 0:
                return (
                    <CreateCampaigns
                        setCurrent={setCurrent}
                        current={current}
                    />
                );
            case 1:
                return (
                    <CampaignSetting
                        current={current}
                        setCurrent={setCurrent}
                    />
                );
            default:
                return (
                    <CreateCampaigns
                        setCurrent={setCurrent}
                        current={current}
                    />
                );
        }
    };
    return (
        <div>
            <div className="flex justify-center">
                <div className="w-[500px] flex items-center">
                    <div className="flex items-center flex-col w-48">
                        <Checkbox
                            checked={current === 1}
                            className="flex "
                            value="stripe"
                            name="Stripe"
                        ></Checkbox>
                        <div className="text-2sm mt-1 text-purple">
                            Create Campaign
                        </div>
                    </div>
                    <div className="bg-[#999999] w-72 h-[2px] mb-6"></div>
                    <div className="flex flex-col items-center w-48">
                        <Checkbox
                            checked={current === 2}
                            className="flex "
                            value="stripe"
                            name="Stripe"
                        ></Checkbox>
                        <div className="text-2sm mt-1 text-purple">
                            Campaign Setting
                        </div>
                    </div>
                </div>
            </div>

            {renderComponent(current)}
        </div>
    );
}
