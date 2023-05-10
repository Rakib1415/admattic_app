import { useAppSelector } from '@/app/redux-hooks';
import { useGetAllPaymentQuery } from '@/features/payment/paymentApi';
import { Input, Layout } from 'antd';
import { BASE_URL } from 'constants/api-endpoints';
import { NotificationIcon, SearchIcon, WalletIcon } from 'constants/icons';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';
const { Header } = Layout;

const headerStyle: React.CSSProperties = {
    color: '#333333',
    height: '100px',
    backgroundColor: 'white',
    display: 'flex',
    justifyContent: 'space-between',
    position: 'fixed',
    width: '100%',
    zIndex: '100',
};

export default function HeaderCustom({
    setNotification,
    notification,
}: {
    setNotification: any;
    notification: string;
}) {
    const { profile } = useAppSelector((state) => state.user);
    const { data, isLoading, isError } = useGetAllPaymentQuery(undefined);
    const [total, setTotal] = useState<number>(0);

    useEffect(() => {
        if (!isLoading && !isError) {
            console.log(data);
            const subTotal = data?.data[0]?.card?.reduce(
                (acc: any, curr: any) => acc + Number(curr?.cost),
                0
            );
            setTotal(subTotal);
        }
    }, [isLoading, isError, data]);
    return (
        <Header className="drop-shadow-lg p-5" style={headerStyle}>
            <div className="flex items-center justify-center  ">
                <div className=" text-4xl border-r-2 py-4 pr-7">
                    <Image
                        src="/AdmatticLogo.svg"
                        alt="Logo"
                        width={150}
                        height={800}
                    />
                </div>
                <div className="ml-4">
                    <div className="text-gray-120 text-2sm font-semibold">
                        Account
                    </div>
                    {/* account name */}
                    <div className=" font-[800] text-1xl text-gray-450">
                        Social Donut
                    </div>
                </div>
            </div>
            <div className="flex">
                <div className="flex space-x-3 h-12 text-lg items-center">
                    {/* search filter */}
                    <div className="search-wrapper flex items-center bg-gray-130 h-[46px] w-[259px] rounded-[3px] p-2">
                        <SearchIcon />
                        <Input
                            className="bg-gray-130"
                            placeholder="Try Billing"
                            style={{ width: 200 }}
                            bordered={false}
                        />
                    </div>

                    {/* here on add button click we will go to another page and show the balance value */}
                    <Link
                        href="/add-fund"
                        className="cursor-pointer font-[900] text-white w-[273px] h-[46px] rounded-[3px] bg-[#FF0047] flex items-center justify-around"
                    >
                        <WalletIcon />
                        <span className="text-lg">${total}</span>
                        <div className="text-red-600 w-5 h-5 bg-white flex items-center justify-center">
                            +
                        </div>
                    </Link>
                    {/* on Notofacation click will show a new tootip */}
                    <div
                        className={` ${
                            notification ? 'bg-purple' : 'bg-gray-130'
                        }  w-10 h-10 flex items-center cursor-pointer`}
                        onClick={setNotification}
                    >
                        <NotificationIcon style={{ marginLeft: '10px' }} />
                    </div>
                    <div className="bg-gray-600 w-10 h-10">
                        <Image
                            loader={({ src, width, quality }) =>
                                `${BASE_URL}/${src}?w=${width}&q=${
                                    quality || 75
                                }`
                            }
                            src={`profile/${profile}`}
                            alt={'bird'}
                            width={64}
                            height={64}
                        />
                    </div>
                </div>
            </div>
        </Header>
    );
}
