import {Http, Headers, HTTP_PROVIDERS, HTTP_BINDINGS} from '@angular/http';
import {Component} from '@angular/core';
import {CORE_DIRECTIVES, FORM_DIRECTIVES} from '@angular/common';
import {Connected} from './app.connected.service'
@Component({
	selector: 'my_login',
	template: `
  <header>
  <h1 class="title">Connection</h1>
  </header>
  <span id="buttons">
  <button style="height:50px;width:100px"class="btn btn-primary" (click)="connectDropbox()">DROPBOX</button>
  <button style="height:50px;width:100px" class="btn btn-primary" (click)="connectDropbox()">GOOGLE DRIVE</button>
  </span>
  <br><br><br>
  `
})

export class Login{

  url: string;
  urlConnect: string;
  headers: Headers;

  constructor(public http: Http, private connect : Connected) {
    this.headers = new Headers();
      this.headers.append('Content-Type', 'application/json');
      this.headers.append('Access-Control-Allow-Origin', '*');
  }

/**
 * Se connecter à la fenêtre d'authentification de Dropbox
 */
  connectDropbox() {
    this.url = 'https://www.dropbox.com/1/oauth2/authorize?client_id=wl5n5wq11bvcnst&response_type=code&redirect_uri=http://localhost:3000/allFiles';
    this.http.get(this.url, this.headers)
    .map(res => res.text())
    .subscribe(  
      data => console.log('Connection ...'),
      err => this.logError(err),
      () => window.location.href = this.url
      );
  }

/**
 * Vérifie que le client est connecté
 */
  // isconnected(){
  //   this.urlConnect = 'http://localhost:8080/WSCloudUnifierService/cloudUnifier/isConnected?cloud=db';
  //   this.http.get(this.urlConnect)
  //   .map(res => res.json())
  //   .subscribe
  //   (
  //     data => this.connect.setConnect(data.isConnected),
  //     err => this.logError(err),
  //     () => console.log("Connected")
  //     );
  // }

  logError(err){
    console.error('ERROR !');
  }
}
