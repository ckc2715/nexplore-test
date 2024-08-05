import db from '../db';
import { TodoRepository } from '../repository/TodoRepository';
import { faker } from '@faker-js/faker';

describe('TodoRepository', () => {
  let todoRepository: TodoRepository;

  beforeEach(async () => {
    todoRepository = new TodoRepository(db);
  });

  it('should list all todo', async () => {
    const todoList = await todoRepository.list();
    expect(todoList.length).toBeGreaterThan(0);
  });

  it('should insert a todo and returning the new todo', async () => {
    const [{ count: prevCount }] = await db('todo_list').count();

    const newDuty = faker.string.sample(50);

    const newTodo = await todoRepository.create(newDuty);

    const [{ count: afterCount }] = await db('todo_list').count();

    expect(afterCount).toEqual((prevCount as number) + 1);

    const newTodoId = newTodo.id;

    expect(typeof newTodoId).toBe('number');
  });

  it('should soft delete a todo by id', async () => {
    const newDuty = faker.string.sample(50);

    const [{ id }] = await db('todo_list')
      .insert({ duty: newDuty })
      .returning('id');

    const [newTodo] = await db('todo_list').select('*').where('id', id);

    await todoRepository.delete(newTodo.id);

    const [deletedTodo] = await db('todo_list').select('*').where('id', id);

    expect(deletedTodo.deleted_at).toBeTruthy();
  });

  it('should mark a todo to be completed by id', async () => {
    const newDuty = faker.string.sample(50);

    const [{ id }] = await db('todo_list')
      .insert({ duty: newDuty })
      .returning('id');

    const [newTodo] = await db('todo_list').select('*').where('id', id);

    await todoRepository.complete(newTodo.id);

    const [deletedTodo] = await db('todo_list').select('*').where('id', id);

    expect(deletedTodo.completed).toBe(true);
  });

  it('should return true if todo id is found', async () => {
    const found = await todoRepository.exist(1);
    expect(found).toBe(true);
  });

  it('should return false if todo id is not found', async () => {
    const found = await todoRepository.exist(199999);
    expect(found).toBe(false);
  });
});
