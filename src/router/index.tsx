import { createBrowserRouter } from 'react-router-dom';
import AdminLayout from '../layouts/AdminLayout';
import UserLayout from '../layouts/UserLayout';
import ShopCart from '../pages/Cart';
import AdminEmployee from '../pages/Employee';
import Home from '../pages/Home';
import Login from '../pages/Login';
import AdminOrders from '../pages/Orders';
import AdminProducts from '../pages/Products';
import Register from '../pages/Register';
import AdminUsers from '../pages/Users';

const router = createBrowserRouter([
  {
    path: '/',
    element: <UserLayout />,
    children: [
      { path: 'login', element: <Login /> },
      { path: 'register', element: <Register /> },
      { path: 'shop-cart', element: <ShopCart /> },
      { path: 'home', element: <Home /> }
    ]
  },
  {
    path: '/admin',
    element: <AdminLayout />,
    children: [
      { path: 'orders', element: <AdminOrders /> },
      { path: 'users', element: <AdminUsers /> },
      { path: 'employee', element: <AdminEmployee /> },
      { path: 'products', element: <AdminProducts /> }
    ]
  }
]);

export default router;
