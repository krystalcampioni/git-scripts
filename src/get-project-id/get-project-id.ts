import { Organization, User } from "@octokit/graphql-schema";
import { graphqlWithAuth } from "../graphql-with-auth";
import getOrgProjectIdQuery from "./getOrgProjectIdQuery.graphql";
import getUserProjectIdQuery from "./getUserProjectIdQuery.graphql";
import { IS_ORG } from "../source-issues";

export async function getProjectId({
  owner,
  number,
}: {
  owner: string;
  number: number;
}) {
  if (IS_ORG) {
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
