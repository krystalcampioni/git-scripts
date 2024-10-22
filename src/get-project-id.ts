import { Organization } from "@octokit/graphql-schema";
import { graphqlWithAuth } from "./graphql-with-auth";

export async function getProjectId({
  organization,
  number,
}: {
  organization: string;
  number: number;
}) {
  const {
    organization: { projectV2 },
  } = await graphqlWithAuth<{ organization: Pick<Organization, "projectV2"> }>(
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

  return projectV2?.id;
}
