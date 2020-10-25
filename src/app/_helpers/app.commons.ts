/*
 * Copyright (c) 2019. The content in this file is Protected by the copyright laws of kenya and owned by Re.Kast Limited.
 * Reproducing it in any way or using it without permission from Re.Kast Limited will be a violation of kenyan copyrights law.
 * This may be subject to prosecution according to the kenyan law
 */

import {
    Acquisitions,
    Category,
    ContactModel,
    Entity,
    Founders,
    Funding,
    PagesModel,
    Person,
    Work
} from '../_models';
import {appConstants} from './app.constants';
import * as CryptoJS from 'crypto-js';
import {PersonsService} from '../_services';
import {Injectable} from '@angular/core';

@Injectable()
export class AppCommons {
    public static getPagingInfo(page, limit, paginate) {
        const paging = new PagesModel();
        if ((this.isStringEmpty(page) || page <= 0) && (this.isStringEmpty(limit) || limit <= 0) &&
            this.isStringEmpty(paginate)) {
            paging.page = 1;
            paging.limit = 15;
            paging.paginate = true;
        } else {
            paging.page = page;
            paging.limit = limit;
            paging.paginate = paginate;
        }

        return paging;
    }

    public static getPagingUrl(paging: PagesModel) {
        let url = '';
        if ((!this.isStringEmpty(String(paging.page)) || paging.page > 0) &&
            (!this.isStringEmpty(String(paging.limit)) || paging.limit > 0) &&
            !this.isStringEmpty(String(paging.paginate))) {
            url = '?' + appConstants.pagination + paging.paginate + '&' + appConstants.page + paging.page + '&' +
                appConstants.limit + paging.limit;
        }

        return url;
    }

    /**
     * Formats the date to a format that the date input in html is able to designers-dashboard
     * @param date
     * @return date in the format yyyy-MM-dd
     */
    public static formatEditDateDisplay(date: Date) {
        let month = '' + (date.getMonth() + 1);
        let day = '' + date.getDate();
        const year = date.getFullYear();

        if (month.length < 2) {
            month = '0' + month;
        }
        if (day.length < 2) {
            day = '0' + day;
        }

        return [year, month, day].join('-');
    }

    public static convertStringToDate(date: string): Date {
        if (!this.isStringEmpty(date)) {
            return new Date(date);
        } else {
            return null;
        }
    }

    /**
     * @desc Creates a date formatted for designers-dashboard on the system
     * @param date
     * @author dubdabasoduba
     */
    public static formatDisplayDate(date: Date) {
        let dateString = '--';
        if (date !== null) {
            const monthNames = [
                'Jan', 'Feb', 'Mar',
                'Apr', 'May', 'Jun', 'Jul',
                'Aug', 'Sep', 'Oct',
                'Nov', 'Dec'
            ];

            const day = date.getDate();
            const monthIndex = date.getMonth();
            const year = date.getFullYear();

            dateString = monthNames[monthIndex] + ' ' + day + ', ' + year;
        }
        return dateString;
    }

    /**
     * @desc check the for null dates and return present if null
     * @param data {@link string}
     * @param type {@link boolean}
     * @author dubdabasoduba
     */
    public static checkNullDate(data: string, type: boolean) {
        const returnString = '';
        if (!this.isStringEmpty(data)) {
            return this.formatDisplayDate(new Date(data));
        } else {
            if (type) {
                return 'Present';
            } else {
                return returnString;
            }
        }
    }

    /**
     * @desc returns full year today
     * @param date
     * @author dubdabasoduba
     */
    public static getYear(date) {
        return date.getFullYear();
    }

    /**
     * @desc Creates an contests object for designers-dashboard
     * @param entities
     * @author dubdabasoduba
     */
    public static createEntityDisplay(entities) {
        const organisations = [];
        for (let i = 0; i < entities.length; i++) {
            const entity = new Entity();
            let contacts = [];
            if (entities[i].contacts != undefined) {
                contacts = entities[i].contacts;
            }
            const industry = entities[i].categories;
            entity.id = entities[i]._id;

            /*
             * Checks to see if the contests name if filled. If not then that contests is not displayed
             * */
            if (entities[i].name !== null) {
                entity.name = entities[i].name || appConstants.emptyEntry;
                entity.dateFounded = !AppCommons.isStringEmpty(entities[i].founded) ? this.formatDisplayDate(
                    new Date(Date.parse(entities[i].founded))) : appConstants.notDisclosed;
                entity.iconImage = entities[i].iconImage || appConstants.defaultImageIcon;
                if (contacts.length > 0) {
                    for (let v = 0; v < contacts.length; v++) {
                        if (contacts[v].primary === true) {
                            const contact = contacts[v].county || appConstants.notDisclosed + ', ' + contacts[v].country ||
                                appConstants.notDisclosed;
                            entity.location = contact || appConstants.notDisclosed;
                        }
                    }
                } else {
                    entity.location = entities[i].headquarter || appConstants.notDisclosed;
                }
                if (industry.length > 0) {
                    const industries = [];
                    for (let w = 0; w < industry.length; w++) {
                        if (industry[w].main === true) {
                            const category = new Category();

                            category.id = industry[w].category._id;
                            category.name = industry[w].category.name;
                            industries.push(category);
                        }
                        entity.industry = industries;
                    }
                }
                organisations.push(entity);
            }
        }
        return organisations;
    }

