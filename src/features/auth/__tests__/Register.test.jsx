import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import { BrowserRouter } from 'react-router-dom';
import authReducer from '../authSlice';
import Register from '../Register';

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

describe('Register Component', () => {
  test('renders registration form with all required fields', () => {
    renderWithProviders(<Register />);

    expect(screen.getByPlaceholderText('John Doe')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('your@email.com')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('••••••••')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /register/i })).toBeInTheDocument();
  });

  test('renders register heading', () => {
    renderWithProviders(<Register />);

    expect(screen.getByRole('heading', { name: /create account/i })).toBeInTheDocument();
  });

  test('renders role selection buttons', () => {
    renderWithProviders(<Register />);

    expect(screen.getByText('Buyer')).toBeInTheDocument();
    expect(screen.getByText('Farmer')).toBeInTheDocument();
  });

  test('default role is buyer', () => {
    renderWithProviders(<Register />);

    const buyerButton = screen.getByText('Buyer').closest('button');
    expect(buyerButton).toHaveClass('role-card--active');
  });

  test('allows user to change role to farmer', () => {
    renderWithProviders(<Register />);

    const farmerButton = screen.getByText('Farmer').closest('button');
    fireEvent.click(farmerButton);

    expect(farmerButton).toHaveClass('role-card--active');
  });

  test('allows user to type in name field', () => {
    renderWithProviders(<Register />);

    const nameInput = screen.getByPlaceholderText('John Doe');
    fireEvent.change(nameInput, { target: { value: 'Jane Smith' } });

    expect(nameInput.value).toBe('Jane Smith');
  });

  test('allows user to type in email field', () => {
    renderWithProviders(<Register />);

    const emailInput = screen.getByPlaceholderText('your@email.com');
    fireEvent.change(emailInput, { target: { value: 'john@example.com' } });

    expect(emailInput.value).toBe('john@example.com');
  });

  test('allows user to type in password field', () => {
    renderWithProviders(<Register />);

    const passwordInput = screen.getByPlaceholderText('••••••••');
    fireEvent.change(passwordInput, { target: { value: 'securepassword123' } });

    expect(passwordInput.value).toBe('securepassword123');
  });

  test('all required fields have required attribute', () => {
    renderWithProviders(<Register />);

    const nameInput = screen.getByPlaceholderText('John Doe');
    const emailInput = screen.getByPlaceholderText('your@email.com');
    const passwordInput = screen.getByPlaceholderText('••••••••');

    expect(nameInput).toBeRequired();
    expect(emailInput).toBeRequired();
    expect(passwordInput).toBeRequired();
  });

  test('shows loading state when status is loading', () => {
    renderWithProviders(<Register />, { status: 'loading' });

    expect(screen.getByRole('button', { name: /creating/i })).toBeInTheDocument();
  });

  test('displays error message when registration fails', () => {
    renderWithProviders(<Register />, { error: 'Email already exists' });

    expect(screen.getByText(/email already exists/i)).toBeInTheDocument();
  });

  test('register button is disabled during loading', () => {
    renderWithProviders(<Register />, { status: 'loading' });

    const registerButton = screen.getByRole('button', { name: /creating/i });
    expect(registerButton).toBeDisabled();
  });
});
