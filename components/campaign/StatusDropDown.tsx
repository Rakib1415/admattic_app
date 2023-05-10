import { useUpdateAdGroupMutation } from '@/features/ad-group/adGroupApi';
import { useUpdatedCampaignByStatusMutation } from '@/features/campaign/campaignApi';
import { Select, notification } from 'antd';
import Image from 'next/image';
import { useEffect, useState } from 'react';

const { Option } = Select;

// function CustomOption({
//     color,
//     text,
//     icon,
//     circle,
// }: {
//     color: any;
//     text: string;
//     icon?: string;
//     circle?: boolean;
// }) {
//     return (
//         <div className={`text-${color} flex items-center`}>
//             {icon && (
//                 <div className="mr-1">
//                     <Image src={icon} alt={text} width={15} height={15} />
//                 </div>
//             )}
//             {circle && (
//                 <div className={`circle w-4 h-4 bg-red text-white mr-1`}>
//                     <span>x</span>
//                 </div>
//             )}
//             <span>{text}</span>
//         </div>
//     );
// }

export default function CustomSelect({
    status,
    id,
    isAds,
}: {
    status: string;
    id: string;
    isAds?: boolean;
}) {
    const [updatedStatus, setUpdatedStatus] = useState<string>('');
    const [
        updatedCampaignByStatus,
        { isSuccess: campaignSuccess, data: campaign },
    ] = useUpdatedCampaignByStatusMutation();
    const [updateAdGroup, { isSuccess: adsSuccess, data: ads }] =
        useUpdateAdGroupMutation();
    const handleChange = async (event: string) => {
        setUpdatedStatus(event);
        if (isAds) {
            await updateAdGroup({ adsId: id, status: event });
        }
        await updatedCampaignByStatus({
            campaignArr: [id],
            status: event,
        });
        // try {
        //     const res = await campaignService.updateCampaign({
        //         campaignIds: [id],
        //         status: updatedStatus,
        //     });

        //     notification.open({
        //         message: 'success',
        //         description: res.data.message,
        //     });
        // } catch (err) {
        //     console.log(err);
        // }
    };

    useEffect(() => {
        if (adsSuccess) {
            console.log(ads);
            notification.open({
                message: 'success',
                description: ads?.message,
            });
        }
        if (campaignSuccess) {
            console.log(campaign);
            notification.open({
                message: 'success',
                description: campaign?.message,
            });
        }
        setUpdatedStatus(status);
    }, [adsSuccess, ads, status, campaign, campaignSuccess]);
    return (
        <Select
            onChange={handleChange}
            value={updatedStatus}
            style={{ width: 200 }}
        >
            <Option value="Active" optionLabelProp="label1">
                <div className="text-[#0B8043] flex items-center">
                    <div className="rounded-lg w-3 h-3 bg-[#0B8043] mr-2"></div>{' '}
                    Active
                </div>
            </Option>
            <Option value="Paused" optionLabelProp="label2">
                <div className="text-[#B07F00] flex items-center">
                    <Image
                        className="mr-1"
                        src="/paused.svg"
                        alt="paused"
                        width={15}
                        height={15}
                    />
                    Paused
                </div>
            </Option>
            <Option value="Stopped" optionLabelProp="label3">
                <div className="text-[#C53929] flex items-center">
                    <div className="circle w-4 h-4 bg-[#C53929] text-white mr-1">
                        x
                    </div>{' '}
                    Stopped
                </div>
            </Option>
        </Select>
    );
}
