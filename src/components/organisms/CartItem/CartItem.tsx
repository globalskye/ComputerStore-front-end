import { useSetRecoilState } from 'recoil';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { cartState } from '../../../atoms';
import { CartItemType } from '../../../types/cart-item';

type Props = {
  item: CartItemType;
};

const CartItem = ({ item }: Props) => {
  const setCart = useSetRecoilState(cartState);

  const addToCart = () => {
    setCart((oldCart) => {
      const isItemInCart = oldCart.find((cartItem) => cartItem.id === item.id);
      if (isItemInCart) {
        return oldCart.map((cartItem) =>
          cartItem.id === item.id ? { ...cartItem, quantity: cartItem.quantity + 1 } : cartItem
        );
      }
      return [...oldCart, { ...item, quantity: 1 }];
    });
  };

  const removeFromCart = () => {
    setCart((oldCart) => {
      const isItemInCart = oldCart.find((cartItem) => cartItem.id === item.id);
      if (isItemInCart && item.quantity > 1) {
        return oldCart.map((cartItem) =>
          cartItem.id === item.id ? { ...cartItem, quantity: cartItem.quantity - 1 } : cartItem
        );
      }
      return oldCart.filter((cartItem) => cartItem.id !== item.id);
    });
  };

  return (
    <>
      <Card sx={{ maxWidth: 345 }}>
        <CardMedia
          component="img"
          height="150"
          sx={{ width: 100, margin: 'auto' }}
          image={item.image}
          alt="green iguana"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {item.name}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {item.description}
          </Typography>
          <Typography variant="h6" color="warning.main">
            Цена {item.price} p.
          </Typography>
        </CardContent>
        <CardActions>
          <Button onClick={addToCart} variant="outlined" size="small">
            +
          </Button>
          <Button onClick={removeFromCart} variant="outlined" size="small">
            -
          </Button>
          <Typography variant="body2" color="text.secondary" style={{ marginLeft: '10px' }}>
            Количество: {item.quantity}
          </Typography>
        </CardActions>
        <CardContent>
          <Typography variant="h6" color="primary.main">
            Итоговая стоимось: {(item.quantity * item.price).toFixed(2)} p.
          </Typography>
        </CardContent>
      </Card>
    </>
  );
};

export default CartItem;
