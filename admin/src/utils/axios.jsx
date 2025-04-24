import axios from 'axios';

const instance = axios.create({
    baseURL: 'http://localhost:8000/api', // Update with your Laravel backend URL
    withCredentials: true,
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'X-Requested-With': 'XMLHttpRequest'
    }
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
        if (error.response) {
            if (error.response.status === 401) {
                // Handle token expiration or unauthorized access
                localStorage.removeItem('adminToken');
                window.location.href = '/auth/login';
            } else if (error.response.status === 419) {
                // Handle CSRF token mismatch
                window.location.reload();
            }
        }
        return Promise.reject(error);
    }
);

export default instance;