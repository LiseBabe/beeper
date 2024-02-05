import DOMPurify from "isomorphic-dompurify";
import { insertComment, updateComment, deleteComment } from "../db/comment.js";

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

export async function editComment(commentId, content) {
  try {
    return await updateComment(commentId, content);
  } catch (error) {
    // Handle specific errors if necessary
    throw error;
  }
}

export async function removeComment(commentId) {
  try {
    const success = await deleteComment(commentId);
    if (!success) {
      throw new CommentNotFoundError("Comment not found");
    }
    return true;
  } catch (error) {
    // Handle specific errors if necessary
    throw error;
  }
}

