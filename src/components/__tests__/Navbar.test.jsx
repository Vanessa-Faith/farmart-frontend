import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import { BrowserRouter } from 'react-router-dom';
import authReducer from '../../features/auth/authSlice';
import Navbar from '../Navbar';

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

describe('Navbar Component', () => {
  describe('when user is not logged in', () => {
    test('renders FarMart brand name', () => {
      renderWithProviders(<Navbar />);

      expect(screen.getByText(/FarMart/i)).toBeInTheDocument();
    });

    test('renders Login link', () => {
      renderWithProviders(<Navbar />);

      expect(screen.getByRole('link', { name: /login/i })).toBeInTheDocument();
    });

    test('renders Register link', () => {
      renderWithProviders(<Navbar />);

      expect(screen.getByRole('link', { name: /register/i })).toBeInTheDocument();
    });

    test('does not render Logout button', () => {
      renderWithProviders(<Navbar />);

      expect(screen.queryByRole('button', { name: /logout/i })).not.toBeInTheDocument();
    });

    test('renders Home link', () => {
      renderWithProviders(<Navbar />);

      const homeLinks = screen.getAllByRole('link', { name: /home/i });
      expect(homeLinks.length).toBeGreaterThan(0);
    });

    test('renders Animals link', () => {
      renderWithProviders(<Navbar />);

      const animalLinks = screen.getAllByRole('link', { name: /animals/i });
      expect(animalLinks.length).toBeGreaterThan(0);
    });
  });

  describe('when user is logged in as buyer', () => {
    const buyerState = {
      auth: {
        user: { id: 1, name: 'John Buyer', email: 'john@example.com', role: 'buyer' },
        token: 'test-token',
      },
    };

    test('renders greeting with user name', () => {
      renderWithProviders(<Navbar />, buyerState);

      expect(screen.getByText(/Hi, John Buyer/i)).toBeInTheDocument();
    });

    test('renders Logout button', () => {
      renderWithProviders(<Navbar />, buyerState);

      expect(screen.getByRole('button', { name: /logout/i })).toBeInTheDocument();
    });

    test('does not render Login/Register links', () => {
      renderWithProviders(<Navbar />, buyerState);

      expect(screen.queryByRole('link', { name: /^login$/i })).not.toBeInTheDocument();
      expect(screen.queryByRole('link', { name: /^register$/i })).not.toBeInTheDocument();
    });

    test('does not render Dashboard link for buyer', () => {
      renderWithProviders(<Navbar />, buyerState);

      expect(screen.queryByRole('link', { name: /dashboard/i })).not.toBeInTheDocument();
    });
  });

  describe('when user is logged in as farmer', () => {
    const farmerState = {
      auth: {
        user: { id: 2, name: 'Jane Farmer', email: 'jane@farm.com', role: 'farmer' },
        token: 'test-token',
      },
    };

    test('renders greeting with farmer name', () => {
      renderWithProviders(<Navbar />, farmerState);

      expect(screen.getByText(/Hi, Jane Farmer/i)).toBeInTheDocument();
    });

    test('renders Dashboard navigation link for farmer', () => {
      renderWithProviders(<Navbar />, farmerState);

      expect(screen.getByRole('link', { name: /dashboard/i })).toBeInTheDocument();
    });

    test('renders Logout button', () => {
      renderWithProviders(<Navbar />, farmerState);

      expect(screen.getByRole('button', { name: /logout/i })).toBeInTheDocument();
    });
  });
});
