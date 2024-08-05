import { newDb } from 'pg-mem';
import knexFile from '../config/knexfile';

const mem = newDb();

export default mem.adapters.createKnex(
  0,
  knexFile.test
) as typeof import('knex');
