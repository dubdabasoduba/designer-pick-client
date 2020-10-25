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
    ApiKeysService,
    AuthenticationService,
    CategoryService,
    ClaimService,
    CompaniesService,
    CountriesService,
    EntitiesService,
    FoundersService,
    FundingService,
    FundingTypesService,
    PagerService,
    PermissionsService,
    PersonsService,
    ProfileService,
    SchoolsService,
    UserService
} from './_services';

import {DesignersComponent} from './_views/main_views/designers/designers.component';
import {CompaniesComponent} from './_views/main_views/companies/companies.component';
import {PeopleComponent} from './_views/admin_pages/people/list/people.component';
import {PersonComponent} from './_views/admin_pages/people/single/display/person.component';
import {SignupComponent} from './_views/auth/Signup/signup.component';
import {SigninComponent} from './_views/auth/Signin/signin.component';
import {RecoveryComponent} from './_views/auth/recovery/recovery.component';
import {UpdateComponent} from './_views/auth/update-password/update.component';
import {FundingTypesComponent} from './_views/dashboards/designers-dashboard/funding-types/funding-types.component';
import {CategoriesComponent} from './_views/admin_pages/categories/categories.component';
import {VerifyEmailComponent} from './_views/auth/verify-email/verify.component';
import {AppComponent} from './app.component';
import {HomeComponent} from './_views/home/home.component';
import {ContestsComponent} from './_views/main_views/contests/contests.component';
import {InvestorsComponent} from './_views/admin_pages/investors/list/investors.component';
import {AlertComponent} from './_views/alert/alert.component';
import {FundingDisplayComponent} from './_views/dashboards/designers-dashboard/single-funding/single-funding.component';
import {ClientsDashboardComponent} from './_views/dashboards/clients-dashboard/clients-dashboard.component';
import {AcquisitionDisplayComponent} from './_views/dashboards/clients-dashboard/single-acquisition/single-acquisition.component';
import {DesignersDashboardComponent} from './_views/dashboards/designers-dashboard/designers-dashboard.component';
import {SidebarComponent} from './_views/admin_pages/sidebar/sidebar.component';
import {HowItWorksComponent} from './_views/main_views/how-it-works/how-it-works.component';
import {SettingsComponent} from './_views/admin_pages/settings/settings.component';
import {AddEditFundingComponent} from './_views/dashboards/designers-dashboard/add-edit-funding/add-edit-funding.component';
import {AddEditAcquisitionsComponent} from './_views/dashboards/clients-dashboard/add-edit-acquisitions/add-edit-acquisitions.component';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {RequestInterceptor} from './_helpers/requestInterceptor';
import {SponsorsComponent} from './_views/dashboards/designers-dashboard/sponsors/sponsors.component';
import {BuyersComponent} from './_views/dashboards/clients-dashboard/buyers/buyers.component';
import {ResponseInterceptor} from './_helpers/responseInterceptor';
import {JobsComponent} from './_views/admin_pages/people/single/jobs/jobs.component';
import {BoardAppointmentsComponent} from './_views/admin_pages/people/single/board-appointments/board-appointments.component';
import {ProfileComponent} from './_views/profile/profile.component';
import {EducationComponent} from './_views/admin_pages/people/single/education/education.component';
import {SubsidiariesComponent} from './_views/main_views/single/subsidiaries/subsidiaries.component';
import {SocialMediaComponent} from './_views/profile/social-media/social-media.component';
import {CategoryComponent} from './_views/profile/category/category.component';
import {ContactsComponent} from './_views/profile/contacts/contacts.component';
import {FoundersComponent} from './_views/main_views/single/founders/founders.component';
import {NavigationComponent} from './_views/navigation/navigation.component';
import {PersonProfileComponent} from './_views/profile/add-profile/person-profile/person-profile.component';
import {EntityProfileComponent} from './_views/profile/add-profile/entity-profile/entity-profile.component';
import {ClaimComponent} from './_views/auth/claim/claim.component';
import {AppCommons} from './_helpers/app.commons';
import {UpdateUserComponent} from './_views/profile/update-user/update-user.component';
import {CountriesComponent} from "./_views/admin_pages/countries/countries.component";
import {PermissionsComponent} from "./_views/admin_pages/permissions/permissions.component";
import {RolesComponent} from './_views/admin_pages/roles/roles/roles.component';
import {ViewRolesComponent} from './_views/admin_pages/roles/view-roles/view-roles.component';
import {AddEditRolesComponent} from './_views/admin_pages/roles/add-edit-roles/add-edit-roles.component';
import {ApiKeysComponent} from './_views/admin_pages/api-keys/api-keys.component';
import {ViewUsersComponent} from './_views/admin_pages/users/view-users/view-users.component';
import {AssignUserRolesComponent} from './_views/admin_pages/users/assign-user-roles/assign-user-roles.component';
import {AddEditUsersComponent} from './_views/admin_pages/users/add-edit-users/add-edit-users.component';
import {UpdateCredentialsComponent} from './_views/profile/update-credentials/update-credentials.component';
import { ViewUserComponent } from './_views/admin_pages/users/view-user/view-user.component';
import { ChatsComponent } from './_views/profile/chats/chats.component';
import { PaymentModesComponent } from './_views/admin_pages/payment-modes/payment-modes.component';
import { CommissionsComponent } from './_views/admin_pages/commissions/commissions.component';

@NgModule({
    declarations: [
        AppComponent,
        DesignersDashboardComponent,
        HomeComponent,
        ContestsComponent,
        InvestorsComponent,
        AlertComponent,
        DesignersComponent,
        CompaniesComponent,
        PeopleComponent,
        PersonComponent,
        DesignersDashboardComponent,
        ClientsDashboardComponent,
        SignupComponent,
        SigninComponent,
        RecoveryComponent,
        UpdateComponent,
        FundingTypesComponent,
        CategoriesComponent,
        VerifyEmailComponent,
        FundingDisplayComponent,
        AcquisitionDisplayComponent,
        SidebarComponent,
        HowItWorksComponent,
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
        CommissionsComponent
    ],
    imports: [
        BrowserModule,
        FormsModule,
        HttpClientModule,
        AppRoutingModule
    ],
    providers: [AuthGuard, AuthenticationService, AlertService, UserService, PersonsService,
        EntitiesService, SchoolsService, CompaniesService, FundingService, AcquisitionsService, AuthPagesGuard,
        AlertService, FoundersService, CategoryService, FundingTypesService, CountriesService, ClaimService, ProfileService,
        PagerService, PermissionsService, ApiKeysService, ProfileService,
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
