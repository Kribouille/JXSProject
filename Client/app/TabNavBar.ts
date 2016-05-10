import {Component} from '@angular/core';
import {Input} from '@angular/core';
import {NavClientBar} from './NavClientBar';

@Component({
  selector: 'tabNavBar',
  template: `
    <div [hidden]="!active">
      <ng-content></ng-content>
    </div>
  `
})
export class TabNavBar {
  @Input() tabTitle;
  active:boolean = true;

  constructor(navBar : NavClientBar){
    navBar.addTabToNavBar(this);
  }
}
