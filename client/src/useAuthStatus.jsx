import { useContext } from 'react';
import { AuthContext } from './AuthContext';

export const useAuthenticationStatus = () => {
  const { isAuthenticated } = useContext(AuthContext);
  return isAuthenticated;
};
