import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CartItemType } from '../../../types/cart-item';

type Props = {
  item: CartItemType;
  addToCart: () => void;
  removeFromCart: () => void;
};

const CartItem = ({ item, addToCart, removeFromCart }: Props) => {
  return (
    <>
      <Card sx={{ maxWidth: 345 }}>
        <CardMedia component="img" height="140" image={item.image} alt="green iguana" />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {item.title}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {item.description}
          </Typography>
        </CardContent>
        <CardActions>
          <Button variant="contained" size="small" onClick={() => addToCart()}>
            +
          </Button>
          <Typography variant="body2" color="text.secondary">
            {item.amount}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            ${item.price}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            ${(item.amount * item.price).toFixed(2)}
          </Typography>
          <Button variant="contained" size="small">
            -
          </Button>
        </CardActions>
      </Card>
    </>
  );
};

export default CartItem;
