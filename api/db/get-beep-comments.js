import { queryNormalized } from "./connection-pool.js";

export async function getBeepComments(beepId) {
  return await queryNormalized(
    `
    SELECT 
      comment.id,
      comment.beep_id,
      comment.content, 
      comment.created_at, 
      users.id AS author_id, 
      users.name AS author_name, 
      users.picture AS author_picture
    FROM 
      comment 
      JOIN users ON comment.user_id = users.id 
    WHERE 
      comment.beep_id = $1
    ORDER BY
      created_at 
    LIMIT 
      5
    `,
    [beepId]
  );
}