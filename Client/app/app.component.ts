import {Component} from '@angular/core';
import {MyNavBar} from './menu/app.menu.NavBar.component';
import {FileExplorer} from './explorer/app.explorer.fileExplorer.component';
import { ROUTER_DIRECTIVES, Routes, Router } from '@angular/router';
import {Login} from './app.component.login';
import {AllFilesComponent} from './menu/app.menu.allFiles.component';
import {SharedWithUserFilesComponent} from './menu/app.menu.sharedFiles';
import {DashBoardComponent} from './menu/app.menu.dashboard.component';

@Component({
	selector: 'my-app',
	template: `<h1>My Fcx 2 App</h1>
	<my_navBar></my_navBar>
	<file-explorer></file-explorer>


	`,
	directives:[MyNavBar, FileExplorer, ROUTER_DIRECTIVES],
})
@Routes([
		//{ path: '/crisis-center', component: CrisisListComponent },
		//{ path: '/heroes', component: HeroListComponent },
		{ path: '/allFiles', component: AllFilesComponent },
		{ path: '/dashboard', component: DashBoardComponent },
		{ path: '/sharedWithUser', component: SharedWithUserFilesComponent },
		{ path: '/login', component: Login },
		{ path: '*', component: AllFilesComponent }])
export class AppComponent {
	constructor(private router: Router){}

	ngOnInit() {
    this.router.navigate(['/login']);
  }
}
