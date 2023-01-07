/*
 * Copyright (c) 2019-2022. The content in this file is Protected by the copyright laws of kenya and owned by Logo247 Designs.
 * Reproducing it in any way or using it without permission from Logo Bidding System will be a violation of kenyan copyrights law.
 * This may be subject to prosecution according to the kenyan law
 */
import {RouterModule, Routes} from '@angular/router';
import {ContestsComponent} from './_views/main_views/contests/view-contests/contests.component';
import {DesignersComponent} from './_views/main_views/designers/designers/designers.component';
import {SignupComponent} from './_views/authentication/Signup/signup.component';
import {SigninComponent} from './_views/authentication/Signin/signin.component';
import {RecoveryComponent} from './_views/authentication/recovery/recovery.component';
import {UpdateComponent} from './_views/authentication/update-password/update.component';
import {CategoriesComponent} from './_views/admin_pages/categories/categories.component';
import {VerifyEmailComponent} from './_views/authentication/verify-email/verify.component';
import {ClientsDashboardComponent} from './_views/dashboards/clients-dashboard/dashboard/clients-dashboard.component';
import {DesignersDashboardComponent} from './_views/dashboards/designers-dashboard/dashboard/designers-dashboard.component';
import {appConstants} from './_helpers';
import {AuthGuard, PermissionsGuard} from './_guards';
import {ProfileComponent} from './_views/profile/user-profile/profile.component';
import {ContactsComponent} from './_views/profile/contacts/contacts.component';
import {NgModule} from '@angular/core';
import {HowItWorksComponent} from './_views/main_views/how-it-works/how-it-works.component';
import {UpdateUserComponent} from './_views/authentication/update-user/update-user.component';
import {CountriesComponent} from './_views/admin_pages/countries/countries.component';
import {PermissionsComponent} from './_views/admin_pages/permissions/permissions.component';
import {RolesComponent} from './_views/admin_pages/roles/roles/roles.component';
import {ViewRolesComponent} from './_views/admin_pages/roles/view-roles/view-roles.component';
import {AddEditRolesComponent} from './_views/admin_pages/roles/add-edit-roles/add-edit-roles.component';
import {ApiKeysComponent} from './_views/admin_pages/api-keys/api-keys.component';
import {ViewUsersComponent} from './_views/admin_pages/users/view-users/view-users.component';
import {AssignUserRolesComponent} from './_views/admin_pages/users/assign-user-roles/assign-user-roles.component';
import {AddEditUsersComponent} from './_views/admin_pages/users/add-edit-users/add-edit-users.component';
import {UpdateCredentialsComponent} from './_views/profile/update-credentials/update-credentials.component';
import {ViewUserComponent} from './_views/admin_pages/users/view-user/view-user.component';
import {UserContactsComponent} from './_views/admin_pages/users/user-contacts/user-contacts.component';
import {HomeComponent} from './_views/main_views/home/home.component';
import {PaymentModesComponent} from './_views/admin_pages/payment-modes/payment-modes.component';
import {CommissionsComponent} from './_views/admin_pages/commissions/commissions.component';
import {SettingsComponent} from './_views/admin_pages/settings/settings.component';
import {ChatsComponent} from './_views/profile/chats/chats.component';
import {UpdateUserDetailsComponent} from './_views/profile/update-user-details/update-user-details.component';
import {DesignerProfileComponent} from './_views/main_views/designers/designer-profile/designer-profile.component';
import {DiscountsComponent} from './_views/admin_pages/discounts/discounts.component';
import {ProfileMainPageComponent} from './_views/profile/profile-main-page/profile-main-page.component';
import {AdminMainPageComponent} from './_views/admin_pages/admin-main-page/admin-main-page.component';
import {ContestStagesComponent} from './_views/admin_pages/contest-stages/contest-stages.component';
import {LogoUsesComponent} from './_views/admin_pages/logo-uses/logo-uses.component';
import {ViewSingleContestComponent} from './_views/main_views/contests/view-single-contest/view-single-contest.component';
import {AddContestsComponent} from './_views/main_views/contests/add-contests/add-contests.component';
import {FaqComponent} from './_views/main_views/faq/faq.component';
import {PolicyComponent} from './_views/main_views/policy/policy.component';
import {TosComponent} from './_views/main_views/tos/tos.component';
import {
	NewsLettersSubscriptionsComponent
} from './_views/admin_pages/news-letters-subscriptions/news-letters--subscriptions.component';
import {ClientLiveContestsComponent} from './_views/dashboards/clients-dashboard/client-live-contests/client-live-contests.component';
import {
	ClientEndedContestsComponent
} from './_views/dashboards/clients-dashboard/client-ended-contests/client-ended-contests.component';
import {
	ClientJudgingContestsComponent
} from './_views/dashboards/clients-dashboard/client-judging-contests/client-judging-contests.component';

