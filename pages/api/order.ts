import type { NextApiRequest, NextApiResponse } from 'next';

export default function OrderAPI(req: NextApiRequest, res: NextApiResponse) {
  try {
    console.info('body: ', req.body);

    res.status(200).json({ name: 'John Doe' });
  } catch (error) {
    res.status(500).json(error);
  }
}
