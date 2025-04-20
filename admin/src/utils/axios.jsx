import axios from 'axios';

const instance = axios.create({
    baseURL: 'http://localhost:8000/api', // Update with your Laravel backend URL
});

// Request interceptor
instance.interceptors.request.use((config) => {
    const token = localStorage.getItem('adminToken');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
}, (error) => {
    return Promise.reject(error);
});

// Response interceptor
instance.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response && error.response.status === 401) {
            // Handle token expiration or unauthorized access
            localStorage.removeItem('adminToken');
            window.location.href = '/auth/login';
        }
        return Promise.reject(error);
    }
);

export default instance;