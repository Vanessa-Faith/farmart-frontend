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
  const mockAnimals = [
    {
      id: 1,
      name: 'Bessie',
      animal_type: 'Cattle',
      breed: 'Holstein',
      age: 24,
      weight: 1400,
      price: 2500,
      health_status: 'Vaccinated',
      description: 'High-quality dairy cow',
      image: 'https://example.com/cow.jpg',
    },
    {
      id: 2,
      name: 'Billy',
      animal_type: 'Goat',
      breed: 'Boer',
      age: 18,
      weight: 180,
      price: 450,
      health_status: 'Healthy',
      description: 'Strong breeding goat',
      image: 'https://example.com/goat.jpg',
    },
    {
      id: 3,
      name: 'Woolly',
      animal_type: 'Sheep',
      breed: 'Merino',
      age: 12,
      weight: 150,
      price: 350,
      health_status: 'Recently sheared',
      description: 'Premium wool sheep',
      image: 'https://example.com/sheep.jpg',
    },
  ];

  test('renders hero section', () => {
    renderWithProviders(<Animals />);

    expect(screen.getByText(/Quality Livestock, Straight from the Farm/i)).toBeInTheDocument();
  });

  test('renders filters sidebar', () => {
    renderWithProviders(<Animals />);

    expect(screen.getByText('Filters')).toBeInTheDocument();
  });

  test('renders Animal Type filter dropdown', () => {
    renderWithProviders(<Animals />);

    expect(screen.getByLabelText(/animal type/i)).toBeInTheDocument();
  });

  test('renders Breed filter dropdown', () => {
    renderWithProviders(<Animals />);

    expect(screen.getByLabelText(/breed/i)).toBeInTheDocument();
  });

  test('renders Age Range filter inputs', () => {
    renderWithProviders(<Animals />);

    expect(screen.getByText(/age range/i)).toBeInTheDocument();
  });

  test('renders search bar', () => {
    renderWithProviders(<Animals />);

    expect(screen.getByPlaceholderText(/search by name, type, or breed/i)).toBeInTheDocument();
  });

  test('renders Clear Filters button', () => {
    renderWithProviders(<Animals />);

    expect(screen.getByRole('button', { name: /clear filters/i })).toBeInTheDocument();
  });

  test('displays animal count', () => {
    renderWithProviders(<Animals />, {
      animals: { items: mockAnimals },
    });

    // Should show "X animals found"
    expect(screen.getByText(/animals found/i)).toBeInTheDocument();
  });

  test('renders animal cards', () => {
    renderWithProviders(<Animals />, {
      animals: { items: mockAnimals },
    });

    expect(screen.getByText('Bessie')).toBeInTheDocument();
    expect(screen.getByText('Billy')).toBeInTheDocument();
    expect(screen.getByText('Woolly')).toBeInTheDocument();
  });

  test('search filters animals by name', () => {
    renderWithProviders(<Animals />, {
      animals: { items: mockAnimals },
    });

    const searchInput = screen.getByPlaceholderText(/search by name, type, or breed/i);
    fireEvent.change(searchInput, { target: { value: 'Bessie' } });

    expect(screen.getByText('Bessie')).toBeInTheDocument();
    expect(screen.queryByText('Billy')).not.toBeInTheDocument();
    expect(screen.queryByText('Woolly')).not.toBeInTheDocument();
  });

  test('search filters animals by type', () => {
    renderWithProviders(<Animals />, {
      animals: { items: mockAnimals },
    });

    const searchInput = screen.getByPlaceholderText(/search by name, type, or breed/i);
    fireEvent.change(searchInput, { target: { value: 'Goat' } });

    expect(screen.getByText('Billy')).toBeInTheDocument();
    expect(screen.queryByText('Bessie')).not.toBeInTheDocument();
  });

  test('search filters animals by breed', () => {
    renderWithProviders(<Animals />, {
      animals: { items: mockAnimals },
    });

    const searchInput = screen.getByPlaceholderText(/search by name, type, or breed/i);
    fireEvent.change(searchInput, { target: { value: 'Merino' } });

    expect(screen.getByText('Woolly')).toBeInTheDocument();
    expect(screen.queryByText('Bessie')).not.toBeInTheDocument();
  });

  test('clear filters resets search', () => {
    renderWithProviders(<Animals />, {
      animals: { items: mockAnimals },
    });

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
    expect(screen.getByText('Woolly')).toBeInTheDocument();
  });

  test('shows no results message when no animals match filter', () => {
    renderWithProviders(<Animals />, {
      animals: { items: mockAnimals },
    });

    const searchInput = screen.getByPlaceholderText(/search by name, type, or breed/i);
    fireEvent.change(searchInput, { target: { value: 'NonExistentAnimal' } });

    expect(screen.getByText(/no animals match your filters/i)).toBeInTheDocument();
  });

  test('type filter dropdown filters animals', () => {
    renderWithProviders(<Animals />, {
      animals: { items: mockAnimals },
    });

    const typeSelect = screen.getByLabelText(/animal type/i);
    fireEvent.change(typeSelect, { target: { value: 'Cattle' } });

    expect(screen.getByText('Bessie')).toBeInTheDocument();
    expect(screen.queryByText('Billy')).not.toBeInTheDocument();
    expect(screen.queryByText('Woolly')).not.toBeInTheDocument();
  });
});
