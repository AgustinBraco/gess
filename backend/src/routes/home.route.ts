import express, { Request, Response } from 'express';

const homeRouter = express.Router();

homeRouter.get('/', (req: Request, res: Response) => {
  res.status(200).json({ status: `Success`, payload: `Server running` });
}
)

export default homeRouter