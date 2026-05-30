import { Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Products from "./pages/Products";
import ProductDetails from "./pages/ProductDetails";
import ProductListing from "./pages/Admin/Index";
import { useSelector } from "react-redux";
import AddProduct from "./pages/Admin/AddProduct";
import EditProduct from "./pages/Admin/EditProduct";
import Cart from "./pages/Cart";
import BuyNow from "./pages/BuyNow";
import Orders from "./pages/Orders";
import Contact from "./pages/Contact";
import Profile from "./pages/Profile";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  const { token, role } = useSelector((state) => state.auth);

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-200">
      <Navbar />
      <Routes>
        {/* Public Routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/products/:id" element={<ProductDetails />} />
        <Route path="/contact" element={<Contact />} />
        
        {/* Multi-role Home Route */}
        <Route 
          path="/" 
          element={token && role === "admin" ? <ProtectedRoute allowedRoles={["admin"]}><ProductListing /></ProtectedRoute> : <Products />} 
        />

        {/* Protected Customer Routes */}
        <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
        <Route path="/cart" element={<ProtectedRoute><Cart /></ProtectedRoute>} />
        <Route path="/buy-now/:productId" element={<ProtectedRoute><BuyNow /></ProtectedRoute>} />
        <Route path="/orders" element={<ProtectedRoute><Orders /></ProtectedRoute>} />

        {/* Protected Admin Routes */}
        <Route 
          path="/add-product" 
          element={<ProtectedRoute allowedRoles={["admin"]}><AddProduct /></ProtectedRoute>} 
        />
        <Route 
          path="/edit-product/:id" 
          element={<ProtectedRoute allowedRoles={["admin"]}><EditProduct /></ProtectedRoute>} 
        />
      </Routes>
    </div>
  );
}

export default App;
