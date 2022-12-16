// routes
import { PATH_DASHBOARD, PATH_DASHBOARD_PROJECT } from '../../routes/paths';
// components
import SvgIconStyle from '../../components/SvgIconStyle';
import React from 'react';

// ----------------------------------------------------------------------

const getIcon = (name: string) => (
  <SvgIconStyle src={`/static/icons/navbar/${name}.svg`} sx={{ width: '100%', height: '100%' }} />
);

const ICONS = {
  other: getIcon('ic_other'),
  project: getIcon('ic_project'),
  wallet: getIcon('ic_wallet'),
  dashboard: getIcon('ic_dashboard'),
  krowd: getIcon('ic_krowd'),
  daily: getIcon('ic_dailyRevenue'),
  term: getIcon('ic_termRevenue'),
  booking: getIcon('ic_booking'),
  walletTransaction: getIcon('ic_walletTransaction'),
  bankTransaction: getIcon('ic_bankTransaction'),
  PeriodRevenueHistory: getIcon('ic_historyTransaction')
};

const SidebarProjectConfig = [
  {
    subheader: 'Dự án',
    items: [
      {
        title: 'Thông tin',
        path: PATH_DASHBOARD_PROJECT.project.root,
        icon: ICONS.project
      },
      {
        title: 'Cập nhật',
        path: PATH_DASHBOARD_PROJECT.project.general,
        icon: ICONS.krowd
      }
    ]
  },
  {
    subheader: 'Báo cáo dự án',
    items: [
      {
        title: 'Doanh thu hằng ngày',
        path: PATH_DASHBOARD_PROJECT.project.reportRevenue,
        icon: ICONS.daily
      },
      {
        title: 'Tình hình thường kỳ',
        path: PATH_DASHBOARD_PROJECT.project.reportUpdate,
        icon: ICONS.daily
      },
      {
        title: 'Lịch sử nhận thanh toán',
        path: PATH_DASHBOARD_PROJECT.project.historyPayment,
        icon: ICONS.term
      }
    ]
  },
  {
    subheader: 'Giao dịch',
    items: [
      {
        title: 'Đầu tư',
        path: PATH_DASHBOARD_PROJECT.wallet_project.walletP3,
        icon: ICONS.wallet
      }
      // {
      //   title: 'Ví thanh toán dự án',
      //   path: PATH_DASHBOARD_PROJECT.wallet_project.walletP4,
      //   icon: ICONS.walletTransaction
      // }
    ]
  }
];

export default SidebarProjectConfig;
