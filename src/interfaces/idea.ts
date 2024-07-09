/* eslint-disable no-use-before-define */
import { Campaign } from './campaign';
import { EvaluationCriteriasData } from './evaluationCriteriasData ';
import { ProcessActivity } from './processActivity';
import { User } from './user';

interface IdeaFieldValue {
  id?: string;
  ideaId?: string;
  value: string;
}

export interface IdeaField {
  id: string;
  ideaId: string;
  name: string;
  options: any;
  sequence: number;
  title: string;
  description: string;
  status: 'ACTIVE' | 'INACTIVE';
  type:
    | 'TEXT'
    | 'TEXTAREA'
    | 'SELECT'
    | 'CHECKBOX'
    | 'BOOLEAN'
    | 'FILE'
    | 'IMAGE';
  ideaFieldValues: IdeaFieldValue[];
  obligatoriness: 'MANDATORY' | 'OPTIONAL';
}

export enum IdeaUserStatus {
  DEFAULT = 'DEFAULT',
  INVITED = 'INVITED',
  ACCEPTED = 'ACCEPTED',
  REJECTED = 'REJECTED',
  EXCLUDED = 'EXCLUDED',
}

export interface IdeaUser {
  id: string;
  userId: string;
  ideaId: string;
  type: 'OWNER' | 'COLLABORATOR';
  user: User;
  status: IdeaUserStatus;
}

export interface IdeaStepItem {
  id: string;
  title: string;
  sequence: number;
  completed: boolean;
  ideaId: string;
  ideaStepId: string;
  limitDate?: string;
}

export interface IdeaStep {
  id: string;
  title: string;
  sequence: number;
  completed: boolean;
  ideaId: string;
  ideaStepItems: IdeaStepItem[];
}
export interface IdeaLikes {
  id: string;
  userId: string;
  ideaId: string;
}

export interface Tag {
  name: string;
  color: string;
  textColor: string;
  checked?: boolean;
  id: string;
}

export interface IdeaTag {
  id: string;
  checked: boolean;
  tagId: string;
  tag: Tag;
  ideaId: string;
}

export interface FilteredIdeaTags {
  id: string;
  checked: boolean;
  name: string;
  color: string;
  textColor: string;
}

export type IdeaKanbamStep = 'SCREENING' | 'ANALYZE' | 'SELECT' | 'IMPLEMENTED';

export type IdeaStatus = 'INACTIVE' | 'WAITING' | 'PUBLISHED';

export type IdeaType = 'PROJECT' | 'QUICK_WIN';

export type IdeaKanbanStatus =
  | 'WAITING'
  | 'TECH_REVIEW'
  | 'MANAGER_REVIEW'
  | 'OWNER_REVIEW'
  | 'APPROVED'
  | 'AGENT_REVIEW'
  | 'PAUSED';

export interface KanbanStep {
  id: string;
  title: string;
  sequence: number;
  ideas?: Idea[];
  ideaLinks?: IdeaLink[];
}

export interface IdeaComment {
  id: string;
  ideaId: string;
  idea: Idea;
  isInternalComment: boolean;
  type: string;
  userId: string;
  user: User;
  targetUser: User;
  message: string;
  createdAt: Date;
  ideaCommentFiles?: Array<{
    originalName: string;
    url: string;
  }>;
}

export interface HistoryItens {
  id: string;
  date: string;
  title: string;
  description: string;
  ideaId: string;
  userId: string;
  user: User;
}

export interface Idea {
  id: string;
  title: string;
  description: string;
  campaignId: string;
  kanbanStep?: IdeaKanbamStep;
  type: IdeaType;
  sequence: number;
  ideaFields: IdeaField[];
  ideaUsers: IdeaUser[];
  ideaFiles: Array<string>;
  ideaLikes?: IdeaLikes[];
  ideaComments?: IdeaComment[];
  IdeaChange?: IdeaChange[];
  campaign?: Pick<Campaign, 'title' | 'sequence' | 'endDate' | 'usingCriteria'>;
  ideaSteps: IdeaStep[];
  status: string;
  createdAt?: string;
  kanbanStatus?: string;
  likes?: number;
  hasUpdate?: number;
  ideaTags?: IdeaTag[];
  processActivityId?: string;
  processActivity: ProcessActivity;
  newKanbanStep?: KanbanStep;
  evaluationCriteriasData: EvaluationCriteriasData[];
  evaluatorsUsers: User[];
  directApprovals: DirectApproval[];
  directApprovalsUsers: User[];
  secondaryLinks: Idea[];
  historyItem?: HistoryItens;
}

export interface KanbanObject {
  [x: string]: [x: Idea];
}

export interface IdeaCommentCreateForm {
  ideaId: string;
  message: string;
  file: any;
}

export type IdeaChangeStatus = 'SEEN' | 'NOT_SEEN';

export type IdeaChangeType = 'COMMENT' | 'EDITION' | 'REVIEW' | 'ANALISYS';

export interface IdeaChange {
  id: string;
  status: IdeaChangeStatus;
  originUserId: string;
  targetUserId: string;
  ideaId: string;
  type: IdeaChangeType;
  createdAt: Date;
  idea: Idea;
  originUser: User;
  targetUser: User;
}

export interface IdeaLink {
  id: string;
  primaryIdeaId: string;
  secondaryIdeaId: string;
}

export interface DirectApproval {
  ideaId: string;
  userId: string;
  analysis: string;
  explanation: string;
  kanbanStep: string;
}
