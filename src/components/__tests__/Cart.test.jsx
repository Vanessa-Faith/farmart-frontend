import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import { BrowserRouter } from 'react-router-dom';
import cartReducer from '../../features/cart/cartSlice';
import authReducer from '../../features/auth/authSlice';
import Cart from '../Cart';

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
        isOpen: true,
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

describe('Cart Component', () => {
  const mockCartItem = {
    id: 1,
    name: 'Bessie',
    animal_type: 'Cattle',
    breed: 'Holstein',
    price: 2500,
    quantity: 1,
    image: 'https://example.com/cow.jpg',
  };

  const mockCartItem2 = {
    id: 2,
    name: 'Billy',
    animal_type: 'Goat',
    breed: 'Boer',
    price: 450,
    quantity: 2,
    image: 'https://example.com/goat.jpg',
  };

  test('renders nothing when cart is closed', () => {
    renderWithProviders(<Cart />, { cart: { isOpen: false } });

    expect(screen.queryByText('Shopping Cart')).not.toBeInTheDocument();
  });

  test('renders cart header when open', () => {
    renderWithProviders(<Cart />, { cart: { isOpen: true } });

    expect(screen.getByText('Shopping Cart')).toBeInTheDocument();
  });

  test('renders close button', () => {
    renderWithProviders(<Cart />, { cart: { isOpen: true } });

    // Close button should be present (X icon)
    const closeButton = screen.getByRole('button', { name: '' });
    expect(closeButton).toBeInTheDocument();
  });

  test('renders empty cart message when no items', () => {
    renderWithProviders(<Cart />, { cart: { isOpen: true, items: [] } });

    expect(screen.getByText(/your cart is empty/i)).toBeInTheDocument();
  });

  test('renders cart items', () => {
    renderWithProviders(<Cart />, {
      cart: { isOpen: true, items: [mockCartItem] },
    });

    expect(screen.getByText('Bessie')).toBeInTheDocument();
    expect(screen.getByText(/Cattle.*Holstein/)).toBeInTheDocument();
  });

  test('renders correct total for single item', () => {
    renderWithProviders(<Cart />, {
      cart: { isOpen: true, items: [mockCartItem] },
    });

    // Check total amount is displayed (use getAllByText since price appears multiple times)
    const totals = screen.getAllByText('$2,500');
    expect(totals.length).toBeGreaterThan(0);
  });

  test('renders correct total for multiple items', () => {
    renderWithProviders(<Cart />, {
      cart: { isOpen: true, items: [mockCartItem, mockCartItem2] },
    });

    // Total: 2500 + (450 * 2) = 3400
    expect(screen.getByText('$3,400')).toBeInTheDocument();
  });

  test('renders quantity controls', () => {
    renderWithProviders(<Cart />, {
      cart: { isOpen: true, items: [mockCartItem] },
    });

    // Should have - and + buttons
    const buttons = screen.getAllByRole('button');
    expect(buttons.length).toBeGreaterThanOrEqual(3); // -, +, close, checkout
  });

  test('renders Proceed to Checkout button', () => {
    renderWithProviders(<Cart />, {
      cart: { isOpen: true, items: [mockCartItem] },
    });

    expect(screen.getByRole('button', { name: /proceed to checkout/i })).toBeInTheDocument();
  });

  test('checkout button is disabled when cart is empty', () => {
    renderWithProviders(<Cart />, {
      cart: { isOpen: true, items: [] },
    });

    const checkoutButton = screen.getByRole('button', { name: /proceed to checkout/i });
    expect(checkoutButton).toBeDisabled();
  });

  test('checkout button is enabled when cart has items', () => {
    renderWithProviders(<Cart />, {
      cart: { isOpen: true, items: [mockCartItem] },
    });

    const checkoutButton = screen.getByRole('button', { name: /proceed to checkout/i });
    expect(checkoutButton).not.toBeDisabled();
  });

  test('displays item quantity', () => {
    renderWithProviders(<Cart />, {
      cart: { isOpen: true, items: [{ ...mockCartItem, quantity: 3 }] },
    });

    expect(screen.getByText('3')).toBeInTheDocument();
  });

  test('displays price per item', () => {
    renderWithProviders(<Cart />, {
      cart: { isOpen: true, items: [mockCartItem] },
    });

    expect(screen.getByText(/\$2,?500 each/i)).toBeInTheDocument();
  });
});
