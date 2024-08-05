import * as express from 'express';
import { Todo } from '../repository/TodoRepository';
import { TodoService } from '../services/TodoService';

interface CreateTodoRequest {
  duty: string;
}

export class TodoRouter {
  constructor(private todoService: TodoService) {}

  public router() {
    const router = express.Router();
    router.get('/', this.list);
    router.post('/', this.create);
    router.put('/:id', this.complete);
    router.delete('/:id', this.delete);
    return router;
  }

  list: express.RequestHandler = async (_, res, next) => {
    try {
      const todoList = await this.todoService.list();
      res.json(todoList);
    } catch (error) {
      next(error);
    }
  };

  create: express.RequestHandler<unknown, Todo, CreateTodoRequest> = async (
    req,
    res,
    next
  ) => {
    try {
      const todo = await this.todoService.create(req.body.duty);
      res.json(todo);
    } catch (error) {
      next(error);
    }
  };

  complete: express.RequestHandler = async (req, res, next) => {
    try {
      const { id } = req.params;
      await this.todoService.complete(parseInt(id));
      res.json({ ok: true });
    } catch (error) {
      next(error);
    }
  };

  delete: express.RequestHandler = async (req, res, next) => {
    try {
      const { id } = req.params;
      await this.todoService.delete(parseInt(id));
      res.json({ ok: true });
    } catch (error) {
      next(error);
    }
  };
}
