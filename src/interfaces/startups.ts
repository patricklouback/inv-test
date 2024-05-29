type FoundationYear = `${number}${number}${number}${number}`;

export interface Startup {
    id: string;
    name: string;
    state?: string;
    city?: string;
    foundationYear?: FoundationYear;
    url?: string;
    description?: string;
    marketFields?: string;
    investmentRounds?: number;
    lastInvestment?: string;
    linkedIn?: string;
    email?: string;
    startupMembers?: string[];
}

export interface StartupMember {
    id: string;
    name: string;
    position?: string;
    startupId: string;
    email?: string;
}

export type SocialMediaType = 'FACEBOOK' | 'TWITTER' | 'INSTAGRAM' | 'LINKEDIN' | 'YOUTUBE'

export interface StartupSocialMedia {
    id: string;
    url: string;
    socialMedia: SocialMediaType;
    startupId: string;
}

export const StartupLastInvestment = [
    'Angel',
    'Equity Crowdfunding',
    'Pre-Seed',
    'Product Crowdfunding',
    'Seed',
    'Series A',
    'Series B',
    'Series C',
    'Series D',
    '-',
];

export const StartupMarket = [
    'Automotive',
    'Education',
    'Energy',
    'Entertainment',
    'Finance',
    'Food',
    'Health',
    'Human Resources',
    'Logistics',
    'Marketing',
    'Mental Health',
    'Real Estate',
    'Retail',
    'Sustainability',
    'Technology',
    'Tourism',
    'other',
];

export const StartupInvestmentRounds = [
    0, 1, 2, 3, 4,
    5, 6, 7, 8, 9,
    10, 13
]

