import { authApi } from '.';

export const auth = {
  signin: (email, password) =>
    authApi.post(`/signin`, { email: email, password: password }),
  signup: (email, password, reEnterPass) =>
    authApi.post(`/signup`, {
      email: email,
      password: password,
      reEnterPass: reEnterPass,
    })
};
