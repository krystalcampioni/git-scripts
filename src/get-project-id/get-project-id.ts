import { Organization, User } from "@octokit/graphql-schema";
import { graphqlWithAuth } from "../graphql-with-auth";
import getOrgProjectIdQuery from "./getOrgProjectIdQuery.graphql";
import getUserProjectIdQuery from "./getUserProjectIdQuery.graphql";

export async function getProjectId({
  owner,
  number,
  isOrg = false,
}: {
  owner: string;
  number: number;
  isOrg?: boolean;
}) {
  if (isOrg) {
    const {
      organization: { projectV2 },
    } = await graphqlWithAuth<{
      organization: Pick<Organization, "projectV2">;
    }>(getOrgProjectIdQuery, {
      number,
      organization: owner,
    });
    return projectV2?.id;
  } else {
    const {
      user: { projectV2 },
    } = await graphqlWithAuth<{ user: Pick<User, "projectV2"> }>(
      getUserProjectIdQuery,
      {
        number,
        user: owner,
      }
    );

    return projectV2?.id;
  }
}
