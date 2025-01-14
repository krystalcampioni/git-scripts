import { graphql } from "@octokit/graphql";
import { RequestParameters } from "@octokit/graphql/dist-types/types";
import { getToken } from "./get-token";

const token = getToken();

const withoutLogging = graphql.defaults({
  headers: {
    authorization: `token ${token}`,
  },
}) as <T = any>(query: string, parameters?: RequestParameters) => Promise<T>;

const withLogging = graphql.defaults({
  headers: {
    authorization: `token ${token}`,
    "X-Github-Next-Global-ID": 1,
  },
  request: {
    hook: async (request: any, options: any) => {
      console.log("\n=== GraphQL Request ===");
      console.log("Query:", options.query);
      console.log("Variables:", options.variables);

      // Instead of trying to set a response hook, we'll wrap the request
      const response = await request(options);
      console.log("\n=== GraphQL Response ===");
      console.log(JSON.stringify(response.data, null, 2));
      return response;
    },
  },
}) as <T = any>(query: string, parameters?: RequestParameters) => Promise<T>;

export { withoutLogging as graphqlWithAuth, withLogging };
