import { createIssues } from "./create-issues";

async function main() {
  console.log("Server is running!!!");

  try {
    const response = await createIssues();
    console.log("Response:", { response });
  } catch (error) {
    console.error("Error creating issues:", error);
  }
}

main().catch(console.error);
