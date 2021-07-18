import React, { useState } from 'react';
import {
	MapContainer,
	GeoJSON,
	useMapEvents,
	CircleMarker,
	Polyline,
} from 'react-leaflet';
import { LatLngExpression } from 'leaflet';
import borders from '../data/ne_50m_land.json';

interface IPlace {
	name: string;
	coordinates: LatLngExpression;
}

const places: IPlace[] = [
	{
		name: 'Berlin (Germany)',
		coordinates: [52.520008, 13.404954],
	},
];

function App() {
	const [clickedPosition, setClickedPosition] =
		useState<LatLngExpression | null>(null);
	const [realPosition, setRealPosition] = useState<LatLngExpression | null>(
		null
	);
	const [distance, setDistance] = useState<number | null>(null);

	const position: LatLngExpression = [0, 0];

	const g: any = borders;

	/*
    In the backend, we need timestamps -> when did game start
   */
	// Step 1: Show name of city - country to guess, start timer
	// Step 2: User guesses
	// Step 3: When time is up, send guessed coordinates to backend
	// BACKEND: Compare guessed with correct one, determine points
	// Step 4: Show distance between guessed and right, show points, wait for other players to enter guess -> pull -> show
	//         their guesses on the map
	// Step 5: Start next guess after some time

	const Map = () => {
		const map = useMapEvents({
			click: (e) => {
				setClickedPosition(e.latlng);
				setRealPosition(places[0].coordinates);

				const d = e.latlng.distanceTo(places[0].coordinates) / 1000;
				setDistance(d);
			},
		});

		return <div />;
	};

	return (
		<div>
			<p>Where is {places[0].name}?</p>
			<p>You're guess is {distance} kilometres away!</p>
			<MapContainer
				center={position}
				zoom={2}
				scrollWheelZoom={false}
				style={{ background: '#fff', width: '1000px', height: '1000px' }}
			>
				<Map />
				<GeoJSON
					attribution="&copy; credits due..."
					data={g}
					interactive={false}
					style={{
						color: '#000',
						fillColor: '#e0f3db',
						fillOpacity: 1,
						opacity: 1,
						weight: 1,
					}}
				/>
				{clickedPosition && (
					<CircleMarker color="red" center={clickedPosition} radius={4} />
				)}
				{realPosition && (
					<CircleMarker color="green" center={realPosition} radius={4} />
				)}
				{distance && realPosition && clickedPosition && (
					<Polyline positions={[realPosition, clickedPosition]} />
				)}
			</MapContainer>
		</div>
	);
}

export default App;
