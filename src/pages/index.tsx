import {LatLng, LatLngExpression} from 'leaflet';
import {GetServerSideProps} from 'next';
import dynamic from 'next/dynamic';
import React, {useState} from 'react';
import {ISolution} from './api/types';

const Map = dynamic(() => import('Atoms/Map'), {
  ssr: false,
});

function App() {
  const [solution, setSolution] = useState<ISolution | null>(null);

  const handleClickMap = async (country: string, coordinates: [number, number]) => {
    const res = await fetch(`/api/guess/${country}/${coordinates[0]}/${coordinates[1]}`).then((r) => r.json());
    console.log(res);
    setSolution(res.solution);
  }

  return (
    <div>
      {/* <p>Where is {places[0].name}?</p>
			<p>Your guess is {distance} kilometres away!</p> */}
      <Map solution={solution} onClick={handleClickMap}/>
    </div>
  );
}

export default App;
