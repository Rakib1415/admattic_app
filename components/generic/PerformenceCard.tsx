import Image from 'next/image';

export default function PerformanceCard() {
    const number = 200000;
    const numberWithCommas = number.toLocaleString();

    return (
        <div className="flex flex-col  h-full p-6 performance-card">
            <div className="text-1xl font-bold text-gray-450">
                Overall Performance
            </div>
            <div className="mt-[66px] mb-[29.5px]">
                <div className="flex flex-wrap text-1xl font-semibold ml-2">
                    <div>Spends for last month</div>
                    <div className="flex items-center ml-2">
                        <div className="font-[800] text-purple">+32%</div>{' '}
                        <Image
                            src="/DashBoardUpArrow.svg"
                            alt="Logo"
                            width={12}
                            height={12}
                        />
                    </div>
                </div>
                <div
                    className="text-[50px] font-[600] text-purple mt-2 tracking-wide "
                    style={{ lineHeight: '68px', letterSpacing: '2px' }}
                >
                    ${numberWithCommas}
                </div>
            </div>
            <div className="flex justify-between pt-[30px] border-t-2">
                <div>
                    <div className="text-1xl font-[500]">Impressions</div>
                    <div className="text-2xl font-bold flex items-center mt-2">
                        <div>456 </div>
                        <span className="text-sm ml-1 first-letter bg-[#FFE5ED] text-[#FF0047]">
                            -25%
                        </span>
                    </div>
                </div>
                <div>
                    <div className="text-1xl font-[500]">Clicks</div>
                    <div className="text-2xl font-bold flex items-center mt-2">
                        <div>456 </div>
                        <span className="text-sm ml-1 first-letter bg-[#E1F0F1] text-[#69B6B8]">
                            +25%
                        </span>
                    </div>
                </div>
                <div>
                    <div className="text-1xl font-[500]">Conversions</div>
                    <div className="text-2xl font-bold flex items-center mt-2">
                        <div>456 </div>
                        <span className="text-sm ml-1 first-letter bg-[#E1F0F1] text-[#69B6B8]">
                            +25%
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
}
