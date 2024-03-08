const API_BASE_URL = 'http://localhost:3000';

// Récupère les informations de l'utilisateur
export const getUserInfo = async (userId) => {
    try {
        const response = await fetch(`${API_BASE_URL}/user/${userId}`);
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return await response.json();
    } catch (error) {
        console.error('Error fetching user info:', error);
    }
};

// Récupère l'activité quotidienne de l'utilisateur
export const getUserActivity = async (userId) => {
    try {
        const response = await fetch(`${API_BASE_URL}/user/${userId}/activity`);
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return await response.json();
    } catch (error) {
        console.error('Error fetching user activity:', error);
    }
};

// Récupère les sessions moyennes de l'utilisateur
export const getUserAverageSessions = async (userId) => {
    try {
        const response = await fetch(`${API_BASE_URL}/user/${userId}/average-sessions`);
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return await response.json();
    } catch (error) {
        console.error('Error fetching average sessions:', error);
    }
};

// Récupère les performances de l'utilisateur
export const getUserPerformance = async (userId) => {
    try {
        const response = await fetch(`${API_BASE_URL}/user/${userId}/performance`);
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return await response.json();
    } catch (error) {
        console.error('Error fetching user performance:', error);
    }
};