    /**
     * Creates the hased password to be stored in the database
     * @param {string} password -- The input password
     * @return {string} -- The encrypted password
     */
    public static generatePasswordHash(password: string) {
        const key = CryptoJS.enc.Base64.parse('$2y$10$thOcrK/BTbxBk5SAukrsOexyT8HyJ7HKYQCyhAnrjJbWQ1HzXVVWa');
        const iv = CryptoJS.enc.Base64.parse('$2y$10$T74bl/Lv8gq/u.7qmM03Yeei1Qa7TMZ82M.IOE60pO1QCLVDtDYwC');
        return CryptoJS.AES.encrypt(password, key, {iv: iv}).toString();
    }

    /**
     * @desc Returns the user-contacts object
     * @param contacts
     * @author dubdabasoduba
     */
    public static fetchContacts(contacts: any) {
        const contactDetails = [];
        for (let j = 0; j < contacts.length; j++) {
            const contact = new ContactModel();
            contact.country = contacts[j].country;
            contact.county = contacts[j].county;
            contact.phonenumber = contacts[j].phonenumber;
            contact.email = contacts[j].email;
            contact.is_main = contacts[j].primary == true ? appConstants.yes : appConstants.no;
            contact._id = contacts[j]._id;
            contactDetails.push(contact);
        }

        return contactDetails;
    }

    /**
     * Get the main person or contests location.
     * @param contacts -- Pass in all the user user-contacts
     * @return {string} -- Return a string of the main location from user-contacts
     */
    public static getMainLocation(contacts: any) {
        const mainContacts: any = {};
        for (let i = 0; i < contacts.length; i++) {
            if (contacts[i].primary == true) {
                mainContacts.country = contacts[i].country;
                mainContacts.county = contacts[i].county;
            }
        }

        return mainContacts.county + ', ' + mainContacts.country;
    }

    public static createFunding(funding: any) {
        const investors = [];
        funding.forEach((partner) => {
            const fundingDisplay = new Funding();
            fundingDisplay.id = partner._id;
            fundingDisplay.name = partner.name;
            fundingDisplay.isLargest = partner.isLargest ? appConstants.yes : appConstants.no;
            fundingDisplay.sponsorType = partner.sponsor_type;
            fundingDisplay.sponsorName = partner.sponsor_name;
            fundingDisplay.sponsorId = partner.sponsor_id;
            fundingDisplay.entityIconImage = partner.iconImage || appConstants.defaultImageIcon;
            fundingDisplay.funding_date = AppCommons.formatDisplayDate(new Date(partner.date_of_investment));
            investors.push(fundingDisplay);
        });

        return investors;
    }

    /**
     * Creates the list or all the place a person works i.e job & board appointments
     * @param work -- pass in the jobs or board appointments
     * @return {any[]} -- returns a list of all the work places and positions
     */
    public static createWorkList(work: any) {
        const workList = [];
        for (let i = 0; i < work.length; i++) {
            const userWork = new Work();
            userWork.entityId = work[i].organisation._id;
            userWork.entity = work[i].organisation.name;
            userWork.entityIconImage = work[i].organisation.iconImage || appConstants.defaultImageIcon;
            userWork.title = work[i].title;
            userWork.startDate = AppCommons.getYear(new Date(work[i].startDate));
            userWork.endDate =
                work[i].endDate == undefined || work[i].endDate == null ? appConstants.present : AppCommons.getYear(
                    new Date(work[i].endDate));
            userWork.isMain = work[i].isMain == true ? appConstants.primary : appConstants.emptyEntry;
            workList.push(userWork);
        }
        return workList;
    }

