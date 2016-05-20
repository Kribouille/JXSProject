System.register(['@angular/core', '@angular/common', '@angular/http', '@angular/router', './app.menu.allFiles.service'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata = (this && this.__metadata) || function (k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };
    var core_1, common_1, http_1, router_1, app_menu_allFiles_service_1;
    var AllFilesComponent, FileFolder;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (common_1_1) {
                common_1 = common_1_1;
            },
            function (http_1_1) {
                http_1 = http_1_1;
            },
            function (router_1_1) {
                router_1 = router_1_1;
            },
            function (app_menu_allFiles_service_1_1) {
                app_menu_allFiles_service_1 = app_menu_allFiles_service_1_1;
            }],
        execute: function() {
            //import {UPLOAD_DIRECTIVES} from 'ng2-file-upload/ng2-file-upload';
            AllFilesComponent = (function () {
                function AllFilesComponent(http) {
                    this.http = http;
                    this.nbFolders = 0;
                    this.folders = new Array();
                    this.http = http;
                    this._currentPath = '/';
                    this.getFiles('/');
                }
                AllFilesComponent.prototype.getFiles = function (path) {
                    //on remet files à null pour refaire l'arborescence
                    this.files = null;
                    this.getFilesDrive(path);
                    this.getFilesDropbox(path);
                };
                AllFilesComponent.prototype.onShare = function (f) {
                    f.getSharedLink();
                };
                AllFilesComponent.prototype.uploadFile = function (filePath) {
                    var _this = this;
                    var nameNewFile = filePath.substring(filePath.lastIndexOf('/') + 1, filePath.length);
                    console.log("Ajout file");
                    this.http.get('http://localhost:8080/WSCloudUnifierService/cloudUnifier/addFile?cloud=db&pathFrom=/' + filePath + '&pathTo=' + this._currentPath + '/' + nameNewFile).map(function (res) { return res.json(); })
                        .subscribe(function (data) { return _this.getFiles(_this._currentPath); }, function (err) { return _this.logError(err); });
                };
                AllFilesComponent.prototype.getFilesDropbox = function (path) {
                    var _this = this;
                    this._currentPath = path;
                    console.log("path :" + this._currentPath);
                    this.http.get('http://localhost:8080/WSCloudUnifierService/cloudUnifier/getTree?cloud=db&path=' + path)
                        .map(function (res) { return res.json(); })
                        .subscribe(function (data) { return _this.files = data; }, function (err) { return _this.logError(err); }, function () { return _this.addFiles(); });
                };
                AllFilesComponent.prototype.addFiles = function () {
                    var details = this.files.files;
                    this.folders = new Array();
                    for (var i = 0; i < details.length; i++) {
                        var name = details[i].path;
                        this.folders.push(new FileFolder(name, this.http, this._currentPath));
                        this.nbFolders++;
                    }
                    console.log(this);
                };
                AllFilesComponent.prototype.getFilesDrive = function (path) {
                    var _this = this;
                    this._currentPath = path;
                    console.log("path :" + this._currentPath);
                    this.http.get('http://localhost:8080/WSCloudUnifierService/cloudUnifier/getTree?cloud=drive&path=' + path)
                        .map(function (res) { return res.json(); })
                        .subscribe(function (data) { return _this.files = data; }, function (err) { return _this.logError(err); }, function () { return _this.addFiles(); });
                };
                AllFilesComponent.prototype.onSelectFolder = function (f) { this._selected = f; this.getFiles(f._name); };
                AllFilesComponent.prototype.onSelectInfo = function (f) { console.log("info"); this._selected = f; f.requestInfos(); };
                AllFilesComponent.prototype.logError = function (err) {
                    console.error('ERROR get all files/folders ' + err);
                };
                AllFilesComponent.prototype.removeFile = function (f) {
                    var _this = this;
                    var path = f.replaceAll(f._name, " ", "%20");
                    console.log("Suppression");
                    this.http.get('http://localhost:8080/WSCloudUnifierService/cloudUnifier/deleteFile?cloud=db&path=' + f._name).map(function (res) { return res.json(); })
                        .subscribe(function (data) { return _this.getFiles(_this._currentPath); }, function (err) { return _this.logError(err); });
                };
                AllFilesComponent = __decorate([
                    core_1.Component({
                        selector: "all-files",
                        directives: [common_1.CORE_DIRECTIVES, common_1.FORM_DIRECTIVES, router_1.ROUTER_DIRECTIVES],
                        providers: [app_menu_allFiles_service_1.AllFilesService],
                        templateUrl: './app/menu/displayFiles.html'
                    }), 
                    __metadata('design:paramtypes', [http_1.Http])
                ], AllFilesComponent);
                return AllFilesComponent;
            }());
            exports_1("AllFilesComponent", AllFilesComponent);
            FileFolder = (function () {
                function FileFolder(name, http, path) {
                    this.name = name;
                    this.http = http;
                    this._toDisplay = true;
                    //inititalisation du name
                    this._name = name;
                    //initialisation pour l'affichage, et le type
                    var fileName = this._name;
                    fileName = fileName.substr(path.length + 1, fileName.length);
                    if (fileName.indexOf('/') > -1) {
                        this._toDisplay = false;
                        if (this._name.indexOf('.') > -1) {
                            this._isFolder = false;
                        } //le fichier est dans un sous-dossier
                        else {
                            this._isFolder = true;
                        } // sous-dossier
                    }
                    else {
                        if (this._name.indexOf('.') > -1) {
                            this._isFolder = false;
                        } // cas ou le fichier est a la racine
                        else {
                            this._isFolder = true;
                        } //dossier dans la racine
                    }
                    this._toDisplayAndIsFolder = this._toDisplay && this._isFolder;
                    this._toDisplayAndIsFile = this._toDisplay && !this._isFolder;
                    //console.log("name : " + this._name +"is Dir :" + informations[0]);
                }
                FileFolder.prototype.setInfos = function (infos) {
                    this._informations = infos;
                };
                FileFolder.prototype.getInfos = function () {
                    return this._informations;
                };
                FileFolder.prototype.requestInfos = function () {
                    var _this = this;
                    var fileName = this._name;
                    fileName = this.replaceAll(fileName, " ", "%20");
                    var url = 'http://localhost:8080/WSCloudUnifierService/cloudUnifier/getFDetails?cloud=db&path=' + fileName;
                    console.log(url);
                    this.http.get(url)
                        .map(function (res) { return res.json(); })
                        .subscribe(function (data) { return _this.setInfos(data); }, function (err) { return _this.logError(err); });
                    if (this._informations != null) {
                        this._size = this._informations.size;
                        this._path = this._informations.path;
                        this._type = this._informations.is_dir == true ? "Dossier" : "Fichier";
                        this._cloudFrom = this._informations.root;
                        this._modified = this._informations.modified;
                    }
                    return this._informations;
                };
                FileFolder.prototype.replaceAll = function (strFrom, c, sub) {
                    var res = "";
                    for (var i = 0; i < strFrom.length; i++) {
                        if (strFrom.charAt(i) != c) {
                            res = res + strFrom.charAt(i);
                        }
                        else {
                            res += sub;
                        }
                    }
                    return res;
                };
                FileFolder.prototype.getSharedLink = function () {
                    var _this = this;
                    this._url = 'http://localhost:8080/WSCloudUnifierService/cloudUnifier/share?cloud=db&path=';
                    this._url = this._url + this.replaceAll(this._name, " ", "%20");
                    this.http.get(this._url)
                        .map(function (res) { return res.json(); })
                        .subscribe(function (data) { _this._link = data.url; }, function (err) { return _this.logError(err); }, function () { });
                };
                FileFolder.prototype.logError = function (err) {
                    console.error('ERROR get infos of file or folder ' + err);
                };
                return FileFolder;
            }());
        }
    }
});
//# sourceMappingURL=app.menu.allFiles.component.js.map