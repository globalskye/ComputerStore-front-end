import CartItem from '../../components/organisms/CartItem/CartItem';
import { CartItemType } from '../../types/cart-item';

const CartShop = () => {
  const calculateTotal = (items: CartItemType[]) =>
    items.reduce((acc, item) => acc + item.amount * item.price, 0);

  const cartItems: CartItemType[] = [
    {
      id: 1,
      title: 'Test',
      amount: 1,
      category: 'Test',
      description: 'Test',
      image: 'https://images.unsplash.com/photo-1551963831-b3b1ca40c98e',
      price: 10
    }
  ];

  const addToCart = () => cartItems.push(cartItems[0]);
  const removeFromCart = () => cartItems.pop();

  return (
    <>
      <h2>Your Cart</h2>
      {cartItems.length === 0 ? <p>No items in cart.</p> : null}
      {cartItems.map((item) => (
        <CartItem key={item.id} item={item} addToCart={addToCart} removeFromCart={removeFromCart} />
      ))}
      <h2>Total: ${calculateTotal(cartItems).toFixed(2)}</h2>
    </>
  );
};

export default CartShop;
