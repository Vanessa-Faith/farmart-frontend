import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import { BrowserRouter } from 'react-router-dom';
import authReducer from '../authSlice';
import Login from '../Login';

// Create a mock store
const createMockStore = (initialState = {}) => {
  return configureStore({
    reducer: {
      auth: authReducer,
    },
    preloadedState: {
      auth: {
        user: null,
        token: null,
        status: 'idle',
        error: null,
        ...initialState,
      },
    },
  });
};

// Wrapper component with providers
const renderWithProviders = (component, initialState = {}) => {
  const store = createMockStore(initialState);
  return {
    ...render(
      <Provider store={store}>
        <BrowserRouter>{component}</BrowserRouter>
      </Provider>
    ),
    store,
  };
};

describe('Login Component', () => {
  test('renders login form with email and password fields', () => {
    renderWithProviders(<Login />);

    expect(screen.getByPlaceholderText('your@email.com')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('••••••••')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /login/i })).toBeInTheDocument();
  });

  test('renders login heading', () => {
    renderWithProviders(<Login />);

    expect(screen.getByRole('heading', { name: /welcome back/i })).toBeInTheDocument();
  });

  test('allows user to type in email field', () => {
    renderWithProviders(<Login />);

    const emailInput = screen.getByPlaceholderText('your@email.com');
    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });

    expect(emailInput.value).toBe('test@example.com');
  });

  test('allows user to type in password field', () => {
    renderWithProviders(<Login />);

    const passwordInput = screen.getByPlaceholderText('••••••••');
    fireEvent.change(passwordInput, { target: { value: 'password123' } });

    expect(passwordInput.value).toBe('password123');
  });

  test('email field has correct type attribute', () => {
    renderWithProviders(<Login />);

    const emailInput = screen.getByPlaceholderText('your@email.com');
    expect(emailInput).toHaveAttribute('type', 'email');
  });

  test('password field has correct type attribute', () => {
    renderWithProviders(<Login />);

    const passwordInput = screen.getByPlaceholderText('••••••••');
    expect(passwordInput).toHaveAttribute('type', 'password');
  });

  test('both fields are required', () => {
    renderWithProviders(<Login />);

    const emailInput = screen.getByPlaceholderText('your@email.com');
    const passwordInput = screen.getByPlaceholderText('••••••••');

    expect(emailInput).toBeRequired();
    expect(passwordInput).toBeRequired();
  });

  test('shows loading state when status is loading', () => {
    renderWithProviders(<Login />, { status: 'loading' });

    expect(screen.getByRole('button', { name: /logging in/i })).toBeInTheDocument();
  });

  test('displays error message when login fails', () => {
    renderWithProviders(<Login />, { error: 'Invalid credentials' });

    expect(screen.getByText(/invalid credentials/i)).toBeInTheDocument();
  });

  test('login button is disabled during loading', () => {
    renderWithProviders(<Login />, { status: 'loading' });

    const loginButton = screen.getByRole('button', { name: /logging in/i });
    expect(loginButton).toBeDisabled();
  });

  test('renders role selection with buyer and farmer options', () => {
    renderWithProviders(<Login />);

    expect(screen.getByText('Buyer')).toBeInTheDocument();
    expect(screen.getByText('Farmer')).toBeInTheDocument();
  });
});
