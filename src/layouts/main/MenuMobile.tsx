import { Icon } from '@iconify/react';
import menu2Fill from '@iconify/icons-eva/menu-2-fill';
import { NavLink as RouterLink, useLocation, useNavigate } from 'react-router-dom';
import arrowIosForwardFill from '@iconify/icons-eva/arrow-ios-forward-fill';
import arrowIosDownwardFill from '@iconify/icons-eva/arrow-ios-downward-fill';
// material
import classNames from 'classnames';
import React, { useEffect, useRef, useState, ReactNode } from 'react';

import i18next from 'i18next';
import cookies from 'js-cookie';
import { useTranslation } from 'react-i18next';
import { alpha, styled } from '@mui/material/styles';
import {
  Box,
  List,
  Link,
  Drawer,
  Collapse,
  LinkProps,
  ListItemText,
  ListItemIcon,
  ListItemButton,
  ListItemButtonProps,
  Button,
  FormControl,
  Select,
  Typography,
  MenuItem,
  Menu
} from '@mui/material';
// components
import Logo from '../../components/Logo';
import NavSection from '../../components/NavSection';
import Scrollbar from '../../components/Scrollbar';
import { MIconButton } from '../../components/@material-extend';
//
import { MenuProps, MenuItemProps } from './MainNavbar';
import useAuth from 'hooks/useAuth';
import useIsMountedRef from 'hooks/useIsMountedRef';
import { useSnackbar } from 'notistack';
import { PATH_AUTH, PATH_DASHBOARD } from 'routes/paths';

// ----------------------------------------------------------------------

const ICON_SIZE = 22;
const ITEM_SIZE = 48;
const PADDING = 2.5;

type StyleProps = LinkProps & ListItemButtonProps;

interface ListItemStyleProps extends StyleProps {
  component?: ReactNode;
  to?: string;
  end?: boolean;
}

const ListItemStyle = styled(ListItemButton)<ListItemStyleProps>(({ theme }) => ({
  ...theme.typography.body2,
  height: ITEM_SIZE,
  textTransform: 'capitalize',
  paddingLeft: theme.spacing(PADDING),
  paddingRight: theme.spacing(2.5),
  color: theme.palette.text.secondary
}));

// ----------------------------------------------------------------------

type MenuMobileItemProps = {
  item: MenuItemProps;
  isOpen: boolean;
  onOpen: VoidFunction;
};
const GlobeIcon = ({ width = 24, height = 24 }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={width}
    height={height}
    fill="currentColor"
    className="bi bi-globe"
    viewBox="0 0 16 16"
    color="#14b7cc"
    style={{ marginRight: '3px' }}
  >
    <path d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8zm7.5-6.923c-.67.204-1.335.82-1.887 1.855A7.97 7.97 0 0 0 5.145 4H7.5V1.077zM4.09 4a9.267 9.267 0 0 1 .64-1.539 6.7 6.7 0 0 1 .597-.933A7.025 7.025 0 0 0 2.255 4H4.09zm-.582 3.5c.03-.877.138-1.718.312-2.5H1.674a6.958 6.958 0 0 0-.656 2.5h2.49zM4.847 5a12.5 12.5 0 0 0-.338 2.5H7.5V5H4.847zM8.5 5v2.5h2.99a12.495 12.495 0 0 0-.337-2.5H8.5zM4.51 8.5a12.5 12.5 0 0 0 .337 2.5H7.5V8.5H4.51zm3.99 0V11h2.653c.187-.765.306-1.608.338-2.5H8.5zM5.145 12c.138.386.295.744.468 1.068.552 1.035 1.218 1.65 1.887 1.855V12H5.145zm.182 2.472a6.696 6.696 0 0 1-.597-.933A9.268 9.268 0 0 1 4.09 12H2.255a7.024 7.024 0 0 0 3.072 2.472zM3.82 11a13.652 13.652 0 0 1-.312-2.5h-2.49c.062.89.291 1.733.656 2.5H3.82zm6.853 3.472A7.024 7.024 0 0 0 13.745 12H11.91a9.27 9.27 0 0 1-.64 1.539 6.688 6.688 0 0 1-.597.933zM8.5 12v2.923c.67-.204 1.335-.82 1.887-1.855.173-.324.33-.682.468-1.068H8.5zm3.68-1h2.146c.365-.767.594-1.61.656-2.5h-2.49a13.65 13.65 0 0 1-.312 2.5zm2.802-3.5a6.959 6.959 0 0 0-.656-2.5H12.18c.174.782.282 1.623.312 2.5h2.49zM11.27 2.461c.247.464.462.98.64 1.539h1.835a7.024 7.024 0 0 0-3.072-2.472c.218.284.418.598.597.933zM10.855 4a7.966 7.966 0 0 0-.468-1.068C9.835 1.897 9.17 1.282 8.5 1.077V4h2.355z" />
  </svg>
);

