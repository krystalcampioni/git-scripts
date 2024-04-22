import { graphql } from "@octokit/graphql";
import { getToken } from "./get-token";

const token = getToken();

export const graphqlWithAuth = graphql.defaults({
  headers: {
    authorization: `token ${token}`,
  },
});
