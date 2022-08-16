import { Icon } from '@iconify/react';
import { capitalCase } from 'change-case';
import { useState, useEffect } from 'react';
import bellFill from '@iconify/icons-eva/bell-fill';
import shareFill from '@iconify/icons-eva/share-fill';
import roundVpnKey from '@iconify/icons-ic/round-vpn-key';
import roundReceipt from '@iconify/icons-ic/round-receipt';
import roundAccountBox from '@iconify/icons-ic/round-account-box';
import editFill from '@iconify/icons-eva/edit-fill';
import UserAccountForm from './UserAccountForm';
// material
import { Container, Tab, Box, Tabs, Button } from '@mui/material';
// redux
import { RootState, useDispatch, useSelector } from '../../../redux/store';
import {
  getCards,
  getProfile,
  getInvoices,
  getAddressBook,
  getNotifications
} from '../../../redux/slices/userKrowdrac';
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
  const [open, setOpen] = useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const currentLanguageCode = cookies.get('i18next') || 'en';
  const currentLanguage = Language.find((l) => l.code === currentLanguageCode);
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const { cards, invoices, myProfile, addressBook, notifications } = useSelector(
    (state: RootState) => state.user
  );

  const [currentTab, setCurrentTab] = useState(
    `${t(`dashboard_account_investor.dashboard_account_investor_general`)}`
  );

  useEffect(() => {
    dispatch(getCards());
    dispatch(getAddressBook());
    dispatch(getInvoices());
    dispatch(getNotifications());
    dispatch(getProfile());
  }, [dispatch]);

  if (!myProfile) {
    return null;
  }

  if (!cards) {
    return null;
  }

  if (!notifications) {
    return null;
  }

  const ACCOUNT_TABS = [
    {
      value: `${t(`dashboard_account_investor.dashboard_account_investor_general`)}`,
      icon: <Icon icon={roundAccountBox} width={20} height={20} />,
      component: <AccountGeneral />
    },
    {
      value: `${t(`dashboard_account_investor.dashboard_account_investor_billing`)}`,
      icon: <Icon icon={roundReceipt} width={20} height={20} />,
      component: <AccountBilling cards={cards} addressBook={addressBook} invoices={invoices} />
    }
  ];

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
        <UserAccountForm open={open} onClose={handleClose} />
        <Tabs
          value={currentTab}
          scrollButtons="auto"
          variant="scrollable"
          allowScrollButtonsMobile
          onChange={(e, value) => setCurrentTab(value)}
        >
          {ACCOUNT_TABS.map((tab) => (
            <Tab
              disableRipple
              key={tab.value}
              label={tab.value}
              icon={tab.icon}
              value={tab.value}
            />
          ))}
        </Tabs>

        <Box sx={{ mb: 5 }} />

        {ACCOUNT_TABS.map((tab) => {
          const isMatched = tab.value === currentTab;
          return isMatched && <Box key={tab.value}>{tab.component}</Box>;
        })}
      </Container>
    </Page>
  );
}