    /**
     * Calculate the age of persons using the dob
     * @param dob -- Date of birth
     * @return {number} -- The age from the date of birth
     */
    public static calculateAge(dob) {
        let age: number
        if (!this.isStringEmpty(dob)) {
            const today = new Date();
            const birthDate = new Date(dob);
            age = today.getFullYear() - birthDate.getFullYear();
            const month = today.getMonth() - birthDate.getMonth();
            if (month < 0 || (month === 0 && today.getDate() < birthDate.getDate())) {
                age--;
            }
        }
        return age;
    }

    public static createInvestments(fundings: any) {
        if (fundings.length > 0) {
            const investments = [];
            fundings.forEach((current_funding) => {
                const funding = new Funding();
                funding.id = current_funding._id;
                funding.name = current_funding.name;
                funding.entityId = current_funding.entity._id;
                funding.entity = current_funding.entity.name;
                funding.entityIconImage = current_funding.entity.iconImage || appConstants.defaultImageIcon;
                funding.amount = AppCommons.shortenNumber(current_funding.amount, 2);
                funding.funding_type = current_funding.funding_type.name;
                funding.funding_typeId = current_funding.funding_type._id;
                funding.isLargest = current_funding.isLargest == true ? appConstants.yes : appConstants.no;
                investments.push(funding);
            });

            return investments;
        }
    }

    public static getAcquisitions(acquisitions: any) {
        if (acquisitions.length > 0) {
            const investments = [];
            acquisitions.forEach((buyoff) => {
                const acquisition = new Acquisitions();
                acquisition.id = buyoff._id;
                acquisition.name = buyoff.name;
                acquisition.entityId = buyoff.entity._id;
                acquisition.entity = buyoff.entity.name;
                acquisition.entityIconImage = buyoff.entity.iconImage || appConstants.defaultImageIcon;
                acquisition.acquisition_date = AppCommons.formatDisplayDate(new Date(buyoff.date_of_investment));
                investments.push(acquisition);
            });

            return investments;
        }
    }

    public static createCompanies(companies: any) {
        if (companies != null && companies != '' && companies.length > 0) {
            const entities = [];
            for (let i = 0; i < companies.length; i++) {
                const company = new Entity();
                company.id = companies[i]._id;
                company.name = companies[i].name;
                company.iconImage = companies[i].iconImage || appConstants.defaultImageIcon;
                company.dateFounded =
                    AppCommons.formatDisplayDate(new Date(companies[i].founded)) || appConstants.notDisclosed;
                if (companies[i].headquarter == null) {
                    if (companies[i].contacts.length > 0) {
                        for (let j = 0; j < companies[i].contacts.length; j++) {
                            if (companies[i].contacts[j].primary == true) {
                                company.location = companies[i].contacts[j].county + ', ' + companies[i].contacts[j].country;
                            }
                        }
                    }
                } else {
                    company.location = companies[i].headquarter;
                }
                entities.push(company);
            }

            return entities;
        }
    }

    public static createEntities(organisations: any) {
        const entities = [];
        organisations.forEach((industry) => {
            if (!this.isStringEmpty(industry.name)) {
                const entity = new Entity();
                entity.id = industry._id;
                entity.name = industry.name;
                entities.push(entity);
            }
        });
        return entities;
    }

    /**
     * Creates a list of sponsors to use in the designers-dashboard & acquisition addition
     * @param sponsors -- Pass in the sponsors either people/contests
     * @return {any[]} -- Returns a list of formatted people/contests
     */
    public static createSponsorsList(sponsors: any) {
        const sponsor = [];
        for (let i = 0; i < sponsors.length; i++) {
            if (!this.isStringEmpty(sponsors[i].name)) {
                const entity = {id: '', name: ''};
                entity.id = sponsors[i]._id;
                entity.name = sponsors[i].name;
                sponsor.push(entity);
            }
        }
        return sponsor;
    }

    /**
     * @desc Create designers-dashboard amount
     * @param sponsors
     * @author dubdabasoduba
     */
    public static createAmount(sponsors: any) {
        let amount = 0;
        for (let i = 0; i < sponsors.length; i++) {
            amount += parseInt(sponsors[i].amount, 2);
        }

        return amount;
    }

    /**
     * Returns the numbers in short form e.g 6k => 6000, 51M => 51000000
     * @param number -- Number to be shortened
     * @param digits -- Decimal places to be used
     * @return {any} -- The string after shortening short form e.g 6k => 6000, 51M => 51000000
     */
    public static shortenNumber(number, digits) {
        const units = ['k', 'M', 'G', 'T', 'P', 'E', 'Z', 'Y'];
        let decimal = 0;
        if (digits == null) {
            digits = 1;
        }

        for (let i = units.length - 1; i >= 0; i--) {
            decimal = Math.pow(1000, i + 1);
            if (number <= -decimal || number >= decimal) {
                return +(number / decimal).toFixed(digits) + units[i];
            }
        }

        return number;
    }

