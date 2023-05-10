import { getCurrentUser } from '@/utils';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { BASE_URL } from 'constants/api-endpoints';

export const apiSlice = createApi({
    reducerPath: 'api',
    baseQuery: fetchBaseQuery({
        baseUrl: BASE_URL,
        prepareHeaders: async (headers) => {
            const user = getCurrentUser('currentUser');
            const hasUser = !!user && !!user!.token;
            if (hasUser) {
                headers.set('authorization', `Bearer ${user.token}`);
            }
            // headers.set('Content-Type', 'application/json');
            return headers;
        },
    }),
    tagTypes: ['Ads', 'Campaigns', 'Campaign', 'Payments'],
    endpoints: () => ({}),
});
