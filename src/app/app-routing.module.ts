/*
 * Copyright (c) 2019. The content in this file is Protected by the copyright laws of kenya and owned by Re.Kast Limited.
 * Reproducing it in any way or using it without permission from Re.Kast Limited will be a violation of kenyan copyrights law.
 * This may be subject to prosecution according to the kenyan law
 */
import {RouterModule, Routes} from '@angular/router';
import {ContestsComponent} from './_views/main_views/contests/contests.component';
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
import {FundingDisplayComponent} from './_views/dashboards/designers-dashboard/single-funding/single-funding.component';
import {ClientsDashboardComponent} from './_views/dashboards/clients-dashboard/clients-dashboard.component';
import {AcquisitionDisplayComponent} from './_views/dashboards/clients-dashboard/single-acquisition/single-acquisition.component';
import {DesignersDashboardComponent} from './_views/dashboards/designers-dashboard/designers-dashboard.component';
import {appConstants} from './_helpers/app.constants';
import {AuthGuard, AuthPagesGuard, EntityGuard} from './_guards';
import {AddEditFundingComponent} from './_views/dashboards/designers-dashboard/add-edit-funding/add-edit-funding.component';
import {AddEditAcquisitionsComponent} from './_views/dashboards/clients-dashboard/add-edit-acquisitions/add-edit-acquisitions.component';
import {SponsorsComponent} from './_views/dashboards/designers-dashboard/sponsors/sponsors.component';
import {BuyersComponent} from './_views/dashboards/clients-dashboard/buyers/buyers.component';
import {JobsComponent} from './_views/admin_pages/people/single/jobs/jobs.component';
import {BoardAppointmentsComponent} from './_views/admin_pages/people/single/board-appointments/board-appointments.component';
import {ProfileComponent} from './_views/profile/profile.component';
import {EducationComponent} from './_views/admin_pages/people/single/education/education.component';
import {SubsidiariesComponent} from './_views/main_views/single/subsidiaries/subsidiaries.component';
import {SocialMediaComponent} from './_views/profile/social-media/social-media.component';
import {CategoryComponent} from './_views/profile/category/category.component';
import {ContactsComponent} from './_views/profile/contacts/contacts.component';
import {FoundersComponent} from './_views/main_views/single/founders/founders.component';
import {NgModule} from '@angular/core';
import {EntityProfileComponent} from './_views/profile/add-profile/entity-profile/entity-profile.component';
import {PersonProfileComponent} from './_views/profile/add-profile/person-profile/person-profile.component';
import {ClaimComponent} from './_views/auth/claim/claim.component';
import {HowItWorksComponent} from './_views/main_views/how-it-works/how-it-works.component';
import {UpdateUserComponent} from './_views/auth/update-user/update-user.component';
import {CountriesComponent} from "./_views/admin_pages/countries/countries.component";
import {PermissionsComponent} from "./_views/admin_pages/permissions/permissions.component";
import {RolesComponent} from "./_views/admin_pages/roles/roles/roles.component";
import {ViewRolesComponent} from "./_views/admin_pages/roles/view-roles/view-roles.component";
import {AddEditRolesComponent} from "./_views/admin_pages/roles/add-edit-roles/add-edit-roles.component";