    /**
     * Checks the dates given to see if the now date or second date is less than the start date
     * @param startDate
     * @param type
     * @param endDate
     */
    public static validateDate(startDate: string, type: boolean, endDate: string) {
        const dateOne = new Date(startDate);
        let dateTwo: Date;
        if (endDate != null && endDate != appConstants.emptyEntry) {
            dateTwo = new Date(endDate);
        }
        return type ? dateOne > new Date() : dateOne > dateTwo;
    }

    /**
     * Checks the years to see if the now year or second date is less than that start year
     * @param startYear
     * @param type
     * @param endYear
     */
    public static valicateYear(startYear: string, type: boolean, endYear: string) {
        let dateTwo: string;
        if (endYear != null && endYear != appConstants.emptyEntry) {
            dateTwo = endYear;
        }
        return type ? startYear > new Date().getFullYear().toString() : startYear > dateTwo;
    }

    /**
     * @desc Creates a persons object to help in updating the person in the database
     * @param user {@link Object}
     * @param personId {@link String}
     * @author dubdabasoduba
     */
    public static createPersonObject(user: any, personId: string) {
        const person = new Person();
        person.name = user.name;
        person.description = user.description;
        person.iconImage = user.iconImage;
        person.contacts = user.contacts;
        person.status = user.status;
        person.boards = user.boards;
        person.claimed = user.claimed;
        person.dob = user.dob;
        person.education = user.education;
        person.gender = user.gender;
        person.industry = user.industry;
        person.is_investor = user.is_investor;
        person.is_mentor = user.is_mentor;
        person.jobs = user.jobs;
        person.socialMedia = user.social_media;
        person.social_media = user.social_media;
        person._id = personId;
        person.date_added = user.date_added;
        person.date_updated = user.date_updated;
        return person;
    }

    /**
     * @desc Create an contests object to help in updating the contests the database
     * @param organisation {@link Object}
     * @param entityId {@link String}
     * @author dubdabasoduba
     */
    public static createEntityObject(organisation: any, entityId: string) {
        const entity = new Entity();
        entity.name = organisation.name;
        entity.description = organisation.description;
        entity.backgroundImage = organisation.backgroundImage;
        entity.iconImage = organisation.iconImage;
        entity.type = organisation.type;
        entity.contacts = organisation.contacts;
        entity.status = organisation.status;
        entity.subsidiaries = organisation.subsidiaries;
        entity.claimed = organisation.claimed;
        entity.date_claimed = organisation.date_claimed;
        entity.claim_code = organisation.claim_code;
        entity.headquarter = organisation.headquarter;
        entity.dateFounded = organisation.founded;
        entity.socialMedia = organisation.social_media;
        entity.social_media = organisation.social_media;
        entity.industry = organisation.industry;
        entity.founded = organisation.founded;
        entity.employees = organisation.employees;
        entity.valuation = organisation.valuation;
        entity.companyType = organisation.type;
        entity.mentor = organisation.is_mentor;
        entity.is_mentor = organisation.is_mentor;
        entity.is_investor = organisation.is_investor;
        entity.categories = organisation.categories;
        entity._id = entityId;
        entity.date_added = organisation.date_added;
        entity.dateClosed = organisation.dateClosed;
        entity.created_by = organisation.created_by;
        entity.updated_by = organisation.updated_by;
        entity.pitch_video = organisation.pitch_video;
        return entity;
    }

    /**
     * @desc Creates the contests subsidiaries for the contests
     * @param subsidiaries {@link any}
     * @author dubdabasoduba
     */
    public static createSubsidiaries(subsidiaries: any) {
        const childCompany = [];
        for (let i = 0; i < subsidiaries.length; i++) {
            const subsidiary = {id: '', founded: '', name: '', categories: '', entityIconImage: ''};
            subsidiary.id = subsidiaries[i].entity._id;
            subsidiary.name = subsidiaries[i].entity.name;
            subsidiary.entityIconImage = subsidiaries[i].entity.iconImage || appConstants.defaultImageIcon;
            subsidiary.founded = this.formatDisplayDate(new Date(Date.parse(subsidiaries[i].entity.founded)));
            subsidiary.categories = subsidiaries[i].entity.categories;
            childCompany.push(subsidiary);
        }

        return childCompany;
    }

