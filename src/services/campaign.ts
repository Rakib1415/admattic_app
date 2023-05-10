import {
    CREATE_CAMPAIGN_URL,
    UPDATE_CAMPAIGN_URL,
} from 'constants/api-endpoints';
import httpService from 'httpclient/configuration';

const createCampaign = (campaign: any) => {
    return httpService.post(CREATE_CAMPAIGN_URL, { ...campaign });
};

const updateCampaign = ({
    campaignIds,
    status,
}: {
    campaignIds: string[];
    status: string;
}) => {
    return httpService.put(UPDATE_CAMPAIGN_URL, {
        campaignArr: campaignIds,
        status,
    });
};

const campaignService = {
    createCampaign,
    updateCampaign,
};
export default campaignService;
