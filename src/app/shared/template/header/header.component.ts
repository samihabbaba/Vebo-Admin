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
  navItems: SideNavInterface[] = [...NAVITEMS];
  searchVisible: boolean = false;
  quickViewVisible: boolean = false;
  isFolded: boolean;
  isExpand: boolean;

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
    private authService: AuthenticationService,
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
}