const appRoutes: Routes = [
    {path: '', component: SigninComponent, runGuardsAndResolvers: 'always'},
    {
        path: 'sign-up',
        component: SignupComponent,
        canActivate: [AuthPagesGuard],
        runGuardsAndResolvers: 'always'
    },
    {
        path: 'profile-update/:id',
        component: UpdateUserComponent,
        canActivate: [AuthGuard],
        runGuardsAndResolvers: 'always'
    },
    {path: 'sign-in', component: SigninComponent, runGuardsAndResolvers: 'always'},
    {
        path: 'sign-out',
        redirectTo: 'sign-in',
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
    {path: 'how-it-works', component: HowItWorksComponent, runGuardsAndResolvers: 'always'},
    {
        path: 'profile/:id',
        component: ProfileComponent,
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


    // probably should be cleared
    {
        path: 'profile/subsidiary/:id',
        component: SubsidiariesComponent,
        canActivate: [AuthGuard, EntityGuard],
        runGuardsAndResolvers: 'always'
    },
    {path: 'schools', component: DesignersComponent, runGuardsAndResolvers: 'always'},
    {path: 'companies', component: CompaniesComponent, runGuardsAndResolvers: 'always'},
    {path: 'people', component: PeopleComponent, runGuardsAndResolvers: 'always'},
    {path: 'person/:id', component: PersonComponent, runGuardsAndResolvers: 'always'},
    {
        path: 'person-jobs/:id',
        component: JobsComponent,
        canActivate: [AuthGuard],
        runGuardsAndResolvers: 'always'
    },
    {
        path: 'person-board-appointments/:id',
        component: BoardAppointmentsComponent,
        canActivate: [AuthGuard],
        runGuardsAndResolvers: 'always'
    },
    {
        path: 'education-history/:id',
        component: EducationComponent,
        canActivate: [AuthGuard],
        runGuardsAndResolvers: 'always'
    },
    {
        path: 'profile/social-media/:id',
        component: SocialMediaComponent,
        canActivate: [AuthGuard],
        runGuardsAndResolvers: 'always'
    },
    {
        path: 'profile/category/:id',
        component: CategoryComponent,
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
        path: 'profile/founders/:id',
        component: FoundersComponent,
        canActivate: [AuthGuard, EntityGuard],
        runGuardsAndResolvers: 'always'
    },
    {
        path: 'contests-profile',
        component: EntityProfileComponent,
        canActivate: [AuthGuard],
        runGuardsAndResolvers: 'always'
    },
    {
        path: 'contests-profile/:id',
        component: EntityProfileComponent,
        canActivate: [AuthGuard],
        runGuardsAndResolvers: 'always'
    },
    {
        path: 'person-profile/:id',
        component: PersonProfileComponent,
        canActivate: [AuthGuard],
        runGuardsAndResolvers: 'always'
    },
    {
        path: 'person-profile',
        component: PersonProfileComponent,
        canActivate: [AuthGuard],
        runGuardsAndResolvers: 'always'
    },
    {
        path: 'designers-dashboard/:id',
        component: FundingDisplayComponent,
        runGuardsAndResolvers: 'always'
    },
    {
        path: 'add-edit-designers-dashboard/:id',
        component: AddEditFundingComponent,
        canActivate: [AuthGuard],
        runGuardsAndResolvers: 'always'
    },
    {
        path: 'add-edit-designers-dashboard',
        component: AddEditFundingComponent,
        canActivate: [AuthGuard],
        runGuardsAndResolvers: 'always'
    },
    {
        path: 'add-sponsor',
        component: SponsorsComponent,
        canActivate: [AuthGuard],
        runGuardsAndResolvers: 'always'
    },
    {
        path: 'edit-sponsor',
        component: SponsorsComponent,
        canActivate: [AuthGuard],
        runGuardsAndResolvers: 'always'
    },
    {
        path: 'acquisition/:id',
        component: AcquisitionDisplayComponent,
        runGuardsAndResolvers: 'always'
    },
    {
        path: 'add-edit-acquisition/:id',
        component: AddEditAcquisitionsComponent,
        canActivate: [AuthGuard],
        runGuardsAndResolvers: 'always'
    },
    {
        path: 'add-edit-acquisition',
        component: AddEditAcquisitionsComponent,
        canActivate: [AuthGuard],
        runGuardsAndResolvers: 'always'
    },
    {
        path: 'add-buyer',
        component: BuyersComponent,
        canActivate: [AuthGuard],
        runGuardsAndResolvers: 'always'
    },
    {
        path: 'edit-buyer',
        component: BuyersComponent,
        canActivate: [AuthGuard],
        runGuardsAndResolvers: 'always'
    },
    {
        path: 'claim/:type/:id/:token',
        component: ClaimComponent,
        canActivate: [AuthPagesGuard],
        runGuardsAndResolvers: 'always'
    },
    {
        path: 'designers-dashboard-type/:id',
        component: FundingTypesComponent,
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
    imports: [RouterModule.forRoot(appRoutes, {useHash: false, onSameUrlNavigation: 'reload'})],
    exports: [RouterModule]
})
export class AppRoutingModule {
}
