import { TodoServiceError } from '../errors/TodoServiceError';
import { TodoRepository } from '../repository/TodoRepository';

export class TodoService {
  constructor(private todoRepo: TodoRepository) {}

  list() {
    return this.todoRepo.list();
  }

  async create(duty: string) {
    if (!duty || typeof duty !== 'string') {
      throw new TodoServiceError(400, 'invalid input');
    }
    if (duty.length > 50) {
      throw new TodoServiceError(
        400,
        'the length of duty cannot be greater than 50'
      );
    }
    return this.todoRepo.create(duty);
  }

  async delete(id: number) {
    const found = await this.todoRepo.exist(id);
    if (!found) {
      throw new TodoServiceError(400, 'invalid input');
    }
    await this.todoRepo.delete(id);
    return true;
  }

  async complete(id: number) {
    const found = await this.todoRepo.exist(id);
    if (!found) {
      throw new TodoServiceError(400, 'invalid input');
    }
    await this.todoRepo.complete(id);
    return true;
  }
}
