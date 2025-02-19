// src/geocode.js
import axios from 'axios';

const API_KEY = '10415cc4bba44bfb84da14bde2139825';

export const getCountryName = async (latitude: any, longitude: any) => {
  try {
    const response = await axios.get(`https://api.opencagedata.com/geocode/v1/json?q=${latitude}+${longitude}&key=${API_KEY}`);
    const results = response.data.results;
    if (results && results.length > 0) {
      const country = results[0].components.country;
      return country;
    }
    return null;
  } catch (error) {
    console.error('Error fetching the country name:', error);
    return null;
  }
};

interface CountryData {
  latitude: string;
  longitude: string;
  name: string;
  countryCode: string;
}

export const getCountryCenterCoordinates = async (country: string): Promise<CountryData | string> => {
  try {
    const countryData: CountryData = { latitude: "", longitude: "", name: country.toUpperCase(), countryCode : "" };
    
    const response = await axios.get('https://api.opencagedata.com/geocode/v1/json', {
      params: {
        q: country,
        key: '10415cc4bba44bfb84da14bde2139825', // Replace with your OpenCage API key
      },
    });
    if (response.data.results.length > 0) {
      const { lat, lng } =  response.data.results[0].geometry;
      return { ...countryData, latitude: lat.toString(), longitude: lng.toString(), countryCode : (response.data?.results[0]?.components?.country_code).toUpperCase() };
    } else {
      return 'No results found';
    }
  } catch (err) {
    return 'An error occurred';
  }
};
