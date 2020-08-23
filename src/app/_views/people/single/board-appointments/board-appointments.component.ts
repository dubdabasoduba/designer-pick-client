/*
 * Copyright (c) 2019. The content in this file is Protected by the copyright laws of kenya and owned by Re.Kast Limited.
 * Reproducing it in any way or using it without permission from Re.Kast Limited will be a violation of kenyan copyrights law.
 * This may be subject to prosecution according to the kenyan law
 */

import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {AlertService, AuthenticationService, EntitiesService, PersonsService} from '../../../../_services';
import {appConstants} from '../../../../_helpers/app.constants';
import {Jobs, Person} from '../../../../_models';
import {AppCommons} from '../../../../_helpers/app.commons';
import {ResponseModel} from '../../../../_models/response.model';

@Component({
	selector: 'app-board-appointments',
	templateUrl: './board-appointments.component.html',
	styleUrls: ['./board-appointments.component.css']
})
export class BoardAppointmentsComponent implements OnInit {
	loading = false;
	entities: any;
	public personName: string;
	boardAppointments: any = [];
	personId: string;
	boardAppointmentId: string;
	model: any = {};
	boardId: string;
	private person: any;
	private responseModel = new ResponseModel();

	constructor(
		private route: ActivatedRoute,
		private alertService: AlertService,
		private authenticationService: AuthenticationService,
		private personService: PersonsService,
		private entityService: EntitiesService) {
	}

	ngOnInit() {
		this.route.params.subscribe(params => {
			this.personId = params[appConstants.id];
		});

		this.route.queryParams.subscribe(params => {
			this.boardId = params.board;
		});

		if (this.boardId !== null && this.personId !== null) {
			this.getBoard();
		}

		if (this.personId !== null) {
			this.getPerson();
		}
		this.getEntities();
		this.setEmptyModel();
	}

	addEditBoardAppointment() {
		this.loading = false;
		if (this.model.entity == appConstants.emptyEntry || this.model.entity == undefined) {
			this.alertService.error(appConstants.entityError);
		} else if (this.model.title == appConstants.emptyEntry || this.model.title == undefined) {
			this.alertService.error(appConstants.titleError);
		} else if (this.model.startDate == appConstants.emptyEntry || this.model.startDate == undefined) {
			this.alertService.error(appConstants.startDateError);
		} else if (this.model.status == appConstants.emptyEntry || this.model.status == undefined) {
			this.alertService.error(appConstants.statusError);
		} else if (AppCommons.validateDate(this.model.startDate, true, null)) {
			this.alertService.error(appConstants.greaterThanTodayStartDate);
		} else if (this.model.endDate != appConstants.emptyEntry && this.model.endDate != undefined) {
			if (AppCommons.validateDate(this.model.startDate, false, this.model.endDate)) {
				this.alertService.error(appConstants.greaterEndDateThanStartDate);
			}
		} else {
			const person = AppCommons.createPersonObject(this.person, this.personId);
			person.boards = this.createBoard(this.person.boards);
			this.updatePerson(person, false);
		}
		return false;
	}

	removeBoardAppointment(board: Jobs) {
		this.loading = true;
		const person = AppCommons.createPersonObject(this.person, this.personId);
		for (let i = 0; i < person.boards.length; i++) {
			if (person.boards[i]._id == board.id) {
				person.boards.splice(i, 1);
			}
		}
		this.updatePerson(person, true);
	}

	editBoard(board: any) {
		this.model.id = board.entityId;
		this.model.entity = board.entityId;
		this.model.title = board.title;
		this.model.startDate = AppCommons.formatEditDateDisplay(new Date(board.startDate));
		if (AppCommons.isStringEmpty(board.endDate)) {
			this.model.endDate = AppCommons.formatEditDateDisplay(new Date(board.endDate));
		}
		this.model.status = board.status;
		this.model.isMain = board.isMain == appConstants.yes ? true : false;
		this.boardAppointmentId = board.id;
		this.boardId = board.id;
	}

