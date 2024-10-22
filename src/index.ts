import { getLabelIds } from "./get-label-ids";

async function main() {
  console.log("Server is running!!!");

  try {
    const x = await getLabelIds(["bug", "ux"]);
    console.log("Labels fetched:", { x });
  } catch (error) {
    console.error("Error fetching labels:", error);
  }
}

main().catch(console.error);
