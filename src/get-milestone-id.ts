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
    // @ts-ignore
    repository: {
      milestone: { id: milestoneId },
    },
  } = await graphqlWithAuth(
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

  return milestoneId;
}
