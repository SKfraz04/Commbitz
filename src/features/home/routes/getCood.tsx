import React, { useState } from 'react';
import axios from 'axios';
import { getCountryCenterCoordinates } from '../../../utils/getGeoCountryName';
import MapComponent from './MapComponent';

interface Coordinates {
  latitude: number;
  longitude: number;
  name: string;
}

const CountryCoordinates: React.FC = () => {
  const [country, setCountry] = useState<string>('');
  const [coordinates, setCoordinates] = useState<Coordinates | null>(null);
  const [error, setError] = useState<string | null>(null);

  const fetchCoordinates = async () => {
    try {
      const response:any = await getCountryCenterCoordinates(country);
      setCoordinates(response);
    } catch (err) {
      setError('An error occurred');
      setCoordinates(null);
    }
  };
  return (
    <div>
      <h1>Get Country Coordinates</h1>
      <input
        type="text"
        value={country}
        onChange={(e) => setCountry(e.target.value)}
        placeholder="Enter country name"
      />
      <button onClick={fetchCoordinates}>Get Coordinates</button>
      {coordinates && (
        <div>
          <MapComponent latitude={coordinates.latitude} longitude={coordinates.longitude} name={coordinates.name} />
        </div>
      )}
      {error && <p>{error}</p>}
    </div>
  );
};

export default CountryCoordinates;
