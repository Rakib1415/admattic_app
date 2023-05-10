import { apiSlice } from '../api/apiSlice';

export const userApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        updateProfile: builder.mutation({
            query: (data) => ({
                url: '/user/updateProfile',
                method: 'PUT',
                body: data,
            }),
        }),
        updatePassword: builder.mutation({
            query: (data) => ({
                url: '/user/justSendOTP',
                method: 'POST',
                body: data,
            }),
        }),
        verifyOtp: builder.mutation({
            query: (data) => ({
                url: '/user/justVerifyOtp',
                method: 'POST',
                body: data,
            }),
        }),
    }),
});

export const {
    useUpdateProfileMutation,
    useUpdatePasswordMutation,
    useVerifyOtpMutation,
} = userApi;
