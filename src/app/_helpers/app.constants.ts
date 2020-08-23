/*
 * Copyright (c) 2019. The content in this file is Protected by the copyright laws of kenya and owned by Re.Kast Limited.
 * Reproducing it in any way or using it without permission from Re.Kast Limited will be a violation of kenyan copyrights law.
 * This may be subject to prosecution according to the kenyan law
 */

import {environment} from '../../environments/environment';

export const appConstants = {
	/*
	 * API request methods
	 * */
	get: 'GET',
	post: 'POST',
	put: 'PUT',
	delete: 'DELETE',

	appTitle: 'Re.Kast IO | Designed from the African Eco-System',
	registrationSuccessful: 'Account registered successfully. Please check your email to complete this process',
	passwordResetSuccessful: 'Your password has been reset successfully. You may now proceed to login',
	emptyEntry: '',
	baseApiV1Url: environment.baseApiUrl + 'api/v1',
	baseApiV2Url: environment.baseApiUrl + 'api/v2',
	id: 'id',
	entitySchool: 'School',
	yes: 'Yes',
	no: 'No',
	zeroSponsor: '0',
	notDisclosed: 'Not Disclosed',
	operational: 'Operational',
	closedDown: 'Closed Down',
	facebookAppId: '1805352073098225',
	missingDescription: 'The description is not available',
	blankOrganisation: 'The Company | Organisation is blank.',
	blankPerson: '',
	fetchError: 'An error occurred please contacts system admin',
	missingDate: 'Date Not Added',
	male: 'Male',
	female: 'Female',
	present: 'Present',
	primary: 'Primary',
	entity: 'entity',
	person: 'person',
	personDisplay: 'Person',
	Organisation: 'Organisation',
	yearly: 'Yearly',
	monthly: 'Monthly',
	weekly: 'Weekly',
	defaultImageIcon: 'assets/images/avatars/default.png',

	/*
	 * System error and success helpers
	 * */
	fundingNameError: 'Funding Name is required',
	acquisitionNameError: 'Acquisition Name is required',
	companyNameError: 'Company Funded is required',
	fundingSeriesError: 'Funding Series is required',
	fundingDateAnnouncementError: 'Funding Announcement Date is required',
	acquisitionDateAnnouncementError: 'Acquisition Announcement Date is required',
	statusError: 'Status is required',
	oneSponsorFoundError: 'This is the only sponsor. Funding cannot have 0 sponsors',
	oneBuyerFoundError: 'This is the only buyer. Acquisition cannot have 0 buyers',
	buyerRequiredError: 'Add at least one buyer',
	buyerAmountRequiredError: 'Buyer acquisition amount is required',
	sponsorRequiredError: 'Add at least one sponsor',
	sponsorAmountRequiredError: 'Sponsor funding amount is required',
	sponsorEquityGivenError: 'Equity given is required',
	startDateError: 'The start date is required',
	endDateError: 'The end date is required',
	titleError: 'The title is required',
	entityError: 'The entity is required',
	industryError: 'The industry is required',
	greaterThanTodayStartDate: 'The start date cannot be greater that the day today',
	greaterThanTodayStartYear: 'The start year cannot be greater that the year today',
	greaterEndYearThanStartYear: 'The start year cannot be greater that the end year',
	greaterEndDateThanStartDate: 'The start date cannot be greater that the endDate',
	stageError: 'The stage is required',
	linkTypeError: 'The link type is required',
	socialDisplayError: 'The display text is required',
	socialLinkError: 'The social link is required',
	countryError: 'The country is required',
	countyError: 'The county is required',
	phonenumberError: 'The phone number is required',
	emailError: 'The email is required',
	subsidiaryError: 'An organisation cannot be a subsidiary of itself',
	userSelectionError: 'Please select a user profile to add',
	contactsAdditionSuccess: 'Your contact was added',
	socialMediaAdditionSuccess: 'The social link was added',
	boardAdditionSuccess: 'Board appointment added',
	jobAdditionSuccess: 'Job added',
	educationAdditionSuccess: 'Your education history was added',
	sameEntityBuyerError: 'An entity cannot acquire itself',
	sameEntitySponsorError: 'An entity cannot fund itself',
	userDataMissingError: 'User data is required for you to initialize the claim request',
	founderError: 'An organisation cannot start itself',
	industryStatus: 'Please let us know if this is the main industry of operation',
	industryAddSuccess: 'Your industry of operation was added',
	industryUpdateSuccess: 'Your industry of operation was update',

	/*
	 * The API urls endpoints
	 * */
	pagination: 'paginate=',
	limit: 'limit=',
	page: 'page=',
	addEditFundingUrl: '/add-edit-funding/',
	fundingsUrl: '/fundings',
	investmentsUrl: '/funding/',
	investorsUrl: '/investor/',
	fundingUrl: '/funding/',
	fundingAddUrl: '/funding',
	fundingUpdateUrl: '/funding/',
	fundingTypesUrl: '/funding-types',
	fundingTypeUrl: '/funding-type/',
	fundingTypeEntityUrl: '/funding-type-entity/',

	// acquisition url endpoints
	acquisitionAddUrl: '/acquisition',
	acquisitionUrl: '/acquisitions',
	acquisitionUpdateUrl: '/acquisition/',
	addEditAcquisitionUrl: '/add-edit-acquisition/',

	// summary url endpoints
	peopleCount: '/summary/people',
	organisationCount: '/summary/organisations',
	monthlyFundingCount: '/summary/monthly-funding',
	annualFundingCount: '/summary/annual-funding',
	weeklyFundingCount: '/summary/weekly-funding',
	monthlyAcquisitionsCount: '/summary/monthly-acquisitions',
	annualAcquisitionsCount: '/summary/annual-acquisitions',
	weeklyAcquisitionsCount: '/summary/weekly-acquisitions',

	// auth url endpoints
	resendCodeUrl: '/auth/resend-verification',
	passwordChangeUrl: '/auth/password-change',

	// person url endpoints
	personUrl: '/person/',
	peopleUrl: '/persons',
	personEntityUrl: '/person-entity/',

	// entity url endpoints
	entityUrl: '/entity/',
	entitiesUrl: '/entities',
	schoolUrl: '/schools',
	companiesUrl: '/companies',

	// social media url endpoints
	socialMediaLinkGetUrl: '/social-links',

	// profile url endpoints
	initiateClaimProfileUrl: '/profile/initiate-claim',
	finalizeClaimProfileUrl: '/auth/finalize-claim',

	// founders url endpoints
	founderUrl: '/founder',

	/**
	 * Browser redirect urls
	 */
	authSignOutUrl: '/sign-out',
	addEntityProfile: '/add-entity-profile',
	addPersonProfile: '/add-person-profile',

	// avatar profile url endpoints
	uploadAvatarUrl: '/profile/profile/avatar/',
	deactivateAccountUrl: '/profile/deactivate/',

	// search url endpoints
	searchEntity: '/search/entity',
	searchPerson: '/search/person',

	// countries url endpoints
	countriesUrl: '/countries',
	countryUrl: '/country/',
	profileUpdateUrl: '/profile-update/',
	authSIgnInUrl: '/sign-in'
};


