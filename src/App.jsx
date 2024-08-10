import React from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom';
import HomePage from './components/home-page/home-page';
import SignUp from './components/sign-up/sign-up';
import SignIn from './components/sign-in/sign-in';
import Dashboard from './components/dashboard/dashboard';
import Users from './components/user/user';
import Navbar from './components/nav-bar/nav-bar';
import Footer from './components/footer/footer';
import { ToastContainer } from 'react-toastify';
import { AuthProvider, useAuth } from './context/auth-context';
import MyProfile from './components/my-profile/my-profile';
import CartPage from './components/cart-page/cart-page';
import { CartProvider } from './context/cart-context';
import CheckoutPage from './components/checkout/checkout';
import OrderPage from './components/orders/orders';

const ProtectedRoute = ({ element: Component, ...rest }) => {
  const { isAuthenticated } = useAuth();
  return isAuthenticated ? <Component /> : <Navigate to="/sign-in" />;
};

const App = () => {
  return (
    <CartProvider>
      <AuthProvider>
        <Router>
          <div className="d-flex flex-column min-vh-100">
            <Navbar />
            <div className="flex-grow-1">
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/home" element={<HomePage />} />
                <Route path="/sign-in" element={<SignIn />} />
                <Route path="/sign-up" element={<SignUp />} />
                <Route
                  path="/dashboard"
                  element={<ProtectedRoute element={Dashboard} />}
                />
                <Route
                  path="/users"
                  element={<ProtectedRoute element={Users} />}
                />
                <Route
                  path="/my-profile"
                  element={<ProtectedRoute element={MyProfile} />}
                />
                <Route
                  path="/cart"
                  element={<ProtectedRoute element={CartPage} />}
                />
                <Route
                  path="/checkout"
                  element={<ProtectedRoute element={CheckoutPage} />}
                />
                <Route
                  path="/orders"
                  element={<ProtectedRoute element={OrderPage} />}
                />
              </Routes>
            </div>
            <ToastContainer position="bottom-right" />
          </div>
          <Footer />
        </Router>
      </AuthProvider>
    </CartProvider>
  );
};

export default App;
