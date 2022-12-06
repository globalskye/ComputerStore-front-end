import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import { useState, useEffect } from 'react';
import { Container } from 'react-bootstrap';
import { Outlet } from 'react-router-dom';
import EventBus from '../common/EventBus';
import SidebarView from '../components/SideBarView';
import * as AuthService from '../services/auth.service';
import AppBar from '../shared/molecules/AppBar';
import IUser from '../types/user.type';

const Rout: React.FC = () => {
  const [showModeratorBoard, setShowModeratorBoard] = useState<boolean>(false);
  const [showAdminBoard, setShowAdminBoard] = useState<boolean>(false);
  const [currentUser, setCurrentUser] = useState<IUser | undefined>(undefined);

  useEffect(() => {
    const user = AuthService.getCurrentUser();

    if (user) {
      setCurrentUser(user);
      //setShowModeratorBoard(user.roles.includes("ROLE_MODERATOR"));
      //setShowAdminBoard(user.roles.includes("ROLE_ADMIN"));
    }

    EventBus.on('logout', logOut);

    return () => {
      EventBus.remove('logout', logOut);
    };
  }, []);

  const logOut = () => {
    AuthService.logout();
    setShowModeratorBoard(false);
    setShowAdminBoard(false);
    setCurrentUser(undefined);
  };

  return (
    <div>
      <>
        <div className="row">
          <div className="col-auto">
            <SidebarView></SidebarView>
          </div>

          <div className="col" style={{ margin: '1%', backgroundColor: '#E3DAD8' }}>
            <Container style={{ marginTop: '2%' }}>
              <AppBar
                currentUser={currentUser}
                logOut={logOut}
                showModeratorBoard={showModeratorBoard}
              />
              <Outlet />
            </Container>
          </div>
        </div>
      </>
    </div>
  );
};

export default Rout;
