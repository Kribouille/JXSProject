import {Component} from '@angular/core';
import {Http, Headers, HTTP_PROVIDERS, HTTP_BINDINGS} from '@angular/http';
import {CORE_DIRECTIVES, FORM_DIRECTIVES} from '@angular/common';
@Component({
	selector: "dashboard",
	template: `
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
	</table><br><br>
	<h3>Espace libre sur Dropbox</h3>
	<div style="margin-top=30px;" class="progress">
	<div class="progress-bar" role="progressbar" aria-valuenow="76" aria-valuemin="0" aria-valuemax="100" style="width:76%">
	<span class="sr-only">70% Complete</span>
	</div>
	</div>
	<h3>Espace libre sur GoogleDrive</h3>
	<div style="margin-top=30px;" class="progress">
	<div class="progress-bar" role="progressbar" aria-valuenow="76" aria-valuemin="0" aria-valuemax="100" style="width:58%">
	<span class="sr-only">70% Complete</span>
	</div>
	</div>
	`
})
export class DashBoardComponent {
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
	ratio: number;
	ratioGD: number;
	';

	constructor(private http: Http) {
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
				this.ratio = Math.floor((this.spaceUsedDB / this.spaceAvailableDB) * 100000);
			},
			err => this.logError(err),
			() => { }
			);
	}
	getUserInfoDrive() {
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
				this.ratioGD = Math.floor((this.spaceUsedDR / this.spaceTotalDR) * 10000000);
			},
			err => this.logError(err),
			() => { }
			);
	}

	logError(err) {
		console.error('ERROR !');
	}
}
