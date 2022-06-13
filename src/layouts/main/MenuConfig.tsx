import { Icon } from '@iconify/react';
import homeFill from '@iconify/icons-eva/home-fill';
// routes
import { PATH_PAGE } from '../../routes/paths';

// ----------------------------------------------------------------------
const ICON_SIZE = {
  width: 22,
  height: 22
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
      icon: <Icon icon="arcticons:projectm" {...ICON_SIZE} />,
      path: PATH_PAGE.project
    },
    {
      title: 'Về chúng tôi',
      icon: <Icon icon="fluent:people-12-regular" {...ICON_SIZE} />,
      path: PATH_PAGE.about
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
      icon: <Icon icon="arcticons:projectm" {...ICON_SIZE} />,
      path: PATH_PAGE.project
    },
    // {
    //   title: 'Business',
    //   icon: <Icon icon={bookOpenFill} {...ICON_SIZE} />,
    //   path: PATH_PAGE.comingSoon
    //   // path: PATH_DOCS
    // },
    {
      title: 'About us',
      icon: <Icon icon="fluent:people-12-regular" {...ICON_SIZE} />,
      path: PATH_PAGE.about
      // path: PATH_DOCS
    }
  ]
};

export default menuConfig;
