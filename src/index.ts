import { createIssues } from "./create-issues";

async function main() {
  try {
    await createIssues();
  } catch (error) {
    console.error("Error creating issues:", error);
  }
}

main().catch(console.error);
