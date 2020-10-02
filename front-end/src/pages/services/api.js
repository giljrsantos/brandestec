import axios from 'axios';

const api = axios.create({
    baseURL: 'http://192.168.1.105:3003/sistema'
});

export default api;