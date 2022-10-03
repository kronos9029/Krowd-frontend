import { Icon } from '@iconify/react';
import { useSnackbar } from 'notistack';
import { useRef, useState } from 'react';
import homeFill from '@iconify/icons-eva/home-fill';
import personFill from '@iconify/icons-eva/person-fill';
import projectIcon from '@iconify/icons-ant-design/account-book';
// import walletIcon from '@iconify/icons-ant-design/wallet-outline';
import walletIcon from '@iconify/icons-ant-design/wallet-fill';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
// material
import { alpha } from '@mui/material/styles';
import { Button, Box, Divider, MenuItem, Typography } from '@mui/material';
// routes
import { PATH_DASHBOARD, PATH_PAGE } from '../../routes/paths';
// hooks
import useAuth from '../../hooks/useAuth';
import useIsMountedRef from '../../hooks/useIsMountedRef';
// components
import { MIconButton } from '../../components/@material-extend';
import MyAvatar from '../../components/MyAvatar';
import MenuPopover from '../../components/MenuPopover';
import MainNavbar from 'layouts/main/MainNavbar';

// ----------------------------------------------------------------------

const MENU_OPTIONS = [
  {
    label: 'Trang chủ',
    icon: homeFill,
    linkTo: '/'
  },
  {
    label: 'Dự án của bạn',
    icon: projectIcon,
    linkTo: PATH_DASHBOARD.userKrowd.list
  },
  {
    label: 'Thông tin cá nhân',
    icon: personFill,
    linkTo: PATH_DASHBOARD.user.account
  },
  {
    label: 'Nạp tiền vào ví',
    icon: walletIcon,
    linkTo: PATH_PAGE.pageTopUp
  }
];

// ----------------------------------------------------------------------

export default function AccountPopover() {
  const navigate = useNavigate();
  const anchorRef = useRef(null);
  const { user, logout } = useAuth();
  const isMountedRef = useIsMountedRef();
  const { enqueueSnackbar } = useSnackbar();
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const handleLogout = async () => {
    try {
      await logout?.();
      if (isMountedRef.current) {
        navigate('/');
        handleClose();
      }
    } catch (error) {
      console.error(error);
      enqueueSnackbar('Unable to logout', { variant: 'error' });
    }
  };

  return (
    <>
      <MIconButton
        ref={anchorRef}
        onClick={handleOpen}
        sx={{
          padding: 0,
          width: 44,
          height: 44,
          ...(open && {
            '&:before': {
              zIndex: 1,
              content: "''",
              width: '100%',
              height: '100%',
              borderRadius: '50%',
              position: 'absolute',
              bgcolor: (theme) => alpha(theme.palette.grey[900], 0.72)
            }
          })
        }}
      ></MIconButton>
      <MainNavbar />
    </>
  );
}
