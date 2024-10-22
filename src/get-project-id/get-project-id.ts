import { Organization } from "@octokit/graphql-schema";
import { graphqlWithAuth } from "../graphql-with-auth";
import getProjectIdQuery from "./getProjectIdQuery.graphql";

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
    getProjectIdQuery,
    {
      number,
      organization,
    }
  );

  return projectV2?.id;
}
