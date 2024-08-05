import { Knex } from 'knex';
import { faker } from '@faker-js/faker';

export async function seed(knex: Knex): Promise<void> {
  // Deletes ALL existing entries
  await knex('todo_list').del();

  const mockData = new Array(50).fill(0).map(() => {
    return {
      duty: faker.string.sample(50),
      completed: false,
      created_at: faker.date.anytime(),
      updated_at: faker.date.anytime(),
      deleted_at: null,
    };
  });

  // Inserts seed entries
  await knex('todo_list').insert(mockData);
}
