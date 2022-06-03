import { Icon } from '@iconify/react';
import homeFill from '@iconify/icons-eva/home-fill';
import fileFill from '@iconify/icons-eva/file-fill';
import roundGrain from '@iconify/icons-ic/round-grain';
import bookOpenFill from '@iconify/icons-eva/book-open-fill';
// routes
import { PATH_AUTH, PATH_PAGE, PATH_DASHBOARD } from '../../routes/paths';
import Cookies from 'js-cookie';
import i18n from 'locales/i18n';

// ----------------------------------------------------------------------
const ICON_SIZE = {
  width: 22,
  height: 22
};
const title = {
  color: '#251E18'
  // color: '#0d6efd'
};

const menuConfig = {
  vi: [
    {
      title: 'Trang chủ',
      icon: <Icon icon={homeFill} {...ICON_SIZE} />,
      path: '/'
    },
    // {
    //   title: 'Nhà đầu tư',
    //   icon: <Icon icon={roundGrain} {...ICON_SIZE} />,
    //   path: PATH_PAGE.business
    // },
    {
      title: 'Dự án',
      path: PATH_PAGE.project
      // icon: <Icon icon={fileFill} {...ICON_SIZE} />,
      // children: [
      //   {
      //     subheader: 'Khác',
      //     items: [
      //       { title: 'Về chúng tôi', path: PATH_PAGE.about },
      //       { title: 'Liên hệ với chúng tôi', path: PATH_PAGE.contact },
      //       { title: 'FAQs', path: PATH_PAGE.faqs }
      //       // { title: 'Pricing', path: PATH_PAGE.pricing },
      //       // { title: 'Payment', path: PATH_PAGE.payment },
      //       // { title: 'Maintenance', path: PATH_PAGE.maintenance },
      //       // { title: 'Coming Soon', path: PATH_PAGE.comingSoon }
      //     ]
      //   },
      //   {
      //     subheader: 'Xác thực',
      //     items: [
      //       { title: 'Đăng nhập', path: PATH_AUTH.loginUnprotected },
      //       { title: 'Đăng ký', path: PATH_AUTH.registerUnprotected }
      //       // { title: 'Reset password', path: PATH_AUTH.resetPassword },
      //       // { title: 'Verify code', path: PATH_AUTH.verify }
      //     ]
      //   },
      //   // {
      //   //   subheader: 'Error',
      //   //   items: [
      //   //     { title: 'Page 404', path: PATH_PAGE.page404 },
      //   //     { title: 'Page 500', path: PATH_PAGE.page500 }
      //   //   ]
      //   // },
      //   {
      //     subheader: 'Trang chủ',
      //     items: [{ title: 'Dashboard', path: PATH_DASHBOARD.root }]
      //   }
      // ]
    },
    {
      title: 'Doanh Nghiệp',
      icon: <Icon icon={bookOpenFill} {...ICON_SIZE} />,
      path: PATH_PAGE.comingSoon
      // path: PATH_DOCS
    }
  ],
  en: [
    {
      title: 'Home',
      icon: <Icon icon={homeFill} {...ICON_SIZE} />,
      path: '/'
    },
    // {
    //   title: 'Investors',
    //   icon: <Icon icon={roundGrain} {...ICON_SIZE} />,
    //   path: PATH_PAGE.business
    // },
    {
      title: 'Project',
      path: PATH_PAGE.project
      // icon: <Icon icon={fileFill} {...ICON_SIZE} />,
      // children: [
      //   {
      //     subheader: 'Another',
      //     items: [
      //       { title: 'About us', path: PATH_PAGE.about },
      //       { title: 'Contact us', path: PATH_PAGE.contact },
      //       { title: 'FAQs', path: PATH_PAGE.faqs }
      //       // { title: 'Pricing', path: PATH_PAGE.pricing },
      //       // { title: 'Payment', path: PATH_PAGE.payment },
      //       // { title: 'Maintenance', path: PATH_PAGE.maintenance },
      //       // { title: 'Coming Soon', path: PATH_PAGE.comingSoon }
      //     ]
      //   },
      //   {
      //     subheader: 'Authentication',
      //     items: [
      //       { title: 'Login', path: PATH_AUTH.loginUnprotected },
      //       { title: 'Register', path: PATH_AUTH.registerUnprotected }
      //       // { title: 'Reset password', path: PATH_AUTH.resetPassword },
      //       // { title: 'Verify code', path: PATH_AUTH.verify }
      //     ]
      //   },
      //   // {
      //   //   subheader: 'Error',
      //   //   items: [
      //   //     { title: 'Page 404', path: PATH_PAGE.page404 },
      //   //     { title: 'Page 500', path: PATH_PAGE.page500 }
      //   //   ]
      //   // },
      //   {
      //     subheader: 'Dashboard',
      //     items: [{ title: 'Dashboard', path: PATH_DASHBOARD.root }]
      //   }
      // ]
    },
    {
      title: 'Business',
      icon: <Icon icon={bookOpenFill} {...ICON_SIZE} />,
      path: PATH_PAGE.comingSoon
      // path: PATH_DOCS
    }
  ]
};
// {
//   title: 'Về chúng tôi',
//   icon: <Icon icon={bookOpenFill} {...ICON_SIZE} />,
//   path: PATH_ABOUT
// }

export default menuConfig;
