import { Routes } from '@angular/router';
import { UserInfoComponent } from 'src/app/users/user-info/user-info.component';
import { ComponentsComponent } from '../../components/components.component';

export const CommonLayout_ROUTES: Routes = [
  //Dashboard
  {
    path: 'dashboard',
    loadChildren: () =>
      import('../../dashboard/dashboard.module').then((m) => m.DashboardModule),
  },

  //Apps
  {
    path: 'apps',
    data: {
      title: 'Apps',
    },
    children: [
      {
        path: '',
        redirectTo: '/dashboard',
        pathMatch: 'full',
      },
      {
        path: '',
        loadChildren: () =>
          import('../../apps/apps.module').then((m) => m.AppsModule),
      },
    ],
  },

  //Component
  {
    path: 'demo',
    component: ComponentsComponent,
    children: [
      {
        path: '',
        redirectTo: '/components/affix',
        pathMatch: 'full',
      },
      {
        path: '',
        loadChildren: () =>
          import('../../components/components.module').then(
            (m) => m.ComponentsModule
          ),
      },
    ],
    data: {
      title: 'Components ',
    },
  },

  // Charts
  {
    path: 'charts',
    data: {
      title: 'Charts',
    },
    children: [
      {
        path: '',
        redirectTo: '/dashboard',
        pathMatch: 'full',
      },
      {
        path: '',
        loadChildren: () =>
          import('../../charts/charts.module').then((m) => m.ChartsModule),
      },
    ],
  },

  //Pages
  {
    path: 'pages',
    data: {
      title: 'Pages ',
    },
    children: [
      {
        path: '',
        redirectTo: '/dashboard',
        pathMatch: 'full',
      },
      {
        path: '',
        loadChildren: () =>
          import('../../pages/pages.module').then((m) => m.PagesModule),
      },
    ],
  },

  // HERE IS MY PART

  { path: 'user-info/:id', component: UserInfoComponent },

  {
    path: 'home',
    loadChildren: () =>
      import('../../home/home.module').then((m) => m.HomeModule),
  },

  {
    path: 'users',
    loadChildren: () =>
      import('../../users/users.module').then((m) => m.UsersModule),
  },

  {
    path: 'risk-management',
    loadChildren: () =>
      import('../../risk-management/risk-management.module').then(
        (m) => m.RiskManagementModule
      ),
  },

  {
    path: 'bets',
    loadChildren: () =>
      import('../../bets/bets.module').then((m) => m.BetsModule),
  },

  {
    path: 'sports',
    loadChildren: () =>
      import('../../sports/sports.module').then((m) => m.SportsModule),
  },

  {
    path: 'bonus',
    loadChildren: () =>
      import('../../bonus/bonus.module').then((m) => m.BonusModule),
  },

  {
    path: 'logs',
    loadChildren: () =>
      import('../../logs/logs.module').then((m) => m.LogsModule),
  },

  {
    path: 'transaction-history',
    loadChildren: () =>
      import('../../transaction-history/transaction-history.module').then(
        (m) => m.TransactionHistoryModule
      ),
  },

  {
    path: 'payment',
    loadChildren: () =>
      import('../../payment/payment.module').then((m) => m.PaymentModule),
  },

  {
    path: 'reports',
    loadChildren: () =>
      import('../../reports/reports.module').then((m) => m.ReportsModule),
  },

  {
    path: 'settings',
    loadChildren: () =>
      import('../../account-settings/account-settings.module').then(
        (m) => m.AccountSettingsModule
      ),
  },
];
