import DOMPurify from "isomorphic-dompurify";
import { insertComment, removeComment } from "../db/comment.js";

const COMMENT_MAX_LENGTH = 280;

export class CommentNotFoundError extends Error {}

export class CommentTooLongError extends Error {}

export async function addComment(user, beepId, content) {
  if (content.length > COMMENT_MAX_LENGTH) {
    throw new CommentTooLongError();
  }

  const insertedComment = await  insertComment(user.id, beepId, DOMPurify.sanitize(content));

  return {
    ...insertedComment,
    authorId: user.id,
    authorName: user.name,
    authorPicture: user.picture,
  };
}

export async function deleteComment(commentId) {
  try {
    // Delete the comment
    const deletedComment = await removeComment(commentId);

    // Return the deleted comment
    return deletedComment;
  } catch (error) {
    // If the comment was not found, throw a specific error
    if (error.message === "Comment not found") {
      throw new CommentNotFoundError();
    }
    // Otherwise, re-throw the original error
    throw error;
  }
}

