import { BatchIssueInput, IssueInput } from "../types";
import { createSingleIssue } from "./create-single-issue";

export async function createBatchIssues(input: BatchIssueInput) {
  const results = [];
  console.log("Starting batch creation with:", input.issues.length, "issues");

  for (const issue of input.issues) {
    console.log("\nProcessing issue:", issue.title);

    // Determine labels - if issue has specific labels, use those, otherwise use default
    const labels = issue.labels || input.defaultLabels || [];
    console.log("Using labels:", labels);

    const issueInput: IssueInput = {
      repoOwner: input.repoOwner,
      repoName: input.repoName,
      isOrg: input.isOrg,
      title: issue.title,
      body: issue.body,
      labels: labels,
      assignees: issue.assignees,
      projectNumber: issue.projectNumber || input.defaultProjectNumber,
      milestoneNumber: issue.milestoneNumber || input.defaultMilestoneNumber,
    };

    try {
      const result = await createSingleIssue(issueInput);
      results.push(result);
    } catch (error) {
      console.error("Failed to create issue:", issue.title, error);
      throw error;
    }
  }

  console.log("\nBatch creation completed:", results.length, "issues created");
  return results;
}
