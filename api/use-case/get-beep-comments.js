import { getBeepComments } from "../db/get-beep-comments.js";

export async function getCommentsForBeep(beepId) {
  const comments = await getBeepComments(beepId);

  return comments;
}