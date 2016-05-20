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
  <button style="height:50px;width:200px"class="btn btn-primary" (click)="connectDropbox()">DROPBOX</button>
  <button style="height:50px;width:200px" class="btn btn-primary" (click)="connectDrive()">GOOGLE DRIVE</button>
  </span>
  <br><br><br>
  `
})

export class Login{

  url: string;
  url2: string;
  urlConnect: string;

  constructor(public http: Http, private connect : Connected) {
  }

/**
 * Se connecter à la fenêtre d'authentification de Dropbox
 */
  connectDropbox() {
    this.url = 'https://www.dropbox.com/1/oauth2/authorize?client_id=wl5n5wq11bvcnst&response_type=code&redirect_uri=http://localhost:8080/WSCloudUnifierService/cloudUnifier/authenticate?cloud=db';
    this.http.get(this.url)
    .map(res => res.text())
    .subscribe(  
    data => {
      this.connect.setConnect(true),
      console.log('Connection qui passe à true')
    },
      err => this.logError(err),
      () => {
      window.location.href = this.url;
    }      
         );
     }

  connectDrive() {
    this.url = 'https://accounts.google.com/o/oauth2/v2/auth?response_type=code&scope=https://www.googleapis.com/auth/drive&client_id=921146812227-r0olsfvaghs07ss0g0jhbgd6veq68eib.apps.googleusercontent.com&redirect_uri=http://localhost:8080/WSCloudUnifierService/cloudUnifier/authenticate?cloud=drive';
    this.http.get(this.url)
      .map(res => res.text())
      .subscribe(
      data => {console.log('Connection qui passe à true')},
      err => this.logError(err),
      () => {
        window.location.href = this.url;
      }
      );
  }

/**
 * Vérifie que le client est connecté
 */
  getConnected(){
    this.urlConnect = 'http://localhost:8080/WSCloudUnifierService/cloudUnifier/isConnected?cloud=db';
    this.http.get(this.urlConnect)
    .map(res => res.json())
    .subscribe
    (
    data => {
      this.connect.setConnect(data.isConnected),
      console.log("Suis-je connecté ?" + data.isConnected)
    },
      err => this.logError(err),
      () => console.log("Connected")
      );
  }

  logError(err){
    console.error('ERROR !');
  }
}
