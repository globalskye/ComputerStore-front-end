import * as React from 'react';
import BadgeIcon from '@mui/icons-material/Badge';
import Inventory2Icon from '@mui/icons-material/Inventory2';
import PersonIcon from '@mui/icons-material/Person';
import SettingsIcon from '@mui/icons-material/Settings';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { MenuItem } from '../../components/organisms/SideBar';

export const menuItems: MenuItem[] = [
  {
    name: 'Tables',
    path: '/admin',
    subItems: [
      {
        name: 'Users',
        icon: <PersonIcon />,
        path: '/admin/users'
      },
      {
        name: 'Products',
        icon: <Inventory2Icon />,
        path: '/admin/products'
      },
      // {
      //   name: 'Orders',
      //   icon: <ShoppingCartIcon />,
      //   path: '/admin/orders'
      // },
      {
        name: 'Employee',
        icon: <BadgeIcon />,
        path: '/admin/employee'
      }
    ]
  }
  // {
  //   name: 'Settings',
  //   icon: <SettingsIcon />,
  //   path: '/admin/settings'
  // }
];
