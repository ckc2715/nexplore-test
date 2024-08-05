import type { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  return knex.raw(`
    CREATE TABLE todo_list (
        "id" SERIAL NOT NULL,
        "duty" TEXT NOT NULL,
        "completed" BOOLEAN NOT NULL DEFAULT false,
        "created_at" timestamp NOT NULL DEFAULT current_timestamp,
        "updated_at" timestamp NOT NULL DEFAULT current_timestamp,
        "deleted_at" timestamp DEFAULT NULL,
        CONSTRAINT "todo_list_pk" PRIMARY KEY ("id")
    );
`);
}

export async function down(knex: Knex): Promise<void> {
  return knex.raw(`DROP TABLE IF EXISTS todo_list;`);
}
