import { Idea } from 'interfaces/idea';

export const getStatus = (idea: Idea): string => {
  if (idea.kanbanStatus === 'PAUSED' && idea.status !== 'INACTIVE') {
    return 'PAUSED';
  }
  if (idea.kanbanStatus === 'OWNER_REVIEW' && idea.status !== 'INACTIVE') {
    return 'IN_REVIEW';
  }
  if (
    (idea.kanbanStatus === 'AGENT_REVIEW' && idea.status !== 'INACTIVE') ||
    (idea.kanbanStatus === 'TECH_REVIEW' && idea.status !== 'INACTIVE') ||
    (idea.kanbanStatus === 'MANAGER_REVIEW' && idea.status !== 'INACTIVE')
  ) {
    return 'EXTERNAL_REVIEW';
  }
  if (idea.kanbanStatus === 'APPROVED' && idea.status !== 'INACTIVE') {
    return 'APPROVED';
  }
  if (idea.status === 'INACTIVE') {
    return 'INACTIVE';
  }
  return 'WAITING';
};
