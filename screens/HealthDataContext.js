import React, { createContext, useContext, useState, useEffect } from "react";

// Create a context for health data
const HealthDataContext = createContext();

// Provider component
export const HealthDataProvider = ({ children }) => {
    const [healthData, setHealthData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Function to fetch health data from API
    const fetchHealthData = async () => {
        try {
            const response = await fetch('http://192.168.0.42:5196/api/Homepage/health-metrics');
            if (!response.ok) throw new Error("Failed to fetch data");
            const data = await response.json();
            console.log(data);
            setHealthData(data); // Set fetched data
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    // Fetch health data when the provider is mounted
    useEffect(() => {
        fetchHealthData();
    }, []);


    // Function to update specific health data
    const updateHealthData = async (key, value) => {
        try {
            const updatedData = { ...healthData, [key]: value };
            setHealthData(updatedData);

            // Send the updated data to the backend
            const response = await fetch(`http://192.168.0.42:5196/api/Homepage/health-metrics`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(updatedData),
            });

            if (!response.ok) throw new Error("Failed to update data");
        } catch (err) {
            setError(err.message);
        }
    };




    

    return (
        <HealthDataContext.Provider value={{ healthData, setHealthData, updateHealthData, loading, error }}>
            {children}
        </HealthDataContext.Provider>
    );
};

// Custom hook for consuming the context
export const useHealthData = () => {
    const context = useContext(HealthDataContext);
    if (!context) {
        throw new Error("useHealthData must be used within a HealthDataProvider");
    }
    return context;
};
