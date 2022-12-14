import { useRecoilState, useRecoilValue } from 'recoil';
import * as React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import AdbIcon from '@mui/icons-material/Adb';
import MenuIcon from '@mui/icons-material/Menu';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { Badge } from '@mui/material';
import AppBar from '@mui/material/AppBar';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Toolbar from '@mui/material/Toolbar';
import Tooltip from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';
import { cartState, userProfileAtom } from '../../../atoms';
import { AuthService } from '../../../services';

export interface NavItem {
  name: string;
  path: string;
}

const pages: NavItem[] = [
  {
    name: 'Home',
    path: '/home'
  }
];

const ShopCart = () => {
  const cart = useRecoilValue(cartState);

  return (
    <>
      <Tooltip title="Shop Cart">
        <Badge badgeContent={cart.length} color="secondary">
          <IconButton sx={{ p: 0 }} component={Link} to="/shop-cart">
            <ShoppingCartIcon />
          </IconButton>
        </Badge>
      </Tooltip>
    </>
  );
};

const RegisterMenu = () => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  const [userProfile, setUserProfile] = useRecoilState(userProfileAtom);

  const handleOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    AuthService.logout();
    setUserProfile(undefined);
  };

  return (
    <>
      <Tooltip title="Open settings">
        <IconButton onClick={handleOpen} sx={{ p: 0 }}>
          <Avatar
            alt="Remy Sharp"
            src="http://t0.gstatic.com/licensed-image?q=tbn:ANd9GcTbOiWS4nWZXfi1OoF2KauaRMKZDqh6ZgCm_76tvzDjT8572lXfOnQ-Rk1kgFSNXINMNWkPMj_h44ievqQ"
          />
        </IconButton>
      </Tooltip>
      <Menu
        sx={{ mt: '45px' }}
        id="menu-appbar"
        anchorEl={anchorEl}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'right'
        }}
        keepMounted
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right'
        }}
        open={Boolean(anchorEl)}
        onClose={handleClose}>
        <MenuItem component={Link} to={'/login'}>
          <Typography textAlign="center">LogIn</Typography>
        </MenuItem>
        <MenuItem component={Link} to={'/register'}>
          <Typography textAlign="center">Register</Typography>
        </MenuItem>
      </Menu>
    </>
  );
};

const UserProfileMenu = () => {
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  const [userProfile, setUserProfile] = useRecoilState(userProfileAtom);

  const handleOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    AuthService.logout();
    setUserProfile(undefined);
    navigate('/login');
  };

  return (
    <>
      <Tooltip title="Open settings">
        <IconButton onClick={handleOpen} sx={{ p: 0 }}>
          <Avatar
            alt="Remy Sharp"
            src="http://t0.gstatic.com/licensed-image?q=tbn:ANd9GcTbOiWS4nWZXfi1OoF2KauaRMKZDqh6ZgCm_76tvzDjT8572lXfOnQ-Rk1kgFSNXINMNWkPMj_h44ievqQ"
          />
        </IconButton>
      </Tooltip>
      <Menu
        sx={{ mt: '45px' }}
        id="menu-appbar"
        anchorEl={anchorEl}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'right'
        }}
        keepMounted
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right'
        }}
        open={Boolean(anchorEl)}
        onClose={handleClose}>
        <MenuItem onClick={handleLogout}>
          <Typography textAlign="center">LogOut</Typography>
        </MenuItem>
      </Menu>
    </>
  );
};

const ResponsiveNavMenu = () => {
  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(null);

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  return (
    <>
      <AdbIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} />
      <Typography
        variant="h6"
        noWrap
        component="a"
        href="/"
        sx={{
          mr: 2,
          display: { xs: 'none', md: 'flex' },
          fontFamily: 'monospace',
          fontWeight: 700,
          letterSpacing: '.3rem',
          color: 'inherit',
          textDecoration: 'none'
        }}>
        LOGO
      </Typography>

      <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
        <IconButton
          size="large"
          aria-label="account of current user"
          aria-controls="menu-appbar"
          aria-haspopup="true"
          onClick={handleOpenNavMenu}
          color="inherit">
          <MenuIcon />
        </IconButton>
        <Menu
          id="menu-appbar"
          anchorEl={anchorElNav}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'left'
          }}
          keepMounted
          transformOrigin={{
            vertical: 'top',
            horizontal: 'left'
          }}
          open={Boolean(anchorElNav)}
          onClose={handleCloseNavMenu}
          sx={{
            display: { xs: 'block', md: 'none' }
          }}>
          {pages.map((page) => (
            <MenuItem key={page.name} onClick={handleCloseNavMenu} component={Link} to={page.path}>
              <Typography textAlign="center">{page.name}</Typography>
            </MenuItem>
          ))}
        </Menu>
      </Box>

      <AdbIcon sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }} />
      <Typography
        variant="h5"
        noWrap
        component="a"
        href=""
        sx={{
          mr: 2,
          display: { xs: 'flex', md: 'none' },
          flexGrow: 1,
          fontFamily: 'monospace',
          fontWeight: 700,
          letterSpacing: '.3rem',
          color: 'inherit',
          textDecoration: 'none'
        }}>
        LOGO
      </Typography>
      <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
        {pages.map((page) => (
          <Button
            key={page.name}
            onClick={handleCloseNavMenu}
            component={Link}
            to={page.path}
            sx={{ my: 2, color: 'white', display: 'block' }}>
            {page.name}
          </Button>
        ))}
      </Box>
    </>
  );
};

const ResponsiveAppBar = () => {
  const [userProfile, setUserProfile] = useRecoilState(userProfileAtom);

  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <ResponsiveNavMenu />
          <Box sx={{ flexGrow: 0, pr: 1 }}>
            <ShopCart />
          </Box>
          <Box sx={{ flexGrow: 0 }}>{userProfile ? <UserProfileMenu /> : <RegisterMenu />}</Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};
export default ResponsiveAppBar;
