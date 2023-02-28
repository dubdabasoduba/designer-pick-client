/*
 * Copyright (c) 2019-2022. The content in this file is Protected by the copyright laws of kenya and owned by Logo247 Designs.
 * Reproducing it in any way or using it without permission from Logo Bidding System will be a violation of kenyan copyrights law.
 * This may be subject to prosecution according to the kenyan law
 */

import {AuthGuard, PermissionsGuard} from './_guards';
import {AppRoutingModule} from './app-routing.module';
import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {FormsModule} from '@angular/forms';
import {
	AlertService,
	ApiKeysService,
	AuthenticationService,
	CategoryService,
	CommissionsService,
	ContactService,
	ContestsService,
	ContestStagesService,
	CountriesService,
	DiscountsService,
	LogoBriefsService,
	LogoUsesService,
	PagerService,
	PaymentModesService,
	PaypalEmailService,
	PermissionsService,
	PersonsService,
	ProfileService,
	SettingsService,
	UserService
} from './_services';

import {DesignersComponent} from './_views/main_views/designers/designers/designers.component';
import {SignupComponent} from './_views/authentication/Signup/signup.component';
import {SigninComponent} from './_views/authentication/Signin/signin.component';
import {RecoveryComponent} from './_views/authentication/recovery/recovery.component';
import {UpdateComponent} from './_views/authentication/update-password/update.component';
import {CategoriesComponent} from './_views/admin_pages/categories/categories.component';
import {VerifyEmailComponent} from './_views/authentication/verify-email/verify.component';
import {AppComponent} from './app.component';
import {HomeComponent} from './_views/main_views/home/home.component';
import {ContestsComponent} from './_views/main_views/contests/view-contests/contests.component';
import {AlertComponent} from './_views/alert/alert.component';
import {ClientsDashboardComponent} from './_views/dashboards/clients-dashboard/dashboard/clients-dashboard.component';
import {DesignersDashboardComponent} from './_views/dashboards/designers-dashboard/dashboard/designers-dashboard.component';
import {HowItWorksComponent} from './_views/main_views/how-it-works/how-it-works.component';
import {SettingsComponent} from './_views/admin_pages/settings/settings.component';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {AppCommons, RequestInterceptor, ResponseInterceptor} from './_helpers';
import {ProfileComponent} from './_views/profile/user-profile/profile.component';
import {ContactsComponent} from './_views/profile/contacts/contacts.component';
import {NavigationComponent} from './_views/navigation/navigation.component';
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
import {ChatsComponent} from './_views/profile/chats/chats.component';
import {PaymentModesComponent} from './_views/admin_pages/payment-modes/payment-modes.component';
import {CommissionsComponent} from './_views/admin_pages/commissions/commissions.component';
import {UserContactsComponent} from './_views/admin_pages/users/user-contacts/user-contacts.component';
import {UpdateUserDetailsComponent} from './_views/profile/update-user-details/update-user-details.component';
import {DesignerProfileComponent} from './_views/main_views/designers/designer-profile/designer-profile.component';
import {ClientProfilesComponent} from './_views/profile/client-profiles/client-profiles.component';
import {ContactFormComponent} from './_views/main_views/contact-form/contact-form.component';
import {DiscountsComponent} from './_views/admin_pages/discounts/discounts.component';
import {AdminMainPageComponent} from './_views/admin_pages/admin-main-page/admin-main-page.component';
import {ProfileMainPageComponent} from './_views/profile/profile-main-page/profile-main-page.component';
import {ContestStagesComponent} from './_views/admin_pages/contest-stages/contest-stages.component';
import {AddContestsComponent} from './_views/main_views/contests/add-contests/add-contests.component';
import {LogoUsesComponent} from './_views/admin_pages/logo-uses/logo-uses.component';
import {ViewSingleContestComponent} from './_views/main_views/contests/view-single-contest/view-single-contest.component';
import {FaqComponent} from './_views/main_views/faq/faq.component';
import {PolicyComponent} from './_views/main_views/policy/policy.component';
import {TosComponent} from './_views/main_views/tos/tos.component';
import {FooterComponent} from './_views/main_views/footer/footer.component';
import {
	NewsLettersSubscriptionsComponent
} from './_views/admin_pages/news-letters-subscriptions/news-letters--subscriptions.component';
import {LiveContestsComponent} from './_views/dashboards/designers-dashboard/live-contests/live-contests.component';
import {JudgingContestsComponent} from './_views/dashboards/designers-dashboard/judging-contests/judging-contests.component';
import {EndedContestsComponent} from './_views/dashboards/designers-dashboard/ended-contests/ended-contests.component';
import {RankedDesignsComponent} from './_views/dashboards/designers-dashboard/ranked-designs/ranked-designs.component';
import {WonContestsComponent} from './_views/dashboards/designers-dashboard/won-contests/won-contests.component';
import {
	ClientEndedContestsComponent
} from './_views/dashboards/clients-dashboard/client-ended-contests/client-ended-contests.component';
import {ClientLiveContestsComponent} from './_views/dashboards/clients-dashboard/client-live-contests/client-live-contests.component';
import {
	ClientJudgingContestsComponent
} from './_views/dashboards/clients-dashboard/client-judging-contests/client-judging-contests.component';
import {LocationStrategy, PathLocationStrategy} from '@angular/common';
import {
	ClientDraftContestsComponent
} from './_views/dashboards/clients-dashboard/client-draft-contests/client-draft-contests.component';

