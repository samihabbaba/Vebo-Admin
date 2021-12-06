import { Component, HostListener, ViewEncapsulation } from '@angular/core';
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
    private authService: AuthenticationService
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

  notificationList = [
    {
      title: 'You received a new message',
      time: '8 min',
      icon: 'mail',
      color: 'ant-avatar-' + 'blue',
    },
    {
      title: 'New user registered',
      time: '7 hours',
      icon: 'user-add',
      color: 'ant-avatar-' + 'cyan',
    },
    {
      title: 'System Alert',
      time: '8 hours',
      icon: 'warning',
      color: 'ant-avatar-' + 'red',
    },
    {
      title: 'You have a new update',
      time: '2 days',
      icon: 'sync',
      color: 'ant-avatar-' + 'gold',
    },
  ];

  changeHeaderColor() {
    localStorage.setItem('theme', this.selectedHeaderColor);
    this.themeService.changeHeaderColor(this.selectedHeaderColor);
  }

  logOut() {
    this.authService.logout();
  }
}
