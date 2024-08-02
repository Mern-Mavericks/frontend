import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import HomePage from './components/home-page/home-page';
import SignUp from './components/sign-up/sign-up';
import SignIn from './components/sign-in/sign-in';
import Users from './components/user/user';
import Navbar from './components/nav-bar/nav-bar';
import { AuthProvider, useAuth } from './context/auth-context';
import ProtectedRoute from './components/protected-route/protected-route';

const App = () => {
  return (
    <AuthProvider>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/sign-in" element={<SignIn />} />
          <Route path="/sign-up" element={<SignUp />} />
          <Route path="/" element={<ProtectedHomePage />} />
          <Route path="/users" element={<ProtectedRoute element={Users} />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
};

const ProtectedHomePage = () => {
  const { isAuthenticated } = useAuth();
  return isAuthenticated ? <HomePage /> : <Navigate to="/sign-in" />;
};

export default App;
