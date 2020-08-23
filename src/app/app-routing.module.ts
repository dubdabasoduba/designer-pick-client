/*
 * Copyright (c) 2019. The content in this file is Protected by the copyright laws of kenya and owned by Re.Kast Limited.
 * Reproducing it in any way or using it without permission from Re.Kast Limited will be a violation of kenyan copyrights law.
 * This may be subject to prosecution according to the kenyan law
 */
import {RouterModule, Routes} from '@angular/router';
import {HomeComponent} from './_views/home/home.component';
import {EntityComponent} from './_views/entity/single/display/entity.component';
import {EntitiesComponent} from './_views/entity/list/entities.component';
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
import {FundingDisplayComponent} from './_views/investments/funding/single-funding/single-funding.component';
import {AcquisitionsComponent} from './_views/investments/acquisitions/acquisitions.component';
import {AcquisitionDisplayComponent} from './_views/investments/acquisitions/single-acquisition/single-acquisition.component';
import {FundingComponent} from './_views/investments/funding/funding.component';
import {appConstants} from './_helpers/app.constants';
import {AuthGuard, AuthPagesGuard, EntityGuard} from './_guards';
import {AddEditFundingComponent} from './_views/investments/funding/add-edit-funding/add-edit-funding.component';
import {AddEditAcquisitionsComponent} from './_views/investments/acquisitions/add-edit-acquisitions/add-edit-acquisitions.component';
import {SponsorsComponent} from './_views/investments/funding/sponsors/sponsors.component';
import {BuyersComponent} from './_views/investments/acquisitions/buyers/buyers.component';
import {JobsComponent} from './_views/people/single/jobs/jobs.component';
import {BoardAppointmentsComponent} from './_views/people/single/board-appointments/board-appointments.component';
import {ProfileComponent} from './_views/profile/profile.component';
import {EducationComponent} from './_views/people/single/education/education.component';
import {SubsidiariesComponent} from './_views/entity/single/subsidiaries/subsidiaries.component';
import {SocialMediaComponent} from './_views/profile/social-media/social-media.component';
import {CategoryComponent} from './_views/profile/category/category.component';
import {ContactsComponent} from './_views/profile/contacts/contacts.component';
import {FoundersComponent} from './_views/entity/single/founders/founders.component';
import {NgModule} from '@angular/core';
import {EntityProfileComponent} from './_views/profile/add-profile/entity-profile/entity-profile.component';
import {PersonProfileComponent} from './_views/profile/add-profile/person-profile/person-profile.component';
import {ClaimComponent} from './_views/auth/claim/claim.component';
import {ResultComponent} from './_views/result/result.component';
import {UpdateUserComponent} from './_views/auth/update-user/update-user.component';

const appRoutes: Routes = [
	{path: '', component: HomeComponent, runGuardsAndResolvers: 'always'},
	{path: 'search', component: ResultComponent, runGuardsAndResolvers: 'always'},
	{path: 'entities', component: EntitiesComponent, runGuardsAndResolvers: 'always'},
	{path: 'entity/:id', component: EntityComponent, runGuardsAndResolvers: 'always'},
	{
		path: 'profile/subsidiary/:id',
		component: SubsidiariesComponent,
		canActivate: [AuthGuard, EntityGuard],
		runGuardsAndResolvers: 'always'
	},
	{path: 'schools', component: SchoolsComponent, runGuardsAndResolvers: 'always'},
	{path: 'companies', component: CompaniesComponent, runGuardsAndResolvers: 'always'},
	{path: 'people', component: PeopleComponent, runGuardsAndResolvers: 'always'},
	{path: 'person/:id', component: PersonComponent, runGuardsAndResolvers: 'always'},
	{path: 'person-jobs/:id', component: JobsComponent, canActivate: [AuthGuard], runGuardsAndResolvers: 'always'},
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
	{path: 'profile/category/:id', component: CategoryComponent, canActivate: [AuthGuard], runGuardsAndResolvers: 'always'},
	{path: 'profile/contacts/:id', component: ContactsComponent, canActivate: [AuthGuard], runGuardsAndResolvers: 'always'},
	{
		path: 'profile/founders/:id',
		component: FoundersComponent,
		canActivate: [AuthGuard, EntityGuard],
		runGuardsAndResolvers: 'always'
	},
	{
		path: 'entity-profile',
		component: EntityProfileComponent,
		canActivate: [AuthGuard],
		runGuardsAndResolvers: 'always'
	},
	{
		path: 'entity-profile/:id',
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
	{path: 'fundings', component: FundingComponent, runGuardsAndResolvers: 'always'},
	{path: 'funding/:id', component: FundingDisplayComponent, runGuardsAndResolvers: 'always'},
	{
		path: 'add-edit-funding/:id',
		component: AddEditFundingComponent,
		canActivate: [AuthGuard],
		runGuardsAndResolvers: 'always'
	},
	{
		path: 'add-edit-funding',
		component: AddEditFundingComponent,
		canActivate: [AuthGuard],
		runGuardsAndResolvers: 'always'
	},
	{path: 'add-sponsor', component: SponsorsComponent, canActivate: [AuthGuard], runGuardsAndResolvers: 'always'},
	{path: 'edit-sponsor', component: SponsorsComponent, canActivate: [AuthGuard], runGuardsAndResolvers: 'always'},
	{path: 'acquisitions', component: AcquisitionsComponent, runGuardsAndResolvers: 'always'},
	{path: 'acquisition/:id', component: AcquisitionDisplayComponent, runGuardsAndResolvers: 'always'},
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
	{path: 'add-buyer', component: BuyersComponent, canActivate: [AuthGuard], runGuardsAndResolvers: 'always'},
	{path: 'edit-buyer', component: BuyersComponent, canActivate: [AuthGuard], runGuardsAndResolvers: 'always'},
	{path: 'sign-up', component: SignupComponent, canActivate: [AuthPagesGuard], runGuardsAndResolvers: 'always'},
	{
		path: 'profile-update/:id',
		component: UpdateUserComponent,
		canActivate: [AuthGuard],
		runGuardsAndResolvers: 'always'
	},
	{path: 'sign-in', component: SigninComponent, runGuardsAndResolvers: 'always'},
	{path: 'sign-out', redirectTo: 'sign-in', runGuardsAndResolvers: 'always'},
	{
		path: 'claim/:type/:id/:token',
		component: ClaimComponent,
		canActivate: [AuthPagesGuard],
		runGuardsAndResolvers: 'always'
	},
	{path: 'recover-password', component: RecoveryComponent, canActivate: [AuthPagesGuard], runGuardsAndResolvers: 'always'},
	{
		path: 'update-password/:userId/:token',
		component: UpdateComponent,
		canActivate: [AuthPagesGuard],
		runGuardsAndResolvers: 'always'
	},
	{path: 'funding-type/:id', component: FundingTypesComponent, runGuardsAndResolvers: 'always'},
	{path: 'industry/:id', component: IndustryComponent, runGuardsAndResolvers: 'always'},
	{
		path: 'verify-email/:userId/:token',
		component: VerifyEmailComponent,
		canActivate: [AuthPagesGuard],
		runGuardsAndResolvers: 'always'
	},
	{path: 'profile/:id', component: ProfileComponent, canActivate: [AuthGuard], runGuardsAndResolvers: 'always'},
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
export class AppRoutingModule {}
