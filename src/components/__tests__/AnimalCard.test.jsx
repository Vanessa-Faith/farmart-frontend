import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import cartReducer from '../../features/cart/cartSlice';
import AnimalCard from '../AnimalCard';

// Create a mock store
const createMockStore = (initialState = {}) => {
  return configureStore({
    reducer: {
      cart: cartReducer,
    },
    preloadedState: {
      cart: {
        items: [],
        isOpen: false,
        ...initialState,
      },
    },
  });
};

// Wrapper component with providers
const renderWithProviders = (component, initialState = {}) => {
  const store = createMockStore(initialState);
  return {
    ...render(<Provider store={store}>{component}</Provider>),
    store,
  };
};

describe('AnimalCard Component', () => {
  const mockAnimal = {
    id: 1,
    name: 'Bessie',
    animal_type: 'Cattle',
    breed: 'Holstein',
    age: 24,
    weight: 1400,
    price: 2500,
    health_status: 'Vaccinated, Excellent health',
    description: 'High-quality dairy cow',
    image: 'https://example.com/cow.jpg',
  };

  test('renders animal name', () => {
    renderWithProviders(<AnimalCard animal={mockAnimal} />);

    expect(screen.getByText('Bessie')).toBeInTheDocument();
  });

  test('renders animal price', () => {
    renderWithProviders(<AnimalCard animal={mockAnimal} />);

    expect(screen.getByText('$2,500')).toBeInTheDocument();
  });

  test('renders animal type and breed', () => {
    renderWithProviders(<AnimalCard animal={mockAnimal} />);

    expect(screen.getByText(/Cattle/)).toBeInTheDocument();
    expect(screen.getByText(/Holstein/)).toBeInTheDocument();
  });

  test('renders animal age', () => {
    renderWithProviders(<AnimalCard animal={mockAnimal} />);

    expect(screen.getByText(/24 months/)).toBeInTheDocument();
  });

  test('renders animal weight', () => {
    renderWithProviders(<AnimalCard animal={mockAnimal} />);

    expect(screen.getByText(/1400 lbs/)).toBeInTheDocument();
  });

  test('renders health status', () => {
    renderWithProviders(<AnimalCard animal={mockAnimal} />);

    expect(screen.getByText(/Vaccinated, Excellent health/)).toBeInTheDocument();
  });

  test('renders animal image', () => {
    renderWithProviders(<AnimalCard animal={mockAnimal} />);

    const image = screen.getByRole('img', { name: /bessie/i });
    expect(image).toBeInTheDocument();
    expect(image).toHaveAttribute('src', mockAnimal.image);
  });

  test('renders Add to Cart button', () => {
    renderWithProviders(<AnimalCard animal={mockAnimal} />);

    expect(screen.getByRole('button', { name: /add to cart/i })).toBeInTheDocument();
  });

  test('clicking Add to Cart adds item to cart', () => {
    const { store } = renderWithProviders(<AnimalCard animal={mockAnimal} />);

    const addButton = screen.getByRole('button', { name: /add to cart/i });
    fireEvent.click(addButton);

    const state = store.getState();
    expect(state.cart.items).toHaveLength(1);
    expect(state.cart.items[0].id).toBe(mockAnimal.id);
  });

  test('clicking Add to Cart multiple times increases quantity', () => {
    const { store } = renderWithProviders(<AnimalCard animal={mockAnimal} />);

    const addButton = screen.getByRole('button', { name: /add to cart/i });
    fireEvent.click(addButton);
    fireEvent.click(addButton);
    fireEvent.click(addButton);

    const state = store.getState();
    expect(state.cart.items).toHaveLength(1);
    expect(state.cart.items[0].quantity).toBe(3);
  });

  test('renders description when provided', () => {
    renderWithProviders(<AnimalCard animal={mockAnimal} />);

    expect(screen.getByText(/High-quality dairy cow/)).toBeInTheDocument();
  });

  test('renders without description when not provided', () => {
    const animalWithoutDescription = { ...mockAnimal, description: null };
    renderWithProviders(<AnimalCard animal={animalWithoutDescription} />);

    expect(screen.getByText('Bessie')).toBeInTheDocument();
  });
});
