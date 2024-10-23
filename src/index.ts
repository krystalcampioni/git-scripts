import { createSingleIssue } from "./create-issues/create-single-issue";
import { createBatchIssues } from "./create-issues/create-batch-issues";

async function main() {
  try {
    await createBatchIssues({
      repoOwner: "krystalcampioni",
      repoName: "test-git-glider",
      defaultLabels: ["feature"],
      defaultAssignees: [],
      issues: [
        {
          title: "Issue 1",
          body: "Description 1",
        },
        {
          title: "Issue 2",
          body: "Description 2",
          labels: ["urgent"],
          assignees: ["krystalcampioni"],
        },
      ],
    });
  } catch (error) {
    console.error("Error creating issues:", error);
  }
}

main().catch(console.error);