@NgModule({
	declarations: [
		AppComponent,
		DesignersDashboardComponent,
		HomeComponent,
		ContestsComponent,
		AlertComponent,
		DesignersComponent,
		DesignersDashboardComponent,
		ClientsDashboardComponent,
		SignupComponent,
		SigninComponent,
		RecoveryComponent,
		UpdateComponent,
		CategoriesComponent,
		VerifyEmailComponent,
		HowItWorksComponent,
		SettingsComponent,
		ProfileComponent,
		ContactsComponent,
		NavigationComponent,
		UpdateUserComponent,
		CountriesComponent,
		PermissionsComponent,
		RolesComponent,
		ViewRolesComponent,
		AddEditRolesComponent,
		ApiKeysComponent,
		ViewUsersComponent,
		AssignUserRolesComponent,
		AddEditUsersComponent,
		UpdateCredentialsComponent,
		ViewUserComponent,
		ChatsComponent,
		PaymentModesComponent,
		CommissionsComponent,
		UserContactsComponent,
		UpdateUserDetailsComponent,
		DesignerProfileComponent,
		ClientProfilesComponent,
		ContactFormComponent,
		DiscountsComponent,
		AdminMainPageComponent,
		ProfileMainPageComponent,
		ContestStagesComponent,
		AddContestsComponent,
		LogoUsesComponent,
		ViewSingleContestComponent,
		FaqComponent,
		PolicyComponent,
		TosComponent,
		FooterComponent,
		NewsLettersSubscriptionsComponent,
		LiveContestsComponent,
		JudgingContestsComponent,
		EndedContestsComponent,
		RankedDesignsComponent,
		WonContestsComponent,
		ClientEndedContestsComponent,
		ClientLiveContestsComponent,
		ClientJudgingContestsComponent,
		ClientDraftContestsComponent
	],
	imports: [
		BrowserModule,
		FormsModule,
		HttpClientModule,
		AppRoutingModule
	],
	providers: [AuthGuard, AuthenticationService, AlertService, UserService, PersonsService,
		PermissionsGuard, AlertService, CategoryService, CountriesService, ProfileService,
		PagerService, PermissionsService, ApiKeysService, ProfileService, ContactService,
		CommissionsService, PaymentModesService, SettingsService, DiscountsService, ContestStagesService,
		ContestsService, LogoUsesService, LogoBriefsService, PaypalEmailService,
		{
			provide: HTTP_INTERCEPTORS,
			useClass: RequestInterceptor,
			multi: true
		}, {
			provide: HTTP_INTERCEPTORS,
			useClass: ResponseInterceptor,
			multi: true
		}, AppCommons,
		Location, {provide: LocationStrategy, useClass: PathLocationStrategy}],
	bootstrap: [AppComponent]
})
export class AppModule {
}
