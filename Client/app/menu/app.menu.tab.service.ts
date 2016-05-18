import {MyTab} from './app.menu.tab.component'
export class MyTabs{
  getTabs():MyTab[]{
	  var TABS: MyTab[] = [{ "_name": "Tous les fichiers" }, { "_name": "Partagés avec vous" }, 
	  { "_name": "Dashboard" }];
	  return TABS;
    // return [new MyTab('Tous les fichiers'), new MyTab('Partagés avec vous'), new MyTab('DashBoard')];
  }
}
