import { Token, nextTokenId } from '@/utils';
import { Button, Input } from 'antd';
import React from 'react';
const { TextArea } = Input;

export default function AdjustComponent({
    tokenItems,
    setTokenItems,
    trackingUrl,
    handleChangeTrackingUrl,
    impressionUrl,
    handleChangeImpressionUrl,
    finalClickUrl,
    setFinalClickUrl,
    finalClickUrlTwo,
    setFinalClickUrlTwo,
}: {
    tokenItems?: Token[];
    setTokenItems?: any;
    trackingUrl?: string;
    handleChangeTrackingUrl?: (e: any) => void;
    impressionUrl?: string;
    handleChangeImpressionUrl?: (e: any) => void;
    finalClickUrl?: string;
    setFinalClickUrl?: (e: any) => void;
    finalClickUrlTwo?: string;
    setFinalClickUrlTwo?: (e: any) => void;
}) {
    // change token and event handler
    const handleChangeTokenEvent = (
        event: React.ChangeEvent<HTMLInputElement>,
        tokenId: number
    ) => {
        const updatedTokenItems = tokenItems?.map((tokenItem: Token) => {
            if (tokenItem.id === tokenId) {
                return {
                    ...tokenItem,
                    [event.target.name]: event.target.value,
                };
            }
            return tokenItem;
        });
        setTokenItems(updatedTokenItems);
    };

    const handleAddToken = () => {
        setTokenItems((prev: any) => [
            ...prev,
            { id: nextTokenId(tokenItems as Token[]), token: '', event: '' },
        ]);
    };
    const handleRemoveToken = (tokenId: number) => {
        setTokenItems((prev: any) =>
            prev.filter((token: any) => token.id !== tokenId)
        );
    };

    const handleChangeFinalClickUrl = (
        event: React.ChangeEvent<HTMLTextAreaElement>
    ) => {
        setFinalClickUrl?.(event.target.value);
    };
    const handleChangeFinalClickUrlTwo = (
        event: React.ChangeEvent<HTMLTextAreaElement>
    ) => {
        setFinalClickUrlTwo?.(event.target.value);
    };

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
                    className=" mt-2"
                />
            </div>
            <div className="border-t-2 pt-4 pb-8">
                <div className="text-gray-450 opacity-[0.8] text-lg font-bold">
                    Impression URL
                    <span className="text-[#000000] opacity-[0.5]">
                        (Make sure to enable view through attribution in the
                        integrated partners platform.)
                    </span>
                </div>
                <TextArea
                    onChange={handleChangeImpressionUrl}
                    value={impressionUrl}
                    rows={5}
                    placeholder="Insert your tracking URL and include the mandatory macros"
                    className=" mt-2"
                />
            </div>
            <div className="billing-box-border px-4 py-7 w-full">
                <div className="flex">
                    <div className="text-gray-450 opacity-[0.8] w-1/3 text-lg font-bold">
                        Token
                    </div>
                    <div className="text-gray-450 opacity-[0.8] text-lg font-bold ml-4">
                        Event name
                    </div>
                </div>
                {tokenItems?.map(({ id, token, event }: Token) => (
                    <div key={id} className="flex mt-3">
                        <div className=" w-1/3 ">
                            <Input
                                onChange={(e) => handleChangeTokenEvent(e, id)}
                                value={token}
                                name="token"
                                size="large"
                            />
                        </div>
                        <div className=" ml-4 flex items-center">
                            <Input
                                onChange={(e) => handleChangeTokenEvent(e, id)}
                                value={event}
                                name="event"
                                size="large"
                                className="w-[400px]"
                            />{' '}
                            <div
                                onClick={() => handleRemoveToken(id)}
                                className="text-[#FF0047] text-sm font-bold ml-5 opacity-[0.4] hover:opacity-100 hover:text-[#FF0047] cursor-pointer"
                            >
                                Remove
                            </div>
                        </div>
                    </div>
                ))}

                <Button
                    onClick={handleAddToken}
                    className="mt-3 bg-[#333333] text-white w-[135px] h-[49px]"
                >
                    Add New
                </Button>
            </div>
            <div className=" pt-4 pb-8">
                <div className="text-gray-450 opacity-[0.8] text-lg font-bold">
                    Final Click URL
                    <span className="text-[#000000] opacity-[0.5]">
                        (Preview your postback URL and save it.)
                    </span>
                </div>
                <TextArea
                    onChange={handleChangeFinalClickUrl}
                    value={finalClickUrl}
                    rows={5}
                    placeholder="Insert your tracking URL and include the mandatory macros"
                    className=" mt-2"
                />
            </div>
            <div className="border-t-2 pt-4 pb-8">
                <div className="text-gray-450 opacity-[0.8] text-lg font-bold">
                    Final Click URL
                </div>
                <TextArea
                    onChange={handleChangeFinalClickUrlTwo}
                    value={finalClickUrlTwo}
                    rows={5}
                    placeholder="Insert your tracking URL and include the mandatory macros"
                    className=" mt-2"
                />
            </div>
        </div>
    );
}
