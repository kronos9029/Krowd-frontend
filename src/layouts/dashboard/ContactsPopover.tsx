import { Icon } from '@iconify/react';
import { useRef, useState, useCallback, useEffect } from 'react';
import nofication from '@iconify/icons-ic/notifications';
// material
import { alpha } from '@mui/material/styles';
import { Avatar, Typography, ListItemText, ListItemButton, ListItemAvatar } from '@mui/material';
// hooks
import useIsMountedRef from '../../hooks/useIsMountedRef';
// utils
import axios from '../../utils/axios';
import { fToNow } from '../../utils/formatTime';
// components
import Scrollbar from '../../components/Scrollbar';
import MenuPopover from '../../components/MenuPopover';
import BadgeStatus from '../../components/BadgeStatus';
import { MIconButton } from '../../components/@material-extend';
import { dispatch, RootState, useSelector } from 'redux/store';
import { getNotification } from 'redux/slices/krowd_slices/user';

// ----------------------------------------------------------------------

const ITEM_HEIGHT = 64;
const PADDING_ITEM = 2.5;

export default function ContactsPopover() {
  const anchorRef = useRef(null);
  const isMountedRef = useIsMountedRef();
  const [open, setOpen] = useState(false);
  const [seen, setSeen] = useState(false);
  const { NotificationDetailState } = useSelector((state: RootState) => state.userKrowd);
  const { isLoading, details, total, new: newNotification } = NotificationDetailState;

  useEffect(() => {
    dispatch(getNotification(localStorage.getItem('userId') ?? '', seen));
  }, [dispatch, seen]);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <MIconButton
        ref={anchorRef}
        size="large"
        color={open ? 'primary' : 'default'}
        onClick={handleOpen}
        sx={{
          ...(open && {
            bgcolor: (theme) => alpha(theme.palette.primary.main, theme.palette.action.focusOpacity)
          })
        }}
      >
        <Icon icon={nofication} width={20} height={20} />
        {newNotification && <Icon icon={nofication} width={20} height={20} />}
      </MIconButton>

      <MenuPopover
        open={open}
        onClose={handleClose}
        anchorEl={anchorRef.current}
        sx={{ width: 420 }}
      >
        <Typography variant="h6" sx={{ p: PADDING_ITEM }}>
          Thông báo gần đây <Typography component="span">({newNotification})</Typography>
        </Typography>

        <Scrollbar sx={{ height: ITEM_HEIGHT * 8 }}>
          {details.map((contact) => {
            const { entityId, createDate, image, seen, title } = contact;

            return (
              <ListItemButton key={entityId} sx={{ px: PADDING_ITEM, height: ITEM_HEIGHT }}>
                <ListItemAvatar sx={{ position: 'relative' }}>
                  <Avatar src={image} />
                  <BadgeStatus
                    status={seen === true ? 'Đã xem' : 'Mới'}
                    sx={{ position: 'absolute', right: 1, bottom: 1 }}
                  />
                </ListItemAvatar>
                <ListItemText
                  sx={{ py: 1, my: 1 }}
                  primaryTypographyProps={{ typography: 'subtitle2', mb: 0.25 }}
                  secondaryTypographyProps={{ typography: 'caption' }}
                  primary={title}
                  secondary={seen === true && fToNow(createDate)}
                />
              </ListItemButton>
            );
          })}
        </Scrollbar>
      </MenuPopover>
    </>
  );
}
