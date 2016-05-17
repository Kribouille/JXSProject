import { Component, NgFor } from 'angular2/angular2';
import { Tab } from './tab';

@Component({
  selector: 'tabs',
  template: `
    <ul class="nav nav-tabs">
      <li *ng-for="#tab of tabs" (click)="selectTab(tab)" [class.active]="tab.active">
        <a href="#">{{tab.title}}</a>
      </li>
    </ul>
    <ng-content></ng-content>
  `,
  directives: [NgFor]
})
export class Tabs {

  tabs: Tab[];

  constructor() {
    this.tabs = [];
  }
  selectTab(tab) {

    _deactivateAllTabs(this.tabs);
    tab.active = true;

    function _deactivateAllTabs(tabs: Tab[]) {
      tabs.forEach((tab) => tab.active = false);
    }

  }
  // _deactivateAllTabs(){
  //   this.tabs.forEach((tab)=>tab.active = false);
  // }

  addTab(tab: Tab) {
    if (this.tabs.length === 0) {
      tab.active = true;
    }
    this.tabs.push(tab);
  }
}