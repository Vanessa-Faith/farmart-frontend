import { render, screen, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import ConfirmRejectButtons from '../ConfirmRejectButtons';
import ordersReducer from '../../features/orders/ordersSlice';

// Mock Redux store
const createMockStore = (initialState = {}) => {
  return configureStore({
    reducer: {
      orders: ordersReducer,
    },
    preloadedState: initialState,
  });
};

const mockDispatch = jest.fn();

// Mock useDispatch
jest.mock('react-redux', () => ({
  ...jest.requireActual('react-redux'),
  useDispatch: () => mockDispatch,
}));

describe('ConfirmRejectButtons', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should not render when no actions are available', () => {
    render(
      <Provider store={createMockStore()}>
        <ConfirmRejectButtons orderId="123" actions={{}} />
      </Provider>
    );
    
    expect(screen.queryByText('✓ Confirm')).not.toBeInTheDocument();
    expect(screen.queryByText('✕ Reject')).not.toBeInTheDocument();
  });

  it('should render confirm button when can_confirm is true', () => {
    render(
      <Provider store={createMockStore()}>
        <ConfirmRejectButtons orderId="123" actions={{ can_confirm: true }} />
      </Provider>
    );
    
    expect(screen.getByText('✓ Confirm')).toBeInTheDocument();
    expect(screen.queryByText('✕ Reject')).not.toBeInTheDocument();
  });

  it('should render reject button when can_reject is true', () => {
    render(
      <Provider store={createMockStore()}>
        <ConfirmRejectButtons orderId="123" actions={{ can_reject: true }} />
      </Provider>
    );
    
    expect(screen.queryByText('✓ Confirm')).not.toBeInTheDocument();
    expect(screen.getByText('✕ Reject')).toBeInTheDocument();
  });

  it('should render both buttons when both actions are available', () => {
    render(
      <Provider store={createMockStore()}>
        <ConfirmRejectButtons orderId="123" actions={{ can_confirm: true, can_reject: true }} />
      </Provider>
    );
    
    expect(screen.getByText('✓ Confirm')).toBeInTheDocument();
    expect(screen.getByText('✕ Reject')).toBeInTheDocument();
  });

  it('should call confirmOrder when confirm button is clicked', () => {
    render(
      <Provider store={createMockStore()}>
        <ConfirmRejectButtons orderId="123" actions={{ can_confirm: true }} />
      </Provider>
    );
    
    fireEvent.click(screen.getByText('✓ Confirm'));
    expect(mockDispatch).toHaveBeenCalledWith({ type: 'orders/confirmOrder/pending', meta: { requestId: expect.any(String) } });
  });

  it('should call rejectOrder when reject button is clicked', () => {
    render(
      <Provider store={createMockStore()}>
        <ConfirmRejectButtons orderId="123" actions={{ can_reject: true }} />
      </Provider>
    );
    
    fireEvent.click(screen.getByText('✕ Reject'));
    expect(mockDispatch).toHaveBeenCalledWith({ type: 'orders/rejectOrder/pending', meta: { requestId: expect.any(String) } });
  });

  it('should disable buttons when loading', () => {
    render(
      <Provider store={createMockStore({ orders: { loading: true } })}>
        <ConfirmRejectButtons orderId="123" actions={{ can_confirm: true, can_reject: true }} />
      </Provider>
    );
    
    const confirmButton = screen.getByText('✓ Confirm');
    const rejectButton = screen.getByText('✕ Reject');
    
    expect(confirmButton).toBeDisabled();
    expect(rejectButton).toBeDisabled();
  });
});