import React, { createContext, useContext, useState } from "react";

// Create a context for health data
const HealthDataContext = createContext();

// Provider component
export const HealthDataProvider = ({ children }) => {
    const [healthData, setHealthData] = useState({
        heartRate: 72,
        steps: 5000,
        bloodPressure: "120/80",
        calories: 1500,
        lastUpdated: "5 mins ago",
    });

    // Function to update specific health data
    const updateHealthData = (key, value) => {
        setHealthData((prevData) => ({ ...prevData, [key]: value }));
    };

    return (
        <HealthDataContext.Provider value={{ healthData, setHealthData }}>
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
