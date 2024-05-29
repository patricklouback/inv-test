export interface Area {
  createdAt: string;
  id: string;
  name: string;
  status: string;
  color: string;
}

export interface AreaCampaignSigned {
  area: Area;
  areaId: string;
  assignedAt: string;
  campaignId: string;
  id: string;
}
export interface AreaPoints {
  label: string;
  id: string;
  color: string;
  points: number;
}

export interface EngagementAreaPoints {
  month: string;
  areas: AreaPoints[];
  totalPoints: number;
}
