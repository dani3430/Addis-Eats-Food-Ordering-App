import { useAppStore } from '../store/appStore';

export function useAuth() {
  const user = useAppStore((state) => state.user);
  const login = useAppStore((state) => state.login);
  const logout = useAppStore((state) => state.logout);
  return { user, login, logout, isAuthenticated: Boolean(user) };
}

export default useAuth;