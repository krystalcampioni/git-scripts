import dotenv from "dotenv";
dotenv.config();

export function getToken() {
  return process.env.GITHUB_TOKEN;
}
