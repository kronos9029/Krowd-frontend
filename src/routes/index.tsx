import { Suspense, lazy } from 'react';
import { Navigate, useRoutes, useLocation } from 'react-router-dom';
// layouts
import MainLayout from '../layouts/main';
import DashboardLayout from '../layouts/dashboard';
import DashboardLayoutLearn from '../layouts/learnInvest';
import LogoOnlyLayout from '../layouts/LogoOnlyLayout';
// guards
import GuestGuard from '../guards/GuestGuard';
import AuthGuard from '../guards/AuthGuard';
// import RoleBasedGuard from '../guards/RoleBasedGuard';
// components
import LoadingScreen from '../components/LoadingScreen';
import PackageVoucherCheckout from '../pages/dashboard/PackageVoucherCheckout';
import MainNavbar from 'layouts/main/MainNavbar';
import MainFooter from 'layouts/main/MainFooter';
import { Divider } from '@mui/material';

// ----------------------------------------------------------------------

const Loadable = (Component: React.ElementType) => (props: any) => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const { pathname } = useLocation();
  const isDashboard = pathname.includes('/dashboard');

  return (
    <Suspense
      fallback={
        <LoadingScreen
          sx={{
            ...(!isDashboard && {
              top: 0,
              left: 0,
              width: 1,
              zIndex: 9999,
              position: 'fixed'
            })
          }}
        />
      }
    >
      <Component {...props} />
    </Suspense>
  );
};

