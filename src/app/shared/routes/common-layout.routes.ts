import { Routes } from '@angular/router';
import { UserInfoComponent } from 'src/app/users/user-info/user-info.component';

export const CommonLayout_ROUTES: Routes = [
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
