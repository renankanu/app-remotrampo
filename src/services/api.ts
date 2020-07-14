import axios from 'axios';

const api = axios.create({
  baseURL: 'https://remotive.io/api/remote-jobs',
});

export default api;
