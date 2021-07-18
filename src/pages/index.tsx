import dynamic from 'next/dynamic';
import React from 'react';

const Map = dynamic(() => import('Atoms/Map'), {
	ssr: false,
});

function App() {
	return (
		<div>
			{/* <p>Where is {places[0].name}?</p>
			<p>Your guess is {distance} kilometres away!</p> */}
			<Map />
		</div>
	);
}

export default App;
