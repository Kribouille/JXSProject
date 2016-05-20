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
  templateUrl:'./app/menu/displayFiles.html'
})
export class AllFilesComponent{

  public folders : Array<FileFolder>;
  public files;
  private nbFolders = 0;
  private _selected : FileFolder;

  constructor(public http: Http){
    this.folders = new Array<FileFolder>();
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
            this.folders.push(new FileFolder(name, this.http));
            this.nbFolders++;
        }
        console.log(this.folders[0]);
    }

    onSelect(f : FileFolder) { this._selected = f; f.getInfos();}

    logError(err) {
        console.error('ERROR get all files/folders ' + err);
    }
}



class FileFolder{
    _name: String;
    _isFolder : boolean; // true si folder false si file
    _toDisplay : boolean = true;

    _toDisplayAndIsFolder : boolean; // = toDisplay And
    _toDisplayAndIsFile : boolean;
    private _informations;

    constructor(public name : String, public http: Http){

        //inititalisation du type
        this._name = name;
        if(this._name.indexOf('/') > -1){  //on n'affiche pas

          this._toDisplay = false;
          if (this._name.indexOf('.')> -1) { this._isFolder = false;} //le fichier est dans un sous-dossier
          else { this._isFolder = true; }// sous-dossier

        }
        else{//on affiche
          if(this._name.indexOf('.')> -1) {   this._isFolder = false;} // cas ou le fichier est a la racine
          else{ this._isFolder = true;}//dossier dans la racine

        }

        this._toDisplayAndIsFolder = this._toDisplay && this._isFolder;
        this._toDisplayAndIsFile = this._toDisplay && !this._isFolder;

        //console.log("name : " + this._name +"is Dir :" + informations[0]);
    }

    private setInfos(infos){
      this._informations = infos;
    }
    getInfos(){
      var url = 'http://localhost:8080/WSCloudUnifierService/cloudUnifier/getFDetails?cloud=db&path=' + this._name;
      this.http.get(url)
      .map(res => res.json())
      .subscribe(
        data =>  this.setInfos(data),
        err => this.logError(err)
      );
      console.log("infos : " + this._informations);
      return this._informations;
    }


    logError(err) {
        console.error('ERROR get infos of file or folder ' + err);
    }
}
