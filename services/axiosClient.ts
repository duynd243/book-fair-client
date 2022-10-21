import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';

const getAxiosClient = (accessToken?: string): AxiosInstance => {
    const axiosClient = axios.create({
        baseURL: process.env.NEXT_PUBLIC_API_URL,
    });
    axiosClient.interceptors.request.use((config: AxiosRequestConfig) => {
        if (config.headers && accessToken) {
            config.headers.Authorization = `Bearer ${accessToken}`;
        }
        return config;
    });

    axiosClient.interceptors.response.use(
        (response: AxiosResponse) => response,
        (error) => Promise.reject(error.response && error.response.data)
    );

    return axiosClient;
};

export default getAxiosClient;