export default function Router() {
  return useRoutes([
    {
      path: 'auth',
      children: [
        {
          path: 'login',
          element: (
            <GuestGuard>
              <Login />
            </GuestGuard>
          )
        },
        {
          path: 'register',
          element: (
            <GuestGuard>
              <Register />
            </GuestGuard>
          )
        },
        { path: 'login-unprotected', element: <Login /> },
        { path: 'register-unprotected', element: <Register /> },
        { path: 'verify', element: <VerifyCode /> }
      ]
    },

    // Dashboard Routes

    {
      path: 'dashboard',
      element: (
        <AuthGuard>
          <DashboardLayout />
        </AuthGuard>
      ),
      children: [
        { element: <Navigate to="/dashboard/app" replace /> },
        { path: 'app', element: <GeneralApp /> },
        { path: 'ecommerce', element: <GeneralEcommerce /> },
        { path: 'analytics', element: <GeneralAnalytics /> },
        { path: 'banking', element: <WalletBanking /> },
        { path: 'booking', element: <GeneralBooking /> },

        {
          path: 'e-commerce',
          children: [
            { element: <Navigate to="/dashboard/e-commerce/shop" replace /> },
            { path: 'shop', element: <EcommerceShop /> },
            { path: 'product/:name', element: <EcommerceProductDetails /> },
            { path: 'list', element: <EcommerceProductList /> },
            { path: 'product/new', element: <EcommerceProductCreate /> },
            { path: 'product/:name/edit', element: <EcommerceProductCreate /> },
            { path: 'checkout', element: <EcommerceCheckout /> },
            { path: 'invoice', element: <EcommerceInvoice /> }
          ]
        },
        {
          path: 'user',
          children: [
            { element: <Navigate to="/dashboard/user/profile" replace /> },
            { path: 'profile', element: <UserProfile /> },
            { path: 'cards', element: <UserCards /> },
            { path: 'list', element: <UserList /> },
            { path: 'new', element: <UserCreate /> },
            { path: ':name/edit', element: <UserCreate /> },
            { path: 'account', element: <UserAccount /> }
          ]
        },
        {
          path: 'project-invested',
          children: [
            { element: <Navigate to="/dashboard/project-invested/list" replace /> },

            { path: 'list', element: <ProjectListInvested /> }
          ]
        },
        {
          path: 'account-transaction',
          children: [
            { element: <Navigate to="/dashboard/account-transaction/list" replace /> },
            { path: 'list', element: <UserAccountTransaction /> },
            { path: 'wallet-transaction', element: <UserWalletTransaction /> },
            { path: 'payments/list', element: <UserPaymentProject /> }
          ]
        },
        {
          path: 'userKrowd',
          children: [
            { element: <Navigate to="/dashboard/userKrowd/profile" replace /> },
            { path: 'cards', element: <UserCards /> },
            { path: 'new', element: <UserCreate /> },
            { path: ':name/edit', element: <UserCreate /> },
            { path: 'account', element: <UserAccount /> }
          ]
        },

        {
          path: 'blog',
          children: [
            { element: <Navigate to="/dashboard/blog/posts" replace /> },
            { path: 'post/:title', element: <BlogPost /> },
            { path: 'new-post', element: <KrowdNewProject /> }
          ]
        },
        {
          path: 'mail',
          children: [
            { element: <Navigate to="/dashboard/mail/all" replace /> },
            { path: 'label/:customLabel', element: <Mail /> },
            { path: 'label/:customLabel/:mailId', element: <Mail /> },
            { path: ':systemLabel', element: <Mail /> },
            { path: ':systemLabel/:mailId', element: <Mail /> }
          ]
        },
        {
          path: 'chat',
          children: [
            { element: <Chat /> },
            { path: 'new', element: <Chat /> },
            { path: ':conversationKey', element: <Chat /> }
          ]
        }
      ]
    },
    {
      path: 'learn',
      element: <DashboardLayoutLearn />,
      children: [
        { element: <Navigate to="/learn/investors/what-the-deal-terms-mean" replace /> },
        { path: '/learn/investors/how-it-works', element: <LearnHowItWork /> },
        { path: '/learn/investors/what-the-deal-terms-mean', element: <GeneralAppLearn /> },
        { path: '/learn/investors/what-do-i-get-when-i-invest', element: <WhatIGetInvest /> },
        { path: '/learn/investors/risks', element: <RiskInvest /> }
      ]
    },

    // Main Routes
    {
      path: '*',
      element: <LogoOnlyLayout />,
      children: [
        { path: 'coming-soon', element: <ComingSoon /> },
        { path: 'maintenance', element: <Maintenance /> },
        { path: 'pricing', element: <KrowdPackage /> },
        { path: 'payment', element: <Payment /> },
        { path: '500', element: <Page500 /> },
        { path: 'top-up', element: <PageTopUp /> },
        { path: 'page-success', element: <PageSuccess /> },
        { path: '404', element: <NotFound /> },
        { path: '*', element: <Navigate to="/404" replace /> }
      ]
    },
    {
      path: '/',
      element: <MainLayout />,
      children: [
        { element: <LandingPage /> },
        { path: 'about-us', element: <About /> },
        { path: 'contact-us', element: <Contact /> },
        { path: 'faqs', element: <Faqs /> },
        { path: 'details/:id', element: <Details /> },
        // { path: 'package/invest/:id', element: <KrowdPackage /> },

        { path: 'project', element: <Projects /> },
        {
          path: 'components',
          children: [{ element: <ComponentsOverview /> }]
        }
      ]
    },
    {
      path: '/',
      element: (
        <AuthGuard>
          <MainNavbar />
          <KrowdPackage />
          <Divider />
          <MainFooter />
        </AuthGuard>
      ),
      children: [
        { element: <Navigate to="/package/invest/:id" replace /> },
        { path: 'package/invest/:id', element: <KrowdPackage /> }
      ]
    },

    { path: '*', element: <Navigate to="/404" replace /> }
  ]);
}

// IMPORT COMPONENTS

