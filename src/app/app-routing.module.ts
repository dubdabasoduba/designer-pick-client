/*
 * Copyright (c) 2019. The content in this file is Protected by the copyright laws of kenya and owned by Re.Kast Limited.
 * Reproducing it in any way or using it without permission from Re.Kast Limited will be a violation of kenyan copyrights law.
 * This may be subject to prosecution according to the kenyan law
 */
import {RouterModule, Routes} from '@angular/router';
import {ContestsComponent} from './_views/main_views/contests/contests.component';
import {DesignersComponent} from './_views/main_views/designers/designers/designers.component';
import {SignupComponent} from './_views/auth/Signup/signup.component';
import {SigninComponent} from './_views/auth/Signin/signin.component';
import {RecoveryComponent} from './_views/auth/recovery/recovery.component';
import {UpdateComponent} from './_views/auth/update-password/update.component';
import {CategoriesComponent} from './_views/admin_pages/categories/categories.component';
import {VerifyEmailComponent} from './_views/auth/verify-email/verify.component';
import {ClientsDashboardComponent} from './_views/dashboards/clients-dashboard/clients-dashboard.component';
import {DesignersDashboardComponent} from './_views/dashboards/designers-dashboard/designers-dashboard.component';
import {appConstants} from './_helpers/app.constants';
import {AuthGuard, AuthPagesGuard} from './_guards';
import {ProfileComponent} from './_views/profile/user-profile/profile.component';
import {ContactsComponent} from './_views/profile/contacts/contacts.component';
import {NgModule} from '@angular/core';
import {HowItWorksComponent} from './_views/main_views/how-it-works/how-it-works.component';
import {UpdateUserComponent} from './_views/auth/update-user/update-user.component';
import {CountriesComponent} from "./_views/admin_pages/countries/countries.component";
import {PermissionsComponent} from "./_views/admin_pages/permissions/permissions.component";
import {RolesComponent} from "./_views/admin_pages/roles/roles/roles.component";
import {ViewRolesComponent} from "./_views/admin_pages/roles/view-roles/view-roles.component";
import {AddEditRolesComponent} from "./_views/admin_pages/roles/add-edit-roles/add-edit-roles.component";
import {ApiKeysComponent} from "./_views/admin_pages/api-keys/api-keys.component";
import {ViewUsersComponent} from "./_views/admin_pages/users/view-users/view-users.component";
import {AssignUserRolesComponent} from "./_views/admin_pages/users/assign-user-roles/assign-user-roles.component";
import {AddEditUsersComponent} from "./_views/admin_pages/users/add-edit-users/add-edit-users.component";
import {UpdateCredentialsComponent} from "./_views/profile/update-credentials/update-credentials.component";
import {ViewUserComponent} from "./_views/admin_pages/users/view-user/view-user.component";
import {UserContactsComponent} from "./_views/admin_pages/users/user-contacts/user-contacts.component";
import {HomeComponent} from "./_views/main_views/home/home.component";
import {PaymentModesComponent} from "./_views/admin_pages/payment-modes/payment-modes.component";
import {CommissionsComponent} from "./_views/admin_pages/commissions/commissions.component";
import {SettingsComponent} from "./_views/admin_pages/settings/settings.component";
import {ChatsComponent} from "./_views/profile/chats/chats.component";
import {UpdateUserDetailsComponent} from "./_views/profile/update-user-details/update-user-details.component";
import {DesignerProfileComponent} from "./_views/main_views/designers/designer-profile/designer-profile.component";
import {DiscountsComponent} from "./_views/admin_pages/discounts/discounts.component";
import {ProfileMainPageComponent} from "./_views/profile/profile-main-page/profile-main-page.component";
import {AdminMainPageComponent} from "./_views/admin_pages/admin-main-page/admin-main-page.component";

