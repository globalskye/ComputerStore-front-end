import React from 'react';
import { Box, Card, Grid, Paper, Toolbar } from '@mui/material';
import CategoriesList from '../components/organisms/Category/Category';
import ProviderSelector from '../components/organisms/ProviderSelector';
import ShopItems from '../components/organisms/ShopItems/ShopItems';

const Home: React.FC = () => {
  return (
    <Box sx={{ p: 2, margin: 'auto' }}>
      <Grid container spacing={2}>
        <Grid item xs={3}>
          <Paper sx={{ p: 2, margin: 'auto', maxWidth: 500 }} elevation={4}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <CategoriesList />
              </Grid>
              <Grid item xs={12}>
                <ProviderSelector />
              </Grid>
            </Grid>
          </Paper>
        </Grid>
        <Grid item xs={9}>
          <ShopItems />
        </Grid>
      </Grid>
    </Box>
  );
};

export default Home;
