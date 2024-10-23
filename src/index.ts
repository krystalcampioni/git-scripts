import { createIssues } from "./create-issues";

async function main() {
  try {
    const response = await createIssues();
    console.log("Response:", { response });
  } catch (error) {
    console.error("Error creating issues:", error);
  }
}

main().catch(console.error);
