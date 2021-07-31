import dynamic from 'next/dynamic';
import React, { useState } from 'react';
import { useEffect } from 'react';
import { IGame, ISolution } from './api/types';

const Map = dynamic(() => import('Atoms/Map'), {
  ssr: false,
});

function App() {
  const [games, setGames] = useState<IGame[]>([]);
  const [solution, setSolution] = useState<ISolution | null>(null);

  useEffect(() => {
    fetchGames();
  }, []);

  const fetchGames = async () => {
    const res = await fetch('api/games').then((r) => r.json());
    setGames(res);
  };

  const handleClickMap = async (country: string, coordinates: [number, number]) => {
    const res = await fetch(`/api/guess/${country}/${coordinates[0]}/${coordinates[1]}`).then((r) => r.json());
    console.log(res);
    setSolution(res.solution);
  }

  const handleCreateGame = async () => {
    const res = await fetch(`/api/game/user_test`);
    console.log(res);
  };

  console.log({ games });

  return (
    <div>
      {/* <p>Where is {places[0].name}?</p>
			<p>Your guess is {distance} kilometres away!</p> */}
      <Map solution={solution} onClick={handleClickMap} />
      <button onClick={handleCreateGame}>Create new Game</button>
    </div>
  );
}

export default App;
