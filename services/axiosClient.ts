import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';

export const axiosClient = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL,
});
axiosClient.interceptors.request.use((config: AxiosRequestConfig) => {
    if (config.headers) {
        const token = localStorage.getItem('token');
        config.headers['Authorization'] = token ? `Bearer ${token}` : '';
    }
    return config;
});

axiosClient.interceptors.response.use(
    (response: AxiosResponse) => response,
    (error) => Promise.reject(error.response && error.response.data)
);

export const mockAxiosClient = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL,
});
