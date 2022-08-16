// ----------------------------------------------------------------------

function path(root: string, sublink: string) {
  return `${root}${sublink}`;
}

const ROOTS_AUTH = '/auth';
const ROOTS_DASHBOARD = '/dashboard';

// ----------------------------------------------------------------------

export const PATH_AUTH = {
  root: ROOTS_AUTH,
  login: path(ROOTS_AUTH, '/login'),
  loginUnprotected: path(ROOTS_AUTH, '/login'),
  register: path(ROOTS_AUTH, '/register'),
  registerUnprotected: path(ROOTS_AUTH, '/register-unprotected'),
  resetPassword: path(ROOTS_AUTH, '/reset-password'),
  verify: path(ROOTS_AUTH, '/verify')
};

export const PATH_PAGE = {
  comingSoon: '/coming-soon',
  maintenance: '/maintenance',
  pricing: '/pricing',
  payment: '/payment',
  about: '/about-us',
  contact: '/contact-us',
  faqs: '/faqs',
  page404: '/404',
  page500: '/500',
  business: '/components',
  project: '/project',
  checkout: '/package'
};

export const PATH_DASHBOARD = {
  root: ROOTS_DASHBOARD,
  general: {
    app: path(ROOTS_DASHBOARD, '/app'),
    ecommerce: path(ROOTS_DASHBOARD, '/ecommerce'),
    analytics: path(ROOTS_DASHBOARD, '/analytics'),
    banking: path(ROOTS_DASHBOARD, '/banking'),
    booking: path(ROOTS_DASHBOARD, '/booking')
  },
  mail: {
    root: path(ROOTS_DASHBOARD, '/mail'),
    all: path(ROOTS_DASHBOARD, '/mail/all')
  },
  chat: {
    root: path(ROOTS_DASHBOARD, '/chat'),
    new: path(ROOTS_DASHBOARD, '/chat/new'),
    conversation: path(ROOTS_DASHBOARD, '/chat/:conversationKey')
  },
  user: {
    root: path(ROOTS_DASHBOARD, '/user'),
    profile: path(ROOTS_DASHBOARD, '/user/profile'),
    cards: path(ROOTS_DASHBOARD, '/user/cards'),
    list: path(ROOTS_DASHBOARD, '/user/list'),
    newUser: path(ROOTS_DASHBOARD, '/user/new'),
    editById: path(ROOTS_DASHBOARD, `/user/reece-chung/edit`),
    account: path(ROOTS_DASHBOARD, '/user/account')
  },
  eCommerce: {
    root: path(ROOTS_DASHBOARD, '/e-commerce'),
    shop: path(ROOTS_DASHBOARD, '/e-commerce/shop'),
    product: path(ROOTS_DASHBOARD, '/e-commerce/product/:name'),
    productById: path(ROOTS_DASHBOARD, '/e-commerce/product/nike-air-force-1-ndestrukt'),
    list: path(ROOTS_DASHBOARD, '/e-commerce/list'),
    newProduct: path(ROOTS_DASHBOARD, '/e-commerce/product/new'),
    editById: path(ROOTS_DASHBOARD, '/e-commerce/product/nike-blazer-low-77-vintage/edit'),
    checkout: path(ROOTS_DASHBOARD, '/e-commerce/checkout'),
    invoice: path(ROOTS_DASHBOARD, '/e-commerce/invoice')
  },
  wallet: {
    root: path(ROOTS_DASHBOARD, '/wallet'),
    system: path(ROOTS_DASHBOARD, '/wallet/system-wallet'),
    transaction: path(ROOTS_DASHBOARD, '/wallet/transaction-wallet'),
    allWallet: path(ROOTS_DASHBOARD, '/wallet/all-wallet')
  },
  //Quản lý dự án business
  projectsBusiness: {
    root: path(ROOTS_DASHBOARD, '/projectsBusiness'),
    projectBusinessKrowd: path(ROOTS_DASHBOARD, '/projectsBusiness/projectBusinessKrowd'),
    projectBusinessDetails: path(ROOTS_DASHBOARD, '/projectsBusiness/projectDetails'),
    newProjectBusiness: path(ROOTS_DASHBOARD, '/projectsBusiness/new-project'),
    projectBusinessById: path(ROOTS_DASHBOARD, '/projectsBusiness/nike-air-force-1-ndestrukt'),
    newProjectEntity: path(ROOTS_DASHBOARD, '/projectsBusiness/new-projectEntity'),
    newProjectHighLight: path(ROOTS_DASHBOARD, '/projectsBusiness/new-projectHighLight'),
    newProjectExtension: path(ROOTS_DASHBOARD, '/projectsBusiness/new-projectExtension'),
    newProjectAbout: path(ROOTS_DASHBOARD, '/projectsBusiness/new-projectAbout'),
    newProjectDocument: path(ROOTS_DASHBOARD, '/projectsBusiness/new-projectDocument'),
    newProjectMedia: path(ROOTS_DASHBOARD, '/projectsBusiness/new-projectMedia'),
    newProjectFAQ: path(ROOTS_DASHBOARD, '/projectsBusiness/new-projectFAQ'),
    newProjectOwner: path(ROOTS_DASHBOARD, '/projectsBusiness/new-projectOwner'),
    projectEntityDetails: path(ROOTS_DASHBOARD, '/projectsBusiness/projectEntityDetails')
  },
  userKrowd: {
    root: path(ROOTS_DASHBOARD, '/userKrowd'),
    profile: path(ROOTS_DASHBOARD, '/userKrowd/profile'),
    cards: path(ROOTS_DASHBOARD, '/userKrowd/cards'),
    list: path(ROOTS_DASHBOARD, '/userKrowd/list'),
    newUser: path(ROOTS_DASHBOARD, '/userKrowd/new'),
    editById: path(ROOTS_DASHBOARD, `/userKrowd/reece-chung/edit`),
    account: path(ROOTS_DASHBOARD, '/userKrowd/account')
  },
  //Quản lý khác
  other: {
    root: path(ROOTS_DASHBOARD, '/other'),
    list: path(ROOTS_DASHBOARD, '/other/list'),
    field: path(ROOTS_DASHBOARD, '/other/field'),
    newRiskType: path(ROOTS_DASHBOARD, '/other/risk_type-new'),
    newField: path(ROOTS_DASHBOARD, '/other/field-new'),
    area: path(ROOTS_DASHBOARD, '/other/area'),
    role: path(ROOTS_DASHBOARD, '/other/role'),
    risk: path(ROOTS_DASHBOARD, '/other/risk'),
    investment: path(ROOTS_DASHBOARD, '/other/investment')
  },
  // giao dịch
  transaction: {
    root: path(ROOTS_DASHBOARD, '/transaction/account-transaction'),
    walletTransaction: path(ROOTS_DASHBOARD, '/transaction/wallet'),
    accountTransaction: path(ROOTS_DASHBOARD, '/transaction/account-transaction'),
    PeriodRevenueHistory: path(ROOTS_DASHBOARD, '/transaction/account')
  },
  blog: {
    root: path(ROOTS_DASHBOARD, '/blog'),
    posts: path(ROOTS_DASHBOARD, '/blog/posts'),
    post: path(ROOTS_DASHBOARD, '/blog/post/:title'),
    postById: path(ROOTS_DASHBOARD, '/blog/post/apply-these-7-secret-techniques-to-improve-event'),
    newPost: path(ROOTS_DASHBOARD, '/blog/new-post')
  }
};

export const PATH_DOCS = 'https://docs-minimals.vercel.app/introduction';
export const PATH_DETAILS = '/details';
export const PATH_SEARCHPAGE = '/project';
export const PATH_FIELDPAGE = '/all_field';
// export const PATH_FIELDPAGE_DETAILS = '/all_field/:name';