function MenuMobileItem({ item, isOpen, onOpen }: MenuMobileItemProps) {
  const { title, path, icon, children } = item;

  if (children) {
    return (
      <>
        <ListItemStyle onClick={onOpen}>
          <ListItemIcon>{icon}</ListItemIcon>
          <ListItemText disableTypography primary={title} />
          <Box
            component={Icon}
            icon={isOpen ? arrowIosDownwardFill : arrowIosForwardFill}
            sx={{ width: 16, height: 16, ml: 1 }}
          />
        </ListItemStyle>

        <Collapse in={isOpen} timeout="auto" unmountOnExit>
          <Box sx={{ display: 'flex', flexDirection: 'column-reverse' }}>
            <NavSection
              navConfig={children}
              sx={{
                '& .MuiList-root:last-of-type .MuiListItemButton-root': {
                  height: 200,
                  backgroundSize: '92%',
                  backgroundPosition: 'center',
                  bgcolor: 'background.neutral',
                  backgroundRepeat: 'no-repeat',
                  backgroundImage: 'url(/static/illustrations/illustration_dashboard.png)',
                  '& > *:not(.MuiTouchRipple-root)': { display: 'none' }
                },
                '& .MuiListSubheader-root': {
                  pl: PADDING,
                  display: 'flex',
                  alignItems: 'center',
                  '&:before': {
                    ml: '6px',
                    mr: '22px',
                    width: 8,
                    height: 2,
                    content: "''",
                    borderRadius: 2,
                    bgcolor: '#14b7cc'
                  }
                },
                '& .MuiListItemButton-root': {
                  pl: PADDING,
                  '&:before': { display: 'none' },
                  '&.active': { color: 'primary.main', bgcolor: 'transparent' }
                },
                '& .MuiListItemIcon-root': {
                  width: ICON_SIZE,
                  height: ICON_SIZE,
                  '&:before': {
                    width: 4,
                    height: 4,
                    content: "''",
                    borderRadius: '50%',
                    bgcolor: '#ff7f50'
                  }
                }
              }}
            />
          </Box>
        </Collapse>
      </>
    );
  }

  if (title === 'Documentation') {
    return (
      <ListItemStyle href={path} target="_blank" component={Link}>
        <ListItemIcon>{icon}</ListItemIcon>
        <ListItemText disableTypography primary={title} />
      </ListItemStyle>
    );
  }

  return (
    <ListItemStyle
      to={path}
      component={RouterLink}
      end={path === '/'}
      sx={{
        '&.active': {
          color: 'primary.main',
          fontWeight: 'fontWeightMedium',
          bgcolor: (theme) =>
            alpha(theme.palette.primary.main, theme.palette.action.selectedOpacity)
        }
      }}
    >
      <ListItemIcon>{icon}</ListItemIcon>
      <ListItemText disableTypography primary={title} />
    </ListItemStyle>
  );
}
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
export default function MenuMobile({ isOffset, isHome, navConfig }: MenuProps) {
  const { pathname } = useLocation();
  const [open, setOpen] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const currentLanguageCode = cookies.get('i18next') || 'en';
  const currentLanguage = Language.find((l) => l.code === currentLanguageCode);
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open1 = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const isMountedRef = useIsMountedRef();
  const { enqueueSnackbar } = useSnackbar();
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
  useEffect(() => {
    if (drawerOpen) {
      handleDrawerClose();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  const handleOpen = () => {
    setOpen(!open);
  };

  const handleDrawerOpen = () => {
    setDrawerOpen(true);
  };

  const handleDrawerClose = () => {
    setDrawerOpen(false);
  };

  return (
    <>
      <MIconButton
        onClick={handleDrawerOpen}
        sx={{
          ml: 1,
          ...(isHome && { color: 'common.white' }),
          ...(isOffset && { color: 'text.primary' })
        }}
      >
        <Icon icon={menu2Fill} />
      </MIconButton>

      <Drawer
        open={drawerOpen}
        onClose={handleDrawerClose}
        ModalProps={{ keepMounted: true }}
        PaperProps={{ sx: { pb: 5, width: 260 } }}
      >
        <Scrollbar>
          <Link component={RouterLink} to="/" sx={{ display: 'inline-flex' }}>
            <Logo sx={{ mx: PADDING, my: 3 }} />
          </Link>

          <List disablePadding>
            {navConfig.map((link) => (
              <MenuMobileItem key={link.title} item={link} isOpen={open} onOpen={handleOpen} />
            ))}
          </List>
          <Box sx={{ my: 1 }}>
            <div className="language-select">
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
                      marginRight: '7rem'
                    }}
                  >
                    <GlobeIcon />
                    {t('language')}
                  </button>
                  <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton1">
                    {Language.map(({ code, name, countryCode }) => (
                      <li key={countryCode}>
                        <a
                          href="#"
                          className={classNames('dropdown-item', {
                            disabled: currentLanguageCode === code
                          })}
                          onClick={() => {
                            i18next.changeLanguage(code);
                            localStorage.setItem('i18nextLng', code);
                          }}
                        >
                          <span
                            className={`/static/icons/ic_flag_${countryCode}.svg`}
                            style={{
                              opacity: currentLanguageCode === code ? 0.5 : 1
                            }}
                          >
                            <img src={`/static/icons/ic_flag_${countryCode}.svg`} />
                          </span>
                          {/* <img src="/static/icons/ic_flag_${countryCode}.svg mx-2" /> */}
                          {name}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </Box>
          {(user && (
            <>
              <Button
                fullWidth
                sx={{ my: 2 }}
                id="basic-button"
                aria-controls={open1 ? 'basic-menu' : undefined}
                aria-haspopup="true"
                aria-expanded={open1 ? 'true' : undefined}
                onClick={handleClick}
                variant="contained"
              >
                {user?.fullName}
              </Button>
              <Menu
                id="basic-menu"
                anchorEl={anchorEl}
                open={open1}
                onClose={handleClose}
                MenuListProps={{
                  'aria-labelledby': 'basic-button'
                }}
              >
                <MenuItem component={Link} href={PATH_DASHBOARD.user.account}>
                  {t(`mainNavbar_menu_item.mainNavbar_menu_item_profile`)}
                </MenuItem>
                <MenuItem component={Link} href={PATH_DASHBOARD.general.banking}>
                  {t(`mainNavbar_menu_item.mainNavbar_menu_item_console`)}
                </MenuItem>
                <MenuItem onClick={handleLogout}>
                  {t(`mainNavbar_menu_item.mainNavbar_menu_item_logout`)}
                </MenuItem>
              </Menu>
            </>
          )) || (
            <Button
              sx={{
                marginRight: '1rem',
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
        </Scrollbar>
      </Drawer>
    </>
  );
}
