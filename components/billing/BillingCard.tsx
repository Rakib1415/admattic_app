import { Skeleton } from 'antd';
export default function BillingCard({
    title,
    amount,
    loading,
}: {
    title: string;
    amount: string;
    loading?: boolean;
}) {
    return (
        <>
            <div className="text-2sm text-purple font-bold">{title}</div>
            <div className="mt-[7px] font-[600] text-3xl text-gray-450">
                {loading ? (
                    <Skeleton.Input active style={{ minWidth: '100px' }} />
                ) : (
                    `$ ${amount}`
                )}
            </div>
        </>
    );
}
