/**
 * Base URL for the API
 * @type {string}
 */
const API_BASE_URL = 'http://localhost:3000';

/**
 * Fetches the user's information from the API
 * @param {number} userId - The ID of the user
 * @returns {Promise<object>} The user's information
 * @throws Will throw an error if the network response is not ok
 */
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

/**
 * Fetches the user's daily activity from the API
 * @param {number} userId - The ID of the user
 * @returns {Promise<object>} The user's daily activity
 * @throws Will throw an error if the network response is not ok
 */
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

/**
 * Fetches the user's average sessions from the API
 * @param {number} userId - The ID of the user
 * @returns {Promise<object>} The user's average sessions
 * @throws Will throw an error if the network response is not ok
 */
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

/**
 * Fetches the user's performance from the API
 * @param {number} userId - The ID of the user
 * @returns {Promise<object>} The user's performance
 * @throws Will throw an error if the network response is not ok
 */
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
