import { getLabelIds } from "./get-label-ids";
import { getProjectId } from "./get-project-id";

import {
  REPO_OWNER,
  LABELS,
  sourceIssues,
  PROJECT_NUMBER,
} from "./source-issues";

export const prepareIssuesArray = async () => {
  let response;
  if (PROJECT_NUMBER) {
    response = await getProjectId({
      organization: REPO_OWNER,
      number: PROJECT_NUMBER,
    });
  }

  let labels: string[] = [];

  if (LABELS) {
    labels = await getLabelIds(LABELS);
  }

  const projectIds = [response];

  return sourceIssues.map(async (issue) => ({
    ...issue,
    labels,
    projectIds,
  }));
};
