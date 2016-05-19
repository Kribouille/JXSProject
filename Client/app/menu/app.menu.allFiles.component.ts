import {bootstrap}    from '@angular/platform-browser-dynamic';
import {Component} from '@angular/core';
import {CORE_DIRECTIVES, FORM_DIRECTIVES} from '@angular/common';
import {Http, Headers} from '@angular/http';
import {NgForm} from '@angular/common';
import {Router} from '@angular/router';
import { ROUTER_DIRECTIVES, Routes } from '@angular/router';
import {AllFilesService} from './app.menu.allFiles.service'

@Component({
  selector:"all-files",
  directives: [ CORE_DIRECTIVES, FORM_DIRECTIVES, ROUTER_DIRECTIVES ],
  providers:[AllFilesService],
  template:`
  <div>
  <h3>All files on your drive</h3>
  <p>Firest file, etc</p>
  </div>
  `
})
export class AllFilesComponent{

  public folders : Array<Folder>;
  public files : string;

  constructor(public http: Http){
    this.folders = new Array<Folder>();
    this.http=http;
    this.getFiles();

}





    getFiles(){
      //dropbox for now
      return this.getFilesDropbox();
    }




    getFilesDropbox() {
        this.http.get('http://localhost:8080/WSCloudUnifierService/cloudUnifier/getTree?cloud=db&path=/')
        .map(res => res.json())
        .subscribe(
          data => this.files = data,
          err => this.logError(err),
          () => this.consultDataDropbox()
        );
    }

    consultDataDropbox(){
       // console.log(this.files);
        var filesDetails = JSON.parse(this.files);
        for(var i = 0; i<filesDetails.contents.length; i++){
            var name = filesDetails.contents[i].path;
            var size = filesDetails.contents[i].size;
            var date = filesDetails.contents[i].modified;
            var prov = "dropbox"
            var own = "Proprietaire";
            var lien = filesDetails.contents[i].path;
            this.folders.push(new Folder(name,size,date,prov,own,lien));
        }
        console.log(this.folders[0]);
    }


    logError(err) {
        console.error('ERROR get all files ' + err);
    }
}


class Folder{
    _name: String;
    _size: String;
    _date: String;
    _provide: String;
    _own: String;
    _link: String;
    constructor(public name : String, public size : String, public date: String, public provide : String, public own : String, public link : String){
        this._name = name;
        this._size = size;
        this._date = date;
        this._provide =provide;
        this._own = own;
        this._link = link;
    }
}
