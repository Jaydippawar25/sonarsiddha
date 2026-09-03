import React, { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../firebase';

const ProtectedRoute = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center font-bold text-2xl text-green-700">Loading Admin...</div>;
  }

  // Check hardcoded admin bypass
  const isTempAdmin = localStorage.getItem('tempAdmin') === 'true';

  if (!user && !isTempAdmin) {
    return <Navigate to="/admin/login" />;
  }

  return children;
};

export default ProtectedRoute;
