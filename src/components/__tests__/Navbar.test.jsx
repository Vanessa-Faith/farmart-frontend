import React from 'react';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import { BrowserRouter } from 'react-router-dom';
import cartReducer from '../../features/cart/cartSlice';
import authReducer from '../../features/auth/authSlice';
import Navbar from '../Navbar';

// Create a mock store
const createMockStore = (initialState = {}) => {
  return configureStore({
    reducer: {
      cart: cartReducer,
      auth: authReducer,
    },
    preloadedState: {
      cart: {
        items: [],
        isOpen: false,
        ...initialState.cart,
      },
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
    test('renders Farmart brand name', () => {
      renderWithProviders(<Navbar />);

      expect(screen.getByText('Farmart')).toBeInTheDocument();
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

    test('does not render Cart button', () => {
      renderWithProviders(<Navbar />);

      expect(screen.queryByText(/cart/i)).not.toBeInTheDocument();
    });

    test('renders Help button', () => {
      renderWithProviders(<Navbar />);

      expect(screen.getByText(/help/i)).toBeInTheDocument();
    });
  });

  describe('when user is logged in as buyer', () => {
    const buyerState = {
      auth: {
        user: { id: 1, name: 'John Buyer', email: 'john@example.com', role: 'buyer' },
        token: 'test-token',
      },
    };

    test('renders user avatar with initial', () => {
      renderWithProviders(<Navbar />, buyerState);

      expect(screen.getByText('j')).toBeInTheDocument();
    });

    test('renders username', () => {
      renderWithProviders(<Navbar />, buyerState);

      expect(screen.getByText('John Buyer')).toBeInTheDocument();
    });

    test('renders Cart button for buyer', () => {
      renderWithProviders(<Navbar />, buyerState);

      expect(screen.getByText(/cart/i)).toBeInTheDocument();
    });

    test('renders Logout button', () => {
      renderWithProviders(<Navbar />, buyerState);

      expect(screen.getByText(/logout/i)).toBeInTheDocument();
    });

    test('does not render Login/Register links', () => {
      renderWithProviders(<Navbar />, buyerState);

      expect(screen.queryByRole('link', { name: /login/i })).not.toBeInTheDocument();
      expect(screen.queryByRole('link', { name: /register/i })).not.toBeInTheDocument();
    });

    test('renders Browse Animals navigation link', () => {
      renderWithProviders(<Navbar />, buyerState);

      expect(screen.getByText(/browse animals/i)).toBeInTheDocument();
    });

    test('renders My Orders navigation link', () => {
      renderWithProviders(<Navbar />, buyerState);

      expect(screen.getByText(/my orders/i)).toBeInTheDocument();
    });

    test('shows cart badge when items in cart', () => {
      renderWithProviders(<Navbar />, {
        ...buyerState,
        cart: {
          items: [{ id: 1, quantity: 3 }],
        },
      });

      expect(screen.getByText('3')).toBeInTheDocument();
    });
  });

  describe('when user is logged in as farmer', () => {
    const farmerState = {
      auth: {
        user: { id: 2, name: 'Jane Farmer', email: 'jane@farm.com', role: 'farmer' },
        token: 'test-token',
      },
    };

    test('renders user avatar for farmer', () => {
      renderWithProviders(<Navbar />, farmerState);

      expect(screen.getByText('j')).toBeInTheDocument();
    });

    test('does NOT render Cart button for farmer', () => {
      renderWithProviders(<Navbar />, farmerState);

      // Farmers don't need a cart
      const cartButtons = screen.queryAllByText(/cart/i);
      const cartButton = cartButtons.find(el => 
        el.closest('button')?.classList.contains('navbar__btn--cart')
      );
      expect(cartButton).toBeUndefined();
    });

    test('renders Dashboard navigation link', () => {
      renderWithProviders(<Navbar />, farmerState);

      expect(screen.getByText(/dashboard/i)).toBeInTheDocument();
    });

    test('renders Orders navigation link', () => {
      renderWithProviders(<Navbar />, farmerState);

      expect(screen.getByText(/orders/i)).toBeInTheDocument();
    });

    test('does NOT render Browse Animals link', () => {
      renderWithProviders(<Navbar />, farmerState);

      expect(screen.queryByText(/browse animals/i)).not.toBeInTheDocument();
    });
  });
});
