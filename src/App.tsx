import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import { useState, useEffect } from 'react';
import { Container } from 'react-bootstrap';
import { Routes, Route, Link } from 'react-router-dom';
import './App.css';
import EventBus from './common/EventBus';
import AdminEmployee from './components/AdminComponents/Employee';
import AdminProducts from './components/AdminComponents/Products';
import AdminUsers from './components/AdminComponents/Users';
import BoardModerator from './components/BoardModerator';
import BoardUser from './components/BoardUser';
import Home from './components/Home';
import Login from './components/Login';
import Register from './components/Register';
import SidebarView from './components/SideBarView';
import * as AuthService from './services/auth.service';
import IUser from './types/user.type';

const App: React.FC = () => {
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
              <Routes>
                <Route path="/admin/users" element={<AdminUsers />} />
                <Route path="/admin/employee" element={<AdminEmployee />} />
                <Route path="/admin/product" element={<AdminProducts />} />
              </Routes>
            </Container>
          </div>
        </div>
      </>

      <nav className="navbar navbar-expand navbar-dark bg-dark">
        <Link to={'/'} className="navbar-brand">
          Course_Work
        </Link>
        <div className="navbar-nav mr-auto">
          <li className="nav-item">
            <Link to={'/home'} className="nav-link">
              Home
            </Link>
          </li>
          <li className="nav-item">
            <Link to={'/test'} className="nav-link">
              Test
            </Link>
          </li>

          {showModeratorBoard && (
            <li className="nav-item">
              <Link to={'/mod'} className="nav-link">
                Moderator Board
              </Link>
            </li>
          )}

          {currentUser && (
            <li className="nav-item">
              <Link to={'/user'} className="nav-link">
                User
              </Link>
            </li>
          )}
        </div>

        {currentUser ? (
          <div className="navbar-nav ml-auto">
            <li className="nav-item"></li>
            <li className="nav-item">
              <a href="/login" className="nav-link" onClick={logOut}>
                LogOut
              </a>
            </li>
          </div>
        ) : (
          <div className="navbar-nav ml-auto">
            <li className="nav-item">
              <Link to={'/login'} className="nav-link">
                Login
              </Link>
            </li>

            <li className="nav-item">
              <Link to={'/register'} className="nav-link">
                Sign Up
              </Link>
            </li>
          </div>
        )}
      </nav>

      <div className="container mt-3">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/home" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/user" element={<BoardUser />} />
          <Route path="/mod" element={<BoardModerator />} />
        </Routes>
      </div>
    </div>
  );
};

export default App;
