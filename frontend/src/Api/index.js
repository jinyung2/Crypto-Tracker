import axios from 'axios';
import ctx from '../store/AuthContext';

const baseURL =
  process.env.ENV === 'prod' ? 'https://jinychoi.dev/flask/' : 'http://localhost:5000/';

export const userApi = axios.create({
  baseURL: baseURL,
});

userApi.interceptors.request.use((config) => ({
  ...config,
  headers: {
      bearer: ctx.token
  },
}));

userApi.interceptors.response.use((response) => 
    response,
    async (error) => Promise.reject(error.response)
);

// export const authApi = axios.create({
//   baseURL: baseURL,
// });

// export { userApi, authApi };
