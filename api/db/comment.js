import { BeepNotFoundError } from "../use-case/like.js";
import { pool } from "./connection-pool.js";

export async function insertComment(userId, beepId, content) {
  const connection = await pool.connect();
  try {
    await connection.query("BEGIN");

    await checkBeepId(connection, beepId);

    const res = await connection.query(
      `INSERT INTO comment (user_id, beep_id, content) VALUES ($1, $2, $3) RETURNING * 
      `,
      [userId, beepId, content]
    );

    await connection.query("COMMIT");

    return res.rows[0]; // Assuming your query returns the newly inserted comment
  } catch (e) {
    await connection.query("ROLLBACK");
    throw e;
  } finally {
    connection.release();
  }
}

export async function updateComment(commentId, content) {
  const connection = await pool.connect();
  try {
    await connection.query("BEGIN");

    const res = await connection.query(
      "UPDATE comment SET content = $1 WHERE id = $2",
      [content, commentId]
    );

    await connection.query("COMMIT");

    return res.rows[0]; // Assuming your query returns the updated comment
  } catch (e) {
    await connection.query("ROLLBACK");
    throw e;
  } finally {
    connection.release();
  }
}

export async function deleteComment(commentId) {
  const connection = await pool.connect();
  try {
    await connection.query("BEGIN");

    const res = await connection.query(
      "DELETE FROM comment WHERE id = $1",
      [commentId]
    );

    await connection.query("COMMIT");

    return res.rowCount > 0; // Indicate whether the comment was successfully deleted
  } catch (e) {
    await connection.query("ROLLBACK");
    throw e;
  } finally {
    connection.release();
  }
}

async function checkBeepId(connection, beepId) {
  const res = await connection.query("SELECT 1 FROM beep WHERE id = $1", [
    beepId,
  ]);
  if (res.rows.length === 0) {
    throw new BeepNotFoundError();
  }
}
