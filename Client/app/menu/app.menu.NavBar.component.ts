import {Component} from '@angular/core';
import {MyTabs} from './app.menu.tab.service';
import {MyTab} from './app.menu.tab.component';
import { ROUTER_DIRECTIVES, Routes } from '@angular/router';
import { CrisisListComponent } from '../crisis-list.component';
import { HeroListComponent }   from '../hero-list.component';
import {Login} from '../app.component.login';
import {AllFilesComponent} from './app.menu.allFiles.component';
import {SharedWithUserFilesComponent} from './app.menu.sharedFiles';
import {DashBoardComponent} from './app.menu.dashboard.component';

@Component({
	selector: 'my_navBar',
	templateUrl: 'app/menu/my_navBar.html',
	providers: [MyTabs],
	directives:[ROUTER_DIRECTIVES]
})
@Routes([
	//	{ path: '/crisis-center', component: CrisisListComponent },
	//	{ path: '/heroes', component: HeroListComponent },
		{ path: '/allFiles', component: AllFilesComponent },
		{ path: '/dashboard', component: DashBoardComponent },
		{ path: '/sharedWithUser', component: SharedWithUserFilesComponent },
		{ path: '/login', component: Login },
		{ path: '*', component: CrisisListComponent }])
export class MyNavBar{
  _tabs;
  selectedTab: MyTab;
  // loginTab: MyTab = { "_name": "Login" };

  onSelect(tab: MyTab) { this.selectedTab = tab; }

  constructor(tabs:MyTabs){
    this._tabs = tabs.getTabs();
  }
}
