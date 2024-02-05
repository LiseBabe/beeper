import { queryNormalized } from "./connection-pool.js";

export async function findUser(name) {
    const rows = await queryNormalized("SELECT * FROM users WHERE name LIKE '%' || $1 || '%'", [
      `${name}`,
    ]);
    return {rows};
  }
