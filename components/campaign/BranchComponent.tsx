import { Input } from 'antd';
const { TextArea } = Input;

export default function BranchComponent({
    trackingUrl,
    handleChangeTrackingUrl,
    impressionUrl,
    handleChangeImpressionUrl,
}: {
    trackingUrl?: string;
    handleChangeTrackingUrl?: (e: any) => void;
    impressionUrl?: string;
    handleChangeImpressionUrl?: (e: any) => void;
}) {
    return (
        <div className="bg-white w-full  mt-5 ">
            <div className="border-t-2 pt-4 pb-8">
                <div className="text-gray-450 opacity-[0.8] text-lg font-bold">
                    Tracking URL
                </div>
                <TextArea
                    onChange={handleChangeTrackingUrl}
                    value={trackingUrl}
                    rows={5}
                    placeholder="Insert your tracking URL and include the mandatory macros"
                    maxLength={4}
                    className=" mt-2"
                />
                <div className="flex text-[#999999] mt-5">
                    <div className=" text-xl font-bold">Example:</div>
                    <div className="ml-3 text-sm font-[600]">
                        https://redirect.appmetrica.yandex.com/serve/TRACKING_ID?click_id=xapnt1x&google_aid=xapnt6x&device_ip=xapnt5x&device_ua=
                        apnt_httpuseragent&click_timestamp= apnt_clicktimestamp
                        &afpub_id=xapnt17x&site_id=xapnt20x&creative_id=
                        apnt_crtname&c_id=apnt_campid&c_name=apnt_campname
                        &pub_appname=xapnt21x&package=apnt_anpackage apnt_iosid
                    </div>
                </div>
            </div>
            <div className="flex justify-between mb-7 border-t-2 pt-4 pb-8">
                <div className="w-1/2">
                    <div className="text-[#000000] opacity-[0.6] text-xl font-bold">
                        Mandatory macros:
                    </div>
                    <div className="mt-2 flex items-center">
                        <div className="bg-[#E9D9F4] text-[#6900B8] w-[194px] h-[49px] flex justify-center items-center font-bold text-lg">
                            xapnt6x
                        </div>
                        <div className="text-[#000000] text-lg font-bold ml-3">
                            Android Advertising ID (GAID)
                        </div>
                    </div>
                    <div className="mt-2 flex items-center">
                        <div className="bg-[#E9D9F4] text-[#6900B8] w-[194px] h-[49px] flex justify-center items-center font-bold text-lg">
                            xapnt6x
                        </div>
                        <div className="text-[#000000] text-lg font-bold ml-3">
                            Click ID
                        </div>
                    </div>
                </div>
                <div className="w-1/2">
                    <div className="text-[#000000] opacity-[0.6] text-xl font-bold">
                        {' '}
                        Optional macros:
                    </div>
                    <div className="mt-2 flex items-center">
                        <div className="bg-[#E9D9F4] text-[#6900B8] w-[194px] h-[49px] flex justify-center items-center font-bold text-lg">
                            xapnt6x
                        </div>
                        <div className="text-[#000000] text-lg font-bold ml-3">
                            Android Advertising ID (GAID)
                        </div>
                    </div>
                    <div className="mt-2 flex items-center">
                        <div className="bg-[#E9D9F4] text-[#6900B8] w-[194px] h-[49px] flex justify-center items-center font-bold text-lg">
                            xapnt6x
                        </div>
                        <div className="text-[#000000] text-lg font-bold ml-3">
                            Creative Name
                        </div>
                    </div>
                </div>
            </div>
            <div className="border-t-2 pt-4 pb-8">
                <div className="text-gray-450 opacity-[0.8] text-lg font-bold">
                    Impression URL
                    <div className="text-[#000000] opacity-[0.5]">
                        Make sure to enable view through attribution in the
                        integrated partners platform.
                    </div>
                </div>
                <TextArea
                    onChange={handleChangeImpressionUrl}
                    value={impressionUrl}
                    rows={5}
                    placeholder="Insert your tracking URL and include the mandatory macros"
                    maxLength={4}
                    className=" mt-2"
                />
            </div>
        </div>
    );
}
