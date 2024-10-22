import { getMilestoneId } from "../get-milestone-id";
import { graphqlWithAuth } from "../graphql-with-auth";
import { prepareIssuesArray } from "../prepare-issues-array";
import createIssuesMutation from "./createIssuesMutation.graphql";

import { MILESTONE_NUMBER, REPO_NAME, REPO_OWNER } from "../source-issues";
import { getRepoId } from "../get-repo-id";

export async function createIssueGraphqlCall(issue: any, repoId: any) {
  try {
    let milestoneId;
    if (MILESTONE_NUMBER) {
      milestoneId = await getMilestoneId({
        owner: REPO_OWNER,
        name: REPO_NAME,
        number: MILESTONE_NUMBER,
      });
    }

    const createIssueResponse = await graphqlWithAuth(createIssuesMutation, {
      repoId: repoId,
      title: issue.title,
      body: issue.body,
      labelIds: issue.labels,
      milestoneId: milestoneId,
    });

    console.log(
      `Successfully created Issue "${createIssueResponse.createIssue.issue.title}"`
    );
  } catch (error) {
    console.log(`Could not create Issue "${issue.title}"`);
    console.log("Error:", error);
  }
}

export async function createIssues() {
  const issues = await prepareIssuesArray();
  const repoId = await getRepoId();

  for (const issue of issues) {
    await createIssueGraphqlCall(await issue, repoId);
  }
}
