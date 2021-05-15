/*
 * Copyright (c) 2019. The content in this file is Protected by the copyright laws of kenya and owned by Re.Kast Limited.
 * Reproducing it in any way or using it without permission from Re.Kast Limited will be a violation of kenyan copyrights law.
 * This may be subject to prosecution according to the kenyan law
 */

import {ContactModel, PageModel, PersonModel} from '../_models';
import {appConstants} from './app.constants';
import * as CryptoJS from 'crypto-js';
import {PersonsService} from '../_services';
import {Injectable} from '@angular/core';

@Injectable()
export class AppCommons {
    /**
     * Checks the user permissions to make sure the users are authorised to see of perform the actions they wish to perform
     * @param requiredPermissions {@link Array}: The permissions required to perform the action
     * @param assignedPermissions {@link Array}: The user assigned permissions
     */
    public static checkIfPermissionsExist(requiredPermissions, assignedPermissions: []) {
        let hasPermissions = false
        let requiredPermissionsSize = requiredPermissions.length;
        let assignedPermissionsSize = assignedPermissions.length;
        if (!AppCommons.isObjectEmpty(requiredPermissions) && !AppCommons.isObjectEmpty(assignedPermissions)) {
            let j = 0;
            for (let i = 0; i < requiredPermissionsSize; i++) {
                for (j = 0; j < assignedPermissionsSize; j++) {
                    // @ts-ignore
                    if (requiredPermissions[i] == assignedPermissions[j].uuid) {
                        break;
                    }
                }
                if (j == assignedPermissionsSize) {
                    return hasPermissions;
                }
            }

            hasPermissions = true;
        }
        return hasPermissions;
    }

    public static calculateDays(startDate: string, endDate: string) {
        let difference = "";
        if (!AppCommons.isStringEmpty(startDate) && !AppCommons.isStringEmpty(endDate)) {
            let diffInMilliSeconds = Math.abs(new Date(endDate).getTime() - new Date(startDate).getTime()) / 1000;

            // calculate days
            const days = Math.floor(diffInMilliSeconds / 86400);
            diffInMilliSeconds -= days * 86400;

            // calculate hours
            const hours = Math.floor(diffInMilliSeconds / 3600) % 24;
            diffInMilliSeconds -= hours * 3600;

            // calculate minutes
            const minutes = Math.floor(diffInMilliSeconds / 60) % 60;
            diffInMilliSeconds -= minutes * 60;

            if (days > 0) {
                difference += (days === 1) ? `${days} day, ` : `${days} days, `;
            }

            difference += (hours === 0 || hours === 1) ? `${hours} hour, ` : `${hours} hours, `;
            difference += (minutes === 0 || hours === 1) ? `${minutes} minutes` : `${minutes} minutes`;
        }
        return difference;
    }

    public static getPagingInfo(page, limit, paginate) {
        const paging = new PageModel();
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
        const person = new PersonModel();
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
     * @desc Checks whether an object is empty/undefined. Returns a true if empty and false if not
     * @param object
     * @author dubdabasoduba
     */
    public static isObjectEmpty(object: any) {
        return object === null || object === undefined || object === appConstants.emptyEntry;
    }

    /**
     * @desc Creates a contact model object
     * @param model {@link ContactModel}
     * @author dubdabasoduba
     */
    public createContactObject(model: any) {
        const contact = new ContactModel();
        contact.email = model.email;
        contact.phone_number = model.phonenumber;
        contact.country = model.country;
        contact.is_main = Number(0);
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
