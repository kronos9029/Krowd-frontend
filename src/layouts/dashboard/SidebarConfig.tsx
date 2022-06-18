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
  booking: getIcon('ic_booking')
};

const sidebarConfig = [
  // GENERAL
  {
    subheader: 'Ví của bạn',
    items: [
      {
        title: 'app',
        path: PATH_DASHBOARD.general.app,
        icon: ICONS.dashboard
      },
      { title: 'Thống kê', path: PATH_DASHBOARD.general.analytics, icon: ICONS.analytics },
      { title: 'Ví của bạn', path: PATH_DASHBOARD.general.banking, icon: ICONS.banking },
      { title: 'Dự án đang đầu tư', path: PATH_DASHBOARD.general.booking, icon: ICONS.booking }
    ]
  },
  {
    subheader: 'Quản lý',
    items: [
      { title: 'Quản lý dự án', path: PATH_DASHBOARD.blog.posts },
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
  }
];

export default sidebarConfig;
