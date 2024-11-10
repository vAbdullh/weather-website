import axios from 'axios';

const REACT_APP_BACKEND_URL = process.env.REACT_APP_BACKEND_URL;

export const health = async () => {
    try {
        const response = await axios.get(REACT_APP_BACKEND_URL);
        return response.data;
    } catch (error) {
        console.error('Error fetching data:', error);
        throw error;
    }
};
export const fetchData = async (city) => {
    try {
        const response = await axios.get(`${REACT_APP_BACKEND_URL}/weather/${city}`);
        return response.data;
    } catch (error) {
        console.error('Error fetching data:', error.message);
        throw error;
    }
};
export const searchCity = async (target) => {

    try {
        const response = await axios.get(`${REACT_APP_BACKEND_URL}/search/${target}`);
        return response.data;
    } catch (error) {
        console.error('Error fetching data:', error.message);
        throw error;
    }
};