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
  private _currentPath : string;

  constructor(public http: Http){
    this.folders = new Array<FileFolder>();
    this.http=http;
    this._currentPath = '/';
    this.getFiles('/');

}
    getFiles(path:string){
      //dropbox for now
      return this.getFilesDropbox(path);
    }

    getFilesDropbox(path: string) {
        this._currentPath=path;
        console.log("path :" + this._currentPath);
        this.http.get('http://localhost:8080/WSCloudUnifierService/cloudUnifier/getTree?cloud=db&path='+path)
        .map(res => res.json())
        .subscribe(
          data => this.files = data,
          err => this.logError(err),
          () => this.getFilesFromDropbox()
        );
    }

    getFilesFromDropbox(){
        var details = this.files.files;
        this.folders = new Array<FileFolder>();
        for(var i = 0; i < details.length; i++){
            var name = details[i].path;
            this.folders.push(new FileFolder(name, this.http, this._currentPath));
            this.nbFolders++;
        }
        console.log(this);
    }

    onSelectFolder (f: FileFolder){ this._selected = f; this.getFiles(f._name);}
    onSelectInfo(f : FileFolder) { this._selected = f; f.requestInfos();}

    logError(err) {
        console.error('ERROR get all files/folders ' + err);
    }

}



class FileFolder{
    _name: string;
    _isFolder : boolean; // true si folder false si file
    _toDisplay : boolean = true;

    _toDisplayAndIsFolder : boolean; // = toDisplay And
    _toDisplayAndIsFile : boolean;
    private _informations;

    constructor(public name : string, public http: Http, path:string){

        //inititalisation du name
        this._name = name;


        //initialisation pour l'affichage, et le type
        var fileName = this._name;
        fileName = fileName.substr(path.length+1, fileName.length);
        if(fileName.indexOf('/') > -1){  //on n'affiche pas

          this._toDisplay = false;
          if (fileName.indexOf('.')> -1) { this._isFolder = false;} //le fichier est dans un sous-dossier
          else { this._isFolder = true; }// sous-dossier

        }
        else{//on affiche
          if(fileName.indexOf('.')> -1) {   this._isFolder = false;} // cas ou le fichier est a la racine
          else{ this._isFolder = true;}//dossier dans la racine

        }

        this._toDisplayAndIsFolder = this._toDisplay && this._isFolder;
        this._toDisplayAndIsFile = this._toDisplay && !this._isFolder;

        //console.log("name : " + this._name +"is Dir :" + informations[0]);
    }

    setInfos(infos){
      this._informations = infos;
    }
    getInfos(){
      return this._informations;
  }

    requestInfos(){
      var fileName = this._name;
      fileName = this.replaceAll(fileName, " ", "%20");
      var url = 'http://localhost:8080/WSCloudUnifierService/cloudUnifier/getFDetails?cloud=db&path=' + fileName;
      console.log(url);
      this.http.get(url)
      .map(res => res.json())
      .subscribe(
        data =>  this.setInfos(data),
        err => this.logError(err)
      );
      console.log("infos : " + this._informations);
      return this._informations;
    }



    private replaceAll(strFrom : string, c :string, sub:string){
      var res = "";
      for (let i = 0; i< strFrom.length; i++){
          if(strFrom.charAt(i) != c){
            res = res + strFrom.charAt(i);
          }
          else{
            res += sub;
          }
      }
      return res;
    }



    logError(err) {
        console.error('ERROR get infos of file or folder ' + err);
    }
}
