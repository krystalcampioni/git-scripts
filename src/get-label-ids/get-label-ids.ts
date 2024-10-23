import { Repository } from "@octokit/graphql-schema";
import { graphqlWithAuth } from "../graphql-with-auth";
import getLabelIdsQuery from "./getLabelIdsQuery.graphql";
import createLabelMutation from "./createLabelMutation.graphql";
import { getRepoId } from "../get-repo-id";

const labelColors = [
  "B60205", // red
  "D93F0B", // orange
  "FBCA04", // yellow
  "0E8A16", // green
  "006B75", // teal
  "1D76DB", // blue
  "0052CC", // dark blue
  "5319E7", // purple
  "E99695", // light red
  "F9D0C4", // light orange
  "FEF2C0", // light yellow
  "C2E0C6", // light green
  "BFDADC", // light teal
  "C5DEF5", // light blue
  "BFD4F2", // light dark blue
  "D4C5F9", // light purple
];

const getRandomColor = (): string => {
  return labelColors[Math.floor(Math.random() * labelColors.length)];
};

export async function getLabelIds(
  labels: string[],
  owner: string,
  name: string
) {
  console.log("Creating/checking labels:", labels);
  const nodes = [];
  const repoId = await getRepoId(owner, name);

  for (const label of labels) {
    const {
      repository: { labels: existingLabels },
    } = await graphqlWithAuth<{ repository: Repository }>(getLabelIdsQuery, {
      owner,
      name,
      label: label,
    });

    const labelNodes = existingLabels?.nodes || [];
    const exactMatch = labelNodes.find((node) => node?.name === label);

    if (exactMatch?.id) {
      nodes.push(exactMatch.id);
    } else {
      const { createLabel } = await graphqlWithAuth(createLabelMutation, {
        repositoryId: repoId,
        name: label,
        color: getRandomColor(),
      });

      if (createLabel?.label?.id) {
        nodes.push(createLabel.label.id);
      }
    }
  }

  return nodes;
}
