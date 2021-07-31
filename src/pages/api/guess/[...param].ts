import {NextApiRequest, NextApiResponse} from 'next';
import locations from '../../../data/locations.json';
import * as turf from '@turf/turf';
import {ISolution} from '../types';

interface IResponse {
  lat: number;
  lng: number;
  solution: ISolution | null;
  d: number;
}

const handler = (req: NextApiRequest, res: NextApiResponse<IResponse>) => {
  const {param} = req.query;
  const lat = parseFloat(param[1]);
  const lng = parseFloat(param[2]);

  // TODO: CHECK IF GUESS IS IN TIME FOR THE GAME ROUND

  const l = locations.filter((l) => l.country === param[0]);
  let d = NaN;
  if (l.length > 0) {
    const p1 = turf.point([lat, lng]);
    const p2 = turf.point([l[0].lat, l[0].lng]);
    d = turf.distance(p1, p2);
  }

  res.status(200).json({lat, lng, solution: l.length > 0 ? l[0] : null, d});
}

export default handler;
