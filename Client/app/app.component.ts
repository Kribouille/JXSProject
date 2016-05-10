import { Component } from '@angular/core';
import { NavClientBar } from './NavClientBar';

@Component({
  selector: 'my-app',
  templateUrl: 'app/gui.html',
  directives: [NavClientBar]
})
export class AppComponent {
}
