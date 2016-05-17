import {Component} from '@angular/core';
import {MyTabs} from './app.menu.tab.service';
import {MyTab} from './app.menu.tab.component'; 
@Component({
  selector:'my_navBar',
  templateUrl:'app/menu/my_navBar.html',
  providers:[MyTabs]
})
export class MyNavBar{
  _tabs;
  selectedTab: MyTab;
  // loginTab: MyTab = { "_name": "Login" };
  
  onSelect(tab: MyTab) { this.selectedTab = tab; }

  constructor(tabs:MyTabs){
    this._tabs = tabs.getTabs();
  }
}
