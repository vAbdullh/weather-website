import React, { createContext, useState, useEffect } from 'react';
import { fetchData } from '../service/api';

export const DataContext = createContext();

const DataProvider = ({ children }) => {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [city, setCity] = useState('jeddah');
    const [place_id, setPlace_id] = useState('jeddah');

    useEffect(() => {
        const fetchDataAsync = async () => {
            try {
                const result = await fetchData(place_id);
                setData(result);
            } catch (error) {
                console.error("Error fetching data:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchDataAsync();
    }, [place_id]);

    return (
        <DataContext.Provider value={{ data, loading, city, setCity, setPlace_id }}>
            {children}
        </DataContext.Provider>
    );
};

export default DataProvider;