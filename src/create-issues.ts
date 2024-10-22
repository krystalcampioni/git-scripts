import { getLabelIds } from "./get-label-ids";
import { getMilestoneId } from "./get-milestone-id";
import { getProjectId } from "./get-project-id";

import { graphqlWithAuth } from "./graphql-with-auth";

import {
  makeIssues,
  MILESTONE_NUMBER,
  REPO_NAME,
  REPO_OWNER,
} from "./source-issues";

export async function createIssue(issue: any, repoId: any) {
  try {
    const milestoneId = await getMilestoneId({
      owner: REPO_OWNER,
      name: REPO_NAME,
      number: MILESTONE_NUMBER,
    });

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
    await createIssue(await issue, repoId);
  }
}
