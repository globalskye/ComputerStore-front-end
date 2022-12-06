import 'bootstrap/dist/css/bootstrap.min.css';
import { useRecoilState } from 'recoil';
import { useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import { userProfileAtom } from '../../atoms';
import ResponsiveAppBar from '../../components/organisms/ResponsiveAppBar/ResponsiveAppBar';
import { AuthService } from '../../services';

const UserLayout = () => {
  const [userProfile, setUserProfile] = useRecoilState(userProfileAtom);

  useEffect(() => {
    const user = AuthService.getCurrentUser();

    if (user) {
      setUserProfile(user);
    }
  }, []);

  return (
    <>
      <ResponsiveAppBar />
      <div className="row">
        <div className="col-10" style={{ backgroundColor: '#E3DAD8' }}>
          <Outlet />
        </div>
      </div>
    </>
  );
};

export default UserLayout;
