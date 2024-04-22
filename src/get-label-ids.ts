import { graphqlWithAuth } from "./graphql-with-auth";

const REPO_OWNER = "shopify";
const REPO_NAME = "forms";

export async function getLabelIds(labels: string[]) {
  const nodes = [];

  for (const label of labels) {
    const {
      // @ts-ignore
      repository: {
        labels: { nodes: labelNodes },
      },
    } = await graphqlWithAuth(
      `
      query($owner: String!, $name: String!, $label: String!) {
        repository(owner: $owner, name: $name) {
          labels(query: $label, first: 1) {
            nodes {
              name
              id
            }
          }
        }
      }
    `,
      {
        owner: REPO_OWNER,
        name: REPO_NAME,
        label: label,
      }
    );

    nodes.push(labelNodes[0].id);
  }

  return nodes;
}
