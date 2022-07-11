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
  booking: getIcon('ic_booking'),
  project: getIcon('ic_project'),
  bankTransaction: getIcon('ic_bankTransaction')
};

const sidebarConfig = [
  {
    subheader: 'Thống kê của bạn',
    items: [
      // {
      //   title: 'app',
      //   path: PATH_DASHBOARD.general.app,
      //   icon: ICONS.dashboard
      // },
      // { title: 'Chung', path: PATH_DASHBOARD.general.analytics, icon: ICONS.analytics },
      { title: 'Ví của bạn', path: PATH_DASHBOARD.general.banking, icon: ICONS.banking },
      { title: 'Tổng quan ngày', path: PATH_DASHBOARD.general.booking, icon: ICONS.booking }
    ]
  },
  {
    subheader: 'Quản lý',
    items: [
      { title: 'Dự án đang đầu tư', path: PATH_DASHBOARD.blog.posts, icon: ICONS.project },
      {
        title: 'Quản lý ví',
        path: PATH_DASHBOARD.general.app,
        icon: ICONS.wallet,
        children: [
          { title: 'Ví đầu tư', path: PATH_DASHBOARD.general.app },
          { title: 'Dự án đang đầu tư', path: PATH_DASHBOARD.general.app },
          { title: 'Ví doanh thu', path: PATH_DASHBOARD.general.app }
        ]
      }
    ]
  },
  {
    subheader: 'Quản lý giao dịch',
    items: [
      // {
      //   title: 'Thanh toán giữa các ví',
      //   path: PATH_DASHBOARD.transaction.walletTransaction,
      //   icon: ICONS.accountTransaction
      // }
      {
        title: 'Giao dịch ngân hàng',
        path: PATH_DASHBOARD.transaction.accountTransaction,
        icon: ICONS.bankTransaction
      }
      // {
      //   title: 'Lịch sử doanh thu',
      //   path: PATH_DASHBOARD.transaction.PeriodRevenueHistory,
      //   icon: ICONS.PeriodRevenueHistory
      // }
    ]
  }
];

//----------------------------------------------------------------------------------

export default sidebarConfig;
