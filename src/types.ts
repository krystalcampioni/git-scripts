export type IssueInput = {
  title: string;
  body: string;
  repoOwner: string;
  repoName: string;
  labels?: string[];
  assignees?: string[];
  projectNumber?: number;
  milestoneNumber?: number;
  isOrg?: boolean;
};

export type BatchIssueInput = {
  repoOwner: string;
  repoName: string;
  isOrg?: boolean;
  defaultLabels?: string[];
  defaultProjectNumber?: number;
  defaultMilestoneNumber?: number;
  issues: {
    title: string;
    body: string;
    labels?: string[];
    assignees?: string[];
    projectNumber?: number;
    milestoneNumber?: number;
  }[];
};
