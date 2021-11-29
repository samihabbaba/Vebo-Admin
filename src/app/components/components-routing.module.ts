import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const DEMO_COMPONENT_ROUTES = [
    {'path': 'components/affix', 'loadChildren': () => import('./affix/index.module').then(m => m.NzDemoAffixModule)},
    {'path': 'components/alert', 'loadChildren': () => import('./alert/index.module').then(m => m.NzDemoAlertModule)},
    {'path': 'components/anchor', 'loadChildren': () => import('./anchor/index.module').then(m => m.NzDemoAnchorModule)},
    {'path': 'components/auto-complete', 'loadChildren': () => import('./auto-complete/index.module').then(m => m.NzDemoAutoCompleteModule)},
    {'path': 'components/avatar', 'loadChildren': () => import('./avatar/index.module').then(m => m.NzDemoAvatarModule)},
    {'path': 'components/back-top', 'loadChildren': () => import('./back-top/index.module').then(m => m.NzDemoBackTopModule)},
    {'path': 'components/badge', 'loadChildren': () => import('./badge/index.module').then(m => m.NzDemoBadgeModule)},
    {'path': 'components/breadcrumb', 'loadChildren': () => import('./breadcrumb/index.module').then(m => m.NzDemoBreadcrumbModule)},
    {'path': 'components/button', 'loadChildren': () => import('./button/index.module').then(m => m.NzDemoButtonModule)},
    {'path': 'components/calendar', 'loadChildren': () => import('./calendar/index.module').then(m => m.NzDemoCalendarModule)},
    {'path': 'components/card', 'loadChildren': () => import('./card/index.module').then(m => m.NzDemoCardModule)},
    {'path': 'components/carousel', 'loadChildren': () => import('./carousel/index.module').then(m => m.NzDemoCarouselModule)},
    {'path': 'components/cascader', 'loadChildren': () => import('./cascader/index.module').then(m => m.NzDemoCascaderModule)},
    {'path': 'components/checkbox', 'loadChildren': () => import('./checkbox/index.module').then(m => m.NzDemoCheckboxModule)},
    {'path': 'components/collapse', 'loadChildren': () => import('./collapse/index.module').then(m => m.NzDemoCollapseModule)},
    {'path': 'components/comment', 'loadChildren': () => import('./comment/index.module').then(m => m.NzDemoCommentModule)},
    {'path': 'components/date-picker', 'loadChildren': () => import('./date-picker/index.module').then(m => m.NzDemoDatePickerModule)},
    {'path': 'components/descriptions', 'loadChildren': () => import('./descriptions/index.module').then(m => m.NzDemoDescriptionsModule)},
    {'path': 'components/divider', 'loadChildren': () => import('./divider/index.module').then(m => m.NzDemoDividerModule)},
    {'path': 'components/drawer', 'loadChildren': () => import('./drawer/index.module').then(m => m.NzDemoDrawerModule)},
    {'path': 'components/dropdown', 'loadChildren': () => import('./dropdown/index.module').then(m => m.NzDemoDropdownModule)},
    {'path': 'components/empty', 'loadChildren': () => import('./empty/index.module').then(m => m.NzDemoEmptyModule)},
    {'path': 'components/form', 'loadChildren': () => import('./form/index.module').then(m => m.NzDemoFormModule)},
    {'path': 'components/grid', 'loadChildren': () => import('./grid/index.module').then(m => m.NzDemoGridModule)},
    {'path': 'components/icon', 'loadChildren': () => import('./icon/index.module').then(m => m.NzDemoIconModule)},
    {'path': 'components/input', 'loadChildren': () => import('./input/index.module').then(m => m.NzDemoInputModule)},
    {'path': 'components/input-number', 'loadChildren': () => import('./input-number/index.module').then(m => m.NzDemoInputNumberModule)},
    {'path': 'components/list', 'loadChildren': () => import('./list/index.module').then(m => m.NzDemoListModule)},
    {'path': 'components/mention', 'loadChildren': () => import('./mention/index.module').then(m => m.NzDemoMentionModule)},
    {'path': 'components/menu', 'loadChildren': () => import('./menu/index.module').then(m => m.NzDemoMenuModule)},
    {'path': 'components/message', 'loadChildren': () => import('./message/index.module').then(m => m.NzDemoMessageModule)},
    {'path': 'components/modal', 'loadChildren': () => import('./modal/index.module').then(m => m.NzDemoModalModule)},
    {'path': 'components/notification', 'loadChildren': () => import('./notification/index.module').then(m => m.NzDemoNotificationModule)},
    {'path': 'components/page-header', 'loadChildren': () => import('./page-header/index.module').then(m => m.NzDemoPageHeaderModule)},
    {'path': 'components/pagination', 'loadChildren': () => import('./pagination/index.module').then(m => m.NzDemoPaginationModule)},
    {'path': 'components/popconfirm', 'loadChildren': () => import('./popconfirm/index.module').then(m => m.NzDemoPopconfirmModule)},
    {'path': 'components/popover', 'loadChildren': () => import('./popover/index.module').then(m => m.NzDemoPopoverModule)},
    {'path': 'components/progress', 'loadChildren': () => import('./progress/index.module').then(m => m.NzDemoProgressModule)},
    {'path': 'components/radio', 'loadChildren': () => import('./radio/index.module').then(m => m.NzDemoRadioModule)},
    {'path': 'components/rate', 'loadChildren': () => import('./rate/index.module').then(m => m.NzDemoRateModule)},
    {'path': 'components/result', 'loadChildren': () => import('./result/index.module').then(m => m.NzDemoResultModule)},
    {'path': 'components/select', 'loadChildren': () => import('./select/index.module').then(m => m.NzDemoSelectModule)},
    {'path': 'components/skeleton', 'loadChildren': () => import('./skeleton/index.module').then(m => m.NzDemoSkeletonModule)},
    {'path': 'components/slider', 'loadChildren': () => import('./slider/index.module').then(m => m.NzDemoSliderModule)},
    {'path': 'components/spin', 'loadChildren': () => import('./spin/index.module').then(m => m.NzDemoSpinModule)},
    {'path': 'components/statistic', 'loadChildren': () => import('./statistic/index.module').then(m => m.NzDemoStatisticModule)},
    {'path': 'components/steps', 'loadChildren': () => import('./steps/index.module').then(m => m.NzDemoStepsModule)},
    {'path': 'components/switch', 'loadChildren': () => import('./switch/index.module').then(m => m.NzDemoSwitchModule)},
    {'path': 'components/table', 'loadChildren': () => import('./table/index.module').then(m => m.NzDemoTableModule)},
    {'path': 'components/tabs', 'loadChildren': () => import('./tabs/index.module').then(m => m.NzDemoTabsModule)},
    {'path': 'components/tag', 'loadChildren': () => import('./tag/index.module').then(m => m.NzDemoTagModule)},
    {'path': 'components/time-picker', 'loadChildren': () => import('./time-picker/index.module').then(m => m.NzDemoTimePickerModule)},
    {'path': 'components/timeline', 'loadChildren': () => import('./timeline/index.module').then(m => m.NzDemoTimelineModule)},
    {'path': 'components/tooltip', 'loadChildren': () => import('./tooltip/index.module').then(m => m.NzDemoTooltipModule)},
    {'path': 'components/transfer', 'loadChildren': () => import('./transfer/index.module').then(m => m.NzDemoTransferModule)},
    {'path': 'components/tree', 'loadChildren': () => import('./tree/index.module').then(m => m.NzDemoTreeModule)},
    {'path': 'components/tree-select', 'loadChildren': () => import('./tree-select/index.module').then(m => m.NzDemoTreeSelectModule)},
    {'path': 'components/typography', 'loadChildren': () => import('./typography/index.module').then(m => m.NzDemoTypographyModule)},
    {'path': 'components/upload', 'loadChildren': () => import('./upload/index.module').then(m => m.NzDemoUploadModule)},
];

const routes: Routes = [
    ...DEMO_COMPONENT_ROUTES,
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class ComponentsRoutingModule { }
