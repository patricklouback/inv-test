export enum PageType {
    'HOME_PAGE',
    'USER_PROFILE',
    'APPROVAL_FUNNEL',
    'APP_CONFIG',
    'KNOWLEDGE_TRAIL',
    'CAMPAIGN_MANAGEMENT',
    'USER_MANAGEMENT',
    'MY_IDEAS',
    'CAMPAIGN_LIST',
    'IDEAS_REPOSITORY',
    'DASHBOARDS',
    'STARTUPS_REPOSITORY'
}

export interface Banner {
    id: string;
    title: string;
    subtitle?: string;
    titleCommonUser: string;
    subtitleCommonUser: string;
    backgroundImage?: string;
    isTrial: boolean;
    page: PageType,
}