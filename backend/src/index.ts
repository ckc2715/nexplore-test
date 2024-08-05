import * as express from 'express';
import { PORT, SERVICE_NAME } from './config/dotenv';
import * as cors from 'cors';
import db from './db';
import { TodoService } from './services/TodoService';
import { TodoRouter } from './routers/TodoRouters';
import { TodoRepository } from './repository/TodoRepository';
import notFoundErrorHandler from './middlewares/NotFoundHandler';
import { errorHandler } from './middlewares/ErrorHandler';

const app = express();
app.use(express.json());
app.use(cors());

const todoRepository = new TodoRepository(db);
const todoService = new TodoService(todoRepository);
const todoRouter = new TodoRouter(todoService);

app.use('/todo', todoRouter.router());

app.use(errorHandler);
app.use(notFoundErrorHandler);

app.listen(PORT, () =>
  console.log(`${SERVICE_NAME} is listening on port ${PORT}`)
);
