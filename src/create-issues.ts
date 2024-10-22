import { Repository } from "@octokit/graphql-schema";
import { getMilestoneId } from "./get-milestone-id";
import { graphqlWithAuth } from "./graphql-with-auth";
import { prepareIssuesArray } from "./prepare-issues-array";

import { MILESTONE_NUMBER, REPO_NAME, REPO_OWNER } from "./source-issues";

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
  const issues = await prepareIssuesArray();
  const {
    repository: { id: repoId },
  } = await graphqlWithAuth<{ repository: Repository }>(
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
