export interface IEvaluationCriteria {
  id?: string;
  criteriaName: string;
  criteriaDescription: string;
  criteriaStep: string;
  criteriaWeight: number;
  campaignId?: string;
}
