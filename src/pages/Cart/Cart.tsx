import { useRecoilState } from 'recoil';
import { Grid, Typography } from '@mui/material';
import { cartState } from '../../atoms';
import CartItem from '../../components/organisms/CartItem/CartItem';
import { CartItemType } from '../../types/cart-item';

const Cart = () => {
  const [cartItems, setCartItems] = useRecoilState(cartState);

  const calculateTotal = (items: CartItemType[]) =>
    items.reduce((acc, item) => acc + item.quantity * item.price, 0);

  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <Typography variant="h5">You cart</Typography>
      </Grid>
      <Grid item xs={12}>
        <Typography variant="h4">
          {cartItems.length === 0 ? <p>No items in cart.</p> : null}
        </Typography>
      </Grid>

      {cartItems.map((item) => (
        <Grid key={item.id} item xs={12} sm={6} md={4} lg={3}>
          <CartItem item={item} />
        </Grid>
      ))}
      <Grid item xs={12}>
        <Typography variant="h5">Total: ${calculateTotal(cartItems).toFixed(2)}</Typography>
      </Grid>
    </Grid>
  );
};

export default Cart;
