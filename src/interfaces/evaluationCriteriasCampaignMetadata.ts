import { IdeaKanbamStep } from "./idea";

export interface EvaluationCriteriasCampaignMetadata {
    id: string;
    criteriaName: string;
    criteriaDescription: string;
    criteriaStep: IdeaKanbamStep;
    criteriaWeight: number;
}