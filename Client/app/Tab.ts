import { Component } from '@angular/core';
import { Input } from '@angular/core'
@Component({
  selector: 'tabs',
  template: `
  <ul>
  <li *ngFor="let tab of tabs" (click)="selectTab(tab)">
  {{tab.tabTitle}}
  </li>
  </ul>
  <ng-content></ng-content>
  `,
})
export class Tabs {
  tabs: Tab[] = [];

  selectTab(tab: Tab) {
    this.tabs.forEach((tab) => {
      tab.active = false;
    });
    tab.active = true;
  }

  addTab(tab: Tab) {
    if (this.tabs.length === 0) {
      tab.active = true;
    }
    this.tabs.push(tab);
  }
}

@Component({
  selector: 'tab',
  template: `
  <div [hidden]="!active">
  <ng-content></ng-content>
  </div>
  `
})
export class Tab {

  @Input() tabTitle: string;
  active: boolean = false;
  constructor(tabs:Tabs) {
  tabs.addTab(this);
  }
}