import type { NextApiRequest, NextApiResponse } from 'next';

const NOTION_KEY = process.env.NOTION_KEY;
const NOTION_DB_ID = process.env.NOTION_DB_ID;

export default async function OrderAPI(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  try {
    // console.info('body: ', req.body);
    if (!NOTION_KEY) {
      throw new Error('Integration Token not Informed!');
    }

    if (!NOTION_DB_ID) {
      throw new Error('Database ID not Informed!');
    }

    res.status(200).json({ name: 'John Doe' });
  } catch (error) {
    res.status(500).json(error);
  }
}
