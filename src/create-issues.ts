import { getLabelIds } from "./get-label-ids";
import { getMilestoneId } from "./get-milestone-id";

import { graphqlWithAuth } from "./graphql-with-auth";

import { makeIssues } from "./source-issues";

// The repository to add this issue to
const REPO_OWNER = "shopify";
const REPO_NAME = "forms";
const PROJECT_NUMBER = 2894;
const MILESTONE_NUMBER = 30; //appbridge

export async function createIssue(issue: any, repoId: any) {
  try {
    const milestoneId = await getMilestoneId({
      owner: REPO_OWNER,
      name: REPO_NAME,
      number: MILESTONE_NUMBER,
    });

    // // Create an issue
    const createIssueResponse = await graphqlWithAuth(
      `
      mutation ($repoId: ID!, $title: String!, $body: String!, $labelIds: [ID!], $milestoneId: ID, ) {
        createIssue(input: {repositoryId: $repoId, title: $title, body: $body, labelIds: $labelIds, milestoneId: $milestoneId, }) {
          issue {
            id
            title
          }
        }
      }
    `,
      {
        repoId: repoId,
        title: issue.title,
        body: issue.body,
        labelIds: issue.labels,
        milestoneId: milestoneId,
      }
    );

    console.log(
      // @ts-ignore
      `Successfully created Issue "${createIssueResponse.createIssue.issue.title}"`
    );
  } catch (error) {
    console.log(`Could not create Issue "${issue.title}"`);
    console.log("Error:", error);
  }
}

export async function main() {
  const issues = await makeIssues();
  const {
    // @ts-ignore
    repository: { id: repoId },
  } = await graphqlWithAuth(
    `
    query($owner: String!, $name: String!) {
      repository(owner: $owner, name: $name) {
        id
      }
    }
  `,
    {
      owner: REPO_OWNER,
      name: REPO_NAME,
    }
  );

  for (const issue of issues) {
    // @ts-ignore
    console.log(">>>>", await issue);
    await createIssue(await issue, repoId);
  }
}
