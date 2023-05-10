import {
    CREATE_CAMPAIGN_URL,
    EDIT_CAMPAIGN_URL,
    GET_ALL_CAMPAIGN_URL,
    UPDATE_CAMPAIGN_URL,
} from 'constants/api-endpoints';
import { apiSlice } from '../api/apiSlice';
import { Campaign } from './campaignSlice';

export const campaignApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        addCampaign: builder.mutation<Campaign, Partial<Campaign>>({
            query: (data) => ({
                url: CREATE_CAMPAIGN_URL,
                method: 'POST',
                body: data,
            }),
        }),
        editCampaign: builder.mutation<Campaign, Partial<Campaign>>({
            query: (data) => ({
                url: EDIT_CAMPAIGN_URL,
                method: 'PUT',
                body: data,
            }),
        }),
        updatedCampaignByStatus: builder.mutation({
            query: (data) => ({
                url: UPDATE_CAMPAIGN_URL,
                method: 'PUT',
                body: data,
            }),
            invalidatesTags: ['Campaign', 'Campaigns'],
        }),
        getAllCampaign: builder.query<any, void>({
            query: () => ({
                url: GET_ALL_CAMPAIGN_URL,
                method: 'GET',
            }),
            providesTags: ['Campaigns'],
        }),
        getCampaignById: builder.query({
            query: (id: string) => ({
                url: `/api/getCampaignById?campaignId=${id}`,
                method: 'GET',
            }),
            providesTags: ['Campaign'],
        }),
        getCampaignByDates: builder.mutation({
            query: (data) => ({
                url: `/api/getCampaignDates`,
                method: 'POST',
                body: data,
            }),
        }),
    }),
});

export const {
    useAddCampaignMutation,
    useGetAllCampaignQuery,
    useGetCampaignByIdQuery,
    useEditCampaignMutation,
    useGetCampaignByDatesMutation,
    useUpdatedCampaignByStatusMutation,
} = campaignApi;
