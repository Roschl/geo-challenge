import {NextApiRequest, NextApiResponse} from 'next';

interface IResponse {
  name: string;
}

const handler = (req: NextApiRequest, res: NextApiResponse<IResponse>) => {
  res.status(200).json({name: 'John Doe'})
};

export default handler;
