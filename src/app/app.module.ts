/*
 * Copyright (c) 2019. The content in this file is Protected by the copyright laws of kenya and owned by Re.Kast Limited.
 * Reproducing it in any way or using it without permission from Re.Kast Limited will be a violation of kenyan copyrights law.
 * This may be subject to prosecution according to the kenyan law
 */

import {AuthGuard, AuthPagesGuard} from './_guards';
import {AppRoutingModule} from './app-routing.module';
import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {FormsModule} from '@angular/forms';
import {
	AcquisitionsService,
	AlertService,
	AuthenticationService,
	ClaimService,
	CompaniesService,
	CountriesService,
	EntitiesService,
	FoundersService,
	FundingService,
	FundingTypesService,
	IndustryService,
	PagerService,
	PersonsService,
	ProfileService,
	SchoolsService,
	UserService
} from './_services';

import {SchoolsComponent} from './_views/entity/list/schools/schools.component';
import {CompaniesComponent} from './_views/entity/list/companies/companies.component';
import {PeopleComponent} from './_views/people/list/people.component';
import {PersonComponent} from './_views/people/single/display/person.component';
import {SignupComponent} from './_views/auth/Signup/signup.component';
import {SigninComponent} from './_views/auth/Signin/signin.component';
import {RecoveryComponent} from './_views/auth/recovery/recovery.component';
import {UpdateComponent} from './_views/auth/update-password/update.component';
import {FundingTypesComponent} from './_views/investments/funding/funding-types/funding-types.component';
import {IndustryComponent} from './_views/industry/industry.component';
import {VerifyEmailComponent} from './_views/auth/verify-email/verify.component';
import {AppComponent} from './app.component';
import {EntityComponent} from './_views/entity/single/display/entity.component';
import {HomeComponent} from './_views/home/home.component';
import {EntitiesComponent} from './_views/entity/list/entities.component';
import {InvestorsComponent} from './_views/investors/list/investors.component';
import {AlertComponent} from './_views/alert/alert.component';
import {FundingDisplayComponent} from './_views/investments/funding/single-funding/single-funding.component';
import {AcquisitionsComponent} from './_views/investments/acquisitions/acquisitions.component';
import {AcquisitionDisplayComponent} from './_views/investments/acquisitions/single-acquisition/single-acquisition.component';
import {FundingComponent} from './_views/investments/funding/funding.component';
import {SidebarComponent} from './_views/sidebar/sidebar.component';
import {ResultComponent} from './_views/result/result.component';
import {SettingsComponent} from './_views/settings/settings.component';
import {AddEditFundingComponent} from './_views/investments/funding/add-edit-funding/add-edit-funding.component';
import {AddEditAcquisitionsComponent} from './_views/investments/acquisitions/add-edit-acquisitions/add-edit-acquisitions.component';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {RequestInterceptor} from './_helpers/requestInterceptor';
import {SponsorsComponent} from './_views/investments/funding/sponsors/sponsors.component';
import {BuyersComponent} from './_views/investments/acquisitions/buyers/buyers.component';
import {ResponseInterceptor} from './_helpers/responseInterceptor';
import {JobsComponent} from './_views/people/single/jobs/jobs.component';
import {BoardAppointmentsComponent} from './_views/people/single/board-appointments/board-appointments.component';
import {ProfileComponent} from './_views/profile/profile.component';
import {EducationComponent} from './_views/people/single/education/education.component';
import {SubsidiariesComponent} from './_views/entity/single/subsidiaries/subsidiaries.component';
import {SocialMediaComponent} from './_views/profile/social-media/social-media.component';
import {CategoryComponent} from './_views/profile/category/category.component';
import {ContactsComponent} from './_views/profile/contacts/contacts.component';
import {FoundersComponent} from './_views/entity/single/founders/founders.component';
import {NavigationComponent} from './_views/navigation/navigation.component';
import {PersonProfileComponent} from './_views/profile/add-profile/person-profile/person-profile.component';
import {EntityProfileComponent} from './_views/profile/add-profile/entity-profile/entity-profile.component';
import {ClaimComponent} from './_views/auth/claim/claim.component';
import {AppCommons} from './_helpers/app.commons';
import {UpdateUserComponent} from './_views/auth/update-user/update-user.component';

@NgModule({
	declarations: [
		AppComponent,
		EntityComponent,
		HomeComponent,
		EntitiesComponent,
		InvestorsComponent,
		AlertComponent,
		SchoolsComponent,
		CompaniesComponent,
		PeopleComponent,
		PersonComponent,
		FundingComponent,
		AcquisitionsComponent,
		SignupComponent,
		SigninComponent,
		RecoveryComponent,
		UpdateComponent,
		FundingTypesComponent,
		IndustryComponent,
		VerifyEmailComponent,
		FundingDisplayComponent,
		AcquisitionDisplayComponent,
		SidebarComponent,
		ResultComponent,
		SettingsComponent,
		AddEditFundingComponent,
		AddEditAcquisitionsComponent,
		SponsorsComponent,
		BuyersComponent,
		JobsComponent,
		BoardAppointmentsComponent,
		ProfileComponent,
		SocialMediaComponent,
		EducationComponent,
		CategoryComponent,
		ContactsComponent,
		FoundersComponent,
		NavigationComponent,
		SubsidiariesComponent,
		PersonProfileComponent,
		EntityProfileComponent,
		ClaimComponent,
		UpdateUserComponent
	],
	imports: [
		BrowserModule,
		FormsModule,
		HttpClientModule,
		AppRoutingModule
	],
	providers: [AuthGuard, AuthenticationService, AlertService, UserService, PersonsService,
		EntitiesService, SchoolsService, CompaniesService, FundingService, AcquisitionsService, AuthPagesGuard,
		AlertService, FoundersService, IndustryService, FundingTypesService, CountriesService, ClaimService, ProfileService,
		PagerService,
		{
			provide: HTTP_INTERCEPTORS,
			useClass: RequestInterceptor,
			multi: true
		}, {
			provide: HTTP_INTERCEPTORS,
			useClass: ResponseInterceptor,
			multi: true
		}, AppCommons],
	bootstrap: [AppComponent]
})
export class AppModule {
}
