/* eslint-disable no-use-before-define */
import { Area } from './areas';
import { User } from './user';

export interface CampaignRank {
  id: string;
  image: string;
  name: string;
  points: number;
  rank: number;
}

export interface CampaignArea {
  id: string;
  areaId: string;
  name: string;
  status: string;
  createdAt: string;
  color: string;
}

interface CampaignFieldValue {
  id?: string;
  campaignId?: string;
  value: string;
}

export interface CampaignField {
  id: string;
  campaignId: string;
  name: string;
  sequence: number;
  title: string;
  status: 'ACTIVE' | 'INACTIVE';
  campaignFieldValues: CampaignFieldValue[];
}

export interface Campaign {
  id: string;
  title: string;
  sequence: number;
  image?: string;
  description: string;
  summary: string;
  goals: string;
  status: 'INACTIVE' | 'WAITING' | 'PUBLISHED';
  startDate: string;
  endDate: string;
  createdAt: Date;
  ideasQuantity?: number;
  campaignRank?: CampaignRank[];
  campaignAreas?: CampaignArea[];
  campaignFields: CampaignField[];
  usingCriteria?: boolean;
}

export interface TopCampaigns extends Campaign {
  _count: {
    ideas: number;
  };
}

export type CampaignCreateForm = Omit<Campaign, 'id' | 'createdAt'>;

export type CampaignUserType =
  | 'MANAGER'
  | 'EVALUATOR'
  | 'AGENT'
  | 'SUPPORT'
  | 'EVALUATOR_SCREENING'
  | 'EVALUATOR_ANALYZE'
  | 'EVALUATOR_IMPLEMENTATION';

export interface CampaignUser {
  id: string;
  userId: string;
  campaignId: string;
  user: User;
  type: CampaignUserType;
}

export interface CampaignStepItem {
  id: string;
  title: string;
  sequence: number;
  campaignId: string;
  campaignStepId: string;
  campaignStep: CampaignStep;
  limitDate?: string;
}

export type CampaignStepType = 'PROJECT' | 'QUICK_WIN';

export interface CampaignStep {
  id: string;
  campaignId: string;
  title: string;
  type?: CampaignStepType;
  description: string;
  sequence: number;
  campaignStepItems: CampaignStepItem[];
  processActivityId?: string;
}

export interface ProcessActivity {
  id?: string;
  name: string;
  campaignSteps?: CampaignStep[];
}

export interface CampaingStatusCount {
  countWaiting: number;
  countActive: number;
  countDone: number;
}
export interface CampaingActiveHistory {
  date: string;
  activeCampaignsNumber: string;
}
export interface IdeasHistory {
  date: string;
  totalIdeas: string;
}

export interface ProjectsFunnel {
  workPlan: {
    label: string;
    value: string;
  };
  ideaAcceleration: {
    label: string;
    value: string;
  };
  previewAnalysis: {
    label: string;
    value: string;
  };
  conclusionResults: {
    label: string;
    value: string;
  };
}

export interface QuickwinsFunnel {
  implementationPlan: {
    label: string;
    value: string;
  };
  implementation: {
    label: string;
    value: string;
  };
  results: {
    label: string;
    value: string;
  };
}

export interface InnovationCategory {
  formattedDate: string;
  ideasNumbersByAreaList: {
    area: Area;
    numberOfIdeas: string;
  }[];
}