const appRoutes: Routes = [
	{path: '', component: HomeComponent, runGuardsAndResolvers: 'always'},
	{
		path: 'sign-up',
		component: SignupComponent,
		runGuardsAndResolvers: 'always'
	},
	{path: 'sign-in', component: SigninComponent, runGuardsAndResolvers: 'always'},
	{
		path: 'sign-out',
		redirectTo: '',
		runGuardsAndResolvers: 'always'
	}, {
		path: 'reset-password',
		component: RecoveryComponent,
		runGuardsAndResolvers: 'always'
	},
	{
		path: 'update-password/:userId/:token',
		component: UpdateComponent,
		runGuardsAndResolvers: 'always'
	},
	{path: 'how-it-works', component: HowItWorksComponent, runGuardsAndResolvers: 'always'},
	{path: 'how-it-works/faqs', component: FaqComponent, runGuardsAndResolvers: 'always'},
	{
		path: 'how-it-works/privacy-policy',
		component: PolicyComponent,
		runGuardsAndResolvers: 'always'
	},
	{
		path: 'how-it-works/terms-of-service',
		component: TosComponent,
		runGuardsAndResolvers: 'always'
	},
	{path: 'contests', component: ContestsComponent, runGuardsAndResolvers: 'always'},
	{path: 'contests/:id', component: ViewSingleContestComponent, runGuardsAndResolvers: 'always'},
	{
		path: 'contests-add', component: AddContestsComponent,
		canActivate: [AuthGuard], runGuardsAndResolvers: 'always'
	},
	{
		path: 'contests-edit/:id', component: AddContestsComponent,
		canActivate: [AuthGuard], runGuardsAndResolvers: 'always'
	},
	{
		path: 'contests/client/live/:id',
		component: ClientLiveContestsComponent,
		canActivate: [AuthGuard],
		runGuardsAndResolvers: 'always'
	},
	{
		path: 'contests/client/ended/:id',
		component: ClientEndedContestsComponent,
		canActivate: [AuthGuard],
		runGuardsAndResolvers: 'always'
	},
	{
		path: 'contests/client/judging/:id',
		component: ClientJudgingContestsComponent,
		canActivate: [AuthGuard],
		runGuardsAndResolvers: 'always'
	},
	{path: 'designers', component: DesignersComponent, runGuardsAndResolvers: 'always'},
	{
		path: 'designers/:id',
		component: DesignerProfileComponent,
		runGuardsAndResolvers: 'always'
	},
	{
		path: 'profile/:id',
		component: ProfileComponent,
		canActivate: [AuthGuard],
		runGuardsAndResolvers: 'always'
	},
	{
		path: 'profile-update/:id',
		component: UpdateUserComponent,
		canActivate: [AuthGuard],
		runGuardsAndResolvers: 'always'
	},
	{
		path: 'profile/:id',
		component: ProfileMainPageComponent,
		canActivate: [AuthGuard],
		runGuardsAndResolvers: 'always'
	},
	{
		path: 'profile/change-password/:id',
		component: UpdateCredentialsComponent,
		canActivate: [AuthGuard],
		runGuardsAndResolvers: 'always'
	},
	{
		path: 'profile/contacts/:id',
		component: ContactsComponent,
		canActivate: [AuthGuard],
		runGuardsAndResolvers: 'always'
	},
	{
		path: 'profile/contacts/:id/:contactId',
		component: ContactsComponent,
		canActivate: [AuthGuard],
		runGuardsAndResolvers: 'always'
	},
	{
		path: 'profile/inbox/:id',
		component: ChatsComponent,
		canActivate: [AuthGuard],
		runGuardsAndResolvers: 'always'
	},
	{
		path: 'profile/update/:id',
		component: UpdateUserDetailsComponent,
		canActivate: [AuthGuard],
		runGuardsAndResolvers: 'always'
	},
	{
		path: 'client-dashboard/:id',
		component: ClientsDashboardComponent,
		canActivate: [AuthGuard],
		runGuardsAndResolvers: 'always'
	},
	{
		path: 'designers-dashboard/:id',
		component: DesignersDashboardComponent,
		canActivate: [AuthGuard],
		runGuardsAndResolvers: 'always'
	},
	{
		path: 'admin', component: AdminMainPageComponent,
		canActivate: [AuthGuard, PermissionsGuard], runGuardsAndResolvers: 'always',
		data: {permission: [appConstants.accessAdminPage]}
	},
	{
		path: 'categories', component: CategoriesComponent,
		canActivate: [AuthGuard, PermissionsGuard], runGuardsAndResolvers: 'always',
		data: {permission: [appConstants.getAllCategories]}
	},
	{
		path: 'categories/:id', component: CategoriesComponent,
		canActivate: [AuthGuard, PermissionsGuard], runGuardsAndResolvers: 'always',
		data: {permission: [appConstants.readCategory, appConstants.updateCategory, appConstants.deleteCategory]}
	},
	{
		path: 'contest-stages', component: ContestStagesComponent,
		canActivate: [AuthGuard, PermissionsGuard], runGuardsAndResolvers: 'always',
		data: {permission: [appConstants.getAllContestStages]}
	},
	{
		path: 'contest-stage/:id', component: ContestStagesComponent,
		canActivate: [AuthGuard, PermissionsGuard], runGuardsAndResolvers: 'always',
		data: {permission: [appConstants.readContestStage, appConstants.updateContestStage, appConstants.deleteContestStage]},
	},
	{
		path: 'logo-uses', component: LogoUsesComponent,
		canActivate: [AuthGuard, PermissionsGuard], runGuardsAndResolvers: 'always',
		data: {permission: [appConstants.getAllLogoUses]}
	},
	{
		path: 'logo-uses/:id', component: LogoUsesComponent,
		canActivate: [AuthGuard, PermissionsGuard], runGuardsAndResolvers: 'always',
		data: {permission: [appConstants.readLogoUses, appConstants.updateLogoUses, appConstants.deleteLogoUses]}
	},
	{
		path: 'countries', component: CountriesComponent,
		canActivate: [AuthGuard, PermissionsGuard], runGuardsAndResolvers: 'always',
		data: {permission: [appConstants.getAllCountries]}
	},
	{
		path: 'countries/:id', component: CountriesComponent,
		canActivate: [AuthGuard, PermissionsGuard], runGuardsAndResolvers: 'always',
		data: {permission: [appConstants.readCountry, appConstants.updateCountry, appConstants.deleteCountry]},
	},
	{
		path: 'permissions', component: PermissionsComponent,
		canActivate: [AuthGuard, PermissionsGuard], runGuardsAndResolvers: 'always',
		data: {permission: [appConstants.getAllPermissions]}
	},
	{
		path: 'permissions/:id', component: PermissionsComponent,
		canActivate: [AuthGuard, PermissionsGuard], runGuardsAndResolvers: 'always',
		data: {permission: [appConstants.readPermission, appConstants.updatePermission]}
	},
	{
		path: 'roles', component: RolesComponent,
		canActivate: [AuthGuard, PermissionsGuard], runGuardsAndResolvers: 'always',
		data: {permission: [appConstants.getAllRoles]}
	},
	{
		path: 'role/:id', component: ViewRolesComponent,
		canActivate: [AuthGuard, PermissionsGuard], runGuardsAndResolvers: 'always',
		data: {permission: [appConstants.updateRole, appConstants.getAllPermissions]}
	},
	{
		path: 'roles/add', component: AddEditRolesComponent,
		canActivate: [AuthGuard, PermissionsGuard], runGuardsAndResolvers: 'always',
		data: {permission: [appConstants.updateRole]},
	},
	{
		path: 'roles/edit/:id', component: AddEditRolesComponent,
		canActivate: [AuthGuard, PermissionsGuard], runGuardsAndResolvers: 'always',
		data: {permission: [appConstants.updateRole, appConstants.deleteRole]}
	},
	{
		path: 'api-keys', component: ApiKeysComponent,
		canActivate: [AuthGuard, PermissionsGuard], runGuardsAndResolvers: 'always',
		data: {permission: [appConstants.getAllApiKeys]}
	},
	{
		path: 'api-keys/:id', component: ApiKeysComponent,
		canActivate: [AuthGuard, PermissionsGuard], runGuardsAndResolvers: 'always',
		data: {permission: [appConstants.readApiKey, appConstants.updateApiKey, appConstants.deleteApiKey]}
	},
	{
		path: 'users', component: ViewUsersComponent,
		canActivate: [AuthGuard, PermissionsGuard], runGuardsAndResolvers: 'always',
		data: {permission: [appConstants.getAllUsers]}
	},
	{
		path: 'user/:id/:userId', component: ViewUserComponent,
		canActivate: [AuthGuard, PermissionsGuard], runGuardsAndResolvers: 'always',
		data: {permission: [appConstants.readUser]}
	},
	{
		path: 'users/assign-roles/:id/:userId', component: AssignUserRolesComponent,
		canActivate: [AuthGuard, PermissionsGuard], runGuardsAndResolvers: 'always',
		data: {permission: [appConstants.readUser, appConstants.updateUser, appConstants.getAllRoles]}
	},
	{
		path: 'users/contacts/:id/:contactId', component: UserContactsComponent,
		canActivate: [AuthGuard, PermissionsGuard], runGuardsAndResolvers: 'always',
		data: {permission: [appConstants.readUser, appConstants.updateUser]}
	},
	{
		path: 'users/contacts/:id', component: UserContactsComponent,
		canActivate: [AuthGuard, PermissionsGuard], runGuardsAndResolvers: 'always',
		data: {permission: [appConstants.readUser, appConstants.updateUser]}
	},
	{
		path: 'users/add', component: AddEditUsersComponent,
		canActivate: [AuthGuard, PermissionsGuard], runGuardsAndResolvers: 'always',
		data: {permission: [appConstants.updateUser]}
	},
	{
		path: 'users/edit/:id', component: AddEditUsersComponent,
		canActivate: [AuthGuard, PermissionsGuard], runGuardsAndResolvers: 'always',
		data: {permission: [appConstants.updateUser, appConstants.getAllRoles]}
	},
	{
		path: 'payment/payment-modes', component: PaymentModesComponent,
		canActivate: [AuthGuard, PermissionsGuard], runGuardsAndResolvers: 'always',
		data: {permission: [appConstants.getAllPaymentModes]}
	},
	{
		path: 'payment/payment-modes/:id', component: PaymentModesComponent,
		canActivate: [AuthGuard, PermissionsGuard], runGuardsAndResolvers: 'always',
		data: {permission: [appConstants.readPaymentMode, appConstants.updatePaymentMode, appConstants.deletePaymentMode]}
	},
	{
		path: 'payment/commissions', component: CommissionsComponent,
		canActivate: [AuthGuard, PermissionsGuard], runGuardsAndResolvers: 'always',
		data: {permission: [appConstants.getAllCommissions]}
	},
	{
		path: 'payment/commissions/:id', component: CommissionsComponent,
		canActivate: [AuthGuard, PermissionsGuard], runGuardsAndResolvers: 'always',
		data: {permission: [appConstants.readCommission, appConstants.updateCommission, appConstants.deleteCommission]}
	},
	{
		path: 'payment/discounts', component: DiscountsComponent,
		canActivate: [AuthGuard, PermissionsGuard], runGuardsAndResolvers: 'always',
		data: {permission: [appConstants.getAllDiscounts]}
	},
	{
		path: 'payment/discounts/:id', component: DiscountsComponent,
		canActivate: [AuthGuard, PermissionsGuard], runGuardsAndResolvers: 'always',
		data: {permission: [appConstants.readDiscount, appConstants.updateDiscount, appConstants.deleteDiscount]}
	},
	{
		path: 'settings', component: SettingsComponent,
		canActivate: [AuthGuard, PermissionsGuard], runGuardsAndResolvers: 'always',
		data: {permission: [appConstants.updateSetting, appConstants.getAllSettings, appConstants.readSetting]}
	},
	{
		path: 'news-letters-subscriptions', component: NewsLettersSubscriptionsComponent,
		canActivate: [AuthGuard, PermissionsGuard], runGuardsAndResolvers: 'always',
		data: {permission: [appConstants.getAllNewsLetters]}
	},
	{
		path: 'news-letters-subscriptions/:id', component: NewsLettersSubscriptionsComponent,
		canActivate: [AuthGuard, PermissionsGuard], runGuardsAndResolvers: 'always',
		data: {permission: [appConstants.readNewsLetters, appConstants.updateNewsLetters, appConstants.deleteNewsLetters]}
	},
	
	// probably should be cleared
	{
		path: 'profile/user-contacts/:id',
		component: ContactsComponent,
		canActivate: [AuthGuard],
		runGuardsAndResolvers: 'always'
	},
	{
		path: 'verify-email/:userId/:token',
		component: VerifyEmailComponent,
		runGuardsAndResolvers: 'always'
	},
	{
		path: 'connect-facebook',
		redirectTo: '/' + appConstants.baseApiV1Url + '/authentication/connect-facebook',
		pathMatch: 'full',
		runGuardsAndResolvers: 'always'
	},
	{path: '**', redirectTo: '', runGuardsAndResolvers: 'always'}
];

@NgModule({
	imports: [RouterModule.forRoot(appRoutes, {
    useHash: true,
    onSameUrlNavigation: 'reload'
})],
	exports: [RouterModule]
})
export class AppRoutingModule {
}
