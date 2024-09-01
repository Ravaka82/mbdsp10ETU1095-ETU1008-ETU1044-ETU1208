import { useContext } from 'react';
import { AuthContext } from './../context/AuthContext';
import { useNavigation } from '@react-navigation/native';

export default function ProtectedRoute({ children }) {
  const { isLoggedIn } = useContext(AuthContext);

  const navigation = useNavigation();

  if (!isLoggedIn) {
    navigation.navigate('Login');
    return null;
  }

  return children;
}