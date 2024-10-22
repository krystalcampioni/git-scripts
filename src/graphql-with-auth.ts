import { graphql } from "@octokit/graphql";
import { RequestParameters } from "@octokit/graphql/dist-types/types";
import { getToken } from "./get-token";

const token = getToken();

export const graphqlWithAuth = graphql.defaults({
  headers: {
    authorization: `token ${token}`,
  },
}) as <T = any>(query: string, parameters?: RequestParameters) => Promise<T>;
