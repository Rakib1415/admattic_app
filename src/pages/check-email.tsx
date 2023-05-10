import { Form } from 'antd';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

const CheckEmail: React.FC = () => {
    return (
        <div className="flex items-center justify-center mt-[110px] bg-[#FFFFFF] ">
            <div className="w-[485px] h-[394px]">
                <div className=" text-6xl flex items-center justify-center">
                    <Image
                        src="/AdmatticLogo.svg"
                        alt="Logo"
                        width={400}
                        height={800}
                    />
                </div>
                <div className="flex flex-col items-center justify-center mt-[60px] p-2">
                    <div className="text-3xl font-black mb-[5px]">
                        Check your email
                    </div>
                    <div className="text-sm font-[600] text-[#999999]">
                        We sent a password reset link to
                    </div>
                    <div className="text-sm font-[600] text-[#999999]">
                        abcd@tempmail.com
                    </div>
                    <button className="bg-purple text-white  w-[302px] h-[55px] rounded-[3px] mt-[28px] mb-[28px]">
                        <span className="font-2xl"> Open Email App</span>
                    </button>
                    <div className="text-sm font-[600] text-[#999999]">
                        Didn’t receive the email?{' '}
                        <span className="text-purple cursor-pointer">
                            Click to Resend
                        </span>
                    </div>
                    <Form.Item>
                        <div className="flex items-center justify-center mt-12">
                            <Image
                                src="/prevarrow.svg"
                                alt="arrow"
                                width={13}
                                height={13}
                            />
                            <Link
                                href="/login"
                                className="font-bold text-lg ml-2 cursor-pointer"
                            >
                                {' '}
                                Back to sign in
                            </Link>
                        </div>
                    </Form.Item>
                </div>
            </div>
        </div>
    );
};

export default CheckEmail;
