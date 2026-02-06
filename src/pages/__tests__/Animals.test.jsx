import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import { BrowserRouter } from 'react-router-dom';
import animalsReducer from '../../features/animals/animalsSlice';
import cartReducer from '../../features/cart/cartSlice';
import authReducer from '../../features/auth/authSlice';
import Animals from '../Animals';

// Create a mock store
const createMockStore = (initialState = {}) => {
  return configureStore({
    reducer: {
      animals: animalsReducer,
      cart: cartReducer,
      auth: authReducer,
    },
    preloadedState: {
      animals: {
        items: [],
        status: 'idle',
        ...initialState.animals,
      },
      cart: {
        items: [],
        isOpen: false,
        ...initialState.cart,
      },
      auth: {
        user: { role: 'buyer' },
        token: 'test-token',
        status: 'idle',
        error: null,
        ...initialState.auth,
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

describe('Animals Page', () => {
  test('renders page heading', () => {
    renderWithProviders(<Animals />);

    expect(screen.getByRole('heading', { name: /Quality Livestock/i })).toBeInTheDocument();
  });

  test('renders filters section', () => {
    renderWithProviders(<Animals />);

    expect(screen.getByText('Filters')).toBeInTheDocument();
  });

  test('renders Animal Type filter dropdown', () => {
    renderWithProviders(<Animals />);

    expect(screen.getByLabelText(/animal type/i)).toBeInTheDocument();
  });

  test('renders search input', () => {
    renderWithProviders(<Animals />);

    expect(screen.getByPlaceholderText(/search by name, type, or breed/i)).toBeInTheDocument();
  });

  test('renders Clear Filters button', () => {
    renderWithProviders(<Animals />);

    expect(screen.getByRole('button', { name: /clear filters/i })).toBeInTheDocument();
  });

  test('renders mock animal cards', () => {
    renderWithProviders(<Animals />);

    // The component has mock data built in
    expect(screen.getByText('Bessie')).toBeInTheDocument();
    expect(screen.getByText('Billy')).toBeInTheDocument();
  });

  test('search filters animals by name', () => {
    renderWithProviders(<Animals />);

    const searchInput = screen.getByPlaceholderText(/search by name, type, or breed/i);
    fireEvent.change(searchInput, { target: { value: 'Bessie' } });

    expect(screen.getByText('Bessie')).toBeInTheDocument();
    expect(screen.queryByText('Billy')).not.toBeInTheDocument();
  });

  test('clear filters resets search', () => {
    renderWithProviders(<Animals />);

    const searchInput = screen.getByPlaceholderText(/search by name, type, or breed/i);
    fireEvent.change(searchInput, { target: { value: 'Bessie' } });

    // Only Bessie should be visible
    expect(screen.queryByText('Billy')).not.toBeInTheDocument();

    // Click clear filters
    const clearButton = screen.getByRole('button', { name: /clear filters/i });
    fireEvent.click(clearButton);

    // All animals should be visible again
    expect(screen.getByText('Bessie')).toBeInTheDocument();
    expect(screen.getByText('Billy')).toBeInTheDocument();
  });

  test('type filter dropdown filters animals', () => {
    renderWithProviders(<Animals />);

    const typeSelect = screen.getByLabelText(/animal type/i);
    fireEvent.change(typeSelect, { target: { value: 'Cattle' } });

    expect(screen.getByText('Bessie')).toBeInTheDocument();
    expect(screen.queryByText('Billy')).not.toBeInTheDocument();
  });
});
