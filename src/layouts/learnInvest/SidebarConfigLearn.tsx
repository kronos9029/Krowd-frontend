// routes
import { PATH_DASHBOARD, PATH_DASHBOARD_LEARN } from '../../routes/paths';
// components
import SvgIconStyle from '../../components/SvgIconStyle';
import React from 'react';
import { Typography } from '@mui/material';

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

const SidebarConfigLearn = [
  {
    subheader: 'Dành cho nhà đầu tư',
    items: [
      {
        title: 'Cách thức hoạt động',
        path: PATH_DASHBOARD_LEARN.learn.how_it_work,
        icon: ICONS.krowd
      },
      {
        title: 'Hiểu các điều khoản giao dịch',
        path: PATH_DASHBOARD_LEARN.learn.app,
        icon: ICONS.krowd
      },
      {
        title: 'Những gì bạn nhận được khi bạn đầu tư',
        path: PATH_DASHBOARD_LEARN.learn.what_get_invested,
        icon: ICONS.wallet
      },
      {
        title: 'Rủi ro',
        path: PATH_DASHBOARD_LEARN.learn.risk_invested,
        icon: ICONS.wallet
      }
      // { title: 'Tổng quan ngày', path: PATH_DASHBOARD.general.booking, icon: ICONS.booking }
    ]
  }
];

//----------------------------------------------------------------------------------

export default SidebarConfigLearn;
