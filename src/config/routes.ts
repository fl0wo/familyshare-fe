import {
  Home as HomeIcon,
  BarChartOutlined as DashboardIcon,
  CodeOutlined as CodeIcon,
  GitHub as GitHubIcon,
  Public as PublicIcon,
  PublicOff as PrivateIcon,
  AccountBoxRounded as UserIcon,
  SettingsOutlined as SettingsIcon,
  ListAlt as ListIcon,
  CreditCard as BillingIcon,
  PlusOne as KidRegister,
  Map as MapIcon
} from '@mui/icons-material';

import { Home } from '../pages/Home';
import {AddKid} from '../pages/AddKid'

import { Route } from '../types';
import LiveMap from '../pages/LiveMap';

const routes: Array<Route> = [
  {
    key: 'router-home',
    title: 'Home',
    description: 'Home',
    component: Home,
    path: '/',
    isEnabled: true,
    icon: HomeIcon,
    appendDivider: true,
    isLoginRequired: false
  },
  {
    key: 'add-kid',
    title: 'Add Kid',
    description: 'Register a Kid',
    path: '/add-kid',
    component : AddKid,
    isEnabled: true,
    icon: KidRegister,
    appendDivider: true,
    isLoginRequired: true
  },
  {
    key: 'router-dashboard',
    title: 'Dashboard',
    description: 'Dashboard',
    path: '/dashboard',
    isEnabled: true,
    icon: DashboardIcon,
    isLoginRequired: false

  },
  {
    key: 'router-gh',
    title: 'GitHub',
    description: 'GitHub',
    isEnabled: true,
    icon: GitHubIcon,
    isLoginRequired: false,
    subRoutes: [
      {
        key: 'router-gh-public',
        title: 'Public Repos',
        description: 'Public Repos',
        path: '/gh/public',
        isEnabled: true,
        icon: PublicIcon,
        isLoginRequired: false
      },
      {
        key: 'router-gh-private',
        title: 'Private Repos',
        description: 'Private Repos',
        path: '/gh/private',
        isEnabled: false,
        icon: PrivateIcon,
        isLoginRequired: false
      },
    ],
  },
  {
    key: 'router-code',
    title: 'Code Editor',
    description: 'Code Editor',
    path: '/code-editor',
    isEnabled: true,
    icon: CodeIcon,
    appendDivider: true,
    isLoginRequired: false
  },
  {
    key: 'router-livemap',
    title: 'Live Map',
    description: 'Live Map',
    path: '/map-live',
    isEnabled: true,
    icon: MapIcon,
    component: LiveMap,
    appendDivider: true,
    isLoginRequired: true
  },
  {
    key: 'router-my-account',
    title: 'My Account',
    description: 'My Account',
    path: '/account',
    isEnabled: true,
    icon: UserIcon,
    isLoginRequired: false,
    subRoutes: [
      {
        key: 'router-settings',
        title: 'Settings',
        description: 'Account Settings',
        path: '/account/settings',
        isEnabled: true,
        icon: SettingsIcon,
        isLoginRequired: false
      },
      {
        key: 'router-preferences',
        title: 'Preferences',
        description: 'Account Preferences',
        path: '/account/preferences',
        isEnabled: true,
        icon: ListIcon,
        isLoginRequired: false
      },
      {
        key: 'router-billing',
        title: 'Billing',
        description: 'Account Billing',
        path: '/account/billing',
        isEnabled: true,
        icon: BillingIcon,
        isLoginRequired: false
      },
    ],
  },
];

export default routes;
