import {Component} from '@angular/core';
import {Http, Headers, HTTP_PROVIDERS, HTTP_BINDINGS} from '@angular/http';
import {CORE_DIRECTIVES, FORM_DIRECTIVES} from '@angular/common';
@Component({
  selector:"dashboard",
  template:`
 	{{url}}<br>
 	{{name}}<br>
 	{{surname}}<br>
 	{{mail}}<br>
 	{{country}}<br>
 	{{spaceFree}}<br>
 	{{spaceAvailable}}<br>
  `
})
export class DashBoardComponent{
	url: string;
	name: string;
	surname: string;
	mail: string;
	country: string;
	spaceFree: number;
	spaceAvailable: number;

	constructor(private http:Http){
		this.getUserInfo();
	}

	getUserInfo() {
		this.url = 'http://localhost:8080/WSCloudUnifierService/cloudUnifier/getUDetails?cloud=db';
		this.http.get(this.url)
			.map(res => res.json())
			.subscribe(
			data => {
				this.name = data.name_details.familiar_name;
				this.surname = data.name_details.surname;
				this.mail = data.email;
				this.spaceFree = data.quota_info.normal;
				this.spaceAvailable = data.quota_info.quota;
				this.country = data.country;
			},
			err => this.logError(err),
			() => {}
			);
	}

	logError(err) {
		console.error('ERROR !');
	}
}
