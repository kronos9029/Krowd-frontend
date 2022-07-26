import useAuth from 'hooks/useAuth';
import { Outlet } from 'react-router-dom';
// components
//
import MainFooter from './MainFooter';
import MainNavbar from './MainNavbar';
import MainNavbarLogin from './MainNavbarLogin';

// ----------------------------------------------------------------------

export default function MainLayout() {
  const { user } = useAuth();
  // if (user?.idToken === null) {
  //   return (
  //     <>
  //       <MainNavbar />
  //       <div>
  //         <Outlet />
  //       </div>
  //       <MainFooter />
  //     </>
  //   );
  // } else {
  return (
    <>
      <MainNavbar />
      <div>
        <Outlet />
      </div>
      <MainFooter />
    </>
  );
  // }
}
