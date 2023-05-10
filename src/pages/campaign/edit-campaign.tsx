import { Tabs, TabsProps } from 'antd';
import CampaignSetting from 'components/campaign/CampaignSetting';
import CreateCampaigns from 'components/campaign/CreateCampaigns';
import { useState } from 'react';

export default function EditCampaign() {
    const [current, setCurrent] = useState<string>('1');

    const onChange = (key: string) => {
        setCurrent(key);
    };

    const items: TabsProps['items'] = [
        {
            key: '1',
            label: `Campaign Info`,
            children: (
                <CreateCampaigns onTabChange={onChange} editMode={true} />
            ),
        },
        {
            key: '2',
            label: `Campaign Settings`,
            children: <CampaignSetting editMode={true} />,
        },
    ];
    return (
        <div>
            <div className="text-black font-bold text-lg">Edit Campign</div>
            <Tabs activeKey={current} items={items} onChange={onChange} />
        </div>
    );
}
