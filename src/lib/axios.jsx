// import axios from 'axios';

// const api = axios.create({
//   baseURL: 'http://localhost:3000',
// });

// export default api;

// src/lib/api.js
import axios from 'axios';

const api = axios.create({
  baseURL: 'http://127.0.0.1:3000/',
});

api.interceptors.request.use((config) => {
  const adminId = localStorage.getItem('admin_id');
  if (adminId) {
    config.headers['Authorization'] = adminId;
  }
  return config;
});

export default api;
