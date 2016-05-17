import {Component} from '@angular/core';
import {MyTabs} from './app.menu.tab.service';

@Component({
  selector:'my_navBar',
  templateUrl:'app/menu/my_navBar.html',
  providers:[MyTabs]
})
export class MyNavBar{
  _tabs;
  

  constructor(tabs:MyTabs){
    this._tabs = tabs.getTabs();
  }
}
