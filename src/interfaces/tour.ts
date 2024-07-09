export enum TourStatus {
  UNVIEWED = 'UNVIEWED',
  VIEWED = 'VIEWED',
}

export enum TourId {
  HOME = 'HOME',
  MENU_LIST = 'MENU_LIST',
  KNOWLEDGE_TRAIL = 'KNOWLEDGE_TRAIL',
  IDEAS_WAITING = 'IDEAS_WAITING',
  IDEAS_REVIEW = 'IDEAS_REVIEW',
  IDEAS_APPROVED = 'IDEAS_APPROVED',
  IDEAS_EXTERNAL_REVIEW = 'IDEAS_EXTERNAL_REVIEW',
  DETAIL_IDEAS_DEFAULT = 'DETAIL_IDEAS_DEFAULT',
  DETAIL_IDEAS_WITH_PROCESS = 'DETAIL_IDEAS_WITH_PROCESS',
  MANAGEMENT_PLATFORM = 'MANAGEMENT_PLATFORM',
  FUNNEL_STEP_ONE = 'FUNNEL_STEP_ONE',
  FUNNEL_STEP_TWO = 'FUNNEL_STEP_TWO',
  FUNNEL_STEP_THREE = 'FUNNEL_STEP_THREE',
  CAMPAIGN_STEP_ONE = 'CAMPAIGN_STEP_ONE',
  CAMPAIGN_STEP_TWO = 'CAMPAIGN_STEP_TWO',
}

export interface ITour {
  [TourId.HOME]: TourStatus;
  [TourId.MENU_LIST]: TourStatus;
  [TourId.KNOWLEDGE_TRAIL]: TourStatus;
  [TourId.IDEAS_WAITING]: TourStatus;
  [TourId.IDEAS_REVIEW]: TourStatus;
  [TourId.IDEAS_APPROVED]: TourStatus;
  [TourId.IDEAS_EXTERNAL_REVIEW]: TourStatus;
  [TourId.DETAIL_IDEAS_DEFAULT]: TourStatus;
  [TourId.DETAIL_IDEAS_WITH_PROCESS]: TourStatus;
  [TourId.MANAGEMENT_PLATFORM]: TourStatus;
  [TourId.FUNNEL_STEP_ONE]: TourStatus;
  [TourId.FUNNEL_STEP_TWO]: TourStatus;
  [TourId.FUNNEL_STEP_THREE]: TourStatus;
  [TourId.CAMPAIGN_STEP_ONE]: TourStatus;
  [TourId.CAMPAIGN_STEP_TWO]: TourStatus;
}
