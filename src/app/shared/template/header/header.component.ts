import { Component, HostListener, ViewEncapsulation } from '@angular/core';
import { NavigationStart, Router } from '@angular/router';
import { filter } from 'rxjs/operators';
import { TranslationService } from 'src/app/i18n/translation.service';
import { SideNavInterface } from '../../interfaces/side-nav.type';
import { AuthenticationService } from '../../services/authentication.service';
import { ThemeConstantService } from '../../services/theme-constant.service';
import { NAVITEMS } from '../side-nav/side-nav-routes.config';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  navItems: any[];
  searchVisible: boolean = false;
  quickViewVisible: boolean = false;
  isFolded: boolean;
  isExpand: boolean;
  companyLogo: string = 'E';

  moreObj: any = {
    path: '',
    title: 'More',
    iconTheme: 'outline',
    iconType: 'nzIcon',
    icon: 'more',
    subMenu: [],
  };

  lang: string = 'en';

  changeLang(lang) {
    this.lang = lang;
    this.translationService.setLanguage(lang);
  }

  scrHeight;
  scrWidth;

  selectedHeaderColor: string;

  @HostListener('window:resize', ['$event'])
  getScreenSize(event?) {
    this.scrHeight = window.innerHeight;
    this.scrWidth = window.innerWidth;
  }

  constructor(
    private themeService: ThemeConstantService,
    public authService: AuthenticationService,
    private translationService: TranslationService,
    private router: Router
  ) {
    if (
      localStorage.getItem('theme') &&
      localStorage.getItem('theme') !== 'default'
    ) {
      this.selectedHeaderColor = localStorage.getItem('theme');
      this.themeService.changeHeaderColor(this.selectedHeaderColor);
    }
  }

  ngOnInit(): void {
    this.setNavigation();
    this.setSelectedLanguage();
    this.router.events
      .pipe(filter((event) => event instanceof NavigationStart))
      .subscribe((event) => {
        this.setSelectedLanguage();
      });
    this.themeService.isMenuFoldedChanges.subscribe(
      (isFolded) => (this.isFolded = isFolded)
    );
    this.themeService.isExpandChanges.subscribe(
      (isExpand) => (this.isExpand = isExpand)
    );

    this.themeService.selectedHeaderColor.subscribe(
      (color) => (this.selectedHeaderColor = color)
    );
  }

  toggleFold() {
    this.isFolded = !this.isFolded;
    this.themeService.toggleFold(this.isFolded);
  }

  toggleExpand() {
    this.isFolded = false;
    this.isExpand = !this.isExpand;
    this.themeService.toggleExpand(this.isExpand);
    this.themeService.toggleFold(this.isFolded);
  }

  searchToggle(): void {
    this.searchVisible = !this.searchVisible;
  }

  quickViewToggle(): void {
    this.quickViewVisible = !this.quickViewVisible;
  }

  setSelectedLanguage(): any {
    this.changeLang(this.translationService.getSelectedLanguage());
  }

  changeHeaderColor() {
    localStorage.setItem('theme', this.selectedHeaderColor);
    this.themeService.changeHeaderColor(this.selectedHeaderColor);
  }

  logOut() {
    this.authService.logout();
  }

  companyLogoClick() {}

  setNavigation() {
    const items = [...NAVITEMS];

    if (this.authService.decodedToken.role === 'Master') {
      this.navItems = [...items];
    }

    if (this.authService.decodedToken.role === 'Promoter') {
      this.navItems = [
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
      this.navItems = [
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


      this.navItems = [
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
