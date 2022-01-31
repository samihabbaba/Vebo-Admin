import { Component } from '@angular/core';
import { NAVITEMS } from './side-nav-routes.config';
import { ThemeConstantService } from '../../services/theme-constant.service';
import { AuthenticationService } from '../../services/authentication.service';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';

@Component({
  selector: 'app-sidenav',
  templateUrl: './side-nav.component.html',
})
export class SideNavComponent {
  public menuItems: any[];
  isFolded: boolean;
  isSideNavDark: boolean;
  isExpand: boolean;

  constructor(
    private themeService: ThemeConstantService,
    private authService: AuthenticationService
  ) {}

  ngOnInit(): void {
    this.setNavigation();
    this.themeService.isMenuFoldedChanges.subscribe(
      (isFolded) => (this.isFolded = isFolded)
    );
    this.themeService.isExpandChanges.subscribe(
      (isExpand) => (this.isExpand = isExpand)
    );
    this.themeService.isSideNavDarkChanges.subscribe(
      (isDark) => (this.isSideNavDark = isDark)
    );
  }

  closeMobileMenu(): void {
    if (window.innerWidth < 992) {
      this.isFolded = false;
      this.isExpand = !this.isExpand;
      this.themeService.toggleExpand(this.isExpand);
      this.themeService.toggleFold(this.isFolded);
    }
  }

  setNavigation() {
    const items = [...NAVITEMS];

    if (this.authService.decodedToken.role === 'Master') {
      this.menuItems = [...items];
    }

    if (this.authService.decodedToken.role === 'Promoter') {
      this.menuItems = [
        {
          path: '/home',
          title: 'Dashboard',
          iconTheme: 'outline',
          iconType: 'nzIcon',
          icon: 'dashboard',
          submenu: [],
        },

        {
          path: '/self-transactions',
          title: 'Self Transactions',
          iconTheme: 'outline',
          iconType: 'nzIcon',
          icon: 'setting',
          submenu: [],
        },

        {
          path: '',
          title: 'Users',
          iconTheme: 'outline',
          iconType: 'nzIcon',
          icon: 'team',
          submenu: [
            {
              path: '/users/shop',
              title: 'Shop',
              iconType: '',
              icon: '',
              iconTheme: '',
              submenu: [],
            },

            {
              path: '/users/customer',
              title: 'Customer',
              iconType: '',
              icon: '',
              iconTheme: '',
              submenu: [],
            },
          ],
        },

        {
          path: '/risk-management/risk-plans',
          title: 'Risk Plans',
          iconTheme: 'outline',
          iconType: 'nzIcon',
          icon: 'warning',
          submenu: [],
        },

        {
          path: '/bets/view-bets',
          title: 'View bets',
          iconTheme: 'outline',
          iconType: 'nzIcon',
          icon: 'bank',
          submenu: [],
        },
      ];
    }

    if (this.authService.decodedToken.role === 'Office') {
      this.menuItems = [
        {
          path: '/bets/bet-office',
          title: 'Office Bets',
          iconTheme: 'outline',
          iconType: 'nzIcon',
          icon: 'desktop',
          submenu: [],
        },
      ];
    }
    if (this.authService.decodedToken.role === 'Shop') {


      this.menuItems = [
        {
          path: '/home',
          title: 'Dashboard',
          iconTheme: 'outline',
          iconType: 'nzIcon',
          icon: 'dashboard',
          submenu: [],
        },

        {
          path: '/self-transactions',
          title: 'Self Transactions',
          iconTheme: 'outline',
          iconType: 'nzIcon',
          icon: 'setting',
          submenu: [],
        },

        {
          path: '/users/customer',
          title: 'Customer',
          iconTheme: 'outline',
          iconType: 'nzIcon',
          icon: 'team',
          submenu: [],
        },

        {
          path: '/risk-management/risk-plans',
          title: 'Risk Plans',
          iconTheme: 'outline',
          iconType: 'nzIcon',
          icon: 'warning',
          submenu: [],
        },

        {
          path: '/bets/view-bets',
          title: 'View bets',
          iconTheme: 'outline',
          iconType: 'nzIcon',
          icon: 'bank',
          submenu: [],
        },
      ];
    }
  }
}
