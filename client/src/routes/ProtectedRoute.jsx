import { Navigate } from "react-router-dom";

export default function ProtectedRoute({ children }) {
const token = localStorage.getItem("adminToken");

// ❌ No token or invalid token
if (!token || token === "undefined" || token === "null") {
localStorage.removeItem("adminToken");
localStorage.removeItem("adminUser");


return <Navigate to="/admin/login" replace />;


}

// ✅ Valid token → allow dashboard
return children;
}
