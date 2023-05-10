import { apiSlice } from '../api/apiSlice';

export const paymentApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        makePayment: builder.mutation({
            query: (data) => ({
                url: '/payment/makePaymentCard',
                method: 'POST',
                body: data,
            }),
            invalidatesTags: ['Payments'],
        }),
        getAllCard: builder.query({
            query: () => ({
                url: '/card/getAllCards',
                method: 'GET',
            }),
        }),
        getAllPayment: builder.query({
            query: () => ({
                url: '/payment/getAllPayments',
                method: 'GET',
            }),
            providesTags: ['Payments'],
        }),
    }),
});

export const {
    useMakePaymentMutation,
    useGetAllCardQuery,
    useGetAllPaymentQuery,
} = paymentApi;
