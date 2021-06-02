import { auth } from '../Api/Auth';

jest.mock('../Api/Auth', () => ({
  auth: {
    signin: jest.fn(),
    signup: jest.fn(),
  },
}));

describe('/signin', () => {
  it('should successfully signin', async () => {
    const [email, password] = ['test@test.org', 'password'];
    const returnedToken = { token: 'dummytoken' };
    auth.signin.mockImplementationOnce(() => Promise.resolve(returnedToken));

    await expect(auth.signin(email, password)).resolves.toEqual(returnedToken);
  });

  it('should fail to signin', async () => {
    const [email, password] = ['test@test.org', 'password'];
    const returnedToken = { token: 'dummytoken' };
    auth.signin.mockImplementationOnce(() => Promise.reject(new Error()));

    await expect(auth.signin(email, password)).rejects.toThrow();
  });
});

describe('/signup', () => {
  it('should successfully signup', async () => {
    const [email, password, reEnterPass] = [
      'test@test.org',
      'password',
      'password',
    ];
    const returnedToken = { token: 'dummytoken' };
    auth.signup.mockImplementationOnce(() => Promise.resolve(returnedToken));

    await expect(auth.signup(email, password, reEnterPass)).resolves.toEqual(
      returnedToken
    );
  });

  it('should fail to signup', async () => {
    const [email, password, reEnterPass] = [
      'test@test.org',
      'password',
      'password',
    ];
    const returnedToken = { token: 'dummytoken' };
    auth.signup.mockImplementationOnce(() => Promise.reject(new Error()));

    await expect(auth.signup(email, password, reEnterPass)).rejects.toThrow();
  });
});
