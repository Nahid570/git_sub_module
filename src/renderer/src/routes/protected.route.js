import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
    const user = useSelector(state=>state.authReducer.data);
    // const protectedRoute = false;
    // console.log('before check');
    if (!user || !user.token) {
      return <Navigate to="/signin" replace />;
    }
    // console.log('after check');
    return children;
  };

export default ProtectedRoute;
