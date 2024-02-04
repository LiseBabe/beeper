import { queryNormalized } from "../db/connection-pool.js";
import { findUser } from "../db/find_user.js";
import { getUserByName } from "../db/user.js";
import { UsernameNotFound } from "./get-user-page.js";

export async function getUserSearch(name) {
  const users = await findUser(name);
  return {users};
}