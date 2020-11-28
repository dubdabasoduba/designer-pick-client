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
    AlertService,
    ApiKeysService,
    AuthenticationService,
    CategoryService,
    CommissionsService,
    CountriesService,
    PagerService,
    PaymentModesService,
    PermissionsService,
    PersonsService,
    ProfileService,
    SettingsService,
    UserService
} from './_services';

import {DesignersComponent} from './_views/main_views/designers/designers/designers.component';
import {SignupComponent} from './_views/auth/Signup/signup.component';
import {SigninComponent} from './_views/auth/Signin/signin.component';
import {RecoveryComponent} from './_views/auth/recovery/recovery.component';
import {UpdateComponent} from './_views/auth/update-password/update.component';
import {CategoriesComponent} from './_views/admin_pages/categories/categories.component';
import {VerifyEmailComponent} from './_views/auth/verify-email/verify.component';
import {AppComponent} from './app.component';
import {HomeComponent} from './_views/main_views/home/home.component';
import {ContestsComponent} from './_views/main_views/contests/contests.component';
import {AlertComponent} from './_views/alert/alert.component';
import {ClientsDashboardComponent} from './_views/dashboards/clients-dashboard/clients-dashboard.component';
import {DesignersDashboardComponent} from './_views/dashboards/designers-dashboard/designers-dashboard.component';
import {HowItWorksComponent} from './_views/main_views/how-it-works/how-it-works.component';
import {SettingsComponent} from './_views/admin_pages/settings/settings.component';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {RequestInterceptor} from './_helpers/requestInterceptor';
import {ResponseInterceptor} from './_helpers/responseInterceptor';
import {ProfileComponent} from './_views/profile/user-profile/profile.component';
import {ContactsComponent} from './_views/profile/contacts/contacts.component';
import {NavigationComponent} from './_views/navigation/navigation.component';
import {AppCommons} from './_helpers/app.commons';
import {UpdateUserComponent} from './_views/auth/update-user/update-user.component';
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
import {ViewUserComponent} from './_views/admin_pages/users/view-user/view-user.component';
import {ChatsComponent} from './_views/profile/chats/chats.component';
import {PaymentModesComponent} from './_views/admin_pages/payment-modes/payment-modes.component';
import {CommissionsComponent} from './_views/admin_pages/commissions/commissions.component';
import {UserContactsComponent} from "./_views/admin_pages/users/user-contacts/user-contacts.component";
import {ContactService} from "./_services/admin_services/contact/contact.service";
import {UpdateUserDetailsComponent} from './_views/profile/update-user-details/update-user-details.component';
import {DesignerProfileComponent} from './_views/main_views/designers/designer-profile/designer-profile.component';
import {ClientProfilesComponent} from './_views/profile/client-profiles/client-profiles.component';
import {ContactFormComponent} from './_views/main_views/contact-form/contact-form.component';

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
        ContactFormComponent
    ],
    imports: [
        BrowserModule,
        FormsModule,
        HttpClientModule,
        AppRoutingModule
    ],
    providers: [AuthGuard, AuthenticationService, AlertService, UserService, PersonsService,
        AuthPagesGuard, AlertService, CategoryService, CountriesService, ProfileService,
        PagerService, PermissionsService, ApiKeysService, ProfileService, ContactService,
        CommissionsService, PaymentModesService, SettingsService,
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
