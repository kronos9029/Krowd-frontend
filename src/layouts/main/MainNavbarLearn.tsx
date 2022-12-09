import { Link as RouterLink, useLocation, useNavigate } from 'react-router-dom';
// material
import { styled } from '@mui/material/styles';
import {
  Box,
  Button,
  AppBar,
  Toolbar,
  Container,
  Link,
  MenuItem,
  Menu,
  IconButton
} from '@mui/material';
// hooks
import useOffSetTop from '../../hooks/useOffSetTop';
// components
import Logo from '../../components/Logo';
import Label from '../../components/Label';
import { MHidden } from '../../components/@material-extend';
//
import i18next from 'i18next';
import cookies from 'js-cookie';
import { useTranslation } from 'react-i18next';
import React, { useEffect, useRef, useState } from 'react';
import useAuth from 'hooks/useAuth';
import useIsMountedRef from 'hooks/useIsMountedRef';
import { useSnackbar } from 'notistack';
import { PATH_AUTH, PATH_DASHBOARD, PATH_PAGE } from 'routes/paths';
import { Icon } from '@iconify/react';
import menu2Fill from '@iconify/icons-eva/menu-2-fill';
import MenuDesktop from './MenuDesktop';
import navConfig from './MenuConfig';

// ----------------------------------------------------------------------

const APP_BAR_MOBILE = 64;
const APP_BAR_DESKTOP = 88;

const ToolbarStyle = styled(Toolbar)(({ theme }) => ({
  height: APP_BAR_MOBILE,
  transition: theme.transitions.create(['height', 'background-color'], {
    easing: theme.transitions.easing.easeInOut,
    duration: theme.transitions.duration.shorter
  }),
  [theme.breakpoints.up('md')]: {
    height: APP_BAR_DESKTOP
  }
}));

const ToolbarShadowStyle = styled('div')(({ theme }) => ({
  left: 0,
  right: 0,
  bottom: 0,
  height: 24,
  zIndex: -1,
  margin: 'auto',
  borderRadius: '50%',
  position: 'absolute',
  width: `calc(100% - 48px)`,
  boxShadow: theme.customShadows.z8
}));

// ----------------------------------------------------------------------

export type MenuItemProps = {
  title: string;
  path: string;
  icon?: JSX.Element;
  to?: string;
  children?: {
    subheader: string;
    items: {
      title: string;
      path: string;
    }[];
  }[];
};

export type MenuProps = {
  isOffset: boolean;
  isHome: boolean;
  navConfig: MenuItemProps[];
};
const Language = [
  {
    code: 'vi',
    name: 'Tiếng việt',
    countryCode: 'vn'
  },
  {
    code: 'en',
    name: 'English',
    countryCode: 'en'
  }
];

