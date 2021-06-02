import axios from 'axios';

const baseURL =
  process.env.REACT_APP_ENV === 'prod' ? 'https://jinychoi.dev/flask/' : 'http://localhost:5000/';


console.log('process.env.ENV:', process.env);
console.log('baseURL:', baseURL);

export const userApi = axios.create({
  baseURL: baseURL,
});

userApi.interceptors.request.use((config) => ({
  ...config,
  headers: {
      bearer: localStorage.getItem('token')
  },
}));

userApi.interceptors.response.use((response) => 
    response,
    async (error) => Promise.reject(error.response)
);

export const authApi = axios.create({
  baseURL: baseURL,
});

authApi.interceptors.request.use((config) => ({
    ...config
}));

userApi.interceptors.response.use((response) => 
    response,
    async (error) => Promise.reject(error.response)
);

// export { userApi, authApi };
