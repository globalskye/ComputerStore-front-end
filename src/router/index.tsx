import { createBrowserRouter } from 'react-router-dom';
import AdminEmployee from '../components/AdminComponents/Employee';
import AdminProducts from '../components/AdminComponents/Products';
import AdminUsers from '../components/AdminComponents/Users';
import BoardModerator from '../components/BoardModerator';
import BoardUser from '../components/BoardUser';
import Home from '../components/Home';
import Register from '../components/Register';
import Login from '../pages/Login';
import Root from '../pages/Root';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Root />,
    children: [
      {
        path: 'admin',
        children: [
          { path: 'users', element: <AdminUsers /> },
          { path: 'employee', element: <AdminEmployee /> },
          { path: 'product', element: <AdminProducts /> }
        ]
      },
      { path: 'home', element: <Home /> },
      { path: 'login', element: <Login /> },
      { path: 'register', element: <Register /> },
      { path: 'profile', element: <BoardUser /> },
      { path: 'mod', element: <BoardModerator /> }
    ]
  }
]);

export default router;
