import Image from 'next/image';
import { useRouter } from 'next/router';
import React from 'react';

export default function Goback() {
    const router = useRouter();
    const onGoBackClick = () => {
        router.back();
    };
    return (
        <div
            className="text-purple font-bold flex items-center cursor-pointer"
            onClick={onGoBackClick}
        >
            <Image src="/prevarrow.svg" alt="arrow" width={13} height={13} />
            <div className="text-2lg ml-2">Go Back</div>
        </div>
    );
}
