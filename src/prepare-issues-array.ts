import { getLabelIds } from "./get-label-ids";
import { getProjectId } from "./get-project-id";
import { getAssigneeIds } from "./get-assignee-id/get-assignee-id";

import {
  REPO_OWNER,
  LABELS,
  sourceIssues,
  PROJECT_NUMBER,
} from "./source-issues";

export const prepareIssuesArray = async () => {
  let projectId;
  if (PROJECT_NUMBER) {
    projectId = await getProjectId({
      owner: REPO_OWNER,
      number: PROJECT_NUMBER,
    });
  }

  let labels: string[] = [];

  if (LABELS) {
    labels = await getLabelIds(LABELS);
  }

  const projectIds = [projectId];

  const promises = sourceIssues.map(async (issue) => {
    const assigneeIds = issue.assignees
      ? await getAssigneeIds(issue.assignees)
      : [];

    const { assignees, ...issueWithoutAssignees } = issue;

    return {
      ...issueWithoutAssignees,
      labels,
      assigneeIds,
    };
  });

  return await Promise.all(promises);
};
