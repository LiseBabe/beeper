// This file contains functions to insert and delete follow relationships between users. 
// It handles database operations related to following and unfollowing users.

import { queryNormalized } from "./connection-pool.js";

export class FolloweeDoesNotExistError extends Error {}

const FOREIGN_KEY_VIOLATION_CODE = "23503"; // https://www.postgresql.org/docs/current/errcodes-appendix.html

export async function insertFollow(followerId, followeeId) {
  try {
    await queryNormalized(
      "INSERT INTO follow (follower, followee) VALUES ($1, $2) ON CONFLICT DO NOTHING",
      [followerId, followeeId]
    );
  } catch (e) {
    if (
      e.code === FOREIGN_KEY_VIOLATION_CODE &&
      e.constraint === "follow_followee_fkey"
    ) {
      throw new FolloweeDoesNotExistError();
    } else {
      throw e;
    }
  }
}

export async function deleteFollow(followerId, followeeId) {
  try {
    await queryNormalized(
      "DELETE FROM follow WHERE follower = $1 AND followee = $2",
      [followerId, followeeId]
    );
  } catch (e) {
    if (
      e.code === FOREIGN_KEY_VIOLATION_CODE &&
      e.constraint === "follow_followee_fkey"
    ) {
      throw new FolloweeDoesNotExistError();
    } else {
      throw e;
    }
  }
}
