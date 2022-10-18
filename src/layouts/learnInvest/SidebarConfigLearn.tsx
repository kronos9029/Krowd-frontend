// routes
import { PATH_DASHBOARD, PATH_DASHBOARD_LEARN, PATH_PAGE } from '../../routes/paths';
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
    subheader: 'Tìm hiểu quy trình của Krowd',
    items: [
      {
        title: 'Cách thức hoạt động',
        path: PATH_DASHBOARD_LEARN.learn.how_it_work,
        icon: ICONS.krowd
      },
      {
        title: 'Bạn được gì khi đầu tư ?',
        path: PATH_DASHBOARD_LEARN.learn.what_get_invested,
        icon: ICONS.krowd
      },
      {
        title: 'Quy trình thanh khoản',
        path: PATH_DASHBOARD_LEARN.learn.how_return_work,
        icon: ICONS.krowd
      },
      {
        title: 'Các điều khoản giao dịch',
        path: PATH_DASHBOARD_LEARN.learn.app,
        icon: ICONS.krowd
      }
    ]
  },
  {
    subheader: 'Hướng dẫn',
    items: [
      {
        title: 'Đầu tư',
        path: PATH_DASHBOARD_LEARN.learn.how_to_invest,
        icon: ICONS.krowd
      },
      {
        title: 'Trở thành chủ dự án',
        path: PATH_DASHBOARD_LEARN.learn.how_to_call_invest,
        icon: ICONS.krowd
      },
      {
        title: 'Tham gia KrowdEco',
        path: PATH_DASHBOARD_LEARN.learn.coming_soon,
        icon: ICONS.krowd
      }
    ]
  },
  {
    subheader: 'Rủi ro',
    items: [
      {
        title: 'Rủi ro đầu tư',
        path: PATH_DASHBOARD_LEARN.learn.risk_invested,
        icon: ICONS.krowd
      },
      {
        title: 'Rủi ro nhượng quyền',
        path: PATH_DASHBOARD_LEARN.learn.risk_franchise,
        icon: ICONS.krowd
      },
      {
        title: 'Rủi ro chủ dự án',
        path: PATH_DASHBOARD_LEARN.learn.risk_manager,
        icon: ICONS.krowd
      },
      {
        title: 'Rủi ro từng lĩnh vực đầu tư',
        path: PATH_DASHBOARD_LEARN.learn.risk_for_field,
        icon: ICONS.krowd
      }
    ]
  },
  {
    subheader: 'Thông tin thêm về Krowd',
    items: [
      {
        title: 'Liên hệ',
        path: PATH_DASHBOARD_LEARN.learn.coming_soon,
        icon: ICONS.krowd
      },
      {
        title: 'Chính sách bảo mật',
        path: PATH_DASHBOARD_LEARN.learn.coming_soon,
        icon: ICONS.krowd
      },
      {
        title: 'Điều khoản dịch vụ',
        path: PATH_DASHBOARD_LEARN.learn.coming_soon,
        icon: ICONS.krowd
      },
      {
        title: 'Truyền thông',
        path: PATH_DASHBOARD_LEARN.learn.coming_soon,
        icon: ICONS.krowd
      }
    ]
  }
];

//----------------------------------------------------------------------------------

export default SidebarConfigLearn;
