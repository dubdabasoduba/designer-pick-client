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
    userId: 'userId',
    contactId: 'contactId',
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
    fetchError: 'An error occurred please user-contacts system admin',
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
    defaultImageIcon: 'assets/img/avatars/default.png',

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
    sponsorAmountRequiredError: 'Sponsor designers-dashboard amount is required',
    sponsorEquityGivenError: 'Equity given is required',
    startDateError: 'The start date is required',
    endDateError: 'The end date is required',
    titleError: 'The title is required',
    entityError: 'The contests is required',
    industryError: 'The categories is required',
    greaterThanTodayStartDate: 'The start date cannot be greater that the day today',
    greaterThanTodayStartYear: 'The start year cannot be greater that the year today',
    greaterEndYearThanStartYear: 'The start year cannot be greater that the end year',
    greaterEndDateThanStartDate: 'The start date cannot be greater that the endDate',
    stageError: 'The stage is required',
    linkTypeError: 'The link type is required',
    socialDisplayError: 'The designers-dashboard text is required',
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
    sameEntityBuyerError: 'An contests cannot acquire itself',
    sameEntitySponsorError: 'An contests cannot fund itself',
    userDataMissingError: 'UserModel data is required for you to initialize the claim request',
    founderError: 'An organisation cannot start itself',
    industryStatus: 'Please let us know if this is the main categories of operation',
    industryAddSuccess: 'Your categories of operation was added',
    industryUpdateSuccess: 'Your categories of operation was update',
    nameError: 'The name is required',
    apiKeyError: 'The API key is required',

    /**
     * The settings keys for the platform
     */
    commissions: "commissions",
    privateListingAmount: "private_listing_amount",
    highlightAmount: "highlight_amount",
    listingAmount: "listing_amount",
    featuringAmount: "featuring_amount",
    handlingAmount: "handling_amount",
    supportHours: "support_hours",


    /*
     * The API urls endpoints
     * */
    pagination: 'paginate=',
    limit: 'limit=',
    page: 'page=',
    addEditFundingUrl: '/add-edit-designers-dashboard/',
    fundingsUrl: '/fundings',
    investmentsUrl: '/designers-dashboard/',
    investorsUrl: '/investor/',
    fundingUrl: '/designers-dashboard/',
    fundingAddUrl: '/designers-dashboard',
    fundingUpdateUrl: '/designers-dashboard/',
    fundingTypesUrl: '/designers-dashboard-types',
    fundingTypeUrl: '/designers-dashboard-type/',
    fundingTypeEntityUrl: '/designers-dashboard-type-contests/',

    // acquisition url endpoints
    acquisitionAddUrl: '/acquisition',
    acquisitionUrl: '/designers-dashboard',
    acquisitionUpdateUrl: '/acquisition/',
    addEditAcquisitionUrl: '/add-edit-acquisition/',

    // summary url endpoints
    peopleCount: '/summary/people',
    organisationCount: '/summary/organisations',
    monthlyFundingCount: '/summary/monthly-designers-dashboard',
    annualFundingCount: '/summary/annual-designers-dashboard',
    weeklyFundingCount: '/summary/weekly-designers-dashboard',
    monthlyAcquisitionsCount: '/summary/monthly-designers-dashboard',
    annualAcquisitionsCount: '/summary/annual-designers-dashboard',
    weeklyAcquisitionsCount: '/summary/weekly-designers-dashboard',

    // auth url endpoints
    resendCodeUrl: '/auth/resend-verification',
    passwordChangeUrl: '/auth/password-change',

    // person url endpoints
    personUrl: '/person/',
    peopleUrl: '/persons',
    personEntityUrl: '/person-contests/',

    // contests url endpoints
    entityUrl: '/contests/',
    entitiesUrl: '/entities',
    schoolUrl: '/designers',
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
    addEntityProfile: '/add-contests-profile',
    addPersonProfile: '/add-person-profile',

    // avatar profile url endpoints
    uploadAvatarUrl: '/profile/profile/avatar/',
    deactivateAccountUrl: '/profile/deactivate/',

    // search url endpoints
    searchEntity: '/search/contests',
    searchPerson: '/search/person',

    // countries url endpoints
    countriesUrl: '/countries',
    countryUrl: '/country/',
    profileUpdateUrl: '/profile-update/',
    profileViewUrl: '/profile/',
    staffAdminViewUrl: '/admin',
    authSIgnInUrl: '/sign-in',
    clientDashboardUrl: 'client-dashboard/',
    designerDashboardUrl: 'designers-dashboard/',

    //news letter url endpoints
    subscribeToNewsLetterUrl: '/news-letters-subscriptions',

    //permissions
    readPermission: "82257bde-6381-48aa-862d-94d46948f8ca",
    updatePermission: "85ce62ba-b991-4fae-9c22-120afc2eb1a1",
    getAllPermissions: "4984ac5d-92d7-46bd-b255-aa6bf805690e",
    readRole: "558b0206-08a4-4767-8c63-deeb91e173f1",
    updateRole: "9ea3d0af-80d4-401f-ab9d-128c35659b4e",
    getAllRoles: "dc2db693-9953-44b5-8613-456989eb5052",
    deleteRole: "e3f63370-df7f-4dc2-bc15-6c13f351b151",
    readCommission: "984cf37b-f816-40cd-be90-83f249ff9182",
    getAllCommissions: "a3120a1e-2b38-4619-87bc-75315085a571",
    updateCommission: "cab5099a-1166-4e75-933f-417e863a3644",
    deleteCommission: "778319dc-4d09-4cbf-8aab-72bca4190b78",
    readDiscount: "2cad9d0c-8d47-4e14-8114-8475d3e2b344",
    getAllDiscounts: "2124edc4-4be9-4c89-a421-c7c5d351250c",
    updateDiscount: "1bc3b2b0-1fd4-4ed3-b193-c5b53b9d120e",
    deleteDiscount: "d994c5e1-4acc-4ad8-8185-2343ae8ed525",
    readPaymentMode: "2996ac6a-2540-4dd0-a492-0f88bd99adb7",
    getAllPaymentModes: "bf8b84a0-e446-4077-938e-bb9b1bfe7408",
    updatePaymentMode: "a1ff4e12-edd8-4676-b0d4-2b93eeb77869",
    deletePaymentMode: "79dbfe29-6283-481b-a756-5d3bd67eda4b",
    readCategory: "9e2a8df4-5495-4646-a50c-3e6106b6caea",
    getAllCategories: "c4bfadb5-e059-4d29-9e9c-65b2adef7841",
    updateCategory: "d956dea3-4fcb-428e-98d8-db5082aa4746",
    deleteCategory: "50b918e7-c8c4-4e41-9c3e-b32c527a816b",
    readCountry: "7707e38a-fc4c-45d3-80ba-0021946f3769",
    getAllCountries: "e39459ca-06d2-49ec-850d-87f17b808cad",
    updateCountry: "d795aaa8-4581-4768-9602-dac32193a921",
    deleteCountry: "b6f1bd34-0988-4ec3-9d1a-43b4696f5797",
    readApiKey: "e7a413bd-183a-4e14-ac2b-797a4bbef1a6",
    getAllApiKeys: "dc1d4f08-bed5-4931-8b51-f598ec7917f2",
    updateApiKey: "f91adcce-d3d8-4b4a-9e68-31889e6359da",
    deleteApiKey: "d0db111b-7c09-4ad3-a47a-7742b3f6dd2d",
    readSetting: "40ff2df8-bdb8-480b-bf33-808e02f9c8e7",
    getAllSettings: "a9f26482-8b17-4537-9fdb-7e2ef0fc9393",
    updateSetting: "c3cf485e-fb90-44da-92fc-855d414cd6ae",
    deleteSetting: "a1571d1d-50ea-453d-8383-fbf35f341709",
    readUser: "cd6b4c3b-545c-4a1b-8147-4b92332b313b",
    getAllUsers: "cc5bd5fe-01b8-4aec-bfb4-ad41b178992c",
    updateUser: "da04ce7b-e0f5-4cb1-9d09-b889d144277c",
    deleteUser: "d133f101-8c1f-4b30-b3a1-fb1e432005fd",
    readContestStage: "1be06245-ae65-4bfb-b60c-e4013a15dbac",
    getAllContestStages: "360dd679-63c6-4f53-9c37-7dabe7c2eea0",
    updateContestStage: "4bc31e86-f723-402a-9981-b54a6a2eb97f",
    deleteContestStage: "aab86e8b-7e0b-4c0d-a4c5-4d54478124a5",
    readLogoUses: "52f1da67-efa7-45ae-9745-5a09b5c4754b",
    getAllLogoUses: "f7ac3fc6-d906-4807-9a5d-e3f9e147f1f9",
    updateLogoUses: "904ffbb6-a29f-411f-a644-909aeedd986f",
    deleteLogoUses: "2fbfad4f-f68e-474c-9431-5906f782320d",
    updateNewsLetters: "922effb8-c7c0-490d-9a35-e5d5c8be1d94",
    getAllNewsLetters: "92c0db4a-2275-487e-be6f-675305c0c0d5",
    deleteNewsLetters: "c88ba660-17a3-4100-918e-b09c9088fa4b",
    readNewsLetters: "e1e53791-eaca-480d-b086-b307bc3a3dd0",
    accessAdminPage: "26b4c007-9de0-466c-92fb-650070144e0c",
};