const appRoutes: Routes = [
    {path: '', component: HomeComponent, runGuardsAndResolvers: 'always'},
    {
        path: 'sign-up',
        component: SignupComponent,
        canActivate: [AuthPagesGuard],
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
        canActivate: [AuthPagesGuard],
        runGuardsAndResolvers: 'always'
    },
    {
        path: 'update-password/:userId/:token',
        component: UpdateComponent,
        canActivate: [AuthPagesGuard],
        runGuardsAndResolvers: 'always'
    },
    {path: 'how-it-works', component: HowItWorksComponent, runGuardsAndResolvers: 'always'},
    {path: 'contests', component: ContestsComponent, runGuardsAndResolvers: 'always'},
    {path: 'designers', component: DesignersComponent, runGuardsAndResolvers: 'always'},
    {
        path: 'designer/:id',
        component: DesignerProfileComponent,
        runGuardsAndResolvers: 'always'
    },
    {path: 'how-it-works', component: HowItWorksComponent, runGuardsAndResolvers: 'always'},
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
        canActivate: [AuthGuard], runGuardsAndResolvers: 'always'
    },
    {
        path: 'categories', component: CategoriesComponent,
        canActivate: [AuthGuard], runGuardsAndResolvers: 'always'
    },
    {
        path: 'categories/:id', component: CategoriesComponent,
        canActivate: [AuthGuard], runGuardsAndResolvers: 'always'
    },
    {
        path: 'countries', component: CountriesComponent,
        canActivate: [AuthGuard], runGuardsAndResolvers: 'always'
    },
    {
        path: 'countries/:id', component: CountriesComponent,
        canActivate: [AuthGuard], runGuardsAndResolvers: 'always'
    },
    {
        path: 'permissions', component: PermissionsComponent,
        canActivate: [AuthGuard], runGuardsAndResolvers: 'always'
    },
    {
        path: 'permissions/:id', component: PermissionsComponent,
        canActivate: [AuthGuard], runGuardsAndResolvers: 'always'
    },
    {
        path: 'roles', component: RolesComponent,
        canActivate: [AuthGuard], runGuardsAndResolvers: 'always'
    },
    {
        path: 'role/:id', component: ViewRolesComponent,
        canActivate: [AuthGuard], runGuardsAndResolvers: 'always'
    },
    {
        path: 'roles/add', component: AddEditRolesComponent,
        canActivate: [AuthGuard], runGuardsAndResolvers: 'always'
    },
    {
        path: 'roles/edit/:id', component: AddEditRolesComponent,
        canActivate: [AuthGuard], runGuardsAndResolvers: 'always'
    },
    {
        path: 'api-keys', component: ApiKeysComponent,
        canActivate: [AuthGuard], runGuardsAndResolvers: 'always'
    },
    {
        path: 'api-keys/:id', component: ApiKeysComponent,
        canActivate: [AuthGuard], runGuardsAndResolvers: 'always'
    },
    {
        path: 'users', component: ViewUsersComponent,
        canActivate: [AuthGuard], runGuardsAndResolvers: 'always'
    },
    {
        path: 'user/:id/:userId', component: ViewUserComponent,
        canActivate: [AuthGuard], runGuardsAndResolvers: 'always'
    },
    {
        path: 'users/assign-roles/:id/:userId', component: AssignUserRolesComponent,
        canActivate: [AuthGuard], runGuardsAndResolvers: "always"
    },
    {
        path: 'users/contacts/:id/:contactId', component: UserContactsComponent,
        canActivate: [AuthGuard], runGuardsAndResolvers: "always"
    },
    {
        path: 'users/contacts/:id', component: UserContactsComponent,
        canActivate: [AuthGuard], runGuardsAndResolvers: "always"
    },
    {
        path: 'users/add', component: AddEditUsersComponent,
        canActivate: [AuthGuard], runGuardsAndResolvers: 'always'
    },
    {
        path: 'users/edit/:id', component: AddEditUsersComponent,
        canActivate: [AuthGuard], runGuardsAndResolvers: 'always'
    },
    {
        path: 'payment/payment-modes', component: PaymentModesComponent,
        canActivate: [AuthGuard], runGuardsAndResolvers: 'always'
    },
    {
        path: 'payment/payment-modes/:id', component: PaymentModesComponent,
        canActivate: [AuthGuard], runGuardsAndResolvers: 'always'
    },
    {
        path: 'payment/commissions', component: CommissionsComponent,
        canActivate: [AuthGuard], runGuardsAndResolvers: 'always'
    },
    {
        path: 'payment/commissions/:id', component: CommissionsComponent,
        canActivate: [AuthGuard], runGuardsAndResolvers: 'always'
    },
    {
        path: 'payment/discounts', component: DiscountsComponent,
        canActivate: [AuthGuard], runGuardsAndResolvers: 'always'
    },
    {
        path: 'payment/discounts/:id', component: DiscountsComponent,
        canActivate: [AuthGuard], runGuardsAndResolvers: 'always'
    },
    {
        path: 'settings', component: SettingsComponent,
        canActivate: [AuthGuard], runGuardsAndResolvers: 'always'
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
        canActivate: [AuthPagesGuard],
        runGuardsAndResolvers: 'always'
    },
    {
        path: 'connect-facebook',
        redirectTo: '/' + appConstants.baseApiV1Url + '/auth/connect-facebook',
        pathMatch: 'full',
        runGuardsAndResolvers: 'always'
    },
    {path: '**', redirectTo: '', runGuardsAndResolvers: 'always'}
];

@NgModule({
    imports: [RouterModule.forRoot(appRoutes, {
        useHash: true,
        onSameUrlNavigation: 'reload',
        relativeLinkResolution: 'legacy'
    })],
    exports: [RouterModule]
})
export class AppRoutingModule {
}
