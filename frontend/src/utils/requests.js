import axios from 'axios';

const BASE_URL = 'http://localhost:8000/api';
// axios.defaults.headers.common['Authorization'] =`Bearer ${localStorage.getItem('accessToken')}`;
axios.defaults.headers.common['Content-Type'] = 'application/json';

const api = axios.create({
    baseURL: BASE_URL,
});

export default api;