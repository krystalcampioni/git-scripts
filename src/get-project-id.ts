import { graphqlWithAuth } from "./graphql-with-auth";

export async function getProjectId({
  organization,
  number,
}: {
  organization: string;
  number: number;
}) {
  const {
    // @ts-ignore
    organization: {
      projectV2: { id: projectId },
    },
  } = await graphqlWithAuth(
    `
  query($organization: String! $number: Int!){
    organization(login: $organization){
      projectV2(number: $number) {
        id
      }
    }
  }
`,
    {
      number,
      organization,
    }
  );

  console.log(">>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>", {
    projectId,
    organization,
    number,
  });

  return projectId;
}
