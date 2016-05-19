import {bootstrap}    from '@angular/platform-browser-dynamic';
import {Component} from '@angular/core';
import {CORE_DIRECTIVES, FORM_DIRECTIVES} from '@angular/common';
import {Http, Headers} from '@angular/http';
import {NgForm} from '@angular/common';
import {Router} from '@angular/router';
import { ROUTER_DIRECTIVES, Routes } from '@angular/router';
import {AllFilesService} from './app.menu.allFiles.service';
import {FileExplorer} from '../explorer/app.explorer.fileExplorer.component';

@Component({
  selector:"all-files",
  directives: [ CORE_DIRECTIVES, FORM_DIRECTIVES, ROUTER_DIRECTIVES, FileExplorer ],
  providers:[AllFilesService],
  template:`
  <div class="panel panel-default">
        <div class="panel-heading">
          <h2 class="panel-title">Documents </h2>
        </div>
        <div class="panel-body">
          <span class="counter pull-right"></span>
          <table class="table table-bordered table-responsive table-hover results" id="dataTables-example">
              <tr>
                <th>Nom</th> <th>taille</th> <th>Date de Modification</th> <th>Provenance</th> <th>Propriétaire</th><th>Lien</th>
              </tr>
            <tbody>

                  <tr *ngFor="let folder of folders" >

                    <td> <h1><span class="glyphicon glyphicon-file"></span></h1>{{ folder.name }} </td>
                    <td> {{ folder.size }} </td>
                    <td> {{ folder.date }}</td>
                    <td> {{ folder.provide }}</td>
                    <td> {{ folder.owner }}</td>
                    <td> <a href="{{ folder.link }}" class="glyphicon glyphicon-download-alt" style="margin:auto;"> </a></td>
                  </tr>

            </tbody>
          </table>
        </div>
      </div>
  `
})
export class AllFilesComponent{

  public folders : Array<Folder>;
  public files;

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
          () => this.getFilesFromDropbox()
        );
    }

    getFilesFromDropbox(){
       // console.log(this.files);
        var details = this.files.files;
        for(var i = 0; i < details.length; i++){
            var name = details[i].path;
            var size = details[i].size;
            var date = details[i].modified;
            var prov = "dropbox"
            var own = "Proprietaire";
            var lien = details[i].path;
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
