import { Link } from 'react-router-dom';
import IUser from '../../../types/user';

const AppBar = ({
  showModeratorBoard,
  currentUser,
  logOut
}: {
  showModeratorBoard: boolean;
  currentUser?: IUser;
  logOut: () => void;
}) => {
  return (
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
  );
};

export default AppBar;
