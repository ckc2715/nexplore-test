import db from './src/db';

// enables the fake database for all test files
jest.mock('./src/db');

// run migrations
beforeAll(async () => {
  await db.migrate.latest();
  await db.seed.run();
});

// close connection
afterAll(async () => {
  await db.destroy();
});
