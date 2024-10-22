import { getLabelIds } from "./get-label-ids";
import { getProjectId } from "./get-project-id";

export const REPO_OWNER = "shopify";
export const REPO_NAME = "forms";
export const PROJECT_NUMBER = 2894;
export const MILESTONE_NUMBER = 30;
export const LABELS = ["gsd:40982"];

export const sourceIssues = [
  {
    title: "test",
    body: "test",
  },
];

export const makeIssues = async () => {
  const response = await getProjectId({
    organization: REPO_OWNER,
    number: 2894,
  });

  const labels = await getLabelIds(["gsd:40982"]);

  const projectIds = [response];

  return sourceIssues.map(async (issue) => ({
    ...issue,
    labels,
    projectIds,
  }));
};
