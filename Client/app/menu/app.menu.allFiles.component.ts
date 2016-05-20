import {bootstrap}    from '@angular/platform-browser-dynamic';
import {Component} from '@angular/core';
import {CORE_DIRECTIVES, FORM_DIRECTIVES} from '@angular/common';
import {Http, Headers} from '@angular/http';
import {NgForm} from '@angular/common';
import {Router} from '@angular/router';
import { ROUTER_DIRECTIVES, Routes } from '@angular/router';
import {AllFilesService} from './app.menu.allFiles.service';
//import {UPLOAD_DIRECTIVES} from 'ng2-file-upload/ng2-file-upload';

@Component({
  selector:"all-files",
  directives: [ CORE_DIRECTIVES, FORM_DIRECTIVES, ROUTER_DIRECTIVES ],
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
      //on remet files à null pour refaire l'arborescence
      this.files = null;
    //  this.getFilesDrive(path);
      this.getFilesDropbox(path);
    }

    onShare(f: FileFolder){
      f.getSharedLink();
    }

    uploadFile(filePath : string){
      var nameNewFile = filePath.substring(filePath.lastIndexOf('/')+1, filePath.length);
      console.log("Ajout file");
      this.http.get('http://localhost:8080/WSCloudUnifierService/cloudUnifier/addFile?cloud=db&pathFrom=/'+filePath+'&pathTo=' + this._currentPath +'/'+ nameNewFile).map(res => res.json())
      .subscribe(
        data => this.getFiles(this._currentPath),
        err => this.logError(err)
      );
    }

    getFilesDropbox(path: string) {
        this._currentPath=path;
        console.log("path :" + this._currentPath);
        this.http.get('http://localhost:8080/WSCloudUnifierService/cloudUnifier/getTree?cloud=db&path='+path)
        .map(res => res.json())
        .subscribe(
          data => this.files = data,
          err => this.logError(err),
          () => this.addFiles()
        );
    }


    addFiles(){
        var details = this.files.files;
        this.folders = new Array<FileFolder>();
        for(var i = 0; i < details.length; i++){
            var name = details[i].path;
            this.folders.push(new FileFolder(name, this.http, this._currentPath));
            this.nbFolders++;
        }
        console.log(this);
    }


    getFilesDrive(path: string) {
        this._currentPath=path;
        console.log("path :" + this._currentPath);
        this.http.get('http://localhost:8080/WSCloudUnifierService/cloudUnifier/getTree?cloud=drive&path='+path)
        .map(res => res.json())
        .subscribe(
          data => this.files = data,
          err => this.logError(err),
          () => this.addFiles()
        );
    }



    onSelectFolder (f: FileFolder){ this._selected = f; this.getFiles(f._name);}
    onSelectInfo(f : FileFolder) { console.log("info");this._selected = f; f.requestInfos();}

    logError(err) {
        console.error('ERROR get all files/folders ' + err);
    }


    removeFile(f:FileFolder){
      var path = f.replaceAll(f._name, " ", "%20");
      console.log("Suppression");
      this.http.get('http://localhost:8080/WSCloudUnifierService/cloudUnifier/deleteFile?cloud=db&path='+f._name).map(res => res.json())
      .subscribe(
        data => this.getFiles(this._currentPath),
        err => this.logError(err)
      );

    }

}
















class FileFolder{
    _name: string;
    _isFolder : boolean; // true si folder false si file
    _toDisplay : boolean = true;

    _toDisplayAndIsFolder : boolean; // = toDisplay And
    _toDisplayAndIsFile : boolean;

    private _url;
    private _link;

    private _informations ;

    public _size; //affichage de la taille
    public _path; //affichage du chemin
    public _type; //affichage du type -> folder ou fichier
    public _cloudFrom; //affichage du cloud d'ou vient le fileName
    public _modified; //affichage de date derniere modif


    constructor(public name : string, public http: Http, path:string){

        //inititalisation du name
        this._name = name;


        //initialisation pour l'affichage, et le type
        var fileName = this._name;
        fileName = fileName.substr(path.length+1, fileName.length);
        if(fileName.indexOf('/') > -1){  //on n'affiche pas

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

    setInfos(infos:JSON){
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
      if(this._informations != null){
        this._size = this._informations.size;
        this._path = this._informations.path;
        this._type = this._informations.is_dir == true ? "Dossier" : "Fichier";
        this._cloudFrom = this._informations.root;
        this._modified = this._informations.modified;
      }

      return this._informations;
    }



    replaceAll(strFrom : string, c :string, sub:string){
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

    getSharedLink() {
  		this._url = 'http://localhost:8080/WSCloudUnifierService/cloudUnifier/share?cloud=db&path=';
  		this._url = this._url + this.replaceAll(this._name, " ", "%20");
  		this.http.get(this._url)
  			.map(res => res.json())
  			.subscribe(
  			data => {this._link=data.url},
  			err => this.logError(err),
  			() => {}
  			);
  	}


    logError(err) {
        console.error('ERROR get infos of file or folder ' + err);
    }
}
