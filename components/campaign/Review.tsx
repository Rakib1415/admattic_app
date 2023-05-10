import { useAppSelector } from '@/app/redux-hooks';
import { useAddAdGroupMutation } from '@/features/ad-group/adGroupApi';
import { Button, Modal, Skeleton, notification } from 'antd';
import Link from 'next/link';
import { useEffect, useState } from 'react';

export default function Review({
    setCurrent,
    current,
}: {
    setCurrent: (e: number) => void;
    current: number;
}) {
    const [addAdGroup, { isError, isLoading }] = useAddAdGroupMutation();
    const { budgetAndBidding, adFiles } = useAppSelector(
        (state) => state.adGroup
    );
    const { campaign } = useAppSelector((state) => state.campaign);
    const [isModalOpen, setIsModalOpen] = useState<boolean>();
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        setTimeout(() => {
            setLoading(false);
        }, 2000);
    }, []);

    const handleCancel = () => {
        setIsModalOpen(false);
    };
    const handleSubmit = async () => {
        const formData = new FormData();
        const adGroup = {
            budget: budgetAndBidding?.dailyBudget,
            focusOn: budgetAndBidding?.focus,
            targetCost: budgetAndBidding?.targetCost,
            headings: adFiles?.headings?.map((h: any) => h.heading),
            descriptions: adFiles?.descriptions?.map((d: any) => d.description),
        };
        adFiles?.imageFileList?.forEach((file: any) => {
            formData.append('avatar', file.originFileObj);
        });
        adFiles?.videoFileList?.forEach((file: any) => {
            formData.append('video', file.originFileObj);
        });
        adFiles?.htmlFileList?.forEach((file: any) => {
            formData.append('html', file.originFileObj);
        });
        formData.append('budget', adGroup?.budget);
        formData.append('focusOn', adGroup?.focusOn);
        formData.append('targetCost', adGroup?.targetCost);
        formData.append('headings', adGroup?.headings);
        formData.append('descriptions', adGroup?.descriptions);
        formData.append('campaignId', campaign?._id as string);
        formData.append('name', adFiles?.name);

        const res: any = await addAdGroup(formData);
        if (res?.data?.status) {
            notification.open({
                message: 'Success',
                description: res?.data?.message,
            });
        }
    };
    return (
        <div className="space-y-8 mt-10">
            <div className="text-[#333333 ] text-sm font-bold">
                Budget and bidding
            </div>

            <div className="bg-white w-full px-4 py-4 billing-box-border ">
                <div className="flex items-center py-3">
                    <div className="text-gray-450 opacity-[0.8] text-sm font-bold basis-[200px]">
                        Mobile app
                    </div>
                    <div className="text-gray-450 text-lg font-[600]">
                        {loading ? (
                            <Skeleton
                                active
                                avatar={false}
                                paragraph={false}
                                title={{ width: '100px' }}
                            />
                        ) : (
                            `$ ${budgetAndBidding?.dailyBudget} /day`
                        )}
                    </div>
                </div>
                <div className="flex items-center py-3 border-t-2">
                    <div className="text-gray-450 opacity-[0.8] text-sm font-bold basis-[200px]    ">
                        Bidding
                    </div>
                    <div className="text-gray-450 text-lg font-[600]">
                        {loading ? (
                            <Skeleton
                                active
                                avatar={false}
                                paragraph={false}
                                title={{ width: '100px' }}
                            />
                        ) : (
                            `${budgetAndBidding?.focus}`
                        )}
                    </div>
                </div>
            </div>

            <div className="text-[#333333 ] text-sm font-bold">Ad group</div>

            <div className="bg-white w-full px-4 py-4  billing-box-border ">
                <div className="flex items-center py-3">
                    <div className="text-gray-450 opacity-[0.8] text-sm font-bold basis-[200px]">
                        Ad assets
                    </div>
                    <div className="text-gray-450 text-lg font-[600]">
                        {loading ? (
                            <Skeleton
                                active
                                avatar={false}
                                paragraph={false}
                                title={{ width: '300px' }}
                            />
                        ) : (
                            `${adFiles?.imageFileList?.length} image,
                            ${adFiles?.headings?.length} headlines, and
                            ${adFiles?.descriptions?.length} descriptions`
                        )}
                    </div>
                </div>
            </div>

            <div className="flex justify-end">
                <Button
                    className="bg-purple text-white text-sm text-bold w-[135px] h-[49px] "
                    onClick={() => setIsModalOpen(true)}
                >
                    Publish Campaign
                </Button>
            </div>
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
                    <Link
                        onClick={handleSubmit}
                        href={`/campaign/${campaign?._id}`}
                        className="bg-purple text-white text-2sm  w-[140px] h-[49px] rounded-sm flex justify-center items-center cursor-pointer"
                    >
                        Publish Campaign
                    </Link>
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
