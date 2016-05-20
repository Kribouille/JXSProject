import {Component} from '@angular/core';
import {Http, Headers, HTTP_PROVIDERS, HTTP_BINDINGS} from '@angular/http';
import {CORE_DIRECTIVES, FORM_DIRECTIVES} from '@angular/common';
@Component({
	selector:"dashboard",
	template:`
	<table class="table table-bordered table-responsive table-hover results" >
	<thead><tr>
	<th>#</th>
	<th>Informations Dropbox</th>
	<th>Informations Google Drive</th>
	</tr>
	</thead>
	<tbody>
	<tr>
	<th scope="row">Nom</th>
	<td>{{nameDB}}</td>
	<td>{{nameDR}}</td>
	</tr>
	<tr>
	<th scope="row">Prénom</th>
	<td>{{surnameDB}}</td>
	<td>ok</td>
	</tr>
	<tr>
	<th scope="row">Email</th>
	<td>{{mailDB}}</td>
	<td>{{mailDR}}</td>
	</tr>
	<tr>
	<th scope="row">Pays</th>
	<td>{{countryDB}}</td>
	<td>{{countryDR}}</td>
	</tr>
	<tr>
	<th scope="row">Espace utilisé (en octets)</th>
	<td>{{spaceUsedDB}}</td>
	<td>{{spaceUsedDR}}</td>
	</tr>
	<tr>
	<th scope="row">Espace total</th>
	<td>{{spaceUsedDR}}</td>
	<td>{{spaceTotalDR}}</td>
	</tr>
	</tbody>
	</table>
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
	mailDR: boolean;
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
				this.mailDR = data.user.emailAddress;
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
