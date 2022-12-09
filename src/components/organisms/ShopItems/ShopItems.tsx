import { useRecoilState, useRecoilValue } from 'recoil';
import { useEffect, useState } from 'react';
import { Button, Card, CardActions, CardContent, CardMedia, Grid, Typography } from '@mui/material';
import { cartState, selectedCategoriesState, selectedProvidersState } from '../../../atoms';
import { getAllProductItems } from '../../../services';

type Item = {
  count: number;
  id: number;
  name: string;
  image: string;
  description: string;
  price: number;
  garantia: string;
  category: string;
  provider: string;
};

const ShopItem = (item: Item) => {
  const [cart, setCart] = useRecoilState(cartState);

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

  const isInCart = cart.find((i) => i.id == item.id);

  return (
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
        <Typography variant="h5" color="warning.main">
          Цена: {item.price} p.
        </Typography>
        <Typography variant="h6" color="text.secondary">
          В наличии:{item.count}
        </Typography>
        <Typography variant="body2" color="warning.main">
          Гарантия {item.garantia} месяцев
        </Typography>
      </CardContent>
      <CardActions>
        <Button disabled={Boolean(isInCart)} variant="contained" onClick={addToCart} size="small">
          {isInCart ? 'Already in cart' : 'Add to cart'}
        </Button>
      </CardActions>
    </Card>
  );
};

function ShopItems() {
  const [products, setProduct] = useState<Item[]>();
  const categories = useRecoilValue(selectedCategoriesState);
  const providers = useRecoilValue(selectedProvidersState);

  useEffect(() => {
    getAllProductItems().then(
      (response) => {
        setProduct(response.data);
      },
      (error) => {
        const _content =
          (error.response && error.response.data) || error.message || error.toString();

        setProduct(_content);
      }
    );
  }, []);

  if (!products) {
    return null;
  }

  return (
    <>
      <Grid container spacing={2}>
        {products
          .filter((item) =>
            categories.length
              ? categories.map((category) => category.category).includes(item.category)
              : true
          )
          .filter((item) =>
            providers.length
              ? providers.map((provider) => provider.provider).includes(item.provider)
              : true
          )
          .map((item: Item) => (
            <Grid key={item.id} item xs={12} sm={6} md={4} lg={3}>
              <ShopItem {...item} />
            </Grid>
          ))}
      </Grid>
    </>
  );
}

export default ShopItems;
