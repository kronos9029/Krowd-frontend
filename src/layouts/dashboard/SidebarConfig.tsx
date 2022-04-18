// routes
import { PATH_DASHBOARD } from '../../routes/paths';
// components
import Label from '../../components/Label';
import SvgIconStyle from '../../components/SvgIconStyle';

// ----------------------------------------------------------------------

const getIcon = (name: string) => (
  <SvgIconStyle src={`/static/icons/navbar/${name}.svg`} sx={{ width: '100%', height: '100%' }} />
);

const ICONS = {
  blog: getIcon('ic_blog'),
  cart: getIcon('ic_cart'),
  chat: getIcon('ic_chat'),
  mail: getIcon('ic_mail'),
  user: getIcon('ic_user'),
  kanban: getIcon('ic_kanban'),
  banking: getIcon('ic_banking'),
  calendar: getIcon('ic_calendar'),
  ecommerce: getIcon('ic_ecommerce'),
  analytics: getIcon('ic_analytics'),
  dashboard: getIcon('ic_dashboard'),
  booking: getIcon('ic_booking')
};

const sidebarConfig = [
  // GENERAL
  // ----------------------------------------------------------------------
  {
    subheader: 'Ví của bạn',
    items: [
      {
        title: 'app',
        path: PATH_DASHBOARD.general.app,
        icon: ICONS.dashboard
      },
      // { title: 'e-commerce', path: PATH_DASHBOARD.general.ecommerce, icon: ICONS.ecommerce },
      { title: 'Thống kê', path: PATH_DASHBOARD.general.analytics, icon: ICONS.analytics },
      { title: 'Ví của bạn', path: PATH_DASHBOARD.general.banking, icon: ICONS.banking },
      { title: 'Dự án đang đầu tư', path: PATH_DASHBOARD.general.booking, icon: ICONS.booking }
    ]
  },

  // MANAGEMENT
  // ----------------------------------------------------------------------
  {
    subheader: 'Quản lý',
    items: [
      // MANAGEMENT : USER
      {
        title: 'Dự án',
        path: PATH_DASHBOARD.user.root,
        icon: ICONS.user,
        children: [
          { title: 'Thông tin', path: PATH_DASHBOARD.user.profile },
          { title: 'Dự án', path: PATH_DASHBOARD.user.cards },
          { title: 'Danh sách', path: PATH_DASHBOARD.user.list },
          // { title: 'create', path: PATH_DASHBOARD.user.newUser },
          // { title: 'edit', path: PATH_DASHBOARD.user.editById },
          { title: 'account', path: PATH_DASHBOARD.user.account }
        ]
      },

      // MANAGEMENT : E-COMMERCE
      // {
      //   title: 'e-commerce',
      //   path: PATH_DASHBOARD.eCommerce.root,
      //   icon: ICONS.cart,
      //   children: [
      //     { title: 'shop', path: PATH_DASHBOARD.eCommerce.shop },
      //     { title: 'product', path: PATH_DASHBOARD.eCommerce.productById },
      //     { title: 'list', path: PATH_DASHBOARD.eCommerce.list },
      //     { title: 'create', path: PATH_DASHBOARD.eCommerce.newProduct },
      //     { title: 'edit', path: PATH_DASHBOARD.eCommerce.editById },
      //     { title: 'checkout', path: PATH_DASHBOARD.eCommerce.checkout },
      //     { title: 'invoice', path: PATH_DASHBOARD.eCommerce.invoice }
      //   ]
      // },

      // MANAGEMENT : BLOG
      {
        title: 'Dự án',
        path: PATH_DASHBOARD.blog.root,
        icon: ICONS.blog,
        children: [
          { title: 'Dự án của công ty', path: PATH_DASHBOARD.blog.posts },
          { title: 'Chi tiết', path: PATH_DASHBOARD.blog.postById },
          { title: 'Thêm mới dự án', path: PATH_DASHBOARD.blog.newPost }
        ]
      }
    ]
  },

  // APP
  // ----------------------------------------------------------------------
  {
    subheader: 'app',
    items: [
      {
        title: 'mail',
        path: PATH_DASHBOARD.mail.root,
        icon: ICONS.mail,
        info: <Label color="error">2</Label>
      },
      { title: 'chat', path: PATH_DASHBOARD.chat.root, icon: ICONS.chat },
      {
        title: 'kanban',
        path: PATH_DASHBOARD.kanban,
        icon: ICONS.kanban
      }
    ]
  }
];

export default sidebarConfig;
