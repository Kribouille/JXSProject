import { Injectable } from '@angular/core'; 

@Injectable()
export class Connected {
	connected: boolean = false;

	getConnected(){
		return this.connected;
	}

	setConnect(bool : boolean){
		console.log("Connection activée ...");
		this.connected = bool;
	}
}