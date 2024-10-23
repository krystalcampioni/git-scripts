import { User } from "@octokit/graphql-schema";
import { graphqlWithAuth } from "../graphql-with-auth";
import getAssigneeIdQuery from "./getAssigneeIdQuery.graphql";

export async function getAssigneeIds(logins: string[]): Promise<string[]> {
  const assigneeIds = await Promise.all(
    logins.map(async (login) => {
      const { user } = await graphqlWithAuth<{ user: Pick<User, "id"> }>(
        getAssigneeIdQuery,
        { login }
      );
      return user?.id;
    })
  );

  return assigneeIds.filter((id): id is string => id !== undefined);
}
