import { IssueInput } from "../types";
import { getLabelIds } from "../get-label-ids";
import { getProjectId } from "../get-project-id";
import { getMilestoneId } from "../get-milestone-id";
import { getAssigneeIds } from "../get-assignee-id/get-assignee-id";
import { getRepoId } from "../get-repo-id";
import { graphqlWithAuth } from "../graphql-with-auth";
import createIssuesMutation from "./createIssuesMutation.graphql";

export async function createSingleIssue(input: IssueInput) {
  console.log("\nCreating issue with input:", JSON.stringify(input, null, 2));

  const repoId = await getRepoId(input.repoOwner, input.repoName);
  console.log("Got repo ID:", repoId);

  const [labelIds, projectId, milestoneId, assigneeIds] = await Promise.all([
    input.labels
      ? getLabelIds(input.labels, input.repoOwner, input.repoName)
      : [],
    input.projectNumber
      ? getProjectId({
          owner: input.repoOwner,
          number: input.projectNumber,
          isOrg: input.isOrg,
        })
      : null,
    input.milestoneNumber
      ? getMilestoneId({
          owner: input.repoOwner,
          name: input.repoName,
          number: input.milestoneNumber,
        })
      : null,
    input.assignees ? getAssigneeIds(input.assignees) : [],
  ]);

  console.log("Got label IDs:", labelIds);
  console.log("Got project ID:", projectId);
  console.log("Got milestone ID:", milestoneId);
  console.log("Got assignee IDs:", assigneeIds);

  const projectIds = projectId ? [projectId] : [];

  try {
    const createIssueResponse = await graphqlWithAuth(createIssuesMutation, {
      repoId,
      title: input.title,
      body: input.body,
      labelIds,
      milestoneId,
      projectIds,
      assigneeIds,
    });

    console.log(
      "Create issue response:",
      JSON.stringify(createIssueResponse, null, 2)
    );

    return createIssueResponse.createIssue.issue;
  } catch (error) {
    console.error("Failed to create issue:", input.title);
    console.error("Error details:", error);
    throw error;
  }
}
