import { noCase } from 'change-case';
import React, { useEffect, useRef, useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { Icon } from '@iconify/react';
import bellFill from '@iconify/icons-eva/bell-fill';
import clockFill from '@iconify/icons-eva/clock-fill';
import doneAllFill from '@iconify/icons-eva/done-all-fill';
// material
import {
  Box,
  List,
  Badge,
  Button,
  Avatar,
  Tooltip,
  Divider,
  Typography,
  ListItemText,
  ListSubheader,
  ListItemAvatar,
  ListItemButton
} from '@mui/material';
// utils
import { fToNow } from '../../utils/formatTime';
import mockData from '../../utils/mock-data';
// components
import Scrollbar from '../../components/Scrollbar';
import MenuPopover from '../../components/MenuPopover';
import { MIconButton } from '../../components/@material-extend';
import { dispatch, RootState, useSelector } from 'redux/store';
import { getNotification } from 'redux/slices/krowd_slices/user';
import Logo from 'components/Logo';

// ----------------------------------------------------------------------

const ITEM_HEIGHT = 64;

// ----------------------------------------------------------------------

type TNotificationPopover2 = {
  title: string;
  entityId: string;
  image: string;
  createDate: string;
  seen: boolean;
};

function renderContent(notification: TNotificationPopover2) {
  const title = (
    <Typography variant="subtitle2">
      {notification.title}
      {/* <Typography component="span" variant="body2" sx={{ color: 'text.secondary' }}>
        &nbsp; {noCase(notification.title)}
      </Typography> */}
    </Typography>
  );

  // if (notification.type === 'order_placed') {
  //   return {
  //     avatar: <img alt={notification.title} src="/static/icons/ic_notification_package.svg" />,
  //     title
  //   };
  // }
  // if (notification.type === 'order_shipped') {
  //   return {
  //     avatar: <img alt={notification.title} src="/static/icons/ic_notification_shipping.svg" />,
  //     title
  //   };
  // }
  // if (notification.type === 'mail') {
  //   return {
  //     avatar: <img alt={notification.title} src="/static/icons/ic_notification_mail.svg" />,
  //     title
  //   };
  // }
  // if (notification.type === 'chat_message') {
  //   return {
  //     avatar: <img alt={notification.title} src="/static/icons/ic_notification_chat.svg" />,
  //     title
  //   };
  // }
  return {
    avatar: notification.image ? <img alt={notification.title} src={notification.image} /> : null,
    title
  };
}

function NotificationItem({ notification }: { notification: TNotificationPopover2 }) {
  const { avatar, title } = renderContent(notification);

  return (
    <ListItemButton
      to="#"
      component={RouterLink}
      sx={{
        py: 1.5,
        px: 2.5,
        mt: '1px',
        ...(!notification.seen && {
          bgcolor: '#b5b5b559'
        })
      }}
    >
      <ListItemAvatar>
        {avatar ? (
          <Avatar sx={{ bgcolor: 'background.neutral' }}>{avatar}</Avatar>
        ) : (
          <Box sx={{ width: 40, height: 40 }}>
            <img src="/static/home/logo.png" />
          </Box>
        )}
      </ListItemAvatar>
      <ListItemText
        primary={title}
        secondary={
          <Typography
            variant="caption"
            sx={{
              mt: 0.5,
              display: 'flex',
              alignItems: 'center',
              color: 'text.disabled'
            }}
          >
            <Box component={Icon} icon={clockFill} sx={{ mr: 0.5, width: 16, height: 16 }} />
            {fToNow(notification.createDate)}
          </Typography>
        }
      />
    </ListItemButton>
  );
}

export default function NotificationsPopover() {
  const anchorRef = useRef(null);
  const [open, setOpen] = useState(false);

  const [seen, setSeen] = useState(false);
  const { NotificationDetailState } = useSelector((state: RootState) => state.userKrowd);
  const {
    isLoading,
    details,
    total: totalUserUnRead,
    new: newNotification
  } = NotificationDetailState;

  useEffect(() => {
    dispatch(getNotification(localStorage.getItem('userId') ?? '', seen));
  }, [dispatch, seen]);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleMarkAllAsRead = () => {
    dispatch(getNotification(localStorage.getItem('userId') ?? '', true));
  };

  return (
    <>
      <MIconButton
        ref={anchorRef}
        size="large"
        color={open ? 'primary' : 'default'}
        onClick={handleOpen}
      >
        <Badge badgeContent={newNotification} color="error">
          <Icon icon={bellFill} width={20} height={20} />
        </Badge>
      </MIconButton>

      <MenuPopover
        open={open}
        onClose={handleClose}
        anchorEl={anchorRef.current}
        sx={{ width: 420 }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', py: 2, px: 2.5 }}>
          <Box sx={{ flexGrow: 1 }}>
            <Typography variant="subtitle1">Thông báo ({totalUserUnRead})</Typography>
            {newNotification > 0 ? (
              <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                Bạn có <strong> {newNotification}</strong> thông báo mới chưa đọc
              </Typography>
            ) : (
              <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                Bạn có đã xem tất cả tin trong ngày
              </Typography>
            )}
          </Box>

          {newNotification > 0 && (
            <Tooltip title="Đánh dấu đã đọc">
              <MIconButton onClick={handleMarkAllAsRead} color="primary">
                <Icon icon={doneAllFill} width={20} height={20} />
              </MIconButton>
            </Tooltip>
          )}
        </Box>

        <Divider />

        <Scrollbar sx={{ height: { xs: 340, sm: 'auto' } }}>
          <List
            disablePadding
            subheader={
              <ListSubheader disableSticky sx={{ py: 1, px: 2.5, typography: 'overline' }}>
                Thông báo mới
              </ListSubheader>
            }
          >
            <Scrollbar sx={{ height: ITEM_HEIGHT * 12 }}>
              {details.map((notification) => (
                <NotificationItem key={notification.entityId} notification={notification} />
              ))}
            </Scrollbar>
          </List>

          {/* <List
            disablePadding
            subheader={
              <ListSubheader disableSticky sx={{ py: 1, px: 2.5, typography: 'overline' }}>
                Thông báo đã xem
              </ListSubheader>
            }
          >
            <Scrollbar sx={{ height: ITEM_HEIGHT * 4 }}>
              {details.map((notification) => (
                <NotificationItem key={notification.entityId} notification={notification} />
              ))}
            </Scrollbar>
          </List> */}
        </Scrollbar>

        <Divider />
        {/* 
        <Box sx={{ p: 1 }}>
          <Button fullWidth disableRipple component={RouterLink} to="#">
            View All
          </Button>
        </Box> */}
      </MenuPopover>
    </>
  );
}
