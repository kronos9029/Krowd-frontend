import { Icon } from '@iconify/react';
import { capitalCase } from 'change-case';
import { useState, useEffect } from 'react';

import editFill from '@iconify/icons-eva/edit-fill';
import UserAccountForm from './UserAccountForm';
// material
import { Container, Tab, Box, Tabs, Button, CircularProgress, Typography } from '@mui/material';
// redux
import { RootState, useDispatch, useSelector } from '../../../redux/store';

// routes
import { PATH_DASHBOARD } from '../../../routes/paths';
// hooks
import useSettings from '../../../hooks/useSettings';
// components
import Page from '../../../components/Page';
import HeaderBreadcrumbs from '../../../components/HeaderBreadcrumbs';
import { AccountBilling, AccountGeneral } from '../../../components/_dashboard/user/account';
import cookies from 'js-cookie';
import { useTranslation } from 'react-i18next';
import { getUserKrowdDetail } from 'redux/slices/krowd_slices/investor';
import useAuth from 'hooks/useAuth';
// ----------------------------------------------------------------------
const Language = [
  {
    code: 'vi',
    name: 'English',
    countryCode: 'vi'
  },
  {
    code: 'en',
    name: 'Vietnamese',
    countryCode: 'en'
  }
];

export default function UserAccount() {
  const { themeStretch } = useSettings();
  const { user } = useAuth();
  const [open, setOpen] = useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };
  const { investorKrowdDetail: mainInvestor, isLoading } = useSelector(
    (state: RootState) => state.user_InvestorStateKrowd
  );

  const handleClose = () => {
    setOpen(false);
  };
  const currentLanguageCode = cookies.get('i18next') || 'en';
  const currentLanguage = Language.find((l) => l.code === currentLanguageCode);
  const { t } = useTranslation();

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getUserKrowdDetail(user?.id));
  }, [dispatch]);

  return (
    <Page title="Tài khoản người đầu tư | Krowd">
      <Container maxWidth={themeStretch ? false : 'lg'}>
        <HeaderBreadcrumbs
          heading="Tài khoản của bạn"
          links={[
            { name: 'Bảng điều khiển', href: PATH_DASHBOARD.root },
            { name: 'Quản lý tài khoản' }
          ]}
          action={
            <Button
              variant="contained"
              startIcon={<Icon icon={editFill} />}
              onClick={handleClickOpen}
              color="warning"
            >
              Cập nhật tài khoản
            </Button>
          }
        />
        {mainInvestor && <UserAccountForm user={mainInvestor} open={open} onClose={handleClose} />}
        {(isLoading && (
          <Box>
            <CircularProgress
              size={100}
              sx={{ margin: '0px auto', padding: '1rem', display: 'flex' }}
            />
            <Typography variant="h5" sx={{ textAlign: 'center', padding: '1rem' }}>
              Đang tải dữ liệu, vui lòng đợi giây lát...
            </Typography>
          </Box>
        )) ||
          (mainInvestor && <AccountGeneral investor={mainInvestor} />)}
      </Container>
    </Page>
  );
}
