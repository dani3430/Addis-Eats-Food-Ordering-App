import { useNavigate } from 'react-router-dom';
import CartPanel from './CartPanel';

export default function Cart() {
  const navigate = useNavigate();

  return (
    <CartPanel
      isOpen
      onClose={() => navigate('/menu')}
      onNavigateToCheckout={() => navigate('/checkout')}
    />
  );
}
