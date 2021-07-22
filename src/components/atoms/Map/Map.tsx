import borders from '../../../data/ne_50m_land.json';
import {LatLng, LatLngTuple} from 'leaflet';
import {useState} from 'react';
import {
  CircleMarker,
  GeoJSON,
  MapContainer,
  Polyline,
  useMapEvents,
} from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import {ISolution} from 'Pages//api/types';

interface IPlace {
  name: string;
  coordinates: LatLngTuple;
}

const places: IPlace[] = [
  {
    name: 'Berlin (Germany)',
    coordinates: [52.520008, 13.404954],
  },
];

interface IProps {
  onClick: (country: string, coordinates: [number, number]) => void;
  solution: ISolution | null;
}

const Map = ({onClick, solution}: IProps) => {
  const [clickedPosition, setClickedPosition] =
    useState<LatLng | null>(null);

  const position: LatLngTuple = [0, 0];

  const g: any = borders;

  const MapEvent = () => {

    const handleClick = () => {
      if (!clickedPosition) {
        return null;
      }

      onClick('Somaliland', [clickedPosition.lat, clickedPosition.lng]);
    }

    useMapEvents({
      click: (e) => {
        setClickedPosition(e.latlng);
        handleClick();
      },
    });

    return null;
  };

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

  return (
    <MapContainer
      center={position}
      zoom={2}
      scrollWheelZoom={false}
      style={{background: '#fff', width: '500px', height: '500px'}}
    >
      <MapEvent/>
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
        <CircleMarker color="red" center={clickedPosition} radius={4}/>
      )}
      {solution && (
        <CircleMarker color="green" center={[solution.lat, solution.lng]} radius={4} />
        )}
      {solution && clickedPosition && (
        <Polyline positions={[[solution.lat, solution.lng], clickedPosition]}/>
      )}
    </MapContainer>
  );
};

export default Map;
