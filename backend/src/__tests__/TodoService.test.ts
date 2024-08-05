import { TodoService } from '../services/TodoService';
import { TodoRepository } from '../repository/TodoRepository';
import { faker } from '@faker-js/faker';

type Mockify<T> = {
  [P in keyof T]: jest.Mock<NonNullable<unknown>>;
};

const mockData = new Array(3).fill(0).map((_, index) => ({
  id: index + 1,
  duty: faker.string.sample(50),
  completed: false,
  created_at: faker.date.anytime(),
  updated_at: faker.date.anytime(),
  deleted_at: null,
}));

describe('TodoService', () => {
  let todoService: TodoService;
  let repository: Mockify<TodoRepository>;

  beforeEach(async () => {
    repository = {
      list: jest.fn(() => mockData),
      create: jest.fn(() => ({
        id: 1,
        duty: faker.string.sample(50),
        completed: false,
        created_at: faker.date.anytime(),
        updated_at: faker.date.anytime(),
        deleted_at: null,
      })),
      delete: jest.fn(() => ({})),
      complete: jest.fn(() => ({})),
      exist: jest.fn(() => true),
    };
    todoService = new TodoService(
      repository as NonNullable<unknown> as TodoRepository
    );
  });

  it('should list all todo', async () => {
    const todoList = await todoService.list();
    expect(todoList.length).toEqual(mockData.length);
  });

  it('should return new created todo id', async () => {
    const newTodo = await todoService.create(faker.string.sample(10));
    expect(newTodo.id).toEqual(1);
  });

  it('should throw error message if new duty is empty', async () => {
    await todoService.create('').catch((error) => {
      expect(error).toBeInstanceOf(Error);
      expect(error.message).toMatch(new RegExp('invalid input'));
    });
  });

  it('should throw error message if new duty length is greater than 50', async () => {
    await todoService.create(faker.string.sample(100)).catch((error) => {
      expect(error).toBeInstanceOf(Error);
      expect(error.message).toMatch(
        new RegExp('the length of duty cannot be greater than 50')
      );
    });
  });

  it('should soft delete a todo if id is found', async () => {
    repository.exist = jest.fn(() => true);
    const isDeleted = await todoService.delete(1);
    expect(isDeleted).toBe(true);
  });

  it('should throw error message if to be deleted todo is not found', async () => {
    (repository.exist = jest.fn(() => false)),
      await todoService.delete(199999992).catch((error) => {
        expect(error).toBeInstanceOf(Error);
        expect(error.message).toMatch(new RegExp('invalid input'));
      });
  });

  it('should mark a todo to be completed if id is found', async () => {
    repository.exist = jest.fn(() => true);
    const isMarked = await todoService.complete(1);
    expect(isMarked).toBe(true);
  });

  it('should throw error message if to be marked completed todo is not found', async () => {
    (repository.exist = jest.fn(() => false)),
      await todoService.complete(199999992).catch((error) => {
        expect(error).toBeInstanceOf(Error);
        expect(error.message).toMatch(new RegExp('invalid input'));
      });
  });
});
