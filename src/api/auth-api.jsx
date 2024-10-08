import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL;

export const signin = async (credentials) => {
  try {
    const response = await axios.post(`${API_URL}/auth/signin`, credentials);
    return response.data;
  } catch (error) {
    return { error: error.response.data.message || 'Sign in failed' };
  }
};

export const signout = async () => {
  try {
    const response = await axios.get(`${API_URL}/auth/signout`);
    return response.data;
  } catch (error) {
    return { error: error.response.data.message || 'Sign out failed' };
  }
};

export const signup = async (userData) => {
  try {
    const response = await axios.post(`${API_URL}/auth/signup`, userData);
    return response.data;
  } catch (error) {
    return { error: error.response.data.message || 'Sign up failed' };
  }
};

export const getUsers = async () => {
  try {
    const response = await axios.get(`${API_URL}/users`);
    return response.data;
  } catch (error) {
    return { error: error.response.data.message || 'Failed to fetch users' };
  }
};
