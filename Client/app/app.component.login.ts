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

  // connectDropbox() {
  //   window.location.href = this.url;
  //   console.log('Authentification !')
  // }

  getURL() {
    this.http.get('https://www.dropbox.com/1/oauth2/authorize?client_id=wl5n5wq11bvcnst&response_type=code&redirect_uri=http://localhost:3000/allFiles')
      .map(res => res.text())
      .subscribe(
      data => this.url = data,
      err => this.logError(err),
      () => console.log('Authentification !')
      );
  }

  // getReponse(){
  //   this.http.get(this.url)
  //     .map(res => res.json())
  //     .subscribe(
  //     data => console.log(data),
  //     err => this.logError(err),
  //     () => console.log('truc')
  //     );
  // }

  logError(err){
    console.error('ERROR !');
  }
}
