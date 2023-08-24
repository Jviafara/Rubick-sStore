import axios from 'axios';
import queryString from 'query-string';

const baseURL = 'https://rubikstore.onrender.com/api/v1/';

const privateClientFiles = axios.create({
    baseURL,
    paramsSerializer: { encode: (params) => queryString.stringify(params) },
});

privateClientFiles.interceptors.request.use(async (config) => {
    return {
        ...config,
        headers: {
            'Content-Type': 'multipart/form-data',
            Authorization: `Bearer ${localStorage.getItem('actkn')}`,
        },
    };
});

privateClientFiles.interceptors.response.use(
    (response) => {
        if (response && response.data) return response.data;
        return response;
    },
    (err) => {
        throw err.response.data;
    }
);

export default privateClientFiles;
