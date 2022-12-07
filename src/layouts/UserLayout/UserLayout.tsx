import { useRecoilState, useResetRecoilState } from 'recoil';
import { useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { Toolbar } from '@mui/material';
import { Box } from '@mui/system';
import { userProfileAtom } from '../../atoms';
import ResponsiveAppBar from '../../components/organisms/ResponsiveAppBar/ResponsiveAppBar';
import { AuthService } from '../../services';

const UserLayout = () => {
  const navigate = useNavigate();
  const [userProfile, setUserProfile] = useRecoilState(userProfileAtom);
  const resetUserProfile = useResetRecoilState(userProfileAtom);

  useEffect(() => {
    const user = AuthService.getCurrentUser();
    if (user) {
      setUserProfile(user);
    } else {
      resetUserProfile();
      navigate('/login');
    }
  }, []);

  return (
    <>
      <ResponsiveAppBar />
      <Box sx={{ p: 2, margin: 'auto' }}>
        <Outlet />
      </Box>
    </>
  );
};

export default UserLayout;
