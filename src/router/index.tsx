import { createBrowserRouter } from 'react-router-dom';
import AdminEmployee from '../components/AdminComponents/Employee';
import AdminProducts from '../components/AdminComponents/Products';
import AdminUsers from '../components/AdminComponents/Users';
import BoardModerator from '../components/BoardModerator';
import BoardUser from '../components/BoardUser';
import Home from '../components/Home';
import Register from '../components/Register';
import AdminLayout from '../layouts/AdminLayout';
import UserLayout from '../layouts/UserLayout';
import Login from '../pages/Login';

const router = createBrowserRouter([
  {
    path: '/',
    element: <UserLayout />,
    children: [
      { path: 'login', element: <Login /> },
      { path: 'register', element: <Register /> },
      { path: 'profile', element: <BoardUser /> },
      { path: 'mod', element: <BoardModerator /> },
      { path: 'home', element: <Home /> }
    ]
  },
  {
    path: '/admin',
    element: <AdminLayout />,
    children: [
      { path: 'users', element: <AdminUsers /> },
      { path: 'employee', element: <AdminEmployee /> },
      { path: 'product', element: <AdminProducts /> }
    ]
  }
]);

export default router;
