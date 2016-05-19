import {Http, Headers} from 'angular2/http';
import {Component} from '@angular/core';

@Component({
	selector: 'my_login',
	template: `
  <header>
    <h1 class="title">Connection</h1>
  </header>
  <button class="btn btn-primary" (click)="connectDropbox()">Dropbox authentification</button>
  `
})

export class Login{

	constructor() {

	}

  connectDropbox() {
    window.location.href = 'http://localhost:8080/WSCloudUnifierService/cloudUnifier/cloudAuthorize?cloud=db&callbackUri=http://localhost:8080/WSCloudUnifierService/cloudUnifier';
  }

}
