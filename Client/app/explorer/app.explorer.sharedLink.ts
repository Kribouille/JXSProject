import {Http, Headers, HTTP_PROVIDERS, HTTP_BINDINGS} from '@angular/http';
import {Component} from '@angular/core';
import {CORE_DIRECTIVES, FORM_DIRECTIVES} from '@angular/common';


@Component({
	selector: 'shared',
	template: `
		<p>{{this.link}}</p>
	`
})

export class SharedLink {

	url: string;
	link: string;

	constructor(private http: Http) {

	}

	getSharedLink() {
		this.url = 'http://localhost:8080/WSCloudUnifierService/cloudUnifier/share?cloud=db&path=';
		this.url = this.url + /* récupérer le path du component allFiles*/;
		this.http.get(this.url)
			.map(res => res.json())
			.subscribe(
			data => {this.link=data.url},
			err => this.logError(err),
			() => {}
			);
	}


	logError(err){
		console.error('ERROR !');
	}
}
