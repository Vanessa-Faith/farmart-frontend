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

    expect(screen.getByPlaceholderText(/full name/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/email/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/password/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /register/i })).toBeInTheDocument();
  });

  test('renders register heading', () => {
    renderWithProviders(<Register />);

    expect(screen.getByRole('heading', { name: /register/i })).toBeInTheDocument();
  });

  test('renders role selection dropdown', () => {
    renderWithProviders(<Register />);

    const roleSelect = screen.getByRole('combobox');
    expect(roleSelect).toBeInTheDocument();
  });

  test('role dropdown has buyer and farmer options', () => {
    renderWithProviders(<Register />);

    const roleSelect = screen.getByRole('combobox');
    const options = roleSelect.querySelectorAll('option');

    expect(options.length).toBe(2);
    expect(screen.getByRole('option', { name: /buyer/i })).toBeInTheDocument();
    expect(screen.getByRole('option', { name: /farmer/i })).toBeInTheDocument();
  });

  test('default role is buyer', () => {
    renderWithProviders(<Register />);

    const roleSelect = screen.getByRole('combobox');
    expect(roleSelect.value).toBe('buyer');
  });

  test('allows user to change role to farmer', () => {
    renderWithProviders(<Register />);

    const roleSelect = screen.getByRole('combobox');
    fireEvent.change(roleSelect, { target: { value: 'farmer' } });

    expect(roleSelect.value).toBe('farmer');
  });

  test('allows user to type in name field', () => {
    renderWithProviders(<Register />);

    const nameInput = screen.getByPlaceholderText(/full name/i);
    fireEvent.change(nameInput, { target: { value: 'John Doe' } });

    expect(nameInput.value).toBe('John Doe');
  });

  test('allows user to type in email field', () => {
    renderWithProviders(<Register />);

    const emailInput = screen.getByPlaceholderText(/email/i);
    fireEvent.change(emailInput, { target: { value: 'john@example.com' } });

    expect(emailInput.value).toBe('john@example.com');
  });

  test('allows user to type in password field', () => {
    renderWithProviders(<Register />);

    const passwordInput = screen.getByPlaceholderText(/password/i);
    fireEvent.change(passwordInput, { target: { value: 'securepassword123' } });

    expect(passwordInput.value).toBe('securepassword123');
  });

  test('all required fields have required attribute', () => {
    renderWithProviders(<Register />);

    const nameInput = screen.getByPlaceholderText(/full name/i);
    const emailInput = screen.getByPlaceholderText(/email/i);
    const passwordInput = screen.getByPlaceholderText(/password/i);

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
