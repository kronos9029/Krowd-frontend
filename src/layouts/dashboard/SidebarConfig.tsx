// routes
import { PATH_DASHBOARD } from '../../routes/paths';
// components
import SvgIconStyle from '../../components/SvgIconStyle';

// ----------------------------------------------------------------------

const getIcon = (name: string) => (
  <SvgIconStyle src={`/static/icons/navbar/${name}.svg`} sx={{ width: '100%', height: '100%' }} />
);

const ICONS = {
  user: getIcon('ic_user'),
  wallet: getIcon('ic_wallet'),
  banking: getIcon('ic_banking'),
  analytics: getIcon('ic_analytics'),
  dashboard: getIcon('ic_dashboard'),
  krowd: getIcon('ic_krowd'),
  booking: getIcon('ic_booking'),
  project: getIcon('ic_project'),
  bankTransaction: getIcon('ic_bankTransaction'),
  transaction: getIcon('ic_transaction'),
  payment: getIcon('ic_payment'),
  walletTransaction: getIcon('ic_walletTransaction')
};

const sidebarConfig = [
  {
    subheader: 'Thống kê của bạn',
    items: [
      {
        title: 'app',
        path: PATH_DASHBOARD.general.app,
        icon: ICONS.krowd
      },
      // { title: 'Chung', path: PATH_DASHBOARD.general.analytics, icon: ICONS.analytics },
      { title: 'Ví của bạn', path: PATH_DASHBOARD.general.banking, icon: ICONS.wallet }
      // { title: 'Tổng quan ngày', path: PATH_DASHBOARD.general.booking, icon: ICONS.booking }
    ]
  },
  {
    subheader: 'Quản lý dự án ',
    items: [
      {
        title: 'Đang đầu tư',
        path: PATH_DASHBOARD.projectInvested.list,
        icon: ICONS.project
      }
      // { title: 'Giao dịch', path: PATH_DASHBOARD.projectInvested.list, icon: ICONS.project }
    ]
  },
  {
    subheader: 'Quản lý giao dịch',
    items: [
      {
        title: 'Nạp tiền và rút tiền',
        path: PATH_DASHBOARD.transaction.list,
        icon: ICONS.transaction
      },
      {
        title: 'Giao dịch ví',
        path: PATH_DASHBOARD.transaction.walletTransaction,
        icon: ICONS.walletTransaction
      },
      {
        title: 'Đầu tư dự án',
        path: PATH_DASHBOARD.transaction.payments,
        icon: ICONS.payment
      }
    ]
  }
];

//----------------------------------------------------------------------------------

export default sidebarConfig;
