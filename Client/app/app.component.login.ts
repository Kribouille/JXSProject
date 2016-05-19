import {Http, Headers, HTTP_PROVIDERS, HTTP_BINDINGS} from '@angular/http';
import {Component} from '@angular/core';
import {CORE_DIRECTIVES, FORM_DIRECTIVES} from '@angular/common';


@Component({
	selector: 'my_login',
	template: `
  <header>
    <h1 class="title">Connection</h1>
  </header>
  <button class="btn btn-primary" (click)="getURL()">DROPBOX</button>
  <br><br><br>
  `
})

export class Login{

  url: string;

	constructor(public http:Http) {

	}

  connectDropbox() {
    window.location.href = this.url;
  }

  getURL() {
    this.http.get('http://localhost:8080/WSCloudUnifierService/cloudUnifier/cloudAuthorize?cloud=db&callbackUri=http://localhost:8080/WSCloudUnifierService/cloudUnifier')
      .map(res => res.text())
      .subscribe(
      data => this.url = data,
      err => this.logError(err),
      () => this.connectDropbox()
      );
  }

  logError(err){
    console.error('ERROR !');
  }
}
