// import {Component, View} from 'angular2/angular2';
import {Http, Headers} from 'angular2/http';
import {Component} from '@angular/core';
// import {CORE_DIRECTIVES, FORM_DIRECTIVES} from 'angular2/common';
// import { bootstrap } from 'angular2/platform/browser';

@Component({
	selector: 'my_login',
// })

// @View({
	// directives: [CORE_DIRECTIVES, FORM_DIRECTIVES],
	template: `
  <header>
    <h1 class="title">Login part</h1>
  </header>
  `
})

export class Login{

	constructor() {

	}

}

// bootstrap(Login)