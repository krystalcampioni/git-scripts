import { graphqlWithAuth } from "../graphql-with-auth";
import { Repository } from "@octokit/graphql-schema";
import { REPO_NAME, REPO_OWNER } from "../source-issues";
import getRepoIdQuery from "./getRepoIdQuery.graphql";

export const getRepoId = async () => {
  const {
    repository: { id: repoId },
  } = await graphqlWithAuth<{ repository: Repository }>(getRepoIdQuery, {
    owner: REPO_OWNER,
    name: REPO_NAME,
  });

  return repoId;
};
