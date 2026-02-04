import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchOrders } from "../features/orders/ordersSlice";
import OrderCard from "../components/OrderCard";

const containerStyle = {
  maxWidth: '800px',
  margin: '0 auto',
  padding: '20px',
  fontFamily: 'system-ui, -apple-system, sans-serif'
};

const headerStyle = {
  fontSize: '28px',
  fontWeight: '600',
  color: '#1f2937',
  marginBottom: '24px',
  textAlign: 'center'
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
  backgroundColor: '#f9fafb',
  borderRadius: '12px',
  border: '2px dashed #d1d5db',
  color: '#6b7280',
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

export default function OrderHistory() {
  const dispatch = useDispatch();
  const { orders, loading, error } = useSelector((state) => state.orders);

  useEffect(() => {
    dispatch(fetchOrders());
  }, [dispatch]);

  if (loading) return <div style={loadingStyle}>Loading orders...</div>;
  if (error) return <div style={errorStyle}>Failed to load orders. Please try refreshing the page.</div>;

  return (
    <div style={containerStyle}>
      <h2 style={headerStyle}>My Orders</h2>
      {!orders || orders.length === 0 ? (
        <div style={emptyStateStyle}>
          <div style={{ fontSize: '48px', marginBottom: '16px' }}>📦</div>
          <div>You haven't placed any orders yet</div>
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {orders.map((order) => (
            <OrderCard key={order.id} order={order} />
          ))}
        </div>
      )}
    </div>
  );
}
