import { Link as RouterLink, useLocation, useNavigate } from 'react-router-dom';
// material
import { styled } from '@mui/material/styles';
import {
  Box,
  Button,
  AppBar,
  Toolbar,
  Container,
  Typography,
  Link,
  Select,
  FormControl,
  MenuItem,
  Menu
} from '@mui/material';
// hooks
import useOffSetTop from '../../hooks/useOffSetTop';
// components
import Logo from '../../components/Logo';
import Label from '../../components/Label';
import { MHidden, MIconButton } from '../../components/@material-extend';
//
import MenuDesktop from './MenuDesktop';
import MenuMobile from './MenuMobile';
import navConfig from './MenuConfig';
import i18next from 'i18next';
import cookies from 'js-cookie';
import { useTranslation } from 'react-i18next';
import React, { useEffect, useRef, useState } from 'react';
import classNames from 'classnames';
import useAuth from 'hooks/useAuth';
import useIsMountedRef from 'hooks/useIsMountedRef';
import { useSnackbar } from 'notistack';
import { PATH_AUTH, PATH_DASHBOARD, PATH_PAGE } from 'routes/paths';
import useLocales from 'hooks/useLocales';

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
// const GlobeIcon = ({ width = 24, height = 24 }) => (
//   <svg
//     xmlns="http://www.w3.org/2000/svg"
//     width={width}
//     height={height}
//     fill="currentColor"
//     className="bi bi-globe"
//     viewBox="0 0 16 16"
//     color="#14b7cc"
//     style={{ marginRight: '3px' }}
//   >
//     <path d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8zm7.5-6.923c-.67.204-1.335.82-1.887 1.855A7.97 7.97 0 0 0 5.145 4H7.5V1.077zM4.09 4a9.267 9.267 0 0 1 .64-1.539 6.7 6.7 0 0 1 .597-.933A7.025 7.025 0 0 0 2.255 4H4.09zm-.582 3.5c.03-.877.138-1.718.312-2.5H1.674a6.958 6.958 0 0 0-.656 2.5h2.49zM4.847 5a12.5 12.5 0 0 0-.338 2.5H7.5V5H4.847zM8.5 5v2.5h2.99a12.495 12.495 0 0 0-.337-2.5H8.5zM4.51 8.5a12.5 12.5 0 0 0 .337 2.5H7.5V8.5H4.51zm3.99 0V11h2.653c.187-.765.306-1.608.338-2.5H8.5zM5.145 12c.138.386.295.744.468 1.068.552 1.035 1.218 1.65 1.887 1.855V12H5.145zm.182 2.472a6.696 6.696 0 0 1-.597-.933A9.268 9.268 0 0 1 4.09 12H2.255a7.024 7.024 0 0 0 3.072 2.472zM3.82 11a13.652 13.652 0 0 1-.312-2.5h-2.49c.062.89.291 1.733.656 2.5H3.82zm6.853 3.472A7.024 7.024 0 0 0 13.745 12H11.91a9.27 9.27 0 0 1-.64 1.539 6.688 6.688 0 0 1-.597.933zM8.5 12v2.923c.67-.204 1.335-.82 1.887-1.855.173-.324.33-.682.468-1.068H8.5zm3.68-1h2.146c.365-.767.594-1.61.656-2.5h-2.49a13.65 13.65 0 0 1-.312 2.5zm2.802-3.5a6.959 6.959 0 0 0-.656-2.5H12.18c.174.782.282 1.623.312 2.5h2.49zM11.27 2.461c.247.464.462.98.64 1.539h1.835a7.024 7.024 0 0 0-3.072-2.472c.218.284.418.598.597.933zM10.855 4a7.966 7.966 0 0 0-.468-1.068C9.835 1.897 9.17 1.282 8.5 1.077V4h2.355z" />
//   </svg>
// );
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
export default function MainNavbar() {
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

  // const setLanguage = (newLang: string) => {
  //   localStorage.setItem('i18nextLng', newLang);
  //   const current = localStorage.getItem('i18nextLng')!;
  //   i18next.changeLanguage(current);
  //   setCurrentLanguage(current);
  //   console.log(currentLanguage);
  // };

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

          <MHidden width="mdDown">
            <MenuDesktop
              isOffset={isOffset}
              isHome={isHome}
              navConfig={currentLanguage === 'vi' ? navConfig.vi : navConfig.en}
            />

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
                  bgcolor: 'rgb(255, 127, 80)',
                  '&:hover': {
                    bgcolor: 'rgb(255, 127, 80)',
                    color: '#ffffff'
                  }
                }}
                size={'medium'}
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
          <MHidden width="mdUp">
            <MenuMobile
              isOffset={isOffset}
              isHome={isHome}
              navConfig={currentLanguage === 'vi' ? navConfig.vi : navConfig.en}
            />
          </MHidden>
        </Container>
      </ToolbarStyle>

      {isOffset && <ToolbarShadowStyle />}
    </AppBar>
  );
}
