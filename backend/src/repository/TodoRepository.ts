import type { Knex } from 'knex';
import { QueryResult } from 'pg';

export interface Todo {
  id: number;
  duty: string;
  completed: boolean;
  created_at: Date;
  updated_at: Date;
  deleted_at: Date | null;
}

export class TodoRepository {
  constructor(private knex: Knex) {}

  async list() {
    const result = await this.knex.raw<QueryResult<Todo>>(`
            SELECT 
                id, duty, completed, created_at, updated_at, deleted_at
            FROM todo_list
            WHERE deleted_at IS NULL
            ORDER BY id DESC;
        `);
    return result.rows;
  }

  async create(duty: string) {
    const result = await this.knex.raw<QueryResult<Todo>>(
      `INSERT INTO todo_list (duty) VALUES (?) returning *;`,
      [duty]
    );
    return result.rows[0];
  }

  delete(id: number) {
    return this.knex.raw<QueryResult>(
      `UPDATE todo_list SET updated_at = current_timestamp, deleted_at = current_timestamp WHERE id = ?;`,
      [id]
    );
  }

  complete(id: number) {
    return this.knex.raw<QueryResult>(
      `UPDATE todo_list SET completed = true, updated_at = current_timestamp WHERE id = ?;`,
      [id]
    );
  }

  async exist(id: number) {
    const result = await this.knex.raw<QueryResult<{ id: number }>>(
      'SELECT id FROM todo_list WHERE deleted_at IS NULL AND id = ?;',
      [id]
    );
    if (result.rowCount && result.rowCount > 0) {
      return true;
    }
    return false;
  }
}
