import React from 'react';
import { Navigate } from 'react-router-dom';

const AdminProtectedRoute = ({ children }) => {
    const protectedRoute = true;
    if (!protectedRoute) {
      return <Navigate to="/admin/login" replace />;
    }
  
    return children;
  };

export default AdminProtectedRoute;  
