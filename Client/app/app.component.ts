import {Component} from '@angular/core';
import {MyNavBar} from './menu/app.menu.NavBar.component';
import {FileExplorer} from './explorer/app.explorer.fileExplorer.component';
import { ROUTER_DIRECTIVES, Routes, Router } from '@angular/router';
import {Login} from './app.component.login';
import {AllFilesComponent} from './menu/app.menu.allFiles.component';
import {SharedWithUserFilesComponent} from './menu/app.menu.sharedFiles';
import {DashBoardComponent} from './menu/app.menu.dashboard.component';
import {Connected} from './app.connected.service'
@Component({
	selector: 'my-app',
	template: `
	<div class="page-header">
  <h1>Chili Kribouille Carne<small> Le Cloud du turfu</small></h1>
</div>
	<my_navBar></my_navBar>
	<file-explorer></file-explorer>


	`,
	directives:[MyNavBar, FileExplorer, ROUTER_DIRECTIVES],
	providers:[Connected]
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
