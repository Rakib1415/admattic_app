import { useMakePaymentMutation } from '@/features/payment/paymentApi';
import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import { Form, Input, Skeleton, notification } from 'antd';
import { useRouter } from 'next/router';
import React from 'react';

export default function CheckoutForm({ amount }: { amount: number }) {
    const stripe = useStripe();
    const elements = useElements();
    const router = useRouter();
    const [makePayment, { isLoading: paymentLoading }] =
        useMakePaymentMutation();

    const [clientSecret, setClientSecret] = React.useState('');
    const [name, setName] = React.useState('');
    const [message, setMessage] = React.useState('');
    const [isLoading, setIsLoading] = React.useState(false);

    React.useEffect(() => {
        if (!stripe) {
            return;
        }
        fetch('/api/create-payment-intent', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ amount: amount }),
        })
            .then((res) => res.json())
            .then((data) => setClientSecret(data.clientSecret));

        // const clientSecret = new URLSearchParams(window.location.search).get(
        //     'payment_intent_client_secret'
        // );

        if (!clientSecret) {
            return;
        }

        stripe.retrievePaymentIntent(clientSecret).then(({ paymentIntent }) => {
            console.log(paymentIntent?.status);
            switch (paymentIntent?.status) {
                case 'succeeded':
                    setMessage('Payment succeeded!');
                    break;
                case 'processing':
                    setMessage('Your payment is processing.');
                    break;
                case 'requires_payment_method':
                    setMessage(
                        'Your payment was not successful, please try again.'
                    );
                    break;
                default:
                    setMessage('Something went wrong.');
                    break;
            }
        });
    }, [stripe]);

    const handleSubmit = async (e: any) => {
        e.preventDefault();

        if (!stripe || !elements) {
            // Stripe.js hasn't yet loaded.
            // Make sure to disable form submission until Stripe.js has loaded.
            return;
        }

        setIsLoading(true);

        const cardElement: any = await elements.getElement(CardElement);

        const { token } = await stripe.createToken(cardElement);

        const { error, paymentIntent } = await stripe.confirmCardPayment(
            clientSecret,
            {
                payment_method: {
                    card: cardElement,
                    billing_details: {
                        name: name,
                    },
                },
            }
        );

        // console.log(token);

        const res: any = await makePayment({
            cardType: token?.card?.brand,
            cardHolderName: name,
            cardNumber: token?.card?.last4,
            expireDate: token?.card?.exp_month + '/' + token?.card?.exp_year,
            cvc: '121',
            operation: 'payment for north India group',
            operationType: token?.type,
            status: 'Received',
            cost: paymentIntent?.amount,
            notes: 'Invoice',
            cardPaymentId: paymentIntent?.id,
            cardTokenId: token?.id,
        });

        if (res?.data?.status) {
            notification.success({
                message: res?.data?.message,
            });
            router.push('/payment-success');
        } else {
            notification.error({
                message: 'something went wrong!',
            });
        }

        // const { error } = await stripe.confirmPayment({
        //     elements,
        //     confirmParams: {
        //         // Make sure to change this to your payment completion page
        //         return_url: 'http://localhost:3000/payment-success',
        //     },
        // });

        // This point will only be reached if there is an immediate error when
        // confirming the payment. Otherwise, your customer will be redirected to
        // your `return_url`. For some payment methods like iDEAL, your customer will
        // be redirected to an intermediate site first to authorize the payment, then
        // redirected to the `return_url`.
        if (
            error?.type === 'card_error' ||
            error?.type === 'validation_error'
        ) {
            setMessage(error.message as string);
        } else {
            setMessage('An unexpected error occurred.');
        }

        setIsLoading(false);
    };

    const paymentElementOptions: any = {
        layout: 'tabs',
    };

    return (
        <div className="mt-10">
            <form id="payment-form" onSubmit={handleSubmit}>
                <div className="w-[336px] ml-4">
                    <Form.Item
                        className="float-container"
                        name={['user', 'name']}
                        rules={[{ required: true }]}
                    >
                        <label className="ml-2 text-gray-450 opacity-[0.7] text-sm font-bold">
                            {paymentLoading ? (
                                <Skeleton.Input active size="small" />
                            ) : (
                                'Enter Card Holder Name'
                            )}
                        </label>
                        <Input
                            type="name"
                            onChange={(e) => setName(e.target.value)}
                            style={{
                                border: 'none',
                            }}
                        />
                    </Form.Item>
                </div>
                {/* <LinkAuthenticationElement
                id="link-authentication-element"
                onChange={(e: any) => setEmail(e.target.value)}
            /> */}
                {paymentLoading ? (
                    <Skeleton.Input active style={{ minWidth: '180px' }} />
                ) : (
                    <CardElement
                        id="card-element"
                        options={paymentElementOptions}
                    />
                )}
                <button
                    disabled={isLoading || !stripe || !elements}
                    id="submit"
                >
                    <span id="button-text">
                        {isLoading ? (
                            <div className="spinner" id="spinner"></div>
                        ) : (
                            'Pay now'
                        )}
                    </span>
                </button>
                {/* Show any error or success messages */}
                {/* {message && <div id="payment-message">{message}</div>} */}
            </form>
        </div>
    );
}
