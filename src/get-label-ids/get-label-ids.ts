import { Repository } from "@octokit/graphql-schema";
import { graphqlWithAuth } from "../graphql-with-auth";
import getLabelIdsQuery from "./getLabelIdsQuery.graphql";
import { REPO_NAME, REPO_OWNER } from "../source-issues";

export async function getLabelIds(labels: string[]) {
  const nodes = [];

  for (const label of labels) {
    const {
      repository: { labels },
    } = await graphqlWithAuth<{ repository: Repository }>(getLabelIdsQuery, {
      owner: REPO_OWNER,
      name: REPO_NAME,
      label: label,
    });

    const labelNodes = labels?.nodes || [];

    if (labelNodes[0]?.id) {
      nodes.push(labelNodes[0].id);
    }
  }

  return nodes;
}
