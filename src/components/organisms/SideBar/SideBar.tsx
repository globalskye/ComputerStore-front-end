import * as React from 'react';
import { Link } from 'react-router-dom';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import Box from '@mui/material/Box';
import Collapse from '@mui/material/Collapse';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import ListSubheader from '@mui/material/ListSubheader';
import Toolbar from '@mui/material/Toolbar';

export interface MenuItem {
  name: string;
  subItems?: MenuItem[];
  icon?: React.ReactNode;
  path: string;
}

const NestedMenu = ({ name, subItems }: { name: string; subItems: MenuItem[] }) => {
  const [open, setOpen] = React.useState(true);

  const handleClick = () => {
    setOpen(!open);
  };

  return (
    <Box sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
      <List
        component="nav"
        aria-labelledby="nested-list-subheader"
        subheader={
          <ListSubheader component="div" id="nested-list-subheader">
            {name}
          </ListSubheader>
        }>
        <ListItemButton onClick={handleClick}>
          <ListItemIcon>
            <InboxIcon />
          </ListItemIcon>
          <ListItemText primary="Tables" />
          {open ? <ExpandLess /> : <ExpandMore />}
        </ListItemButton>
        <Collapse in={open} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            {subItems.map((item) => {
              return (
                <ListItemButton sx={{ pl: 4 }} key={item.name} component={Link} to={item.path}>
                  <ListItemIcon>{item.icon}</ListItemIcon>
                  <ListItemText primary={item.name} />
                </ListItemButton>
              );
            })}
          </List>
        </Collapse>
      </List>
    </Box>
  );
};

export interface MenuItemsProps {
  menuItems: MenuItem[];
}

const MenuItems = ({ menuItems }: MenuItemsProps) => {
  return (
    <List
      sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}
      component="nav"
      aria-labelledby="nested-list-subheader">
      {menuItems.map((item) => {
        if (item.subItems) {
          return <NestedMenu key={item.name} name={item.name} subItems={item.subItems} />;
        } else {
          return (
            <ListItemButton key={item.name} component={Link} to={item.path}>
              <ListItemIcon>{item.icon}</ListItemIcon>
              <ListItemText primary={item.name} />
            </ListItemButton>
          );
        }
      })}
    </List>
  );
};

export interface SidebarProps {
  menuItems: MenuItem[];
}

export const Sidebar = ({ menuItems }: SidebarProps) => {
  return (
    <>
      <Toolbar />
      <Box sx={{ overflow: 'auto' }}>
        <MenuItems menuItems={menuItems} />
      </Box>
    </>
  );
};
