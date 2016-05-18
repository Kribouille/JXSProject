import {Component} from '@angular/core';
import {CoursesComponent} from './courses.component';
import {MyNavBar} from './menu/app.menu.NavBar.component';
import {FileExplorer} from './explorer/app.explorer.fileExplorer.component';
import { ROUTER_DIRECTIVES, Routes } from '@angular/router';
import {Login} from './app.component.login';
import { CrisisListComponent } from './crisis-list.component';
import { HeroListComponent }   from './hero-list.component';

@Component({
	selector: 'my-app',
	template: `<h1>My Fcx 2 App</h1>
	<my_navBar></my_navBar>
	<courses></courses>
	<file-explorer></file-explorer>

	`,
	directives:[CoursesComponent, MyNavBar, FileExplorer, ROUTER_DIRECTIVES]
})
@Routes([
	{ path: '/crisis-center', component: CrisisListComponent },
	{ path: '/heroes', component: HeroListComponent },
	{ path: '/login', component: Login },
	{ path: '*', component: CrisisListComponent }
	])
export class AppComponent { }
