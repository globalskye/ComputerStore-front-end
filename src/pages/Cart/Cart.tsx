import { useRecoilState, useRecoilValue } from 'recoil';
import { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { Box, Button, Grid, Modal, Paper, TextField, Typography } from '@mui/material';
import { cartState } from '../../atoms';
import CartItem from '../../components/organisms/CartItem/CartItem';
import { order } from '../../services';
import { CartItemType, TypeForOrder } from '../../types/cart-item';

interface OrderFormValues {
  address: string;
  items: CartItemType[];
}
const style = {
  position: 'absolute' as const,
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4
};
const CartOrder = () => {
  const [open, setOpen] = useState(false);

  const handleClose = () => setOpen(false);
  const [cartItems, setCartItems] = useRecoilState(cartState);

  const calculateTotal = (items: CartItemType[]) =>
    items.reduce((acc, item) => acc + item.quantity * item.price, 0);

  const {
    control,
    handleSubmit,
    formState: { errors }
  } = useForm<OrderFormValues>();

  const onSubmit = (data: OrderFormValues) => {
    console.log({
      adress: data.address,
      items: cartItems
    });
    order({
      adress: data.address,
      items: cartItems
    }).then(
      (response) => {
        console.log(response.data);
        setCartItems([]);
        localStorage.set('cart');
        setOpen(true);
      },
      (error) => {
        console.log(error);
      }
    );
  };

  return (
    <>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description">
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Заказ успешно оформлен.
          </Typography>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Продавец: Dexter.
          </Typography>
        </Box>
      </Modal>

      <Paper sx={{ p: 2, margin: 'auto', maxWidth: 500 }} elevation={4}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Typography variant="h5">
              Полная стоимость: {calculateTotal(cartItems).toFixed(2)} p.
            </Typography>
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
                        label="Адресс доставки"
                        variant="outlined"
                        fullWidth
                        error={!!errors.address}
                        helperText={errors.address ? 'Address is required' : ''}
                      />
                    )}
                  />
                </Grid>
                <Grid item xs={12}>
                  <Button type="submit" variant="contained">
                    Order
                  </Button>
                </Grid>
              </Grid>
            </form>
          </Grid>
        </Grid>
      </Paper>
    </>
  );
};

const Cart = () => {
  const cartItems = useRecoilValue(cartState);

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
