import {Component} from '@angular/core';
import {TabNavBar} from './TabNavBar';

@Component({
  selector: 'navClientBar',
  templateUrl: 'app/NavClientBar.html'
})
export class NavClientBar {
  tabs: TabNavBar[] = [];


  addTabToNavBar(t:TabNavBar){
    if (this.tabs.length === 0) {
      t.active = true;
    }
    this.tabs.push(t);
  }


  selectTab(t:TabNavBar) {
    this.tabs.forEach((t) => {
      t.active = false;
    });
    t.active = true
  }
}
