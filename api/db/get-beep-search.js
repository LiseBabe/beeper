import { queryNormalized } from "./connection-pool.js";

export async function findBeep(name) {
  const rows = await queryNormalized(
    `SELECT 
      beep.id, 
      beep.content, 
      beep.created_at, 
      beep.like_count,
      users.id AS author_id, 
      users.name AS author_name,
      users.picture AS author_picture
    FROM 
      beep 
    JOIN users ON beep.author_id = users.id
    WHERE beep.content LIKE '%' || $1 || '%'
    ORDER BY 
      beep.created_at DESC 
    `,
    [`${name}`]
  );
    return {rows};
  }
