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
  other: getIcon('ic_other')
};

//----------------------------------------------------------------------------------
const SidebarBusinessConfig = [
  // GENERAL
  {
    subheader: 'Thống kê doanh nghiệp',
    items: [
      // {
      //   title: 'app',
      //   path: PATH_DASHBOARD.general.app,
      //   icon: ICONS.dashboard
      // },
      { title: 'Ví doanh nghiệp', path: PATH_DASHBOARD.general.banking, icon: ICONS.banking },
      { title: 'Chung', path: PATH_DASHBOARD.general.analytics, icon: ICONS.analytics },
      { title: 'Dự án đang đầu tư', path: PATH_DASHBOARD.general.booking, icon: ICONS.booking }
    ]
  },
  {
    subheader: 'Quản lý',
    items: [
      {
        title: 'Quản lý dự án update',
        path: PATH_DASHBOARD.projectsBusiness.projectBusinessKrowd,
        icon: ICONS.project
      },
      { title: 'Người sở hữu dự án', path: PATH_DASHBOARD.blog.posts, icon: ICONS.project },
      {
        title: 'Quản lý ví',
        path: PATH_DASHBOARD.general.app,
        icon: ICONS.wallet,
        children: [
          // { title: 'Ví đầu tư', path: PATH_DASHBOARD.wallet.system },
          // { title: 'Dự án đang đầu tư', path: PATH_DASHBOARD.wallet.transaction },
          // { title: 'Ví doanh thu', path: PATH_DASHBOARD.wallet.allWallet }
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
        icon: ICONS.banking
      }
      // {
      //   title: 'Lịch sử doanh thu',
      //   path: PATH_DASHBOARD.transaction.PeriodRevenueHistory,
      //   icon: ICONS.PeriodRevenueHistory
      // }
    ]
  },
  {
    subheader: '~~~~~~~~~~~~~~~~~~~~~~~~~',
    items: [
      {
        title: 'Quản lý khác:',
        path: PATH_DASHBOARD.other.root,
        icon: ICONS.other,
        children: [
          { title: 'Lĩnh vực', path: PATH_DASHBOARD.other.field },
          { title: 'Khu vực', path: PATH_DASHBOARD.other.area },
          { title: 'Vai trò', path: PATH_DASHBOARD.other.role },
          { title: 'Rủi ro', path: PATH_DASHBOARD.other.risk }
          // { title: 'Đầu tư', path: PATH_DASHBOARD.other.investment }
        ]
      }
    ]
  }
];

export default SidebarBusinessConfig;
