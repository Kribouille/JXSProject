import {Component} from '@angular/core';

@Component({
	selector: 'my_tab',
	template:'',
})
export class MyTab{
	_name: string;


	constructor(name : string) {
		this._name = name;
	}
}