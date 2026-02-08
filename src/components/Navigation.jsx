import { Link } from "react-router-dom";

export default function Navigation() {
  return (
    <nav style={{ padding: 16, borderBottom: "1px solid #ddd", marginBottom: 20 }}>
      <Link to="/orders" style={{ marginRight: 16 }}>My Orders</Link>
      <Link to="/farmer/orders">Farmer Dashboard</Link>
    </nav>
  );
}
