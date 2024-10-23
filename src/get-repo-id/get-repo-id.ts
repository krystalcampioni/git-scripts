import { graphqlWithAuth } from "../graphql-with-auth";
import { Repository } from "@octokit/graphql-schema";
import getRepoIdQuery from "./getRepoIdQuery.graphql";

export const getRepoId = async (owner: string, name: string) => {
  const {
    repository: { id: repoId },
  } = await graphqlWithAuth<{ repository: Repository }>(getRepoIdQuery, {
    owner,
    name,
  });

  return repoId;
};
