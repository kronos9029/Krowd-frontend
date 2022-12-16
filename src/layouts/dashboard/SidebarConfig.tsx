// routes
import { PATH_DASHBOARD } from '../../routes/paths';
// components
import SvgIconStyle from '../../components/SvgIconStyle';

// ----------------------------------------------------------------------

const getIcon = (name: string) => (
  <SvgIconStyle src={`/static/icons/navbar/${name}.svg`} sx={{ width: '100%', height: '100%' }} />
);

const ICONS = {
  wallet: getIcon('ic_wallet'),
  dashboard: getIcon('ic_dashboard'),
  krowd: getIcon('ic_krowd'),
  project: getIcon('ic_project'),
  bankTransaction: getIcon('ic_bankTransaction'),
  transaction: getIcon('ic_transaction'),
  withdraw: getIcon('ic_withdraw'),
  payment: getIcon('ic_payment'),
  walletTransaction: getIcon('ic_walletTransaction'),
  voucher: getIcon('ic_voucher')
};

const sidebarConfig = [
  {
    subheader: 'Thống kê của bạn',
    items: [
      // {
      //   title: 'app',
      //   path: PATH_DASHBOARD.general.app,
      //   icon: ICONS.krowd
      // },
      { title: 'Ví của bạn', path: PATH_DASHBOARD.general.banking, icon: ICONS.wallet }
    ]
  },
  {
    subheader: 'Quản lý dự án ',
    items: [
      {
        title: 'Đang đầu tư',
        path: PATH_DASHBOARD.projectInvested.list,
        icon: ICONS.project
      },
      {
        title: 'Lịch sử đầu tư',
        path: PATH_DASHBOARD.projectInvestment.list,
        icon: ICONS.krowd
      }
    ]
  },

  {
    subheader: 'Quản lý giao dịch',
    items: [
      {
        title: 'Giao dịch hệ thống',
        path: PATH_DASHBOARD.transaction.list,
        icon: ICONS.transaction
      },
      {
        title: 'Rút tiền',
        path: PATH_DASHBOARD.transaction.listWithdraw,
        icon: ICONS.withdraw
      },
      {
        title: 'Giao dịch ví',
        path: PATH_DASHBOARD.transaction.walletTransaction,
        icon: ICONS.walletTransaction
      }
      // {
      //   title: 'Đầu tư và nhận lãi',
      //   path: PATH_DASHBOARD.transaction.payments,
      //   icon: ICONS.payment
      // }
      // {
      //   title: 'Lịch sử doanh thu',
      //   path: PATH_DASHBOARD.transaction.periodRevenue,
      //   icon: ICONS.payment
      // }
    ]
  }
  // {
  //   subheader: 'Khuyến mãi (Đang phát triển)',
  //   items: [
  //     {
  //       title: 'Phiếu ưu đãi',
  //       path: PATH_DASHBOARD.general.banking,
  //       icon: ICONS.voucher
  //     }
  //   ]
  // }
];

//----------------------------------------------------------------------------------

export default sidebarConfig;
