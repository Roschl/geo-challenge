export interface IGame {
  continents: string[] | null;
  id: string;
  isRunning: boolean;
  map: string;
  maxRounds: number;
  players: IPlayer[];
  round: number;
  startedAt: number | null;
}

export interface IPlayer {
  points: number;
  userId: string;
}

export interface ISolution {
  country: string;
  city: string;
  lat: number;
  lng: number;
  code: string;
  continent: string;
}