	private getPerson() {
		this.loading = true;
		this.personService.getPersonById(this.personId).subscribe(
			data => {
				this.createBoardAppointments(data);
				this.person = data;
				this.personName = this.person.name;
				this.loading = false;
			},
			error => {
				this.alertService.error(error);
				this.loading = false;
			}
		);
	}

	private createBoardAppointments(data: any) {
		if (data !== null) {
			const appointments = data.boards;
			for (let i = 0; i < appointments.length; i++) {
				const boardAppointment = new Jobs();
				boardAppointment.id = appointments[i]._id;
				boardAppointment.entityId = appointments[i].organisation._id;
				boardAppointment.entity = appointments[i].organisation.name;
				boardAppointment.entityIconImage = appointments[i].organisation.iconImage || appConstants.defaultImageIcon;
				boardAppointment.startDate = AppCommons.checkNullDate(appointments[i].startDate, true);
				boardAppointment.endDate = AppCommons.checkNullDate(appointments[i].endDate, true);
				boardAppointment.title = appointments[i].title;
				boardAppointment.isMain = appointments[i].isMain == true ? appConstants.yes : appConstants.no;
				boardAppointment.status = appointments[i].status;
				this.boardAppointments.push(boardAppointment);
			}
		}
	}

	private setEmptyModel() {
		this.model.id = appConstants.emptyEntry;
		this.model.entity = appConstants.emptyEntry;
		this.model.title = appConstants.emptyEntry;
		this.model.startDate = appConstants.emptyEntry;
		this.model.endDate = appConstants.emptyEntry;
		this.model.status = appConstants.emptyEntry;
	}

	private getEntities() {
		this.loading = true;
		this.entityService.getEntities(false).subscribe(
			data => {
				// @ts-ignore
				this.responseModel = data;
				this.entities = AppCommons.createEntities(this.responseModel.results);
				this.loading = false;
			},
			error => {
				this.alertService.error(error);
				this.loading = false;
			}
		);
	}

	private getBoard() {
		this.loading = true;
		this.personService.getPersonById(this.personId).subscribe(
			data => {
				this.populateBoardModel(data);
				this.loading = false;
			},
			error => {
				this.alertService.error(error);
				this.loading = false;
			}
		);
	}

	private populateBoardModel(data: Object) {
		const person = AppCommons.createPersonObject(data, this.personId);
		for (let i = 0; i < person.boards.length; i++) {
			if (person.jobs[i]._id == this.boardId) {
				this.model.id = person.boards[i]._id;
				this.model.entity = person.boards[i].organistaion._id;
				this.model.title = person.boards[i].title;
				this.model.startDate = person.boards[i].startDate;
				this.model.endDate = person.boards[i].endDate;
				this.model.status = person.boards[i].status;
			}
		}
	}

	private updatePerson(person: Person, type: boolean) {
		this.loading = true;
		this.personService.updatePerson(person).subscribe(
			data => {
				if (!type) {
					this.alertService.success(appConstants.boardAdditionSuccess);
				}
				this.getPerson();
				this.loading = false;
			},
			error => {
				this.alertService.error(error);
				this.loading = false;
			}
		);
	}

	private createBoard(boardAppointment: any[] | any) {
		if (boardAppointment.length <= 0) {
			this.createBoardObject(boardAppointment);
		} else {
			if (this.boardAppointmentId != null || this.boardAppointmentId != undefined) {
				for (let i = 0; i < boardAppointment.length; i++) {
					if (this.boardId == boardAppointment[i]._id) {
						boardAppointment[i].organisation = this.model.entity;
						boardAppointment[i].title = this.model.title;
						boardAppointment[i].startDate = this.model.startDate;
						boardAppointment[i].endDate = this.model.endDate;
						boardAppointment[i].isMain = this.model.isMain;
						boardAppointment[i].status = this.model.status;
					}
				}
			} else {
				this.createBoardObject(boardAppointment);
			}
		}

		return boardAppointment;
	}

	private createBoardObject(boardAppointments: any) {
		const board = new Jobs();
		board.organisation = this.model.entity;
		board.title = this.model.title;
		board.startDate = this.model.startDate;
		board.endDate = this.model.endDate;
		board.isMain = this.model.isMain;
		board.status = this.model.status;
		boardAppointments.push(board);
	}
}
