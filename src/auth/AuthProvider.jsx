/* eslint-disable react-refresh/only-export-components */
import { useAppStore } from '../store/appStore';

export function AuthProvider({ children }) {
  return children;
}

export const useAuthState = () => {
  const user = useAppStore((state) => state.user);
  const login = useAppStore((state) => state.login);
  const logout = useAppStore((state) => state.logout);
  return { user, login, logout, isAuthenticated: Boolean(user) };
};

export default AuthProvider;
