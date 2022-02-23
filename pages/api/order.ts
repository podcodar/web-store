import type { NextApiRequest, NextApiResponse } from 'next';

const NOTION_KEY = process.env.NOTION_KEY;
const NOTION_DB_ID = process.env.NOTION_DB_ID;

const ENDPOINT = 'https://api.notion.com/v1/pages';

const mRequest: RequestInit = {
  method: 'POST',
  headers: {
    Accept: 'application/json',
    'Notion-Version': '2021-08-16',
    'Content-Type': 'application/json',
    Authorization: `Bearer ${NOTION_KEY}`,
  },
};

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

    mRequest.body = JSON.stringify(createPageOnNotion(NOTION_DB_ID));
    const response = await fetch(ENDPOINT, mRequest);
    const result = await response.json();

    res.status(200).json(result);
  } catch (error) {
    res.status(500).json(error);
  }
}

function createPageOnNotion(database_id: string) {
  const page = {
    parent: {
      database_id,
    },
    icon: {
      type: 'emoji',
      emoji: '🎉',
    },
    properties: {
      Name: {
        title: [
          {
            text: {
              content: `Pedido ${Date.now()}`,
            },
          },
        ],
      },
      Tags: {
        multi_select: [
          {
            id: 'e6ecab00-3ed3-4e76-85c3-0394b18c12cf',
            name: 'Pendente',
            color: 'red',
          },
        ],
      },
    },
    children: [
      {
        object: 'block',
        type: 'heading_2',
        heading_2: {
          text: [
            {
              type: 'text',
              text: {
                content: 'Lacinato kale',
              },
            },
          ],
        },
      },
      {
        object: 'block',
        type: 'paragraph',
        paragraph: {
          text: [
            {
              type: 'text',
              text: {
                content:
                  'Lacinato kale is a variety of kale with a long tradition in Italian cuisine, especially that of Tuscany. It is also known as Tuscan kale, Italian kale, dinosaur kale, kale, flat back kale, palm tree kale, or black Tuscan palm.',
                link: {
                  url: 'https://en.wikipedia.org/wiki/Lacinato_kale',
                },
              },
            },
          ],
        },
      },
    ],
  };

  return page;
}
