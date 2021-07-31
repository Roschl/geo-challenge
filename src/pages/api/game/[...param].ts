import { NextApiRequest, NextApiResponse } from 'next';
import { createGame } from 'src/lib/actions';
import { IGame } from '../types';

interface IResponse {
  game: IGame;
}

const handler = (req: NextApiRequest, res: NextApiResponse<IResponse>) => {
  const { param } = req.query;

  // todo: Generate unique game ID and verify it with database

  const user = param[0];

  const game: IGame = {
    continents: null,
    id: (100000000).toString(36),
    isRunning: false,
    map: 'borderless',
    maxRounds: 10,
    players: [
      {
        points: 0,
        userId: user
      }
    ],
    round: 0,
    startedAt: null
  }

  createGame(null, 'borderless', 10, user);

  res.status(200).json({ game });
}

export default handler;
