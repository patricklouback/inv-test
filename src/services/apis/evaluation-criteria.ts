import { IEvaluationCriteria } from "interfaces/evaluationCriteria";
import { api } from "services/api";

const API_NAME = process.env.NODE_ENV === 'development' ? 'evaluationCriterias' : 'evaluationcriterias';

export class EvaluationCriteriaAPI {
    static async updateEvaluationCriteriaCampaign(id: string, data: IEvaluationCriteria): Promise<void> {
        await api.put(`/${API_NAME}/campaign/${id}`, data);
    }

    static async getAllEvaluationCriteriaByCampaign(campaignId: string): Promise<IEvaluationCriteria[]> {
        const { data } = await api.get(`/${API_NAME}/campaign/all/${campaignId}`);
        return data;
    }

    static async createEvaluationCriteriaCampaign(data: IEvaluationCriteria): Promise<void> {
        await api.post(`/${API_NAME}/campaign`, data);
    }

    static async deleteEvaluationCriteriaCampaign(id: string): Promise<void> {
        await api.delete(`/${API_NAME}/campaign/${id}`);
    }

    static async importEvaluationCriteriaTemplate(campaignId: string): Promise<void> {
        await api.post(`/${API_NAME}/import-template/${campaignId}`);
    }

    static async getEvaluationCriteriaConfig(): Promise<IEvaluationCriteria[]> {
        const { data } = await api.get(`/${API_NAME}/configuration`);
        return data;
    }

    static async updateEvaluationCriteriaConfig(id: string, data: IEvaluationCriteria): Promise<void> {
        await api.put(`/${API_NAME}/configuration/${id}`, data);
    }

    static async createEvaluationCriteriaConfig(data: IEvaluationCriteria): Promise<void> {
        await api.post(`/${API_NAME}/configuration`, data);
    }

    static async deleteEvaluationCriteriaConfig(id: string): Promise<void> {
        await api.delete(`/${API_NAME}/configuration/${id}`);
    }

    static async updateIdeaEvaluationCriteria(id: string, rate: number): Promise<void> {
        await api.put(`/${API_NAME}/idea/${id}`, { rate });
    }
}