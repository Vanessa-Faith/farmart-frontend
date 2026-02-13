import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchOrders } from "../features/orders/ordersSlice";
import OrderCard from "../components/OrderCard";
import ConfirmRejectButtons from "../components/ConfirmRejectButtons";

const containerStyle = {
  maxWidth: '900px',
  margin: '0 auto',
  padding: '20px',
  fontFamily: 'system-ui, -apple-system, sans-serif'
};

const headerStyle = {
  fontSize: '28px',
  fontWeight: '600',
  color: '#1f2937',
  marginBottom: '8px',
  textAlign: 'center'
};

const subtitleStyle = {
  fontSize: '14px',
  color: '#6b7280',
  textAlign: 'center',
  marginBottom: '24px'
};

const loadingStyle = {
  textAlign: 'center',
  fontSize: '16px',
  color: '#6b7280',
  padding: '40px'
};

const emptyStateStyle = {
  textAlign: 'center',
  padding: '60px 20px',
  backgroundColor: '#f0f9ff',
  borderRadius: '12px',
  border: '2px dashed #0ea5e9',
  color: '#0369a1',
  fontSize: '16px'
};

const errorStyle = {
  textAlign: 'center',
  padding: '40px 20px',
  backgroundColor: '#fef2f2',
  borderRadius: '12px',
  border: '1px solid #fecaca',
  color: '#dc2626',
  fontSize: '16px'
};

export default function FarmerOrders() {
  const dispatch = useDispatch();
  const { orders, loading, error } = useSelector((state) => state.orders);

  useEffect(() => {
    dispatch(fetchOrders());
  }, [dispatch]);

  useEffect(() => {
    // Only start polling if not in error state
    if (!error) {
      const interval = setInterval(() => {
        dispatch(fetchOrders());
      }, 10000);

      return () => clearInterval(interval);
    }
  }, [dispatch, error]);

  if (loading) return <div style={loadingStyle}>Loading farmer orders...</div>;
  if (error) return <div style={errorStyle}>Failed to load orders. Please try refreshing the page.</div>;

  return (
    <div style={containerStyle}>
      <h2 style={headerStyle}>Incoming Orders</h2>
      <p style={subtitleStyle}>Auto-refreshes every 10 seconds</p>
      {!orders || orders.length === 0 ? (
        <div style={emptyStateStyle}>
          <div style={{ fontSize: '48px', marginBottom: '16px' }}>📋</div>
          <div>No incoming orders</div>
          <div style={{ fontSize: '14px', marginTop: '8px', opacity: 0.7 }}>New orders will appear here automatically</div>
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {orders.map((order) => (
            <OrderCard key={order.id} order={order}>
              <ConfirmRejectButtons orderId={order.id} actions={order.actions} />
            </OrderCard>
          ))}
        </div>
      )}
    </div>
  );
}
