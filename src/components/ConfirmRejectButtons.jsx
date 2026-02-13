import { useDispatch, useSelector } from "react-redux";
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

export default function ConfirmRejectButtons({ orderId, actions }) {
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.orders);

  // Debug logging to understand what data we're receiving
  console.log('ConfirmRejectButtons debug:', {
    orderId,
    actions,
    canConfirm: actions?.can_confirm,
    canReject: actions?.can_reject
  });

  // Check if buttons should be shown based on actions from API
  const canShowConfirm = actions?.can_confirm === true;
  const canShowReject = actions?.can_reject === true;
  const canShowButtons = canShowConfirm || canShowReject;

  if (!canShowButtons) {
    // Show debug info when buttons are hidden
    console.log('Buttons hidden because:', {
      canConfirm: actions?.can_confirm,
      canReject: actions?.can_reject,
      reason: !canShowConfirm && !canShowReject ? 'No actions available' : 'Missing orderId'
    });
    return null;
  }

  return (
    <div style={containerStyle}>
      <button
        onClick={() => dispatch(confirmOrder(orderId))}
        style={{
          ...confirmButtonStyle,
          opacity: loading ? 0.7 : 1,
          cursor: loading ? 'not-allowed' : 'pointer'
        }}
        disabled={loading}
        onMouseOver={(e) => !loading && (e.target.style.backgroundColor = "#059669")}
        onMouseOut={(e) => !loading && (e.target.style.backgroundColor = "#10b981")}
      >
        {loading ? "⏳ Processing..." : "✓ Confirm"}
      </button>
      <button
        onClick={() => dispatch(rejectOrder(orderId))}
        style={{
          ...rejectButtonStyle,
          opacity: loading ? 0.7 : 1,
          cursor: loading ? 'not-allowed' : 'pointer'
        }}
        disabled={loading}
        onMouseOver={(e) => !loading && (e.target.style.backgroundColor = "#dc2626")}
        onMouseOut={(e) => !loading && (e.target.style.backgroundColor = "#ef4444")}
      >
        {loading ? "⏳ Processing..." : "✕ Reject"}
      </button>
    </div>
  );
}
