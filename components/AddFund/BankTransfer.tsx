import { Skeleton, Upload } from 'antd';
import Image from 'next/image';
import { useEffect, useState } from 'react';

export default function BankTransfer() {
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        setTimeout(() => {
            setLoading(false);
        }, 2000);
    }, []);
    return (
        <div className="space-y-5">
            <div className=" font-[600] text-2sm text-gray-450 opacity-[0.6]">
                Transfer Receipt{' '}
            </div>
            <div className=" font-[600] text-2sm text-purple ">
                {loading ? (
                    <Skeleton.Input active style={{ minWidth: '380px' }} />
                ) : (
                    'Upload your bank transfer receipt here'
                )}
            </div>
            <div>
                {loading ? (
                    <Skeleton.Input active style={{ minWidth: '280px' }} />
                ) : (
                    <Upload>
                        <div className="bg-purple flex items-center justify-center w-[198px] h-[52px] rounded-[3px] mt-1">
                            <Image
                                src="/upload.svg"
                                alt="upload"
                                width={18}
                                height={18}
                            />
                            <div className="text-white text-2sm font-bold ml-4">
                                Upload File
                            </div>
                        </div>
                    </Upload>
                )}
            </div>
            <div className="text-xs text-[#999999] font-base">
                {loading ? (
                    <Skeleton
                        active
                        avatar={false}
                        title={false}
                        paragraph={{ rows: 2, width: [280, 180] }}
                    />
                ) : (
                    <>
                        <div>Supported file formats: PDF, JPG</div>
                        <div className="mt-1">
                            <div>Maximum file size: 500 kb</div>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
}
