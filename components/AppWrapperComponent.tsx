import { useEffect, useRef, useState } from 'react';
import { Layout, notification } from 'antd';
import SideBar from './layout/SideBar';
import HeaderCustom from './layout/Header';
const { Content } = Layout;
import { Button, Modal } from 'antd';

const contentStyle: React.CSSProperties = {
    paddingLeft: '20px',
    paddingRight: '30px',
    paddingTop: '30px',
    backgroundColor: '#F8F8F8',
    marginTop: '100px',
    marginLeft: '230px',
};

const siderStyle: React.CSSProperties = {
    height: '100%',
    backgroundColor: '#333333',
    opacity: '0.3',
    position: 'fixed',
    zIndex: '90',
    width: '100%',
};

const notificationStyle: React.CSSProperties = {
    position: 'fixed',
    right: '0px',
    top: '0px',
    marginTop: '100px',
    opacity: '1',
    backgroundColor: '#fefefe',
    zIndex: '91',
};

export const AppWrapperComponent = ({
    children,
}: {
    children: JSX.Element;
}) => {
    const [openNotification, setOpenNotification] = useState<string>('');
    const modalContainerRef = useRef(null);
    const setNotification = () => {
        setOpenNotification((prev: string) => {
            if (prev) {
                prev = '';
            } else {
                prev = 'shadow';
            }
            return prev;
        });
        // Modal.info({
        //     title: 'Notification',
        //     content: <p>Notification content goes here</p>,
        //     getContainer: () => modalContainerRef.current || document.body,
        // });
    };

    useEffect(() => {}, []);

    return (
        <>
            <Layout>
                <HeaderCustom
                    setNotification={setNotification}
                    notification={openNotification}
                />
                <Layout className="flex mb-20">
                    <SideBar />
                    {openNotification === 'shadow' && (
                        <>
                            <div
                                style={siderStyle}
                                onClick={() => {
                                    setOpenNotification('');
                                }}
                            ></div>
                            <div
                                className=" w-[436px] h-[600px] opacity-1 bg-white px-4 space-y-7 overflow-y-auto"
                                style={notificationStyle}
                            >
                                <div className="flex justify-between mt-5 items-center font-bold">
                                    <div className="text-gray-450 opacity-0.5 text-lg">
                                        Your Notifications
                                    </div>
                                    <div className="text-[#FF0047] text-sm">
                                        X Clear All Notifications
                                    </div>
                                </div>
                                {Array.from({ length: 5 }).map(
                                    (_, index: number) => (
                                        <div
                                            key={index}
                                            className="border-b-2 pb-4"
                                        >
                                            <div className="flex">
                                                <div className="bg-[#C4C4C4] w-[49px] h-[49px]"></div>
                                                <div className=" ml-4 w-full">
                                                    <div className="flex justify-between">
                                                        <div className="text-[#000000] text-2sm opacity-0.7 w-[230px] font-[600]">
                                                            Your download target
                                                            has been completed
                                                            for swoop news
                                                        </div>
                                                        <div className="text-[#FF0047] text-xs ">
                                                            X Clear
                                                        </div>
                                                    </div>
                                                    <div className="text-[#000000] opacity-0.5 text-[14px] mt-5 font-[500]">
                                                        Lorem Ipsum is simply
                                                        dummy text of the
                                                        printing and typesetting
                                                        industry. Lorem Ipsum
                                                        has been the industry
                                                        standard.
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="text-[#6900B8] opacity-[0.7] text-xs font-bold mt-2">
                                                Expand Notification
                                            </div>
                                        </div>
                                    )
                                )}
                            </div>
                        </>
                    )}
                    <Content
                        // className={openNotification}
                        style={contentStyle}
                        onClick={() => {
                            setOpenNotification('');
                        }}
                        ref={modalContainerRef}
                    >
                        {children}
                    </Content>
                </Layout>
            </Layout>
        </>
    );
};
