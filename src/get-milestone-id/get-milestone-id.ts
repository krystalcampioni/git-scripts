import { Repository } from "@octokit/graphql-schema";
import { graphqlWithAuth } from "../graphql-with-auth";
import getMilestoneIdQuery from "./getMilestoneIdQuery.graphql";

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
  } = await graphqlWithAuth<{ repository: Repository }>(getMilestoneIdQuery, {
    owner,
    name,
    number,
  });

  return milestone?.id;
}
