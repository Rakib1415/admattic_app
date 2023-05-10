import Image from 'next/image';
import { useRouter } from 'next/router';
import React from 'react';

const ResetPasswordSuccess: React.FC = () => {
    const router = useRouter();
    const handleContinue = () => {
        router.push('/login');
    };
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
                    <div className="text-3xl font-black mb-[19px]">
                        PASSWORD RESET
                    </div>
                    <div className="text-sm font-[600] text-[#999999]">
                        Your password has been successfully reset
                    </div>
                </div>
                <div className="mt-[15px] p-2">
                    <div className="flex items-center justify-center ">
                        <button
                            onClick={handleContinue}
                            className="bg-purple text-white  w-[200px] h-[48px] rounded-[3px]"
                        >
                            <span className="font-2xl"> Continue</span>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ResetPasswordSuccess;
