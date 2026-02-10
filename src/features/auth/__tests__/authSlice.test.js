import authReducer, { logout, setCredentials } from '../authSlice';

describe('Auth Slice', () => {
  const initialState = {
    user: null,
    token: null,
    status: 'idle',
    error: null,
  };

  test('should return the initial state', () => {
    expect(authReducer(undefined, { type: 'unknown' })).toEqual({
      user: null,
      token: expect.any(Object),
      status: 'idle',
      error: null,
    });
  });

  test('should handle logout', () => {
    const previousState = {
      user: { id: 1, name: 'John', email: 'john@example.com', role: 'buyer' },
      token: 'some-jwt-token',
      status: 'succeeded',
      error: null,
    };

    const result = authReducer(previousState, logout());

    expect(result.user).toBeNull();
    expect(result.token).toBeNull();
  });

  test('should handle setCredentials', () => {
    const credentials = {
      user: { id: 1, name: 'John', email: 'john@example.com', role: 'buyer' },
      access_token: 'new-jwt-token',
    };

    const result = authReducer(initialState, setCredentials(credentials));

    expect(result.user).toEqual(credentials.user);
    expect(result.token).toBe(credentials.access_token);
  });

  test('setCredentials should store user data correctly', () => {
    const farmerCredentials = {
      user: { id: 2, name: 'Farmer Jane', email: 'jane@farm.com', role: 'farmer' },
      access_token: 'farmer-jwt-token',
    };

    const result = authReducer(initialState, setCredentials(farmerCredentials));

    expect(result.user.role).toBe('farmer');
    expect(result.user.name).toBe('Farmer Jane');
  });

  test('logout should clear all user data', () => {
    const loggedInState = {
      user: { id: 1, name: 'John', email: 'john@example.com', role: 'buyer' },
      token: 'some-jwt-token',
      status: 'succeeded',
      error: null,
    };

    const result = authReducer(loggedInState, logout());

    expect(result).toEqual({
      user: null,
      token: null,
      status: 'succeeded',
      error: null,
    });
  });
});
