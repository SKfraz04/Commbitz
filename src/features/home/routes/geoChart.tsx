import React, { useRef } from 'react';
import { Chart } from 'react-google-charts';

interface GeoChartProps {
  coordinates: any;
}

const GeoChart: React.FC<GeoChartProps> = ({ coordinates }) => {
  // Ensure the country code is valid ISO 3166-1 alpha-2 code
  const { name, countryCode } = coordinates
  // const countryCode = country.toUpperCase();

  const geoCh = useRef(null);
  const data = [
    ['Country'],
    [name],
  ];

  const options = {
    backgroundColor: '#1C2B35', // Change this to your desired background color
    // region: countryCode, // Set the region to the specified country code
    defaultColor: '#1ffe9d', // Default color of the countries in the map
    magnifyingGlass: { enable: true, zoomFactor: 100 }, // Set zoom factor
    resolution: 'countries', // Adjust the resolution level
  };

  return (
    <div>
      <Chart
        ref={geoCh}
        chartType="GeoChart"
        width="100%"
        data={data}
        options={options}
      />
    </div>
  );
};

export default GeoChart;
