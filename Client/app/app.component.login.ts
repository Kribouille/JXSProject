import {Http, Headers, HTTP_PROVIDERS, HTTP_BINDINGS} from '@angular/http';
import {Component} from '@angular/core';
import {CORE_DIRECTIVES, FORM_DIRECTIVES} from '@angular/common';

@Component({
	selector: 'my_login',
	template: `
  <header>
  <h1 class="title">Connection</h1>
  </header>
  <button class="btn btn-primary" (click)="connectDropbox()">DROPBOX</button>
  <br><br><br>
  `
})

export class Login{

  url: string;
  urlConnect: string;
  connectVarInUrl : string;

  constructor(public http: Http) {

  }

  connectDropbox() {
    this.url = 'https://www.dropbox.com/1/oauth2/authorize?client_id=wl5n5wq11bvcnst&response_type=code&redirect_uri=http://localhost:3000/allFiles';
    this.http.get(this.url)
    .map(res => res.text())
    .subscribe(  
      data => console.log('duuh'),
      err => this.logError(err),
      () => window.location.href = this.url
      );
    console.log('Connection ...')
  }

  isconnected(){
    this.urlConnect = 'http://localhost:8080/WSCloudUnifierService/cloudUnifier/isConnected?cloud=db';
    this.http.get(this.urlConnect)
      .map(res => res.json())
      .subscribe
      (
      data => this.connectVarInUrl = data,
      err => this.logError(err),
      () => console.log("Connected")
      );
  }

  extractData(res){
    let body = res.json();
    return body.data;
  }

  // getURL() {
  //   this.url = 'https://www.dropbox.com/1/oauth2/authorize?client_id=wl5n5wq11bvcnst&response_type=code&redirect_uri=http://localhost:3000/allFiles';
  //   this.http.get(this.url)
  //     .map(res => res.text())
  //     .subscribe(  
  //     data => console.log(data),
  //     err => this.logError(err),
  //     () => window.location.href = this.url
  //     );
  // }

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
