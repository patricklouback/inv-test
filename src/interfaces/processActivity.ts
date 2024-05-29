import { CampaignStep } from "./campaign";

export interface ProcessActivity {
    name: string;
    id?: string;
    campaignSteps?: CampaignStep[];
}