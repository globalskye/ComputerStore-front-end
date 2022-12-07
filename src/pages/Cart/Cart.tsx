import { useRecoilState } from 'recoil';
import { Controller, useForm } from 'react-hook-form';
import { Box, Button, Grid, Paper, TextField, Typography } from '@mui/material';
import { cartState } from '../../atoms';
import CartItem from '../../components/organisms/CartItem/CartItem';
import { CartItemType } from '../../types/cart-item';

interface OrderFormValues {
  address: string;
}

const CartOrder = () => {
  const [cartItems, setCartItems] = useRecoilState(cartState);

  const calculateTotal = (items: CartItemType[]) =>
    items.reduce((acc, item) => acc + item.quantity * item.price, 0);

  const {
    control,
    handleSubmit,
    formState: { errors }
  } = useForm<OrderFormValues>();

  const onSubmit = (data: OrderFormValues) => {
    console.log(data);
    console.log(cartItems);
  };

  return (
    <Paper sx={{ p: 2, margin: 'auto', maxWidth: 500 }} elevation={4}>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Typography variant="h5">You cart</Typography>
        </Grid>

        <Grid item xs={12}>
          <Typography variant="h5">Total: ${calculateTotal(cartItems).toFixed(2)}</Typography>
        </Grid>

        <Grid item xs={12}>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <Controller
                  name="address"
                  control={control}
                  defaultValue=""
                  rules={{ required: true }}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      label="Address"
                      variant="outlined"
                      fullWidth
                      error={!!errors.address}
                      helperText={errors.address ? 'Address is required' : ''}
                    />
                  )}
                />
              </Grid>
              <Grid item xs={12}>
                <Button variant="contained">Order</Button>
              </Grid>
            </Grid>
          </form>
        </Grid>
      </Grid>
    </Paper>
  );
};

const Cart = () => {
  const [cartItems, setCartItems] = useRecoilState(cartState);

  return (
    <Grid container spacing={2}>
      <Grid item xs={8}>
        <Grid container spacing={2}>
          {cartItems.length === 0 ? (
            <Grid item xs={12}>
              <Typography variant="h4">
                {cartItems.length === 0 ? <p>No items in cart.</p> : null}
              </Typography>
            </Grid>
          ) : (
            cartItems.map((item) => (
              <Grid key={item.id} item xs={12} sm={8} md={6} lg={4}>
                <CartItem item={item} />
              </Grid>
            ))
          )}
        </Grid>
      </Grid>
      <Grid item xs={4}>
        <CartOrder />
      </Grid>
    </Grid>
  );
};

export default Cart;
