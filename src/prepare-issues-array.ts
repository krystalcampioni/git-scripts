import { getLabelIds } from "./get-label-ids";
import { getProjectId } from "./get-project-id";
import { REPO_OWNER, LABELS, sourceIssues } from "./source-issues";

export const prepareIssuesArray = async () => {
  const response = await getProjectId({
    organization: REPO_OWNER,
    number: 2894,
  });

  const labels = await getLabelIds(LABELS);

  const projectIds = [response];

  return sourceIssues.map(async (issue) => ({
    ...issue,
    labels,
    projectIds,
  }));
};
