import {Component} from '@angular/core';
import { ROUTER_DIRECTIVES, Routes } from '@angular/router';
import {Login} from '../app.component.login';
import {AllFilesComponent} from './app.menu.allFiles.component';
import {SharedWithUserFilesComponent} from './app.menu.sharedFiles';
import {DashBoardComponent} from './app.menu.dashboard.component';

@Component({
	selector: 'my_navBar',
	templateUrl: 'app/menu/my_navBar.html',
	directives:[ROUTER_DIRECTIVES]
})
@Routes([
		{ path: '/allFiles', component: AllFilesComponent },
		{ path: '/dashboard', component: DashBoardComponent },
		{ path: '/sharedWithUser', component: SharedWithUserFilesComponent },
		{ path: '/login', component: Login },
		{ path: '*', component: AllFilesComponent }])
export class MyNavBar{
}