type DashboardNavbarProps = {
  onOpenSidebar: VoidFunction;
};
export default function MainNavbarLearn({ onOpenSidebar }: DashboardNavbarProps) {
  const isOffset = useOffSetTop(-1);
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const isMountedRef = useIsMountedRef();
  const { enqueueSnackbar } = useSnackbar();
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleLogout = async () => {
    try {
      await logout?.();
      if (isMountedRef.current) {
        navigate('/');
      }
    } catch (error) {
      console.error(error);
      enqueueSnackbar('Unable to logout', { variant: 'error' });
    }
  };
  const isHome = pathname === '/';
  const initialLanguage = cookies.get('i18next') || 'vi';
  const [currentLanguage, setCurrentLanguage] = useState('');
  const { t } = useTranslation();

  useEffect(() => {
    setCurrentLanguage(initialLanguage);
    localStorage.setItem('i18nextLng', initialLanguage);
  });

  const setLanguage = (newLang: string) => {
    localStorage.setItem('i18nextLng', newLang);
    const current = localStorage.getItem('i18nextLng')!;
    i18next.changeLanguage(current);
    setCurrentLanguage(current);
    console.log(currentLanguage);
  };

  return (
    <AppBar
      sx={{
        boxShadow: 0,
        bgcolor: '#FFFFFF',
        position: 'absolute'
      }}
    >
      <ToolbarStyle
        disableGutters
        sx={{
          ...(isOffset && {
            bgcolor: 'background.default',
            height: { md: APP_BAR_DESKTOP - 16 }
          })
        }}
      >
        <Container
          maxWidth="lg"
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between'
          }}
        >
          <RouterLink to="/">
            <Logo />
          </RouterLink>
          <Label
            sx={{
              ml: 1,
              color: '#14b7cc',
              backgroundColor: '#fff',
              textTransform: 'uppercase',
              fontSize: '1.25rem'
            }}
          >
            Krowd
          </Label>
          <Box sx={{ flexGrow: 1.4 }} />
          <MenuDesktop
            isOffset={isOffset}
            isHome={isHome}
            navConfig={currentLanguage === 'vi' ? navConfig.vi : navConfig.en}
          />
          <MHidden width="mdDown">
            {(user && (
              <>
                <Button
                  sx={{ marginRight: '23px' }}
                  id="basic-button"
                  aria-controls={open ? 'basic-menu' : undefined}
                  aria-haspopup="true"
                  aria-expanded={open ? 'true' : undefined}
                  onClick={handleClick}
                  variant="contained"
                >
                  {user?.fullName}{' '}
                </Button>
                <Menu
                  id="basic-menu"
                  anchorEl={anchorEl}
                  open={open}
                  onClose={handleClose}
                  MenuListProps={{
                    'aria-labelledby': 'basic-button'
                  }}
                >
                  <MenuItem component={Link} href={'/'}>
                    {t(`mainNavbar_menu_item.mainNavbar_landing`)}
                  </MenuItem>
                  <MenuItem component={Link} href={PATH_DASHBOARD.user.account}>
                    {t(`mainNavbar_menu_item.mainNavbar_menu_item_profile`)}
                  </MenuItem>
                  <MenuItem component={Link} href={PATH_DASHBOARD.general.banking}>
                    {t(`mainNavbar_menu_item.mainNavbar_menu_item_console`)}
                  </MenuItem>
                  <MenuItem component={Link} href={PATH_PAGE.pageTopUp}>
                    {t(`mainNavbar_menu_item.mainNavbar_menu_item_wallet`)}
                  </MenuItem>
                  <MenuItem onClick={handleLogout}>
                    {t(`mainNavbar_menu_item.mainNavbar_menu_item_logout`)}
                  </MenuItem>
                </Menu>
              </>
            )) || (
              <Button
                sx={{
                  marginRight: '23px',
                  bgcolor: 'rgb(255, 127, 80)',
                  '&:hover': {
                    bgcolor: 'rgb(255, 127, 80)',
                    color: '#ffffff'
                  }
                }}
                size="medium"
                variant="contained"
                href={PATH_AUTH.login}
              >
                {t('Navbar_login')}
              </Button>
            )}
            {/* <div className="language-select">
              <div className="d-flex justify-content-end align-items-center language-select-root">
                <div className="dropdown">
                  <button
                    className="btn btn-link dropdown-toggle"
                    type="button"
                    id="dropdownMenuButton1"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                    style={{
                      color: '#14b7cc',
                      textDecoration: 'solid',
                      paddingRight: '1rem'
                    }}
                  >
                    <GlobeIcon />
                    {t('language')}
                  </button>
                  <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton1">
                    {Language.map(({ code, name, countryCode }) => {
                      return (
                        <li key={countryCode}>
                          <Link
                            underline="none"
                            sx={{ cursor: 'pointer' }}
                            className={classNames('dropdown-item', {
                              disabled: currentLanguage === code
                            })}
                            onClick={() => setLanguage(code)}
                          >
                            <span
                              className={`/static/icons/ic_flag_${countryCode}.svg`}
                              style={{
                                opacity: currentLanguage === code ? 0.5 : 1
                              }}
                            >
                              <img src={`/static/icons/ic_flag_${countryCode}.svg`} />
                            </span>
                            {name}
                          </Link>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              </div>
            </div> */}
          </MHidden>
          <MHidden width="lgUp">
            <IconButton onClick={onOpenSidebar} sx={{ mr: 1, color: 'text.primary' }}>
              <Icon icon={menu2Fill} />
            </IconButton>
          </MHidden>
        </Container>
      </ToolbarStyle>

      {isOffset && <ToolbarShadowStyle />}
    </AppBar>
  );
}
