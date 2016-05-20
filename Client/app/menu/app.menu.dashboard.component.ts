import {Component} from '@angular/core';
import {Http, Headers, HTTP_PROVIDERS, HTTP_BINDINGS} from '@angular/http';
import {CORE_DIRECTIVES, FORM_DIRECTIVES} from '@angular/common';
@Component({
  selector:"dashboard",
  template:`
  	<p>DROPBOX</p>
 	{{url}}<br>
 	{{nameDB}}<br>
 	{{surnameDB}}<br>
 	{{mailDB}}<br>
 	{{countryDB}}<br>
 	{{spaceUsedDB}}<br>
 	{{spaceAvailableDB}}<br>
 	<p>GOOGLE DRIVE<p>
 	{{nameDR}}<br>
 	{{mailDR}}<br>
 	{{countryDR}}<br>
 	{{spaceUsedDR}}<br>
 	{{spaceTotalDR}}<br>
  `
})
export class DashBoardComponent{
	url: string;
	nameDB: string;
	surnameDB: string;
	mailDB: string;
	countryDB: string;
	spaceUsedDB: number;
	spaceAvailableDB: number;
	nameDR: string;
	mailDR: string;
	countryDR: string;
	spaceUsedDR: number;
	spaceTotalDR: number;

	constructor(private http:Http){
		this.getUserInfoDropbox();
		this.getUserInfoDrive();

	}

	getUserInfoDropbox() {
		this.url = 'http://localhost:8080/WSCloudUnifierService/cloudUnifier/getUDetails?cloud=db';
		this.http.get(this.url)
			.map(res => res.json())
			.subscribe(
			data => {
				this.nameDB = data.name_details.familiar_name;
				this.surnameDB = data.name_details.surname;
				this.mailDB = data.email;
				this.spaceUsedDB = data.quota_info.normal;
				this.spaceAvailableDB = data.quota_info.quota;
				this.countryDB = data.country;
			},
			err => this.logError(err),
			() => {}
			);
	}
	getUserInfoDrive(){
		this.url = 'http://localhost:8080/WSCloudUnifierService/cloudUnifier/getUDetails?cloud=drive';
		this.http.get(this.url)
			.map(res => res.json())
			.subscribe(
			data => {
				this.nameDR = data.name;
				this.mailDR = data.emailAddress;
				this.spaceUsedDR = data.quotaBytesUsed;
				this.spaceTotalDR = data.quotaBytesTotal;
				this.countryDR = data.languageCode;
			},
			err => this.logError(err),
			() => { }
			);
	}

	logError(err) {
		console.error('ERROR !');
	}
}
