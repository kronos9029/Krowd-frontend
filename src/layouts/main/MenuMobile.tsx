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
                <MenuItem component={Link} href={'/'}>
                  {t(`mainNavbar_menu_item.mainNavbar_landing`)}
                </MenuItem>
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
