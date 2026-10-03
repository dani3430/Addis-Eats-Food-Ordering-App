/* eslint-disable react-refresh/only-export-components */
import { useAppStore } from '../store/appStore';

export function AdminAuthProvider({ children }) {
  return children;
}

export const useAdminAuth = () => ({
  isAdminAuthenticated: useAppStore((state) => state.isAdminAuthenticated),
  login: useAppStore((state) => state.adminLogin),
  logout: useAppStore((state) => state.adminLogout),
});
