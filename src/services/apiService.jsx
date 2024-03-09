import { USER_MAIN_DATA, USER_ACTIVITY, USER_AVERAGE_SESSIONS, USER_PERFORMANCE } from '../MockStore/mock.js';

const API_BASE_URL = 'http://localhost:3000';
const useMockData = false; // Set to false to use the API

/**
 * Fetch user information from API or mock data
 * @param {number} userId - The ID of the user
 * @returns {Promise<Map>} - A promise that resolves to a Map of user information
 */
export const getUserInfo = async (userId) => {
    if (useMockData) {
        const data = USER_MAIN_DATA.find(user => user.id === userId);
        console.warn("UseMockData is true, using mock data for UserInfo.")
        return new Map(Object.entries({
            id: data.id,
            userInfos: data.userInfos,
            keyData: data.keyData,
            userScore: data.todayScore || data.score,
        }));
    } else {
        try {
            const response = await fetch(`${API_BASE_URL}/user/${userId}`);
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const data = await response.json();
            return new Map(Object.entries({
                id: data.data.id,
                userInfos: data.data.userInfos,
                keyData: data.data.keyData,
                userScore: data.data.todayScore || data.data.score,
            }));
        } catch (error) {
            console.error('Error fetching user info:', error);
        }
    }
};

/**
 * Fetch user activity from API or mock data
 * @param {number} userId - The ID of the user
 * @returns {Promise<Map>} - A promise that resolves to a Map of user activity
 */
export const getUserActivity = async (userId) => {
    if (useMockData) {
        const data = USER_ACTIVITY.find(user => user.userId === userId);
        console.warn("UseMockData is true, using mock data for UserActivity.")
        return new Map(Object.entries({
            sessions: data.sessions,
        }));
    } else {
        try {
            const response = await fetch(`${API_BASE_URL}/user/${userId}/activity`);
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const data = await response.json();
            return new Map(Object.entries({
                sessions: data.data.sessions,
            }));
        } catch (error) {
            console.error('Error fetching user activity:', error);
        }
    }
};

/**
 * Fetch user average sessions from API or mock data
 * @param {number} userId - The ID of the user
 * @returns {Promise<Map>} - A promise that resolves to a Map of user average sessions
 */
export const getUserAverageSessions = async (userId) => {
    if (useMockData) {
        const data = USER_AVERAGE_SESSIONS.find(user => user.userId === userId);
        console.warn("UseMockData is true, using mock data for UserAverageSessions.")
        return new Map(Object.entries({
            averageSessions: data.sessions,
        }));
    } else {
        try {
            const response = await fetch(`${API_BASE_URL}/user/${userId}/average-sessions`);
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const data = await response.json();
            return new Map(Object.entries({
                averageSessions: data.data.sessions,
            }));
        } catch (error) {
            console.error('Error fetching average sessions:', error);
        }
    }
};

/**
 * Fetch user performance from API or mock data
 * @param {number} userId - The ID of the user
 * @returns {Promise<Map>} - A promise that resolves to a Map of user performance
 */
export const getUserPerformance = async (userId) => {
    if (useMockData) {
        const data = USER_PERFORMANCE.find(user => user.userId === userId);
        console.warn("UseMockData is true, using mock data for userPerformance.")
        return new Map(Object.entries({
            kind: data.kind,
            kindValue: data.data,
        }));
    } else {
        try {
            const response = await fetch(`${API_BASE_URL}/user/${userId}/performance`);
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const data = await response.json();
            return new Map(Object.entries({
                kind: data.data.kind,
                kindValue: data.data.data,
            }));
        } catch (error) {
            console.error('Error fetching user performance:', error);
        }
    }
};