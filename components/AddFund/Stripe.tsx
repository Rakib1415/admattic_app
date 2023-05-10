import { useGetAllCardQuery } from '@/features/payment/paymentApi';
import { checkedStatus } from '@/pages/add-fund';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import { Checkbox, Form, Input, Skeleton } from 'antd';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import CheckoutForm from './CheckoutForm';

const stripePromise = loadStripe(
    process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY as string
);

export default function Stripe() {
    const { data, isLoading, isError } = useGetAllCardQuery(undefined);
    const [checkedOption, setCheckedOption] = useState<checkedStatus>({
        name: '',
        checked: false,
        value: '',
    });
    const [clientSecret, setClientSecret] = useState<string>('');
    const [amount, setAmount] = useState<number>(0);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setTimeout(() => {
            setLoading(false);
        }, 2000);
    }, []);

    const onCheckClick = (value: any) => {
        setCheckedOption({
            name: value.target.name,
            checked: value.target.checked,
            value: value.target.value,
        });
    };

    const [disabledPaymentOption, setDisablePaymentOption] =
        useState<boolean>(true);

    const onChangeAmountInput = (event: any) => {
        setAmount(event.target.value);
        if (event.target.value > 0) {
            setDisablePaymentOption(false);
        } else setDisablePaymentOption(true);
    };

    useEffect(() => {
        if (checkedOption.value === 'newCard') {
            fetch('/api/create-payment-intent', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ amount: amount }),
            })
                .then((res) => res.json())
                .then((data) => setClientSecret(data.clientSecret));
        }
    }, [checkedOption, amount]);

    const appearance = {
        theme: 'stripe',
    };
    const options: any = {
        clientSecret,
        appearance,
    };

    let content = null;
    if (!isError && isLoading) {
        content = (
            <div className="w-[545px] h-[61px] border-b-2 bg-[#F7F2FB] flex items-center justify-around">
                <Image
                    src="/visa.svg"
                    alt="card name w-24 h-24"
                    width={48}
                    height={48}
                />
                <div className="text-sm font-bold text-gray-450">
                    <Skeleton.Input active style={{ minWidth: '280px' }} />
                </div>
            </div>
        );
    }
    if (data?.data?.length > 0 && !isLoading && !isError) {
        content = data?.data?.map((card: any) => {
            return (
                <div
                    key={card?._id}
                    className="w-[545px] h-[61px] border-b-2 bg-[#F7F2FB] flex items-center justify-around"
                >
                    <Image
                        src="/visa.svg"
                        alt="card name w-24 h-24"
                        width={48}
                        height={48}
                    />
                    <div className="text-sm font-bold text-gray-450">
                        {card?.cardType} Debit Card Ending with ****{' '}
                        {card?.cardNumber}
                    </div>
                </div>
            );
        });
    }
    if (data?.data?.length === 0) {
        content = <h2>There is no card</h2>;
    }

    return (
        <div className="space-y-5">
            <div className="border-b-2 space-y-5">
                <div className=" font-[600] text-2sm text-gray-450 opacity-[0.8]">
                    Add Amount
                </div>
                <div className=" font-[600] text-2sm text-purple opacity-[0.45]">
                    The minimum recharge amount is 1000 ${' '}
                </div>
                <div className="w-96">
                    <Form.Item
                        className="float-container"
                        name={['user', 'name']}
                        rules={[{ required: true }]}
                    >
                        <label className="ml-2 text-gray-450 opacity-[0.7] text-sm font-bold">
                            {loading ? (
                                <Skeleton.Input active />
                            ) : (
                                'Enter Amount'
                            )}
                        </label>
                        <Input
                            type="number"
                            onChange={onChangeAmountInput}
                            style={{
                                border: 'none',
                            }}
                        />
                    </Form.Item>
                </div>
            </div>

            <div className="text-xs text-[#999999] font-base ">
                <div className=" font-[600] text-2sm text-gray-450 opacity-[0.8]">
                    Payment Method
                </div>
                <div className="mt-5 flex">
                    <Checkbox
                        checked={
                            checkedOption.value === 'existing' ? true : false
                        }
                        onChange={onCheckClick}
                        className="flex items-center"
                        value="existing"
                        name="existingCard"
                        disabled={disabledPaymentOption}
                    >
                        <div
                            className={` ${
                                disabledPaymentOption && 'opacity-30'
                            } text-2sm font-bold   text-gray-450  flex justify-center`}
                        >
                            Select Existing Debit/Credit Card
                        </div>
                    </Checkbox>

                    <Checkbox
                        checked={
                            checkedOption.value === 'newCard' ? true : false
                        }
                        onChange={onCheckClick}
                        className="flex items-center"
                        value="newCard"
                        name="New Card"
                        disabled={disabledPaymentOption}
                    >
                        <div
                            className={` ${
                                disabledPaymentOption && 'opacity-30'
                            } text-2sm font-bold   text-gray-450  flex justify-center`}
                        >
                            Add a Debit/Credit Card
                        </div>
                    </Checkbox>
                </div>

                {checkedOption.value === 'existing' && (
                    <div className="mt-5">
                        {content}
                        {/* <div className="w-[545px] h-[61px] border-b-2 bg-[#F7F2FB] flex items-center justify-around">
                            <Image
                                src="/visa.svg"
                                alt="card name w-24 h-24"
                                width={48}
                                height={48}
                            />
                            <div className="text-sm font-bold text-gray-450">
                                ICICI Bank Debit Card Ending with **** 0032
                            </div>
                        </div>
                        <div className="w-[545px] h-[61px] flex items-center justify-around">
                            <Image
                                src="/visa.svg"
                                alt="card name w-24 h-24"
                                width={48}
                                height={48}
                            />
                            <div className="text-sm font-bold text-gray-450">
                                ICICI Bank Debit Card Ending with **** 0032
                            </div>
                        </div>
                        <div className="w-[545px] h-[61px]  flex items-center justify-around">
                            <Image
                                src="/visa.svg"
                                alt="card name w-24 h-24"
                                width={48}
                                height={48}
                            />
                            <div className="text-sm font-bold text-gray-450">
                                ICICI Bank Debit Card Ending with **** 0032
                            </div>
                        </div> */}
                    </div>
                )}
                {checkedOption.value === 'newCard' && clientSecret && (
                    <Elements options={options} stripe={stripePromise}>
                        {/* <div className="mt-10">
                            <div className="flex">
                                <div className="w-[336px]">
                                    <Form.Item
                                        className="float-container"
                                        name={['user', 'name']}
                                        rules={[{ required: true }]}
                                    >
                                        <label className="ml-2 text-gray-450 opacity-[0.7] text-sm font-bold">
                                            Enter Card Number
                                        </label>
                                        <Input
                                            type="number"
                                            onChange={onChangeAmountInput}
                                            style={{
                                                border: 'none',
                                            }}
                                        />
                                    </Form.Item>
                                </div>
                                <div className="w-[336px] ml-4">
                                    <Form.Item
                                        className="float-container"
                                        name={['user', 'name']}
                                        rules={[{ required: true }]}
                                    >
                                        <label className="ml-2 text-gray-450 opacity-[0.7] text-sm font-bold">
                                            Enter Card Holder Name
                                        </label>
                                        <Input
                                            type="name"
                                            onChange={onChangeAmountInput}
                                            style={{
                                                border: 'none',
                                            }}
                                        />
                                    </Form.Item>
                                </div>
                            </div>
                            <div className="flex">
                                <div className="w-[160px]">
                                    <Form.Item
                                        className="float-container"
                                        name={['user', 'name']}
                                        rules={[{ required: true }]}
                                    >
                                        <label className="ml-2 text-gray-450 opacity-[0.7] text-sm font-bold">
                                            Expiry Date
                                        </label>
                                        <Input
                                            type="Date  "
                                            onChange={onChangeAmountInput}
                                            style={{
                                                border: 'none',
                                            }}
                                        />
                                    </Form.Item>
                                </div>
                                <div className="w-[160px] ml-4">
                                    <Form.Item
                                        className="float-container"
                                        name={['user', 'name']}
                                        rules={[{ required: true }]}
                                    >
                                        <label className="ml-2 text-gray-450 opacity-[0.7] text-sm font-bold">
                                            Security Code
                                        </label>
                                        <Input
                                            type="number"
                                            onChange={onChangeAmountInput}
                                            style={{
                                                border: 'none',
                                            }}
                                        />
                                    </Form.Item>
                                </div>
                            </div>
                        </div> */}
                        <CheckoutForm amount={amount} />
                    </Elements>
                )}
            </div>
        </div>
    );
}
