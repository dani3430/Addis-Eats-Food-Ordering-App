import { Navigate, useLocation } from 'react-router-dom';
import { useAdminAuth } from './useAdminAuth';

export default function RequireAdmin({ children }) {
  const { isAdminAuthenticated } = useAdminAuth();
  const location = useLocation();

  if (!isAdminAuthenticated) {
    return <Navigate to="/admin/login" state={{ from: location }} replace />;
  }

  return children;
}