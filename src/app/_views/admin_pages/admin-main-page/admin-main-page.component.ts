import {Component, OnInit} from '@angular/core';
import {AuthenticationService} from "../../../_services";
import {AppCommons, appConstants} from "../../../_helpers";

@Component({
	selector: 'app-admin-main-page',
	templateUrl: './admin-main-page.component.html',
	styleUrls: ['./admin-main-page.component.css']
})
export class AdminMainPageComponent implements OnInit {
	public appConstants = appConstants;
	
	constructor(private authService: AuthenticationService) {
	}
	
	ngOnInit(): void {
	
	}
	
	public checkPermissions(requiredPermission: string): boolean {
		let hasPermission = false;
		let requiredPermissions = [requiredPermission]
		if (this.authService.getCurrentUser() !== null && AppCommons.checkIfPermissionsExist(requiredPermissions, this.authService.getCurrentUser().auth.permissions)) {
			hasPermission = true;
		}
		return hasPermission;
	}
	
}
