// src/services/authService.js

import axios from 'axios';

const API_URL = 'http://localhost:5000/api/auth'; // Adjust the base URL as needed

const register = async (name, email, password) => {
  // const response = await axios.post(`${API_URL}/register`, { name, email, password });
  return true;
};

const login = async (email, password) => {
  // const response = await axios.post(`${API_URL}/login`, { email, password });
  return true;
};

export default { register, login };
