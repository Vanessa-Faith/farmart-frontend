import { useDispatch } from "react-redux";
import { confirmOrder, rejectOrder } from "../features/orders/ordersSlice";

const buttonStyle = {
  padding: "10px 20px",
  fontSize: "14px",
  fontWeight: "600",
  border: "none",
  borderRadius: "8px",
  cursor: "pointer",
  transition: "all 0.2s ease",
  fontFamily: 'system-ui, -apple-system, sans-serif',
  letterSpacing: '0.3px'
};

const containerStyle = {
  marginTop: 16,
  display: "flex",
  gap: 12,
  justifyContent: 'flex-end'
};

const confirmButtonStyle = {
  ...buttonStyle,
  backgroundColor: "#10b981",
  color: "white",
  boxShadow: "0 1px 3px 0 rgba(16, 185, 129, 0.3)"
};

const rejectButtonStyle = {
  ...buttonStyle,
  backgroundColor: "#ef4444",
  color: "white",
  boxShadow: "0 1px 3px 0 rgba(239, 68, 68, 0.3)"
};

export default function ConfirmRejectButtons({ orderId, status }) {
  const dispatch = useDispatch();

  if (status !== "paid" || !orderId) return null;

  return (
    <div style={containerStyle}>
      <button
        onClick={() => dispatch(confirmOrder(orderId))}
        style={confirmButtonStyle}
        onMouseOver={(e) => e.target.style.backgroundColor = "#059669"}
        onMouseOut={(e) => e.target.style.backgroundColor = "#10b981"}
      >
        ✓ Confirm
      </button>
      <button
        onClick={() => dispatch(rejectOrder(orderId))}
        style={rejectButtonStyle}
        onMouseOver={(e) => e.target.style.backgroundColor = "#dc2626"}
        onMouseOut={(e) => e.target.style.backgroundColor = "#ef4444"}
      >
        ✕ Reject
      </button>
    </div>
  );
}
