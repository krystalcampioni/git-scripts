import { Repository } from "@octokit/graphql-schema";
import { graphqlWithAuth } from "./graphql-with-auth";

export async function getMilestoneId({
  owner,
  name,
  number,
}: {
  owner: string;
  name: string;
  number: number;
}) {
  const {
    repository: { milestone },
  } = await graphqlWithAuth<{ repository: Repository }>(
    `
  query($owner: String!, $name: String!, $number: Int!) {
    repository(owner: $owner, name: $name) {
      milestone(number: $number) {
        id            
      }
    }
  }
`,
    {
      owner,
      name,
      number,
    }
  );

  return milestone?.id;
}
