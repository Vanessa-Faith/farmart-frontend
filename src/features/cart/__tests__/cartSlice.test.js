import cartReducer, {
  addToCart,
  removeFromCart,
  updateQuantity,
  clearCart,
  toggleCart,
  openCart,
  closeCart,
  selectCartItems,
  selectCartTotal,
  selectCartItemCount,
  selectIsCartOpen,
} from '../cartSlice';

describe('Cart Slice', () => {
  const initialState = {
    items: [],
    isOpen: false,
  };

  const mockAnimal = {
    id: 1,
    name: 'Bessie',
    animal_type: 'Cattle',
    breed: 'Holstein',
    price: 2500,
    image: 'https://example.com/cow.jpg',
  };

  const mockAnimal2 = {
    id: 2,
    name: 'Billy',
    animal_type: 'Goat',
    breed: 'Boer',
    price: 450,
    image: 'https://example.com/goat.jpg',
  };

  test('should return the initial state', () => {
    expect(cartReducer(undefined, { type: 'unknown' })).toEqual(initialState);
  });

  describe('addToCart', () => {
    test('should add a new item to the cart', () => {
      const result = cartReducer(initialState, addToCart(mockAnimal));

      expect(result.items).toHaveLength(1);
      expect(result.items[0]).toEqual({ ...mockAnimal, quantity: 1 });
    });

    test('should increment quantity if item already exists', () => {
      const stateWithItem = {
        items: [{ ...mockAnimal, quantity: 1 }],
        isOpen: false,
      };

      const result = cartReducer(stateWithItem, addToCart(mockAnimal));

      expect(result.items).toHaveLength(1);
      expect(result.items[0].quantity).toBe(2);
    });

    test('should add multiple different items', () => {
      let state = cartReducer(initialState, addToCart(mockAnimal));
      state = cartReducer(state, addToCart(mockAnimal2));

      expect(state.items).toHaveLength(2);
    });
  });

  describe('removeFromCart', () => {
    test('should remove an item from the cart', () => {
      const stateWithItems = {
        items: [
          { ...mockAnimal, quantity: 1 },
          { ...mockAnimal2, quantity: 2 },
        ],
        isOpen: false,
      };

      const result = cartReducer(stateWithItems, removeFromCart(mockAnimal.id));

      expect(result.items).toHaveLength(1);
      expect(result.items[0].id).toBe(mockAnimal2.id);
    });

    test('should handle removing non-existent item', () => {
      const stateWithItem = {
        items: [{ ...mockAnimal, quantity: 1 }],
        isOpen: false,
      };

      const result = cartReducer(stateWithItem, removeFromCart(999));

      expect(result.items).toHaveLength(1);
    });
  });

  describe('updateQuantity', () => {
    test('should update item quantity', () => {
      const stateWithItem = {
        items: [{ ...mockAnimal, quantity: 1 }],
        isOpen: false,
      };

      const result = cartReducer(
        stateWithItem,
        updateQuantity({ id: mockAnimal.id, quantity: 5 })
      );

      expect(result.items[0].quantity).toBe(5);
    });

    test('should remove item if quantity is set to 0 or less', () => {
      const stateWithItem = {
        items: [{ ...mockAnimal, quantity: 1 }],
        isOpen: false,
      };

      const result = cartReducer(
        stateWithItem,
        updateQuantity({ id: mockAnimal.id, quantity: 0 })
      );

      expect(result.items).toHaveLength(0);
    });
  });

  describe('clearCart', () => {
    test('should remove all items from cart', () => {
      const stateWithItems = {
        items: [
          { ...mockAnimal, quantity: 1 },
          { ...mockAnimal2, quantity: 2 },
        ],
        isOpen: true,
      };

      const result = cartReducer(stateWithItems, clearCart());

      expect(result.items).toHaveLength(0);
    });
  });

  describe('cart visibility', () => {
    test('toggleCart should toggle isOpen state', () => {
      const result = cartReducer(initialState, toggleCart());
      expect(result.isOpen).toBe(true);

      const result2 = cartReducer(result, toggleCart());
      expect(result2.isOpen).toBe(false);
    });

    test('openCart should set isOpen to true', () => {
      const result = cartReducer(initialState, openCart());
      expect(result.isOpen).toBe(true);
    });

    test('closeCart should set isOpen to false', () => {
      const stateWithOpenCart = { ...initialState, isOpen: true };
      const result = cartReducer(stateWithOpenCart, closeCart());
      expect(result.isOpen).toBe(false);
    });
  });

  describe('selectors', () => {
    const stateWithItems = {
      cart: {
        items: [
          { ...mockAnimal, quantity: 2 },
          { ...mockAnimal2, quantity: 3 },
        ],
        isOpen: true,
      },
    };

    test('selectCartItems should return cart items', () => {
      const items = selectCartItems(stateWithItems);
      expect(items).toHaveLength(2);
    });

    test('selectCartTotal should calculate total price', () => {
      const total = selectCartTotal(stateWithItems);
      // (2500 * 2) + (450 * 3) = 5000 + 1350 = 6350
      expect(total).toBe(6350);
    });

    test('selectCartItemCount should return total item count', () => {
      const count = selectCartItemCount(stateWithItems);
      expect(count).toBe(5); // 2 + 3
    });

    test('selectIsCartOpen should return cart open state', () => {
      const isOpen = selectIsCartOpen(stateWithItems);
      expect(isOpen).toBe(true);
    });
  });
});
