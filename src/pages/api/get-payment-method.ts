import type { NextApiRequest, NextApiResponse } from 'next';

require('dotenv').config();
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    const { payment_intent } = req.body;

    const paymentIntent = await stripe.paymentIntents.retrieve(payment_intent);
    const paymentMethod = await stripe.paymentMethods.retrieve(
        paymentIntent.payment_method
    );
    res.send({
        paymentMethod,
    });
}
