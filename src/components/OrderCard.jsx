const statusColors = {
  pending: "#f59e0b",
  paid: "#3b82f6",
  confirmed: "#10b981",
  rejected: "#ef4444",
  default: "#6b7280",
};

const cardStyle = {
  backgroundColor: '#ffffff',
  border: '1px solid #e5e7eb',
  borderRadius: '12px',
  padding: '20px',
  boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1)',
  transition: 'all 0.2s ease',
  fontFamily: 'system-ui, -apple-system, sans-serif'
};

const headerStyle = {
  fontSize: '18px',
  fontWeight: '600',
  color: '#1f2937',
  marginBottom: '12px',
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center'
};

const statusBadgeStyle = {
  fontSize: '12px',
  fontWeight: '600',
  padding: '4px 12px',
  borderRadius: '20px',
  textTransform: 'uppercase',
  letterSpacing: '0.5px'
};

const itemsListStyle = {
  listStyle: 'none',
  padding: 0,
  margin: '16px 0 0 0'
};

const itemStyle = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  padding: '8px 0',
  borderBottom: '1px solid #f3f4f6',
  fontSize: '14px',
  color: '#374151'
};

const priceStyle = {
  fontWeight: '600',
  color: '#059669'
};

export default function OrderCard({ order, children }) {
  const getStatusBadge = (status) => {
    const color = statusColors[status] || statusColors.default;
    const bgColor = color + '20'; // Add transparency
    
    return {
      ...statusBadgeStyle,
      color: color,
      backgroundColor: bgColor,
      border: `1px solid ${color}30`
    };
  };

  return (
    <div style={cardStyle}>
      <div style={headerStyle}>
        <span>Order #{order.id}</span>
        <span style={getStatusBadge(order?.status)}>
          {order?.status?.toUpperCase() || "UNKNOWN"}
        </span>
      </div>

      <ul style={itemsListStyle}>
        {order?.items?.length > 0 ? (
          order.items.map((item, index) => (
            <li key={item.id} style={{
              ...itemStyle,
              borderBottom: index === order.items.length - 1 ? 'none' : '1px solid #f3f4f6'
            }}>
              <span>{item.animal_name}</span>
              <span style={priceStyle}>${item.price}</span>
            </li>
          ))
        ) : (
          <li style={itemStyle}>No items</li>
        )}
      </ul>

      {children}
    </div>
  );
}