    /**
     * @desc Checks whether a string is empty/undefined. Returns a true if empty and false if not
     * @param text
     * @author dubdabasoduba
     */
    public static isStringEmpty(text: string) {
        return text === null || text === undefined || text === appConstants.emptyEntry;
    }

    /**
     * @desc Creates a contact model object
     * @param model {@link ContactModel}
     * @author dubdabasoduba
     */
    public createContactObject(model: any) {
        const contact = new ContactModel();
        contact.email = model.email;
        contact.phonenumber = model.phonenumber;
        contact.country = model.country;
        contact.is_main = true;
        return contact;
    }

    /**
     * @desc Get the current user-contacts then updates the primary contact in case the are updated
     * @param model {@link any}
     * @param contacts {@link any}
     * @author dubdabasoduba
     */
    public updateContactObject(model: any, contacts: any) {
        contacts.forEach((contact) => {
            if (contact.primary) {
                contact.email = model.email;
                contact.phonenumber = model.phonenumber;
                contact.country = model.country;
            }
        });
        return contacts;
    }


    /**
     * @desc Creates an categories model object
     * @param model {@link Category}
     * @author dubdabasoduba
     */
    public createIndustryObject(model: any) {
        const industry = new Category();
        industry.category = model.industry;
        industry.main = true;
        return industry;
    }

    /**
     * @desc Updates the main categories of operation
     * @param model {@link any}
     * @param industries {@link any}
     * @author dubdabasoduba
     */
    public updateIndustryObject(model: any, industries: any) {
        industries.forEach((industry) => {
            if (industry.main) {
                industry.category = model.industry;
            }
        });
        return industries;
    }

    /**
     * @desc Checks whether an object is empty/undefined. Returns a true if empty and false if not
     * @param object
     * @author dubdabasoduba
     */
    public isObjectEmpty(object: any) {
        return object === null || object === undefined || object === appConstants.emptyEntry;
    }

    /**
     * @desc Retrieves the primary user-contacts for the contests
     * @param contacts {@link Array}
     * @return email {@link String}
     * @author dubdabasoduba
     */
    public getDefaultEmail(contacts: any) {
        let email = appConstants.emptyEntry;
        contacts.forEach((contact) => {
            if (contact.primary) {
                email = contact.email;
            }
        });

        return email;
    }

    /**
     * @desc Retrieves the default phonenumber for the contests
     * @param contacts {@link Array}
     * @return phonenumber {@link String}
     * @author dubdabasoduba
     */
    public getDefaultPhonenumber(contacts: any) {
        let phonenumber = appConstants.emptyEntry;
        contacts.forEach((contact) => {
            if (contact.primary) {
                phonenumber = contact.phonenumber;
            }
        });

        return phonenumber;
    }

    /**
     * @desc Retrieves the default country for the contests
     * @param contacts {@link Array}
     * @return country {@link String}
     * @author dubdabasoduba
     */
    public getDefaultCountry(contacts: any) {
        let country = appConstants.emptyEntry;
        contacts.forEach((contact) => {
            if (contact.primary && !AppCommons.isStringEmpty(contact.country)) {
                country = contact.country;
            }
        });

        return country;
    }

    /**
     * @desc Retrieves the default contests categories
     * @param industries {@link Array}
     * @return category {@link String}
     * @author dubdabasoduba
     */
    public getDefaultIndustry(industries: any) {
        let category = appConstants.emptyEntry;
        industries.forEach((industry) => {
            if (industry.main && !AppCommons.isStringEmpty(industry.category._id)) {
                category = industry.category._id;
            }
        });

        return category;
    }

    /**
     * @desc Creates the founder object for designers-dashboard
     * @param founder {@link Object}
     * @param entity {@link Object}
     * @param type {@link Boolean}
     * @author dubdabasoduba
     */
    public createFounder(founder: any, entity: any, type: any) {
        const currentFounder = new Founders();
        currentFounder._id = founder._id;
        currentFounder.entityId = entity._id;
        currentFounder.entity = entity.name;
        currentFounder.type = type;
        currentFounder.status = founder.status;
        currentFounder.date_added = founder.date_added;
        currentFounder.entityImageIcon =
            AppCommons.isStringEmpty(entity.iconImage) ? appConstants.defaultImageIcon : entity.iconImage;
        return currentFounder;
    }

    public getPerson(personService: PersonsService, entityId: string) {
        let results = {};
        personService.getPersonById(entityId).subscribe(
            data => {
                results = data;
            },
            error => {
                results = error;
            }
        );

        return results;
    }
}
