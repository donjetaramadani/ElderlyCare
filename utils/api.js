// File: utils/api.js
export const fetchHealthDataFromAPI = async () => {
    try {
        const response = await fetch("https://localhost:7016/api/Homepage/health-metrics");
        if (response.ok) {
            const data = await response.json();
            return data;
        } else {
            console.error("Failed to fetch health metrics. Status:", response.status);
            throw new Error("Failed to fetch health metrics");
        }
    } catch (error) {
        console.error("Error fetching health metrics:", error);
        throw error;
    }
};

