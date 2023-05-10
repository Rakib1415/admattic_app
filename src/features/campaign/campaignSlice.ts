import { PayloadAction, createSlice } from '@reduxjs/toolkit';

type CampaignInfo = {
    name: string;
    type: string;
    platforms: string[];
    appName: string;
};

export interface Campaign extends CampaignInfo {
    _id?: string;
    location?: string;
    language?: string;
    conversionTracking?: any;
    campaign?: any;
    message?: any;
    status?: any;
    data?: [];
}

interface State {
    campaignInfo: CampaignInfo;
    campaign: Campaign;
}

const initialState: State = {
    campaignInfo: {
        name: '',
        type: '',
        platforms: [],
        appName: '',
    },
    campaign: {
        name: '',
        type: '',
        platforms: [],
        appName: '',
    },
};

const campaignSlice = createSlice({
    name: 'campaign',
    initialState,
    reducers: {
        createCampaignInfo: (
            state: State,
            action: PayloadAction<CampaignInfo>
        ) => {
            state.campaignInfo = action.payload;
        },
        createCampaign: (state: State, action: PayloadAction<Campaign>) => {
            state.campaign = action.payload;
        },
    },
});

export default campaignSlice.reducer;
export const { createCampaignInfo, createCampaign } = campaignSlice.actions;
