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
  const [projectId, labels] = await Promise.all([
    PROJECT_NUMBER
      ? getProjectId({
          owner: REPO_OWNER,
          number: PROJECT_NUMBER,
        })
      : null,
    LABELS ? getLabelIds(LABELS) : [],
  ]);

  const projectIds = projectId ? [projectId] : [];

  const preparedIssues = await Promise.all(
    sourceIssues.map(async (issue) => {
      const assigneeIds = issue.assignees
        ? await getAssigneeIds(issue.assignees)
        : [];

      const { assignees, ...issueWithoutAssignees } = issue;

      return {
        ...issueWithoutAssignees,
        labels,
        assigneeIds,
        // projectIds,
      };
    })
  );

  return preparedIssues;
};
