import { Request, NextFunction } from 'express';
import { TodoRouter } from '../routers/TodoRouters';
import { TodoService } from '../services/TodoService';
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

describe('WeatherForecastRouter', () => {
  let router: TodoRouter;
  let service: Mockify<TodoService>;
  let resJson: jest.SpyInstance;
  let req: unknown;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let res: any;
  let next: NextFunction;

  beforeEach(function () {
    service = {
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
    };
    router = new TodoRouter(service as unknown as TodoService);
    req = {
      body: {},
      params: {},
    };
    res = {
      json: () => {
        // do nothing.
      },
    };
    next = () => {
      // do nothing.
    };
    resJson = jest.spyOn(res, 'json');
  });

  it('should has four endpoints: for todo in router', () => {
    const expressRouter = router.router();
    expect(expressRouter.stack.length).toBe(4);
  });

  it('should route GET /todo method to correct method correctly', async () => {
    await router.list(req as Request, res, next);
    expect(service.list).toBeCalledTimes(1);
    expect(resJson).toBeCalledWith(mockData);
  });

  it('should route POST /todo method correct method correctly', async () => {
    router.create(req as Request, res, next);
    expect(service.create).toBeCalledTimes(1);
  });

  it('should route PUT /todo/:id method correct method correctly', async () => {
    router.complete(req as Request, res, next);
    expect(service.complete).toBeCalledTimes(1);
  });

  it('should route DELETE /todo/:id method correct method correctly', async () => {
    router.delete(req as Request, res, next);
    expect(service.delete).toBeCalledTimes(1);
  });
});
