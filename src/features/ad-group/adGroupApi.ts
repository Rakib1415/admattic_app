import { apiSlice } from '../api/apiSlice';

export interface IAdGroup {
    campaignId: string;
    budget: number;
    focusOn: string;
    targetCost: number;
    headings: string[];
    descriptions: string[];
    name: string;
    avatar: File;
    video: File;
    html: File;
}

export const adGroupApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        addAdGroup: builder.mutation({
            query: (data) => ({
                url: '/api/createAd',
                method: 'POST',
                body: data,
            }),
            invalidatesTags: ['Campaign'],
        }),
        getAdGroupById: builder.query({
            query: (id: string) => ({
                url: `/api/getAd?adId=${id}`,
                method: 'GET',
            }),
            providesTags: ['Ads'],
        }),
        updateAdGroup: builder.mutation({
            query: (data) => ({
                url: '/api/updateAdsStatus',
                method: 'PUT',
                body: data,
            }),
            invalidatesTags: ['Ads'],
        }),
        updateAdGroupByName: builder.mutation({
            query: (data) => ({
                url: '/api/updateAdsName',
                method: 'PUT',
                body: data,
            }),
            invalidatesTags: (result, error, arg) => [
                { type: 'Campaign', id: arg },
                'Campaigns',
            ],
        }),
    }),
});

export const {
    useAddAdGroupMutation,
    useGetAdGroupByIdQuery,
    useUpdateAdGroupMutation,
    useUpdateAdGroupByNameMutation,
} = adGroupApi;
