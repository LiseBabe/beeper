import { queryNormalized } from "../db/connection-pool.js";
import { findBeep } from "../db/get-beep-search.js";
import { UsernameNotFound } from "./get-user-page.js";

export async function getBeepSearch(activeUserId, name) {
  const beeps = await findBeep(activeUserId,name);
  return {beeps};
}