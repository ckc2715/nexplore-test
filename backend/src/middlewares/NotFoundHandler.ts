import { Response, Request } from 'express';

const notFoundErrorHandler = (_req: Request, res: Response) =>
  res.status(404).send('Route does not exist');

export default notFoundErrorHandler;
