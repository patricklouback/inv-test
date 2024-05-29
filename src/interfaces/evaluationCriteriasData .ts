import { EvaluationCriteriasCampaignMetadata } from "./evaluationCriteriasCampaignMetadata";
import { User } from "./user";

export interface EvaluationCriteriasData {
    id: string;
    userEvaluator: User;
    evaluationCriteriasCampaignMetadata: EvaluationCriteriasCampaignMetadata;
    criteriaRate: number;
}