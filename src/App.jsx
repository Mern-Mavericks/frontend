import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import HomePage from './components/home-page/home-page';
import SignUp from './components/sign-up/sign-up';
import SignIn from './components/sign-in/sign-in';
import Dashboard from './components/dashboard/dashboard';
import Navbar from './components/nav-bar/nav-bar';
import Footer from './components/footer/footer';
import { ToastContainer } from 'react-toastify';
import { AuthProvider, useAuth } from './context/auth-context';

const ProtectedRoute = ({ element: Component, ...rest }) => {
  const { isAuthenticated } = useAuth();
  return isAuthenticated ? <Component /> : <Navigate to="/sign-in" />;
};

const App = () => {
  return (
    <AuthProvider>
      <Router>
        <div className="d-flex flex-column min-vh-100">
          <Navbar />
          <div className="flex-grow-1">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/sign-in" element={<SignIn />} />
              <Route path="/sign-up" element={<SignUp />} />
              <Route path="/dashboard" element={<ProtectedRoute element={Dashboard} />} />
            </Routes>
          </div>
          <Footer />
        </div>
        <ToastContainer position='bottom-right' />
      </Router>
    </AuthProvider>
  );
};

export default App;
