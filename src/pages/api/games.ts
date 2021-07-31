import { NextApiRequest, NextApiResponse } from "next";
import { getGames } from "src/lib/actions";

const handler = (req: NextApiRequest, res: NextApiResponse) => {
  const games = getGames();

  res.status(200).json({ games })
}

export default handler;
