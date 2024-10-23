import { createSingleIssue } from "./create-issues/create-single-issue";
import { createBatchIssues } from "./create-issues/create-batch-issues";

async function main() {
  try {
    await createBatchIssues({
      repoOwner: "krystalcampioni",
      repoName: "test-git-glider",
      defaultLabels: ["feature"],
      issues: [
        {
          title: "Issue 1",
          body: "Description 1",
          assignees: ["krystalcampioni"],
        },
        {
          title: "Issue 2",
          body: "Description 2",
          labels: ["urgent"], // This should override defaultLabels
          assignees: [],
        },
      ],
    });
  } catch (error) {
    console.error("Error creating issues:", error);
  }
}

main().catch(console.error);
