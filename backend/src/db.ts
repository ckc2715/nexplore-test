import { NODE_ENV } from './config/dotenv';
import Knex from 'knex';
import knexFile from './config/knexfile';

const knex = Knex(knexFile[NODE_ENV]);

export default knex;