// Authentication
const Login = Loadable(lazy(() => import('../pages/authentication/Login')));
const Register = Loadable(lazy(() => import('../pages/authentication/Register')));
const VerifyCode = Loadable(lazy(() => import('../pages/authentication/VerifyCode')));
// Dashboard
const GeneralApp = Loadable(lazy(() => import('../pages/dashboard/GeneralApp')));
const GeneralAppLearn = Loadable(lazy(() => import('../pages/learn/GeneralAppLearn')));
const LearnHowItWork = Loadable(lazy(() => import('../pages/learn/LearnHowItWork')));
const WhatIGetInvest = Loadable(lazy(() => import('../pages/learn/WhatIGetInvest')));
const RiskInvest = Loadable(lazy(() => import('../pages/learn/RiskInvest')));
const GeneralEcommerce = Loadable(lazy(() => import('../pages/dashboard/GeneralEcommerce')));
const GeneralAnalytics = Loadable(lazy(() => import('../pages/dashboard/GeneralAnalytics')));
const WalletBanking = Loadable(lazy(() => import('../pages/dashboard/WalletBanking')));
const GeneralBooking = Loadable(lazy(() => import('../pages/dashboard/GeneralBooking')));
const EcommerceShop = Loadable(lazy(() => import('../pages/dashboard/EcommerceShop')));
const EcommerceProductDetails = Loadable(
  lazy(() => import('../pages/dashboard/EcommerceProductDetails'))
);
const EcommerceProductList = Loadable(
  lazy(() => import('../pages/dashboard/EcommerceProductList'))
);
const EcommerceProductCreate = Loadable(
  lazy(() => import('../pages/dashboard/EcommerceProductCreate'))
);
const EcommerceCheckout = Loadable(lazy(() => import('../pages/dashboard/PackageVoucherCheckout')));
const EcommerceInvoice = Loadable(lazy(() => import('../pages/dashboard/EcommerceInvoice')));
const BlogPost = Loadable(lazy(() => import('../pages/dashboard/BlogPost')));
const KrowdNewProject = Loadable(lazy(() => import('../pages/dashboard/KrowdNewProject')));
//project Entity
const KrowdNewProjectEntity = Loadable(
  lazy(() => import('../pages/dashboard/KrowdNewProjectEntity'))
);

const KrowdNewProjectMedia = Loadable(
  lazy(() => import('../pages/dashboard/KrowdNewProjectMedia'))
);
const KrowdNewProjectOwner = Loadable(
  lazy(() => import('../pages/dashboard/KrowdNewProjectOwner'))
);
const UserProfile = Loadable(lazy(() => import('../pages/dashboard/UserProfile')));
const UserCards = Loadable(lazy(() => import('../pages/dashboard/UserCards')));
const UserList = Loadable(lazy(() => import('../pages/dashboard/UserList')));
const UserAccount = Loadable(lazy(() => import('../pages/dashboard/AccountManager/UserAccount')));
const UserAccountTransaction = Loadable(
  lazy(() => import('../pages/dashboard/AccountManager/UserAccountTransaction'))
);
const UserWalletTransaction = Loadable(
  lazy(() => import('../pages/dashboard/AccountManager/UserWalletTransaction'))
);
const UserPaymentProject = Loadable(
  lazy(() => import('../pages/dashboard/AccountManager/UserPaymentProject'))
);
const ProjectListInvested = Loadable(
  lazy(() => import('../pages/dashboard/ProjectKrowdManager/ProjectListInvested'))
);
const UserCreate = Loadable(lazy(() => import('../pages/dashboard/UserCreate')));
const Chat = Loadable(lazy(() => import('../pages/dashboard/Chat')));
const Mail = Loadable(lazy(() => import('../pages/dashboard/Mail')));
// Main
const LandingPage = Loadable(lazy(() => import('../pages/LandingPage')));
const About = Loadable(lazy(() => import('../pages/About')));
const Contact = Loadable(lazy(() => import('../pages/Contact')));
const Faqs = Loadable(lazy(() => import('../pages/Faqs')));
const ComingSoon = Loadable(lazy(() => import('../pages/ComingSoon')));
const Details = Loadable(lazy(() => import('../pages/Details')));
//Page
const Projects = Loadable(lazy(() => import('../pages/project/Project')));
// const SearchPage = Loadable(lazy(() => import('../pages/SearchPage')));
const Maintenance = Loadable(lazy(() => import('../pages/Maintenance')));
const KrowdPackage = Loadable(lazy(() => import('../pages/KrowdPackage')));
const Payment = Loadable(lazy(() => import('../pages/Payment')));
const Page500 = Loadable(lazy(() => import('../pages/Page500')));
const PageTopUp = Loadable(lazy(() => import('../pages/PageTopUp')));
const PageSuccess = Loadable(lazy(() => import('../pages/PageSuccess')));
const NotFound = Loadable(lazy(() => import('../pages/Page404')));
// Components
const ComponentsOverview = Loadable(lazy(() => import('../pages/ComponentsOverview')));
///
